<template>
  <div class="course-list-container">
    <h1>Course List Page</h1>
    <div class="pagenum">
      <button input="button" @click="prev()">&laquo;</button>
      <span>{{ page }}</span>
      <button input="button" @click="next()">&raquo;</button>
    </div>
    <table id="course-table">
      <tr>
        <th>Course</th>
        <th>Class</th>
        <th>Semester</th>
        <th>Action</th>
      </tr>
      <tr v-for="course in courses.rows" :key="course.id_course">
        <td>{{ course.cname }}</td>
        <td>{{ course.class }}</td>
        <td>{{ course.semester }}</td>
        <td>
          <button input-type="button" @click="editCourse(course)">Edit</button>
          <button input-type="button" @click="deleteCourse(course)">Delete</button>
        </td>
      </tr>
    </table>
    <modal v-show="showModal" :course="selectedCourse" @close="closeModal" />
  </div>

</template>

<script>
import Courses from '@/api/courses'
import modal from '@/views/courses/List/edit'

export default {
  name: 'CourseList',
  components: {
    modal
  },
  data() {
    return {
      courses: [],
      page: 1,
      showModal: false,
      selectedCourse: { cname: 'oke' },
      maxpage: 2
    }
  },
  created() {
    this.fetchCourses(this.page)
  },
  methods: {
    fetchCourses(pagenum) {
      // console.log(this.page)
      Courses.fetchCourses(pagenum).then((res) => {
        this.courses = res
        this.maxpage = res.maxpage
        // console.log(this.maxpage)
      })
    },
    next() {
      if (this.page < this.maxpage) {
        this.page += 1
        this.fetchCourses(this.page)
      }
    },
    prev() {
      if (this.page > 1) {
        this.page -= 1
        this.fetchCourses(this.page)
      }
    },
    editCourse(course) {
      this.selectedCourse = course
      this.$emit('update', course)
      this.showModal = true
    },
    deleteCourse(course) {
      const courseDetails = {
        name: course.cname,
        semester: course.semester,
        class: course.class
      }
      Courses.deleteCourse(courseDetails).then((res) => {
        if (res.msg === 'OK') {
          this.fetchCourses(this.page)
        }
      })
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
