<script setup lang="ts">

import { onMounted, inject, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// const inspectedProduct = ref({
//     id: -1,
//     description: "",
//     imageUrl: "",
//     price: 0
// });
// const isInspectorOpen = ref(false);
const router = useRouter();
const { products } = inject("products");
const { cart, addCartItem } = inject("cart");
const tileColumns = ref([
    new Array(),
    new Array(),
    new Array()
]);
const currentSliceStart = ref(0);
const tileStep = 5;

function requestFurtherTiles(): void {
    const end = currentSliceStart.value + tileStep;
    const newTiles = products.value.slice(currentSliceStart.value, end);
    if (newTiles.length === 0) {
        window.onscroll = null;
        return;
    }
    newTiles.forEach((newTile: any, tileIndex: number) => {
        const columnIndex = (tileIndex + currentSliceStart.value) % tileColumns.value.length;
        tileColumns.value[columnIndex].push(newTile);
    })
    currentSliceStart.value += tileStep;
}

// function openInspector(tile: any): void {
//     inspectedProduct.value = tile;
//     isInspectorOpen.value = true;
// }

onMounted(() => {
    requestFurtherTiles();
    window.addEventListener("scroll", () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            requestFurtherTiles();
        }
    });
})

</script>

<template>
    <section class="component-tiles">
        <div
            class="component-tiles__column"
            v-for="(column, cloumIndex) in tileColumns" :key="cloumIndex"
        >
            <img
                class="tile"
                v-for="(tile, tileIndex) in tileColumns[cloumIndex]" :key="tileIndex"
                v-bind:src="tile.imageUrl"
                @click="() => {
                    // openInspector(tile)
                    router.push(`/product?id=${tile.id}`);
                }"
            >
        </div>
        <!-- <div v-bind:class="`component-tiles__inspector${isInspectorOpen ? ' component-tiles__inspector--open' : ''}`">
            <img class="inspector__image" v-bind:src="inspectedProduct.imageUrl">
            <div class="product-info">
                <h2 class="product-info__description">
                    {{ inspectedProduct.description }}
                </h2>
                <p class="product-info__price">
                    {{ inspectedProduct.price }} EUR
                </p>
                <div class="controlls">
                    <RouterLink :to="`./product?id=${inspectedProduct.id}`" class="controlls__button controlls__button--view">
                        View
                    </RouterLink>
                    <button
                        class="controlls__button controlls__button--cart"
                        @click="() => {
                            addCartItem(inspectedProduct);
                        }"
                    >
                        Add To Cart
                    </button>
                    <button class="controlls__button controlls__button--close" @click="() => {isInspectorOpen = false}">
                        Close
                    </button>
                </div>
            </div>
        </div> -->
    </section>
</template>

<style scoped lang="scss">

.component-tiles {
    --gap: 10px;
    display: flex;
    gap: var(--gap);
    background-color: white;
    padding: var(--gap);
    border-radius: 5px;

    &__column {
        display: flex;
        flex-direction: column;
        gap: var(--gap);

        .tile {
            width: 100%;
            object-fit: contain;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba($color: #000000, $alpha: 1);
            transition: all .25s;
        }
    }

    // &__inspector {
    //     position: fixed;
    //     z-index: 400;
    //     top: 50%;
    //     left: 50%;
    //     width: 100vw;
    //     height: 100vh;
    //     translate: -50% -50%;
    //     display: none;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    //     backdrop-filter: blur(10px);

    //     &--open {
    //         display: flex;
    //     }

    //     .inspector__image {
    //         display: block;
    //         width: 300px;
    //         height: 300px;
    //         margin: 0 0 48px;
    //         object-fit: cover;
    //         border-radius: 10px;
    //         box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);
    //     }

    //     .product-info {
    //         position: relative;
    //         padding: 30px;
    //         box-sizing: border-box;
    //         background-color: rgba($color: #333, $alpha: .5);
    //         width: 300px;
    //         color: white;
    //         box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);
    //         border-radius: 10px;

    //         &::before {
    //             --shortening: 50px;

    //             content: "";
    //             display: block;
    //             position: absolute;
    //             top: -24px;
    //             left: 0px;
    //             background-color: white;
    //             box-shadow: 0 0 10px rgba(255, 255, 255, 1);
    //             width: calc(100% - var(--shortening));
    //             translate: calc(var(--shortening) / 2) 0;
    //             height: 2px;
    //         }

    //         &__description,
    //         &__price {
    //             margin: 0 0 24px;
    //             text-align: center;
    //             text-shadow: 0 0 5px rgba($color: white, $alpha: .5);
    //         }

    //         &__description {
    //             font-size: 36px;
    //         }

    //         &__price{
    //             font-size: 24px;
    //         }

    //         .controlls {
    //             display: flex;
    //             justify-content: center;
    //             gap: 10px;

    //             &__button {
    //                 --color: black;

    //                 display: inline-block;
    //                 padding: 10px;
    //                 border-radius: 400px;
    //                 cursor: pointer;
    //                 border: none;
    //                 text-decoration: none;
    //                 background-color: var(--color);
    //                 box-shadow: 0 0 10px var(--color);
    //                 color: #333;
    //                 font-size: 16px;

    //                 &--view {
    //                     --color: deepskyblue;
    //                 }

    //                 &--cart {
    //                     --color: chartreuse;
    //                 }

    //                 &--close {
    //                     --color: crimson;
                        
    //                 }
    //             }
    //         }
    //     }
    // }
}

</style>