<template>
  <form class="radio">
    <div>
      <input v-model="picked" type="radio" value="1">
      <label>1</label>
    </div>
    <div>
      <input v-model="picked" type="radio" value="2">
      <label>2</label>
    </div>
    <div>
      <input v-model="picked" type="radio" value="3">
      <label>3</label>
    </div>
    <div>
      <input v-model="picked" type="radio" value="4">
      <label>4</label>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      picked: null
    }
  },
  watch: {
    picked() {
      this.$emit('input', this.picked)
    }
  }
}
</script>

<style scoped>
.radio {
  display: flex;
  align-content: center;
  padding-top: 12px;
  padding-bottom: 12px;
}

.radio div {
  display: inline;
  margin: auto;
}

.radio div label {
  padding: 12px;
}

</style>
