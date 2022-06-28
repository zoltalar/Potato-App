<template>
  <form class="form-products" @submit.prevent="save">
    <div v-for="(items, name, i) in inventory" :key="'form-group-inventory-' + i">
      <h6>{{ name }}</h6>
      <b-form-group>
        <div v-for="(item) in items">
          <b-checkbox :checked="hasProduct(item.id)" @change="toggleProduct(item.id)">{{ inventoryName(item) }}</b-checkbox>
          <div class="options" v-if="hasProduct(item.id)">
            <div class="mb-1">
              <label class="sub-label">
                {{ $t('phrases.availability') }}
                <span class="text-danger">*</span>
              </label>
              <b-checkbox inline :value="1" :unchecked-value="0" v-model="products[productIndex(item.id)].winter">{{ $t('phrases.winter') }}</b-checkbox>
              <b-checkbox inline :value="1" :unchecked-value="0" v-model="products[productIndex(item.id)].spring">{{ $t('phrases.spring') }}</b-checkbox>
              <b-checkbox inline :value="1" :unchecked-value="0" v-model="products[productIndex(item.id)].summer">{{ $t('phrases.summer') }}</b-checkbox>
              <b-checkbox inline :value="1" :unchecked-value="0" v-model="products[productIndex(item.id)].fall">{{ $t('phrases.fall') }}</b-checkbox>
              <div class="invalid-feedback d-block" v-if="error('products.' + productIndex(item.id) + '.seasons') !== null">
                {{ error('products.' + productIndex(item.id) + '.seasons') }}
              </div>
            </div>
            <div class="mb-1">
              <label class="sub-label">
                {{ $t('phrases.quantity') }}
                ({{ $t('phrases.optional').toLowerCase() }})
              </label>
              <b-form-input type="number" size="sm" class="form-control-amount" :placeholder="$t('messages.product_amount_placeholder')" v-model="products[productIndex(item.id)].amount" />
              <b-form-select size="sm" class="custom-select-unit" :options="productUnits()" v-model="products[productIndex(item.id)].amount_unit" />
              <div class="invalid-feedback d-block" v-if="error('products.' + productIndex(item.id) + '.amount') !== null">
                {{ error('products.' + productIndex(item.id) + '.amount') }}
              </div>
              <div class="invalid-feedback d-block" v-else-if="error('products.' + productIndex(item.id) + '.amount_unit') !== null">
                {{ error('products.' + productIndex(item.id) + '.amount_unit') }}
              </div>
            </div>
            <div>
              <label class="sub-label">
                {{ $t('phrases.price') }}
                ({{ $t('phrases.optional').toLowerCase() }})
              </label>
              <b-form-input size="sm" class="form-control-price" v-model="products[productIndex(item.id)].price" />
              <b-form-select size="sm" class="custom-select-currency" :options="currencyOptions()" v-model="products[productIndex(item.id)].currency_id" />
            </div>
          </div>
        </div>
      </b-form-group>
    </div>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3" v-if="type === 'farm'">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formProductableMixin from '@/mixins/form-productable'
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'ProductsForm',
  mixins: [ formProductableMixin, formErrorsMixin ]
}
</script>
