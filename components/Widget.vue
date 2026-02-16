<template>
  <section class="section--widget" v-if="items">
    <div class="container">
      <div class="row">
        <div :class="['col-md-6', {'col-lg-4': items.length > 4}, 'mb-4']"
             v-for="item in items"
             :key="item._id"
        >
          <nuxtLink :to="localePath(`/${item.slug}`)"
                    class="widget">

            <CustomImage :image="item" v-if="item"/>

            <div class="widget__content" v-if="item && (item.name || item.gender)">
              <span class="widget__name" v-if="item.name"><b>{{ item.name }}</b>,</span>
              <span class="widget__gender" v-if="item.gender">{{ $t(item.gender) }}</span>
              <br>
              <span class="widget__price" v-if="item.price">{{ $t('price') }} {{ $t(item.price) }} €</span>
              <br>
              <span class="widget__price" v-if="item.price">{{ $t('transport') }} 50-150 €</span>
            </div>
          </nuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomImage from './CustomImage';

export default {
  components: { CustomImage },
  props: ['items'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.widget {
  position: relative;
  display: block;
  overflow: hidden;

  &:hover,
  &:focus,
  &:active {
    outline: none !important;
    text-decoration: none !important; // Biztosítja, hogy hover esetén se jöjjön elő
  }

  @include media-breakpoint-up(lg) {
    &:hover {
      .custom-image {
        img {
          transform: translate(-50%, -50%) scale(1.1);
        }
      }
    }
  }


  .custom-image {
    img {
      transform: translate(-50%, -50%) scale(1);
      transition: .45s ease;
    }
  }

  .widget__content {
    padding: 5px;
    //background: $instagram-color;
    overflow: hidden;
  }

  span {
    color: $text;
  }

  .widget__price,
  .widget__gender {
    font-weight: 300;
  }
}
</style>
