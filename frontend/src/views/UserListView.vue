<template>
  <section class="users">
    <!-- Edit success message -->
    <div v-if="route.query.success" class="alert alert-success" role="alert">
      Usuario actualizado correctamente
    </div>
    <!-- Error messages -->
    <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
    </div>

    <!-- Users table -->
    <div v-else-if="users.length > 0">
      <UserTable :users="users" @delete-user="handleDelete" />

      <!-- Create button -->
      <div class="mt-3">
        <RouterLink to="/users/create" class="btn btn-primary">
          Crear usuario
        </RouterLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-else>
      Cargando usuarios...
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchUsers, deleteUser } from '../services/userService'
import type { User } from '../types/types'
import type { ApiError } from '../types/types'
import UserTable from '../components/UserTable.vue'
import { useRoute ,RouterLink } from 'vue-router'

const users = ref<User[]>([])
const errorMsg = ref<ApiError | null>(null)
const route = useRoute()

async function handleDelete(id: string) {
  if (!confirm('¿Seguro que quieres eliminar este usuario?')) return
  try {
    await deleteUser(id)
    // Update after deletion
    users.value = await fetchUsers()
  } catch (error: any) {
    errorMsg.value = error.message
  }
}

onMounted(async () => {
  try{
    users.value = await fetchUsers()
  }catch(error: any){
    errorMsg.value = error.message
  }

})
</script>

<style scoped>
.table th,
.table td {
  padding-inline: 2rem;
}
</style>