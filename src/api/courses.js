/* API Program to retrieve course data */
import service from '@/utils/request'

export default class Courses {
    static baseGroupURL = `courses`;

    static async fetchCourses(pages) {
      const res = await service.get(`${this.baseGroupURL}/get`, {
        params: {
          pageNum: pages
        }
      })
      return res
    }

    static async editLecturer(lecturer) {
      const res = await service.post(`${this.baseGroupURL}/update`, lecturer)
      return res
    }

    static async deleteCourse(courseDetails) {
      const res = await service.post(`${this.baseGroupURL}/delete`, courseDetails)
      return res
    }
}
