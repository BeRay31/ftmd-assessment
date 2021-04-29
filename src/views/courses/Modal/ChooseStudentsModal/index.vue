<template>
  <Modal :state="state" :title="title" @closeModal="closeModal">
    <div class="content">
      <div class="card content-container">
        <header>
          <div class="search" :class="[useXlsx ? 'hidden' : '']">
            <img src="@/assets/svg/search.svg" alt>
            <input v-model="searchQuery" type="text" class="card" placeholder="Cari Mahasiswa">
          </div>
          <el-button
            type="primary"
            class="btn"
            @click="toggleUseXlsx"
          >{{ useXlsx ? 'Cari mahasiswa' : 'Gunakan Excell/Csv' }}</el-button>
        </header>
        <template v-if="useXlsx">
          <el-form>
            <el-form-item label="Upload Data Mahasiswa">
              <input
                id="hidden-input-file-button"
                type="file"
                name="excel"
                accept=".csv, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                @change="getFile"
              >
              <div class="input-file-container">
                <div id="input-file-button" class="btn-primary-light btn-small" @click="inputFile">
                  <template v-if="!fileData">
                    <span>Upload</span>
                  </template>
                  <template v-else>
                    <span>Ganti File</span>
                  </template>
                </div>
                <p class="place-holder">{{ fileData ? fileData.name : 'Upload Data Mahasiswa...' }}</p>
              </div>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <table v-loading="listLoading">
            <tr>
              <th />
              <th>Id</th>
              <th>Username/NIM</th>
              <th>Nama</th>
            </tr>
            <template v-if="userData && userData.length > 0">
              <tr v-for="user in userData" :key="user.id_user">
                <td>
                  <input v-model="selectedStudents" :value="user.id_user" type="checkbox">
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
        </template>
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="closeModal">Batal</button>
        <button
          :class="['btn btn-primary']"
          @click="emitSelectedStudents"
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
  name: 'ChooseStudents',
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
    excludedUser: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userData: [],
      currentPage: 1,
      totalPage: null,
      searchQuery: '',
      listLoading: false,
      selectedStudents: [],
      useXlsx: false,
      fileData: null,
      urlFileData: null
    }
  },
  watch: {
    async searchQuery() {
      await this.getUserList()
    }
  },
  async mounted() {
    await this.getUserList()
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    toggleUseXlsx() {
      this.useXlsx = !this.useXlsx
      if (!this.useXlsx) {
        this.fileData = null
        this.urlFileData = null
      }
    },
    inputFile() {
      document.getElementById('hidden-input-file-button').click()
    },
    getFile(e) {
      this.fileData = e.target.files[0]
      this.urlFileData = URL.createObjectURL(e.target.files[0])
      document.getElementById('hidden-input-file-button').value = null
    },
    updatePage(index) {
      this.currentPage = index
      this.getUserList()
    },
    emitSelectedStudents() {
      if (this.selectedStudents.length > 0) {
        this.$emit('submit', {
          emitType: 'list',
          selectedStudents: this.selectedStudents
        })
      } else if (this.fileData) {
        const data = new FormData()
        data.append('excel', this.fileData)
        this.$emit('submit', {
          emitType: 'fileData',
          fileStudents: data
        })
      } else {
        Message({
          message: 'Pilih Mahasiswa! / Upload Data Mahasiswa!',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    async getUserList() {
      this.listLoading = true
      try {
        const params = {
          pageSize: 6,
          page: this.currentPage,
          userType: 'student'
        }
        if (this.excludedUser.length > 0) {
          params.ex_ids_user = this.excludedUser.toString()
        }
        if (this.searchQuery !== '') {
          params.searchQuery = this.searchQuery
        }
        const userResp = await Users.getAllUser(params)
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
@import "@/styles/table.scss";
</style>
