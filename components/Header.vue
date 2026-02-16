<template>
  <header>
    <div class="container">
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand :to="localePath({name: 'index'})">
          <img :src="require(`~/assets/images/logo.svg`)"
               alt="logo"
               class="brand-logo"
          />
        </b-navbar-brand>

        <section class="floating-number" v-if="showFloatingNumber">
          <ul>
            <li v-if="info.phone">
              <b-icon-telephone/>
              <span>(hu)</span>
              <a :href="'tel: ' + info.phone"><b>{{ info.phone }}</b></a>
            </li>
            <li v-if="info.phoneAt">
              <b-icon-telephone/>
              <span>(at)</span>
              <a :href="'tel: ' + info.phoneAt"><b>{{ info.phoneAt }}</b></a>
            </li>
          </ul>
        </section>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="localePath({name: 'index'})">{{ $t('home') }}</b-nav-item>

            <b-nav-item-dropdown :text="$t('breed')">
              <b-dropdown-item :to="localePath({name: 'french-bulldog'},)">{{ $t('frenchBulldog') }}</b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'dachshund'})">{{ $t('dachshund') }}</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item :to="localePath({name: 'gallery'})">{{ $t('gallery') }}</b-nav-item>
            <b-nav-item :to="localePath({name: 'transport'})">{{ $t('transport') }}</b-nav-item>

            <b-nav-item-dropdown :text="$t('puppies')">
              <b-dropdown-item :to="localePath({name: 'available-puppies'},)">{{ $t('available puppies') }}
              </b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'puppies-with-parents'})">{{ $t('puppies with parents') }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item :to="localePath({name: 'contact'})">{{ $t('contact') }}</b-nav-item>

            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown :text="$i18n.locale" right>
              <b-dropdown-item
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="setLocale(locale.code)"
              >{{ locale.code }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="navbar-nav--admin" v-if="$auth.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <b-dropdown-item :to="localePath({name: 'admin-products'})">{{ $t('products') }}</b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'admin'})">{{ $t('page info') }}</b-dropdown-item>
              <b-dropdown-item :to="localePath({name: 'admin-gallery-image-upload'})">{{
                  $t('gallery')
                }}
              </b-dropdown-item>
              <b-dropdown-item @click="logout">{{ $t('logout') }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
    this.setHeaderScroll();
  },
  computed: {
    ...mapGetters([
      'info'
    ]),
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    isAdminPage() {
      return this.$route.path.includes('/admin');
    },
    showFloatingNumber() {
      return (this.info.phoneAt || this.info.phone) && !this.isAdminPage;
    }
  },
  methods: {
    setHeaderScroll() {
      let prevScrollpos = window.pageYOffset;
      const header = document.querySelector('header');
      const toggler = document.querySelector('.navbar-toggler');

      window.onscroll = function () {
        const currentScrollPos = window.pageYOffset;
        const isNavbarOpened = toggler.classList.contains('not-collapsed');

        if (prevScrollpos > currentScrollPos || isNavbarOpened) {
          header.classList.remove('header--sticky');
        } else {
          header.classList.add('header--sticky');
        }
        prevScrollpos = currentScrollPos;
      };
    },
    async logout() {
      await this.$auth.logout();
      // this.$notifier.showMessage({ message: ['You successful logged out!'], type: 'success' })
      // this.$router.push(this.localePath({ name: 'index' }));
    },
    setLocale(code) {
      this.$i18n.setLocale(code);
      this.$storage.setLocale(code);
    },
  }
};
</script>

<style lang="scss">
header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  transition: .25s ease;
  z-index: 100;
  background: $header;

  &.header--sticky {
    top: -#{$header-height};

    .brand-logo {
      width: $header-height;
    }
  }

  .brand-logo {
    width: $header-height;
    height: auto;
    padding: 5px;
    transition: $transition-base;

    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 0;
      left: 0;
      width: 140px;
      background: $header;
      border-radius: 50%;
    }
  }

  .floating-number {
    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 80px;
      right: 10px;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    li {
      margin-bottom: 5px;
      color: $footer;
      text-align: center;

      @include media-breakpoint-up(lg) {
        padding: 5px;
        border-radius: 10px;
        background: $footer-color;
      }
    }

    svg {
      margin-top: 3px;
    }

    a {
      color: $white;
    }
  }
}

.navbar {
  min-height: $header-height;
  padding: 0;

  .navbar-nav {
    @include media-breakpoint-down(md) {
      text-align: center;
    }

    &.navbar-nav--admin {
      @include media-breakpoint-down(md) {
        border-top: 1px solid $white;
      }

      @include media-breakpoint-up(lg) {
        border-left: 1px solid $white;
      }
    }

    a:not(.navbar-brand),
    a.nav-link:not(.navbar-brand) {
      color: $white;

      //&.nuxt-link-active:not(.navbar-brand)
      &:focus,
      &:hover,
      &.nuxt-link-exact-active {
        color: rgba(#fff, .6);
        border: none;
      }
    }
  }

  .navbar-collapse {
    @include media-breakpoint-down(md) {
      padding: 0 1rem 1rem;
    }
  }

  .navbar-brand {
    padding-top: 0;
    padding-bottom: 0;

    @include media-breakpoint-up(lg) {
      width: 140px;
    }
  }

  .dropdown-menu {
    min-width: auto;
    background: $header;
    border: 1px solid $white;

    @include media-breakpoint-down(md) {
      margin-bottom: 10px;
    }

    .dropdown-item {
      &:hover,
      &:focus {
        background: transparent;
      }
    }
  }
}
</style>
