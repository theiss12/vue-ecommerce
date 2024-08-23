<script setup>

import { onMounted, watch, ref, inject } from "vue";
import { useRoute, RouterLink } from "vue-router";
import Pagination from "../components/Pagination.vue"

const route = useRoute();

const { products } = inject("products");

const searchTerm = ref("");

const searchItems = ref([]);

const activePage = ref(getActivePage());
const itemsPerPage = 3;

function setSearchTerm() {
    if (!route.query) {
        return;
    }
    if (!route.query.term) {
        return;
    }
    searchTerm.value = route.query.term;
}

function getActivePage() {
    if (!route.query) return 0;
    if (!route.query.page) return 0;
    const page = parseInt(route.query.page);
    if (page < 0 || page > searchItems.length / itemsPerPage) return 0;
    return page;
}

function setActivePage() {
    if (!route.query) {
        return;
    }
    if (!route.query.page) {
        return;
    }
    activePage.value = parseInt(route.query.page);

}

function executeSearchTerm() {
    searchItems.value = products.value.filter(product => JSON.stringify(product).toLowerCase().includes(searchTerm.value.toLowerCase()));
}

onMounted(setSearchTerm);

watch(route, () => {
    setSearchTerm();
    setActivePage();
});

watch(searchTerm, executeSearchTerm);

</script>

<template>
    <section class="screen-search">
        <div class="container">
            <h2 class="screen-search__term">
                You searched for: "<span class="user-term">{{ searchTerm }}</span>"
            </h2>
            <ul class="screen-search__items" v-if="searchItems.length > 0">
                <li
                    class="search-item"
                    v-for="(searchItem, index) in searchItems.slice(activePage * itemsPerPage, activePage * itemsPerPage + itemsPerPage)"
                    :key="index"
                    :style="`background-image: url('${searchItem.imageUrl}')`"
                >
                    <RouterLink :to="`product?id=${searchItem.id}`">{{ searchItem.description }}</RouterLink>
                </li>
            </ul>
            <div v-else class="no-items">
                <p class="no-items__message">No search results.</p>
            </div>
            <Pagination :activePage="activePage" :itemsPerPage="itemsPerPage" :numberOfItems="searchItems.length"/>
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

    .no-items {
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
}

@media (min-width: 421px) {
    .screen-search {
        &__items {
            .search-item {
                margin: 0 auto;
                width: 800px;
                // min-height: 300px;
                &:first-child {
                    border-radius: 10px 10px 0 0;
                }

                &:last-child {
                    border-radius: 0 0 10px 10px;
                }
            }
        }

        .no-items {
            width: 25vw;
        }
    }
}

</style>