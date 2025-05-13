<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Lista from './components/Lista.vue'
import Registro from './components/Registro.vue'
import { ref } from 'vue'

const control = ref(false)

const cambiarComponente = () => {
  control.value = !control.value
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Gestión de clientes" :cambiar="cambiarComponente"/>
    </div>
  </header>

  <main>
    <Lista  v-if="!control"/>
    <Registro :cambiar="cambiarComponente"  v-else/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
