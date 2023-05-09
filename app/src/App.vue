<script setup>
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {ref} from "vue";

const isOpen = ref(false);
const dismissModal = () => {
    isOpen.value = false;
}
</script>
<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>