<template>
  <div class="course-container">
    <header>
      <h1>Course Assessment</h1>
      <div class="search">
        <img src="@/assets/svg/search.svg" alt>
        <input
          v-model="searchQuery"
          type="text"
          class="card"
          placeholder="Cari Mata Kuliah"
        >
      </div>
    </header>
    <div class="button-panel">
      <el-button
        type="success"
        class="btn justify-start"
        @click.prevent="assessCourse"
      >Calculate Index</el-button>

      <el-button
        :type="semester == 1 ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setSemesterFilter(1)"
      >Ganjil</el-button>
      <el-button
        :type="semester == 2 ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setSemesterFilter(2)"
      >Genap</el-button>

      <select v-model="tahunAjaran">
        <option v-for="tahun in allTahun" :key="tahun" :value="tahun.tahun_ajaran">
          {{ tahun.tahun_ajaran }}
        </option>
      </select>
    </div>
    <div class="content-container">
      <div class="card">
        <table v-if="courses.length > 0">
          <tr>
            <th colspan="3">Mata Kuliah</th>
            <th rowspan="2">Course Outcome</th>
            <th rowspan="2">Rata-rata Kuesioner</th>
            <th rowspan="2">Portfolio</th>
            <th rowspan="2">Course Assessment</th>
            <th rowspan="2">Mark</th>
          </tr>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kelas</th>
          </tr>
          <tr v-for="course in displayed" :key="course.code">
            <td>{{ course.code }}</td>
            <td>{{ course.name }}</td>
            <td>
              {{
                course.kelas > 1
                  ? "01-" + course.kelas.toString().padStart(2, "0")
                  : course.kelas.toString().padStart(2, "0")
              }}
            </td>
            <td>{{ course.out ? course.out.toFixed(2) : "-" }}</td>
            <td>{{ course.qst ? course.qst.toFixed(2) : "-" }}</td>
            <td>{{ course.prt ? course.prt.toFixed(2) : "-" }}</td>
            <td>{{ course.ast ? course.ast.toFixed(2) : "-" }}</td>
            <td>{{ course.ast ? "Maintain" : "Improve" }}</td>
          </tr>
        </table>
        <p v-else>
          Mata Kuliah tidak ditemukan
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '@/api/courses'
import { Message } from 'element-ui'

export default {
  name: 'CourseAssessment',
  data() {
    return {
      tahunAjaran: null,
      allTahun: null,
      semester: null,
      courses: null,
      displayed: null,
      searchQuery: "",
      totalPage: 1,
      currentPage: 1
    }
  },
  watch: {
    searchQuery() {
      this.display()
    },
    tahunAjaran() {
      this.fetchCourseAssessment()
    },
    semester() {
      this.fetchCourseAssessment()
    }
  },
  created() {
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    if (month > 6) {
      this.tahunAjaran = year.toString() + '/' + (year + 1).toString()
      this.semester = 2
    } else {
      this.tahunAjaran = (year - 1).toString() + '/' + year.toString()
      this.semester = 1
    }
  },
  async mounted() {
    this.semester = 2
    this.fetchCourseAssessment()
  },
  methods: {
    async fetchCourseAssessment() {
      Course.fetchCourseAssessment(this.tahunAjaran, this.semester).then(
        (res) => {
          this.courses = res.rows
          this.allTahun = res.allTahun
          this.display()
        })
    },
    assessCourse() {
      var data = {}
      data.tahun_ajaran = this.tahunAjaran
      data.semester = this.semester
      data.courses = this.courses.map(a => a.code)
      Course.calculateCourseAssessment(data).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 2 * 1000
        })
        this.fetchCourseAssessment()
      }).catch((err) => {
        Message({
          message: err.stack,
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    setSemesterFilter(sem) {
      this.semester = sem
    },
    updatePage(index) {
      this.currentPage = index
    },
    display() {
      this.displayed = this.courses.filter(this.checkSubstring)
    },
    checkSubstring(course) {
      return course.name.toLowerCase().includes(this.searchQuery)
    } 
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
