<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  name: '',
  duration: null,
  description: ''
})

const handleSubmit = async () => {
  try {
    await useIFetch('admin/courses', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Curso criado com sucesso!' })
    router.push('/dashboard/cursos')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar curso' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/cursos" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Novo Curso</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__group">
          <label for="name" class="form__label">Nome do Curso</label>
          <input id="name" v-model="form.name" type="text" class="form__input" placeholder="Digite o nome do curso" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="duration" class="form__label">Duração (anos)</label>
            <input id="duration" v-model.number="form.duration" type="number" min="1" max="10" class="form__input" placeholder="Ex: 4" />
          </div>
        </div>

        <div class="form__group">
          <label for="description" class="form__label">Descrição</label>
          <textarea id="description" v-model="form.description" class="form__input" placeholder="Digite a descrição" rows="3" />
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/cursos" class="form__button form__button--secondary">
            Cancelar
          </NuxtLink>
          <button type="submit" class="form__button form__button--primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass">
// Estilos globais já estão no style.sass
</style>
