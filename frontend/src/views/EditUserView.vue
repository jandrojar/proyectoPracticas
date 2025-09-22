<template>
  <section class="container mt-4">

    <div v-if="route.query.success" class="alert alert-success" role="alert">
      Usuario creado correctamente
    </div>

    <h1 class="mb-4 text-light">Editar usuario</h1>

    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <!-- Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label text-light">Nombre</label>
        <input id="name" v-model="user.name" type="text" class="form-control" required />
      </div>

      <!-- Apellido -->
      <div class="mb-3">
        <label for="surname" class="form-label text-light">Apellido</label>
        <input id="surname" v-model="user.lastname" type="text" class="form-control" required />
      </div>

      <!-- Edad -->
      <div class="mb-3">
        <label for="age" class="form-label text-light">Edad</label>
        <input id="age" v-model.number="user.age" type="number" min="0" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label text-light">Email</label>
        <input id="email" v-model="user.email" type="email" class="form-control" required />
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <!-- Botones -->
      <div class="d-flex gap-2 justify-content-center mb-5 mt-4">
        <button type="submit" class="btn btn-primary">Actualizar</button>
        <RouterLink to="/users" class="btn btn-secondary">Cancelar</RouterLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { updateUser, findUserById } from '../services/userService'
import type { User, ApiError } from '../types/types'

const router = useRouter()
const route = useRoute()

const user = ref<Omit<User, 'id'>>({
  name: '',
  lastname: '',
  age: 0,
  email: ''
})

const errorMessage = ref<string>('')

// Cargar datos al entrar
onMounted(async () => {
  try {
    const id = route.params.id as string
    const existingUser = await findUserById(id)
    user.value = {
      name: existingUser.name,
      lastname: existingUser.lastname,
      age: existingUser.age,
      email: existingUser.email
    }
  } catch (err) {
    const apiError = err as ApiError
    console.error('Error al cargar usuario:', apiError)
    errorMessage.value = apiError.message
  }
})

async function submitForm(e: Event) {
  const form = e.target as HTMLFormElement
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }

  try {
    const id = route.params.id as string
    await updateUser(id, user.value)
    router.push({ path: '/users', query: { success: '1' } })
  } catch (err) {
    const apiError = err as ApiError
    console.error('Error al actualizar usuario:', apiError)
    errorMessage.value = apiError.message
  }
}
</script>
