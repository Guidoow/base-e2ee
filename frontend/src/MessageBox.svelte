<script lang="ts">
  interface Message {
    content: string;
    createdAt: Date;
    author: String;
    emoji?: String;
  }

  export let message: Message;

  const cli = message.author !== "Express" ? 1 : 0;

  const boxColor = cli ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.5)";
  const side = cli ? "right" : "left";
</script>

<div class="message-box">
  <div class="message-text {side}" style="--bg:{boxColor}">
    {message.content}
  </div>
</div>

<style>
  .message-box {
    position: relative;
    margin: 0.75rem 0.2rem;
    padding-right: 0.4rem;
    box-sizing: border-box;

    width: 100%;
  }

  .message-text {
    position: relative;
    width: fit-content;

    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-word;

    padding: 8px 12px;

    background-color: var(--bg);
  }

  .right {
    float: right;
    text-align: end;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;

    margin-left: 4.5rem;
  }

  .right::after {
    position: absolute;
    display: block;
    right: 0px;
    bottom: -10.5px;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%);

    border-bottom-right-radius: 5px;
    content: "";
    width: 12px;
    height: 11px;
    background-color: var(--bg);
  }

  .left {
    float: left;
    text-align: start;

    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    margin-right: 4.5rem;
  }

  .left::after {
    position: absolute;
    display: block;
    left: 0px;
    bottom: -10.5px;
    clip-path: polygon(0% 0%, 100% 0%, 0% 100%);

    border-bottom-left-radius: 5px;
    content: "";
    width: 12px;
    height: 11px;
    background-color: var(--bg);
  }
</style>
