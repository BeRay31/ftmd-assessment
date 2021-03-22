<template>
  <div class="course-container">
    <header>
      <h1>Tambah Lo Component</h1>
    </header>
    <div class="content-container">
      <div class="form-card">
        <el-form>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.component">Komponen</MDInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.id_lo">Learning Outcome</MDInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.percentage">Persentase</MDInput>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login large"
          @click.prevent="openModal"
        >Tambah</el-button>
      </div>
    </div>
    <SubmitModal
      v-if="modal.state"
      :state="modal.state"
      @closeModal="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import SubmitModal from './SubmitModal/index'
import MDInput from '@/components/MDinput'
import { Message } from 'element-ui'
import DosenLoWeight from '@/api/dosen_lo_weight'

export default {
  name: 'Course',
  components: {
    MDInput,
    SubmitModal
  },
  data() {
    return {
      loading: false,
      modal: {
        state: false
      },
      formData: {
        id_course: null,
        id_lo: null,
        component: null,
        percentage: null
      }
    }
  },
  methods: {
    openModal() {
      this.modal.state = true
      this.formData.id_course = this.$route.params.id
    },
    closeModal() {
      this.modal.state = false
    },
    validateForm() {
      return (
        this.formData.id_lo &&
        this.formData.component &&
        this.formData.percentage
      )
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          DosenLoWeight.addComponent(this.formData).then((res) => {
            if (res.msg === 'New row created successfully!') {
              Message({
                message: 'Komponen telah ditambahkan',
                type: 'success',
                duration: 5 * 1000
              })
              this.$router.push({ name: 'LoComponentList' })
            } else {
              Message({
                message: 'Komponen gagal ditambahkan',
                type: 'error',
                duration: 5 * 1000
              })
              this.closeModal()
            }
          })
        } catch (e) {
          Message({
            message: e.stack,
            type: 'error',
            duration: 4 * 1000
          })
        }
      } else {
        Message({
          message: 'Mohon mengisi semua field',
          type: 'error',
          duration: 3 * 1000
        })
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
