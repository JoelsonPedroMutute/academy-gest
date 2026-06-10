<script setup>
const { restaurarSessao, estaAutenticado } = useAuth();

onMounted(async () => {
  await restaurarSessao();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
