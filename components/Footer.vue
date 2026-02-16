<template>
  <footer class="footer">

    <div class="footer__middle">
      <div class="container">
        <PageText :text="$t('available-at')" class="mb-0"/>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="d-flex mb-3">
              <a :href="info.fbUrl"
                 v-if="info.fbUrl"
                 class="social"
                 target="_blank">
                <img :src="require('~/assets/images/facebook.png')" alt="facebook">
              </a>
              <a :href="info.instaUrl"
                 v-if="info.instaUrl"
                 class="social"
                 target="_blank">
                <img :src="require('~/assets/images/instagram.png')" alt="instagram">
              </a>
              <a :href="info.tiktokUrl"
                 v-if="info.tiktokUrl"
                 class="social"
                 target="_blank">
                <img :src="require('~/assets/images/tiktok.png')" alt="tiktok">
              </a>
              <a :href="`//api.whatsapp.com/send?phone=${info.phone}&text=Hi`"
                 v-if="info.phone"
                 class="social"
                 target="_blank">
                <img :src="require('~/assets/images/whatsup.png')" alt="instagram">
              </a>
            </div>
            <div class="footer__info">
              <p v-if="info.email">
                <b-icon-envelope/>
                <b><a :href="'mailto: ' + info.email">{{ info.email }}</a></b></p>
              <p v-if="info.phone">
                <b-icon-telephone/>
                (hu)<b><a :href="'tel: ' + info.phone">{{ info.phone }}</a></b></p>
              <p v-if="info.phoneAt">
                <b-icon-telephone/>
                (at)<b><a :href="'tel: ' + info.phoneAt">{{ info.phoneAt }}</a></b></p>
              <p>
                <b-icon-geo-alt-fill/>
                <b>Budapest, Hungary</b>
              </p>
              <p>
                <nuxtLink :to="localePath({name: 'impressum'})">{{ $t('impressum') }}</nuxtLink>
              </p>
            </div>
          </div>


        </div>
        <!--          <div class="col-md-6" v-if="info.fbUrl">-->
        <!--            <facebook-embed :url="info.fbUrl"/>-->
        <!--            <br>-->
        <!--          </div>-->
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

import FacebookEmbed from '@/components/FacebookEmbed';
import PageText from './PageText';

export default {
  components: {
    PageText,
    FacebookEmbed,
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
};
</script>

<style lang="scss">
.footer {
  min-height: 200px;
  background: $footer;
  color: $footer-color;

  .footer__middle {
    padding: 10px 0;
    text-align: center;
    background: $footer-color;
    color: $footer;
  }

  .footer__bottom {
    padding: 2rem 0;
  }

  .footer__info {
    a {
      color: inherit;
    }

    b {
      margin-left: 10px;
    }
  }

  .social {
    &:not(:last-child) {
      margin-right: 20px;
    }

    img {
      width: 40px;
      height: auto;
    }
  }

  span {
    font-weight: 300;
  }
}
</style>
