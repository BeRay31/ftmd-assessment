<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Perkuliahan - {{ datas['id_course'] }}</h1>
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
      <p>questionOne : {{ datas["answer_list"][0]["answer"] }}</p>
      <p>questionTwo : {{ datas["answer_list"][1]["answer"] }}</p>
      <p>questionThree : {{ datas["answer_list"][2]["answer"] }}</p>
      <p>questionFour : {{ datas["answer_list"][3]["answer"] }}</p>
      <p>questionFive : {{ datas["answer_list"][4]["answer"] }}</p>
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
        'id_course': this.$route.params.id,
        'answer_list': [
          {
            'id': 1,
            'text': 'Kontribusi',
            'answer': null
          },
          {
            'id': 2,
            'text': 'Pemecahan Masalah',
            'answer': null
          },
          {
            'id': 3,
            'text': 'Sikap',
            'answer': null
          },
          {
            'id': 4,
            'text': 'Fokus terhadap tugas',
            'answer': null
          },
          {
            'id': 5,
            'text': 'Bekerja dengan orang lain',
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
