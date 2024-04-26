import { KEY_STORE } from "../interfaces";

type keyTypes = "E2EE_KEY" | "AUTH_KEY";

class StoreService {
  private static instance: StoreService;

  static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService();
    }
    return StoreService.instance;
  }

  private readonly AUTH_KEY: Array<KEY_STORE> = [];
  private readonly E2EE_KEY: Array<KEY_STORE> = [];

  public getKey(keyType: keyTypes, UUID: String) {
    return this[keyType].find((key) => key.UUID === UUID);
  }

  public setKey(keyType: keyTypes, keyStore: KEY_STORE) {
    if (this.getKey(keyType, keyStore.UUID)) {
      // remove if exists.
      this.delKey(keyType, keyStore.UUID);
    }

    this[keyType].push(keyStore);
  }

  public delKey(keyType: keyTypes, UUID: String) {
    const indexToRemove = this[keyType].findIndex((key) => key.UUID !== UUID);
    this[keyType].splice(indexToRemove, 1);
  }
}

export const Store = StoreService.getInstance();
