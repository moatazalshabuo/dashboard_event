<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="true"
   
    :is-full-page="fullPage"
  />
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        تسجيل الدخول الى لوحة التحكم
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" v-on:submit.prevent="this.submit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >اسم المستخدم</label
          >
          <div class="mt-2">
            <input
              id="email"
              type="text"
              autocomplete="username"
              required
              v-model="this.form.username"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >كلمة المرور</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                نسيت كلمة المرور ؟</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="this.form.password"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            تسجيل الدخول
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { UserStored } from "@/store";
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
import Loading from "vue-loading-overlay";
export default {
  name: "Login",
  setup() {
    const toast = createToaster({});
    const userdata = UserStored();
    return {
      toast,
      userdata,
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: [],
      isLoading: true,
      fullPage: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    submit() {
      if (this.form.username == "") {
        this.error.push("اسم المستخدم لايمكن ان يكون فارغ");
      }
      if (this.form.password == "") {
        this.error.push("كلمة المرور لايمكن ان يكون فارغ");
      }
      if (this.error.length == 0) {
        this.isLoading = true;
        axios
          .post("/api/token/", this.form)
          .then((res) => {
            this.userdata.setToken(res.data);
            // console.log(res.data)
            this.toast.success("تم تسجيل الدخول بنجاح !!");
            axios
              .get("/api/me/")
              .then((res) => {
                this.userdata.setuserInfo(res.data.user);
              })
              .catch((res) => {});
            this.isLoading = false;
          })
          .catch((res) => {
            this.toast.error("يوجد خطاء في تسجيل الدخول !!");
            this.isLoading = false;
          });
      }
    },
    loding() {
      this.isLoading = false;
    },
  },
  mounted() {
    this.loding();
  },
  beforeCreate(){
    if (this.userdata.user.is_auth) {
      
      if (this.$route.path == '/login'){
        console.log('someting1')
        this.$router.push("/");
      }
    } else {
      if (this.$route.path != "/login") {
        this.$router.push("login");
        console.log('someting2')
      }
  }
  }
};
</script>
