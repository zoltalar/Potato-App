export default ({ app, $auth }) => {
  $auth.onRedirect((to, from) => {
    if (!app.$auth.loggedIn) {
      return app.localePath(to)
    }
    return to
  })
}
