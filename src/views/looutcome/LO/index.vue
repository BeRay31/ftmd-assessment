<template>
  <div class="course-lo-container">
    <header>
      <h1>Learning Outcomes</h1>
      <div style="font-size: 1rem; margin-top: -1rem; margin-bottom: 1rem">{{ name }} ({{ lecturer }})</div>
    </header>
    <div class="button-panel">
      <el-button
        type="primary"
        icon="el-icon-edit-outline"
        @click="handleCreate"
      >Buat LO</el-button>
      <el-link type="info" @click="backToList">Kembali</el-link>
    </div>
    <div class="content-container">
      <div class="card">
        <h2 v-if="data && data.length == 0">LO belum disusun</h2>
        <table v-if="data && data.length > 0">
          <tr>
            <th>Learning Outcome</th>
            <th>KMT</th>
            <th>Course Assessment</th>
            <th />
          </tr>
          <tr v-for="lo in data" :key="lo.id">
            <td>{{ (lo.id_lo &lt; 8) ? mapping[lo.id_lo] : 'X' }}</td>
            <td>{{ lo.tag }}</td>
            <td>3.50</td>
            <td class="action">
              <el-button
                type="primary"
                icon="el-icon-view"
              >Lihat detail</el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="openDeleteModal(lo)"
              >Hapus LO</el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openEditModal(lo)"
              >Ubah Detail</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <CreateModal
      v-if="modal.state"
      :state="modal.state"
      :lo="modal.lo"
      :edit="modal.edit"
      :title="modal.title"
      @submitCreate="addLO"
      @submitEdit="editLO"
      @closeModal="closeModal"
    />
    <DeleteModal
      v-if="modal.stateDelete"
      :state="modal.stateDelete"
      :lo="modal.lo"
      @submit="deleteLO"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import Courses from '@/api/courses'
import CreateModal from '@/views/courses/LO/CreateModal/index'
import DeleteModal from '@/views/courses/LO/DeleteModal/index'
import { Message } from 'element-ui'

export default {
  name: 'CourseLO',
  components: {
    CreateModal,
    DeleteModal
  },
  data() {
    return {
      id_course: null,
      name: null,
      lecturer: null,
      data: null,
      mapping: ['X', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
      modal: {
        state: false, // Create Modal
        edit: false, // For Modal: to determine submit/edit
        stateDelete: false, // Delete Modal
        lo: null,
        title: ''
      }
    }
  },
  async created() {
    this.id_course = this.$route.params.id
    try {
      Courses.fetchCourseById(this.id_course).then((res) => {
        this.name = res.value[0].name
        this.lecturer = res.value[0].id_lecturer
      })
    } catch (e) {
      console.log(e.stack)
    }
    this.fetchLO()
  },
  methods: {
    backToList() {
      this.$router.push({ name: 'CourseList' })
    },
    handleCreate() {
      this.modal.lo = { id_lo: null, tag: 'L' }
      this.modal.state = true
      this.modal.edit = false
      this.modal.title = 'Tambah LO'
    },
    closeModal() {
      this.modal.state = false
      this.modal.stateDelete = false
      this.modal.lo = null
      this.modal.edit = false
    },
    async addLO(courseLO) {
      this.modal.state = false
      const loDetails = {}
      loDetails.code = this.id_course
      loDetails.tag = courseLO.tag
      loDetails.id = courseLO.id_lo
      try {
        const res = await Courses.createCourseLO(loDetails)
        if (res.msg === 'OK') {
          Message({
            message: 'LO berhasil ditambahkan',
            type: 'success',
            duration: 3 * 1000
          })
          this.fetchLO()
        }
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async fetchLO() {
      try {
        Courses.fetchCourseLO(this.id_course).then((res) => {
          this.data = res.data
        })
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async deleteLO(lo) {
      try {
        await Courses.deleteCourseLO(lo)
        Message({
          message: 'LO dihapus',
          type: 'success',
          duration: 3 * 1000
        })
        this.closeModal()
        this.fetchLO()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async editLO(courseLO) {
      try {
        const loDetails = {}
        loDetails.code = this.id_course
        loDetails.tag = courseLO.tag
        loDetails.id = courseLO.id_lo
        console.log(loDetails)
        this.closeModal()
        await Courses.editCourseLO(loDetails)
        this.fetchLO()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    openDeleteModal(lo) {
      this.modal.lo = lo
      this.modal.stateDelete = true
    },
    openEditModal(lo) {
      this.modal.lo = lo
      this.modal.state = true
      this.modal.edit = true
      this.modal.title = 'Ubah Detail LO'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "index.scss";
</style>
