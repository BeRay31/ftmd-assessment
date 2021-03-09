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
        </table>
        <Pagination 
          :total-page="totalPage"
          :current-page="currentPage"
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
      modal: {
        state: false,
        carriedData: null
      }
    }
  },
  watch: {
    async currentPage() {
      await this.getUserList()
    }
  },
  async mounted() {
    await this.getUserList()
  },
  methods: {
    async getUserList() {
      try {
        const params = {
          pageSize: 10,
          page: this.currentPage
        }
        const userResp = await Users.getAllUser(params)
        this.userData = userResp.data
        this.totalPage = userResp.lastPage
      } catch (e) {
        console.error(e.stack)
      }
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
