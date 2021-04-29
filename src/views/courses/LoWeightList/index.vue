<template>
  <div class="buffer">
    <div class="course-list-container">
      <header>
        <h1>Daftar Komponen Penilaian</h1>
        <p v-if="courses"> {{ courses.code }} {{ courses.name }} K{{ courses.class }}</p>
      </header>
      <div class="content-container">
        <div class="card">
          <table>
            <tr>
              <th>Komponen</th>
              <th>LO A</th>
              <th>LO B</th>
              <th>LO C</th>
              <th>LO D</th>
              <th>LO E</th>
              <th>LO F</th>
              <th>LO G</th>
              <th>% NA</th>
              <th>Aksi</th>
            </tr>
            <tr v-for="(comp, name) in loComponents" :key="name">
              <td>{{ name }}</td>
              <td v-for="(item, idx) in comp" :key="idx">
                {{ item > 0 ? item : '-' }}
              </td>
              <td class="action">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="openModal(name, comp)"
                >Edit</el-button>
                <el-button
                  type="warning"
                  icon="el-icon-delete"
                  @click="openDeleteModal(name)"
                >Delete</el-button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="course-list-container">
        <el-button
          type="primary"
          style="margin-top:20px"
          icon="el-icon-edit"
          @click="countScoreIndex()"
        >Hitung Nilai Indeks</el-button>
      </div>
      <EditModal
        v-if="modal.state"
        :state="modal.state"
        :component="modal.component"
        :percentage="modal.percentage"
        :id-course="parseInt(id_course)"
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
    <AddLoWeight
      v-if="showAdd"
      :id-course="parseInt(id_course)"
      :class-details="courses"
      @update="fetchComponents"
    />
  </div>
</template>

<script>
import DosenLoWeight from '@/api/dosen_lo_weight'
import Course from '@/api/courses'
import EditModal from '@/views/courses/LoWeightList/EditModal/index'
import DeleteModal from '@/views/courses/LoWeightList/DeleteModal/index'
import AddLoWeight from '@/views/courses/AddLoWeight/index'
import { Message } from 'element-ui'

export default {
  name: 'LoComponentList',
  components: {
    EditModal,
    DeleteModal,
    AddLoWeight
  },
  data() {
    return {
      loComponents: [],
      courses: null,
      showAdd: false,
      id_course: this.$route.params.id,
      modal: {
        state: false,
        stateDelete: false,
        course: null,
        percentage: [0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  watch: {
    async currentPage() {
      await this.fetchComponents()
    }
  },
  async created() {
    const fetch_courses = await DosenLoWeight.getCourseDetails(this.$route.params.id)
    this.courses = fetch_courses.data
    this.showAdd = true
  },
  async mounted() {
    await this.fetchComponents()
  },
  methods: {
    async editComponent(edited) {
      try {
        edited.semester = this.courses.semester
        edited.tahun_ajaran = this.courses.tahun_ajaran
        edited.code = this.courses.code
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
          message: 'Komponen gagal di edit',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async countScoreIndex() {
      await Course.countScoreIndexes(this.$route.params.id)
      Message({
          message: 'Nilai Berhasil dihitung',
          type: 'success',
          duration: 3 * 1000
        })
      this.$router.push({ name: 'EditCourse', params: { id: this.$route.params.id }})
    },
    async fetchComponents() {
      try {
        const fetched = await DosenLoWeight.fetchComponents(this.$route.params.id)
        this.loComponents = fetched.value
      } catch (e) {
        Message({
          message: 'Komponen tidak ditemukan',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    openDeleteModal(name) {
      this.modal.stateDelete = true
      this.modal.component = name
    },
    async deleteComponent(name) {
      const data = {}
      data['component'] = this.modal.component
      data['id_course'] = this.id_course
      data['semester'] = this.courses.semester
      data['tahun_ajaran'] = this.courses.tahun_ajaran
      data['code'] = this.courses.code
      DosenLoWeight.deleteComponent(data).then((res) => {
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
    openModal(name, comp) {
      this.modal.percentage = comp
      this.modal.component = name
      this.modal.state = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/table.scss";
@import "./index.scss";
</style>
