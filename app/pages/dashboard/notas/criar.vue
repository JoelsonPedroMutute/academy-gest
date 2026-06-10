<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  student_id: null,
  subject_id: null,
  class_id: null,
  trimester_exam: null,
  semester_exam: null,
  final_exam: null
})

const handleSubmit = async () => {
  try {
    await useIFetch('admin/grades', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Nota criada com sucesso!' })
    router.push('/dashboard/notas')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar nota' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/notas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Nota</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="trimester_exam" class="form__label">Nota Trimestre</label>
            <input id="trimester_exam" v-model.number="form.trimester_exam" type="number" step="0.1" class="form__input" placeholder="Ex: 7.5" />
          </div>
          <div class="form__group">
            <label for="semester_exam" class="form__label">Nota Semestre</label>
            <input id="semester_exam" v-model.number="form.semester_exam" type="number" step="0.1" class="form__input" placeholder="Ex: 8.0" />
          </div>
        </div>
        <div class="form__group">
          <label for="final_exam" class="form__label">Nota Final</label>
          <input id="final_exam" v-model.number="form.final_exam" type="number" step="0.1" class="form__input" placeholder="Ex: 8.5" />
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/notas" class="form__button form__button--secondary">
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
