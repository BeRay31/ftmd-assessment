<template>
  <div class="course-container">
    <header>
      <h1>Course Assessment</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
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
          <tr v-for="course in courses" :key="course.code">
            <td>{{ course.code }}</td>
            <td>{{ course.name }}</td>
            <td>{{ course.kelas > 1 ? '01-' + course.kelas.toString().padStart(2, '0') : course.kelas.toString().padStart(2, '0') }}</td>
            <td>{{ course.out ? course.out.toFixed(2) : "-" }}</td>
            <td>{{ course.qst ? course.qst.toFixed(2) : "-" }}</td>
            <td>{{ course.prt ? course.prt.toFixed(2) : "-" }}</td>
            <td>-</td>
            <td>Maintain</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '@/api/courses'

export default {
  name: 'CourseAssessment',
  data() {
    return {
      tahunAjaran: null,
      semester: null,
      courses: null
    }
  },
  created() {
    const now = new Date()
    const month = now.getMonth(); const year = now.getFullYear()
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
      Course.fetchCourseAssessment(this.tahunAjaran, this.semester).then((res) => {
        this.courses = res.rows
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
