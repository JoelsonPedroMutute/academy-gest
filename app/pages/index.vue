<script setup>
definePageMeta({
  middleware: "auth",
});

await navigateTo("/dashboard");
</script>

<template></template>