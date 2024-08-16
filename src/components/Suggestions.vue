<script setup>

import { defineProps, onMounted, ref, watch } from "vue";
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

onMounted(() => {
    console.log(suggestables.value);
})

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
                >
                    <img class="suggestion__image" :src="suggestion.imageUrl">
                    <h2 class="suggestion__title">
                        {{ suggestion.title }}
                    </h2>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

.component-suggestions {
    .suggestions {
        .suggestion {
            &__image {
                object-fit: cover;
                width: 100px;
                height: 100px;
            }
        }
    }
}

</style>