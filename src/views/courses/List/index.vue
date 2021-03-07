<template>
  <div class="course-list-container">
    <h1>Course List Page</h1>
    <table>
      <tr>
        <th>Course</th>
        <th>Class</th>
        <th>Semester</th>
      </tr>
      <tr v-for="course in courses.rows" :key="course.id_course">
        <td>{{ course.name }}</td>
        <td>{{ course.class }}</td>
        <td>{{ course.semester }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Courses from '@/api/courses'

export default {
  name: 'CourseList',
  data() {
    return {
      courses: []
    }
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    fetchCourses() {
      Courses.fetchCourses().then((res) => {
        this.courses = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
