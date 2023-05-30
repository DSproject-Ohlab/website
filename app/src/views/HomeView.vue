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
    IonButtons,
    IonRadioGroup,
    IonList,
    IonItem,
    IonRadio,
    IonCheckbox
} from '@ionic/vue';
import {ref, reactive, onMounted} from 'vue';
import {useRouter} from "vue-router";
import axios from "axios";
import Thumbnail from './Thumbnail.vue';

const isOpen = ref(false);
let category = ref('');
let Centerword = ref('');
// const item = ref('');

const setOpen = (value) => {
    isOpen.value = value;
}

const router = useRouter();


const selectItem = () => {
    console.log('selected category', category.value);
    isOpen.value = false;
    router.push({
        name: 'MindMap', 
        query: {
            Centerword: Centerword.value,
            category: category.value 
        }
    });
    category.value = '';
    Centerword.value = '';
}


const onCheckboxChange = (checked, newCategory) => {
    if (checked) {
        category.value = newCategory;
    }
}


</script>
<template>
    <ion-page>
        <ion-content class="ion-padding">
            <!-- <Thumbnail /> -->
            <div class="image-container">
                <img class="thumbnail" src="../assets/home_image.png" />
                <div class="startbutton">
                    <ion-button @click="setOpen(true)" size="Large">Start</ion-button>
                </div>
            </div>
        <!-- Add more <img> tags for other images -->
        <ion-modal :is-open="isOpen">
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button @click="setOpen(false)">Close</ion-button>
                        </ion-buttons>
                        <ion-title>Select Category</ion-title>
                        <!-- <ion-buttons slot="end">
                            <ion-button :strong="true" @click="selectItem()">Done</ion-button>
                        </ion-buttons> -->
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                        <ion-radio-group v-model="category">
                            <ion-list>
                                <ion-item>
                                    <ion-label>Marketer</ion-label>
                                    <ion-radio slot="start" value="Marketer"></ion-radio>
                                </ion-item>
                                <ion-item>
                                    <ion-label>Developer</ion-label>
                                    <ion-radio slot="start" value="Developer"></ion-radio>
                                </ion-item>
                                <ion-item>
                                    <ion-label>Designer</ion-label>
                                    <ion-radio slot="start" value="Designer"></ion-radio>
                                </ion-item>
                            </ion-list>
                        </ion-radio-group>
                        <ion-item>
                            <ion-label position="stacked">Enter your Root Idea</ion-label>
                            <ion-input v-model="Centerword"></ion-input>
                        </ion-item>
                        <ion-button expand="Default" @click="selectItem()">Enter</ion-button>
                </ion-content>
            </ion-modal>
        </ion-content>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>MindView</ion-title>
            </ion-toolbar>
        </ion-header>
        <!-- <ion-content class="ion-padding"> -->
            <!-- <ion-button @click="send()">send</ion-button> -->
            <!-- <ion-button expand="block" @click="setOpen(true)">select</ion-button> -->
        <!-- </ion-content> -->
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

ion-radio {
    --border-radius: 4px;
    --inner-border-radius: 4px;

    --color: #ddd;
    --color-checked: #1d0df7;
}

ion-radio.ios::part(container) {
    width: 20px;
    height: 20px;

    border: 2px solid #ddd;
    border-radius: 4px;
  }

  .radio-checked.ios::part(container) {
    border-color: #6815ec;
  }

/* .startbutton {
    position: absolute;
    left: 17.5%;
    transform: translateX(-50%);
    bottom: 300px;
    font-size: 16px;
    padding: 8px 16px;
} */

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.startbutton {
  position: absolute;
  left : 33.5vh;
  bottom: 35vh;
  transform: translateX(-50%);
}

.startbutton ion-button {
  font-size: 1vw;
  padding: 0.5vw 1vw;
  min-width: 10vw;
  min-height: 7vh;
}


</style>