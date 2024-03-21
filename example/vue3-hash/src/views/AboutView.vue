<template>
  <div class="about">
    <h1>About</h1>
    <button @click="btnclick">点击(js)</button>
    <button @click="btnclick2">点击(reject)</button>

  </div>
</template>
<script setup>

const btnclick =()=>{
  console.log(window.a.b)
}

const btnclick2 =()=>{
  new Promise((resolve,reject)=>{
    reject('promise--reject')
  })
}

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
