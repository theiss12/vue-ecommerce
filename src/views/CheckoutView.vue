<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from "vue-router";
import Shipping from '@/components/checkout/Shipping.vue';
import Summary from '@/components/checkout/Summary.vue';

const router = useRouter();
const { cart, updateCart } = inject("cart");

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

function calculateTotal() {
    return cart.value.reduce((total, currentCartItem) => total = total + currentCartItem.price * currentCartItem.amount, 0);
}

function sendData() {
    console.log(formData);
    console.log(cart.value);
    updateCart([]);
    router.push("/");
}

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
                @click="sendData"
            >
                Order for {{ calculateTotal() }} EUR
            </button>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .screen-checkout {
        &__steps {
            background-image: url(./public/images/checkout.jpg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            padding: 60px 0 0;
            margin: 0 0 48px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: inset 0 0 20px black;

            .step {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                width: 100px;
                height: 100px;
                background-color: white;
                margin: 0 0 32px;
                padding: 0px;
                border-radius: 50%;
                transition: all .25s;
                box-shadow: 0 0 20px rgba($color: #000000, $alpha: .5);

                &--active {
                    scale: 1.2;
                    color: orangered;
                }

                &__index {
                    color: orangered;
                    margin: 0;
                    text-align: center;
                }

                &__label {
                    margin: 0;
                    text-align: center;
                }
            }
        }

        &__step-controlls {
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            background: linear-gradient(to left, purple, orangered, orange);
            padding: 10px;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;

        }
    }
</style>