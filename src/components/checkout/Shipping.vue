<script setup lang="ts">
    const props = defineProps<{
        formData: any
    }>();

    import { ref } from 'vue';

    const inputs = ref(Object.keys(props.formData));

    function changeFormData(event: any) {
        const property = event.target.name;
        const newValue = event.target.value;
        props.formData[property].value = newValue;
    }
</script>

<template>
    <section class="component-shipping">
        <div class="container">
            <div class="component-shipping__form">
                <p class="input-container" v-for="(inputItem, itemIndex) in Object.keys(props.formData)" :key="itemIndex">
                    <input
                        type="text"
                        class="textfield"
                        v-bind:name="inputItem"
                        v-bind:value="formData[inputItem].value"
                        @input="changeFormData"
                    >
                    <label v-bind:for="inputItem"> {{ formData[inputItem].label }} </label>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>