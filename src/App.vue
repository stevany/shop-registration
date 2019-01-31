<template>
  <div id="app">
   <v-app>
    <router-view/>
    <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>&copy; {{'Maria Stevany ' + new Date().getFullYear() }}</div>
  </v-footer>
   </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
