import { RSAAuthenticator, E2EEncryptor, requestSVC } from "./";

interface Message {
  content: string;
  createdAt: Date;
  color: String;
  author: String;
  emoji?: String;
}

class ManagerService {
  private static instance: ManagerService;

  static getInstance(): ManagerService {
    if (!ManagerService.instance) {
      ManagerService.instance = new ManagerService();
    }
    return ManagerService.instance;
  }

  public async initialize() {
    await RSAAuthenticator.createRSA();
    await E2EEncryptor.createECDH();

    await this.doHandshake();
  }

  public async sendMessage(message: Message): Promise<Message | null> {
    const encryptedBody = (await E2EEncryptor.encrypt(message)) as string;

    const signature = await RSAAuthenticator.signMessageToB64(encryptedBody);

    const response = await requestSVC.custom({
      url: "chat",
      body: encryptedBody,
      headers: {
        "X-Auth-Signature": signature,
      },
    });

    if (response.body) {
      return await E2EEncryptor.decrypt(response.body!);
    }

    return null;
  }

  public async doHandshake() {
    const body = {
      RSA: await RSAAuthenticator.getPubKeyB64()!,
      ECDH: await E2EEncryptor.getPubKeyB64()!,
    };

    const headers = { "Content-Type": "application/json" };

    const response = await requestSVC.custom({
      url: "handshake",
      body,
      headers,
      resMethod: "json",
    });

    const UUID = response.headers?.get("x-auth-uuid") as string;
    sessionStorage.setItem("X-Auth-UUID", UUID);

    E2EEncryptor.registerServer(response.body!);
  }
}

export const manager = ManagerService.getInstance();
