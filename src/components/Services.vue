<script setup lang="ts">

import { ref, defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    serviceItems: any[]
}>();

const serviceItems = ref(props.serviceItems);

/*
[
    {
        title: "Consulting",
        description: "Lorem ipsum...",
        imageUrl: "./images/services/service (1).png",
        endpointUrl: "#"
    },
    {
        title: "Sales",
        description: "Lorem ipsum...",
        imageUrl: "./images/services/service (2).png",
        endpointUrl: "#"
    },
    {
        title: "Carreer",
        description: "Lorem ipsum...",
        imageUrl: "./images/services/service (3).png",
        endpointUrl: "#"
    }
]
*/

</script>

<template>
    <section class="component-services">
        <div class="container">
            <div class="component-services__items">
                <div
                    class="service"
                    v-for="(serviceItem, serviceIndex) in serviceItems" :key="serviceIndex"
                >
                    <img
                        class="service__image"
                        v-bind:src="serviceItem.imageUrl"
                    >
                    <h2 class="service__title">
                        {{ serviceItem.title }}
                    </h2>
                    <p class="service__description">
                        {{ serviceItem.description }}
                    </p>
                    <RouterLink class="service__visit-button" v-bind:to="serviceItem.endpointUrl">Visit</RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

.component-services {
    min-height: 80vh;

    &__items {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        .service {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            
            &__image {
                width: 100px;
                height: 100px;
                object-fit: contain;
            }

            &__title {

            }

            &__description {

            }

            &__visit-button {

            }
        }
    }
}

</style>