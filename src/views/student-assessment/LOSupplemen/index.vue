<template>
  <div class="lo-supplement">
    <div class="header">
      <h1>LO Supplemen</h1>
    </div>
    <div class="filter-container">
      <div class="filter__item">
        <el-select v-model="selectedTahunAjaran">
          <el-option
            v-for="(item, index) in listTahunAjaran"
            :key="index"
            :label="item.tahun_ajaran"
            :value="item.tahun_ajaran"
          >
          </el-option>
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
          <tr class="header">
            <th rowspan="2">NO</th>
            <th rowspan="2">Mata Kuliah</th>
            <th rowspan="1" colspan="7">Learning Outcome</th>
          </tr>
          <tr class="header">
            <el-tooltip class="item" effect="dark" content="Penyelesaian Masalah" placement="top">
              <th>
                <div>LO A</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Desain" placement="top">
              <th>
                <div>LO B</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Komunikasi" placement="top">
              <th>
                <div>LO C</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Etika Profesi" placement="top">
              <th>
                <div>LO D</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Kerja Sama" placement="top">
              <th>
                <div>LO E</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eksperimen" placement="top">
              <th>
                <div>LO F</div>
              </th>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Belajar Sepanjang Hayat" placement="top">
              <th>
                <div>LO G</div>
              </th>
            </el-tooltip>
          </tr>
          <template v-if="supplementData && supplementData.length > 0">
            <tr v-for="(course, index) in supplementData" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ course.name }}</td>
              <el-tooltip class="item" effect="dark" :content="(course[i] && course[i].tag) || '-'" placement="top" v-for="i in 7" :key="i+'supplement'">
                <td>{{ (course[i] && course[i].index_lo) || '-' }}</td>
              </el-tooltip>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="9">Belum ada data supplemen</td>
            </tr>
          </template>
          <template v-if="summarySupplementData">
            <tr>
              <td colspan="2" class="title">Hasil Akhir</td>
              <td v-for="i in 7" :key="i + 'summary'">{{ (summarySupplementData[i] && summarySupplementData[i].totalScore/summarySupplementData[i].totalWeight) || '-'  }}</td>
            </tr>
          </template>
      </table>
    </div>
  </div>
</template>

<script>
import LOAssessment from '@/api/loAssessment'
import studentAssessment from '@/api/studentAssessment';

export default {
  name: "LoSupplement",
  data() {
    return {
      selectedTahunAjaran: '',
      listTahunAjaran: null,
      selectedSemester: 1,
      supplementData: [],
      summarySupplementData: null,
      loading: false
    }
  },
  async mounted() {
    await this.getTahunAjaranList();
    if (this.listTahunAjaran.length > 0) {
      this.selectedTahunAjaran = this.listTahunAjaran[0];
    }
    await this.getLoSupplement();
  },
  watch: {
    async selectedSemester() {
      await this.getLoSupplement();
    },
    async selectedTahunAjaran() {
      await this.getLoSupplement();
    }
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
    async getLoSupplement() {
      if (!this.loading) {
        this.loading = true;
        try {
          const params = {
            id_user: this.$store.getters.id_user,
            semester: this.selectedSemester,
            tahun_ajaran: this.selectedTahunAjaran
          }
          const respSupplement = await studentAssessment.getSupplement(params);
          this.supplementData = respSupplement.data;
          this.summarySupplementData = respSupplement.summary;
          console.log(this.supplementData, this.summarySupplementData)
        } catch (e) {
          console.error(e.stack);
        }
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import './index.scss';
</style>
