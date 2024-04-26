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

  /**
   * Given a RSA `PubKey`, creates a UUID to that client, register the key associated with that UUID, then returns the UUID.
   */
  public registerClient(PubKeyRSA: String) {
    const UUID = crypto.randomUUID() as String;

    const PUBK = Buffer.from(PubKeyRSA, "base64");

    Store.setKey("AUTH_KEY", { PUBK, UUID });

    return UUID;
  }

  public validateSignature(UUID: string, signature: string, data: string) {
    this.validateCPK(UUID);

    const verify = crypto.createVerify("SHA256");

    const publicKey = this.getPublicKey(UUID);

    verify.update(data);

    return verify.verify(publicKey!, signature, "base64");
  }

  private getPublicKey(UUID: string) {
    const pk = Store.getKey("AUTH_KEY", UUID)?.PUBK;

    const publicKey = crypto.createPublicKey({
      key: pk!,
      format: "der",
      type: "spki",
    });

    return publicKey;
  }

  private validateCPK(UUID: String) {
    if (!Store.getKey("AUTH_KEY", UUID))
      throw new Error("Client RSA Public Key not registered yet.");
  }
}

export const RSAAuthenticator = CryptoService.getInstance();
