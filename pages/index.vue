<template>
  <div>
    <!--  Hero  -->
    <section class="hero" :style="{ backgroundImage: 'url(' + require('@/assets/images/hero.jpeg') + ')' }">
      <!--      <div class="container">-->
      <div class="hero__inner">
        <h1 class="hero__title">{{ $t('hero title') }}</h1>
      </div>
      <!--      </div>-->
    </section>

    <section class="breed-info">
      <div class="container">
        <PageText :text="$t('home text 0')" class="mt-5"/>
        <PageText :text="$t('home text 1')"/>

        <div class="text-center mb-5">
          <nuxtLink :to="localePath({name: 'french-bulldog'})" class="btn btn-info">{{ $t('frenchBulldog') }}</nuxtLink>
          <nuxtLink :to="localePath({name: 'dachshund'})" class="btn btn-info">{{ $t('dachshund') }}</nuxtLink>
        </div>
      </div>
    </section>

    <section v-if="available && available.length">
      <page-subtitle :text="$t('available puppies')"/>
      <Widget :items="available"/>
      <div class="text-center mt-3 mb-5">
        <nuxtLink :to="localePath({name: 'available-puppies'})" class="btn btn-info">{{
            $t('all available')
          }}
        </nuxtLink>
      </div>
    </section>

    <!--    <section v-if="notAvailable && notAvailable.length">-->
    <!--      <page-subtitle :text="$t('found parent')"/>-->
    <!--      <Widget :items="notAvailable"/>-->
    <!--    </section>-->

    <section>
      <div class="container">
        <PageTitle :title="$t('Our customers said')" class="mt-5"/>
        <div class="row">
          <div class="col-md-6">
            <BreedBox title="'Tökéletes Családtag'"
                      description="'Életünk legjobb döntése volt az Icon Bullstól választani kiskutyát! Kicsit tartottunk tőle, hogy egy ilyen masszív felépítésű kutya hogyan illeszkedik majd be a családba, de a kis Bully-nk egy igazi kezesbárány. Hihetetlenül stabil idegrendszere van, imádja a gyerekeket, nulla agresszió, csak tiszta szeretet. Látszik a profi háttér és a gondos szocializáció.'"/>
          </div>
          <div class="col-md-6">
            <BreedBox title="'Elite-Qualität'"
                      description="'Genetik lügt nicht! Schon am ersten Tag sah man dem Welpen an, dass er aus einer Elite-Blutlinie stammt. Er ist muskulös, athletisch und hat eine Ausstrahlung wie ein echter Champion. Wer keine Kompromisse eingehen will und wirklich die 'Top-Kategorie' der Bullies sucht, dem kann ich Icon Bulls nur wärmstens empfehlen. Einfach brutal gute Hunde!'"/>
          </div>
          <div class="col-md-6">
            <BreedBox title="'Egyszerűen imádjuk'"
                      description="'A kutyánk temperamentuma egyszerűen zseniális. Játékos és energikus, amikor a parkban vagyunk, de otthon a kanapén egy nyugodt, bújós mackó. Tökéletesen alkalmazkodik a család ritmusához. Látszik, hogy a tenyésztésnél nemcsak a küllemre, hanem a belső tulajdonságokra is hatalmas hangsúlyt fektettek. Hálásak vagyunk érte!'"/>
          </div>
          <div class="col-md-6">
            <BreedBox title="'Intelligent und führig'"
                      description="'Viele denken, dass es bei dieser Rasse nur um das Aussehen geht, aber die Hunde von Icon Bulls beweisen das Gegenteil. Unser Rüde sieht nicht nur unglaublich gut aus, sondern ist auch wahnsinnig intelligent und lernt extrem schnell. Diese Hunde machen nicht nur an der Leine eine 'fasse' Figur, sondern haben auch richtig was im Köpfchen. Ein echter Partner für den Alltag!'"/>
          </div>
          <div class="col-md-6">
            <BreedBox title="'Legjobb választás'"
                      description="'Nem ragozom túl: egyszerűen fantasztikus kutyát kaptunk tőlük. Minden várakozásunkat felülmúlta mind külsőleg, mind belsőleg. Aki igazi, minőségi Bullyt keres, annak csak ajánlani tudom az Icon Bullst. Profi csapat, csúcskategóriás kutyák. Köszönjük!'"/>
          </div>
          <div class="col-md-6">
            <BreedBox title="'Selbstbewusster Begleiter'"
                      description="'Das Selbstvertrauen unseres Welpen ist einfach vorbildlich. Er ist furchtlos, findet sich in jeder Situation perfekt zurecht und liebt es, unter Menschen zu sein. Das ist eindeutig das Ergebnis der frühen und fachgerechten Sozialisierung bei Icon Bulls. Wer einen wesensstarken és coolen Begleiter sucht, ist hier genau richtig. Icon Bulls ist die beste Wahl!'"/>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <PageTitle :title="$t('contact')" class="mt-5"/>
        <PageText :text="$t('home text 3')" class="mt-5"/>
        <PageText :text="$t('home text 4')"/>
        <PageText :text="$t('home text 5')"/>

        <div class="text-center mb-2">
          <nuxtLink :to="localePath({name: 'contact'})" class="btn btn-info">{{ $t('any question') }}</nuxtLink>
        </div>
      </div>
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
      available: [],
      notAvailable: [],
    };
  },
  mounted() {
    this.$axios.$get('/products', { params: { limit: 2, available: true } })
      .then(res => {
        this.available = res;
      });
    // this.$axios.$get('/products', { params: { limit: 2, available: false } })
    //   .then(res => {
    //     this.notAvailable = res;
    //   });
  },
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-top: -3rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;

  min-height: 280px;

  @include media-breakpoint-up(md) {
    height: calc(100vh - 56px);

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 300px;
      background: linear-gradient(0deg, rgba(15, 22, 45, 0.75) 0%, rgba(15, 22, 45, 0.5) 80%, rgba(15, 22, 45, 0) 100%);
      content: '';
    }
  }

  @include media-breakpoint-down(sm) {
    margin-bottom: 80px;
  }

  .hero__inner {
    max-width: 850px;
    margin: 0 auto;
    padding: 0 15px;

    @include media-breakpoint-up(md) {
    max-width: 1024px;
      padding-bottom: 5rem;
    }
    @include media-breakpoint-down(sm) {
      margin-bottom: -100px;
    }
    @include media-breakpoint-only(xs) {
      margin-bottom: -140px;
    }
  }

  .hero__title,
  .hero__subtitle {
    position: relative;
    z-index: 1;

    @include media-breakpoint-up(md) {
      color: $white;
    }
  }

  .hero__title {
    font-weight: 600;

    @include media-breakpoint-up(md) {
      font-size: 3em;
    }
    @include media-breakpoint-down(sm) {
      font-size: 2em;
    }
  }

  .hero__subtitle {
    @include media-breakpoint-down(sm) {
      font-size: 1.5em;
    }
  }
}
</style>
