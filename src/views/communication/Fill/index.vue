<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Komunikasi - {{ datas['id_course'] }}</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <p>Nama Lengkap : </p>
        <input v-model="datas.name" placeholder="Nama Lengkap">
        <p>NIM : </p>
        <input v-model="datas.nim" placeholder="NIM">
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
      <p>Nama Lengkap : {{ datas["name"] }} </p>
      <p>NIM : {{ datas["nim"] }} </p>
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
        'name': null,
        'nim': null,
        'id_course': this.$route.params.id,
        'answer_list': [
          {
            'id': 1,
            'text': 'Cara penyampaian informasi (1)',
            'answer': null
          },
          {
            'id': 2,
            'text': 'Cara penyampaian informasi (2)',
            'answer': null
          },
          {
            'id': 3,
            'text': 'Cara penyampaian informasi (3)',
            'answer': null
          },
          {
            'id': 4,
            'text': 'Cara penyampaian informasi (4)',
            'answer': null
          },
          {
            'id': 5,
            'text': 'Konten informasi yang disampaikan',
            'answer': null
          },
          {
            'id': 6,
            'text': 'Bahasa yang digunakan dalam penyampaian informasi',
            'answer': null
          },
          {
            'id': 7,
            'text': 'Penguasaan materi',
            'answer': null
          },
          {
            'id': 8,
            'text': 'Menjawab pertanyaan',
            'answer': null
          },
          {
            'id': 9,
            'text': 'Penggunaan media pendukung',
            'answer': null
          },
          {
            'id': 10,
            'text': 'Menggunakan waktu dengan efektif dan efisien',
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

input {
  width: 50%;
  margin-left: 15px;
}
</style>
