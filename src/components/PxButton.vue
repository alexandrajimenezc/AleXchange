<template>
  <button
    @click="buttonClick"
    class="bg-transparent hover:bg-red-500 text-red-600 font-semibold
          hover:text-white py-2 px-2 border border-red-500
          hover:border-transparent rounded"
  >
    <beat-loader :loading="isLoading" :color="'#f56565'" :size="8" />
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  name: 'PxButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      //nombre del evento personalizado
      //una vez defina el evento hay que usar la direcctiva v-on para manejar el evento
      //v-on puede cambiarse por el @
      this.$emit('custom-click')
    }
  }
}
</script>
