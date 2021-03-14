<template>
  <div class="course-lo-container">
    <header>
      <h1>Learning Outcomes</h1>
    </header>
    <div class="button-panel">
      <el-button
        type="primary"
        icon="el-icon-edit-outline"
        @click="handleCreate"
      >Tambah LO</el-button>
    </div>
    <div class="content-container">
      <div class="card">
        <h2 v-if="data.length == 0">LO belum disusun</h2>
        <table v-if="data.length > 0">
          <tr>
            <th>Learning Outcome</th>
            <th>KMT</th>
            <th>Course Assessment</th>
            <th />
          </tr>
          <tr v-for="lo in data" :key="lo.id">
            <td>{{ lo.id_lo }}</td>
            <td>{{ lo.tag }}</td>
            <td>3.50</td>
            <td class="action">
              <el-button
                type="primary"
                icon="el-icon-view"
              >Lihat detail</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <CreateModal
      v-if="modal.state"
      :state="modal.state"
      @submit="addLO"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import Courses from '@/api/courses'
import CreateModal from '@/views/courses/LO/CreateModal/index'
import { Message } from 'element-ui'

export default {
  name: 'CourseLO',
  components: {
    CreateModal
  },
  data() {
    return {
      id_course: null,
      data: null,
      modal: {
        state: false
      }
    }
  },
  async created() {
    this.id_course = this.$route.params.id
    this.fetchLO()
  },
  methods: {
    handleCreate() {
      this.modal.state = true
    },
    closeModal() {
      this.modal.state = false
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
        const los = await Courses.fetchCourseLO(this.id_course)
        this.data = los.data
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "index.scss";
</style>
