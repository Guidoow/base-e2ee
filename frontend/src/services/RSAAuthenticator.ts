class CryptoService {
  private static instance: CryptoService;

  static getInstance(): CryptoService {
    if (!CryptoService.instance) {
      CryptoService.instance = new CryptoService();
    }
    return CryptoService.instance;
  }

  private readonly algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: { name: "SHA-256" },
  };

  private KEYPAIR: CryptoKeyPair | undefined;

  public async createRSA() {
    this.KEYPAIR = await window.crypto.subtle.generateKey(
      this.algorithm,
      true,
      ["sign", "verify"]
    );
  }

  public async getPubKeyB64() {
    this.validateRSA();

    const pkArray = new Uint8Array(
      await window.crypto.subtle.exportKey("spki", this.KEYPAIR?.publicKey!)
    );

    return btoa(String.fromCharCode.apply(null, Array.from(pkArray)));
  }

  public async signMessageToB64(message: String) {
    this.validateRSA();

    const encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message as string);

    const signedMessageArray = new Uint8Array(
      await window.crypto.subtle.sign(
        this.algorithm.name,
        this.KEYPAIR?.privateKey!,
        encodedMessage
      )
    );

    const signedMessage = String.fromCharCode.apply(
      null,
      Array.from(signedMessageArray)
    );

    const B64Signature = btoa(signedMessage);

    return B64Signature;
  }

  private validateRSA() {
    if (!this.KEYPAIR) throw new Error("RSA keypair not initialized yet.");
  }
}

export const RSAAuthenticator = CryptoService.getInstance();
