<template>
  <div class="container">
    <h2>{{ $t('add product') }}</h2>

    <b-form @submit="onSubmit" @submit.stop.prevent>
      <div class="row">
        <div class="col-md-6">
          <!-- Name -->
          <b-form-group
            id="input-group-1"
            :label="`${$t('name')}:`"
            label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col-md-6">
          <!-- gender -->
          <b-form-group
            id="input-group-5"
            :label="`${$t('gender')}:`"
            label-for="input-5">
            <b-form-select v-model="form.gender" :options="options" id="input-5"></b-form-select>
          </b-form-group>
        </div>

        <div class="col-md-6">
          <b-form-group
            id="input-group-9"
            :label="`${$t('price') } (€)`"
            label-for="input-price">
            <b-form-input
              id="input-price"
              v-model="form.price"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>

      <!-- video -->
      <b-form-group
        id="input-group-9"
        :label="`${$t('Youtube video url')}:`"
        label-for="input-9">
        <b-form-input
          id="input-9"
          v-model="form.video"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <!-- Description -->
      <b-form-group
        id="input-group-6"
        :label="`${$t('description')}: ${$t('english')}`"
        label-for="input-6">
        <b-form-textarea
          id="input-6"
          v-model="form.description[0].text"
          required
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-7"
        :label="`${$t('description')}: ${$t('hungarian')}`"
        label-for="input-7">
        <b-form-textarea
          id="input-7"
          v-model="form.description[1].text"
          required
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-8"
        :label="`${$t('description')}: ${$t('german')}`"
        label-for="input-8">
        <b-form-textarea
          id="input-8"
          v-model="form.description[2].text"
          required
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <div class="d-flex flex-wrap justify-content-between align-items-start pb-2">
        <nuxtLink :to="{name: 'admin-products'}" class="btn btn-secondary mr-sm-2 mb-2">{{ $t('back') }}</nuxtLink>
        <div class="d-flex flex-wrap align-items-start">
          <b-button type="submit" variant="primary" class="mr-sm-2 mb-2" v-on:click.prevent="onSubmit(true)">{{ $t('save & back') }}</b-button>
          <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit(false)">{{ $t('save & upload images') }}</b-button>
        </div>
      </div>
    </b-form>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      isEditing: false,
      id: null,
      form: {
        name: '',
        gender: null,
        price: null,
        video: '',
        description: [
          {
            locale: 'en',
            text: '',
          },
          {
            locale: 'hu',
            text: '',
          },
          {
            locale: 'de',
            text: '',
          },
        ]
      },
      options: [
        {value: null, text: this.$t('select an option')},
        {value: 'male', text: this.$t('male')},
        {value: 'female', text: this.$t('female')},
      ]
    };
  },
  mounted() {
    const id = this.id = this.$route.params.id;
    if (id) {
      this.isEditing = true;
      this.$axios.$get(`/admin/products/${id}`)
        .then(product => {
          this.form = {
            name: product.name,
            gender: product.gender,
            price: product.price,
            video: product.video && product.video.url ? product.video.url : '',
            description: product.description,
          };
        });

    } else {
      this.isEditing = false;
    }
  },
  methods: {
    onSubmit(back) {
      const url = `/admin/products`
      const request = this.isEditing
        ? this.$axios.put(url, {
          userId: this.$auth.$state.user.id,
          productId: this.id,
          ...this.form
        })
        : this.$axios.$post(url, {
          userId: this.$auth.$state.user.id,
          ...this.form
        });

      request
        .then(res => {
          const id = this.isEditing ? res.data.product._id : res.product._id;
          if (back) {
            this.$router.push(this.localePath({name: `admin-products`}));
          } else {
            this.$router.push(this.localePath({name: `product-image-upload`, params: {id}}));
          }
        });
    },
  }
};
</script>
<style lang="scss">
.layout.layout--admin .b-form-datepicker .btn {
  width: auto;
}
</style>
