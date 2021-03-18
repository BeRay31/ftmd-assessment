<template>
  <div class="course-list-container">
    <header>
      <h1>Daftar Mata Kuliah</h1>
      <div class="search">
        <img src="@/assets/svg/search.svg" alt>
        <input v-model="searchQuery" type="text" class="card" placeholder="Cari Users">
      </div>
    </header>
    <div class="filter-container">
      <el-button
        :type="semesterFilter == 1 ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setSemesterFilter(1)"
      >Ganjil</el-button>
      <el-button
        :type="semesterFilter == 2 ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setSemesterFilter(2)"
      >Genap</el-button>
    </div>
    <div class="content-container">
      <div class="card">
        <table v-loading="listLoading">
          <tr>
            <th>Id</th>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Dosen Pengampu</th>
            <th>Semester</th>
            <th>Tahun Ajaran</th>
            <th>Aksi</th>
          </tr>
          <template v-if="courses && courses.length > 0">
            <tr v-for="course in courses" :key="course.id_course">
              <td>{{ course.id_course }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.class }}</td>
              <td>{{ course.lecturer_name }}</td>
              <td>{{ course.semester %2 == 0 ? 'Genap' : 'Ganjil' }}</td>
              <td>{{ course.tahun_ajaran }}</td>
              <td class="action">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="goToEditCourse(course)"
                >Edit</el-button>
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  @click="openDeleteModal(course)"
                  @submit="deleteCourse(course)"
                >Delete</el-button>
              </td>
            </tr>
          </template>
        </table>
        <template v-if="!courses || courses.length == 0">
          <tr>
            <h4 class="empty-state">No - Data</h4>
          </tr>
        </template>
        <Pagination
          :total-page="totalPage"
          :current-page="currentPage"
          @pageChange="updatePage"
        />
      </div>
    </div>
    <DeleteModal
      v-if="modal.stateDelete"
      :state="modal.stateDelete"
      :course="modal.course"
      @closeModal="closeModal"
      @submit="deleteCourse"
    />
  </div>
</template>

<script>
import Courses from '@/api/courses'
import DeleteModal from '../Modal/DeleteModal/index'
import Pagination from '@/components/Pagination/Pagination'
import { Message } from 'element-ui'

export default {
  name: 'CourseList',
  components: {
    DeleteModal,
    Pagination
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      semesterFilter: '',
      listLoading: false,
      modal: {
        state: false,
        stateDelete: false,
        course: null
      }
    }
  },
  watch: {
    async searchQuery() {
      await this.getCoursesList()
    },
    async semesterFilter() {
      await this.getCoursesList()
    }
  },
  async mounted() {
    await this.getCoursesList()
  },
  methods: {
    updatePage(index) {
      this.currentPage = index
      this.getCoursesList()
    },
    setSemesterFilter(type) {
      if (this.semesterFilter === type) {
        this.semesterFilter = null
      } else {
        this.semesterFilter = type
      }
    },
    async getCoursesList() {
      this.listLoading = true
      try {
        const params = {
          pageSize: 10,
          page: this.currentPage
        }
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        if (this.semesterFilter) {
          params.semester = this.semesterFilter
        }
        const courseResp = await Courses.fetchCourses(params)
        this.courses = courseResp.data
        this.totalPage = courseResp.lastPage
      } catch (e) {
        console.error(e.stack)
      }
      this.listLoading = false
    },
    async editCourses(edited) {
      try {
        const fetched = await Courses.editCourse(edited)
        if (fetched.rows > 0) {
          Message({
            message: 'Update sukses!',
            type: 'success',
            duration: 3 * 1000
          })
        } else {
          Message({
            message: fetched.msg,
            type: 'error',
            duration: 3 * 1000
          })
        }
        this.closeModal()
        this.fetchCourses()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    openDeleteModal(course) {
      this.modal.stateDelete = true
      this.modal.course = course
    },
    async deleteCourse() {
      Courses.deleteCourse(this.modal.course.id_course).then((res) => {
        if (res.msg === 'OK') {
          this.modal.state = false
          this.modal.stateDelete = false
          this.modal.course = null
          this.fetchCourses()
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
          })
          this.closeModal()
        }
      })
    },
    closeModal() {
      this.modal.state = false
      this.modal.stateDelete = false
      this.modal.course = null
    },
    goToEditCourse(course) {
      this.$router.push({ name: 'EditCourse', params: { id: course.id_course }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
