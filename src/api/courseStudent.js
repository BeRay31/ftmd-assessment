import service from '@/utils/request'

export default class CourseStudent {
  static baseGroupURL = `/course-student`

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
