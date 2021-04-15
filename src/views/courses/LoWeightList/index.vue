<template>
  <div class="course-list-container">
    <header>
      <h1 v-if="courses"> {{ courses.code }} {{ courses.name }} K{{ courses.class }}</h1>
      <h1>Daftar Component LO</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <table>
          <tr>
            <th>Komponen</th>
            <th>LO</th>
            <th>Persentase</th>
            <th>Aksi</th>
          </tr>
          <tr v-for="component in loComponents" :key="component.id">
            <td>{{ component.component }}</td>
            <td>{{ component.code }}</td>
            <td>{{ component.percentage }}</td>
            <td class="action">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openModal(component)"
              >Edit</el-button>
              <el-button
                type="warning"
                icon="el-icon-delete"
                @click="openDeleteModal(component)"
                @submit="deleteComponent(component)"
              >Delete</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="btn-group">
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="addComponent()"
      >Tambah Komponen</el-button>
    </div>
    <EditModal
      v-if="modal.state"
      :state="modal.state"
      :component="modal.component"
      @closeModal="closeModal"
      @submit="editComponent"
    />
    <DeleteModal
      v-if="modal.stateDelete"
      :state="modal.stateDelete"
      :component="modal.component"
      @closeModal="closeModal"
      @submit="deleteComponent"
    />
  </div>
</template>

<script>
import DosenLoWeight from '@/api/dosen_lo_weight'
import EditModal from '@/views/courses/LoWeightList/EditModal/index'
import DeleteModal from '@/views/courses/LoWeightList/DeleteModal/index'
import { Message } from 'element-ui'

export default {
  name: 'LoComponentList',
  components: {
    EditModal,
    DeleteModal
  },
  data() {
    return {
      loComponents: [],
      courses: null,
      modal: {
        state: false,
        stateDelete: false,
        course: null
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
    async editComponent(edited) {
      try {
        edited.id_lo = edited.code.charCodeAt(0) - 64
        const fetched = await DosenLoWeight.editComponent(edited)
        if (fetched.msg === 'Update row success!') {
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
        this.fetchComponents()
      } catch (e) {
        Message({
          message: e.stack,
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async fetchComponents() {
      try {
        const fetched = await DosenLoWeight.fetchComponents(this.$route.params.id)
        const fetch_courses = await DosenLoWeight.getCourseDetails(this.$route.params.id)
        this.loComponents = fetched.value
        this.courses = fetch_courses.data
      } catch (e) {
        console.error(e.stack)
      }
    },
    openDeleteModal(component) {
      this.modal.stateDelete = true
      this.modal.component = component
    },
    addComponent() {
      this.$router.push({ name: 'AddLoComponent' })
    },
    async deleteComponent() {
      DosenLoWeight.deleteComponent(this.modal.component).then((res) => {
        if (res.msg === 'Row deleted successfully!') {
          this.modal.state = false
          this.modal.stateDelete = false
          this.modal.component = null
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this.fetchComponents()
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
      this.modal.component = null
    },
    openModal(component) {
      this.modal.component = component
      this.modal.state = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
