<template>
  <div class="course-list-container">
    <header>
      <h1>LO Assessment</h1>
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
            <th>Id</th>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Course Assessment</th>
            <th>LO A</th>
            <th>LO B</th>
            <th>LO C</th>
            <th>LO D</th>
            <th>LO E</th>
            <th>LO F</th>
            <th>LO G</th>
          </tr>
          <template v-if="courses && courses.length > 0">
            <tr v-for="course in courses" :key="course.id_course">
              <td>{{ course.id_course }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.class }}</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
              <td>4.0</td>
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
import Pagination from '@/components/Pagination/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      courses: [],
      courseAssess: [], // Ini harusnya di course_outcome_indexes
      loScore: [], // Ini di lo_semester_indexes (?)
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      semesterFilter: '',
      listLoading: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
