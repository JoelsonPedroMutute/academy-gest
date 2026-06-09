<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  nome: '',
  cargaHoraria: '',
  status: 'Ativo'
})

const handleSubmit = () => {
  $swal.toast.fire({ icon: 'success', title: 'Disciplina criada com sucesso!' })
  router.push('/dashboard/disciplinas')
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/disciplinas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Disciplina</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="nome" class="form__label">Nome da Disciplina</label>
            <input id="nome" v-model="form.nome" type="text" class="form__input" placeholder="Digite o nome da disciplina" required />
          </div>
          <div class="form__group">
            <label for="cargaHoraria" class="form__label">Carga Horária</label>
            <input id="cargaHoraria" v-model="form.cargaHoraria" type="text" class="form__input" placeholder="Ex: 60h" required />
          </div>
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/disciplinas" class="form__button form__button--secondary">
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
