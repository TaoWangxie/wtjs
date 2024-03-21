<script setup>
const btnclick1 =()=>{
  window.wtjsInstance.transport.send({
    type:'event_click_nav',
    fromId:'dvergfcedfv'
  })

}
</script>

<template>
  <div>
    <h1>home</h1>
    <button @click="btnclick1">手动埋点</button>
  </div>
</template>
