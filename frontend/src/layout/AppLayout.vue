<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <!-- Botón hamburguesa -->
        <button class="btn btn-outline-light me-2":class="{ 'btn-centered': open }"@click="open = !open">
          ☰
        </button>
        <!-- Logo / nombre -->
        <a class="navbar-brand ms-auto" href="#">Infitech</a>
      </nav>
    </header>

    <aside :class="['sidebar', open ? 'd-block' : 'd-none']">
      <nav class="p-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="open = false">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/users" @click="open = false">Users</RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Aquí es donde se pintan las vistas -->
    <main :class="{ 'with-sidebar': open }">
      <slot />
    </main>
  </div>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
  const open = ref(false)
</script>

<style scoped>
.btn {
  font-size: 1.5rem;
  line-height: 1;
}

.btn-centered {
  position: absolute;
  left: 100px; /* 200px / 2 → mitad del sidebar */
  transform: translateX(-50%);
}

.sidebar {
  position: fixed;
  top: 56px; /* Altura del navbar */
  left: 0;
  width: 200px;
  height: calc(100% - 56px);
  background-color: #343a40; /* Color de fondo del sidebar */
  color: white;
  z-index: 1000;
}
.sidebar .nav-link {
  color: white;
}
.sidebar .nav-link:hover {
  background-color: #495057;
}
main {
  padding-top: 56px;
  transition: margin-left 0.3s ease;
}

.with-sidebar {
  margin-left: 200px;
}

@media (max-width: 768px) {
  main {
    margin-left: 0;
  }
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
}
</style>