<template>
  <div class="course-container">
    <header>
      <h1>Course Outcome</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table v-if="components.length > 0">
          <tr>
            <th>Nama</th>
            <th v-for="component in components" :key="component.id">
              {{ component.component }}
            </th>
          </tr>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td v-for="detail in student.details" :key="detail.component">
              {{ detail.score }}
            </td>
          </tr>
        </table>
        <Pagination
          v-if="components.length > 0"
          :total-page="totalPage"
          :current-page="page"
          @pageChange="changePage"
        />
        <div v-else style="text-align: center; padding-bottom: 1rem;">
          <h3>Detail belum tersedia.</h3>
          Mohon periksa database atau kontak dosen yang bersangkutan
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '@/api/courses'
import Pagination from '@/components/Pagination/Pagination'

export default {
  name: 'CourseDetails',
  components: {
    Pagination
  },
  data() {
    return {
      courseCode: this.$route.params.id_course,
      students: null,
      components: null,
      page: 1,
      totalPage: 1
    }
  },
  async mounted() {
    this.fetchDetails()
  },
  methods: {
    changePage(index) {
      this.page = index
      this.fetchDetails()
    },
    async fetchDetails() {
      Course.fetchCourseDetails(this.courseCode, this.page).then((res) => {
        this.students = res.rows
        this.components = res.comp
        this.totalPage = res.maxpage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
