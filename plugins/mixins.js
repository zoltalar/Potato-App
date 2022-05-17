import Vue from 'vue'

import authMixin from '@/mixins/auth'
import countryMixin from '@/mixins/country'
import farmMixin from '@/mixins/farm'
import flashMixin from '@/mixins/flash'
import languageMixin from '@/mixins/language'
import systemMixin from '@/mixins/system'

Vue.mixin(authMixin)
Vue.mixin(countryMixin)
Vue.mixin(farmMixin)
Vue.mixin(flashMixin)
Vue.mixin(languageMixin)
Vue.mixin(systemMixin)
