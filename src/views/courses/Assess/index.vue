<template>
  <div class="course-container">
    <header>
      <h1>Course Assessment</h1>
    </header>
    <div class="subtitle">
      {{ courseCode }}
      {{ year }}
    </div>
    <div class="content-container">
      <div class="card">
        <table v-if="assessments || averages">
          <tr>
            <th>Kelas</th>
            <th>Dosen</th>
            <th>Course Outcome</th>
            <th>Portfolio</th>
            <th>Softskills</th>
          </tr>
          <tr v-for="assess in assessments" :key="assess.id_course">
            <td>{{ assess.class }}</td>
            <td>{{ dosen.find(a => { return a.id_course == assess.id_course }).lecturer_name }}</td>
            <td>
              <el-link @click="openCO(assess.id_course)">
                {{ assess ? assess.course_outcome.toFixed(2) : 'N/A' }}
              </el-link>
            </td>
            <td>{{ assess ? assess.course_outcome.toFixed(2) : 'N/A' }}</td>
            <td>{{ assess ? assess.course_outcome.toFixed(2) : 'N/A' }}</td>
          </tr>
          <tr style="font-size: 1.2rem">
            <th colspan="2">Rata-rata</th>
            <td>{{ averages ? averages.avg_co.toFixed(2) : 'N/A' }}</td>
            <td>{{ averages ? averages.avg_po.toFixed(2) : 'N/A' }}</td>
            <td>{{ averages ? averages.avg_qo.toFixed(2) : 'N/A' }}</td>
          </tr>
        </table>
        <p v-else>
          Penilaian belum tersedia
        </p>
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
      courseCode: this.$route.params.code,
      year: this.$route.params.year,
      dosen: null,
      assessments: null,
      averages: null
    }
  },
  async mounted() {
    this.fetchAssessment()
  },
  methods: {
    openCO(id_course) {
      this.$router.push({ name: 'AssessCO', params: { id_course: id_course }})
    },
    async fetchAssessment() {
      Course.fetchCourseAssessment(this.courseCode, this.year).then((res) => {
        this.assessments = res.rows
        this.averages = res.avg
        this.dosen = res.dosen
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
