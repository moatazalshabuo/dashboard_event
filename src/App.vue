<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="fullPage" />
  <nav
    v-if="this.$route.path != '/login'"
    id="header"
    class="bg-white fixed w-full z-10 top-0 shadow"
  >
    <div
      class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"
    >
      <div class="w-1/2 pr-0">
        <div class="flex relative inline-block float-left">
          <div class="relative text-sm">
            <button id="userButton" class="flex items-center focus:outline-none mr-3">
              <span class="hidden md:inline-block"
                >مرحبا {{ this.dataStoreUser.user.username }}</span
              >
              <svg
                class="pl-2 h-2"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 129 129"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                enable-background="new 0 0 129 129"
              >
                <g>
                  <path
                    d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
                  />
                </g>
              </svg>
            </button>
            <div
              id="userMenu"
              class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
            >
              <ul class="list-reset">
                <li>
                  <a
                    href="#"
                    class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                    >My account</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                    >Notifications</a
                  >
                </li>
                <li>
                  <hr class="border-t mx-2 border-gray-400" />
                </li>
                <li>
                  <a
                    href="#"
                    class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
            >
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0">
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/"
              :class="this.$route.path == '/' ? 'text-pink-600 border-pink-600' : 'null'"
              class="block py-1 md:py-3 pl-1 align-middle no-underline hover:text-gray-900 border-b-2 hover:border-orange-600"
            >
              <i class="fas fa-home fa-fw mr-3 text-pink-600"></i
              ><span class="pb-1 md:pb-0 text-sm">الرئيسية</span>
            </router-link>
          </li>
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/setting"
              :class="{ 'text-pink-600 border-pink-600': this.$route.path == '/setting' }"
              class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500"
            >
              <i class="fas fa-tasks fa-fw mr-3"></i
              ><span class="pb-1 md:pb-0 text-sm">بيانات الحدث</span>
            </router-link>
          </li>
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/organize"
              :class="{
                'text-purple-600  border-purple-600': this.$route.path == '/organize',
              }"
              class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
            >
              <i class="fa fa-envelope fa-fw mr-3"></i
              ><span class="pb-1 md:pb-0 text-sm">المنظمين</span>
            </router-link>
          </li>
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/shepherds"
              :class="{
                'text-green-600  border-green-600': this.$route.path == '/shepherds',
              }"
              class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500"
            >
              <i class="fas fa-chart-area fa-fw mr-3"></i
              ><span class="pb-1 md:pb-0 text-sm">الرعاة</span>
            </router-link>
          </li>
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/schedule"
              :class="{
                'text-blue-500 border-blue-500': this.$route.path == '/schedule',
              }"
              class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-blue-500"
            >
              <i class="fas fa-chart-area fa-fw mr-3"></i
              ><span class="pb-1 md:pb-0 text-sm">جدول المواعيد</span>
            </router-link>
          </li>
          <li class="mr-6 my-2 md:my-0">
            <router-link
              to="/speakers"
              :class="{
                'text-yellow-600  border-yellow-600': this.$route.path == '/speakers',
              }"
              class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-yellow-500"
            >
              <i class="fas fa-chart-area fa-fw mr-3"></i
              ><span class="pb-1 md:pb-0 text-sm">المتحدثين</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container w-full mx-auto pt-24">
    <router-view />
    <Not404 v-if="this.$route.matched.length == 0"></Not404>
  </div>
</template>
<script>
import { UserStored } from "./store";
import Loading from "vue-loading-overlay";
import Not404 from "@/components/Not404.vue";
export default {
  name: "app",
  setup() {
    const dataStoreUser = UserStored();
    return {
      dataStoreUser,
    };
  },
  data() {
    return {
      isLoading: true,
      fullPage: true,
    };
  },
  components: {
    Loading,
    Not404
  },
  beforeCreate() {
    this.dataStoreUser.initUser();
    if (this.dataStoreUser.user.is_auth) {
      if (this.$route.path == "/login") {
        console.log("someting1");
        this.$router.push("/");
      }
    } else {
      if (this.$route.path != "/login") {
        this.$router.push("login");
        console.log("someting2");
      }
    }
    // this.isLoading = true;
  },
  beforeUpdate() {
    if (this.dataStoreUser.user.is_auth) {
      if (this.$route.path == "/login") this.$router.push("");
    } else {
      if (this.$route.path != "/login") this.$router.push("login");
    }
    
  },updated(){
    
  },
  created() {
    let htmlEl = document.querySelector("html");
    htmlEl.setAttribute("dir", "rtl");
    htmlEl.setAttribute("lang", "fa");
    this.isLoading = false;
  },
};
</script>
