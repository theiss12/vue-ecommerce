<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { inject, ref } from 'vue';
import Suggestions from '@/components/Suggestions.vue';
import Services from '@/components/Services.vue';

const services = [
  {
    title: "Sales",
    description: "Lorem ipsum...",
    imageUrl: "./images/services/service (1).png",
    endpointUrl: "#"
  },
  {
    title: "Carreer",
    description: "Lorem ipsum...",
    imageUrl: "./images/services/service (2).png",
    endpointUrl: "#"
  },
  {
    title: "Consulting",
    description: "Lorem ipsum...",
    imageUrl: "./images/services/service (3).png",
    endpointUrl: "#"
  }
]

</script>

<template>
  <main>
    <Suggestions />
    <Services v-bind:service-items="services" />
  </main>
</template>
