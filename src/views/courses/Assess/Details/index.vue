<template>
  <div class="course-container">
    <header>
      <h1>Course Outcome Details</h1>
    </header>
    <div class="content-container">
      <div class="card">
        {{ components }}
        <table>
          <tr>
            <th>Index</th>
            <th>Jumlah</th>
          </tr>
          <tr v-for="index in indexes" :key="index">
            <td>{{ index.index }}</td>
            <td>{{ index.count }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '@/api/courses'

export default {
  name: 'CourseDetails',
  data() {
    return {
      code: this.$route.params.code,
      year: this.$route.params.year,
      sem: this.$route.params.sem,
      components: null,
      indexes: null
    }
  },
  async created() {
    var data = {}
    data.year = this.year
    data.sem = this.sem
    Course.fetchAssessDetails(this.code, data).then((res) => {
      this.strComponents(res.component)
      this.indexes = res.indexes
    }).catch((e) => {
      console.log(e)
    })
  },
  methods: {
    strComponents(components) {
      var eq = 'Komponen ='
      for (const comp of components) {
        eq += ` ${comp.component} (${comp.percentage}) +`
      }
      this.components = eq.slice(0, eq.length - 2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
