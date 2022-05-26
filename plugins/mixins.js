import Vue from 'vue'

import addressMixin from '/mixins/address'
import authMixin from '@/mixins/auth'
import countryMixin from '@/mixins/country'
import farmMixin from '@/mixins/farm'
import flashMixin from '@/mixins/flash'
import imageMixin from '@/mixins/image'
import languageMixin from '@/mixins/language'
import nameableMixin from '@/mixins/nameable'
import stringMixin from '@/mixins/string'
import systemMixin from '@/mixins/system'

Vue.mixin(addressMixin)
Vue.mixin(authMixin)
Vue.mixin(countryMixin)
Vue.mixin(farmMixin)
Vue.mixin(flashMixin)
Vue.mixin(imageMixin)
Vue.mixin(languageMixin)
Vue.mixin(nameableMixin)
Vue.mixin(stringMixin)
Vue.mixin(systemMixin)
