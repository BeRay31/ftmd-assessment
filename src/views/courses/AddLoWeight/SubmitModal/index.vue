<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <div class="content__body">
<<<<<<< HEAD:src/views/courses/Modal/SubmitModal/index.vue
        {{ content }}
=======
        Komponen Learning Outcome akan ditambahkan pada mata kuliah
>>>>>>> 0bcaefdb98facbc1773156c7ffbf702805f18913:src/views/courses/AddLoWeight/SubmitModal/index.vue
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
<<<<<<< HEAD:src/views/courses/Modal/SubmitModal/index.vue
      default: 'Buat Mata Kuliah?'
    },
    content: {
      type: String,
      default: 'Mata kuliah akan didaftarkan ke dalam sistem akreditasi.'
=======
      default: 'Tambahkan Komponen?'
>>>>>>> 0bcaefdb98facbc1773156c7ffbf702805f18913:src/views/courses/AddLoWeight/SubmitModal/index.vue
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
