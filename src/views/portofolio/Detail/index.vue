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
            <td>{{ portfolio.dosenAttendance == null ? "-" : portfolio.dosenAttendance + " %" }}</td>
          </tr>
          <tr>
            <td class="left-align">Kehadiran Mahasiswa</td>
            <td>{{ portfolio.studentAttendance == null ? "-" : portfolio.studentAttendance + " %" }}</td>
          </tr>
          <tr>
            <td class="left-align">Rata-rata Nilai Mahasiswa</td>
            <td>{{ portfolio.average == null ? "-" : portfolio.average }}</td>
          </tr>
        </table>
        <el-button type="primary" icon="el-icon-document" @click="openInputModal">{{ portfolio.dosenAttendance == null ? "Tambah Portfolio" : "Edit Portfolio" }}</el-button>
      </div>
    </div>
    <InputModal
      v-if="modal.state"
      :state="modal.state"
      :edit="modal.edit"
      :title="modal.title"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import InputModal from '@/views/portofolio/Detail/InputModal/index'

export default {
  components: { InputModal },
  data() {
    return {
      portfolio: {
        dosenAttendance: null,
        studentAttendance: null,
        average: null,
      },
      id_course: this.$route.params.id,
      modal: {
        state: null,
        edit: null,
        title: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.modal.state = false
      this.modal.edit = false
      this.modal.title = ''
    },
    openInputModal(lo) {
      this.modal.state = true
      this.modal.title = 'Tambah Portfolio'
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
