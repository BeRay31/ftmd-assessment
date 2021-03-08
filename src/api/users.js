import service from '@/utils/request'

export default class Users {
  static async createUser(data) {
    const resp = await service.post(`/user/create`, data)
    return resp
  }

  static async getAllUser(params) {
    const resp = await service.get(`/user/`, { params })
    return resp
  }
}

