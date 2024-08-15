<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const navigationItems = ref([
    {path: "/", label: "Home"},
    {path: "/about", label: "About"},
    // {path: "/products", label: "Products"},
    {path: "/cart", label: "Cart"}
]);
const navigationClosed = ref(true);

function toggleNavigation(): void {
    navigationClosed.value = !navigationClosed.value;
}

</script>

<template>
    <nav class="component-navigation">
        <ul v-bind:class="`component-navigation__items${navigationClosed ? ' component-navigation__items--closed' : ''}`">
            <li class="navigation-item" v-for="(navigationItem, itemIndex) in navigationItems" :key="itemIndex">
                <RouterLink v-bind:to="navigationItem.path">
                    {{ navigationItem.label }}
                </RouterLink>
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
            }
        }
    }

    @media (min-width: 421px) {
        .component-navigation {
            &__items {

                .navigation-item {
                    
                    a {
                        
                    }

                    &--toggle {
                        display: none;
                    }
                }
            }
        }
    }
}

</style>