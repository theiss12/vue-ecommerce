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
const isMessageOpen = ref(false);

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
    notFound.value = false;
    setProductByQueryString();
})

</script>

<template>
    <section class="screen-product">
        <div v-if="!notFound" class="product">
            <div class="product__image-frame">
                <img class="product__image" :src="slugProduct.imageUrl">
            </div>
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
                    @click="() => {
                        addCartItem(slugProduct);
                        isMessageOpen = true;
                    }"
                >
                    Add To Cart
                </button>
            </div>
        </div>
        <div v-else class="not-found-message">
            Product not found!
        </div>
        <Suggestions
            v-if="!notFound"
            :suggestables="products.map(product => ({
                title: product.description, 
                imageUrl: product.imageUrl, 
                endpointUrl: `/product?id=${product.id}`
            }))"
        />
        <div class="screen-product__cart-message" v-if="isMessageOpen">
            <div class="message-wrapper">
                <p class="message">
                    Product is now in your cart.
                </p>
                <button class="close-button" @click="() => {isMessageOpen = false}">Got it</button>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

.screen-product {
    .product {
        &__image-frame {
            background-color: white;
            border-radius: 10px;
            box-shadow: inset 0 0 20px black;
            min-height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 0 48px;
        }
        &__image {
            // object-fit: contain;
            // height: 50svh;
            // width: 90vw;
            // background-color: white;
            // display: block;
            // padding: 50px 5vw;
            // margin: 0 0 48px;
            // box-shadow: inset 0 0 20px black;
            // border-radius: 10px;
            height: 45vh;
            width: 75%;
            object-fit: contain;
            filter: drop-shadow(0 0 20px rgba(0,0,0,.8));

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

    &__cart-message {
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 5000;
        width: 100vw;
        height: 100svh;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: blur;
        animation-duration: 1s;
        animation-fill-mode: forwards;

        .message-wrapper {
            background-color: #333;
            box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);
            padding: 20px;
            width: 66vw;

            .message {
                text-align: center;
                font-size: 24px;
                color: white;
                margin: 0 0 24px;
                padding: 0;
            }

            .close-button {
                display: block;
                padding: 10px;
                margin: 0 auto;
                font-size: 18px;
                border: none;
                background-color: deepskyblue;
                box-shadow: 0 0 10px deepskyblue;
                border-radius: 400px;
            }
        }

    }

    @keyframes blur {
        from {        
            backdrop-filter: blur(0px);
        }
        to {        
            backdrop-filter: blur(10px);
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

@media (min-width: 421px) {
    .screen-product {
        .product {
            &__image-frame {
                min-height: 70vh;
            }

            &__image {
                height: 65vh;
            }

            &__description,
            &__price,
            .controlls {
                margin: 72px;
            }

            .controlls {
                &__button {
                    transition: all .25s;

                    &:hover {
                        scale: 1.1;
                        box-shadow: 0 0 20px var(--color);
                    }
                }
            }
        }

        &__cart-message {

            .message-wrapper {
                padding: 20px;
                width: 25vw;
                padding: 48px 0;

                .message {
                    margin: 0 0 48px;
                    padding: 0;
                }
            }

        }
    }
    .not-found-message {
        width: 25vw;
    }
}

</style>