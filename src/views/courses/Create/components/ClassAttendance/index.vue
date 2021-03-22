<template>
  <div class="class-attendance-container">
    <header>
      <h1>Daftar Mahasiswa</h1>
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
          <th v-if="isAdmin">Aksi</th>
        </tr>
        <tr v-for="student in students" :key="student.id_user">
          <td>{{ student.id_user }}</td>
          <td>{{ student.username }}</td>
          <td>{{ student.name }}</td>
          <td v-if="isAdmin" class="action">
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
      title="Hapus Mahasiswa dari Kelas ?"
      :content="`Mahasiswa '${modal.carriedData.name}' akan dihapus dari daftar mahasiswa`"
      @closeModal="closeModal"
      @submit="deleteEnrollment"
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
import Pagination from '@/components/Pagination/Pagination'
import DeleteModal from '@/views/courses/Modal/DeleteModal/index'
import ChooseStudents from '@/views/courses/Modal/ChooseStudentsModal/index'
import SubmitModal from '@/views/courses/Modal/SubmitModal/index'
import { Message } from 'element-ui'

export default {
  name: 'ClassAttendance',
  components: {
    Pagination,
    DeleteModal,
    ChooseStudents,
    SubmitModal
  },
  props: {
    idCourse: {
      default: null,
      type: String || Number
    }
  },
  data() {
    return {
      students: [],
      isAdmin: this.$store.getters.user_type === 'admin',
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      listLoading: false,
      selectedStudents: [],
      currentStudentList: [],
      modal: {
        state: '',
        type: '',
        carriedData: null
      }
    }
  },
  watch: {
    async searchQuery() {
      await this.getClassAttendance()
    }
  },
  async mounted() {
    await this.getClassAttendance()
    await this.getAllClassAttendance()
  },
  methods: {
    async getAllClassAttendance() {
      const attendanceResp = await CourseStudent.getCourseStudent(this.idCourse)
      if (attendanceResp.data && attendanceResp.data.length > 0) {
        this.currentStudentList = attendanceResp.data.map(el => el.id_user)
      } else {
        this.currentStudentList = []
      }
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
        const attendanceResp = await CourseStudent.getCourseStudent(this.idCourse, params)
        this.students = attendanceResp.data
        this.totalPage = attendanceResp.lastPage
      } catch (e) {
        console.error(e)
      }
      this.listLoading = false
    },
    async deleteEnrollment() {
      try {
        await CourseStudent.deleteCourseEnrollmentById(this.modal.carriedData.id)
        await this.getClassAttendance()
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
    closeModal() {
      this.modal.state = false
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
