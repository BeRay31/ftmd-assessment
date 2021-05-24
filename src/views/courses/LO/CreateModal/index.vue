<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <el-form>
        <el-form-item>
          <div style="color: lightslategray; font-size: 18px">Learning Outcome</div>
          <el-radio-group v-model="courseLO.id_lo">
            <el-tooltip class="item" effect="dark" content="Penyelesaian Masalah" placement="top">
              <el-radio-button label="1">A</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Desain" placement="top">
              <el-radio-button label="2">B</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Komunikasi" placement="top">
              <el-radio-button label="3">C</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Etika Profesi" placement="top">
              <el-radio-button label="4">D</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Kerja Sama" placement="top">
              <el-radio-button label="5">E</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eksperimen" placement="top">
              <el-radio-button label="6">F</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Belajar Sepanjang Hayat" placement="top">
              <el-radio-button label="7">G</el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div style="color: lightslategray; font-size: 18px">KMT</div>
          <el-radio-group v-model="courseLO.tag">
            <el-tooltip class="item" effect="dark" content="Low" placement="top">
              <el-radio-button label="L">L</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Medium" placement="top">
              <el-radio-button label="M">M</el-radio-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="High" placement="top">
              <el-radio-button label="H">H</el-radio-button>
            </el-tooltip>
          </el-radio-group>
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
          @click="$emit('submitCreate', courseLO)"
        >Tambah LO</el-button>
        <el-button
          v-else
          :class="['btn btn-primary']"
          @click="$emit('submitEdit', courseLO)"
        >Ubah detail LO</el-button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'CreateModal',
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
    lo: {
      type: Object,
      default: null
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      courseLO: {
        id_lo: this.lo.id_lo,
        id: this.lo.id,
        editID: this.lo.id_lo,
        tag: this.lo.tag.trim()
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
