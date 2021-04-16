import service from '@/utils/request'

export default class Authorization {
  static baseGroupURL = `auth`;

  static async authByUsername(loginData) {
    const resp = await service.post(`${this.baseGroupURL}/login`, loginData)
    return resp
  }

  static async verifyToken(data) {
    const resp = await service.post(`${this.baseGroupURL}/validate`, data)
    return resp
  }

  static async logout() {
    const resp = await service.post(`${this.baseGroupURL}/logout`)
    return resp
  }

  static async sendMail(data) {
    const resp = await service.post(`${this.baseGroupURL}/send-verification`, data)
    return resp
  }

  static async verifyCode(data) {
    const resp = await service.post(`${this.baseGroupURL}/validate-verification`, data)
    return resp
  }

  static async changePassword(data) {
    const resp = await service.post(`${this.baseGroupURL}/change-password`, data)
    return resp
  }
}
