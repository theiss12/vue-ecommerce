<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue';
import ProductReel from "@/components/ProductReel.vue"
import Services from '@/components/Services.vue';
import Tiles from '@/components/Tiles.vue';

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
    <ProductReel />
    <Services v-bind:service-items="services" />
    <Tiles />
  </main>
</template>
