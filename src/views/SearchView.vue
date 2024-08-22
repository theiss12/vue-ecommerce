<script setup>

import { onMounted, watch, ref, inject } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const { products } = inject("products");

const searchTerm = ref("");

const searchItems = ref([]);

function setSearchTerm() {
    if (!route.query) {
        return;
    }
    if (!route.query.term) {
        return;
    }
    searchTerm.value = route.query.term;
}

function executeSearchTerm() {
    searchItems.value = products.value.filter(product => JSON.stringify(product).toLowerCase().includes(searchTerm.value.toLowerCase()));
}

onMounted(setSearchTerm);

watch(route, setSearchTerm);

watch(searchTerm, executeSearchTerm);

</script>

<template>
    <section class="screen-search">
        <div class="container">
            <h2 class="screen-search__term">
                You searched for: "<span class="user-term">{{ searchTerm }}</span>"
            </h2>
            <ul class="screen-search__items" v-if="searchItems.length > 0">
                <li class="search-item" v-for="(searchItem, index) in searchItems" :key="index" :style="`background-image: url('${searchItem.imageUrl}')`">
                    <RouterLink :to="`product?id=${searchItem.id}`">{{ searchItem.description }}</RouterLink>
                </li>
            </ul>
            <div v-else class="no-items">
                <p class="no-items__message">No search results.</p>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">

.screen-search {
    &__term {
        background-color: white;
        background-image: linear-gradient(to left, purple, orangered, orange);
        color: transparent;
        font-size: 48px;
        background-clip: text;
        text-align: center;
        margin: 0 0 30px;
        padding: 56px 30px 0;

        .user-term {
            text-decoration: underline;
        }
    }

    &__items {
        list-style-type: none;
        padding: 0;
        margin: 0;

        .search-item {
            display: flex;
            justify-content: center;
            align-items: center;
            background-position: center;
            min-height: 300px;
            background-size: 200%;
            background-repeat: no-repeat;
            text-align: center;
            transition: all .25s;
            box-shadow: inset 0 0 20px rgba($color: #000000, $alpha: 1);

            &:hover {
                background-size: 300%;

                a {
                    scale: 1.1;
                }
            }

            a {
                display: inline-block;
                width: 50%;
                padding: 20px;
                text-transform: uppercase;
                color: white;
                font-size: 24px;
                backdrop-filter: blur(10px);
                text-shadow: 0 0 10px black;
                box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);
                border-radius: 10px;
                transition: all .25s;
            }
        }
    }
}

</style>