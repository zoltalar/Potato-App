<template>
  <form class="form-language-region">
    <b-form-group :label="$t('phrases.language')">
      <b-form-select v-model="i18n.language" :options="languageOptions()" />
    </b-form-group>
    <b-form-group :label="$t('phrases.country')">
      <b-row>
        <b-col sm="6" v-for="(country) in countryCollection()">
          <b-form-radio name="country" v-model="i18n.country" :value="country.code">
            <img :src="countryFlag(country)" class="img-flag" />
            {{ country.name }}
          </b-form-radio>
        </b-col>
      </b-row>
    </b-form-group>
  </form>
</template>
<script>
export default {
  name: 'LanguageRegionForm',
  data: () => ({
    i18n: {
      language: undefined,
      country: undefined
    }
  }),
  methods: {
    country () {
      return this.i18n.country
    },
    language () {
      return this.i18n.language
    },
    populate () {
      this.i18n.language = this.languageCode()
      this.i18n.country = this.countryCode()
    }
  }
}
</script>
