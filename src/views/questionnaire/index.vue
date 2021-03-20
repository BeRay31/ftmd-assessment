<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Perkuliahan</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <p>1. Saya memperoleh informasi yang cukup tentang hal-hal tertentu yang harus saya capai atau kuasai
          (luaran matakuliah) sesudah mengikuti matakuliah ini.</p>
        <RadioInput v-model="questionOne" />

        <p>2. Pelaksanaan perkuliahan diarahkan agar mahasiswa dapat mencapai atau menguasai luaran matakuliah ini.</p>
        <RadioInput v-model="questionTwo" />

        <p>3. Saya mencapai atau menguasai luaran matakuliah ini.</p>
        <RadioInput v-model="questionThree" />

        <p>4. Pelaksanaan perkuliahan terorganisir dengan baik.</p>
        <RadioInput v-model="questionFour" />

        <p>5. Dosen berkomunikasi dengan efektif.</p>
        <RadioInput v-model="questionFive" />

        <p>6. Dosen peduli terhadap pencapaian atau penguasaan mahasiswa akan luaran matakuliah ini.</p>
        <RadioInput v-model="questionSix" />

        <p>7. Dosen berlaku adil (fair) kepada mahasiswa.</p>
        <RadioInput v-model="questionSeven" />

        <p>8. Beban kerja untuk matakuliah ini sesuai dengan SKS-nya.</p>
        <RadioInput v-model="questionEight" />

        <p>9. Sarana dan prasarana untuk matakuliah tersedia dengan memadai.</p>
        <RadioInput v-model="questionNine" />

        <p>10. Tersedia cukup fasilitas pendukung di luar kuliah yang memungkinkan saya mengikuti matakuliah
          ini dengan baik</p>
        <RadioInput v-model="questionTen" />

        <p>11. Saya berusaha dengan sungguh-sungguh mengikuti matakuliah ini</p>
        <RadioInput v-model="questionEleven" />

        <p>12. Saya memperoleh pengalaman belajar yang positif dalam matakuliah ini</p>
        <RadioInput v-model="questionTwelve" />
      </div>
    </div>
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
      questionTwelve: null
    }
  }
}
</script>

<style scoped>
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
</style>
