import service from '@/utils/request'

export default class Questionnaire {
    static baseGroupURL = 'qi';

    static async saveAnswer(data) {
      await service.post(`${this.baseGroupURL}/saveAnswer`, data)
    }

    static async viewAllAnswer(params) {
      const res = await service.get(`${this.baseGroupURL}/viewAllAnswer`, { params })
      return res
    }

    static async viewStudentAnswer(id_course, id_user) {
      const res = await service.get(`${this.baseGroupURL}/viewStudentAnswer/${id_course}&${id_user}`)
      return res
    }

    static async viewCourseAnswer(id_course) {
      const res = await service.get(`${this.baseGroupURL}/viewCourseAnswer/${id_course}`)
      return res
    }
}
