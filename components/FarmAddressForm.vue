<template>
  <form class="form-default" @submit.prevent="save">
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="0" v-model="farm.publish_address">{{ $t('phrases.publish_on_website') }}</b-checkbox>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.country') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select size="lg" v-model="farm.country_id" :options="countryOptions()"></b-form-select>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.state') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-select size="lg" v-model="farm.state_id" :options="stateOptions()"></b-form-select>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
import formAddressable from '@/mixins/form-addressable'
export default {
  name: 'FarmAddressForm',
  mixins: [ formErrorsMixin, formAddressable ],
  data: () => ({
    farm: {
      publish_address: 0,
      country_id: null,
      state_id: null
    }
  }),
  mounted() {
    this.fetchCountries()
  }
}
</script>
