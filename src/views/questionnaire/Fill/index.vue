<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Perkuliahan</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <div v-for="data in datas['answer_list']" :key="data['id']" :class="{ 'odd': data['id'] % 2 != 0 }">
          <p>{{ data["id"] }}. {{ data["text"] }}</p>
          <RadioInput v-model="data['answer']" />
        </div>
        <div class="submitBtn">
          <button @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
    <div v-if="submitted">
      <p>questionOne : {{ datas["answer_list"][0]["answer"] }}</p>
      <p>questionTwo : {{ datas["answer_list"][1]["answer"] }}</p>
      <p>questionThree : {{ datas["answer_list"][2]["answer"] }}</p>
      <p>questionFour : {{ datas["answer_list"][3]["answer"] }}</p>
      <p>questionFive : {{ datas["answer_list"][4]["answer"] }}</p>
      <p>questionSix : {{ datas["answer_list"][5]["answer"] }}</p>
      <p>questionSeven : {{ datas["answer_list"][6]["answer"] }}</p>
      <p>questionEight : {{ datas["answer_list"][7]["answer"] }}</p>
      <p>questionNine : {{ datas["answer_list"][8]["answer"] }}</p>
      <p>questionTen : {{ datas["answer_list"][9]["answer"] }}</p>
      <p>questionEleven : {{ datas["answer_list"][10]["answer"] }}</p>
      <p>questionTwelve : {{ datas["answer_list"][11]["answer"] }}</p>
    </div>
  </div>
</template>

<script>
import RadioInput from './components/RadioInput.vue'

export default {
  components: { RadioInput },
  data() {
    return {
      datas: {
        'id_course': 1,
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
      },
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = !this.submitted
    }
  }
}
</script>

<style lang="scss" scoped>

header h1 {
  font-weight: 600;
}

.questionnaire-container {
  padding: 1rem 2rem;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.content-container .card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  border-radius: 16px;
  padding: 1rem 2rem;
}

.card p {
  margin-left: 12px;
}

.submitBtn {
  padding-top: 40px;
  margin: auto;
  width: 10%;

  button {
    background-color: #2196f3;
    padding: 0.75rem 0.75rem;
    text-align: center;

    &:hover {
      background-color: lighten($color: #2196f3, $amount: 10);
    }
  }
}

.odd {
  background-color: #FAFAFA;
}
</style>
