<template>
  <div class="questionnaire-container">
    <header>
      <h1>Kuisioner Teamwork - {{ datas['id_course'] }}</h1>
    </header>
    <div class="content-container">
      <div class="card">
        <div class="input">
          <MDInput
            v-model="datas['nama_lengkap']"
            :maxlength="100"
            required

            name="nama_lengkap"
          >
            Nama yang Dinilai
          </MDInput>
        </div>
        <div class="input">
          <MDInput
            v-model="datas['nim']"
            :maxlength="100"
            required

            name="nim"
          >
            NIM yang Dinilai
          </MDInput>
        </div>
        <div v-for="data in datas['answer_list']" :key="data['id']" :class="{ 'odd': data['id'] % 2 != 0 }">
          <p>{{ data["id"] }}. {{ data["text"] }}</p>
          <!-- <RadioInput v-model="data['answer']" /> -->
          <form class="radio">
            <div v-for="o in data['option']" :key="o['id']" class="input_option">
              <input v-model="data['answer']" type="radio" :value="o['value']" :name="data['id']">
              <label>{{ o["text"] }}</label>
            </div>
          </form>
        </div>
        
        <div class="submitBtn">
          <el-button
          :loading="loading"
          type="primary"
          class="btn btn-primary btn-login"
          @click="handleSubmit"
        >Submit</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

import Softskill from '@/api/softskill'
import RadioInput from './components/RadioInput.vue'
import MDInput from '@/components/MDinput'

export default {
  components: { RadioInput, MDInput },
  data() {
    return {
      datas: {
        'id_user': this.$store.getters.id_user,
        'id_course': this.$route.params.id,
        'nama_lengkap':null,
        'nim':null,
        'answer_list': [
          {
            'id': 1,
            'text': 'Mahasiswa mampu bekerjasama dengan baik',
            'answer': null,
            'option': [
              {
                'id_option':1,
                'value':1,
                'text':'A'
              },
              {
                'id_option':2,
                'value':2,
                'text':'B'
              },
              {
                'id_option':3,
                'value':3,
                'text':'C'
              },
              {
                'id_option':4,
                'value':4,
                'text':'D'
              },
            ]
          },
          {
            'id': 2,
            'text': 'Mahasiswa memiliki inisiatif tinggi saat bekerja',
            'answer': null,
            'option': [
              {
                'id_option':1,
                'value':1,
                'text':'A'
              },
              {
                'id_option':2,
                'value':2,
                'text':'B'
              },
              {
                'id_option':3,
                'value':3,
                'text':'C'
              },
              {
                'id_option':4,
                'value':4,
                'text':'D'
              },
            ]
          },
          {
            'id': 3,
            'text': 'Mahasiswa mampu berkomunikasi dengan rekan setim dengan baik',
            'answer': null,
            'option': [
              {
                'id_option':1,
                'value':1,
                'text':'A'
              },
              {
                'id_option':2,
                'value':2,
                'text':'B'
              },
              {
                'id_option':3,
                'value':3,
                'text':'C'
              },
              {
                'id_option':4,
                'value':4,
                'text':'D'
              },
            ]
          },
        ]
      }
    }
  },
  methods: {
    validateForm() {
      var temp = true
      for (var i = 0; i < this.datas.answer_list.length; i++) {
        temp = temp && (this.datas.answer_list[i].answer !== null)
      }
      return temp && this.datas.nama_lengkap && this.datas.nim
    },
    async handleSubmit() {
      if (this.$store.getters.routes_user_type !== 'student') {
        if (this.validateForm()) {
          console.log('wao')
        }
        Message({
          message: 'Hanya mahasiswa yang bisa submit form',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        if (this.validateForm()) {
          try {
            await Softskill.saveAnswerKerjasama(this.datas)
            Message({
              message: 'Kuisioner berhasil di submit!',
              type: 'success',
              duration: 5 * 1000
            })
            this.$router.push({ name: 'TeamworkQuestionnaireList' })
          } catch (e) {
            Message({
              message: e.stack || 'Error while submitting',
              type: 'error',
              duration: 5 * 1000
            })
          }
        } else {
          Message({
            message: 'Seluruh pertanyaan harus diisi',
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

header h1 {
  font-weight: 600;
}

.questionnaire-container {
  padding: 1rem 2rem;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.content-container .card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  border-radius: 16px;
  padding: 1rem 2rem;
}

.card p {
  margin-left: 12px;
}

.input{
  margin-top:15px;
  margin-bottom:15px;
  width:50%;
  margin-left:15px;
}
.input_option{
  label{
    margin-left:20px;
  }
  margin-bottom: 5px;
  margin-left: 15px;
}

.submitBtn {
  padding-top: 40px;
  margin: auto;
  width: 10%;

  button {
    background-color: #2196f3;
    padding: 0.75rem 0.75rem;
    text-align: center;

    &:hover {
      background-color: lighten($color: #2196f3, $amount: 10);
    }
  }
}

.odd {
  background-color: #FAFAFA;
}
</style>
