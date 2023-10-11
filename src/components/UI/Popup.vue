<template>
  <div class="popup">
    <div class="popup__inner">
      <slot/>
      <button class="popup__close" @click="togglePopup()">X</button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps(['togglePopup'])

</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    position: relative;
    background-color: #fff;
    padding: 32px;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
