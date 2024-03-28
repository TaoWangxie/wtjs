<script setup>
const btnclick1 = () => {
  window.WTJS.transport.send({
    type: "event_click_nav",
    fromId: "dvergfcedfv",
    isTrack: true,
  });
};
</script>

<template>
  <div>
    <h1>home</h1>
    <button @click="btnclick1">手动埋点</button>
  </div>
</template>
