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
  head() {
    const titleKey = this.type === 'puppies-with-parents' ? 'puppies with parents' : 'available puppies';
    return {
      title: `${this.$t(titleKey)} | Französische Bulldogge Welpen`,
    };
  },
  data() {
    return {
      type: '',
      filtered: [],
    };
  },
  async asyncData({ $axios, route }) {
    const routeName = route.name;
    let filtered = [];
    if (routeName === 'available-puppies') {
      filtered = await $axios.$get('/products', { params: { available: true } })
        .catch(() => []);
    } else if (routeName === 'puppies-with-parents') {
      filtered = await $axios.$get('/products', { params: { available: false } })
        .catch(() => []);
    }

    return {
      type: routeName || '',
      filtered,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
