/* API Program to retrieve course data */
import service from '@/utils/request'

export default class DosenLoWeight {
    static baseGroupURL = `dosen_lo_weight`;
    static courseGroupURL = `courses`;
    static LOGroupURL = `course-lo`;
    static async fetchComponents(id) {
      const res = await service.get(`${this.baseGroupURL}/searchByID/${id}`)
      return res
    }

    static async fetchScoreComponents(id) {
      const res = await service.get(`${this.baseGroupURL}/component/${id}`)
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

    static async getCourseDetails(id) {
      const res = await service.get(`${this.courseGroupURL}/${id}`)
      return res
    }

    static async getLO() {
      const res = await service.get(`${this.LOGroupURL}/get/LO`)
      return res
    }
}
