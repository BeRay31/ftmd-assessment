import service from '@/utils/request'

export default class StudentAssessment {
  static baseGroupURL = `student-assessment`;

  static async getScore(params) {
    const resp = await service.get(`${this.baseGroupURL}/course-outcome`, {params});
    return resp;
  }

  static async getSupplement(params) {
    const resp = await service.get(`${this.baseGroupURL}/lo-supplement`, {params});
    return resp;
  }
}