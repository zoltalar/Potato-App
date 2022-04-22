import Vue from 'vue'

import authMixin from '@/mixins/auth'
import countryMixin from '@/mixins/country'
import languageMixin from '@/mixins/language'
import systemMixin from '@/mixins/system'

Vue.mixin(authMixin)
Vue.mixin(countryMixin)
Vue.mixin(languageMixin)
Vue.mixin(systemMixin)
