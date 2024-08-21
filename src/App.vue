<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import DefaultLayout from './components/DefaultLayout.vue';
import { provide, ref, onMounted } from 'vue';
import { getProducts } from './services/api/index.js';
import { getSessionCart, setSessionCart } from './services/cart/index.js';

const cart = ref(getSessionCart());

function updateCart(newCart: any[]) {
  cart.value = newCart;
  setSessionCart(cart.value);
};

function addCartItem(newProduct: any) {
  const cartItemIndex = cart.value.findIndex(cartItem => newProduct.id === cartItem.id);
  if (cartItemIndex > -1) {
    cart.value[cartItemIndex].amount++;
  }
  else {
    updateCart([...cart.value, {...newProduct, amount: 1}]);
  }
  setSessionCart(cart.value);
}

function removeCartItem(targetProduct: any) {
  const cartItemIndex = cart.value.findIndex(cartItem => targetProduct.id === cartItem.id);
  if (cartItemIndex > -1) {
    cart.value[cartItemIndex].amount--;
    const foundCartItem = cart.value[cartItemIndex];
    if (foundCartItem.amount <= 0) {
      updateCart(cart.value.filter(searchCartItem => searchCartItem.id !== foundCartItem.id));
      // return;
    }
  }
  setSessionCart(cart.value);
}

provide("cart", {
  cart,
  updateCart,
  addCartItem,
  removeCartItem
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
