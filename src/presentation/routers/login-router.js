const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try{
      const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }

    const accessToken = await this.authUseCase.auth(email, password)
    if (!accessToken) {
      return HttpResponse.unauthorizeError()
    }
    return HttpResponse.ok({accessToken})
    } catch (error) {
      console.log("Error: ", error);
      return HttpResponse.serverError()
    }
  }
}
