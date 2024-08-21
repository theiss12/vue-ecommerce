<script setup>

import { defineProps, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();
const props = defineProps(['suggestables']);

function randInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

function pickItems() {
    const max = props.suggestables.length;
    const indices = [];
    let randomIndex = 0;
    while (indices.length < 3) {
        randomIndex = randInt(0, max);
        const included = indices.includes(randomIndex);
        if (!included) {
            indices.push(randomIndex + 0);
        }
    };
    return [
        props.suggestables[indices[0]],
        props.suggestables[indices[1]],
        props.suggestables[indices[2]]
    ];
}

const suggestables = ref(pickItems());

watch(route, () => {
    suggestables.value = pickItems();
});

</script>

<template>
    <section class="component-suggestions">
        <div class="container">
            <div class="suggestions">
                <div
                    class="suggestion"
                    v-for="(suggestion, index) in suggestables"
                    :key="index"
                    @click="() => {router.push(suggestion.endpointUrl)}"
                    :style="`background-image: url('${suggestion.imageUrl}')`"
                >
                    <h2 class="suggestion__title">
                        {{ suggestion.title }}
                    </h2>
                    <!-- <img class="suggestion__image" :src="suggestion.imageUrl"> -->
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

.component-suggestions {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0 0 10px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 56px 0 0;

    .suggestions {
        .suggestion {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0 0 56px;
            box-shadow: 0 0 20px black;
            width: 66vw;
            height: 66vw;
            transition: all .25s;

            &:hover {
                scale: 1.1;
            }

            &__title {
                background-color: #333;
                color: white;
                padding: 10px;
                margin: 0;
                text-align: center;
            }

            // &__image {
            //     object-fit: cover;
            //     width: 100%;
            //     height: 100%;
            // }
        }
    }
}

</style>