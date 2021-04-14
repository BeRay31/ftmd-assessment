<template>
  <div class="course-container">
    <header>
      <h1>Tambah Nilai</h1>
    </header>
    <div class="content-container">
      <div class="form-card">
        <el-form>
          <div class="input-container">
            <div class="label">
              Mahasiswa :
            </div>
            <template v-if="!lecturerData">
              <el-button
                type="primary"
                class="btn btn-primary btn-login"
                @click.prevent="openModal('selectStudentScore')"
              >Pilih Mahasiswa</el-button>
            </template>
            <template v-else>
              <span class="lecturer-name">{{ lecturerData.name }}</span>
              <el-button
                type="primary"
                class="btn btn-primary btn-login"
                @click.prevent="openModal('selectStudentScore')"
              >Ganti Mahasiswa</el-button>
            </template>
          </div>
          <el-row :gutter="30" margin-top:-10px>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="formData.class" placeholder="Komponen">
                  <el-option v-for="component in components" :key="component.component" :value="component.component">{{ component.component }}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">
              <el-form-item>
                <MDInput v-model="formData.year" type="number" min="0" max="100">Nilai</MDInput>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click.prevent="openModal('submitConfirmation')"
        >Tambah</el-button>
      </div>
    </div>
    <template v-if="id_course">
      <ClassAttendance
        :id-course="+id_course"
      />
    </template>
    <SubmitModal
      v-if="isModalOpen('submitConfirmation')"
      :state="isModalOpen('submitConfirmation')"
      :title="id_course? `Tambah Komponen ${formData.class} Pada Mahasiswa ${lecturerData.name} ?` : null"
      :content="id_course? `Data akan tersimpan dengan nilai ${formData.year}` : null"
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
    <ChooseStudentScore
      v-if="isModalOpen('selectStudentScore')"
      :state="isModalOpen('selectStudentScore')"
      :prev-selected-lecturer="lecturerData"
      @closeModal="closeModal"
      @submit="handleSubmitLecturer"
    />
  </div>
</template>

<script>
import ClassAttendance from './components/ClassAttendance/index'
import SubmitModal from '../Modal/SubmitModal/index'
import ChooseLecturer from '../Modal/ChooseLecturerModal/index'
import ChooseStudentScore from '../Modal/ChooseStudentScoreModal/index'
import MDInput from '@/components/MDinput'
import { Message } from 'element-ui'
import Course from '@/api/courses'
import Users from '@/api/users'

export default {
  name: 'Course',
  components: {
    MDInput,
    SubmitModal,
    ChooseLecturer,
    ChooseStudentScore,
    ClassAttendance
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
      scores: {
        id_course: null,
        id_user: null,
        nilai: null,
        komponen: null
      },
      components: [],
      lecturerData: null
    }
  },
  watch: {
    async currentPage() {
      await this.getComponent()
    }
  },
  async mounted() {
    this.id_course = this.$route.params.id
    await this.getComponent()
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
    async getComponent() {
      const fetched = await Course.getComponent(this.$route.params.id)
      console.log(fetched)
      this.components = fetched.data
      console.log(this.components[0].component)
    },
    validateForm() {
      let messageObject
      let state = true
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
          this.scores.id_course = this.$route.params.id
          this.scores.id_user = this.lecturerData.id_user
          this.scores.komponen = this.formData.class
          this.scores.nilai = this.formData.year
          let message
          if (this.id_course) {
            await Course.createScores(this.scores)
            message = 'Nilai berhasil ditambahkan'
          } else {
            await Course.createScores(this.scores)
            message = 'Nilai berhasil ditambahkan'
          }
          Message({
            message: message,
            type: 'success',
            duration: 5 * 1000
          })
          this.closeModal()
          this.$router.push({ name: 'ScoresList', params: { id: this.$route.params.id }})
        } catch (e) {
          Message({
            message: e.stack,
            type: 'error',
            duration: 4 * 1000
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
