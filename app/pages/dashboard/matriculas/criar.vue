<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  aluno: '',
  turma: '',
  curso: '',
  status: 'Ativa'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Matrícula criada com sucesso!' })
  router.push('/dashboard/matriculas')
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/matriculas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Matrícula</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__group">
          <label for="aluno" class="form__label">Aluno</label>
          <input id="aluno" v-model="form.aluno" type="text" class="form__input" placeholder="Digite o nome do aluno" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="turma" class="form__label">Turma</label>
            <select id="turma" v-model="form.turma" class="form__select" required>
              <option value="">Selecione uma turma</option>
              <option>Turma A</option>
              <option>Turma B</option>
              <option>Turma C</option>
            </select>
          </div>
          <div class="form__group">
            <label for="curso" class="form__label">Curso</label>
            <select id="curso" v-model="form.curso" class="form__select" required>
              <option value="">Selecione um curso</option>
              <option>Jornalismo</option>
              <option>Comunicação Social</option>
              <option>Técnico de Informática</option>
            </select>
          </div>
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/matriculas" class="form__button form__button--secondary">
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
