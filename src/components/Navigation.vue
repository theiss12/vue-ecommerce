<script setup lang="js">

import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, watch, inject } from 'vue';

const { cart } = inject("cart");

const route = useRoute();
const router = useRouter();

const navigationItems = ref([
    {path: "/", label: "Home"},
    {path: "/about", label: "About"},
    // {path: "/products", label: "Products"},
    {path: "/cart", label: "Cart"}
]);
const navigationClosed = ref(true);
const searchTerm = ref("");

function toggleNavigation() {
    navigationClosed.value = !navigationClosed.value;
}

function startSearch(submit) {
    submit.preventDefault();
    router.push(`/search?term=${searchTerm.value}`)
    searchTerm.value = "";
}

watch(route, () => {
    navigationClosed.value = true;
});

</script>

<template>
    <nav class="component-navigation">
        <ul v-bind:class="`component-navigation__items${navigationClosed ? ' component-navigation__items--closed' : ''}`">
            <li class="navigation-item" v-for="(navigationItem, itemIndex) in navigationItems" :key="itemIndex">
                <RouterLink v-bind:to="navigationItem.path">
                    <span class="pieces-indicator" v-if="cart.reduce((total, cartItem) => total = total + cartItem.amount, 0) > 0 && navigationItem.label === 'Cart'">
                        {{ cart.reduce((total, cartItem) => total = total + cartItem.amount, 0) }}
                    </span>
                    {{ navigationItem.label }}
                </RouterLink>
            </li>
            <li class="navigation-item navigation-item--search">
                <form class="search-container" @submit="startSearch">
                    <input
                        class="search-input"
                        type="text"
                        placeholder="🔎Search for products..."
                        @input="input => searchTerm = input.target.value"
                        :value="searchTerm"
                    >
                </form>
            </li>
            <li class="navigation-item--toggle">
                <button
                    class="toggle-button"
                    @click="toggleNavigation"
                >
                    <span class="down-arrow"></span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">

.component-navigation {
    &__items {
        list-style-type: none;
        padding: 0;
        margin: 0;

        .navigation-item {
            padding: 0;
            margin: 0;

            &--search {
                padding: 8px 0;
                background-color: orange;
                box-shadow: 0 0 20px rgba(0,0,0,.5);

                .search-input {
                    display: block;
                    margin: 0 auto;
                    background-color: rgba(255,255,255,0.5);
                    border: none;
                    font-size: 18px;
                    padding: 10px;
                    border-bottom: 2px solid black;
                }
            }

            a {
                display: block;
                text-decoration: none;
                color: #333;
                font-size: 18px;
                font-weight: bold;
                background-color: orange;
                padding: 20px 0px;
                overflow: hidden;
                text-align: center;
                transition: all .25s;
                box-shadow: 0 0 20px rgba(0,0,0,.5);

                .pieces-indicator {
                    --size: 20px;

                    width: var(--size);
                    height: var(--size);
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid #333;
                    border-radius: 2px;
                }
            }

            &--toggle {
                position: relative;
                text-align: center;

                .toggle-button {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    translate: -50% 0;
                    z-index: 400;
                    width: 80px;
                    height: 40px;
                    border-radius: 0 0 5px 5px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    background-color: orange;
                    border: none;
                    padding: 0;

                    .down-arrow {
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-bottom: 3px solid #333;
                        border-right: 3px solid #333;
                        transition: all .25s;
                        rotate: 225deg;
                    }
                }
            }
        }

        &--closed {
            .navigation-item {
                a {
                    padding: 0px 0px;
                    height: 0px;
                }

                &--toggle {
                    .toggle-button {
                        .down-arrow {
                            rotate: 45deg;
                        }
                    }
                }

                &--search {
                padding: 0px 0;
                height: 0px;

                .search-input {
                    padding: 0px 10px;
                    height: 0px;
                    border-bottom-width: 0px;
                }
            }
            }
        }
    }

    // @media (min-width: 421px) {
    //     .component-navigation {
    //         &__items {

    //             .navigation-item {
                    
    //                 a {
                        
    //                 }

    //                 &--toggle {
    //                     display: none;
    //                 }
    //             }
    //         }
    //     }
    // }
}

</style>