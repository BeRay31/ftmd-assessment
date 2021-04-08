<template>
  <div class="course-list-container">
    <header>
      <h1>Daftar Mata Kuliah</h1>
      <div class="search">
        <img src="@/assets/svg/search.svg" alt>
        <input v-model="searchQuery" type="text" class="card" placeholder="Cari Mata Kuliah">
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
            <template v-if="$store.getters.routes_user_type !== 'student'">
              <th>Id</th>
            </template>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Dosen Pengampu</th>
            <th>Semester</th>
            <th>Tahun Ajaran</th>
            <th>Aksi</th>
            <template v-if="$store.getters.routes_user_type == 'student'">
              <th>Nilai Akhir</th>
            </template>
          </tr>
          <template v-if="courses && courses.length > 0">
            <tr v-for="course in courses" :key="course.id_course">
              <template v-if="$store.getters.routes_user_type !== 'student'">
                <td>{{ course.id_course }}</td>
              </template>
              <td>{{ course.name }}</td>
              <td>{{ course.class }}</td>
              <td>{{ course.lecturer_name }}</td>
              <td>{{ course.semester %2 == 0 ? 'Genap' : 'Ganjil' }}</td>
              <td>{{ course.tahun_ajaran }}</td>
              <template v-if="$store.getters.routes_user_type !== 'student'">
                <td class="action">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="goToEditCourse(course)"
                  >Edit</el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-s-management"
                    @click="openLOModal(course.id_course)"
                  >Lihat LO</el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-delete"
                    @click="openDeleteModal(course)"
                  >Delete</el-button>
                </td>
              </template>
              <template v-else>
                <td class="action">
                  <el-button
                    :disabled="course.index == null"
                    type="warning"
                    icon="el-icon-s-management"
                    @click="goToCourseOutcome(course)"
                  >Rincian Nilai</el-button>
                </td>
                <td style="padding: 19px 0rem">{{ course.index || 'N/A' }}</td>
              </template>
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
import CourseStudent from '@/api/courseStudent'
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
    openLOModal(id_course) {
      this.$router.push({ name: 'LOCourse', params: { id: id_course }})
    },
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
        let courseResp
        if (this.$store.getters.routes_user_type !== 'student') {
          courseResp = await Courses.fetchCourses(params)
        } else {
          courseResp = await CourseStudent.getCourseAttended(this.$store.getters.id_user, params)
        }
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
    },
    goToCourseOutcome(course) {
      this.$router.push({ name: 'StudentCourseOutcomes', params: { id: course.id_course }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
