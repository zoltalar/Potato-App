import Vue from 'vue'

import addressMixin from '/mixins/address'
import authMixin from '@/mixins/auth'
import categoryMixin from '@/mixins/category'
import countryMixin from '@/mixins/country'
import dateTimeMixin from '@/mixins/date-time'
import farmMixin from '@/mixins/farm'
import flashMixin from '@/mixins/flash'
import imageMixin from '@/mixins/image'
import inventoryMixin from '@/mixins/inventory'
import languageMixin from '@/mixins/language'
import messageMixin from '@/mixins/message'
import nameableMixin from '@/mixins/nameable'
import stringMixin from '@/mixins/string'
import systemMixin from '@/mixins/system'
import unitMixin from '@/mixins/unit'

Vue.mixin(addressMixin)
Vue.mixin(authMixin)
Vue.mixin(categoryMixin)
Vue.mixin(countryMixin)
Vue.mixin(dateTimeMixin)
Vue.mixin(farmMixin)
Vue.mixin(flashMixin)
Vue.mixin(imageMixin)
Vue.mixin(inventoryMixin)
Vue.mixin(languageMixin)
Vue.mixin(messageMixin)
Vue.mixin(nameableMixin)
Vue.mixin(stringMixin)
Vue.mixin(systemMixin)
Vue.mixin(unitMixin)
