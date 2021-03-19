import service from '@/utils/request'

export default class CourseStudent {
  static baseGroupURL = `/course-student`

  static async getCourseStudent(id_course, params) {
    const resp = await service.get(`${this.baseGroupURL}/${id_course}`, { params })
    return resp
  }
}
