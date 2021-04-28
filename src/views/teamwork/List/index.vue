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
              <template v-if="$store.getters.routes_user_type === 'admin'">
                <td class="action">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="goToFillQuestionnaires(course)"
                  >Lihat</el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-s-order"
                    @click="goToQuestionnaireResult(course)"
                  >Lihat Hasil</el-button>
                </td>
              </template>
              <template v-else-if="$store.getters.routes_user_type === 'student'">
                <td class="action">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="goToFillQuestionnaires(course)"
                  >Pengisian</el-button>
                </td>
              </template>
              <template v-else>
                <td class="action">
                  <el-button
                    type="warning"
                    icon="el-icon-s-order"
                    @click="goToQuestionnaireResult(course)"
                  >Lihat Hasil</el-button>
                </td>
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
  </div>
</template>

<script>
import Courses from '@/api/courses'
import CourseStudent from '@/api/courseStudent'
import Pagination from '@/components/Pagination/Pagination'

export default {
  name: 'CourseList',
  components: {
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
    goToFillQuestionnaires(course) {
      this.$router.push({ name: 'FillTeamworkQuestionnaire', params: { id: course.id_course }})
    },
    goToQuestionnaireResult(course) {
      this.$router.push({ name: 'TeamworkQuestionnaireResults', params: { id: course.id_course }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
