<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { onMount } from "svelte";

  import { manager } from "./services";

  import profileImage from "/profile.svg";
  import MessageBox from "./MessageBox.svelte";

  interface Message {
    content: string;
    createdAt: Date;
    color: String;
    author: String;
    emoji?: String;
  }

  const Messages: Writable<Array<Message>> = writable([]);

  let inputMessage = "Hello world! ";
  let serverTyping = false;
  let allowedToSend = true;

  onMount(async () => {
    manager.initialize();
  });

  /**
   * Handles sending a message, including from doing the request to refresh the frontend.
   */
  async function send() {
    if (allowedToSend && inputMessage !== "") {
      allowedToSend = false;

      const message = formatMessageBody();
      inputMessage = "";
      triggerResponseBox();

      $Messages = [...$Messages, message];

      setTimeout(scrollEndBox, 100);

      setTimeout(async () => {
        const receivedMessage = (await manager.sendMessage(message))!;

        addMessage(receivedMessage);

        triggerResponseBox();
        allowedToSend = true;
      }, 2500);
    }
  }

  function addMessage(message: Message) {
    const content = message.content;
    message.content = "";

    $Messages = [...$Messages, message];
    const pos = $Messages.length - 1;

    const quarter = Math.floor(content.length / 4);
    const scrollBreak = [quarter, quarter * 2, quarter * 3, quarter * 4 - 1];

    // updates the message in the frontend step by step, simulating writing it gradually and updating the scroll.
    for (let i = 0; i < content.length; i++) {
      setTimeout(() => {
        if (!i || scrollBreak.includes(i)) scrollEndBox();
        Messages.update((MS) => {
          MS[pos].content += content[i];
          return MS;
        });
      }, i * 35);
    }

    // Adds the emoji received to the end of the message and update the scroll.
    setTimeout(
      () => {
        if (message.emoji) {
          Messages.update((MS) => {
            MS[pos].content += ` ${decodeEmoji(message.emoji)}`;
            return MS;
          });
        }

        setTimeout(scrollEndBox, 100);
      },
      content.length * 35 + 100
    );
  }

  function formatMessageBody(): Message {
    return {
      author: "client",
      color: "black",
      content: inputMessage,
      createdAt: new Date(),
    };
  }

  function decodeEmoji(emoji: String | undefined) {
    if (emoji) {
      const decoder = new TextDecoder("utf-8");
      const bytes = Uint8Array.from(atob(emoji as string), (c) =>
        c.charCodeAt(0)
      );
      const decoded = decoder.decode(bytes);
      return decoded;
    }
    return null;
  }

  /**
   * Scrolls the messages box to the end.
   */
  function scrollEndBox() {
    const elem = document.getElementById("messages-container");

    elem?.scrollTo({ top: elem.scrollHeight + 1200, behavior: "smooth" });
  }

  /**
   * Changes a variable for display the bottom bar simulating the server writting a message.
   */
  async function triggerResponseBox() {
    serverTyping = !serverTyping;
  }

  /**
   * Manages the KeyboardEvent for 'enter', sending the message if it is pressed.
   */
  async function enter(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      await send();
      event.preventDefault();
    }
  }
</script>

<main>
  <div class="chat-container">
    <div class="profile">
      <span id="profile-image">
        <img src={profileImage} width="100%" height="100%" alt="" />
      </span>
      <span id="profile-name">Server</span>
    </div>
    <div class="messages-container" id="messages-container">
      {#each $Messages as message}
        <MessageBox {message} />
      {/each}
    </div>
    {#if serverTyping}
      <div class="bottom-writting"></div>
    {/if}
  </div>

  <textarea
    class="message-textbox"
    cols="30"
    rows="10"
    contenteditable="true"
    bind:value={inputMessage}
    on:keypress={enter}
  ></textarea>

  <button class="send" on:click={send}>Send</button>
</main>

<style>
  main {
    min-width: calc(100vw - 16rem);
    min-height: calc(100vh - 8rem);

    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    margin: 4rem 8rem;

    max-height: 100vh;
  }

  .chat-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    border-radius: 8px;

    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.35);

    margin-bottom: 1rem;

    min-width: 350px;
    max-width: 650px;

    min-height: calc(100vh - 18rem);
    max-height: calc(100vh - 18rem);

    overflow: hidden;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 10px 7px 1px rgba(0, 0, 0, 0.1);

    border-bottom: 1px solid rgb(0, 0, 0, 0.1);
    padding: 3px;
  }
  #profile-image {
    margin: 4px 10px;
    padding: 5px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  #profile-name {
    margin: 10px 20px;
    font-size: 1.15rem;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    flex: 1;

    position: relative;

    margin: 0.1rem 0.5rem;
    padding-right: 0.5rem;
    box-sizing: content-box;

    width: calc(100% - 1rem);
    max-height: 100%;

    overflow: hidden scroll;
  }

  .send {
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.25);

    width: 100px;
  }

  .message-textbox {
    display: flex;

    min-width: 330px;
    max-width: 450px;

    min-height: 1.5rem;
    max-height: 4rem;

    font-size: large;

    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.05);

    margin-bottom: 1rem;
    padding: 8px;
  }

  .bottom-writting {
    transition: 0.5s;
    position: absolute;
    bottom: -75px;
    opacity: 0;

    width: 100%;
    height: 0rem;

    box-shadow: 0px -15px 10px 25px rgba(0, 0, 0, 0.3);

    animation: slide-in 1s forwards ease-out;
  }

  .bottom-writting::after {
    position: absolute;
    left: 49%;
    bottom: 10px;
    content: "...";

    animation: writting-suspense 1s infinite ease-in-out;
  }

  @keyframes writting-suspense {
    0% {
      content: "";
    }

    25% {
      content: ".";
    }

    50% {
      content: "..";
    }

    75% {
      content: "...";
    }

    100% {
      content: "...";
    }
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      bottom: -75px;
    }

    to {
      bottom: 0px;
      opacity: 1;
    }
  }
</style>
