<script setup lang="ts">

import { ref } from 'vue';

const count = ref(0);
const customCount = ref(0);

function increment(): void {
    const newCount: number = count.value + 1;
    count.value = newCount;
}

function decrement(): void {
    const newCount: number = count.value - 1;
    count.value = newCount;
}

function setCustomCount(event: any): void {
    const newCustomCount: number = parseInt(event.target.value);
    customCount.value = newCustomCount;
}

function applyCustomValue() {
    count.value = customCount.value;
}

</script>

<template>
    <section class="component-counter">
        <div class="component-counter__inputs">
            <p class="input-wrapper">
                <button
                    @click="decrement" 
                    class="button"
                >
                -
                </button>
                {{ count }}
                <button
                    @click="increment"
                    class="button"
                >
                +
                </button>
            </p>
            <p class="input-wrapper">
                <input
                    type="number" 
                    class="textfield" 
                    @input="setCustomCount"
                >
                <button
                    class="button"
                    @click="applyCustomValue"
                >
                    Set
                </button>
            </p>
        </div>
    </section>
</template>

<style scoped>
    .input-wrapper {
        background-color: white;
        margin: 0 auto 28px;
        width: 80%;
    }
</style>