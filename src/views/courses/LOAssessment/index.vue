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
      <select v-model="tahunAjaran">
        <option value="" selected>-</option>
        <option v-for="item in listTahunAjaran" :key="item.tahun_ajaran" :value="item.tahun_ajaran">{{ item.tahun_ajaran }}</option>
      </select>
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
            <th>Learning Outcome</th>
            <th>Point</th>
            <th>Mark</th>
          </tr>
          <template v-if="loScores && loScores.length > 0">
            <tr v-for="score in loScores" :key="score.id_lo">
              <td>{{ score.name }}</td>
              <td>{{ score.index_lo === -1 ? '-' : score.index_lo }}</td>
              <td>{{ score.index_lo === -1 ? '-' : score.index_lo > 3 ? 'MAINTAIN' : 'IMPROVE' }}</td>
            </tr>
          </template>
        </table>
        <template v-if="!tahunAjaran || !semesterFilter">
          <tr>
            <h4 class="empty-state">Masukkan Tahun Ajaran dan Semester</h4>
          </tr>
        </template>
        <template v-else>
          <template v-if="!loScores || loScores.length == 0">
            <tr>
              <h4 class="empty-state">No - Data</h4>
            </tr>
            <el-button
              v-if="courses && courses.length > 0"
              type="primary"
              class="btn"
              @click.prevent="hitungLOAssessment"
            >Hitung</el-button>
          </template>
          <template v-else>
            <el-button
              type="primary"
              class="btn"
              @click.prevent="updateLOAssessment"
            >Update</el-button>
          </template>
        </template>
      </div>
      <div class="card">
        <table v-loading="listLoading">
          <tr>
            <th rowspan="2">Id</th>
            <th rowspan="2">Mata Kuliah</th>
            <th rowspan="2">Kelas</th>
            <th rowspan="2">Tahun Ajaran</th>
            <th rowspan="2">Semester</th>
            <th rowspan="2">Course Assessment</th>
            <th colspan="7">KML</th>
          </tr>
          <tr>
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
              <td>{{ course.tahun_ajaran }}</td>
              <td>{{ course.semester %2 == 0 ? 'Genap' : 'Ganjil' }}</td>
              <td>{{ course.course_assessment == -1 ? '-' : course.course_assessment }}</td>
              <td>{{ course.loKML[1] == 0 ? '-' : course.loKML[1] }}</td>
              <td>{{ course.loKML[2] == 0 ? '-' : course.loKML[2] }}</td>
              <td>{{ course.loKML[3] == 0 ? '-' : course.loKML[3] }}</td>
              <td>{{ course.loKML[4] == 0 ? '-' : course.loKML[4] }}</td>
              <td>{{ course.loKML[5] == 0 ? '-' : course.loKML[5] }}</td>
              <td>{{ course.loKML[6] == 0 ? '-' : course.loKML[6] }}</td>
              <td>{{ course.loKML[7] == 0 ? '-' : course.loKML[7] }}</td>
            </tr>
          </template>
        </table>
        <template v-if="!courses || courses.length == 0">
          <tr>
            <h4 class="empty-state">No - Data</h4>
          </tr>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LOAssessment from '@/api/loAssessment'

export default {
  data() {
    return {
      courses: [],
      loScores: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      semesterFilter: '',
      tahunAjaran: '',
      listTahunAjaran: [],
      listLoading: false
    }
  },
  watch: {
    async searchQuery() {
      await this.getCoursesList()
    },
    async semesterFilter() {
      await this.getCoursesList()
      await this.getLOAssessment()
    },
    async tahunAjaran() {
      await this.getCoursesList()
      await this.getLOAssessment()
    }
  },
  async mounted() {
    this.listLoading = true
    await this.getCoursesList()
    await this.getTahunAjaranList()
    this.listLoading = false
  },
  methods: {
    setSemesterFilter(type) {
      if (this.semesterFilter === type) {
        this.semesterFilter = null
      } else {
        this.semesterFilter = type
      }
    },
    async getLOAssessment() {
      try {
        if (this.semesterFilter && this.tahunAjaran) {
          var params = {
            semester: this.semesterFilter,
            tahun_ajaran: this.tahunAjaran
          }
          const results = await LOAssessment.fetchLOAssessment(params)
          this.loScores = results.data
        }
      } catch (e) {
        console.error(e.stack)
      }
    },
    async hitungLOAssessment() {
      try {
        var params = {
          semester: this.semesterFilter,
          tahun_ajaran: this.tahunAjaran,
          course_assessments: [],
          loKMLs: []
        }

        for (var i = 0; i < this.courses.length; i++) {
          params.course_assessments.push(this.courses[i].course_assessment)
          params.loKMLs.push(this.courses[i].loKML)
        }
        const result = await LOAssessment.insertLOAssessment(params)
        console.log(result.msg)
        await this.getLOAssessment()
      } catch (e) {
        console.error(e.stack)
      }
    },
    async updateLOAssessment() {
      try {
        var params = {
          semester: this.semesterFilter,
          tahun_ajaran: this.tahunAjaran,
          course_assessments: [],
          loKMLs: []
        }

        for (var i = 0; i < this.courses.length; i++) {
          params.course_assessments.push(this.courses[i].course_assessment)
          params.loKMLs.push(this.courses[i].loKML)
        }
        const result = await LOAssessment.updateLOAssessment(params)
        console.log(result.msg)
        await this.getLOAssessment()
      } catch (e) {
        console.error(e.stack)
      }
    },
    async getTahunAjaranList() {
      try {
        const tahunAjaranList = await LOAssessment.fetchTahunAjaranList()
        this.listTahunAjaran = tahunAjaranList.data
      } catch (e) {
        console.error(e.stack)
      }
    },
    async getCoursesList() {
      try {
        const params = {}
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        if (this.semesterFilter) {
          params.semester = this.semesterFilter
        }
        if (this.tahunAjaran) {
          params.tahun_ajaran = this.tahunAjaran
        }
        const courseResp = await LOAssessment.fetchCoursesWithLOKML(params)
        this.courses = courseResp.data
      } catch (e) {
        console.error(e.stack)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
