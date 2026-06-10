<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const { user } = useAuth()

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).slice(0, 1).join('').toUpperCase()
}

const saveEdit = async () => {
  try {
    await useIFetch('/auth/profile', {
      method: 'PUT',
      body: {
        name: user.value.name,
        email: user.value.email,
      }
    })
    $swal.toast.fire({ icon: 'success', title: 'Perfil atualizado com sucesso!' })
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao atualizar perfil!' })
  }
}
</script>

<template>
  <div class="perfil-page">
    <div class="perfil-page__header">
      <h1 class="perfil-page__title">Meu Perfil</h1>
      <p class="perfil-page__subtitle">Gerencie suas informações pessoais</p>
    </div>

    <div class="perfil-card">
      <div class="perfil-card__header">
        <div class="perfil-card__avatar">
          {{ getInitials(user?.name) }}
        </div>
        <div class="perfil-card__info">
          <h2 class="perfil-card__name">{{ user?.name || 'Usuário' }}</h2>
          <p class="perfil-card__role">{{ user?.role || 'Usuário' }}</p>
        </div>
      </div>

      <form @submit.prevent="saveEdit" class="perfil-form">
        <div class="perfil-form__row">
          <div class="perfil-form__group">
            <label class="perfil-form__label">Nome completo</label>
            <input v-model="user.name" type="text" class="perfil-form__input" required />
          </div>
          <div class="perfil-form__group">
            <label class="perfil-form__label">Email</label>
            <input v-model="user.email" type="email" class="perfil-form__input" required />
          </div>
        </div>

        <div class="perfil-form__actions">
          <button type="submit" class="perfil-form__btn perfil-form__btn--primary">
            <i class="ti ti-device-floppy"></i>
            Salvar alterações
          </button>
          <button type="button" class="perfil-form__btn perfil-form__btn--secondary">
            <i class="ti ti-lock"></i>
            Alterar senha
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass">
@use '~/assets/sass/variables' as *

.perfil-page
  padding: $spacing-2xl

  &__header
    margin-bottom: $spacing-2xl

  &__title
    font-size: 2rem
    font-weight: 800
    color: $gray-900
    margin: 0 0 $spacing-sm

  &__subtitle
    font-size: 1rem
    color: $gray-500
    margin: 0

.perfil-card
  background: $white
  border-radius: $radius-xl
  border: 1px solid $gray-200
  box-shadow: $shadow-sm
  padding: $spacing-3xl

  &__header
    display: flex
    align-items: center
    gap: $spacing-xl
    padding-bottom: $spacing-xl
    border-bottom: 1px solid $gray-200
    margin-bottom: $spacing-2xl

  &__avatar
    width: 100px
    height: 100px
    border-radius: 50%
    background: linear-gradient(135deg, $red, $red-dark)
    display: flex
    align-items: center
    justify-content: center
    color: $white
    font-size: 2.5rem
    font-weight: 800

  &__name
    font-size: 1.5rem
    font-weight: 800
    color: $gray-900
    margin: 0 0 $spacing-xs

  &__role
    font-size: 1rem
    color: $gray-500
    margin: 0

.perfil-form
  &__row
    display: grid
    grid-template-columns: 1fr 1fr
    gap: $spacing-xl
    margin-bottom: $spacing-xl

  &__group
    display: flex
    flex-direction: column
    gap: $spacing-sm

  &__label
    font-size: 0.875rem
    font-weight: 600
    color: $gray-700

  &__input
    width: 100%
    padding: $spacing-md $spacing-lg
    border: 1px solid $gray-200
    border-radius: $radius-md
    font-size: 1rem
    color: $gray-900
    background: $gray-50
    transition: border-color 0.15s, background 0.15s

    &:focus
      outline: none
      border-color: $red
      background: $white

  &__actions
    display: flex
    gap: $spacing-md
    margin-top: $spacing-2xl

  &__btn
    display: flex
    align-items: center
    gap: $spacing-sm
    padding: $spacing-md $spacing-xl
    border: none
    border-radius: $radius-md
    font-size: 1rem
    font-weight: 700
    cursor: pointer
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s

    i
      font-size: 1.25rem

    &--primary
      background: $red
      color: $white
      box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2)

      &:hover
        background: $red-dark
        transform: translateY(-1px)
        box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3)

    &--secondary
      background: $gray-100
      color: $gray-700

      &:hover
        background: $gray-200
</style>
