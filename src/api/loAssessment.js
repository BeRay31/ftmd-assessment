/* API Program to retrieve course data */
import service from '@/utils/request'

export default class LOAssessment {
    static baseGroupURL = `lo_assess`

    static async fetchCoursesWithLOScores(params) {
      const res = await service.get(`${this.baseGroupURL}/coursesWithLOScore`, { params })
      return res
    }

    static async fetchTahunAjaranList() {
      const res = await service.get(`${this.baseGroupURL}/tahunAjaran`)
      return res
    }
}
