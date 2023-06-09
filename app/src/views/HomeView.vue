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
            <div class="thumbnail">
                <div class="rectangle-5"></div>

                <div class="version-1-0">Version 1.0</div>

                <div class="build-your-mindmap">Build your Mindmap</div>

                <div
                class="get-inspiration-with-our-recommendation-very-easy-to-use-no-login-or-registration-required"
                >
                Get inspiration with our recommendation!<br />Very easy to use.<br />No
                login or registration required.
                </div>

                <img class="asset-4-1" src="../assets/Asset_4_1.png"/>

                <!-- <img class="email-template-1" src="../assets/Email_Template_1.png"/> -->

                <!-- <img class="email-template-1-1" src="../assets/EmailTemplate-1_1.png"/> -->

                <!-- <img class="rectangle-2" src="../assets/Rectangle_2.png"/> -->

                <!-- <img class="main_image" src="../assets/designer.mov"/> -->

                <video class="main_video" autoplay loop>
                    <source src="../assets/designer2.mp4" type="video/mp4">
                    <!-- Add additional source tags for different video formats if needed -->
                </video>

                <img class="image-1" src="../assets/image_1.png"/>
                
                <div class="startbutton">
                    <ion-button @click="setOpen(true)" size="Large">Start</ion-button>
                </div>
            </div>
            <!-- <div class="image-container">
                <div class="startbutton">
                    <ion-button @click="setOpen(true)" size="Large">Start</ion-button>
                </div>
            </div> -->
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
                        <ion-button expand="Default" @click="selectItem()" :disabled="!category">Enter</ion-button>
                </ion-content>
            </ion-modal>
        </ion-content>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>ViewMind</ion-title>
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
  left : 13vw;
  top  : 30vw;
  transform: translateX(-50%);
}

.startbutton ion-button {
  font-size: 1vw;
  padding: 0.5vw 1vw;
  min-width: 10vw;
  min-height: 7vh;
}

/* 배경 이미지 */
.thumbnail,
.thumbnail * {
  box-sizing: border-box;
}
.thumbnail {
  background: #ffffff;
  width: 111vw;
  height: 50vw;
  position: relative;
  overflow: hidden;
}
.rectangle-5 {
  background: #f8f8f8;
  width: 111vw;
  height: 6vw;
  position: absolute;
  left: 5vw;
  top: 40vw;
}
.version-1-0 {
  color: #000000;
  text-align: left;
  font: 400 1.3vw/150% "Roboto Mono", sans-serif;
  text-transform: uppercase;
  position: absolute;
  left: 9vw;
  top: 42vw;
}
.build-your-mindmap {
  color: #000000;
  text-align: left;
  font: 800 3.6vw/115% "Public Sans", sans-serif;
  position: absolute;
  left: 9vw;
  top: 13.5vw;
  width: 25vw;
}

.main_video {
  width: 50vw;
  /* height : auto; */
  height: 35vw;
  object-fit: cover;
  position : absolute;
  left: 61vw;
  top: 21vw;
  transform: translate(-50%, -50%);
}

.asset-4-1 {
  width: 1.3vw;
  height: 3.5vw;
  position: absolute;
  left: 87vw;
  top: 3.7vw;
  overflow: hidden;
}
.layer-1-2 {
  position: absolute;
  left: 0px;
  top: 0px;
  overflow: visible;
}
.get-inspiration-with-our-recommendation-very-easy-to-use-no-login-or-registration-required {
  color: var(--colors-neutrals-graycool-gray-cool-90, #1b1b1b);
  text-align: left;
  font: var(--h-3-bold-22, 700 1.2vw/145% "Public Sans", sans-serif);
  position: absolute;
  left: 9vw;
  top: 22.3vw;
  width: 38vw;
}
.email-template-1 {
  border-radius: 8px;
  border-style: solid;
  border-color: #000000;
  border-width: 0.5px;
  width: 455px;
  height: 758px;
  position: absolute;
  left: 726px;
  top: 171px;
}
.email-template-1-1 {
  border-radius: 8px;
  border-style: solid;
  border-color: #000000;
  border-width: 0.5px;
  width: 216px;
  height: 785px;
  position: absolute;
  left: 1051px;
  top: 271px;
}
.rectangle-2 {
  border-radius: 4px;
  border-style: solid;
  border-color: #000000;
  border-width: 0.5px;
  width: 218px;
  height: 637px;
  position: absolute;
  left: 1249px;
  top: 115px;
}
.image-1 {
  width: 8vw;
  height: 8vw;
  position: absolute;
  left: 9vw;
  top: 5.1vw;
}

@media (max-width: 600px) {
    .thumbnail {
        width: 100vw;
        height: 100vh;
    }
    .startbutton {
        position: absolute;
        left: 50vw;
        top: 38vh;
    }
    .startbutton ion-button {
        font-size: 4vw;
        padding: 2vw 4vw;
    }
    .image-1 {
        width: 15vw;
        height: 15vw;
        position: absolute;
        left: 9vw;
        top: 5.1vw;
    }
    .main_video {
        position: absolute;
        left: 50%;
        top: 65vh;
        transform: translate(-50%, -50%);
        width: 80vw;
        height: 80vw;
        object-fit: contain;
    }
    .version-1-0 {
        font-size: 4vw;
        top : 85vh;
    }
    .rectangle-5 {
        top : 85vh;
    }
    .build-your-mindmap {
        font-size: 8vw;
        top : 12vh;
        width : 50vw;
    }
    .asset-4-1 {
        display : none;
    }
    .get-inspiration-with-our-recommendation-very-easy-to-use-no-login-or-registration-required {
        font-size: 4vw;
        width: 80vw;
        top : 23vh;
    }
    /* Add similar modifications for other elements */
}

</style>