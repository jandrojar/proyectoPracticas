<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <!-- Botón hamburguesa -->
        <button class="btn btn-outline-light me-2" @click="open = !open">
          ☰
        </button>
        <!-- Logo / nombre -->
        <a class="navbar-brand" href="#">Infitech</a>
      </nav>
    </header>

    <aside :class="['bg-light', 'border-end', 'position-fixed', 'top-0', 'bottom-0', open ? 'd-block' : 'd-none']" style="width: 150px; padding-top: 56px; left: 0; z-index: 1000;">
      <nav class="p-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="open = false">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/other" @click="open = false">Other</RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Aquí es donde se pintan las vistas -->
    <main class="container mt-4" :style="{ marginLeft: open ? '250px' : '0', paddingTop: '56px' }">
      <slot />
    </main>
  </div>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
  const open = ref(false)
</script>