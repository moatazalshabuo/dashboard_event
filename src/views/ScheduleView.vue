<template>
  <div>
    <h1 class="border-b border-purple-600 font-bold inline-block">جدول المواعيد</h1>
    <div class="md:grid grid-flow-col grid-cols-2 p-5 sm:block">
      <div class="col-span-1">
        <div class="bg-gray-100 rounded shadow-lg p-5">
          <form v-on:submit.prevent="submit(this.id_update)" id="myForm">
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >العنوان</label
              >
              <div class="mt-2">
                <input
                  required
                  type="text"
                  v-model="this.form.title"
                  placeholder="العنوان"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >اليوم</label
              >
              <div class="mt-2">
                <select
                  v-model="this.form.day" required
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">اختر اليوم</option>
                  <option v-for="li in this.days" :value="li" >{{ li }}</option>
                </select>
              </div>
            </div>
            <div class="my-2 row">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >الموعد</label
              >
              <div class="grid grid-cols-2 gap-1">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-700"
                    >من</label
                  >
                  <input
                    id="title"
                    v-model="this.form.from_time"
                    type="time"
                    required
                    class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-700"
                    >الى</label
                  >
                  <input
                    id="title"
                    type="time"
                    required
                    v-model="this.form.to_time"
                    class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >التفاصيل</label
              >
              <div class="mt-2">
                <textarea v-model="this.form.descripe" class="m-2 rounded p-2 w-full" rows="7"></textarea>
              </div>
            </div>

            <button class="p-3 border-0 bg-purple-600 w-full text-white rounded">
              حفظ
            </button>
          </form>
        </div>
      </div>
      <div class="col-span-1">
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">العنوان</th>
                <th scope="col" class="px-6 py-3">من</th>
                <th scope="col" class="px-6 py-3">الى</th>
                <th scope="col" class="px-6 py-3">اليوم</th>
                <th scope="col" class="px-6 py-3">التفاصيل</th>
                <th scope="col" class="px-6 py-3">-</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="li in this.list"
                :key="li.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
              
                <td class="px-6 py-4">{{ li.title }}</td>
                <td class="px-6 py-4">{{ li.from_time }}</td>
                <td class="px-6 py-4">{{ li.to_time }}</td>
                <td class="px-6 py-4">{{ li.day }}</td>
                <td class="px-6 py-4">{{ li.descripe.slice(0, 150) }}</td>
                <td class="px-6 py-4 grid grid-flow-col col-span-2">
                  <button
                    v-on:click="deleteOrganizer(li.id)"
                    class="rounded border border-red-600 p-2 mx-1 text-center"
                  >
                    <i class="fas fa-trash text-red-600"></i>
                  </button>
                
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";

export default {
  name: "schedule",
  setup() {
    const Toast = createToaster({});
    return {
      Toast,
    };
  },
  data() {
    return {
      form: {
        title: "",
        day: "",
        descripe: "",
        from_time: "",
        to_time: "",
        day: "",
      },
      list: [],
      days:[],
      id_update: null,
    };
  },
  methods: {
  
    onSubmitForm() {
      

      axios
        .post("/api/create/schedule/", this.form)
        .then((res) => {
          this.form.title = "";
          this.form.from_time = "";
          this.form.to_time = "";
          this.form.descripe = "";
          this.form.day = ''
          
          document.getElementById("myForm").reset();
          this.Toast.success("تم الحفظ بنجاح");
          this.list.unshift(res.data.data);
        })
        .catch((res) => {
          this.Toast.error("حصل خطاء في العملية");
        });
    },
    GetOrganizes() {
      axios.get("/api/get/schedule/").then((res) => {
        this.days = res.data.days;
        this.list = res.data.data;
      });
    },
    submit() {
        this.onSubmitForm();
      
    },
    deleteOrganizer(id) {
      axios.delete(`/api/delete/schedule/${id}`).then((res) => {
        this.list = this.list.filter(function (el) {
          return el.id != id;
        });
        this.Toast.success("تم الحذف بنجاح");
      });
    },
  },
  mounted() {
    this.GetOrganizes();
  },
};
</script>
