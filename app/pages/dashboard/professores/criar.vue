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
  disciplina: '',
  status: 'Ativo'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Professor criado com sucesso!' })
  router.push('/dashboard/professores')
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/professores" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Novo Professor</h1>
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

        <div class="form__group">
          <label for="disciplina" class="form__label">Disciplina</label>
          <input id="disciplina" v-model="form.disciplina" type="text" class="form__input" placeholder="Digite a disciplina" required />
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/professores" class="form__button form__button--secondary">
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
