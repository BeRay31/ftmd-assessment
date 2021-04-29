<template>
  <form class="radio">
    <div>
      <input v-model="picked" type="radio" value="1">
      <label></label>
    </div>
    <div>
      <input v-model="picked" type="radio" value="2">
      <!-- <label>2</label> -->
    </div>
    <div>
      <input v-model="picked" type="radio" value="3">
      <!-- <label>3</label> -->
    </div>
    <div>
      <input v-model="picked" type="radio" value="4">
      <!-- <label>4</label> -->
    </div>
  </form>
</template>

<script>
export default {
  props: ['option1','option2','option3','option4'],
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
  /* display: flex; */
  align-content: left;
  padding-top: 12px;
  padding-bottom: 12px;
}

.radio div {
  /* display: inline; */
  margin: auto;
}

.radio div label {
  padding: 12px;
}

</style>
