export default ({ $axios, store }) => {
  $axios.onRequest(config => {
    config.headers.common['X-language'] = store.getters['language/code']
  });
}
