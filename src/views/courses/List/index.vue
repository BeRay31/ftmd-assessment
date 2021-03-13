<template>
  <div class="course-list-container">
    <header>
      <h1>Daftar Mata Kuliah</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Semester</th>
            <th>Tahun Ajaran</th>
            <th>Aksi</th>
          </tr>
          <tr v-for="course in courses.rows" :key="course.id_course">
            <td>{{ course.name }}</td>
            <td>{{ course.class }}</td>
            <td>1</td>
            <td>2021/2022</td>
            <td class="action">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openModal(course)"
              >Edit</el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="openDeleteModal(course)"
                @submit="deleteCourse(course)"
              >Delete</el-button>
            </td>
          </tr>
        </table>
        <Pagination
          :total-page="totalPage"
          :current-page="currentPage"
          @pageChange="changePage"
        />
      </div>
    </div>
    <EditModal
      v-if="modal.state"
      :state="modal.state"
      :course="modal.course"
      @closeModal="closeModal"
      @submit="editCourses"
    />
    <DeleteModal
      v-if="modal.stateDelete"
      :state="modal.stateDelete"
      :course="modal.course"
      @closeModal="closeModal"
      @submit="deleteCourse"
    />
  </div>
</template>

<script>
import Courses from '@/api/courses'
import EditModal from '@/views/courses/List/EditModal/index'
import DeleteModal from '@/views/courses/List/DeleteModal/index'
import Pagination from '@/components/Pagination/Pagination'
import { Message } from 'element-ui'

export default {
  name: 'CourseList',
  components: {
    EditModal,
    DeleteModal,
    Pagination
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      totalPage: null,
      modal: {
        state: false,
        stateDelete: false,
        course: null
      }
    }
  },
  watch: {
    async currentPage() {
      await this.fetchCourses()
    }
  },
  async mounted() {
    await this.fetchCourses()
  },
  methods: {
    async editCourses(edited) {
      try {
        console.log(edited)
        const fetched = await Courses.editCourse(edited)
        if (fetched.rows > 0) {
          Message({
            message: 'Update sukses!',
            type: 'success',
            duration: 3 * 1000
          })
        } else {
          Message({
            message: fetched.msg,
            type: 'error',
            duration: 3 * 1000
          })
        }
        this.closeModal()
        this.fetchCourses()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    changePage(index) {
      this.currentPage = index
      this.fetchCourses()
    },
    async fetchCourses() {
      try {
        const fetched = await Courses.fetchCourses(this.currentPage)
        this.courses = fetched
        this.totalPage = fetched.totalPage
      } catch (e) {
        console.error(e.stack)
      }
    },
    openDeleteModal(course) {
      this.modal.stateDelete = true
      this.modal.course = course
    },
    async deleteCourse() {
      Courses.deleteCourse(this.modal.course.id_course).then((res) => {
        if (res.msg === 'OK') {
          this.modal.state = false
          this.modal.stateDelete = false
          this.modal.course = null
          this.fetchCourses()
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 3 * 1000
          })
          this.closeModal()
        }
      })
    },
    closeModal() {
      this.modal.state = false
      this.modal.stateDelete = false
      this.modal.course = null
    },
    openModal(course) {
      this.modal.course = course
      this.modal.state = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
