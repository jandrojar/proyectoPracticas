<template> <!--Esto está en el body de index.html -->
  <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
  </div>
    <UserTable v-else-if="(users.length >0)" :users="users"/>
    <div v-else >
      Cargando usuarios...
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchUsers } from '../services/userService'
import type { User } from '../types/types'
import type { ApiError } from '../types/types'
import UserTable from '../components/UserTable.vue'

const users = ref<User[]>([])
const errorMsg = ref<ApiError | null>(null)

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