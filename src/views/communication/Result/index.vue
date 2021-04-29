<template>
  <div class="questionnaire-result-container">
    <header>
      <h1>Hasil Kuisioner Komunikasi- {{ this.$route.params.id }}</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nilai</th>
            <th>Jumlah Penilai</th>
          </tr>
          <template v-if="!scores || scores.length == 0">
            <tr>
              <th colspan="4"><h4 class="empty-state">No - Data</h4></th>
            </tr>
          </template>
          <template v-else>
            <tr v-for="data in scores" :key="data['id']">
              <td>{{ data['id'] }}</td>
              <td>{{ data["username"] }}</td>
              <td>{{ data['communication_indexes'].toFixed(2) }}</td>
              <td>{{ data['count_communication'] }}</td>
            </tr>
            <tr>
              <th class="right-align" colspan="2">Rata-rata</th>
              <td>{{ mean }}</td>
              <td>{{ count }}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

import Softskill from '@/api/softskill'

export default {
  data() {
    return {
      scores: [],
      mean: 0,
      count: 0
    }
  },
  async mounted() {
    await this.viewCourseAnswer()
  },
  methods: {
    async viewCourseAnswer() {
      try {
        const answers = await Softskill.viewCourseAnswer(this.$route.params.id);
        this.scores = answers.value;
        this.mean = answers.meanC;
        this.count = answers.countC;
      } catch (e) {
        Message({
          message: e.stack || 'Error while reading scores',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/table.scss";

  header h1 {
    font-weight: 600;
  }

.questionnaire-result-container {
  padding: 1rem 2rem;
}

  .content-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
    border-radius: 16px;
    padding: 1rem 2rem;
  }

  .right-align {
      text-align: right;
  }

  .empty-state{
    text-align: center;
  }
</style>
