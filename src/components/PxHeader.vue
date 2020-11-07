<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-red-300 p-6">
        <div class="flex items-center flex-shrink-0 text-yellow-900 mr-6">
          <px-icon class="mr-2" />
          <router-link
            :to="{ name: 'home' }"
            class=" mb-1 font-semibold text-xl tracking-tight hover:text-white"
            >AleXchange</router-link
          >
          <router-link
            to="/about"
            class="ml-4 text-small text-yellow-900 hover:text-white"
          >
            About
          </router-link>
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow  ">
            <router-link
              v-for="l in links"
              :key="l.title"
              :to="l.to"
              class="block mt-4 lg:inline-block lg:mt-0 text-yellow-900 hover:text-white mr-4"
              >{{ l.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>
<script>
import PxIcon from '@/components/PxIcon'

export default {
  name: 'PxHeader',
  components: { PxIcon },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>
