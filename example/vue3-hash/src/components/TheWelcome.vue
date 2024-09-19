<template>
  <div>
    <h1>home</h1>
    <button @click="btnclick1">手动埋点</button>
  </div>
</template>


<script setup>
import { getCurrentInstance } from 'vue';
const proxy = getCurrentInstance()


const btnclick1 = () => {
  console.log(proxy.appContext.config.globalProperties.$track);

  proxy.appContext.config.globalProperties.$track.transport.send({
    type: "event_click_nav",
    fromId: "dvergfcedfv",
    isTrack: true,
  });
};
</script>

