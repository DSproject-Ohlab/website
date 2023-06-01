<script setup>
import { defineProps } from "vue";
import { IonContent } from "@ionic/vue";

defineProps({});
</script>

<template>
  <ion-page>
    <IonContent class="ion-padding">
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

            <img class="email-template-1" src="../assets/Email_Template_1.png"/>

            <img class="email-template-1-1" src="../assets/EmailTemplate-1_1.png"/>

            <img class="rectangle-2" src="../assets/Rectangle_2.png"/>

            <img class="image-1" src="../assets/image_1.png"/>

            <div class="image-container">
              <!-- <img class="thumbnail" src="../assets/home_image.png" /> -->
              <div class="startbutton">
                  <ion-button @click="setOpen(true)" size="Large">Start</ion-button>
              </div>
            </div>
            <ion-modal :is-open="isOpen">
              <ion-header>
                  <ion-toolbar>
                      <ion-buttons slot="start">
                          <ion-button @click="setOpen(false)">Close</ion-button>
                      </ion-buttons>
                      <ion-title>Select Category</ion-title>
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
        </div>
    </IonContent>
  </ion-page>
</template>


<style scoped>
/* .thumbnail,
.thumbnail * {
  box-sizing: border-box;
}
.thumbnail {
  background: #ffffff;
  width: 1600px;
  height: 960px;
  position: relative;
  overflow: hidden;
}
.rectangle-5 {
  background: #f8f8f8;
  width: 1600px;
  height: 165px;
  position: absolute;
  left: 0px;
  top: 795px;
}
.version-1-0 {
  color: #000000;
  text-align: left;
  font: 400 24px/150% "Roboto Mono", sans-serif;
  text-transform: uppercase;
  position: absolute;
  left: 120x;
  top: 820px;
}
.build-your-mindmap {
  color: #000000;
  text-align: left;
  font: 800 64px/115% "Public Sans", sans-serif;
  position: absolute;
  left: 120px;
  top: 263px;
  width: 544px;
}
.asset-4-1 {
  width: 24px;
  height: 68px;
  position: absolute;
  left: 1519px;
  top: 81px;
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
  font: var(--h-3-bold-22, 700 22px/145% "Public Sans", sans-serif);
  position: absolute;
  left: 120px;
  top: 424px;
  width: 555px;
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
  width: 145.69px;
  height: 150px;
  position: absolute;
  left: 120px;
  top: 100px;
} */
.thumbnail,
.thumbnail * {
  box-sizing: border-box;
}

.thumbnail {
  background: #ffffff;
  width: 100vw; /* Updated */
  height: 100vh; /* Updated */
  position: relative;
  overflow: hidden;
}

.rectangle-5 {
  background: #f8f8f8;
  width: 100vw; /* Updated */
  height: 16.40625vh; /* Updated */
  position: absolute;
  left: 0;
  top: 82.8125vh; /* Updated */
}

.version-1-0 {
  color: #000000;
  text-align: left;
  font: 400 1.5vw/150% "Roboto Mono", sans-serif; /* Updated */
  text-transform: uppercase;
  position: absolute;
  left: 7.5vw; /* Updated */
  top: 85.41667vh; /* Updated */
}

.build-your-mindmap {
  color: #000000;
  text-align: left;
  font: 800 4vw/115% "Public Sans", sans-serif; /* Updated */
  position: absolute;
  left: 7.5vw; /* Updated */
  top: 27.39583vh; /* Updated */
  width: 34vw; /* Updated */
}

.asset-4-1 {
  width: 1.5vw; /* Updated */
  height: 7.08333vh; /* Updated */
  position: absolute;
  left: 94.9375vw; /* Updated */
  top: 8.4375vh; /* Updated */
  overflow: hidden;
}

.get-inspiration-with-our-recommendation-very-easy-to-use-no-login-or-registration-required {
  color: var(--colors-neutrals-graycool-gray-cool-90, #1b1b1b);
  text-align: left;
  font: var(--h-3-bold-2.29167vw, 700 2.29167vw/145% "Public Sans", sans-serif); /* Updated */
  position: absolute;
  left: 7.5vw; /* Updated */
  top: 44.79167vh; /* Updated */
  width: 34.89583vw; /* Updated */
}

.email-template-1 {
  border-radius: 0.5vw; /* Updated */
  border-style: solid;
  border-color: #000000;
  border-width: 0.02604vw; /* Updated */
  width: 28.4375vw; /* Updated */
  height: 79.16667vh; /* Updated */
  position: absolute;
  left: 45.375vw; /* Updated */
  top: 17.8125vh; /* Updated */
}

.email-template-1-1 {
  border-radius: 0.5vw; /* Updated */
  border-style: solid;
  border-color: #000000;
  border-width: 0.02604vw; /* Updated */
  width: 13.5vw; /* Updated */
  height: 81.77083vh; /* Updated */
  position: absolute;
  left: 65.6875vw; /* Updated */
  top: 28.02083vh; /* Updated */
}

.rectangle-2 {
  border-radius: 0.26vw; /* Updated */
  border-style: solid;
  border-color: #000000;
  border-width: 0.02604vw; /* Updated */
  width: 13.60417vw; /* Updated */
  height: 66.14583vh; /* Updated */
  position: absolute;
  left: 78.0625vw; /* Updated */
  top: 11.97917vh; /* Updated */
}

.image-1 {
  width: 9.10585vw; /* Updated */
  height: 9.375vh; /* Updated */
  position: absolute;
  left: 7.5vw; /* Updated */
  top: 10.41667vh; /* Updated */
}
</style>
