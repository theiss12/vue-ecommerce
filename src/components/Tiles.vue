<script setup lang="ts">

import { onMounted, inject, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// const inspectedProduct = ref({
//     id: -1,
//     description: "",
//     imageUrl: "",
//     price: 0
// });
// const isInspectorOpen = ref(false);
const router = useRouter();
const { products } = inject("products");
const { cart, addCartItem } = inject("cart");
const tileColumns = ref([
    new Array(),
    new Array(),
    new Array()
]);
const currentSliceStart = ref(0);
const tileStep = 5;

function requestFurtherTiles(): void {
    const end = currentSliceStart.value + tileStep;
    const newTiles = products.value.slice(currentSliceStart.value, end);
    if (newTiles.length === 0) {
        window.onscroll = null;
        return;
    }
    newTiles.forEach((newTile: any, tileIndex: number) => {
        const columnIndex = (tileIndex + currentSliceStart.value) % tileColumns.value.length;
        tileColumns.value[columnIndex].push(newTile);
    })
    currentSliceStart.value += tileStep;
}

// function openInspector(tile: any): void {
//     inspectedProduct.value = tile;
//     isInspectorOpen.value = true;
// }

onMounted(() => {
    requestFurtherTiles();
    window.addEventListener("scroll", () => {
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
            requestFurtherTiles();
        }
    });
})

</script>

<template>
    <section class="component-tiles">
        <div
            class="component-tiles__column"
            v-for="(column, cloumIndex) in tileColumns" :key="cloumIndex"
        >
            <img
                class="tile"
                v-for="(tile, tileIndex) in tileColumns[cloumIndex]" :key="tileIndex"
                v-bind:src="tile.imageUrl"
                @click="() => {
                    // openInspector(tile)
                    router.push(`/product?id=${tile.id}`);
                }"
            >
        </div>
    </section>
</template>

<style scoped lang="scss">

.component-tiles {
    --gap: 10px;
    display: flex;
    gap: var(--gap);
    background-color: white;
    padding: var(--gap);
    border-radius: 5px;

    &__column {
        display: flex;
        flex-direction: column;
        gap: var(--gap);

        .tile {
            width: 100%;
            object-fit: contain;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba($color: #000000, $alpha: 1);
            transition: all .25s;
        }
    }
}

@media (min-width: 421px) {
    .component-tiles {
        --gap: 30px;

        &__column {
            .tile {
                cursor: pointer;
            }
        }
    }
}

</style>