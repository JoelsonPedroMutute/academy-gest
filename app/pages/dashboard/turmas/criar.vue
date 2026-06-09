<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  nome: '',
  curso: '',
  semestre: '',
  professor: '',
  status: 'Ativo'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Turma criada com sucesso!' })
  router.push('/dashboard/turmas')
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
          <label for="nome" class="form__label">Nome da Turma</label>
          <input id="nome" v-model="form.nome" type="text" class="form__input" placeholder="Digite o nome da turma" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="curso" class="form__label">Curso</label>
            <select id="curso" v-model="form.curso" class="form__select" required>
              <option value="">Selecione um curso</option>
              <option>Jornalismo</option>
              <option>Comunicação Social</option>
              <option>Técnico de Informática</option>
            </select>
          </div>
          <div class="form__group">
            <label for="semestre" class="form__label">Semestre</label>
            <select id="semestre" v-model="form.semestre" class="form__select" required>
              <option value="">Selecione um semestre</option>
              <option>1º Semestre</option>
              <option>2º Semestre</option>
              <option>3º Semestre</option>
              <option>4º Semestre</option>
            </select>
          </div>
        </div>

        <div class="form__group">
          <label for="professor" class="form__label">Professor</label>
          <input id="professor" v-model="form.professor" type="text" class="form__input" placeholder="Digite o nome do professor" required />
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
