<script setup>
import { defineProps } from "vue";
import { IonContent } from "@ionic/vue";

defineProps({});
</script>

<template>
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
        </div>
    </IonContent>
</template>

<style scoped>
.thumbnail,
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
  left: 120px;
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
}
</style>
