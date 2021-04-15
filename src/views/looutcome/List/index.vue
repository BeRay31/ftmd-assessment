<template>
  <div class="course-list-container">
    <header>
      <h1>Hasil LO Outcome</h1>
    </header>

    <div class="content-container">
      <div class="card">
        <table v-loading="listLoading">
          <tr>
            <template v-if="$store.getters.routes_user_type !== 'student'">
              <th>Id</th>
            </template>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Semester</th>
            <th>Nilai CA</th>
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
              <template v-if="$store.getters.routes_user_type !== 'student'">
                <td>{{ course.id }}</td>
              </template>
              <td>{{ [course.code, course.name].join(" ") }}</td>
              <td>{{ course.class }}</td>
              <td>{{ [course.semester %2 == 0 ? 'Genap' : 'Ganjil', course.tahun_ajaran].join(" ") }}</td>
              <td>{{ course.index }} </td>
              <td>{{ course.lo_a }} </td>
              <td>{{ course.lo_b }} </td>
              <td>{{ course.lo_c }} </td>
              <td>{{ course.lo_d }} </td>
              <td>{{ course.lo_e }} </td>
              <td>{{ course.lo_f }} </td>
              <td>{{ course.lo_g }} </td>
            </tr>
          </template>
          <tr>
            <th colspan="5">Hasil Learning Outcome</th>
            <th>{{ outcome.lo_a }} </th>
            <th>{{ outcome.lo_b }} </th>
            <th>{{ outcome.lo_c }} </th>
            <th>{{ outcome.lo_d }}</th>
            <th>{{ outcome.lo_e }}</th>
            <th>{{ outcome.lo_f }}</th>
            <th>{{ outcome.lo_g }}</th>
          </tr>
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
import Loutcome from '@/api/lo_outcome'

export default {
  name: 'CourseList',
  data() {
    return {
      courses: [],
      outcome: [],
      listLoading: false
    }
  },
  async mounted() {
    await this.getCoursesList()
  },
  methods: {
    async getCoursesList() {
      this.listLoading = true
      try {
        let courseResp
        if (this.$store.getters.routes_user_type !== 'student') {
          courseResp = await Loutcome.viewcoallcourse()
        } 
        this.courses = courseResp.value.component
        this.outcome = courseResp.value.result
        this.totalPage = courseResp.lastPage
      } catch (e) {
        console.error(e.stack)
      }
      this.listLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
