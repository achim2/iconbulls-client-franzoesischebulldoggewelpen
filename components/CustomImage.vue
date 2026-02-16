<template>
  <div class="custom-image">
    <img :data-src="`${$config.imagePath}/${image.selectedFilename ? image.selectedFilename : image.filename}`"
         :alt="image.name ? image.name : image.filename"
         v-if="image"
         class=" lazyload"
    />
  </div>
</template>

<script>
export default {
  props: ['image'],
};
</script>

<style lang="scss">
.custom-image {
  position: relative;
  width: 100%;
  height: 0;
  /* 245 / 367 * 100 = 66.75% */
  padding-bottom: 66.75%;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
}
</style>
