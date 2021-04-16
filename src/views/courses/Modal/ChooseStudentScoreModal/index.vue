<template>
  <Modal :state="state" :title="title" @closeModal="closeModal">
    <div class="content">
      <div class="card content-container">
        <div class="search">
          <img src="@/assets/svg/search.svg" alt>
          <input v-model="searchQuery" type="text" class="card" placeholder="Cari Mahasiswa">
        </div>
        <table>
          <tr>
            <th />
            <th>Id</th>
            <th>Username/NIM</th>
            <th>Nama Mahasiswa</th>
          </tr>
          <template v-if="userData && userData.length > 0">
            <tr v-for="user in userData" :key="user.id_user">
              <td>
                <input v-model="selectedLecturer" :value="user" type="radio">
              </td>
              <td>{{ user.id_user }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.name }}</td>
            </tr>
          </template>
        </table>
        <Pagination
          :total-page="totalPage"
          :current-page="currentPage"
          @pageChange="updatePage"
        />
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="closeModal">Batal</button>
        <button
          :class="['btn btn-primary']"
          @click="emitSelectLecturer"
        >Pilih</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Pagination from '@/components/Pagination/Pagination'
import Users from '@/api/users'
import { Message } from 'element-ui'

export default {
  name: 'ChooseLecturer',
  components: {
    Modal,
    Pagination
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Pilih Mahasiswa'
    },
    prevSelectedLecturer: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      userData: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      listLoading: false,
      selectedLecturer: null
    }
  },
  watch: {
    async searchQuery() {
      await this.getUserList()
    }
  },
  async mounted() {
    if (this.prevSelectedLecturer) {
      this.selectedLecturer = this.prevSelectedLecturer
    }
    await this.getUserList()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    updatePage(index) {
      this.currentPage = index
      this.getUserList()
    },
    emitSelectLecturer() {
      if (this.selectedLecturer) {
        this.$emit('submit', this.selectedLecturer)
      } else {
        Message({
          message: 'Pilih Dosen!',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async getUserList() {
      this.listLoading = true
      try {
        const params = {
          pageSize: 10,
          page: this.currentPage,
          userType: 'student'
        }
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        const userResp = await Users.getAllUserCourse(params, this.$route.params.id)
        console.log(this.$route.params.id)
        this.userData = userResp.data
        this.totalPage = userResp.lastPage
      } catch (e) {
        console.error(e.stack)
      }
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "@/styles/table.scss"
</style>
