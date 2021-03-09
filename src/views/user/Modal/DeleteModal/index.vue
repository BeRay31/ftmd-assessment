<template>
  <Modal :state="state" title="Apakah anda yakin ingin menghapus user?" @closeModal="$emit('closeModal')">
    <div class="content">
      <div class="content__body">
        User dengan id {{ userData.id_user }} dan nama '{{ userData.name }}' akan terhapus dari sistem dan tidak dapat masuk kedalam sistem kembali.
      </div>
      <div class="content__button-group">
        <button class="btn btn-primary-alt" @click="$emit('closeModal')">Batalkan</button>
        <button
          :class="['btn btn-primary']"
          @click="$emit('submit')"
        >Ya Hapus</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'DeleteUserModal',
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
