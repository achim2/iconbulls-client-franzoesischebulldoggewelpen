<template>
  <div class="section--gallery">
    <PageTitle :title="$t('gallery')"/>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">

            <div class="col-md-6 col-lg-4"
                 v-for="image in items" :key="image.filename"
                 :style="{'order': image.index}">
              <CustomImage :image="image"/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import CustomImage from '../components/CustomImage';

export default {
  components: { CustomImage, PageTitle },
  head() {
    return {
      title: `${this.$t('gallery')} | Französische Bulldogge Welpen`,
    };
  },
  data() {
    return {
      items: [],
    };
  },
  async asyncData({ $axios }) {
    const items = await $axios.$get('/gallery')
      .catch(() => []);
    return { items };
  },
};</script>

<style lang="scss"></style>
