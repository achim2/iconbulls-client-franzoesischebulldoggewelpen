<template>
  <div class="container">
    <h2>{{ $t('page info') }}</h2>

    <b-form @submit="onSubmit" @submit.stop.prevent>

      <b-form-group
        :label="$t('contact email')"
        label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('contact phone')"
        label-for="contactPhone">
        <b-form-input
          id="contactPhone"
          v-model="form.phone"
          type="text"
          placeholder="+36304667922"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('contact phone de')"
        label-for="contactPhoneAt">
        <b-form-input
          id="contactPhoneAt"
          v-model="form.phoneAt"
          type="text"
          placeholder="+436765869506"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Facebook url:"
        label-for="fbUrl">
        <b-form-input
          id="fbUrl"
          v-model="form.fbUrl"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Instagram url:"
        label-for="instagramUrl">
        <b-form-input
          id="instagramUrl"
          v-model="form.instaUrl"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Tiktok url:"
        label-for="tiktokUrl">
        <b-form-input
          id="tiktokUrl"
          v-model="form.tiktokUrl"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imServiceProviderName') + ' (' + $t('impressum') + '):'"
        label-for="imServiceProviderName">
        <b-form-input
          id="imServiceProviderName"
          v-model="form.imServiceProviderName"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imHeadquarters') + ' (' + $t('impressum') + '):'"
        label-for="imHeadquarters">
        <b-form-input
          id="imHeadquarters"
          v-model="form.imHeadquarters"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="'E-mail (' + $t('impressum') + '):'"
        label-for="imPhoneEmail">
        <b-form-input
          id="imPhoneEmail"
          v-model="form.imPhoneEmail"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imPhoneNumber') + ' (' + $t('impressum') + '):'"
        label-for="imPhoneNumber">
        <b-form-input
          id="imPhoneNumber"
          v-model="form.imPhoneNumber"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imRegistrationNumber') + ' (' + $t('impressum') + '):'"
        label-for="imRegistrationNumber">
        <b-form-input
          id="imRegistrationNumber"
          v-model="form.imRegistrationNumber"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imTaxNumber') + ' (' + $t('impressum') + '):'"
        label-for="imTaxNumber">
        <b-form-input
          id="imTaxNumber"
          v-model="form.imTaxNumber"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imRegistrationAuthority') + ' (' + $t('impressum') + '):'"
        label-for="imRegistrationAuthority">
        <b-form-input
          id="imRegistrationAuthority"
          v-model="form.imRegistrationAuthority"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imHostingProvider') + ' (' + $t('impressum') + '):'"
        label-for="imHostingProvider">
        <b-form-input
          id="imHostingProvider"
          v-model="form.imHostingProvider"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imHostingProviderHeadquarters') + ' (' + $t('impressum') + '):'"
        label-for="imHostingProviderHeadquarters">
        <b-form-input
          id="imHostingProviderHeadquarters"
          v-model="form.imHostingProviderHeadquarters"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label="$t('imHostingProviderEmail') + ' (' + $t('impressum') + '):'"
        label-for="imHostingProviderEmail">
        <b-form-input
          id="imHostingProviderEmail"
          v-model="form.imHostingProviderEmail"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit">{{$t('save')}}</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  layout: 'admin',
  data() {
    return {
      form: {
        email: '',
        phone: '',
        phoneAt: '',
        fbUrl: '',
        instaUrl: '',
        tiktokUrl: '',
        imServiceProviderName: '',
        imHeadquarters: '',
        imPhoneEmail: '',
        imPhoneNumber: '',
        imRegistrationNumber: '',
        imTaxNumber: '',
        imRegistrationAuthority: '',
        imHostingProvider: '',
        imHostingProviderHeadquarters: '',
        imHostingProviderEmail: '',
      }
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$axios.$get('/info')
        .then(res => {
          if (res) {
            this.form = res;
          }
        })
    },
    onSubmit() {
      this.$axios.$post('admin/info', {
        userId: this.$auth.$state.user.id,
        ...this.form
      })
        .then(res => {
          this.form = res.info;
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        });
    }
  },
};
</script>
