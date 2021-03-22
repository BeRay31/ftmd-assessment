/* API Program to retrieve course data */
import service from '@/utils/request'

export default class DosenLoWeight {
    static baseGroupURL = `dosen_lo_weight`;

    static async fetchComponents(id) {
      const res = await service.get(`${this.baseGroupURL}/searchByID/${id}`)
      return res
    }

    static async addComponent(componentDetails) {
      const res = await service.post(`${this.baseGroupURL}/create`, componentDetails)
      return res
    }

    static async deleteComponent(componentDetails) {
      const res = await service.post(`${this.baseGroupURL}/delete`, componentDetails)
      return res
    }

    static async editComponent(componentDetails) {
      const res = await service.post(`${this.baseGroupURL}/update`, componentDetails)
      return res
    }
}
