<template>
  <div>
    <h1>Infitech</h1>
    <h2>Bienvenido al sistema de gestión de usuarios</h2>
    <button @click="goToOther">Listar usuarios</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goToOther() {
  router.push('/other')
}
</script>

<style scoped>

div {
  margin-top: 50px;
}
h1 {
  color: #1edc87;
  margin-bottom: 20px;
}

h2 {
  color: white;
  margin-bottom: 40px; /* más espacio hasta el botón */
}
button{
  background-color: #18c477;
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
}
button:hover{
  background-color: #1ce085;
}
</style>