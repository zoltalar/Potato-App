export default ({ $axios, store }) => {
  $axios.onRequest(config => {
    config.headers.common['X-language'] = store.getters['language/code']
    config.headers.common['X-country'] = store.getters['country/code']
  });
}
