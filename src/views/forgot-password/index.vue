<template>
  <div class="forgot-password-container">
    <el-form class="login-form" @submit.prevent>
      <div class="title-container">
        <h3 class="title">Fakultas Teknik Mesin dan Dirgantara</h3>
      </div>

      <template v-if="!isEmailSent">
        <div class="text-container">
          <span>Silahkan masukkan email yang terdaftar di akun anda untuk mendapatkan kode verifikasi !</span>
        </div>

        <el-form-item label="Email">
          <div class="relative-pos">
            <el-input
              v-model="email"
              placeholder="Email"
              type="text"
              tabindex="1"
              autocomplete="off"
              @keydown.enter.prevent.native="handleSendEmail"
            />
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="handleSendEmail"
        >Kirim Email</el-button>
      </template>

      <template v-if="isEmailSent && !isVerified">
        <div class="text-container">
          <span>Silahkan masukkan kode verifikasi yang terkirim di email anda !</span>
        </div>

        <el-form-item label="Kode Verifikasi">
          <div class="relative-pos">
            <el-input
              ref="verification"
              v-model="verificationCode"
              placeholder="Kode Verifikasi"
              name="verification"
              type="text"
              tabindex="1"
              autocomplete="off"
              @keydown.enter.prevent.native="handleVerify"
            />
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="handleVerify"
        >Verifikasi Kode</el-button>
      </template>

      <template v-if="isEmailSent && isVerified">
        <div class="text-container">
          <span>Silahkan masukkan password baru anda !</span>
        </div>

        <el-form-item label="Password Baru">
          <div class="relative-pos">
            <div class="relative-pos">
              <el-input
                :key="passType.new"
                ref="newPassword"
                v-model="passwordForm.new"
                :type="passType.new"
                placeholder="Password Baru"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keydown.enter.prevent.native="handleNewPassword"
              />
              <span class="show-pwd" @click="toggleShow('new')">
                <svg-icon
                  :icon-class="passType.new === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="Konfirmasi Password">
          <div class="relative-pos">
            <div class="relative-pos">
              <el-input
                :key="passType.confirm"
                ref="password"
                v-model="passwordForm.confirm"
                :type="passType.confirm"
                placeholder="Konfirmasi Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keydown.enter.prevent.native="handleNewPassword"
              />
              <span class="show-pwd" @click="toggleShow('confirm')">
                <svg-icon
                  :icon-class="passType.confirm === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </div>
          </div>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="handleNewPassword"
        >Verifikasi Kode</el-button>
      </template>

      <router-link to="/login" tag="div" class="forgot-password">Masuk</router-link>
    </el-form>
  </div>
</template>

<script>
import Authorization from '@/api/authorization'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      verificationCode: '',
      isEmailSent: false,
      isVerified: false,
      passwordForm: {
        new: '',
        confirm: ''
      },
      passType: {
        new: 'password',
        confirm: 'password'
      },
      loading: false
    }
  },
  methods: {
    handleSendEmail() {
      const isValid = this.validateEmail(this.email)
      if (isValid) {
        this.$message({
          message: 'Email valid',
          type: 'success'
        })
        this.isEmailSent = true
      } else {
        this.$message({
          message: 'Email tidak valid',
          type: 'error'
        })
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    handleVerify() {
      const isValid = this.validateCode(this.verificationCode)
      if (isValid) {
        this.$message({
          message: 'Kode valid',
          type: 'success'
        })
        this.isVerified = true
      } else {
        this.$message({
          message: 'Kode tidak valid',
          type: 'error'
        })
      }
    },
    validateCode(code) {
      return code.length > 10
    },
    handleNewPassword() {
      const isValid = this.validateNewPassword(this.passwordForm.new, this.passwordForm.confirm)
      if (isValid) {
        this.$message({
          message: 'Password diubah',
          type: 'success'
        })
      } else {
        this.$message({
          message: 'Password Tidak Sama',
          type: 'error'
        })
      }
    },
    validateNewPassword(newPass, confirm) {
      return newPass.length > 6 && confirm.includes(newPass) && newPass.includes(confirm)
    },
    toggleShow(ctx) {
      if (this.passType[ctx] === 'password') {
        this.passType[ctx] = ''
      } else {
        this.passType[ctx] = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
