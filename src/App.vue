<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import DefaultLayout from './components/DefaultLayout.vue';
import { provide, ref, onMounted } from 'vue';
import { getProducts } from './services/api/index.js';

const cart = ref(Array<any>());

function updateCart(newCart: any[]) {
  cart.value = newCart;
};

function addCartItem(newProduct: any) {
  const cartItemIndex = cart.value.findIndex(cartItem => newProduct.id === cartItem.id);
  if (cartItemIndex > -1) {
    cart.value[cartItemIndex].amount++;
  }
  else {
    cart.value = [...cart.value, {...newProduct, amount: 1}];
  }
}

function removeCartItem(targetProduct: any) {
  const cartItemIndex = cart.value.findIndex(cartItem => targetProduct.id === cartItem.id);
  if (cartItemIndex > -1) {
    cart.value[cartItemIndex].amount--;
    const foundCartItem = cart.value[cartItemIndex].amount;
    if (foundCartItem.amount <= 0) {
      cart.value = cart.value.filter(searchCartItem => searchCartItem.id !== foundCartItem.id);
      return;
    }
  }
}

provide("cart", {
  cart,
  updateCart
});

const products = ref(Array<any>());

function updateProducts(newProducts: any) {
  products.value = newProducts;
}

provide("products", {
  products,
  updateProducts
});

onMounted(() => {
  getProducts()
    .then(productsJSON => updateProducts(productsJSON.data));
})

</script>

<template>
  <DefaultLayout />
</template>

<style scoped>

</style>
