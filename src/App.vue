<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import DefaultLayout from './components/DefaultLayout.vue';
import { provide, ref } from 'vue';
import { getProducts } from './services/api';

const cart = ref(Array<any>());

function updateCart(newCart: any[]) {
  cart.value = newCart;
};

provide("cart", {
  cart,
  updateCart
});

const products = ref([]);

function updateProducts(newProducts: any) {
  products.value = newProducts;
}

provide("products", {
  products,
  updateProducts
});

getProducts().then(productsJSON => updateProducts(productsJSON.data));

</script>

<template>
  <DefaultLayout />
</template>

<style scoped>

</style>
