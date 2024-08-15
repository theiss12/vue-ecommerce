<script setup lang="ts">

import { inject } from 'vue';

const {cart, updateCart} = inject("cart");

// onMounted(() => {
//     updateCart([
//         {
//             id: 1,
//             name: "Some Product",
//             price: "1999",
//             amount: 2
//         }
//     ])
// });

</script>

<template>
    <section class="screen-cart">
        <div class="container">
            <div class="screen-cart__items">
                <div
                    class="cart-item"
                    v-for="(cartItem, cartItemIndex) in cart" :key="cartItemIndex"
                >
                    <h2 class="cart-item__name">
                        {{ cartItem.name }}
                    </h2>
                    <p class="cart-item__price">
                        {{ cartItem.price + " EUR" }}
                    </p>
                    <p>
                        {{ cartItem.amount }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>