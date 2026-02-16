<template>
  <div class="container">
    <div class="d-flex flex-wrap justify-content-between align-items-start pb-2">
      <h2 class="mr-2">{{ $t('products') }}</h2>
      <NuxtLink :to="{name: 'admin-products-add'}" class="btn btn-success">{{ $t('add product') }}</NuxtLink>
    </div>
    <b-table striped
             hover
             bordered
             :items="items"
             :fields="tableFields"
    >
      <template #cell(name)="data">
        <NuxtLink :to="`/${data.item.slug}`" target="_blank">{{ data.item.name }}</NuxtLink>
      </template>
      <template #cell(gender)="data">
        {{ $t(data.item.gender) }}
      </template>
      <template #cell(price)="data">
        <div v-if="data.item.price"> {{ $t(data.item.price) }} €</div>
      </template>
      <template #cell(edit)="data">
        <NuxtLink :to="`/admin/products/edit/${data.value.toLowerCase()}`" class="btn btn-info">{{ $t('edit data') }}</NuxtLink>
        <NuxtLink :to="`/admin/products/product-image-upload/${data.value.toLowerCase()}`" class="btn btn-info">{{ $t('edit images') }}</NuxtLink>
      </template>
      <template #cell(delete)="data">
        <button v-on:click="deleteItem(data.value)" class="btn btn-danger">{{ $t('delete') }}</button>
      </template>
      <template #cell(enabled)="data">
        <b-form-checkbox v-model="data.value" @change="changedStatus(data)" size="lg" switch/>
      </template>
      <template #cell(available)="data">
        <b-form-checkbox v-model="data.value" @change="changedStatus(data)" size="lg" switch/>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      items: [],
      tableFields: [
        { key: 'name', label: this.$t('name') },
        { key: 'gender', label: this.$t('gender') },
        { key: 'price', label: this.$t('price') + '(€)' },
        { key: 'edit', label: this.$t('edit') },
        { key: 'delete', label: this.$t('delete') },
        { key: 'enabled', label: this.$t('enabled') },
        { key: 'available', label: this.$t('available') },
      ]
    };
  },
  mounted() {
    this.$axios.$get('/admin/products')
      .then(res => {
        this.setTableSchema(res);
      })
      .catch(err => console.log(err));
  },
  methods: {
    changedStatus(data) {
      this.$axios.$put('/admin/products/status', {
          id: data.item.id,
          userId: this.$auth.$state.user.id,
          key: data.field.key,
        }
      )
        .then(res => {
          this.items = this.items.map(item => item.id === data.item.id ? data.item : item);
          this.$notifier.showMessage({ message: [res.message], type: 'success' });
        })
        .catch(err => {
          const msg = err.response.data.message;
          this.$notifier.showMessage({ message: [msg], type: 'danger' });
        });
    },
    setTableSchema(data) {
      this.items = data.map(item => {
        return {
          id: item._id,
          name: item.name,
          gender: item.gender,
          price: item.price,
          edit: item._id,
          delete: item._id,
          enabled: item.isEnabled,
          available: item.isAvailable,
          slug: item.slug,
        };
      });
    },
    deleteItem(id) {
      const delItem = this.items.find(item => item.delete === id);
      const h = this.$createElement;
      const msgVNode = h('div', { domProps: { innerHTML: `Please confirm that you want to delete <b>${delItem.name}.</b>` } });

      this.$bvModal.msgBoxConfirm(
        [msgVNode],
        {
          title: 'Please Confirm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.$axios.$delete(`/admin/products/${id}`)
              .then(res => {
                this.items = this.items.filter(item => item.delete !== id);
                this.$notifier.showMessage({ message: [res], type: 'success' });
              });
          }
        });
    },
  },
};
</script>
