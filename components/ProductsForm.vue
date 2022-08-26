<template>
  <form class="form-products" @submit.prevent="save">
    <div v-for="(items, name, i) in inventory" :key="'form-group-inventory-' + i">
      <h6>{{ name }}</h6>
      <b-form-group>
        <div v-for="(item) in items">
          <b-checkbox :checked="hasProduct(item.id)" @change="toggleProduct(item.id)">{{ inventoryName(item) }}</b-checkbox>
          <div class="options" v-if="hasProduct(item.id)">
            <b-form-group>
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
            </b-form-group>
            <b-form-group>
              <label class="sub-label">
                {{ $t('phrases.quantity') }}
                ({{ $t('phrases.optional').toLowerCase() }})
              </label>
              <b-input-group size="sm" class="input-group-fixed">
                <b-form-input type="number" :placeholder="$t('messages.product_amount_placeholder')" v-model="products[productIndex(item.id)].amount" />
                <b-form-select :options="productUnits(true, ' - ' + $t('phrases.unit') + ' - ')" v-model="products[productIndex(item.id)].amount_unit" />
              </b-input-group>
              <div class="invalid-feedback d-block" v-if="error('products.' + productIndex(item.id) + '.amount') !== null">
                {{ error('products.' + productIndex(item.id) + '.amount') }}
              </div>
              <div class="invalid-feedback d-block" v-else-if="error('products.' + productIndex(item.id) + '.amount_unit') !== null">
                {{ error('products.' + productIndex(item.id) + '.amount_unit') }}
              </div>
            </b-form-group>
            <b-form-group>
              <label class="sub-label">
                {{ $t('phrases.price') }}
                ({{ $t('phrases.optional').toLowerCase() }}, <em>{{ $t('messages.price_sample') }}</em>)
              </label>
              <b-input-group size="sm" class="input-group-fixed">
                <b-form-input type="number" :placeholder="$t('messages.product_price_placeholder')" v-model="products[productIndex(item.id)].price" />
                <b-form-select :options="currencyOptions(true, ' - ' + $t('phrases.currency') + ' - ')" v-model="products[productIndex(item.id)].currency_id" />
                <b-form-select :options="productUnits(true, ' - ' + $t('phrases.unit') + ' - ')" v-model="products[productIndex(item.id)].price_unit" />
              </b-input-group>
              <div class="invalid-feedback d-block" v-if="error('products.' + productIndex(item.id) + '.price') !== null">
                {{ error('products.' + productIndex(item.id) + '.price') }}
              </div>
              <div class="invalid-feedback d-block" v-else-if="error('products.' + productIndex(item.id) + '.currency_id') !== null">
                {{ error('products.' + productIndex(item.id) + '.currency_id') }}
              </div>
              <div class="invalid-feedback d-block" v-else-if="error('products.' + productIndex(item.id) + '.price_unit') !== null">
                {{ error('products.' + productIndex(item.id) + '.price_unit') }}
              </div>
            </b-form-group>
          </div>
        </div>
      </b-form-group>
    </div>
    <b-form-group class="form-group-sticky">
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
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
