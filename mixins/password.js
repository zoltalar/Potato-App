export default {
  data: () => ({
    passwordInputType: 'password',
    passwordInputTypeIcon: 'eye-slash'
  }),
  methods: {
    togglePasswordInputType() {
      this.passwordInputType = (this.passwordInputType === 'password' ? 'text' : 'password')
      this.passwordInputTypeIcon = (this.passwordInputType === 'password' ? 'eye-slash' : 'eye')
    }
  }
}
