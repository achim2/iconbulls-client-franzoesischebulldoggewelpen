<template>
  <section class="impressum">
    <div class="container">
      <PageTitle :title="$t('')"/>
      <div class="col-12">
        <h5>{{ $t('impressum') }}</h5>
        <hr>
        <p v-if="info.imServiceProviderName" class="m-0">
          <span>{{ $t('imServiceProviderName') }}:</span> {{ info.imServiceProviderName }}
        </p>
        <p v-if="info.imHeadquarters" class="m-0">
          <span>{{ $t('imHeadquarters') }}:</span> {{ info.imHeadquarters }}
        </p>
        <p v-if="info.imPhoneEmail" class="m-0">
          <span>E-mail:</span> {{ info.imPhoneEmail }}
        </p>
        <p v-if="info.imPhoneNumber" class="m-0">
          <span>{{ $t('imPhoneNumber') }}:</span> {{ info.imPhoneNumber }}
        </p>
        <p v-if="info.imRegistrationNumber" class="m-0">
          <span>{{ $t('imRegistrationNumber') }}:</span> {{ info.imRegistrationNumber }}
        </p>
        <p v-if="info.imTaxNumber" class="m-0">
          <span>{{ $t('imTaxNumber') }}:</span> {{ info.imTaxNumber }}
        </p>
        <p v-if="info.imRegistrationAuthority">
          <span>{{ $t('imRegistrationAuthority') }}:</span> {{ info.imRegistrationAuthority }}
        </p>
        <p v-if="info.imHostingProvider" class="m-0">
          <span>{{ $t('imHostingProvider') }}:</span> {{ info.imHostingProvider }}
        </p>
        <p v-if="info.imHostingProviderHeadquarters" class="m-0">
          <span>{{ $t('imHostingProviderHeadquarters') }}:</span> {{ info.imHostingProviderHeadquarters }}
        </p>
        <p v-if="info.imHostingProviderEmail" class="m-0">
          <span>{{ $t('imHostingProviderEmail') }}:</span> {{ info.imHostingProviderEmail }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from '../components/PageTitle';
import PageText from '../components/PageText';
import { mapGetters } from "vuex";

export default {
  components: { PageText, PageTitle },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
};
</script>

<style lang="scss">
</style>
