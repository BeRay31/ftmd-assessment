<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <el-form>
        <el-form-item>
          <MDInput v-model="editComponent.component">Komponen</MDInput>
        </el-form-item>
        <el-form-item>
          <el-select v-model="editComponent.code" placeholder="Learning Outcome">
            <el-option value="A"> A - Penyelesaian Masalah</el-option>
            <el-option value="B"> B - Desain</el-option>
            <el-option value="C"> C - Komunikasi</el-option>
            <el-option value="D"> D - Etika Profesi</el-option>
            <el-option value="E"> E - Kerja Sama</el-option>
            <el-option value="F"> F - Eksperimen</el-option>
            <el-option value="G"> G - Belajar Sepanjang Hayat</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <MDInput v-model="editComponent.percentage" type="number" min="0" max="100">Persentase</MDInput>
        </el-form-item>
      </el-form>
      <div class="content__button-group">
        <el-button class="btn btn-primary-alt" @click="$emit('closeModal')">Batalkan</el-button>
        <el-button
          :class="['btn btn-primary']"
          @click="$emit('submit', editComponent)"
        >Ubah</el-button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import MDInput from '@/components/MDinput'

export default {
  name: 'EditModal',
  components: {
    Modal,
    MDInput
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
      type: Object,
      default: null
    }
  },
  data() {
    return {
      editComponent: {
        id: this.component.id,
        id_course: this.component.id_course,
        component: this.component.component,
        code: this.component.code,
        id_lo: this.component.id_lo,
        percentage: this.component.percentage
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
