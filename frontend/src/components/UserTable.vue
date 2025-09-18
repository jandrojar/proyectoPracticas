<template>
<table class="table table-striped table-secondary table-hover table-bordered">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Edad</th>
      <th>Email</th>
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
        </tr>
      </tbody>
</table>
</template>

<script setup lang="ts">
import type { User } from '../types/types'

// Define the props for the component
defineProps<{
  users: User[]
}>()
</script>