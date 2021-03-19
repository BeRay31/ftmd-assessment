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
          <th>Aksi</th>
        </tr>
        <tr v-for="student in students" :key="student.id_user">
          <td>{{ student.id_user }}</td>
          <td>{{ student.username }}</td>
          <td>{{ student.name }}</td>
          <td class="action">
            <el-button
              type="warning"
              icon="el-icon-delete"
              @click="openDeleteModal(course)"
              @submit="deleteCourse(course)"
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
        type="primary"
        class="btn"
      >Tambah Mahasiswa</el-button>
    </div>
  </div>
</template>

<script>
import CourseStudent from '@/api/courseStudent'
import Pagination from '@/components/Pagination/Pagination'

export default {
  name: 'ClassAttendance',
  components: {
    Pagination
  },
  props: {
    idCourse: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      students: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      listLoading: false
    }
  },
  watch: {
    async searchQuery() {
      await this.getClassAttendance()
    }
  },
  async mounted() {
    await this.getClassAttendance()
  },
  methods: {
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
        console.log(attendanceResp)
        this.students = attendanceResp.data
        this.totalPage = attendanceResp.lastPage
      } catch (e) {
        console.error(e)
      }
      this.listLoading = false
    },
    async updatePage(index) {
      this.currentPage = index
      await this.getClassAttendance()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
@import '@/styles/table.scss';
</style>
