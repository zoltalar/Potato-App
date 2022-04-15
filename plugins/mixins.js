import Vue from 'vue'

import countryMixin from '@/mixins/country'
import languageMixin from '@/mixins/language'
import systemMixin from '@/mixins/system'

Vue.mixin(countryMixin)
Vue.mixin(languageMixin)
Vue.mixin(systemMixin)
