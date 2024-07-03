interface response {
  body: string;
  statusCode: number;
  error?: String;
  headers?: Headers;
  iv?: string;
}

interface AuthHeaders {
  "X-Auth-UUID"?: string;
  "X-Auth-SIGNATURE"?: string;
}

class RequestService {
  private static instance: RequestService;
  private backend: string;

  constructor(backend: string) {
    this.backend = backend;
  }

  // singleton
  static getInstance(backend: string): RequestService {
    if (!RequestService.instance) {
      RequestService.instance = new RequestService(backend);
    }
    return RequestService.instance;
  }

  async get({
    url,
    headers = {},
    resMethod = "json",
  }: {
    url: string;
    headers?: Record<string, string>;
    resMethod?: "json" | "blob";
  }) {
    const AuthHeaders: AuthHeaders = this.getBasicAuthHeaders();

    // Assign AuthHeaders to supplied headers.
    for (const [prop, value] of Object.entries(AuthHeaders)) {
      headers[prop] = value;
    }

    const response = await fetch([this.backend, url].join("/"), {
      method: "GET",
      credentials: "include",
      headers,
    })
      .then(async (res) => {
        // include headers in response
        const headers = res.headers;
        const response = await res[resMethod]();
        response.headers = headers;

        return response;
      })
      .catch((error) => {
        console.log(
          "ERROR DETECTED FETCHING ",
          [this.backend, url].join("/"),
          error
        );
      });

    return response;
  }

  async custom({
    url,
    body,
    method = "POST",
    headers = {},
    credentials = "include",
    resMethod = "json",
  }: {
    url: string;
    body: string | object;
    method?: "POST";
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
    resMethod?: "json" | "blob";
  }): Promise<response> {
    // normalize body
    if (typeof body === "object") body = JSON.stringify(body);

    const AuthHeaders: AuthHeaders = this.getBasicAuthHeaders();

    // Assign AuthHeaders to supplied headers.
    for (const [prop, value] of Object.entries(AuthHeaders)) {
      headers[prop] = value;
    }

    if (!headers["Content-Type"]) headers["Content-Type"] = "text/plain";

    const response = await fetch([this.backend, url].join("/"), {
      method,
      headers,
      credentials,
      body,
    })
      .then(async (res) => {
        const headers = res.headers; // include headers
        const response = await res[resMethod]();

        response.headers = headers;

        return response;
      })
      .catch((error) => {
        console.log(
          "ERROR DETECTED FETCHING ",
          [this.backend, url].join("/"),
          error
        );

        return null;
      });

    return response;
  }

  private getBasicAuthHeaders() {
    const AuthHeaders: AuthHeaders = {};

    AuthHeaders["X-Auth-UUID"] = sessionStorage.getItem("X-Auth-UUID")!;

    if (!AuthHeaders["X-Auth-UUID"]) delete AuthHeaders["X-Auth-UUID"];

    return AuthHeaders;
  }
}

export const requestSVC = RequestService.getInstance(
  `${window.location.origin}:${import.meta.env.PORT}`
);
