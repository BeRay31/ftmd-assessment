<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <el-form>
        <h2>{{ editComponent.name }}</h2>
        <h4 style="margin-bottom: 1rem;">Pembobotan Nilai Akhir</h4>
        <el-input-number v-model="editComponent.index_percentage" :min="0" :max="100" size="small" :step="10" />
        <h4 style="margin-bottom: 1rem;">Pembobotan LO</h4>
        <el-row v-for="(out, idx) in outcomes" :key="idx">
          <el-col :span="span">
            <span class="number-label">{{ out }}</span>
          </el-col>
          <el-col :span="6">
            <el-input-number v-model="editComponent.percentage[idx]" :min="0" :max="100" size="small" :step="10" />
          </el-col>
        </el-row>
      </el-form>
      <div class="content__button-group">
        <el-button class="btn btn-primary-alt" @click="$emit('closeModal')">Batalkan</el-button>
        <el-button
          :class="['btn btn-primary']"
          @click.prevent="emitSubmit"
        >Ubah</el-button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import { Message } from 'element-ui'

export default {
  name: 'EditModal',
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
      default: 'Ubah Detail Komponen'
    },
    component: {
      type: String,
      default: null
    },
    idCourse: {
      type: Number,
      default: null
    },
    percentage: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      span: 10,
      outcomes: [
        'A - Penyelesaian Masalah',
        'B - Desain',
        'C - Komunikasi',
        'D - Etika Profesi',
        'E - Kerja Sama',
        'F - Eksperimen',
        'G - Belajar Sepanjang Hayat'
      ],
      editComponent: {
        id_course: this.idCourse,
        name: this.component,
        percentage: this.percentage,
        index_percentage: this.percentage[7]
      }
    }
  },
  mounted() {
    this.editComponent.name = this.component
    this.editComponent.id_course = this.idCourse
    this.editComponent.percentage = this.percentage.slice(0, 7)
    this.editComponent.index_percentage = this.percentage[7]
  },
  methods: {
    isValid() {
      return (this.editComponent.index_percentage > 0 &&
      this.editComponent.percentage.reduce((a, b) => a + b, 0) === 100)
    },
    emitSubmit() {
      if (this.isValid()) {
        this.$emit('submit', this.editComponent)
      } else {
        Message({
          message: 'Pastikan masukan sudah benar',
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
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
