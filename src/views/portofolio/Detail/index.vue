<template>
  <div class="portofolio-container">
    <header>
      <h1>Portofolio Perkuliahan {{ id_course }}</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr />
          <tr>
            <td class="left-align">Kehadiran Dosen</td>
            <td>{{ portfolio.totalAttendance && portfolio.totalMeetings ? (portfolio.totalAttendance / portfolio.totalMeetings * 100.0).toFixed(2) + " %" : "-" }}</td>
          </tr>
          <tr>
            <td class="left-align">Kehadiran Mahasiswa</td>
            <td>{{ portfolio.studentAttendance == null ? "-" : portfolio.studentAttendance.toFixed(2) + " %" }}</td>
          </tr>
          <tr>
            <td class="left-align">Rata-rata Nilai Mahasiswa</td>
            <td>{{ portfolio.average == null ? "-" : portfolio.average.toFixed(2) }}</td>
          </tr>
          <tr>
            <td colspan="2">Indeks Portfolio : {{ index == null ? '-' : index.toFixed(2) }}</td>
          </tr>
        </table>
        <el-button type="primary" icon="el-icon-document" @click="openInputModal">{{ portfolio.totalMeetings == null ? "Tambah Portfolio" : "Edit Portfolio" }}</el-button>
      </div>
    </div>
    <InputModal
      v-if="modal.state"
      :portfolio="portfolio"
      :state="modal.state"
      :edit="modal.edit"
      :title="modal.title"
      @closeModal="closeModal"
      @submitCreate="insertPortfolio"
      @submitEdit="updatePortfolio"
    />
  </div>
</template>

<script>
import InputModal from '@/views/portofolio/Detail/InputModal/index'
import Portfolio from '@/api/portfolio'
import { Message } from 'element-ui'

export default {
  components: { InputModal },
  data() {
    return {
      index: null,
      portfolio: {
        totalMeetings: null,
        totalAttendance: null,
        studentAttendance: null,
        average: null
      },
      id_course: this.$route.params.id,
      modal: {
        state: null,
        edit: null,
        title: ''
      }
    }
  },
  async mounted() {
    await this.getPortfolio()
    await this.getPortfolioIndex()
  },
  methods: {
    async getPortfolio() {
      try {
        const results = await Portfolio.fetchPortfolio(this.$route.params.id)
        this.portfolio.totalMeetings = results.totalMeetings
        this.portfolio.totalAttendance = results.totalAttendance
        this.portfolio.studentAttendance = results.studentAttendance
        this.portfolio.average = results.average
        if (results.totalMeetings) {
          this.modal.edit = true
        } else {
          this.modal.edit = false
        }
      } catch (e) {
        console.log(e.stack)
      }
    },
    async getPortfolioIndex() {
      try {
        const results = await Portfolio.fetchPortfolioIndex(this.$route.params.id)
        this.index = results.data.index
      } catch (e) {
        console.log(e.stack)
      }
    },
    async insertPortfolio(datas) {
      try {
        var params = {
          id_course: this.id_course,
          totalMeetings: datas.pertemuan,
          totalAttendance: datas.kehadiran,
          studentAttendance: datas.kehadiranMahasiswa,
          average: datas.average
        }

        var indexParams = {
          id_course: this.id_course,
          index: (params.totalAttendance / params.totalMeetings * 4.0 + params.studentAttendance / 25.0 + params.average) / 3.0
        }
        const result = await Portfolio.insertPortfolio(params)
        if (result.msg === 'Request succeed') {
          const indexResult = await Portfolio.insertPortfolioIndex(indexParams)
          if (indexResult.msg === 'Request succeed') {
            Message({
              message: 'Portfolio berhasil ditambahkan',
              type: 'success',
              duration: 3 * 1000
            })
          } else {
            Message({
              message: 'Error dalam perhitungan indeks',
              type: 'error',
              duration: 3 * 1000
            })
          }
          await this.getPortfolio()
          await this.getPortfolioIndex()
        } else {
          Message({
            message: 'Portfolio gagal ditambahkan',
            type: 'error',
            duration: 3 * 1000
          })
        }
      } catch (e) {
        console.log(e.message)
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async updatePortfolio(datas) {
      try {
        var params = {
          id_course: this.id_course,
          totalMeetings: datas.pertemuan,
          totalAttendance: datas.kehadiran,
          studentAttendance: datas.kehadiranMahasiswa,
          average: datas.average
        }

        var indexParams = {
          id_course: this.id_course,
          index: (params.totalAttendance / params.totalMeetings * 4.0 + params.studentAttendance / 25.0 + params.average) / 3.0
        }

        const result = await Portfolio.updatePortfolio(params)
        this.closeModal()
        if (result.msg === 'Request succeed') {
          const indexResult = await Portfolio.updatePortfolioIndex(indexParams)

          if (indexResult.msg === 'Request succeed') {
            Message({
              message: 'Portfolio berhasil ditambahkan',
              type: 'success',
              duration: 3 * 1000
            })
          } else {
            Message({
              message: 'Error dalam perhitungan indeks',
              type: 'error',
              duration: 3 * 1000
            })
          }
        } else {
          Message({
            message: 'Portfolio gagal ditambahkan',
            type: 'error',
            duration: 3 * 1000
          })
        }
        await this.getPortfolio()
        await this.getPortfolioIndex()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    closeModal() {
      this.modal.state = false
      this.modal.title = ''
    },
    openInputModal(lo) {
      this.modal.state = true
      this.modal.title = this.modal.edit ? 'Edit Portfolio' : 'Tambah Portfolio'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/table.scss";

  header h1 {
    font-weight: 600;
  }

  .portofolio-container {
    padding: 1rem 2rem;
  }

  .content-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
    border-radius: 16px;
    padding: 1rem 2rem;
  }

  .left-align {
      text-align: left;
  }

  table tr:first-of-type {
      border-bottom: 0px;
  }
</style>
