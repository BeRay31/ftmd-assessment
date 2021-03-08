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
}
