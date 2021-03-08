<template>
  <div class="create-user-container">
    <header>
      <h1>Tambahkan Pengguna</h1>
    </header>
    <div class="content-contaienr">
      <div class="form-card">
        <el-form>
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
          @click.prevent="handleSubmit"
        >Tambahkan</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MDInput from '@/components/MDinput'
import Users from '@/api/users'
import { Message } from 'element-ui' 

export default {
  name: 'CreateUser',
  components: {
    MDInput
  },
  data() {
    return {
      loading: false,
      formData: {
        name: null,
        username: null,
        email: null,
        password: null,
        user_type: null 
      }
    }
  },
  methods: {
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
          const respCreate = await Users.createUser(this.formData)
          Message({
            message: 'User baru ditambahkan',
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
        this.formData = {
          name: null,
          username: null,
          email: null,
          password: null,
          user_type: null 
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
