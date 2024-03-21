<script setup>
const btnclick1 =()=>{
  window.WebVitals.track({
    type:'event_click_nav',
    fromId:'dvergfcedfv'
  })

}
</script>

<template>
  <div>
    <h1>home</h1>
    <button @click="btnclick1">点击</button>
  </div>
</template>
