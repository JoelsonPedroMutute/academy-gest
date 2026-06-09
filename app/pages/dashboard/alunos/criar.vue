<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  curso: '',
  semestre: '',
  status: 'Ativo'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Aluno criado com sucesso!' })
  router.push('/dashboard/alunos')
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/alunos" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Novo Aluno</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__group">
          <label for="nome" class="form__label">Nome completo</label>
          <input id="nome" v-model="form.nome" type="text" class="form__input" placeholder="Digite o nome completo" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="email" class="form__label">E-mail</label>
            <input id="email" v-model="form.email" type="email" class="form__input" placeholder="Digite o e-mail" required />
          </div>
          <div class="form__group">
            <label for="telefone" class="form__label">Telefone</label>
            <input id="telefone" v-model="form.telefone" type="text" class="form__input" placeholder="(00) 00000-0000" required />
          </div>
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

        <div class="form__actions">
          <NuxtLink to="/dashboard/alunos" class="form__button form__button--secondary">
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
