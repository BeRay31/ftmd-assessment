import service from '@/utils/request'

export default class Softskill {
    static baseGroupURL = 'softskill';

    static async saveAnswerKerjasama(data) {
      await service.post(`${this.baseGroupURL}/saveAnswerKerjasama`, data)
    }

    static async saveAnswerKomunikasi(data) {
      await service.post(`${this.baseGroupURL}/saveAnswerKomunikasi`, data)
    }

    static async viewStudentAnswer(id_course, id_user) {
      const res = await service.get(`${this.baseGroupURL}/viewStudent/${id_course}&${id_user}`)
      return res
    }

    static async viewCourseAnswer(id_course) {
      const res = await service.get(`${this.baseGroupURL}/viewCourse/${id_course}`)
      return res
    }

    static async viewAll() {
      const res = await service.get(`${this.baseGroupURL}/viewAll`)
      return res
    }
}
