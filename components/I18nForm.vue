<template>
  <form class="form-language-region">
    <b-form-group :label="$t('phrases.language')">
      <select class="custom-select" v-model="i18n.language">
        <option :value="language.code" v-for="(language) in languages">{{ language.native }}</option>
      </select>
    </b-form-group>
    <b-form-group :label="$t('phrases.country')">
      <b-row>
        <b-col sm="6" v-for="(country) in countries">
          <b-form-radio name="country" v-model="i18n.country" :value="country.code">
            <img :src="countryFlag(country)" class="img-flag" />
            {{ country.name }}
          </b-form-radio>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group :label="$t('phrases.currency')">
      <select class="custom-select" v-model="i18n.currency">
        <option :value="currency.code" v-for="(currency) in currencies">{{ currency.code }}</option>
      </select>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'LanguageRegionForm',
  data: () => ({
    i18n: {
      language: undefined,
      country: undefined,
      currency: undefined
    },
    countries: [],
    languages: [],
    currencies: []
  }),
  async fetch () {
    let collection = this.countryCollection()
    if (collection.length === 0) {
      collection = await this.$store.dispatch('country/collection')
    }
    this.countries = collection
    collection = this.languageCollection()
    if (collection.length === 0) {
      collection = await this.$store.dispatch('language/collection')
    }
    this.languages = collection
    collection = this.currencyCollection()
    if (collection.length === 0) {
      collection = await this.$store.dispatch('currency/collection')
    }
    this.currencies = collection
  },
  watch: {
    i18n: {
      handler () {
        this.populate()
      },
      immediate: true
    }
  },
  methods: {
    country () {
      return this.i18n.country
    },
    currency () {
      return this.i18n.currency
    },
    language () {
      return this.i18n.language
    },
    populate () {
      this.i18n.language = this.$i18n.locale
      this.i18n.country = this.countryCode()
      this.i18n.currency = this.currencyCode()
    }
  }
}
</script>
