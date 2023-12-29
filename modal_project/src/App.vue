<template>
  <h1>{{ title }}</h1>
  <p>Welcome!</p>
  <input type="text" ref="inputref">
  <button @click="handleClick">Button</button>
  <Modal
    :header="title" 
    desc="My name is Jeff"
    theme="emphasize"
  ></Modal>
</template>

<script>
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: { Modal },
  data() {
    return {
      title: 'My First Vue App',
      posts: [
        {id: 1, author: 'RW', title: 'first'},
        {id: 2, author: 'RW', title: 'ggmu'}
      ]
    }
  },
  methods: {
    handleClick() {
      this.$refs.inputref.classList.add('active')
      this.$refs.inputref.focus()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
