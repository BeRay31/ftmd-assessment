<template>
  <div class="class-attendance-container">
    <header>
      <h1>Daftar Nilai Keseluruhan</h1>
      <el-select v-model="filter">
        <el-option
          v-for="(comp, idx) in components"
          :key="idx"
          :label="comp"
          :value="comp"
        />
        <el-option :label="'Semua'" :value="'Semua'" />
      </el-select>
      <el-button
        type="warning"
        icon="el-icon-delete"
        @click="openDeleteEnrollmentModalAll()"
      >Reset Nilai</el-button>
      <div class="search">
        <img src="@/assets/svg/search.svg" alt>
        <input v-model="searchQuery" type="text" class="card" placeholder="Cari Mahasiswa">
      </div>
    </header>
    <div class="card">
      <table>
        <tr>
          <th>Id</th>
          <th>Username/NIM</th>
          <th>Nama Lengkap</th>
          <th>Komponen</th>
          <th>Nilai</th>
          <th>Aksi</th>
        </tr>
        <tr v-for="(student, idx) in displayed" :key="idx">
          <td>{{ student.id_user }}</td>
          <td>{{ student.username }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.component }}</td>
          <td>{{ student.score }}</td>
          <td class="action">
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="openModalEdit(student)"
            >Edit</el-button>
            <el-button
              type="warning"
              icon="el-icon-delete"
              @click="openDeleteEnrollmentModal(student)"
            >Delete</el-button>
          </td>
        </tr>
      </table>
      <Pagination
        :total-page="totalPage"
        :current-page="currentPage"
        @pageChange="updatePage"
      />
      <el-button
        v-if="isAdmin"
        type="primary"
        class="btn"
        @click="openModal('selectStudents')"
      >Tambah Mahasiswa</el-button>
    </div>
    <DeleteModal
      v-if="isModalOpen('deleteConfirm')"
      :state="isModalOpen('deleteConfirm')"
      title="Hapus nilai ini ?"
      :content="`Mahasiswa '${modal.carriedData.name}' dengan nilai '${modal.carriedData.score}' pada komponen '${modal.carriedData.component}' akan dihapus`"
      @closeModal="closeModal"
      @submit="deleteEnrollment"
    />
    <DeleteModalAll
      v-if="isModalOpen('deleteConfirm1')"
      :state="isModalOpen('deleteConfirm1')"
      title="Reset Semua Nilai Mahasiswa ?"
      :content="`Semua nilai mahasiswa dan komponen akan terhapus secara otomatis`"
      @closeModal="closeModal"
      @submit="deleteAll"
    />
    <EditModal
      v-if="modal.stateEdit"
      :state="modal.stateEdit"
      :component="modal.editComponent"
      @closeModal="closeModal"
      @submit="editComponent"
    />
    <ChooseStudents
      v-if="isModalOpen('selectStudents')"
      :state="isModalOpen('selectStudents')"
      :excluded-user="currentStudentList"
      @closeModal="closeModal"
      @submit="openEnrollConfirmModal"
    />
    <SubmitModal
      v-if="isModalOpen('confirmEnroll')"
      :state="isModalOpen('confirmEnroll')"
      title="Daftarkan Mahasiswa ke Kelas ?"
      content="Mahasiswa yang dipilih sebelumnya akan didaftarkan pada kelas ini !"
      @closeModal="closeModal"
      @submit="handleSubmitSelectedStudents"
    />
  </div>
</template>

<script>
import CourseStudent from '@/api/courseStudent'
import Course from '@/api/courses'
import DosenLoWeight from '@/api/dosen_lo_weight'
import Pagination from '@/components/Pagination/Pagination'
import DeleteModal from '@/views/courses/Modal/DeleteModal/index'
import DeleteModalAll from '@/views/courses/Modal/DeleteModal/index'
import EditModal from '@/views/courses/Scores/EditModal/index'
import ChooseStudents from '@/views/courses/Modal/ChooseStudentsModal/index'
import SubmitModal from '@/views/courses/Modal/SubmitModal/index'
import { Message } from 'element-ui'

