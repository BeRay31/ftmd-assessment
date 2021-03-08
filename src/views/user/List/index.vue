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
            <th>Username</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Tipe user</th>
            <th>Aksi</th>
          </tr>
          <tr v-for="user in userData" :key="user.id_user">
            <td>{{ user.id_user }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.user_type }}</td>
            <td class="action">
              <el-button type="primary" icon="el-icon-edit">Edit</el-button>
              <el-button type="primary" icon="el-icon-delete">Delete</el-button>
            </td>
          </tr>
        </table>
        <Pagination 
          :totalPage="totalPage"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Users from '@/api/users'
import Pagination from '@/components/Pagination/Pagination'

export default {
  name: 'UserList',
  components: {
    Pagination
  },
  async mounted() {
    await this.getUserList();
  },
  watch: {
    async currentPage() {
      await this.getUserList();
    }
  },
  data() {
    return {
      userData: [],
      currentPage: 1,
      totalPage: null
    }
  },
  methods: {
    async getUserList() {
      const params = {
        pageSize: 10,
        page: this.currentPage
      }
      const userResp = await Users.getAllUser(params)
      this.userData = userResp.data
      this.totalPage = userResp.lastPage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
