<template>
  <section class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <!-- Aquí luego puedes meter el logo -->
      <img src="../assets/geckodot.svg" alt="Logo Infitech" class="img-fluid d-block mx-auto mb-4" style="max-width: 100px;" />

      <h2 class="mb-4 text-center">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>

      <!-- Mensaje de error -->
      <p v-if="errorMsg" class="mt-3 text-danger text-center">
        {{ errorMsg }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../services/sessionService";
import type { ApiError } from '../types/types'
import { useRouter } from 'vue-router';

const errorMsg = ref<ApiError | null>(null)
const router = useRouter()
const email = ref("")
const password = ref("")


async function handleLogin() {
  try {
    const { user, token } = await login(email.value, password.value)

    // Guardar token en localStorage
    localStorage.setItem("token", token)

    // (opcional) Guardar user en localStorage o store
    localStorage.setItem("user", JSON.stringify(user))

    // Redirigir al listado de usuarios tras login
    router.push("/")
  } catch (error: any) {
    errorMsg.value = error.message || "Error al iniciar sesión"
  }
}

</script>