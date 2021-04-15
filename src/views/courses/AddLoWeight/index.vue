<template>
  <div class="course-container">
    <header>
      <h1>Tambah Lo Component</h1>
    </header>
    <div class="content-container">
      <div class="form-card">
        <el-form>
          <el-row :gutter="30">
            <el-row :span="6">
              <el-form-item>
                <MDInput v-model="formData.component">Komponen</MDInput>
              </el-form-item>
            </el-row>
            <el-row :span="6">
              <el-form-item>
                <el-select v-model="formData.id_lo" placeholder="Learning Outcome">
                  <el-option value="A"> A - Penyelesaian Masalah</el-option>
                  <el-option value="B"> B - Desain</el-option>
                  <el-option value="C"> C - Komunikasi</el-option>
                  <el-option value="D"> D - Etika Profesi</el-option>
                  <el-option value="E"> E - Kerja Sama</el-option>
                  <el-option value="F"> F - Eksperimen</el-option>
                  <el-option value="G"> G - Belajar Sepanjang Hayat</el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row :span="6">
              <el-form-item>
                <MDInput v-model="formData.percentage" type="number" min="0" max="100">Persentase</MDInput>
              </el-form-item>
            </el-row>
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
      learning_outcome: [],
      formData: {
        id_course: null,
        id_lo: null,
        component: null,
        percentage: null
      }
    }
  },
  watch: {
    async currentPage() {
      await this.fetchComponents()
    }
  },
  async mounted() {
    await this.fetchComponents()
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
    async fetchComponents() {
      try {
        const fetched = await DosenLoWeight.getLO(this.$route.params.id)
        this.learning_outcome = fetched.data
      } catch (e) {
        console.error(e.stack)
      }
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          this.formData.id_lo = this.formData.id_lo.charCodeAt(0) - 64
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
