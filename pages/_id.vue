<template>
  <section class="section--product" v-if="product">
    <PageTitle :title="product.name + (product.isAvailable ? ' (' + $t('available') + ')' : ' (' + $t('found parent') + ')')" v-if="product.name"></PageTitle>


    <div class="container">
      <div class="row">
        <div v-for="(image) in product.images"
             :key="image.index"
             class="col-md-6"
             :style="{'order': image.index}">
          <CustomImage :image="image"
                       v-if="image">
          </CustomImage>
        </div>

        <!--    info    -->
        <div class="col-md-6">
          <div class="details">
            <p v-if="product.name"><b>{{ $t('name') }}</b> {{ product.name }}</p>
            <p v-if="product.gender"><b>{{ $t('gender') }}</b> {{ $t(product.gender) }}</p>
            <p v-if="product.price"><b>{{ $t('price') }}</b> {{ $t(product.price) }} €</p>
            <p v-if="product.price"><b>{{ $t('transport') }}</b> 50-150 €</p>
          </div>
        </div>

        <div class="col-md-12 col-lg-6"
             v-for="desc in product.description"
             v-if="desc.text && desc.locale === $i18n.locale">
          <div class="details">
            <p><b>{{ $t('description') }}</b>{{ desc.text }}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <no-ssr>
          <div class="col-12" v-if="product.video && product.video.id">
            <div class="youtube-wrapper">
              <youtube :video-id="product.video.id"
                       :player-width="videoWidth"
              />
            </div>
          </div>
        </no-ssr>
        <div class="col-md-12">
          <div class="included" :style="{ backgroundImage: 'url(' + require('@/assets/images/french_bulldog_1.JPG') + ')' }">
            <div class="included__content">
              <h3 class="included__title">{{ $t('whats included') }}</h3>
              <ul>
                <li><span>{{ $t('pet passport') }}</span></li>
                <li><span>{{ $t('all the puppy shots') }}</span></li>
                <li><span>{{ $t('anti parasites treatment') }}</span></li>
                <li><span>{{ $t('contract') }}</span></li>
                <li><span>{{ $t('microchip') }}</span></li>
                <li><span>{{ $t('deworming') }}</span></li>
                <li><span>{{ $t('we start potty training') }}</span></li>
                <li><span>{{ $t('FCI export pedigree') }}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center my-5">
        <nuxtLink :to="localePath({name: 'transport'})" class="btn btn-info">{{ $t('how to get') }}</nuxtLink>
      </div>
    </div>

  </section>
</template>

<script>
import CustomImage from '../components/CustomImage';
import PageTitle from '../components/PageTitle';

export default {
  async asyncData({ params, $axios, error }) {
    // const product = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`) // id: 1
    const product = await $axios.$get(`products/${params.id}`);
    product.metaUrl = `${process.env.baseUrl}/${product.slug}`;
    product.metaName = product.name;
    product.metaFilename = `${process.env.imagePath}/${product.selectedFilename}`;
    product.metaDescription = product.description[0].text;
    return { product };
  },
  head() {
    return {
      meta: [
        //facebook
        // { property: 'og:site_name', content: 'I Love Painting' },
        // { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.product.metaUrl,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.product.metaName,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.product.metaDescription,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.product.metaFilename,
        },
        { property: 'og:image:width', content: '1363' },
        { property: 'og:image:height', content: '911' },

        //twitter
        // { name: "twitter:site", content: "@bobross" },
        // { name: "twitter:card", content: "summary_large_image" },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: this.product.metaUrl,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.product.metaName,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.product.metaDescription,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.product.metaFilename,
        },
      ]
    };
  },
  data() {
    return {
      videoWidth: 640,
    };
  },
  created() {
    if (process.browser) {
      if (window.innerWidth < 375) {
        this.videoWidth = 300;
      }
      if (window.innerWidth >= 375 && window.innerWidth <= 660) {
        this.videoWidth = 355;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.section--product {
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 15px 50px;

  p {
    font-weight: 300;

    &:not(:last-child) {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid $footer;
    }
  }

  b {
    display: block;
    font-weight: 600;
  }
}

.included {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  padding: 50px 25px;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($black, .75);
    content: '';
  }

  .included__content {
    position: relative;
    text-align: center;
    z-index: 1;
  }

  .included__title {
    color: $white;

    @include media-breakpoint-up(lg) {
      font-size: 2.5rem;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    padding: 5px 0 5px 30px;

    &::before {
      position: absolute;
      width: 20px;
      height: 20px;
      margin-left: -30px;
      background: url(~assets/images/check.png) center / contain no-repeat;
      content: '';
    }
  }

  span {
    color: rgba($white, .75);
    border-bottom: 1px dashed rgba($white, .5);

    @include media-breakpoint-up(lg) {
      font-size: 1.25rem;
    }
  }
}

.youtube-wrapper {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>
