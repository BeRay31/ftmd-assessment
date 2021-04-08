/* API Program to retrieve course data */
import service from '@/utils/request'

export default class Courses {
    static baseGroupURL = `courses`
    static baseLOURL = `course-lo`

    static async fetchCourses(params) {
      const res = await service.get(`${this.baseGroupURL}/`, { params })
      return res
    }

    static async updateCourse(id_course, data) {
      await service.post(`${this.baseGroupURL}/${id_course}`, data)
    }

    static async fetchCourseById(id_course) {
      const res = await service.get(`${this.baseGroupURL}/${id_course}`)
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

    static async fetchCourseLO(id_course) {
      const res = await service.get(`${this.baseLOURL}/${id_course}`)
      return res
    }

    static async createCourseLO(loDetails) {
      const res = await service.post(`${this.baseLOURL}/`, loDetails)
      return res
    }

    static async deleteCourseLO(loDetails) {
      const res = await service.delete(`${this.baseLOURL}/${loDetails.id_course}`, {
        params: {
          id_lo: loDetails.id_lo
        }
      })
      return res
    }

    static async editCourseLO(loDetails) {
      const res = await service.put(`${this.baseLOURL}/`, loDetails)
      return res
    }

    static async fetchCourseAssessment(tahunAjaran, semester, searchQuery) {
      const res = await service.get(`assess/`, {
        params: {
          tahunAjaran: tahunAjaran,
          semester: semester,
          searchQuery: searchQuery
        }
      })
      return res
    }

    static async fetchCourseDetails(id_course, page) {
      const res = await service.get(`assess/${id_course}`, {
        params: {
          page: page
        }
      })
      return res
    }

    static async calculateCourseAssessment(data) {
      const res = await service.post(`assess/`, data)
      return res
    }
}
