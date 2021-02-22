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
}
