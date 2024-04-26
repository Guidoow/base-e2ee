class CryptoService {
  private static instance: CryptoService;

  static getInstance(): CryptoService {
    if (!CryptoService.instance) {
      CryptoService.instance = new CryptoService();
    }
    return CryptoService.instance;
  }

  private readonly keyAlgorithm = { name: "ECDH", namedCurve: "P-256" };
  private readonly cypherAlgorithm = { name: "AES-GCM", length: 256 };
  private readonly authTagLength = 16;
  private readonly ivLength = 16;

  private ECDH: undefined | CryptoKeyPair;
  public SPK: undefined | String;

  /**
   * Creates a new unique ECDH object or Key Exchange Object (KEO).
   *
   * Initializes or refresh the keys.
   */
  public async createECDH() {
    const baseKeys = await window.crypto.subtle.generateKey(
      this.keyAlgorithm,
      true,
      ["deriveKey", "deriveBits"]
    );

    this.ECDH = baseKeys;
  }

  /**
   * Register a server public key to work with.
   *
   * The server public key must be a Crypto Key Buffer converted to B64 String.
   */
  public registerServer(serverPubKey64: String) {
    this.SPK = serverPubKey64;
  }

  /**
   * If there is a ECDH or KEO, gets its PK, converts it to B64 then returns it.
   */
  public async getPubKeyB64(): Promise<String | null> {
    this.validateECDH();

    const pkArray = new Uint8Array(
      await window.crypto.subtle.exportKey("raw", this.ECDH?.publicKey!)
    );

    return btoa(String.fromCharCode.apply(null, Array.from(pkArray)));
  }

  /**
   * Computes or derives the shared secret, given the `serverPubKeyB64`, then returns it.
   */
  public async computeSecret() {
    this.validateSPK();

    const serverPubKey = await this.parsePubKey(this.SPK!);

    return await window.crypto.subtle.deriveKey(
      {
        name: "ECDH",
        public: serverPubKey,
      },
      this.ECDH?.privateKey!,
      this.cypherAlgorithm,
      true,
      ["encrypt", "decrypt"]
    );
  }

  /**
   * Given a `pubKeyB64`, decode it from b64, then its characters are used to create a Buffer used to import the returned key.
   */
  private async parsePubKey(pubKeyB64: String) {
    const rawPubKey = window.atob(pubKeyB64 as string);

    const pubKeyBuffer = new Uint8Array(rawPubKey.length);
    for (let i = 0; i < rawPubKey.length; i++) {
      pubKeyBuffer[i] = rawPubKey.charCodeAt(i);
    }

    return await window.crypto.subtle.importKey(
      "raw",
      pubKeyBuffer,
      this.keyAlgorithm,
      false,
      []
    );
  }

  /**
   * Encrypts a `input` object following the App specified format.
   *
   * FORMAT:
   * [`message`: nLength, `authTag`: 16BytesLength, `IV`: 16BytesLength]
   */
  public async encrypt(input: object): Promise<String | null> {
    this.validateSPK();

    const stringInput = JSON.stringify(input);

    const secret = await this.computeSecret();

    const mesbuffer = this.stringToArrayBuffer(stringInput);
    const iv = window.crypto.getRandomValues(new Uint8Array(this.ivLength));

    const algorithm = { name: this.cypherAlgorithm.name, iv };

    const encryptedMessage = await window.crypto.subtle.encrypt(
      algorithm,
      secret,
      mesbuffer
    );

    const encOut = this.concatTypedArrays(
      Uint8Array,
      new Uint8Array(encryptedMessage),
      iv
    );

    const B64EncOut = this.arrayBufferToB64(encOut);

    return B64EncOut;
  }

  /**
   * Decrypts a message with the app specified format, given the message in b64 `B64Input`, and the user assigned `UUID`.
   */
  public async decrypt(B64Input: String): Promise<any | null> {
    this.validateSPK();

    const inputBuffer = this.base64ToBuffer(B64Input);

    const messageBuffer = inputBuffer.slice(0, -this.ivLength);
    const ivBuffer = inputBuffer.slice(-this.ivLength);

    const sharedSecret = await this.computeSecret();

    const algorithm = {
      name: this.cypherAlgorithm.name,
      iv: ivBuffer,
      tagLength: this.authTagLength * 8, // Bit length required
    };

    const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
      algorithm,
      sharedSecret!,
      messageBuffer
    );

    const decryptedJSON = this.arrayBufferToString(decryptedArrayBuffer!);

    return JSON.parse(decryptedJSON);
  }

  private concatTypedArrays<T extends Uint8Array | Uint16Array | Uint32Array>(
    type: { new (length: number): T },
    ...arrays: T[]
  ): T {
    const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

    const result = new type(totalLength);

    let offset = 0;
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }

    return result;
  }

  private stringToArrayBuffer(str: String) {
    let buffer = new ArrayBuffer(str.length);
    let bufferView = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
      bufferView[i] = str.charCodeAt(i);
    }

    return buffer;
  }

  private base64ToBuffer(base64: String): Uint8Array {
    const binaryString = window.atob(base64 as string);

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  private arrayBufferToString(arrayBuffer: ArrayBuffer) {
    const decoder = new TextDecoder();
    const string = decoder.decode(arrayBuffer);
    return string;
  }

  private arrayBufferToB64(buffer: ArrayBuffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private validateECDH() {
    if (!this.ECDH) throw new Error("ECDH object not initialized yet.");
  }

  private validateSPK() {
    this.validateECDH();
    if (!this.SPK) throw new Error("Server Public Key not registered yet.");
  }
}

export const E2EEncryptor = CryptoService.getInstance();
