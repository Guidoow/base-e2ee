<span name="top">

<div align="center">

[![LINKEDIN]][LINKEDIN-URL]

  <h1 align="center">BASE E2EE</h1>
  <p align="center" >Communication between <strong>Client</strong> and <strong>Server</strong> using <strong>End-to-End Encryption (E2EE).</strong><p>

</div>

<details>
  <summary>See content</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#process">Process</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#development">Development</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#[demo]-installation">Installation for test</a></li>
        >  <a href="#start">Start</a>
        <li><a href="#[dev]-implementation">Implementation for dev</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the project

This application demonstrates the implementation of an End-to-End Encryption (E2EE) system using modern and robust cryptography. It is almost entirely written in <strong>TypeScript</strong> and serves as a practical example or for starting point for developing secure applications that require the protection of privacy and data integrity through encryption.

<ul>
    <li>
        <strong>Elliptic Curve Diffie-Hellman Algorithm (ECDH)</strong> as key exchanging for establish a shared secret between both parts.
    </li>
    <li>
        <strong>Advanced Encryption Standard (AES)</strong> is used to encrypt and decrypt the data, using the <strong>Shared Secret</strong> as key.
    </li>
</ul>

### Process

<details>
  <summary>Server initialization</summary>
  <ol>
    <li>Starts creating its own ECHD key exchange object (KEO).</li>
    <li>Serve on HTTPS endpoints.</li>
  </ol>
</details>

<details>
  <summary>Client initialization</summary>
  <ol>
    <li>Client generates ECDH object or Key Exchange Object.</li>
    <li>Client generates RSA Key pair.</li>
  </ol>
</details>

<details>
  <summary>Handshake</summary>
  <ol>
    <li>Send a POST request including RSA PubKey and ECDH PubKey.</li>
    <li>Server store the keys, then return its ECDH PubKey and a new UUID for Authenticate the client.</li>
    <li>Client store server PubKey and the UUID.</li>
  </ol>
</details>

<details>
  <summary>Communication</summary>
  <ol>
    <li>Client compute the shared secret.</li>
    <li>Client encrypt (ECDH) the message.</li>
    <li>Client signs (RSA) the encrypted message.</li>
    <li>Client set headers 'UUID' and 'SIGNATURE' in Base64.</li>
    <li>Client send the encrypted message to the server.</li>
    <li>Server middleware checks the signature.</li>
    <li>Server middleware decrypt the message.</li>
    <li>Server reads the message and set a new one.</li>
    <li>Server encrypt the message and returns it.</li>
    <li>Client decrypt the message and display it.</li>
    </ol>
</details>

### Built With

[![NODE]][NODE-URL]
[![TS]][TS-URL]
[![EXPRESS]][EXPRESS-URL]
[![SVELTE]][SVELTE-URL]

### Development

If your intention is to use this code for development, you could easily extract the necessary modules, making sure to apply other security technologies, such as HTTPS, User Authentication such as JTW, not storing NON-PUBLIC keys, a key refresh logic to the server, among others.

### Demo

<strong>This project includes additional files as a demo</strong>: backend with a simple cli validation system based on RSA signatures, endpoints to handshake and chat, and a frontend, as a demonstration of the End-to-End Encryption (E2EE).

#### Warning

Those files may not provide a very good security by skipping some important steps, as it is not it's purpose.

## Getting Started

#### Once you are sure that you have the desired <a href="#prerequisites">Prerequisites</a> you can opt to <a href="#demo-installation">Install</a> the project and test it by yourself or <a href="#dev-implementation">Implement</a> it as a dev.

### Prerequisites

- NPM

  ```sh
  npm install npm@latest -g
  ```

- HTTPS CERTIFICATE AND KEY.

  You can generate your key and sign your own certificate by using

  ```sh
  openssl req -nodes -new -x509 -keyout private.key -out certificate.crt -days 365
  ```

### [DEMO] Installation

In this case you just want to test the application encryption and not use the modules for your project:

1. Clone the repo

   ```sh
   git clone https://github.com/guidoow/base-e2ee.git
   # OR
   git clone git@github.com:guidoow/base-e2ee.git
   ```

2. Install NPM packages
   on /backend and /frontend

   ```sh
   cd backend && npm install && npm audit fix
   cd ..
   cd frontend && npm install && npm audit fix
   ```

3. Build NPM packages
   on /backend and /frontend

   ```sh
   cd backend && npm run build
   cd ..
   cd frontend && npm run build
   ```

4. Set the route for Certificate and
   Key on both `.env` files to implement HTTPS.
   (HTTPS is required for use cryptography)

### Start

1. Start the application

   ```sh
   cd backend && sudo npm run start
   ```

   and

   ```sh
   cd frontend && sudo npm run start
   ```

   Now you can access to your https://localhost and test the demo using the base-e2ee!

##

### [DEV] Implementation

In this case you want to use only the modules to perform e2ee in your project whitout the demonstration data:

1. Include the modules manually from `/modules` into your project services.

2. Import the modules:

   ```sh
   // backend_or_frontend_project_file_or_module.ts
   import { E2EEncryptor } from 'services';
   ```

   Initialize it

   ```sh
   E2EEncryptor.createECDH();
   ```

   Extract the Public Key

   ```sh
   E2EEncryptor.getPubKey64();
   ```

   Use it

   ```sh
   E2EEncryptor.decrypt(message, Client_UUID)
   ```

## License

Distributed under the MIT License.

## Contact

- [Guido Moran](https://guidoow.github.io)

- [Email](mailto:guidomoran.ap@gmail.com)

- [Linkedin][LINKEDIN-URL]

- [Project Link](https://github.com/Guidoow/BASE-E2EE)

[LINKEDIN]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[LINKEDIN-URL]: https://linkedin.com/in/guidoow
[NEST]: https://img.shields.io/badge/NEST-white?style=for-the-badge&logo=nestjs&logoColor=e0234e
[NEST-URL]: https://nestjs.com/
[TS]: https://img.shields.io/badge/TYPESCRIPT-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TS-URL]: https://www.typescriptlang.org/
[NODE]: https://img.shields.io/badge/NODE.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NODE-URL]: https://nodejs.org/en
[SVELTE]: https://img.shields.io/badge/SVELTE-white?style=for-the-badge&logo=svelte
[SVELTE-URL]: https://svelte.dev/
[EXPRESS]: https://img.shields.io/badge/EXPRESS-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[EXPRESS-URL]: https://expressjs.com/
