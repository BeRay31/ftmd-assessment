<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <div class="content__body">
        {{ content }}
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="$emit('closeModal')">Batalkan</button>
        <button
          :class="['btn btn-primary']"
          @click="$emit('submit')"
        >Daftarkan</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'SubmitModal',
  components: {
    Modal
  },
  props: {
    userData: {
      type: Object,
      default: null
    },
    state: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Buat Mata Kuliah?'
    },
    content: {
      type: String,
      default: 'Mata kuliah akan didaftarkan ke dalam sistem akreditasi.'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
