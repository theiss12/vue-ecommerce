<script setup>

</script>

<template>
  <section class="screen-about">
    <div class="container">
      <h1>About</h1>
      <ol>
        <li>This is a demo project for Vue framework.</li>
        <li>Nothing is sold here.</li>
        <li>This is just a mock e-shop</li>
        <li>Even if you complete the checkout process</li>
        <li>So go spend your money somewhere else :)</li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .screen-about {
    color: white;
  }

  @media (min-width: 421px) {
    .screen-about {
      * {
        font-size: 36px;
      }
    }
  }
</style>
