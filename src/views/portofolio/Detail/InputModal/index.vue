<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <el-form>
        <el-form-item>
          <div style="color: lightslategray; font-size: 18px">Kehadiran Dosen</div>
          <div style="color: lightslategray; font-size: 12px">Jumlah Pertemuan <el-input-number v-model="pertemuan" min="0" @change="updateKehadiran" /></div>
          <div style="color: lightslategray; font-size: 12px">Jumlah Kehadiran Dosen <el-input-number v-model="kehadiran" min="0" :max="pertemuan" @change="updateKehadiran" /></div>
          <div style="color: lightslategray; font-size: 12px">Kehadiran Dosen : {{ portfolio.kehadiranDosen % 1 == 0 ? portfolio.kehadiranDosen : portfolio.kehadiranDosen.toFixed(1) }}%</div>
        </el-form-item>
        <el-form-item>
          <div style="color: lightslategray; font-size: 18px">Kehadiran Mahasiswa (%)</div>
          <el-input-number v-model="portfolio.kehadiranMahasiswa" min="0" max="100" step="0.1" />
          <el-input v-model="portfolio.kehadiranMahasiswa" type="range" min="0" max="100" step="0.1" />
        </el-form-item>
        <el-form-item>
          <div style="color: lightslategray; font-size: 18px">Rata-rata Nilai Mahasiswa</div>
          <el-input-number v-model="portfolio.average" min="0.00" max="4.00" step="0.01" />
          <el-input v-model="portfolio.average" type="range" min="0.00" max="4.00" step="0.01" />
        </el-form-item>
      </el-form>
      <div class="content__button-group">
        <el-button
          class="btn btn-primary-alt"
          @click="$emit('closeModal')"
        >Batalkan</el-button>
        <el-button
          v-if="!edit"
          :class="['btn btn-primary']"
          @click="$emit('submitCreate', portfolio)"
        >Tambah Portfolio</el-button>
        <el-button
          v-else
          :class="['btn btn-primary']"
          @click="$emit('submitEdit', portfolio)"
        >Edit Portfolio</el-button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'InputModal',
  components: {
    Modal
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Tambah LO'
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pertemuan: 0,
      kehadiran: 0,
      portfolio: {
        kehadiranDosen: 0,
        kehadiranMahasiswa: 0,
        average: 0
      }
    }
  },
  methods: {
    updateKehadiran() {
      if (this.pertemuan && this.kehadiran) {
        this.portfolio.kehadiranDosen = this.kehadiran / this.pertemuan * 100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: block;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FAFAFA;
    box-shadow: 2px 2px 15px 1px;
    width: 400px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-footer {
    padding: 10px;
    display: flex;
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 2% 5% 2% 5%;
    margin-right: 2%;
  }

  .form-title {
      font-weight: 700;
      font-size: 22px;
  }

  .form-subtitle {
      font-weight: 600;
  }

  .form-desc {
      margin-left: 0px;
      margin-bottom: 10px;
  }

</style>
