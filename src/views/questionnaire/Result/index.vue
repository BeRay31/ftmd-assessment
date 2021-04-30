<template>
  <div class="questionnaire-result-container">
    <header>
      <h1>Hasil Kuisioner - {{ datas['id_course'] }}</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>No</th>
            <th>Pertanyaan</th>
            <th>Nilai (Skala 4)</th>
          </tr>
          <tr v-for="data in datas['answer_list']" :key="data['id']">
            <td>{{ data['id'] }}</td>
            <td class="left-align">{{ data["text"] }}</td>
            <td>{{ data['answer'] == null ? '-' : parseFloat(data['answer']).toFixed(2) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

import Questionnaire from '@/api/questionnaires'

export default {
  data() {
    return {
      datas: {
        'id_course': this.$route.params.id,
        'answer_list': [
          {
            'id': 1,
            'text': 'Saya memperoleh informasi yang cukup tentang hal-hal tertentu yang harus saya capai atau kuasai (luaran matakuliah) sesudah mengikuti matakuliah ini.',
            'answer': null
          },
          {
            'id': 2,
            'text': 'Pelaksanaan perkuliahan diarahkan agar mahasiswa dapat mencapai atau menguasai luaran matakuliah ini.',
            'answer': null
          },
          {
            'id': 3,
            'text': 'Saya mencapai atau menguasai luaran matakuliah ini.',
            'answer': null
          },
          {
            'id': 4,
            'text': 'Pelaksanaan perkuliahan terorganisir dengan baik.',
            'answer': null
          },
          {
            'id': 5,
            'text': 'Dosen berkomunikasi dengan efektif.',
            'answer': null
          },
          {
            'id': 6,
            'text': 'Dosen peduli terhadap pencapaian atau penguasaan mahasiswa akan luaran matakuliah ini.',
            'answer': null
          },
          {
            'id': 7,
            'text': 'Dosen berlaku adil (fair) kepada mahasiswa.',
            'answer': null
          },
          {
            'id': 8,
            'text': 'Beban kerja untuk matakuliah ini sesuai dengan SKS-nya.',
            'answer': null
          },
          {
            'id': 9,
            'text': 'Sarana dan prasarana untuk matakuliah tersedia dengan memadai.',
            'answer': null
          },
          {
            'id': 10,
            'text': 'Tersedia cukup fasilitas pendukung di luar kuliah yang memungkinkan saya mengikuti matakuliah ini dengan baik.',
            'answer': null
          },
          {
            'id': 11,
            'text': 'Saya berusaha dengan sungguh-sungguh mengikuti matakuliah ini.',
            'answer': null
          },
          {
            'id': 12,
            'text': 'Saya memperoleh pengalaman belajar yang positif dalam matakuliah ini.',
            'answer': null
          }
        ]
      }
    }
  },
  async mounted() {
    await this.viewCourseAnswer()
  },
  methods: {
    async viewCourseAnswer() {
      try {
        const answers = await Questionnaire.viewCourseAnswer(this.datas['id_course'])
        if (answers.value && answers.value.length > 0) {
          for (var i = 0; i < this.datas['answer_list'].length; i++) {
            this.datas.answer_list[i].answer = answers.value[i].avg
          }
        }
      } catch (e) {
        console.log(e.stack)
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

  .left-align {
      text-align: left;
  }
</style>
