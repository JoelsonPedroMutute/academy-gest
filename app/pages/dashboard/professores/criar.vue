<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  specialty: '',
  birth_date: ''
})

const handleSubmit = async () => {
  try {
    await useIFetch('admin/teachers', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Professor criado com sucesso!' })
    router.push('/dashboard/professores')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar professor' })
  }
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
          <label for="name" class="form__label">Nome completo</label>
          <input id="name" v-model="form.name" type="text" class="form__input" placeholder="Digite o nome completo" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="email" class="form__label">E-mail</label>
            <input id="email" v-model="form.email" type="email" class="form__input" placeholder="Digite o e-mail" required />
          </div>
          <div class="form__group">
            <label for="phone" class="form__label">Telefone</label>
            <input id="phone" v-model="form.phone" type="text" class="form__input" placeholder="Digite o telefone" />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="specialty" class="form__label">Especialidade</label>
            <input id="specialty" v-model="form.specialty" type="text" class="form__input" placeholder="Digite a especialidade" />
          </div>
          <div class="form__group">
            <label for="birth_date" class="form__label">Data de Nascimento</label>
            <input id="birth_date" v-model="form.birth_date" type="date" class="form__input" placeholder="Selecione a data de nascimento" />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="password" class="form__label">Senha</label>
            <input id="password" v-model="form.password" type="password" class="form__input" placeholder="Digite a senha" required minlength="6" />
          </div>
          <div class="form__group">
            <label for="password_confirmation" class="form__label">Confirmação de Senha</label>
            <input id="password_confirmation" v-model="form.password_confirmation" type="password" class="form__input" placeholder="Confirme a senha" required minlength="6" />
          </div>
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

<style lang="sass">
// Estilos globais já estão no style.sass
</style>
