<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Fakultas Teknik Mesin dan Dirgantara</h3>
      </div>

      <el-form-item label="Username">
        <div class="relative-pos">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
          <div :class="['warning', showWarning ? 'active' : '']">
            username or password is invalid
          </div>
        </div>
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item label="Password">
          <div class="relative-pos">
            <div class="relative-pos">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </div>
            <div :class="['warning', showWarning ? 'active' : '']">
              username or password is invalid
            </div>
          </div>
        </el-form-item>
      </el-tooltip>
      <el-button
        :loading="loading"
        type="primary"
        class="btn btn-primary btn-login"
        @click.native.prevent="handleLogin"
      >Login</el-button>
      <router-link to="/forgot-password" tag="div" class="forgot-password">Lupa Password</router-link>
    </el-form>
  </div>
</template>

<script>
import Authorization from '@/api/authorization'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      console.log("VALIDATE")
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 0) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      showWarning: false,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          await this.handleLoginValidInput()
        } else {
          this.showWarning = true
        }
      })
    },
    async handleLoginValidInput() {
      this.loading = true
      this.showWarning = false
      try {
        const respAuth = await Authorization.authByUsername(this.loginForm)
        localStorage.setItem('username', this.loginForm.username)
        const loginData = {
          id_user: respAuth.data.id_user,
          token: respAuth.data.token,
          username: this.loginForm.username,
          user_type: respAuth.data.user_type
        }
        await this.$store.dispatch('user/login', loginData)
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        this.loading = false
      } catch (e) {
        this.handleLoginError(e)
      }
      this.loading = false
    },
    handleLoginError(error) {
      const errorStatus = error.response.status
      if (errorStatus >= 500 || errorStatus === 422) {
        this.showWarning = true
      }
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #f4f9f9;
$bg-form: #a4ebf3;
$dark_gray: #889aa4;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background: white;
    border-radius: 2rem;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 4rem;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: black;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 2rem;
      color: rgba(33,150,243,255);
      margin: 0px auto 2rem auto;
      font-weight: bold;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 50%;
    // transform: translateY(-50%);
    font-size: 16px;
    color: black;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .btn-login {
    margin-top: 2rem;
    width: 10rem;
  }

  .forgot-password {
    margin-top: 0.5rem;
    color: rgba(33,150,243,255);
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: darken($color: rgba(33,150,243,255), $amount: 20);
    }
  }

  .warning {
    background: rgba(255, 255, 255, 0.65);
    color: #ff0000;
    font-size: 0.8rem;
    text-align: left;
    padding: 0.25rem;
    line-height: initial;
    position: absolute;
    width: 100%;
    left: 0;
    top: 75%;
    z-index: -1;
    opacity: 0;
    // display: none;
    transition: all 0.3s ease;

    &.active {
      z-index: 10;
      opacity: 1;
      top: 100%;
      // display: block;
    }
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
