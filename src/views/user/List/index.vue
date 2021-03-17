<template>
  <div class="user-list-container">
    <header>
      <h1>Daftar Pengguna</h1>
      <div class="search">
        <img src="@/assets/svg/search.svg" alt>
        <input v-model="searchQuery" type="text" class="card" placeholder="Cari Users">
      </div>
    </header>
    <div class="filter-container">
      <el-button
        :type="userTypeFilter == 'admin' ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setUserTypeFilter('admin')"
      >Admin</el-button>
      <el-button
        :type="userTypeFilter == 'lecturer' ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setUserTypeFilter('lecturer')"
      >Dosen</el-button>
      <el-button
        :type="userTypeFilter == 'student' ? 'primary' : 'info'"
        class="btn"
        @click.prevent="setUserTypeFilter('student')"
      >Mahasiswa</el-button>
    </div>
    <div class="content-container">
      <div v-loading="listLoading" class="card">
        <table>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Tipe user</th>
            <th>Aksi</th>
          </tr>
          <template v-if="userData && userData.length > 0">
            <tr v-for="user in userData" :key="user.id_user">
              <td>{{ user.id_user }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.user_type }}</td>
              <td class="action">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="goToEditUser(user)"
                >Edit</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  @click="openModal(user)"
                >Delete</el-button>
              </td>
            </tr>
          </template>
        </table>
        <template v-if="!userData || userData.length == 0">
          <tr>
            <h4 class="empty-state">No - Data</h4>
          </tr>
        </template>
        <Pagination
          :total-page="totalPage"
          :current-page="currentPage"
          @pageChange="updatePage"
        />
      </div>
    </div>
    <DeleteModal
      v-if="modal.state"
      :state="modal.state"
      :user-data="modal.carriedData"
      @closeModal="closeModal"
      @submit="deleteUser"
    />
  </div>
</template>

<script>
import { Message } from 'element-ui'

import Users from '@/api/users'
import Pagination from '@/components/Pagination/Pagination'
import DeleteModal from '../Modal/DeleteModal/index'

export default {
  name: 'UserList',
  components: {
    Pagination,
    DeleteModal
  },
  data() {
    return {
      userData: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      userTypeFilter: '',
      listLoading: false,
      modal: {
        state: false,
        carriedData: null
      }
    }
  },
  watch: {
    async searchQuery() {
      await this.getUserList()
    },
    async userTypeFilter() {
      await this.getUserList()
    }
  },
  async mounted() {
    await this.getUserList()
  },
  methods: {
    updatePage(index) {
      this.currentPage = index
      this.getUserList()
    },
    setUserTypeFilter(type) {
      if (type.includes(this.userTypeFilter)) {
        this.userTypeFilter = null
      } else {
        this.userTypeFilter = type
      }
    },
    async getUserList() {
      this.listLoading = true
      try {
        const params = {
          pageSize: 10,
          page: this.currentPage
        }
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        if (this.userTypeFilter) {
          params.userType = this.userTypeFilter
        }
        const userResp = await Users.getAllUser(params)
        this.userData = userResp.data
        this.totalPage = userResp.lastPage
      } catch (e) {
        console.error(e.stack)
      }
      this.listLoading = false
    },
    async deleteUser() {
      try {
        await Users.deleteUser(this.modal.carriedData.id_user)
        await this.getUserList()
        this.closeModal()
        Message({
          message: 'User berhasil dihapus',
          type: 'success',
          duration: 5 * 1000
        })
      } catch (e) {
        console.error(e)
      }
    },
    openModal(carriedData) {
      this.modal.carriedData = carriedData
      this.modal.state = true
    },
    closeModal() {
      this.modal.state = false
      this.modal.carriedData = null
    },
    goToEditUser(user) {
      this.$router.push({ name: 'updateUser', params: { id: user.id_user }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
