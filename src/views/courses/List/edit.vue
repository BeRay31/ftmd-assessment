<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <section
          id="modalDescription"
          class="modal-body"
        >
          <span class="form-title">Edit Course Details</span>
          <slot name="body">
            <form method="post">
              <label for="name">Kuliah</label>
              <input id="name" v-model="selectedCourse.cname" type="text">
              <label for="dosen">Dosen</label>
              <input id="dosen" v-model="selectedCourse.lecturer" type="text"><br>
              <label for="semester">Semester</label>
              <input id="semester" v-model="selectedCourse.semester" type="number"><br>
            </form>
          </slot>
        </section>
        <footer class="modal-footer">

          <button
            type="button"
            class="btn-green"
            aria-label="Close modal"
            @click="close"
          >
            DONE
          </button>
          <button
            type="button"
            class="btn-green"
            @click="close"
          >
            CLOSE
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    course: {
      type: Object,
      require: true,
      default: function() {
        return {
          cname: 'Lorem Ipsum',
          lecturer: 'Lorem Ipsum',
          semester: 2
        }
      }
    }
  },
  data() {
    return {
      selectedCourse: this.course
    }
  },
  created() {
    this.$parent.$on('update', this.setCourse)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    setCourse(newCourse) {
      this.selectedCourse = newCourse
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
    background: #FFFFFF;
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
