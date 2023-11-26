<template>
  <div class="lg:w-1/2 w-full mt-[50px]">
    <div class="shadow-lg border-gray-600 rounded-lg p-4">
      <h1 class="font-bold m-2 border-b-2 inline-block border-blue-600 p-3">
        بيانات الحدث الاساسية
      </h1>
      <form v-on:submit.prevent="saveData">
        <div class="my-2">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
            >عنوان الحدث</label
          >
          <div class="mt-2">
            <input
              id="title"
              v-model="this.form.title"
              required
              type="text"
              placeholder="عنوان الحدث"
              class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="my-2">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-700"
            >ايام الحدث</label
          >
          <div class="grid grid-cols-2 gap-1">
            <div>
              <label class="block text-sm font-medium leading-6 text-gray-700">من</label>
              <input
                id="title"
                v-model="this.form.from_date"
                type="date"
                placeholder="عنوان الحدث"
                class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label class="block text-sm font-medium leading-6 text-gray-700">الى</label>
              <input
                id="title"
                type="date"
                v-model="this.form.to_date"
                placeholder="عنوان الحدث"
                class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div class="my-4">
          <label>نبذه عن الحدث</label>
          <textarea
            v-model="this.form.about"
            class="w-full rounded-lg border p-3 text-gray-800 ring-1 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows="7"
          >
          </textarea>
        </div>
        <div class="rounded bg-red-400 p-3 text-red-50 m-3" v-if="this.error.length != 0">
          <p v-for="err in this.error" :key="err">
              {{ err }}
          </p>
        </div>
        <button class="p-3 border-0 bg-pink-600 w-full text-white rounded">حفظ</button>
      </form>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { createToaster } from '@meforma/vue-toaster';
import axios from 'axios';

export default {
  name: "Setting",
  setup() {
    const toast = createToaster({})
    return{
      toast
    }
  },
  data() {
    return {
      form: {
        title: '',
        from_date: null,
        to_date: null,
        about: "",
      },
      error:[]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    saveData(){
      
      if(this.form.title == ''){
        this.error.push('يرجى كتابة العنوان')
      }
      if(this.form.from_date == null){
        this.error.push('يرجى ادخال تاريخ البدء')
      }
      if(this.form.to_date == null){
        this.error.push('يرجى ادخال تاريخ النهاية')
      }
      if(this.error.length == 0)
        axios.post('/api/setting/',this.form).then((res)=>{
          if(res.data.status){
            this.toast.success('تم الحفظ بنجاح')
          }else{
            this.toast.error('حصل خطاء في البيانات')
                      
          }
        }).catch((res)=>{

        })
        
    },
    getData(){
      axios.get('/api/get-setting/').then((res)=>{

        var data = res.data.data
        this.form.title = data.title
        this.form.from_date = data.from_date
        this.form.to_date = data.to_date
        this.form.about = data.about

      }).catch((res)=>{

      })
    }
  },
};
</script>
