<script setup lang="js">

// query strings??
import { onMounted, inject, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import Suggestions from "../components/Suggestions.vue"

const route = useRoute();
const router = useRouter();
const { products } = inject("products");
const { cart, addCartItem } = inject("cart");
const slugProduct = ref({
    id: -1,
    description: "",
    imageUrl: "",
    price: 0
});
const notFound = ref(false);

function setProductByQueryString() {
    if (!route.query) {
        notFound.value = true;
        return;
    }
    const newSlugProduct = products.value.find(product => product.id == route.query.id);
    if (newSlugProduct) {
        slugProduct.value = newSlugProduct;
    }
    else {
        notFound.value = true;
    }
    window.scroll(0,0);
}

onMounted(() => setProductByQueryString());

watch(route, () => {
    setProductByQueryString();
})

</script>

<template>
    <section class="screen-product">
        <div class="container">
            <div v-if="!notFound" class="product">
                <img class="product__image" :src="slugProduct.imageUrl">
                <h2 class="product__description">
                    {{ slugProduct.description }}
                </h2>
                <p class="product__price">
                    {{ slugProduct.price }} EUR
                </p>
                <div class="controlls">
                    <button
                        class="controlls__button controlls__button--back"
                        @click="() => {router.push('/')}"
                    >
                        Back
                    </button>
                    <button
                        class="controlls__button controlls__button--cart"
                        @click="() => {addCartItem(slugProduct)}"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
            <div v-else class="not-found-message">
                Product not found!
            </div>
            <Suggestions
                :suggestables="products.map(product => ({
                    title: product.description, 
                    imageUrl: product.imageUrl, 
                    endpointUrl: `/product?id=${product.id}`
                }))"
            />
        </div>
    </section>
</template>

<style scoped lang="scss">

.screen-product {
    .product {
        &__image {
            object-fit: contain;
            height: 50svh;
            width: 90vw;
            background-color: white;
            display: block;
            padding: 50px 5vw;
            margin: 0 0 48px;
            box-shadow: inset 0 0 20px black;
            border-radius: 10px;
        }

        &__description {
            margin: 0 0 24px;
            font-size: 48px;
            text-align: center;
            color: white;
            text-transform:uppercase;
        }

        &__price {
            margin: 0 0 24px;
            font-size: 48px;
            text-align: center;
            color: white;
        }

        .controlls {
            margin: 0 0 48px;
            display: flex;
            justify-content: center;
            gap: 20px;

            &__button {
                --color: black;
                background-color: transparent;
                padding: 20px;
                font-size: 20px;
                border: none;
                background-color: var(--color);
                box-shadow: 0 0 10px var(--color);
                border-radius: 5px;
                cursor: pointer;

                &--back {
                    --color: crimson;
                }

                &--cart {
                    --color: chartreuse;
                }
            }
        }
    }
}

.not-found-message {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 66vw;
    min-height: 200px;
    font-size: 36px;
    text-align: center;
    color: crimson;
    border-left: 5px solid crimson;
    background-color: white;
    animation-name: pulsate;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    @keyframes pulsate {
        0% {
            scale: 1;
        }
        50% {
            scale: 1.1;
            box-shadow: 0 0 20px crimson;
        }
        100% {
            scale: 1
        }
    }
}

</style>