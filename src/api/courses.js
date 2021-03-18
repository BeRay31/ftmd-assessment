/* API Program to retrieve course data */
import service from '@/utils/request'

export default class Courses {
    static baseGroupURL = `courses`;

    static async fetchCourses(params) {
      const res = await service.get(`${this.baseGroupURL}/`, { params })
      return res
    }

    static async updateCourse(id_course, data) {
      const res = await service.post(`${this.baseGroupURL}/${id_course}`, data)
      return res
    }

    static async deleteCourse(id_course) {
      const res = await service.delete(`${this.baseGroupURL}/${id_course}`)
      return res
    }

    static async createCourse(data) {
      const res = await service.post(`${this.baseGroupURL}/`, data)
      return res
    }

    static async getById(id_course) {
      const res = await service.get(`${this.baseGroupURL}/${id_course}`)
      return res
    }
}
