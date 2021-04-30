<script>
export default {
  created() {
    this.$router.replace({ path: '/courses/list' })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
