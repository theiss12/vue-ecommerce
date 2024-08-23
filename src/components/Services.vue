<script setup lang="ts">

import { ref, defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    serviceItems: any[]
}>();

const serviceItems = ref(props.serviceItems);

</script>

<template>
    <section class="component-services">
        
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
                    <RouterLink class="button" v-bind:to="serviceItem.endpointUrl">Visit</RouterLink>
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
            --spacer: 24px;

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 0 48px;
            padding: 30px;
            color: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, .5);
            transition: all .25s;
            
            &__image {
                --image-size: 150px;

                margin: 0 0 var(--spacer);
                width: var(--image-size);
                height: var(--image-size);
                object-fit: cover;
                border-radius: 50%;
            }

            &__title {
                margin: 0 0 var(--spacer);
            }

            &__description {
                margin: 0 0 var(--spacer);
            }

            // &__visit-button {

            // }

            &:hover {
                background-color: darkgray;
                box-shadow: 0 0 20px rgba(255, 255, 255, .5);
                scale: 1.1;
            }
        }
    }
}

@media (min-width: 421px) {
    .component-services {
        display: flex;
        align-items: center;
        
        &__items {
            width: 100%;
            flex-direction: row;

            .service {
                &__image {
                    --image-size: 200px;
                }
            }
        }
    }
}

</style>