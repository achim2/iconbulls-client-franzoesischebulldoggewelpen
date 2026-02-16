<template>
  <div>
    <section>
      <page-subtitle v-if="type === 'available-puppies'" :text="$t('available puppies')"/>
      <page-subtitle v-if="type === 'puppies-with-parents'" :text="$t('puppies with parents')"/>
      <Widget :items="filtered"/>
    </section>
  </div>
</template>

<script>
import PageText from '../components/PageText';
import Widget from '../components/Widget';
import PageSubtitle from '../components/PageSubtitle';

export default {
  components: { PageSubtitle, Widget, PageText },
  data() {
    return {
      type: '',
      filtered: [],
    };
  },
  mounted() {
    const routeName = this.$route.name;
    if (routeName === 'available-puppies') {
      this.$axios.$get('/products', { params: { available: true } })
        .then(res => {
          this.filtered = res;
        });
    } else if (routeName === 'puppies-with-parents') {
      this.$axios.$get('/products', { params: { available: false } })
        .then(res => {
          this.filtered = res;
        });
    }

    if (routeName !== '') {
      this.type = routeName;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
