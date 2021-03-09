<template>
  <Modal :state="state" :title="title" @closeModal="$emit('closeModal')">
    <div class="content">
      <div class="content__body">
        {{ title.includes('ubah') ? `Properti user dengan id ${userData.id_user} akan diubah sesuai formulir yang ditampilkan` : `User akan ditambahkan ke dalam sistem untuk dapat masuk kedalam sistem.`}}
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="$emit('closeModal')">Batalkan</button>
        <button
          :class="['btn btn-primary']"
          @click="$emit('submit')"
        >{{ title.includes('ubah') ? 'Ya Ubah' : 'Ya Tambahkan' }}</button>
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
      default: 'Apakah anda yakin ingin membuat user?'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
