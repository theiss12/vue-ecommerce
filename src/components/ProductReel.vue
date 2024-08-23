<script setup lang="ts">

import { ref, inject, onMounted } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const { products } = inject("products");
const activeIndex = ref(0);
const intervalId = ref(0);
const randomProducts = ref(shuffle(products.value).slice(0, 5));

function shuffle(array: any[]) {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }
    return shuffledArray;
}

function rerollRandoms() {
    const newRandoms = shuffle(products.value).slice(0, 5);
    randomProducts.value = newRandoms;
    activeIndex.value = 0;
}

function changeSlideIndexBy(amount: number): void {
    let newIndex = activeIndex.value + amount;
    // activeIndex.value = Math.min(Math.max(newIndex, 0), randomProducts.value.length - 1);
    if (newIndex >= randomProducts.value.length) newIndex = 0;
    if (newIndex < 0) newIndex = randomProducts.value.length - 1;
    activeIndex.value = newIndex;
}

function restartInterval() {
    clearInterval(intervalId.value);
    intervalId.value = setInterval(() => {
        changeSlideIndexBy(1);
    }, 3000);
}

onMounted(() => {
    intervalId.value = setInterval(() => {
        changeSlideIndexBy(1);
    }, 3000);
});

</script>

<template>
    <section class="component-slider">
        <button
            class="reroll-button"
            @click="() => {
                rerollRandoms();
                restartInterval();
            }"
        >
            ↺
        </button>
        <div class="component-slider__slides">
            <div 
                v-for="(product, index) in randomProducts" :key="index"
                v-bind:class="`slide${index === activeIndex ? ' slide--active' : ''}`"
                v-bind:style="`background-image: url('${product.imageUrl}')`"
                @click="() => { router.push(`/product?id=${product.id}`) }"
            >
                <h2 class="slide__description" @click="() => { router.push(`/product?id=${product.id}`) }">
                    {{ product.description }}
                </h2>
            </div>
        </div>
        <div class="component-slider__controlls">
            <button
                class="swap-button swap-button--left"
                @click="() => {
                    changeSlideIndexBy(-1);
                    restartInterval();
                }"
            >
                <span class="arrow"></span>
            </button>
            <button
                class="swap-button swap-button--right"
                @click="() => {
                    changeSlideIndexBy(1);
                    restartInterval();
                }"
            >
                <span class="arrow"></span>
            </button>
        </div>
        <div class="component-slider__pagination">
            <button
                v-for="(product, productIndex) in randomProducts" :key="productIndex"
                v-bind:value="productIndex"
                @click="() => {
                    activeIndex = productIndex;
                    restartInterval();
                }"
                v-bind:class="`pagination-button${productIndex === activeIndex ? ' pagination-button--active' : ''}`"
            >
                {{ productIndex }}
            </button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.component-slider {
    margin: 0 0 64px;
    position: relative;

    .reroll-button {
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        position: absolute;
        top: 10px;
        right: 0px;
        background-color: transparent;
        font-size: 36px;
    }

    &__slides {
        height: 50vh;
        display: grid;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: white;
        box-shadow: inset 0 0 15px black;
        border-radius: 10px;

        .slide {
            display: flex;
            justify-content: center;
            align-items: center;
            grid-area: 1 / 1; // pile
            height: 30vh;
            width: 70vw;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 1s;
            translate: 0 100%;
            opacity: 0;
            // filter: drop-shadow(0px 0px 15px black);
            box-shadow: 0px 0px 15px black;
            border-radius: 10px;

            &--active {
                translate: 0 0;
                opacity: 1;
            }

            &__description {
                text-align: center;
                margin: 0;
                // width: fit-content;
                padding: 10px;
                border-radius: 10px;
                width: 66%;
                color: white;
                text-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px, rgba(0, 0, 0, 0.3) 0px 2px 13px, rgba(0, 0, 0, 0.3) 0px 3px 23px;
                backdrop-filter: blur(5px);
            }
        }
    }

    &__controlls {
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .swap-button {
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0 20px;
            background-color: transparent;

            .arrow {
                --size: 20px;
                --border: 3px solid black;
                display: block;
                width: var(--size);
                height: var(--size);
                border-right: var(--border);
                border-bottom: var(--border);
            }

            &--left {
                rotate: 135deg;
            }

            &--right {
                rotate: 315deg;
            }
        }
    }

    &__pagination {
        --size: 15px;
        position: absolute;
        bottom: var(--size);
        left: 50%;
        translate: -50% 0;
        display: flex;
        justify-content: center;
        gap: var(--size);

        .pagination-button {
            color: transparent;
            border: none;
            padding: 0;
            box-sizing: border-box;
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            background-color: black;
            transition: scale .25s;

            &--active {
                scale: 1.5;
            }
        }
    }
}

@media (min-width: 421px) {
    .component-slider {
        .reroll-button {
            cursor: pointer;
            top: 50px;
            right: 50px;
            transition: scale .25s;

            &:hover {
                scale: 1.5;
            }
        }

        &__slides {
            min-height: 75vh;

            .slide {
                cursor: pointer;
                width: 45vw;
                height: 80%;

                &__description {
                    cursor: pointer;
                    padding: 20px;
                    width: 50%;
                    font-size: 36px;
                }
            }
        }

        &__controlls {
            .swap-button {
                transition: scale .25s;
                cursor: pointer;
                margin: 50px;

                &:hover {
                    scale: 1.5;
                }
            }
        }

        &__pagination {
            .pagination-button {
                cursor: pointer;
                &:hover {
                    scale: 2;
                }
            }
        }
    }
}
</style>