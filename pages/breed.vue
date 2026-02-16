<template>
  <section class="section--breed">
    <PageTitle :title="$t(type)" :text="$t(type + 'BreedText1')"/>

    <div class="container">
      <img v-if="type === 'frenchBulldog'" :src="require('~/assets/images/french_bulldog_2.JPG')" :alt="$t(type)">
      <img v-if="type === 'dachshund'" :src="require('~/assets/images/dachshund.jpg')" :alt="$t(type)">

      <div class="row">
        <div class="col-md-6">
          <BreedBox :title="$t(type + 'BreedText2')" :description="$t(type + 'BreedText3')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t(type + 'BreedText4')" :description="$t(type + 'BreedText5')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t(type + 'BreedText6')" :description="$t(type + 'BreedText7')"/>
        </div>
        <div class="col-md-6">
          <BreedBox :title="$t(type + 'BreedText8')" :description="$t(type + 'BreedText9')"/>
        </div>
      </div>

      <br>

      <BreedInfo :title="$t(type + 'BreedText10')" :description="$t(type + 'BreedText11')"/>
      <BreedInfo :title="$t(type + 'BreedText12')" :description="$t(type + 'BreedText13')"/>
      <BreedInfo :title="$t(type + 'BreedText14')" :description="$t(type + 'BreedText15')"/>
      <BreedInfo :title="$t(type + 'BreedText16')" :description="$t(type + 'BreedText17')"/>

    </div>
  </section>
</template>

<script>
import PageTitle from '../components/PageTitle';
import BreedBox from '../components/BreedBox';
import BreedInfo from '../components/BreedInfo';

export default {
  components: { BreedInfo, BreedBox, PageTitle },
  computed: {
    type() {
      // const routerName = this.$route.name;
      // if (!routerName) return '';
      // if (routerName === 'french-bulldog') return 'frenchBulldog';
      // return routerName;
      return 'frenchBulldog';
    },
  },
  data() {
    return {};
  },
  method: {}
};
</script>

<style lang="scss">
.section--breed {
  img {
    margin-bottom: 10px;
  }
}
</style>
