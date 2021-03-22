<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Perkuliahan</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <div class="odd">
          <p>1. Saya memperoleh informasi yang cukup tentang hal-hal tertentu yang harus saya capai atau kuasai
            (luaran matakuliah) sesudah mengikuti matakuliah ini.</p>
          <RadioInput v-model="questionOne" />
        </div>

        <p>2. Pelaksanaan perkuliahan diarahkan agar mahasiswa dapat mencapai atau menguasai luaran matakuliah ini.</p>
        <RadioInput v-model="questionTwo" />

        <div class="odd">
          <p>3. Saya mencapai atau menguasai luaran matakuliah ini.</p>
          <RadioInput v-model="questionThree" />
        </div>

        <p>4. Pelaksanaan perkuliahan terorganisir dengan baik.</p>
        <RadioInput v-model="questionFour" />

        <div class="odd">
          <p>5. Dosen berkomunikasi dengan efektif.</p>
          <RadioInput v-model="questionFive" />
        </div>

        <p>6. Dosen peduli terhadap pencapaian atau penguasaan mahasiswa akan luaran matakuliah ini.</p>
        <RadioInput v-model="questionSix" />

        <div class="odd">
          <p>7. Dosen berlaku adil (fair) kepada mahasiswa.</p>
          <RadioInput v-model="questionSeven" />
        </div>

        <p>8. Beban kerja untuk matakuliah ini sesuai dengan SKS-nya.</p>
        <RadioInput v-model="questionEight" />

        <div class="odd">
          <p>9. Sarana dan prasarana untuk matakuliah tersedia dengan memadai.</p>
          <RadioInput v-model="questionNine" />
        </div>

        <p>10. Tersedia cukup fasilitas pendukung di luar kuliah yang memungkinkan saya mengikuti matakuliah
          ini dengan baik.</p>
        <RadioInput v-model="questionTen" />

        <div class="odd">
          <p>11. Saya berusaha dengan sungguh-sungguh mengikuti matakuliah ini.</p>
          <RadioInput v-model="questionEleven" />
        </div>

        <p>12. Saya memperoleh pengalaman belajar yang positif dalam matakuliah ini.</p>
        <RadioInput v-model="questionTwelve" />

        <div class="submitBtn">
          <button @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
    <div v-if="submitted">
      <p>questionOne : {{ questionOne }}</p>
      <p>questionTwo : {{ questionTwo }}</p>
      <p>questionThree : {{ questionThree }}</p>
      <p>questionFour : {{ questionFour }}</p>
      <p>questionFive : {{ questionFive }}</p>
      <p>questionSix : {{ questionSix }}</p>
      <p>questionSeven : {{ questionSeven }}</p>
      <p>questionEight : {{ questionEight }}</p>
      <p>questionNine : {{ questionNine }}</p>
      <p>questionTen : {{ questionTen }}</p>
      <p>questionEleven : {{ questionEleven }}</p>
      <p>questionTwelve : {{ questionTwelve }}</p>
    </div>
  </div>
</template>

<script>
import RadioInput from './components/RadioInput.vue'

export default {
  components: { RadioInput },
  data() {
    return {
      questionOne: null,
      questionTwo: null,
      questionThree: null,
      questionFour: null,
      questionFive: null,
      questionSix: null,
      questionSeven: null,
      questionEight: null,
      questionNine: null,
      questionTen: null,
      questionEleven: null,
      questionTwelve: null,
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
