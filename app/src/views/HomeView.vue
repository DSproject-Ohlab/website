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
import {useRouter} from "vue-router";
import axios from "axios";
import { IonCheckbox } from '@ionic/vue';

const isOpen = ref(false);
const category = ref("");

// const item = ref('');

const setOpen = (value) => {
    isOpen.value = value;
}

const router = useRouter();

// const selectItem = () => {
//     console.log('selected item', item.value.$el.value);
//     isOpen.value = false;
//     router.push({name: "MindMap"});
// }

const selectItem = () => {
    console.log('selected category', category.value);
    isOpen.value = false;
    router.push({name: "MindMap"});
}


const send = () => {
    axios.get('https://gsdsproject-github-io-iaqun7cvsa-du.a.run.app/brainstorming/').then((response) => {
        console.log(response);
    });
}

const onCheckboxChange = (checked, newCategory) => {
    if (checked) {
        category.value = newCategory;
    }
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
                        <ion-title>Select Category</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true" @click="selectItem()">Done</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <!-- <ion-label position="stacked">Write Category</ion-label>
                    <ion-input ref="item" placeholder="Write Category" type="text"></ion-input> -->
                    <!-- <teleport to="body"> -->
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
                    <!-- </teleport> -->
                    <!-- <ion-item>
                            <ion-label>Marketer</ion-label>
                            <ion-checkbox slot="start" @ionChange="e => onCheckboxChange(e.detail.checked, 'Marketer')" :checked="category.value === 'Marketer'"></ion-checkbox>
                        </ion-item>
                        <ion-item>
                            <ion-label>Developer</ion-label>
                            <ion-checkbox slot="start" @ionChange="e => onCheckboxChange(e.detail.checked, 'Developer')" :checked="category.value === 'Developer'"></ion-checkbox>
                        </ion-item>
                        <ion-item>
                            <ion-label>Designer</ion-label>
                            <ion-checkbox slot="start" @ionChange="e => onCheckboxChange(e.detail.checked, 'Designer')" :checked="category.value === 'Designer'"></ion-checkbox>
                        </ion-item> -->
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
  
</style>