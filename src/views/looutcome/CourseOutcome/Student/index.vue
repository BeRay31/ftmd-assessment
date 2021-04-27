<template>
  <div class="course-outcome-container" :v-loading="mountLoad">
    <header>
      <h1>Course Outcome</h1>
    </header>
    <div class="content-container">
      <h3>{{ courseData.name }}</h3>
      <h3>Semester {{ courseData.semester %2 == 0 ? 'Genap' : 'Ganjil' }} {{ courseData.tahun_ajaran }}</h3>
      <div class="card">
        <table>
          <tr>
            <th>Komponen</th>
            <th>Nilai</th>
          </tr>
          <tr v-for="(outcome, idx) in outcomeData" :key="idx">
            <td>{{ outcome.component }}</td>
            <td>{{ outcome.score }}</td>
          </tr>
          <tr>
            <td class="highlight">Nilai Akhir</td>
            <td class="highlight">{{ getIndex(outcomeData[0].index) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '@/api/courses'
import CourseStudent from '@/api/courseStudent'

export default {
  name: 'StudentCourseOutcome',
  data() {
    return {
      id_course: this.$route.params.id,
      courseData: {},
      outcomeData: null,
      mountLoad: false
    }
  },
  async mounted() {
    this.mountLoad = true
    await this.getCourseData()
    await this.getCourseOutcomeData()
    this.mountLoad = false
  },
  methods: {
    async getCourseData() {
      const respCourse = await Course.fetchCourseById(this.id_course)
      this.courseData = respCourse.data
    },
    async getCourseOutcomeData() {
      const respCourseOutcome = await CourseStudent.getStudentCourseOutcome(this.$store.getters.id_user, this.id_course)
      this.outcomeData = respCourseOutcome.data
    },
    getIndex(mark) {
      if (mark > 3.5) {
        return 'A'
      } else if (mark > 3) {
        return 'AB'
      } else if (mark > 2.5) {
        return 'B'
      } else if (mark > 2) {
        return 'BC'
      } else if (mark > 1) {
        return 'C'
      } else if (mark > 0) {
        return 'D'
      } else {
        return 'E'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
@import '@/styles/table.scss';
</style>
