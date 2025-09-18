/// <reference types="vite/client" />

// Declare Vue Single File Components so TypeScript understands .vue imports
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}