export default {
  meEndpoint: '/admin/auth/me',
  loginEndpoint: '/admin/auth/login',
  registerEndpoint: '/admin/auth/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
