import service from '@/utils/request'

export default class Users {
  static async createUser(data) {
    const resp = await service.post(`/user/`, data)
    return resp
  }

  static async getAllUser(params) {
    const resp = await service.get(`/user/`, { params })
    return resp
  }

  static async getById(id_user) {
    const resp = await service.get(`/user/${id_user}`)
    return resp
  }

  static async deleteUser(id_user) {
    const resp = await service.delete(`/user/${id_user}`)
    return resp
  }

  static async updateUser(id_user, data) {
    const resp = await service.post(`/user/${id_user}`, data)
    return resp
  }
}

