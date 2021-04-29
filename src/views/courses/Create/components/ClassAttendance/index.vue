<template>
  <div class="class-attendance-container">
    <div class="class-attendance-container">
      <header>
        <h2>Input Nilai Mahasiswa CSV</h2>
        <a href="https://docs.google.com/spreadsheets/d/1y0dB5QqLlK6VVNRbFDwLZd1vNLTEr4ZicRvBbFaNllE/edit?usp=sharing">Template CSV</a>
        <form enctype="multipart/form-data">
          <input type="file" @change="onFileChange">
        </form>
        <el-button
          v-if="!isAdmin"
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click="goToAddScoreFile()"
        > Upload
        </el-button>
      </header>
    </div>
    <header>
      <h1>Daftar Mahasiswa</h1>
      <el-button
        v-if="!isAdmin"
        :loading="loading"
        type="primary"
        class="btn btn-primary btn-login"
        @click="goToAddScore()"
      > Daftar Nilai
      </el-button>
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
    <header>
      <h1>Range Index</h1>
    </header>
    <div class="form-card">
      <el-form>
        <el-form-item>
          A >= <el-input-number v-model="rangeA" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
        <el-form-item>
          AB >= <el-input-number v-model="rangeAB" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
        <el-form-item>
          B >= <el-input-number v-model="rangeB" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
        <el-form-item>
          BC >= <el-input-number v-model="rangeBC" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
        <el-form-item>
          C >= <el-input-number v-model="rangeC" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
        <el-form-item>
          D >= <el-input-number v-model="rangeD" :min="0" :max="100" size="small" :step="10" />
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="btn"
      @click="openModal('countIndex')"
    >Hitung Index</el-button>
    <div class="class-attendance-container">
      <h2>Daftar Index</h2>
      <div class = "card">
        <table>
          <tr>
            <th></th>
            <th>A</th>
            <th>AB</th>
            <th>B</th>
            <th>BC</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ totalA }}</td>
            <td>{{ totalAB }}</td>
            <td>{{ totalB }}</td>
            <td>{{ totalBC }}</td>
            <td>{{ totalC }}</td>
            <td>{{ totalD }}</td>
            <td>{{ totalE }}</td>
          </tr>
        </table>
      </div>
    </div>
    <el-button
      type="primary"
      class="btn"
      style="margin-top:20px; margin-left:600px"
      @click="openModal('uploadScore')"
    >Upload Nilai Ke Admin</el-button>
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
    <SubmitModal1
      v-if="isModalOpen('countIndex')"
      :state="isModalOpen('countIndex')"
      title="Hitung Nilai Index Mahasiswa ?"
      content="Nilai index mahasiswa akan dihitung sesuai dengan range yang telah diberikan"
      @closeModal="closeModal"
      @submit="handleSubmitCountIndex"
    />
    <SubmitModal2
      v-if="isModalOpen('uploadScore')"
      :state="isModalOpen('uploadScore')"
      title="Yakin akan upload nilai ke TU ?"
      content="Nilai akan terlihat pada bagian portfolio admin dan mahasiswa"
      @closeModal="closeModal"
      @submit="uploadAllScore"
    />
  </div>
</template>

<script>
import CourseStudent from '@/api/courseStudent'
import Course from '@/api/courses'
import Pagination from '@/components/Pagination/Pagination'
import DeleteModal from '@/views/courses/Modal/DeleteModal/index'
import ChooseStudents from '@/views/courses/Modal/ChooseStudentsModal/index'
import SubmitModal from '@/views/courses/Modal/SubmitModal/index'
import SubmitModal1 from '@/views/courses/Modal/SubmitModal/index'
import SubmitModal2 from '@/views/courses/Modal/SubmitModal/index'
import { Message } from 'element-ui'
var textFile
export default {
  name: 'ClassAttendance',
  components: {
    Pagination,
    DeleteModal,
    ChooseStudents,
    SubmitModal,
    SubmitModal1,
    SubmitModal2
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
      searchQuery: '',
      textFile: null,
      listLoading: false,
      selectedStudents: [],
      totalA: 0,
      totalAB: 0,
      totalB: 0,
      totalBC: 0,
      totalC: 0,
      totalD: 0,
      totalE: 0,
      rangeA: null,
      rangeAB: null,
      rangeB: null,
      rangeBC: null,
      rangeC: null,
      rangeD: null,
      rangeE: null,
      total: 0,
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
    await this.getIndex()
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
    goToAddScore() {
      this.$router.push({ name: 'ScoresList', params: { id: this.idCourse }})
    },
    async handleSubmitCountIndex() {
      const params = {
        rangeA: this.rangeA,
        rangeAB: this.rangeAB,
        rangeB: this.rangeB,
        rangeBC: this.rangeBC,
        rangeC: this.rangeC,
        rangeD: this.rangeD,
      }
      await CourseStudent.addIndexes(this.idCourse, params)
      Message({
        message: 'Index Berhasil Dihitung',
        type: 'success',
        duration: 5 * 1000
      })
      this.closeModal()
      this.getIndex()
    },
    async uploadAllScore() {
      await CourseStudent.uploadAll(this.idCourse)
      Message({
        message: 'Upload Nilai ke TU Berhasil',
        type: 'success',
        duration: 5 * 1000
      })
      this.closeModal()
    },
    async goToAddScoreFile() {
      console.log(textFile)
      const params = {
        text: textFile
      }
      await CourseStudent.addScoresCSV(this.idCourse, params)
      Message({
        message: 'Upload Nilai dan Komponen Berhasil',
        type: 'success',
        duration: 5 * 1000
      })
    },
    async getIndex() {
      this.totalA = 0
      this.totalAB = 0
      this.totalB = 0
      this.totalBC = 0
      this.totalC = 0
      this.totalD = 0
      this.totalE = 0
      const resp = await Course.getIndexes(this.idCourse)
      for (var i = 0; i < resp.data.length; i++) {
        if (resp.data[i].index_char === 'A') {
          this.totalA = resp.data[i].total
        }
        if (resp.data[i].index_char === 'AB') {
          this.totalAB = resp.data[i].total
        }
        if (resp.data[i].index_char === 'B') {
          this.totalB = resp.data[i].total
        }
        if (resp.data[i].index_char === 'BC') {
          this.totalBC = resp.data[i].total
        }
        if (resp.data[i].index_char === 'C') {
          this.totalC = resp.data[i].total
        }
        if (resp.data[i].index_char === 'D') {
          this.totalD = resp.data[i].total
        }
        if (resp.data[i].index_char === 'E') {
          this.totalE = resp.data[i].total
        }
      }
      console.log(resp)
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
          // TODO:: Handle file Data
          // const formDatawFile = new FormData();
          // formDatawFile.append('excel', this.modal.carriedData.fileStudents);
          await CourseStudent.enrollUserByFile(this.idCourse, this.modal.carriedData.fileStudents)
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
    onFileChange: function(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = function(e) {
        textFile = e.target.result
        console.log(textFile)
      }
      reader.readAsText(file)
    },
    saveText(data) {
      this.textFile = data
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
