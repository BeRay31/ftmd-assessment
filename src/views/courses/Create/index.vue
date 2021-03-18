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
                <MDInput v-model="formData.class" type="number" min="1">Kelas</MDInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.year" type="text">Tahun Ajaran</MDInput>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="input-container">
            <div class="label">
              Semester :
            </div>
            <el-button
              :type="formData.semester == 1 ? 'primary' : 'info'"
              class="btn"
              @click.prevent="formData.semester = 1"
            >Ganjil</el-button>
            <el-button
              :type="formData.semester == 2 ? 'primary' : 'info'"
              class="btn"
              @click.prevent="formData.semester = 2"
            >Genap</el-button>
          </div>
          <div class="input-container">
            <div class="label">
              Dosen :
            </div>
            <template v-if="!lecturerData">
              <el-button
                type="primary"
                class="btn btn-primary btn-login"
                @click.prevent="openModal('selectLecturer')"
              >Pilih Dosen</el-button>
            </template>
            <template v-else>
              <span class="lecturer-name">{{ lecturerData.name }}</span>
              <el-button
                type="primary"
                class="btn btn-primary btn-login"
                @click.prevent="openModal('selectLecturer')"
              >Ganti Dosen</el-button>
            </template>
          </div>
        </el-form>
        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="openModal('submitConfirmation')"
        >{{ id_course ? 'Ubah' : 'Tambah' }}</el-button>
      </div>
    </div>
    <SubmitModal
      v-if="isModalOpen('submitConfirmation')"
      :state="isModalOpen('submitConfirmation')"
      :title="id_course? `Ubah properti Mata Kuliah ${formData.name} ?` : null"
      :content="id_course? `Data yang diganti akan di simpan kedalam sistem` : null"
      @closeModal="closeModal"
      @submit="handleSubmit"
    />
    <ChooseLecturer
      v-if="isModalOpen('selectLecturer')"
      :state="isModalOpen('selectLecturer')"
      :prev-selected-lecturer="lecturerData"
      @closeModal="closeModal"
      @submit="handleSubmitLecturer"
    />
  </div>
</template>

<script>
import SubmitModal from '../Modal/SubmitModal/index'
import ChooseLecturer from '../Modal/ChooseLecturerModal/index'
import MDInput from '@/components/MDinput'
import { Message } from 'element-ui'
import Course from '@/api/courses'
import Users from '@/api/users'

export default {
  name: 'Course',
  components: {
    MDInput,
    SubmitModal,
    ChooseLecturer
  },
  data() {
    return {
      loading: false,
      id_course: null,
      modal: {
        state: false,
        type: '',
        carriedData: null
      },
      formData: {
        name: null,
        class: null,
        semester: null,
        id_lecturer: null,
        year: null
      },
      lecturerData: null
    }
  },
  async mounted() {
    this.id_course = this.$route.params.id
    if (this.id_course) {
      const respCourse = await Course.getById(this.id_course)
      this.formData.name = respCourse.data.name
      this.formData.semester = respCourse.data.semester
      this.formData.year = respCourse.data.tahun_ajaran
      this.formData.class = respCourse.data.class + ''
      this.formData.id_lecturer = respCourse.data.id_lecturer
      const respUser = await Users.getById(this.formData.id_lecturer)
      this.lecturerData = respUser.data
    }
  },
  methods: {
    openModal(type) {
      this.modal.state = true
      this.modal.type = type
    },
    isModalOpen(type) {
      return this.modal.state && this.modal.type === type
    },
    closeModal() {
      this.modal.state = false
      this.modal.carriedData = null
    },
    handleSubmitLecturer(eventData) {
      this.lecturerData = eventData
      this.formData.id_lecturer = eventData.id_user
      this.closeModal()
    },
    validateForm() {
      let messageObject
      let state = true
      if (!this.formData.name) {
        messageObject = {
          message: 'Nama Mata Kuliah tidak boleh kosong',
          type: 'error',
          duration: 5 * 1000
        }
        state = false
      }
      if (!this.formData.class) {
        messageObject = {
          message: 'Kelas tidak boleh kosong',
          type: 'error',
          duration: 5 * 1000
        }
        state = false
      } else {
        if (this.formData.class < 0) {
          messageObject = {
            message: 'Kelas tidak boleh <= 0',
            type: 'error',
            duration: 5 * 1000
          }
          state = false
        }
      }
      if (!this.formData.semester) {
        messageObject = {
          message: 'Semester tidak boleh kosong',
          type: 'error',
          duration: 5 * 1000
        }
        state = false
      }
      if (!this.formData.year) {
        messageObject = {
          message: 'Tahun Ajaran tidak boleh kosong',
          type: 'error',
          duration: 5 * 1000
        }
        state = false
      } else {
        let stateTrue = true
        if (this.formData.year.includes('/')) {
          const [prev, cont] = this.formData.year.split('/').map(el => parseInt(el))
          if (prev > cont) {
            stateTrue = false
          }
        } else {
          const yearInt = +(this.formData.year)
          if (!yearInt || yearInt < 0) {
            stateTrue = false
          }
        }
        if (!stateTrue) {
          messageObject = {
            message: 'Tahun Ajaran tidak valid, ex 2012/2013 atau 2012',
            type: 'error',
            duration: 5 * 1000
          }
          state = false
        }
      }
      if (!this.lecturerData) {
        messageObject = {
          message: 'Dosen tidak boleh kosong',
          type: 'error',
          duration: 5 * 1000
        }
        state = false
      }
      if (messageObject) {
        Message(messageObject)
      }
      return state
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          this.formData.class = +this.formData.class
          let message
          if (this.id_course) {
            await Course.updateCourse(this.id_course, this.formData)
            message = 'Mata Kuliah berhasil diupdate'
          } else {
            await Course.createCourse(this.formData)
            message = 'Mata Kuliah baru ditambahkan'
          }
          Message({
            message: message,
            type: 'success',
            duration: 5 * 1000
          })
          this.$router.push({ name: 'CourseList' })
        } catch (e) {
          Message({
            message: e.stack,
            type: 'error',
            duration: 4 * 1000
          })
        }
      } else {
        this.closeModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
