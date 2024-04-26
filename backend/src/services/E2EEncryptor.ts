import * as crypto from "crypto";
import { Store } from "./Store";

class CryptoService {
  private static instance: CryptoService;

  static getInstance(): CryptoService {
    if (!CryptoService.instance) {
      CryptoService.instance = new CryptoService();
    }
    return CryptoService.instance;
  }

  private readonly curveName = "prime256v1";
  private readonly algorithm = "aes-256-gcm";
  private readonly authTagLength = 16;
  private readonly IVLength = 16;

  /**
   * Key Exchange Object or ECDH Object.
   *
   * Elliptic Curve Diffie-Hellman algorithm used to compute the shared keys.
   */
  private ECDH: undefined | crypto.ECDH;

  /**
   * Creates a new unique ECDH or Key Exchange Object (KEO).
   *
   * Used to initialize or refresh the server keys in certain case.
   */
  public async registerClient(PubKeyECDH64: String, UUID: String) {
    const PUBK = this.b64tobuffer(PubKeyECDH64 as string);

    Store.setKey("E2EE_KEY", { PUBK, UUID });
  }

  /**
   * Creates a new unique ECDH or Key Exchange Object (KEO).
   *
   * Used to initialize or refresh the server keys in certain case.
   */
  public async createECDH() {
    const ECDH = crypto.createECDH(this.curveName);

    ECDH.generateKeys();

    this.ECDH = ECDH;
  }

  /**
   * If there is a ECDH or KEO, gets its PK, converts it to B64 then returns it.
   */
  public getPubKeyB64(): String | null {
    this.validateECDH();

    return this.ECDH ? this.bufferToB64(this.ECDH.getPublicKey()!) : null;
  }

  /**
   * Given a valid client `UUID`, computes the shared secret then returns it.
   */
  public computeSecret(UUID: String): Buffer | undefined {
    this.validateECDH();

    const pubKeyBuffer = Store.getKey("E2EE_KEY", UUID)?.PUBK!;

    return this.ECDH?.computeSecret(pubKeyBuffer);
  }

  /**
   * Encrypts a `input` object following the App specified format, given the client `UUID`.
   *
   * FORMAT:
   * [`message`: nLength, `authTag`: 16BytesLength, `IV`: 16BytesLength]
   */
  public encrypt(input: object, UUID: String): String {
    this.validateCPK(UUID);

    const sharedSecret = this.computeSecret(UUID);

    const initVector = crypto.randomBytes(this.IVLength);
    const stringInput = JSON.stringify(input);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      sharedSecret!,
      initVector
    );

    const body = Buffer.concat([
      cipher.update(stringInput, "utf8"),
      cipher.final(),
      cipher.getAuthTag(),
      initVector,
    ]);

    return body.toString("base64");
  }

  /**
   * Decrypts a message with the app specified format, given the message in b64 `B64Input`, and the user assigned `UUID`.
   */
  public decrypt(B64Input: String, UUID: String): string | Buffer {
    this.validateCPK(UUID);

    const secret = this.computeSecret(UUID);

    const { encMessage, authTag, initVector } = this.destructureBody(B64Input);

    const decipher = crypto
      .createDecipheriv(this.algorithm, secret!, initVector)
      .setAuthTag(authTag);

    const decMessage = Buffer.concat([
      decipher.update(encMessage),
      decipher.final(),
    ]);

    return JSON.parse(decMessage.toString("utf-8"));
  }

  /**
   * Destructure a B64 String of the encoded data supplied by the client in the App specified format.
   *
   */
  private destructureBody(B64Input: String) {
    const arrayBuffer = this.b64tobuffer(B64Input);

    const data = new Uint8Array(arrayBuffer);
    const messageEnd = -this.authTagLength - this.IVLength;

    const encMessage = data.slice(0, messageEnd);
    const authTag = data.slice(messageEnd, -this.IVLength);
    const initVector = data.slice(-this.IVLength);

    return { encMessage, authTag, initVector };
  }

  private bufferToB64(buffer: Buffer) {
    const spk64 = buffer.toString("base64");

    return spk64;
  }

  private b64tobuffer(b64str: String) {
    return Buffer.from(b64str, "base64");
  }

  private validateECDH() {
    if (!this.ECDH) throw new Error("ECDH object not initialized yet.");
  }

  private validateCPK(UUID: String) {
    this.validateECDH();
    if (!Store.getKey("E2EE_KEY", UUID))
      throw new Error("Client ECDH Public Key not registered yet.");
  }
}

export const E2EEncryptor = CryptoService.getInstance();
