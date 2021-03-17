<template>
  <div class="course-container">
    <header>
      <h1>Tambah Mata Kuliah</h1>
    </header>
    <div class="content-container">
      <div class="form-card">
        <el-form>
          <el-form-item>
            <MDInput v-model="formData.name">Mata Kuliah</MDInput>
          </el-form-item>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.class" type="number">Kelas</MDInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.semester" type="number">Semester</MDInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.year" type="number">Tahun Ajaran</MDInput>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button
            type="primary"
            class="btn btn-primary btn-login"
            @click.prevent="openModal"
          >Pilih Dosen</el-button>
        </el-form>
        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
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
import Course from '@/api/courses'

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
        name: null,
        class: null,
        semester: null,
        id_lecturer: null,
        year: null
      }
    }
  },
  methods: {
    openModal() {
      this.modal.state = true
    },
    closeModal() {
      this.modal.state = false
    },
    validateForm() {
      return (
        this.formData.code &&
        this.formData.name &&
        this.formData.class &&
        this.formData.semester &&
        this.formData.lecturer_name
      )
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          Course.createCourse(this.formData).then((res) => {
            if (res.msg === 'OK') {
              Message({
                message: 'Mata kuliah berhasil didaftarkan',
                type: 'success',
                duration: 5 * 1000
              })
              this.$router.push({ name: 'CourseList' })
            } else {
              Message({
                message: 'Mata kuliah gagal didaftarkan',
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
