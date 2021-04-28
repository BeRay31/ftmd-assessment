<template>
  <div class="course-container">
    <header>
      <h1>Tambah Komponen Nilai</h1>
    </header>
    <div class="content-container">
      <div class="form-card">
        <el-form>
          <h3 class="number-label">Nama Komponen</h3>
          <el-select v-model="formData.component">
            <el-option
              v-for="(item, idx) in options"
              :key="idx"
              :label="item.component"
              :value="item.component"
            />
          </el-select>
          <el-row>
            <el-col :span="6">
              <h3 class="number-label">Persentase Nilai Akhir</h3>
            </el-col>
            <el-col>
              <el-input-number v-model="formData.index_percentage" :min="0" :max="100" size="small" :step="10" />
            </el-col>
          </el-row>
          <h3 style="margin-bottom: 1rem;">Pembobotan LO</h3>
          <el-row v-for="(out, idx) in outcomes" :key="out">
            <el-col :span="6">
              <span class="number-label">{{ out }}</span>
            </el-col>
            <el-col :span="6">
              <el-input-number v-model="formData.percentage[idx]" :min="0" :max="100" size="small" :step="10" />
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
import { Message } from 'element-ui'
import DosenLoWeight from '@/api/dosen_lo_weight'

export default {
  name: 'Course',
  components: {
    SubmitModal
  },
  props: {
    idCourse: {
      type: Number,
      default: null
    },
    classDetails: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      outcomes: [
        'A - Penyelesaian Masalah',
        'B - Desain',
        'C - Komunikasi',
        'D - Etika Profesi',
        'E - Kerja Sama',
        'F - Eksperimen',
        'G - Belajar Sepanjang Hayat'
      ],
      modal: {
        state: false
      },
      learning_outcome: [],
      options: [1, 2, 3],
      formData: {
        id_course: null,
        index_percentage: 0,
        component: null,
        percentage: [0, 0, 0, 0, 0, 0, 0],
        semester: null,
        code: null,
        tahun_ajaran: null
      }
    }
  },
  async mounted() {
    this.id_course = this.idCourse
    this.formData.semester = this.classDetails.semester
    this.formData.code = this.classDetails.code
    this.formData.tahun_ajaran = this.classDetails.tahun_ajaran
    const components = await DosenLoWeight.fetchScoreComponents(this.id_course)
    this.options = components.data
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
        this.formData.component &&
        this.formData.percentage.reduce((a, b) => a + b, 0) === 100
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
              this.closeModal()
              this.$emit('update')
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
            message: 'Terjadi kesalahan dalam penambahan komponen',
            type: 'error',
            duration: 4 * 1000
          })
          this.closeModal()
        }
      } else {
        if (this.formData.percentage.reduce((a, b) => a + b, 0) !== 100) {
          Message({
            message: 'Total pembobotan harus 100 persen',
            type: 'error',
            duration: 4 * 1000
          })
        } else {
          Message({
            message: 'Mohon mengisi semua field',
            type: 'error',
            duration: 3 * 1000
          })
        }
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
