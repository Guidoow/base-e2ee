import { readFileSync } from "fs";

class credentialsService {
  private static instance: credentialsService;

  static getInstance(): credentialsService {
    if (!credentialsService.instance) {
      credentialsService.instance = new credentialsService();
    }
    return credentialsService.instance;
  }

  private certificate: undefined | string;
  private key: undefined | string;

  private requested = 0;

  public read() {
    try {
      this.certificate = readFileSync(
        process.env.SSL_CERTIFICATE_PATH!,
        "utf-8"
      );
    } catch (error) {
      throw new Error(
        "Error while trying to read the certificate for HTTPS upgrade."
      );
    }

    try {
      this.key = readFileSync(process.env.SSL_KEY_PATH!, "utf-8");
    } catch (error) {
      throw new Error(
        "Error while trying to read the private key for HTTPS upgrade."
      );
    }

    this.requested += 1;
  }

  public get() {
    const allowed = this.requested === 1 && this.certificate && this.key;
    if (allowed) return { key: this.key, cert: this.certificate };
  }
}

export const Credentials = credentialsService.getInstance();
