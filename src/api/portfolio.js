import service from '@/utils/request'

export default class Portfolio {
    static baseGroupURL = 'portfolio';

    static async fetchPortfolio(id_course) {
      const res = await service.get(`${this.baseGroupURL}/view/${id_course}`)
      return res
    }

    static async insertPortfolio(data) {
      const res = await service.post(`${this.baseGroupURL}/insert`, data)
      return res
    }

    static async updatePortfolio(data) {
      const res = await service.post(`${this.baseGroupURL}/update`, data)
      return res
    }

    static async fetchPortfolioIndex(id_course) {
      const res = await service.get(`${this.baseGroupURL}/viewIndex/${id_course}`)
      return res
    }

    static async insertPortfolioIndex(data) {
      const res = await service.post(`${this.baseGroupURL}/insertIndex`, data)
      return res
    }

    static async updatePortfolioIndex(data) {
      const res = await service.post(`${this.baseGroupURL}/updateIndex`, data)
      return res
    }
}
