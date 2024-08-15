<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import Shipping from '@/components/checkout/Shipping.vue';
import Summary from '@/components/checkout/Summary.vue';

const {cart, updateCart} = inject("cart");

const steps = ref([
    "Shipping",
    "Summary"
]);

const currentStep = ref(0);

const formData = ref({
    firstName: {label: "First Name", value: ""},
    lastName: {label: "Last Name", value: ""},
    email: {label: "Email", value: ""},
    address: {label: "Address", value: ""},
    telephone: {label: "Phone", value: ""}
});

function changeStepBy(amount: number): void {
    const newStep = currentStep.value + amount;
    currentStep.value = Math.min(Math.max(newStep, 0), steps.value.length - 1);
}

function setStep(newStep: number) {
    currentStep.value = newStep;
}

onMounted(() => {
    console.log(cart.value);
});

</script>

<template>
    <section class="screen-checkout">
        <div class="screen-checkout__steps">
            <div
                v-for="(step, stepIndex) in steps" :key="stepIndex"
                v-bind:class="'step' + (stepIndex === currentStep ? ' step--active' : '')"
                @click="() => {
                    setStep(stepIndex);
                }"
            >
                <h2 class="step__index">{{ stepIndex + 1 }}</h2>
                <h3 class="step__label">{{ step }}</h3>
            </div>
        </div>

        <template v-if="currentStep === 0">
            <!-- <Shipping /> -->
             <Shipping v-bind:form-data="formData"/>
        </template>

        <template v-if="currentStep === 1">
            <Summary v-bind:form-data="formData" />
        </template>

        <div class="screen-checkout__step-controlls">
            <button 
                v-if="currentStep > 0"
                class="button"
                @click="() => {changeStepBy(-1)}"
            >
                Previous
            </button>

            <button 
                v-if="currentStep < steps.length - 1"
                class="button"
                @click="() => {changeStepBy(1)}"
            >
                Next
            </button>

            <button 
                v-else
                class="button"
                @click="() => {console.log(formData)}"
            >
                Order
            </button>
        </div>
    </section>
</template>

<style scoped>
    .screen-checkout {
        .screen-checkout__steps {
            display: flex;
            .step {
                background-color: orange;

                &.step--active {
                    background-color: white;
                }
            }
        }
    }
</style>