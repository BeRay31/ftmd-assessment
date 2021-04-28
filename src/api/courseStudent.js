import service from '@/utils/request'

export default class CourseStudent {
  static baseGroupURL = `/course-student`

  static async getCourseAttended(id_user, params) {
    const resp = await service.get(`${this.baseGroupURL}/student/${id_user}`, { params })
    return resp
  }

  static async getStudentCourseOutcome(id_user, id_course) {
    const resp = await service.get(`${this.baseGroupURL}/course-outcome/student/${id_user}/course/${id_course}`)
    return resp
  }

  static async addScoresCSV(id_course, params) {
    const res = await service.post(`courses/add/scores/csv/${id_course}`, { params })
    return res
  }

  static async getCourseStudent(id_course, params) {
    const resp = await service.get(`${this.baseGroupURL}/${id_course}`, { params })
    return resp
  }

  static async deleteCourseEnrollmentById(id_enrollment) {
    const resp = await service.delete(`${this.baseGroupURL}/${id_enrollment}`)
    return resp
  }

  static async enrollUserByIds(id_course, data) {
    const resp = await service.post(`${this.baseGroupURL}/${id_course}`, data)
    return resp
  }
}
