<script setup lang="js">

// query strings??
import { onMounted, inject, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import Suggestions from "../components/Suggestions.vue"

const route = useRoute();
const router = useRouter();
const { products } = inject("products");
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
}

onMounted(() => setProductByQueryString());

watch(route, () => {
    setProductByQueryString();
})

</script>

<template>
    <section v-if="!notFound" class="screen-product">
        <div class="container">
            <div class="product">
                <img class="product__image" :src="slugProduct.imageUrl">
                <h2 class="product__description">
                    {{ slugProduct.description }}
                </h2>
                <p class="product__price">
                    {{ slugProduct.price }} EUR
                </p>
            </div>
            <div class="controlls">
                <button
                    class="controlls__button"
                    @click="() => {router.push('/')}"
                >
                    Back
                </button>
                <button
                    class="controlls__button"
                    @click="() => {}"
                >
                    Add To Cart
                </button>
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
    <div v-else class="not-found-message">
        Product not found!
    </div>
</template>

<style scoped lang="scss">

.screen-product {
    .product {
        &__image {
            object-fit: contain;
            width: 100px;
            height: 100px;
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