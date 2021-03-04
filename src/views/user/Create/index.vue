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
              v-model="formData.user_id"
              :maxlength="100"
              required
              name="Nomor Identitas"
            >
              Nomor Identitas
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

export default {
  name: 'CreateUser',
  components: {
    MDInput
  },
  data() {
    return {
      formData: {
        name: null,
        username: null,
        user_id: null,
        email: null,
        password: null,
        user_type: null 
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
