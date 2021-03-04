<template>
  <div class="user-list-container">
    <header>
      <h1>Daftar Pengguna</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>Id</th>
            <th>Nomor Identitas</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
          <tr>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td>asd</td>
            <td class="action">
              <el-button type="primary" icon="el-icon-edit">Edit</el-button>
              <el-button type="primary" icon="el-icon-delete">Delete</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userData: []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