export default {
  name: 'ClassAttendance',
  components: {
    Pagination,
    DeleteModal,
    DeleteModalAll,
    ChooseStudents,
    EditModal,
    SubmitModal
  },
  props: {
    idCourse: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      students: [],
      isAdmin: this.$store.getters.user_type === 'admin',
      currentPage: 1,
      totalPage: null,
      loading: false,
      searchQuery: '',
      listLoading: false,
      selectedStudents: [],
      currentStudentList: [],
      displayed: [],
      filter: 'Semua',
      components: [],
      pageSize: 10,
      modal: {
        state: '',
        type: '',
        stateEdit: false,
        editComponent: null,
        carriedData: null
      }
    }
  },
  watch: {
    async searchQuery() {
      await this.getClassAttendance()
    },
    filter() {
      this.filterList()
    }
  },
  async mounted() {
    await this.getClassAttendance()
    await this.getAllClassAttendance()
    const components = await DosenLoWeight.fetchScoreComponents(this.idCourse)
    this.components = components.data.map(c => c.component)
  },
  methods: {
    async getAllClassAttendance() {
      const attendanceResp = await Course.getScores(this.idCourse)
      if (attendanceResp.data && attendanceResp.data.length > 0) {
        this.currentStudentList = attendanceResp.data.map(el => el.id_user)
      } else {
        this.currentStudentList = []
      }
      setTimeout(() => { this.getAllClassAttendance() }, 1500)
      this.getClassAttendance()
    },
    async getClassAttendance() {
      this.listLoading = true
      try {
        const params = {
          page: this.currentPage,
          pageSize: 10
        }
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        const attendanceResp = await Course.getScores(this.idCourse, params)
        this.students = attendanceResp.data
        this.totalPage = attendanceResp.lastPage
        this.filterList()
      } catch (e) {
        console.error(e)
      }
      this.listLoading = false
    },
    filterList() {
      if (this.students && this.students.length > 0) {
        this.displayed = this.students
        if (this.filter !== 'Semua') {
          this.displayed = this.students.filter(s => s.component === this.filter)
        }
        const startPage = (this.currentPage - 1) * this.pageSize
        const endPage = this.currentPage * this.pageSize
        this.displayed = this.displayed.slice(startPage, endPage)
        this.totalPage = Math.ceil(this.displayed.length / this.pageSize)
      }
    },
    async deleteEnrollment() {
      try {
        // console.log(this.modal.carriedData)
        await Course.deleteScores(this.modal.carriedData)
        await this.getAllClassAttendance()
        Message({
          message: 'Mahasiswa berhasil dihapus dari kelas',
          type: 'success',
          duration: 5 * 1000
        })
      } catch (e) {
        console.log(e)
        Message({
          message: 'Error saat menghapus Mahasiswa dari kelas',
          type: 'error',
          duration: 5 * 1000
        })
      }
      this.closeModal()
    },
    async deleteAll() {
      try {
        await Course.deleteScoresAll(this.idCourse)
        await this.getAllClassAttendance()
        Message({
          message: 'Nilai Mahasiswa Sudah di Reset',
          type: 'success',
          duration: 5 * 1000
        })
      } catch (e) {
        console.log(e)
        Message({
          message: 'Error saat menghapus Mahasiswa dari kelas',
          type: 'error',
          duration: 5 * 1000
        })
      }
      this.closeModal()
    },
    async editComponent(edited) {
      try {
        await Course.updateScores(edited)
        await this.getAllClassAttendance()
        Message({
          message: 'Nilai Berhasil di Update',
          type: 'success',
          duration: 5 * 1000
        })
      } catch (e) {
        console.log(e)
        Message({
          message: 'Error saat mengupdate nilai',
          type: 'error',
          duration: 5 * 1000
        })
      }
      this.closeModal()
    },
    async handleSubmitSelectedStudents() {
      try {
        if (this.modal.carriedData.emitType === 'list') {
          const ids_user = this.modal.carriedData.selectedStudents.toString()
          const data = {
            ids_user
          }
          await CourseStudent.enrollUserByIds(this.idCourse, data)
        } else if (this.modal.carriedData.emitType === 'fileData') {
          await CourseStudent.enrolluserByFile(this.idCourse, this.modal.carriedData.fileStudents)
          // TODO:: Handle file Data
        }
        await this.getAllClassAttendance()
        Message({
          message: 'Mahasiswa yang dipilih berhasil didaftarkan',
          type: 'success',
          duration: 5 * 1000
        })
      } catch (e) {
        console.log(e)
        Message({
          message: 'Gagal saat mendaftarkan user',
          type: 'error',
          duration: 5 * 1000
        })
      }
      this.closeModal()
      await this.getClassAttendance()
      await this.getAllClassAttendance()
    },
    openEnrollConfirmModal(carriedData) {
      this.modal.carriedData = carriedData
      this.openModal('confirmEnroll')
    },
    async updatePage(index) {
      this.currentPage = index
      await this.getClassAttendance()
    },
    openDeleteEnrollmentModal(carriedData) {
      this.openModal('deleteConfirm')
      this.modal.carriedData = carriedData
    },
    openDeleteEnrollmentModalAll() {
      this.openModal('deleteConfirm1')
    },
    openModalEdit(student) {
      this.modal.editComponent = student
      this.modal.stateEdit = true
    },
    closeModal() {
      this.modal.state = false
      this.modal.stateEdit = false
      this.modal.carriedData = null
    },
    openModal(type) {
      this.modal.state = true
      this.modal.type = type
    },
    isModalOpen(type) {
      return this.modal.state && this.modal.type === type
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
@import '@/styles/table.scss';
</style>
