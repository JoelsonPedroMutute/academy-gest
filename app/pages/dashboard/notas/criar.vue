<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  aluno: '',
  disciplina: '',
  turma: '',
  nota1: '',
  nota2: '',
  status: 'Aprovado'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Nota criada com sucesso!' })
  router.push('/dashboard/notas')
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
            <label for="aluno" class="form__label">Aluno</label>
            <input id="aluno" v-model="form.aluno" type="text" class="form__input" required />
          </div>
          <div class="form__group">
            <label for="disciplina" class="form__label">Disciplina</label>
            <input id="disciplina" v-model="form.disciplina" type="text" class="form__input" required />
          </div>
        </div>

        <div class="form__group">
          <label for="turma" class="form__label">Turma</label>
          <select id="turma" v-model="form.turma" class="form__select" required>
            <option value="">Selecione uma turma</option>
            <option>Turma A</option>
            <option>Turma B</option>
            <option>Turma C</option>
          </select>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="nota1" class="form__label">Nota 1</label>
            <input id="nota1" v-model="form.nota1" type="number" step="0.1" class="form__input" required />
          </div>
          <div class="form__group">
            <label for="nota2" class="form__label">Nota 2</label>
            <input id="nota2" v-model="form.nota2" type="number" step="0.1" class="form__input" required />
          </div>
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
