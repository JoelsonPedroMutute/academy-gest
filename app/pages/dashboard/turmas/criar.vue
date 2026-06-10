<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  name: '',
  course_id: null,
  academic_year: null,
  semester: null,
  capacity: null,
  shift: ''
})

const handleSubmit = async () => {
  try {
    await useIFetch('admin/classes', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Turma criada com sucesso!' })
    router.push('/dashboard/turmas')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar turma' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/turmas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Turma</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__group">
          <label for="name" class="form__label">Nome da Turma</label>
          <input id="name" v-model="form.name" type="text" class="form__input" placeholder="Digite o nome da turma" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="academic_year" class="form__label">Ano Letivo</label>
            <input id="academic_year" v-model.number="form.academic_year" type="number" min="2000" max="2100" class="form__input" placeholder="Ex: 2024" />
          </div>
          <div class="form__group">
            <label for="semester" class="form__label">Semestre</label>
            <select id="semester" v-model.number="form.semester" class="form__select">
              <option :value="null">Selecione um semestre</option>
              <option :value="1">1º Semestre</option>
              <option :value="2">2º Semestre</option>
            </select>
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="capacity" class="form__label">Capacidade</label>
            <input id="capacity" v-model.number="form.capacity" type="number" min="1" class="form__input" placeholder="Capacidade máxima" />
          </div>
          <div class="form__group">
            <label for="shift" class="form__label">Turno</label>
            <select id="shift" v-model="form.shift" class="form__select">
              <option value="">Selecione um turno</option>
              <option value="morning">Manhã</option>
              <option value="afternoon">Tarde</option>
              <option value="night">Noite</option>
            </select>
          </div>
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/turmas" class="form__button form__button--secondary">
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
