<template>
<table class="table table-striped table-secondary table-hover table-bordered">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Edad</th>
      <th>Email</th>
      <th>Acciones</th>
    </tr>
  </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.lastname }}</td>
          <td :style="{color: user.age > 40 ? 'red' : 'black'}">
            {{ user.age }}
          </td>
          <td>{{ user.email }}</td>
          <td>
          <button class="btn btn-danger btn-sm" @click="$emit('delete-user', user.id)">
            Eliminar
          </button>
          <RouterLink :to="`/users/${user.id}/edit`" class="btn btn-warning btn-sm ms-2">
            Editar
          </RouterLink>
        </td>
        </tr>
      </tbody>
</table>
</template>

<script setup lang="ts">
import type { User } from '../types/types'
import { RouterLink } from 'vue-router'

// Define the props for the component
defineProps<{
  users: User[]
}>()

// Define emits
defineEmits<{
  (e: 'delete-user', id: string): void
}>()
</script>