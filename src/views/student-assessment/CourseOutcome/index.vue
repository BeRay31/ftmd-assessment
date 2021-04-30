<template>
  <div class="course-outcome">
    <div class="header">
      <h1>Indeks Prestasi</h1>
    </div>
    <div class="filter-container">
      <div class="filter__item">
        <el-select v-model="selectedTahunAjaran">
          <el-option
            v-for="(item, index) in listTahunAjaran"
            :key="index"
            :label="item.tahun_ajaran"
            :value="item.tahun_ajaran"
          />
        </el-select>
      </div>
      <div class="filter__item">
        <el-button
          :type="selectedSemester == 1 ? 'primary' : 'info'"
          class="btn"
          @click.prevent="selectedSemester = 1"
        >Ganjil</el-button>
        <el-button
          :type="selectedSemester == 2 ? 'primary' : 'info'"
          class="btn"
          @click.prevent="selectedSemester = 2"
        >Genap</el-button>
      </div>
    </div>
    <div class="content-container card">
      <table v-loading="loading">
        <tr>
          <th>No</th>
          <th>Mata Kuliah</th>
          <th>Indeks</th>
        </tr>
        <template v-if="listScore && listScore.length > 0">
          <tr v-for="(item, index) in listScore" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ `${item.code} ${item.name}` }}</td>
            <td>{{ item.index_char }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4">Belum Ada Mata Kuliah</td>
          </tr>
        </template>
        <template v-if="summary">
          <tr>
            <td colspan="3" class="title">Nilai Akhir</td>
            <td>{{ summary.na }}</td>
          </tr>
          <tr>
            <td colspan="3" class="title">Indeks Akhir</td>
            <td>{{ summary.index }}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import LOAssessment from '@/api/loAssessment'
import studentAssessment from '@/api/studentAssessment'

export default {
  name: 'CourseOutcome',
  data() {
    return {
      selectedTahunAjaran: '',
      listTahunAjaran: null,
      selectedSemester: 1,
      listScore: [],
      summary: null,
      loading: false
    }
  },
  watch: {
    async selectedSemester() {
      await this.getScoreList()
    },
    async selectedTahunAjaran() {
      await this.getScoreList()
    }
  },
  async mounted() {
    await this.getTahunAjaranList()
    if (this.listTahunAjaran.length > 0) {
      this.selectedTahunAjaran = this.listTahunAjaran[0]
    }
    await this.getScoreList()
  },
  methods: {
    async getTahunAjaranList() {
      try {
        const tahunAjaranList = await LOAssessment.fetchTahunAjaranList()
        this.listTahunAjaran = tahunAjaranList.data
      } catch (e) {
        console.error(e.stack)
      }
    },
    async getScoreList() {
      if (!this.loading) {
        this.loading = true
        try {
          const params = {
            id_user: this.$store.getters.id_user,
            semester: this.selectedSemester,
            tahun_ajaran: this.selectedTahunAjaran
          }
          const scoreList = await studentAssessment.getScore(params)
          this.listScore = scoreList.data
          this.summary = scoreList.summary
        } catch (e) {
          console.error(e.stack)
        }
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import './index.scss';
</style>
