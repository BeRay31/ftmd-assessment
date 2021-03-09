<template>
  <div class="create-user-container">
    <header>
      <h1 v-if="!id_user">Tambahkan Pengguna</h1>
      <h1 v-else>Update Data Pengguna</h1>
    </header>
    <div class="content-contaienr">
      <div class="form-card">
        <el-form>
          <el-form-item v-if="id_user">
            <MDInput
              v-model="id_user"
              :maxlength="100"
              readonly
            >
              Id Pengguna
            </MDInput>
          </el-form-item>
          <el-form-item>
            <MDInput
              v-model="formData.name"
              :maxlength="100"
              required
              name="Nama Lengkap"
            >
              Nama Lengkap
            </MDInput>
          </el-form-item>
          <el-form-item>
            <MDInput
              v-model="formData.username" 
              :maxlength="100"
              required
              
              name="Username"
            >
              Username
            </MDInput>
          </el-form-item>
          <el-form-item>
            <MDInput
              v-model="formData.email" 
              :maxlength="100"
              required
              type="email"
              name="Email"
            >
              Email
            </MDInput>
          </el-form-item>
          <el-form-item>
            <MDInput
              v-model="formData.password" 
              :maxlength="100"
              required
              name="Password"
              type="password"
            >
              Password
            </MDInput>
          </el-form-item>
          <el-form-item label="Tipe User">
            <el-radio-group v-model="formData.user_type">
              <el-radio label="admin">Admin</el-radio>
              <el-radio label="lecturer">Lecturer</el-radio>
              <el-radio label="student">Student</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="openModal"
        >Tambahkan</el-button>
      </div>
    </div>
    <ConfirmModal 
      v-if="modal.state"
      :state="modal.state"
      :title="modalTitle"
      :user-data="modal.carriedData"
      @closeModal="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MDInput from '@/components/MDinput'
import Users from '@/api/users'
import { Message } from 'element-ui'
import ConfirmModal from '../Modal/SubmitModal'

export default {
  name: 'CreateUser',
  components: {
    MDInput,
    ConfirmModal
  },
  data() {
    return {
      loading: false,
      id_user: null,
      formData: {
        name: null,
        username: null,
        email: null,
        password: null,
        user_type: null 
      },
      modal: {
        state: false,
        carriedData: null
      }
    }
  },
  computed: {
    modalTitle() {
      if (this.id_user) {
        return `Apakah anda yakin untuk mengubah properti dari user dengan id ${this.id_user} ?`
      } else {
        return `Apakah anda yakin untuk menambahkan user ?`
      }
    }
  },
  async mounted() {
    this.id_user = this.$route.params.id
    if (this.id_user) {
      const respUser = await Users.getById(this.id_user)
      delete respUser.data.token
      respUser.data.name = respUser.data.name.trim()
      respUser.data.password = respUser.data.password.trim()
      respUser.data.username = respUser.data.username.trim()
      respUser.data.user_type = respUser.data.user_type.trim()
      this.formData = { ...respUser.data }
    }
  },
  methods: {
    closeModal() {
      this.modal.state = false
      this.modal.carriedData = null
    },
    openModal() {
      this.modal.state = true
      this.modal.carriedData = this.formData
    },
    validateForm() {
      return (
        this.formData.name &&
        this.formData.username &&
        this.formData.email && 
        this.formData.password &&
        this.formData.user_type
      )
    },
    async handleSubmit() {
      if (this.validateForm()) {
        this.loading = true
        try {
          let message
          if (this.id_user) {
            await Users.updateUser(this.id_user, this.formData)
            message = 'User berhasil diupdate'
          } else {
            await Users.createUser(this.formData)
            message = 'User baru ditambahkan'
          }
          Message({
            message: message,
            type: 'success',
            duration: 5 * 1000
          })
          this.$router.push({ name: 'UserList' })
        } catch (e) {
          Message({
            message: e.stack || 'Error While Submitting form could be duplicate credentials',
            type: 'error',
            duration: 5 * 1000
          })
        }
        this.loading = false
        if (!this.id_user) {
          this.formData = {
            name: null,
            username: null,
            email: null,
            password: null,
            user_type: null 
          }
        }
      } else {
        Message({
          message: 'Form tidak Valid',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
