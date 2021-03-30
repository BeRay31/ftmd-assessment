<template>
  <div class="questionnaire-result-container">
    <header>
      <h1>Hasil Kuisioner</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>No</th>
            <th>Pertanyaan</th>
            <th>Nilai (Skala 4)</th>
          </tr>
          <tr>
            <td>1</td>
            <td class="left-align">Saya memperoleh informasi yang cukup tentang hal-hal tertentu yang harus saya capai atau kuasai
              (luaran matakuliah) sesudah mengikuti matakuliah ini.</td>
            <td>{{ firstScore }}</td>
          </tr>
          <tr>
            <td>2</td>
            <td class="left-align">Pelaksanaan perkuliahan diarahkan agar mahasiswa dapat mencapai atau menguasai luaran matakuliah ini.</td>
            <td>{{ secondScore }}</td>
          </tr>
          <tr>
            <td>3</td>
            <td class="left-align">Saya mencapai atau menguasai luaran matakuliah ini.</td>
            <td>{{ thirdScore }}</td>
          </tr>
          <tr>
            <td>4</td>
            <td class="left-align">Pelaksanaan perkuliahan terorganisir dengan baik.</td>
            <td>{{ fourthScore }}</td>
          </tr>
          <tr>
            <td>5</td>
            <td class="left-align">Dosen berkomunikasi dengan efektif.</td>
            <td>{{ fifthScore }}</td>
          </tr>
          <tr>
            <td>6</td>
            <td class="left-align">Dosen peduli terhadap pencapaian atau penguasaan mahasiswa akan luaran matakuliah ini.</td>
            <td>{{ sixthScore }}</td>
          </tr>
          <tr>
            <td>7</td>
            <td class="left-align">Dosen berlaku adil (fair) kepada mahasiswa.</td>
            <td>{{ seventhScore }}</td>
          </tr>
          <tr>
            <td>8</td>
            <td class="left-align">Beban kerja untuk matakuliah ini sesuai dengan SKS-nya.</td>
            <td>{{ eighthScore }}</td>
          </tr>
          <tr>
            <td>9</td>
            <td class="left-align">Sarana dan prasarana untuk matakuliah tersedia dengan memadai.</td>
            <td>{{ ninthScore }}</td>
          </tr>
          <tr>
            <td>10</td>
            <td class="left-align">Tersedia cukup fasilitas pendukung di luar kuliah yang memungkinkan saya mengikuti matakuliah
              ini dengan baik.</td>
            <td>{{ tenthScore }}</td>
          </tr>
          <tr>
            <td>11</td>
            <td class="left-align">Saya berusaha dengan sungguh-sungguh mengikuti matakuliah ini.</td>
            <td>{{ eleventhScore }}</td>
          </tr>
          <tr>
            <td>12</td>
            <td class="left-align">Saya memperoleh pengalaman belajar yang positif dalam matakuliah ini.</td>
            <td>{{ twelfthScore }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstScore: 4.0,
      secondScore: 4.0,
      thirdScore: 4.0,
      fourthScore: 4.0,
      fifthScore: 4.0,
      sixthScore: 4.0,
      seventhScore: 4.0,
      eighthScore: 4.0,
      ninthScore: 4.0,
      tenthScore: 4.0,
      eleventhScore: 4.0,
      twelfthScore: 4.0
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
