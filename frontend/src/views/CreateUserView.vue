<template>
  <section class="container mt-4">
    <h1 class="mb-4 text-light">Crear usuario</h1>

    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <!-- Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label text-light">Nombre</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <!-- Apellido -->
      <div class="mb-3">
        <label for="surname" class="form-label text-light">Apellido</label>
        <input
          id="surname"
          v-model="user.lastname"
          type="text"
          class="form-control"
          required
        />
      </div>

      <!-- Edad -->
      <div class="mb-3">
        <label for="age" class="form-label text-light">Edad</label>
        <input
          id="age"
          v-model.number="user.age"
          type="number"
          min="0"
          class="form-control"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label text-light">Email</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          class="form-control"
          required
        />
      </div>

      <!-- Botones -->
      <div class="d-flex gap-2 justify-content-center mb-5 mt-4">
        <button type="submit" class="btn btn-primary">
          Guardar
        </button>
        <RouterLink to="/users" class="btn btn-secondary">
          Cancelar
        </RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '../services/userService'
import type { User } from '../types/types'

const router = useRouter()

const user = ref<Omit<User, 'id'>>({
  name: '',
  lastname: '',
  age: 0,
  email: ''
})

async function submitForm(e: Event) {
  const form = e.target as HTMLFormElement
  if (!form.checkValidity()) {
    // Si el form no es válido, deja que el navegador muestre los mensajes
    form.reportValidity()
    return
  }

  try {
    const newUser = await createUser(user.value)
    router.push(`/users/${newUser.id}`)
  } catch (err) {
    console.error('Error al crear usuario:', err)
    alert('Error al crear usuario')
  }
}
</script>

<style scoped>

</style>