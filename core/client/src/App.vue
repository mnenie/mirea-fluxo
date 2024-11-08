<template>
  <component :is="$route.meta.layout">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </component>
</template>
