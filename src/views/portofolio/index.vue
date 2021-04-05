<template>
  <div class="portofolio-container">
    <header>
      <h1>Portofolio Perkuliahan</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr />
          <tr>
            <td class="left-align">Kehadiran Dosen (%)</td>
            <td>{{ dosenAttendance }} %</td>
          </tr>
          <tr>
            <td class="left-align">Kehadiran Mahasiswa (%)</td>
            <td>{{ studentAttendance }} %</td>
          </tr>
          <tr>
            <td class="left-align">Rata-rata Nilai Mahasiswa</td>
            <td>{{ average }}</td>
          </tr>
        </table>

        <el-button type="primary" icon="el-icon-document">Upload CSV</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dosenAttendance: 100,
      studentAttendance: 100,
      average: 4
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/table.scss";

  header h1 {
    font-weight: 600;
  }

  .portofolio-container {
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

  table tr:first-of-type {
      border-bottom: 0px;
  }
</style>
