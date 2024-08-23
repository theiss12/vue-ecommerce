<script setup>

import { defineProps, watch, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps(["activePage", "itemsPerPage", "numberOfItems"])

function addPageToQueryString(newPage) {
    router.push({query: {...route.query, page: newPage}});
}

function getIndices() {
    const numElements = Math.ceil(parseInt(props.numberOfItems) / parseInt(props.itemsPerPage));
    return [...new Array(numElements)].map((_, index) => index);
}

function paginate(click) {
    addPageToQueryString(click.target.value);
    window.scroll(0, 0);
}

const indices = ref(getIndices());

watch(props, () => {
    indices.value = getIndices();
    addPageToQueryString(props.activePage);
});

onMounted(() => {
    addPageToQueryString(props.activePage);
})

</script>

<template>
    <ul class="component-pagination">
        <li class="component-pagination__item" v-for="index in indices" :key="index">
            <button
                :class="`pagination-button${index == route.query.page ? ' pagination-button--active' : ''}`"
                :value="index"
                @click="paginate"
            >
                {{ index + 1 }}
            </button>
        </li>
    </ul>
</template>

<style scoped lang="scss">

.component-pagination {
    padding: 20px 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;

    &__item {
        .pagination-button {
            --size: 36px;
            width: var(--size);
            height: var(--size);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            background-color: black;
            color: white;
            border-radius: 50%;
            border: none;
            transition: all .25s;

            &--active {
                scale: 1.1;
                background-color: white;
                color: black;
            }
        }
    }
}

@media (min-width: 421px) {
    .component-pagination {
        &__item {
            .pagination-button {
                cursor: pointer;
                
                &:hover {
                    scale: 1.5;
                }
            }
        }
    }
}

</style>