/* API Program to retrieve course data */
import service from '@/utils/request'

export default class Courses {
    static baseGroupURL = `courses`;

    static async fetchCourses() {
      const res = await service.get(`${this.baseGroupURL}/get`, {
        params: {
          pageNum: 1
        }
      })
      return res
    }
}
