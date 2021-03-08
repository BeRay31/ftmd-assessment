import service from '@/utils/request'

export default class Users {
  static baseGroupURL = `/user`

  static async createUser(data) {
    const resp = await service.post(`${this.baseGroupURL}/create`, data)
    return resp
  }

  static async getAllUser(params) {
    const resp = await service.get(`${baseGroupURL}`, { params })
    return resp
  }
}

