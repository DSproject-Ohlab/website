<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonInput,
    IonLabel,
    IonButtons
} from '@ionic/vue';
import {ref} from 'vue';

const isOpen = ref(false);
const item = ref('');

const setOpen = (value) => {
    isOpen.value = value;
}

const selectItem = () => {
    console.log('selected item', item.value.$el.value);
    isOpen.value = false;
}

</script>
<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Home</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-button expand="block" @click="setOpen(true)">select</ion-button>
            <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen(false)">Close</ion-button>
                        </ion-buttons>
                        <ion-title>Select</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true" @click="selectItem()">Done</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-label position="stacked">Write Category</ion-label>
                    <ion-input ref="item" placeholder="Write Category" type="text"></ion-input>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>