/* API Program to retrieve course data */
import service from '@/utils/request'

export default class LOAssessment {
    static baseGroupURL = `lo_assess`

    static async fetchCoursesWithLOKMT(params) {
      const res = await service.get(`${this.baseGroupURL}/coursesWithLOKMT`, { params })
      return res
    }

    static async fetchTahunAjaranList() {
      const res = await service.get(`${this.baseGroupURL}/tahunAjaran`)
      return res
    }

    static async fetchLOAssessment(params) {
      const res = await service.get(`${this.baseGroupURL}/loAssessment`, { params })
      return res
    }

    static async insertLOAssessment(params) {
      const res = await service.post(`${this.baseGroupURL}/insertLOAssessment`, params)
      return res
    }

    static async updateLOAssessment(params) {
      const res = await service.post(`${this.baseGroupURL}/updateLOAssessment`, params)
      return res
    }
}
