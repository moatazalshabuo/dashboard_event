<template>
  <div class="home">
    <h1 class=" hover:text-yellow-300">
    Hello World!
    </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
