<script setup lang="ts">

import { inject } from 'vue';
import { RouterLink } from "vue-router";

const { cart, addCartItem, removeCartItem } = inject("cart");

</script>

<template>
    <section class="screen-cart">
        <div class="container">
            <div v-if="cart.length !== 0" class="screen-cart__items">
                <div
                    class="cart-item"
                    v-for="(cartItem, cartItemIndex) in cart" :key="cartItemIndex"
                >
                    <img :src="cartItem.imageUrl" class="cart-item__image">
                    <h2 class="cart-item__description">
                        {{ cartItem.description }}
                    </h2>
                    <div class="amount-changing">
                        <button
                            class="amount-changing__button amount-changing__button--minus"
                            @click="() => { removeCartItem(cartItem) }"
                        >
                            -{{ cartItem.amount - 1 }}
                        </button>
                        <p class="amount-changing__amount" :title="`${cartItem.amount} pcs`">
                            {{ cartItem.price * cartItem.amount }} EUR
                        </p>
                        <button 
                            class="amount-changing__button amount-changing__button--plus"
                            @click="() => { addCartItem(cartItem) }"
                        >
                            +{{ cartItem.amount + 1 }}
                        </button>
                    </div>
                    <button
                        class="cart-item__delete-button"
                        @click="() => {
                            cartItem.amount = 0;
                            removeCartItem(cartItem);
                        }"
                    >
                        🗑
                    </button>
                </div>
            </div>
            <div v-else class="empty-cart">
                <p class="empty-cart__message">
                    The cart is empty.
                </p>
            </div>
            <RouterLink v-if="cart.length !== 0" to="/checkout" class="screen-cart__checkout-button">Checkout</RouterLink>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .screen-cart {
        &__items {
            padding: 0 20px;

            .cart-item {
                position: relative;
                display: flex;
                // flex-direction: column;
                justify-content: space-between;
                align-items: center;
                margin: 48px 0;
                padding: 12px;
                background-color: orange;
                border-radius: 5px;
                box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);

                &:nth-child(even) {
                    background-color: rgb(255, 221, 127);
                }

                &__image {
                    --size: 100px;

                    width: var(--size);
                    height: var(--size);
                    object-fit: cover;
                    border-radius: 5px;
                    box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);
                }

                &__description {
                    margin: 0;
                    font-size: 16px;
                    text-align: center;
                    width: 100px;
                }

                // &__price {
                //     margin: 0;
                //     font-size: 16px;
                //     text-align: center;
                //     width: 40px;
                // }

                .amount-changing {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    &__amount {
                        margin: 0;
                        font-size: 16px;
                        text-align: center;
                        text-decoration: underline;
                    }

                    &__button {
                        border: none;
                        background-color: black;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width:30px;
                        height: 30px;
                        padding: 0px;
                        border-radius: 50%;
                        transition: all .25s;
                        box-shadow: 0 0 10px rgba($color: #000000, $alpha: .5);

                        &:active {
                            scale: 1.2;
                        }
                    }
                }

                &__delete-button {
                    padding: 0;
                    cursor: pointer;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background-color: red;
                    font-size: 21px;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba($color: #000000, $alpha: .5);
                }
            }
        }

        &__checkout-button {
            cursor: pointer;
            text-decoration: none;
            color: black;
            display: block;
            margin: 0 auto 32px;
            width: fit-content;
            padding: 20px;
            font-size: 24px;
            background-color: orange;
            border-bottom: 3px solid black;
        }

        .empty-cart {
            width: 66vw;
            min-height: 25vh;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            color: crimson;
            background-color: white;
            border-left: 3px solid crimson;
            font-size: 36px;
            animation-name: pulsate;
            animation-duration: 2s;
            animation-iteration-count: infinite;

            &__message {
                margin: 0;
                text-align: center;
            }
        }

        @keyframes pulsate {
            0% {
                scale: 1;
            }

            50% {
                scale: 1.1;
                box-shadow: 0 0 20px crimson;
            }
        }
    }

    @media (min-width: 421px) {
        .screen-cart {
            &__items {
                .cart-item {
                    max-width: 50%;
                    margin: 48px auto;

                    &__image {
                        --size: 150px;
                    }

                    &__description {
                        width: 33%;
                        font-size: 32px;
                    }

                    .amount-changing {

                        &__amount {
                            font-size: 24px;
                        }

                        &__button {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            font-weight: bold;
                        }
                    }

                    &__delete-button {
                        font-size: 32px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 36px;
                        height: 36px;
                    }
                }
            }

            .empty-cart {
                width: 30vw;
                min-height: 25vh;
            }
        }
    }
</style>