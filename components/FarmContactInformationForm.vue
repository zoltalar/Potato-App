<template>
  <form class="form-default" @submit.prevent="update">
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.farm_name') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input size="lg" :class="{'is-invalid': error('name') !== null}" maxlength="255" v-model="farm.name" />
      <div class="invalid-feedback d-block" v-if="error('name') !== null">
        {{ error('name') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.first_name')">
      <b-form-input size="lg" :class="{'is-invalid': error('first_name') !== null}" maxlength="100" v-model="farm.first_name" />
      <div class="invalid-feedback d-block" v-if="error('first_name') !== null">
        {{ error('first_name') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.last_name')">
      <b-form-input size="lg" :class="{'is-invalid': error('last_name') !== null}" maxlength="100" v-model="farm.last_name" />
      <div class="invalid-feedback d-block" v-if="error('last_name') !== null">
        {{ error('last_name') }}
      </div>
    </b-form-group>
    <b-form-group :label="$t('phrases.phone')">
      <b-form-input size="lg" :class="{'is-invalid': error('phone') !== null}" maxlength="20" v-model="farm.phone" />
      <div class="invalid-feedback d-block" v-if="error('phone') !== null">
        {{ error('phone') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-checkbox :value="1" :unchecked-value="0" v-model="farm.publish_phone" :disabled="empty(farm.phone)">{{ $t('phrases.publish_phone_on_website') }}</b-checkbox>
    </b-form-group>
    <b-form-group :label="$t('phrases.fax')">
      <b-form-input size="lg" :class="{'is-invalid': error('fax') !== null}" maxlength="20" v-model="farm.fax" />
      <div class="invalid-feedback d-block" v-if="error('fax') !== null">
        {{ error('fax') }}
      </div>
    </b-form-group>
    <b-form-group>
      <template v-slot:label>
        {{ $t('phrases.email') }}
        <span class="text-danger">*</span>
      </template>
      <b-form-input type="email" size="lg" :class="{'is-invalid': error('email') !== null}" maxlength="255" v-model="farm.email" />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
      <small class="form-text text-muted" v-html="$t('messages.farm_contact_information_email')"></small>
    </b-form-group>
    <b-form-group :label="$t('phrases.website_url')">
      <b-form-input size="lg" :class="{'is-invalid': error('website') !== null}" maxlength="255" placeholder="http://" v-model="farm.website" />
      <div class="invalid-feedback d-block" v-if="error('website') !== null">
        {{ error('website') }}
      </div>
    </b-form-group>
    <b-form-group>
      <b-button type="submit" variant="primary" size="lg">{{ $t('phrases.save') }}</b-button>
      <nuxt-link :to="localePath('/account/farms')" class="ml-3">{{ $t('phrases.cancel') }}</nuxt-link>
    </b-form-group>
  </form>
</template>
<script>
import formErrorsMixin from '@/mixins/form-errors'
export default {
  name: 'FarmContactInformationForm',
  mixins: [ formErrorsMixin ],
  props: {
    editedFarm: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    farm: {
      id: null,
      name: '',
      first_name: '',
      last_name: '',
      phone: '',
      publish_phone: 0,
      fax: '',
      email: '',
      website: ''
    }
  }),
  watch: {
    'editedFarm': {
      handler () {
        this.populate()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    populate () {
      const editedFarm = this.editedFarm
      const farm = this.farm
      if ( ! this.$_.isEmpty(editedFarm)) {
        this.$_.forOwn(editedFarm, (value, key) => {
          if (key in farm) {
            farm[key] = value
          }
        })
        this.farm = farm
      }
    },
    update () {
      let farm = this.farm

      this
        .$axios
        .put(`/api/potato/farms/update-contact-information/${farm.id}`, farm)
        .then((response) => {
          this.setErrors(response)
          farm = this.$_.get(response, 'data.data')
          if ( ! this.$_.isEmpty(farm)) {
            this.$root.$emit('farm-contact-information-updated', { farm })
          }
        })
        .catch((error) => {
          this.setErrors(error.response)
        })
    }
  }
}
</script>
