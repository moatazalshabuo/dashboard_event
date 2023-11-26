<template>
  <div>
    <h1 class="border-b border-purple-600 font-bold inline-block">الرعاة</h1>
    <div class="md:grid grid-flow-col grid-cols-2 p-5 sm:block">
      <div class="col-span-1">
        <div class="">
          <form v-on:submit.prevent="submit(this.id_update)" id="myForm">
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >اسم الراعي</label
              >
              <div class="mt-2">
                <input
                  required
                  type="text"
                  v-model="this.form.name"
                  placeholder="اسم المنظم"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >نوع الراعي</label
              >
              <div class="mt-2">
                <select
                  v-model="this.form.type"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">اختر النوع</option>
                  <option value="gold">Gold</option>
                  <option value="silver">silver</option>
                  <option value="bronze">bronze</option>
                </select>
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >رابط الموقع الالكتروني</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="this.form.web_site"
                  placeholder="رابط الموقع الالكتروني"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >رابط منصة الفيسبوك</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="this.form.face_link"
                  placeholder="رابط منصة الفيسبوك"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >رابط منصة التويتر</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="this.form.x_link"
                  placeholder="رابط منصة التويتر"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >الشعار
              </label>
              <div class="mt-2">
                <input
                  :required="id_update == null"
                  type="file"
                  accept="image/*"
                  ref="file"
                  v-on:change="onChangeimg"
                  class="block w-full rounded-md border-0 p-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                <th scope="col" class="px-6 py-3">الشعار</th>
                <th scope="col" class="px-6 py-3">الاسم</th>
                <th scope="col" class="px-6 py-3">النوع</th>
                <th scope="col" class="px-6 py-3">رابط الفيسبوك</th>
                <th scope="col" class="px-6 py-3">رابط التويتر</th>
                <th scope="col" class="px-6 py-3">رابط الموقع</th>
                <th scope="col" class="px-6 py-3">-</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="li in this.list"
                :key="li.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">
                  <img :src="li.get_img" style="width: 50px" alt="" srcset="" />
                </td>
                <td class="px-6 py-4">{{ li.name }}</td>                
                <td class="px-6 py-4">{{ li.type }}</td>
                <td class="px-6 py-4">{{ li.face_link }}</td>
                <td class="px-6 py-4">{{ li.x_link }}</td>
                <td class="px-6 py-4">{{ li.web_site }}</td>
                <td class="px-6 py-4 grid grid-flow-col col-span-2">
                  <button
                    v-on:click="deleteOrganizer(li.id)"
                    class="rounded border border-red-600 p-2 mx-1 text-center"
                  >
                    <i class="fas fa-trash text-red-600"></i>
                  </button>
                  <button
                    class="rounded border mx-1 text-center border-yellow-500 p-2"
                    v-on:click="GetOrganize(li.id)"
                  >
                    <i class="fas fa-edit text-yellow-400"></i>
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
  name: "Shepherds",
  setup() {
    const Toast = createToaster({});
    return {
      Toast,
    };
  },
  data() {
    return {
      form: {
        name: "",
        face_link: "",
        x_link: "",
        web_site: "",
        pic: "",
        type: "",
      },
      list: [],
      id_update: null,
    };
  },
  methods: {
    onChangeimg() {
      this.form.pic = this.$refs.file.files[0];
      console.log(this.form.pic);
    },
    onSubmitForm() {
      const form = new FormData();
      form.append("name", this.form.name);
      form.append("face_link", this.form.face_link);
      form.append("x_link", this.form.x_link);
      form.append("web_site", this.form.web_site);
      form.append("type", this.form.type);
      form.append("pic", this.form.pic);

      axios
        .post("/api/create/shepherds/", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.form.name = "";
          this.form.face_link = "";
          this.form.x_link = "";
          this.form.web_site = "";
          this.form.pic = "";
          this.form.type = '';
          form.forEach(function (val, key, fD) {
            form.delete(key);
          });
          document.getElementById("myForm").reset();
          this.Toast.success("تم الحفظ بنجاح");
          this.list.unshift(res.data.data);
        })
        .catch((res) => {
          this.Toast.error("حصل خطاء في العملية");
        });
    },
    GetOrganizes() {
      axios.get("/api/get/shepherds/").then((res) => {
        this.list = res.data.data;
      });
    },
    GetOrganize(id) {
      axios.get(`/api/get/shepherd/${id}`).then((res) => {
        var data = res.data.data;
        this.id_update = data.id;
        this.form.name = data.name;
        this.form.face_link = data.face_link;
        this.form.x_link = data.x_link;
        this.form.web_site = data.web_site;
        this.form.type = data.type
      });
    },
    onSubmitUpdateForm() {
      const form = new FormData();
      form.append("name", this.form.name);
      form.append("face_link", this.form.face_link);
      form.append("x_link", this.form.x_link);
      form.append("web_site", this.form.web_site);
      form.append("type", this.form.type);
      form.append("pic", this.form.pic);

      axios
        .post(`/api/update/shepherds/${this.id_update}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.form.name = "";
          this.form.face_link = "";
          this.form.x_link = "";
          this.form.web_site = "";
          this.form.pic = "";
          this.form.type = '';
          this.id_update = null;
          form.forEach(function (val, key, fD) {
            form.delete(key);
          });
          document.getElementById("myForm").reset();
          this.GetOrganizes();
          this.Toast.success("تم الحفظ بنجاح");
        })
        .catch((res) => {
          this.Toast.error("حصل خطاء في العملية");
        });
    },
    submit(id) {
      if (id == null) {
        this.onSubmitForm();
      } else {
        this.onSubmitUpdateForm(id);
      }
    },
    deleteOrganizer(id) {
      axios.delete(`/api/delete/shepherds/${id}`).then((res) => {
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
