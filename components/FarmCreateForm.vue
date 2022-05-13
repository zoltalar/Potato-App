<template>
  <form class="form-default" @submit.prevent="store">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.farm_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input maxlength="100" v-model="farm.name" />
      <div class="invalid-feedback d-block" v-if="error('name') !== null">
        {{ error('name') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.promote_this_farm') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-radio value="1" v-model="farm.promote">{{ $t('phrases.yes') }}</b-form-radio>
      <div class="invalid-feedback d-block" v-if="error('promote') !== null">
        {{ error('promote') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.farm_promote_yes')"></small>
    </b-form-group>
    <b-form-group>
      <b-form-radio value="0" v-model="farm.promote">{{ $t('phrases.no') }}</b-form-radio>
      <div class="invalid-feedback d-block" v-if="error('promote') !== null">
        {{ error('promote') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.farm_promote_no')"></small>
    </b-form-group>
    <b-form-group>
      <b-card>
        <b-card-text v-html="$t('messages.farm_create_agreement')" />
      </b-card>
    </b-form-group>
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="null" v-model="farm.terms">{{ $t('phrases.i_have_read_and_agree_with_conditions_above') }}</b-checkbox>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg" :disabled="submitDisabled()">{{ $t('phrases.create') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmCreateForm',
  mixins: [ formErrorsMixin ],
  data: () => ({
    farm: {
      name: '',
      promote: null,
      terms: null
    }
  }),
  methods: {
    store () {
      let farm = this.farm

      this
        .$axios
        .post('/api/potato/farms/store', farm)
        .then((response) => {
          this.setErrors(response)
          farm = this._.get(response, 'data.data')

          if ( ! this._.isEmpty(farm)) {
            this.$root.$emit('farm-created', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    },
    submitDisabled () {
      return parseInt(this.farm.terms) !== 1
    }
  }
}
</script>
