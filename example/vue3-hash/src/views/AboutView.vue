<template>
  <div class="about">
    <h1>About</h1>
    <button @click="btnclick">错误上报 （ js ）</button>
    <br />
    <button @click="btnclick2">错误上报 （ promise.reject ）</button>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
const btnclick = () => {
  console.log(window.a.b);
};
onMounted(() => {
  // console.log(window.a.c);
});
const btnclick2 = () => {
  new Promise((resolve, reject) => {
    reject("promise--reject");
  });
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
