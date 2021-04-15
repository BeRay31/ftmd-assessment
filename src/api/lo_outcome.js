import service from '@/utils/request'

export default class LearningOutcome {
    static baseGroupURL = '/course-lo-supplement';

    static async viewcoallcourse() {
      const res = await service.get(`${this.baseGroupURL}/view`)
      return res
    }
}
