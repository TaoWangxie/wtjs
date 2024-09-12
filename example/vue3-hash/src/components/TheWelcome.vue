<script setup>
import { getCurrentInstance } from 'vue';
const proxy = getCurrentInstance()
const btnclick1 = () => {
  console.log(window.WTJS);
  
  proxy.appContext.config.globalProperties.$wtjs.transport.send({
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
