<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <div class="content__body">
        {{ content }}
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="$emit('closeModal')">Batal</button>
        <button
          :class="['btn btn-primary']"
          @click="$emit('submit')"
        >Hapus</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'DeleteModal',
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
      default: 'Hapus Mata Kuliah?'
    },
    content: {
      type: String,
      default: 'Mata kuliah akan dihapus'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
