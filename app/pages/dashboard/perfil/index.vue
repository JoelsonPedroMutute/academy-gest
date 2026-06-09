<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const perfil = ref({
  nome: "Administrador",
  email: "admin@academia.edu",
  telefone: "(11) 98765-4321",
  cargo: "Coordenador"
})

const isEditing = ref(false)
const editForm = ref({ ...perfil.value })

const startEdit = () => {
  editForm.value = { ...perfil.value }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editForm.value = { ...perfil.value }
}

const saveEdit = () => {
  perfil.value = { ...editForm.value }
  isEditing.value = false
  $swal.toast.fire({ icon: 'success', title: 'Perfil atualizado com sucesso!' })
}
</script>

<template>
  <div class="perfil">
    <div class="perfil__card">
      <div class="perfil__avatar">
        <i class="ti ti-user-circle"></i>
      </div>
      
      <div v-if="!isEditing">
        <h1 class="perfil__nome">{{ perfil.nome }}</h1>
        <p class="perfil__cargo">{{ perfil.cargo }}</p>
        
        <div class="perfil__info">
          <div class="perfil__info-item">
            <i class="ti ti-mail"></i>
            <span>{{ perfil.email }}</span>
          </div>
          <div class="perfil__info-item">
            <i class="ti ti-phone"></i>
            <span>{{ perfil.telefone }}</span>
          </div>
        </div>
        
        <button class="perfil__btn-editar" @click="startEdit">
          <i class="ti ti-edit"></i>
          Editar Perfil
        </button>
      </div>
      
      <div v-else>
        <form @submit.prevent="saveEdit" class="form">
          <div class="form__group">
            <label for="edit-nome" class="form__label">Nome</label>
            <input id="edit-nome" v-model="editForm.nome" type="text" class="form__input" placeholder="Digite o nome" required />
          </div>
          
          <div class="form__group">
            <label for="edit-email" class="form__label">E-mail</label>
            <input id="edit-email" v-model="editForm.email" type="email" class="form__input" placeholder="Digite o e-mail" required />
          </div>
          
          <div class="form__group">
            <label for="edit-telefone" class="form__label">Telefone</label>
            <input id="edit-telefone" v-model="editForm.telefone" type="text" class="form__input" placeholder="(00) 00000-0000" required />
          </div>
          
          <div class="form__group">
            <label for="edit-cargo" class="form__label">Cargo</label>
            <input id="edit-cargo" v-model="editForm.cargo" type="text" class="form__input" placeholder="Digite o cargo" required />
          </div>
          
          <div class="form__actions">
            <button type="button" @click="cancelEdit" class="form__button form__button--secondary">Cancelar</button>
            <button type="submit" class="form__button form__button--primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@use '~/assets/sass/variables' as *

.perfil
  display: flex
  justify-content: center
  padding: $spacing-xl

  &__card
    background: $white
    border-radius: $radius-lg
    border: 1px solid $gray-200
    box-shadow: $shadow-sm
    padding: $spacing-3xl
    max-width: 500px
    width: 100%
    text-align: center

  &__avatar
    width: 120px
    height: 120px
    margin: 0 auto $spacing-xl
    background: linear-gradient(135deg, $red, $red-dark)
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center

    i
      font-size: 4rem
      color: $white

  &__nome
    font-size: 2rem
    font-weight: 800
    color: $gray-900
    margin: 0 0 $spacing-xs

  &__cargo
    font-size: 1.125rem
    color: $gray-500
    margin: 0 0 $spacing-2xl

  &__info
    margin-bottom: $spacing-2xl
    padding: $spacing-xl 0
    border-top: 1px solid $gray-200
    border-bottom: 1px solid $gray-200
    display: flex
    flex-direction: column
    gap: $spacing-md

  &__info-item
    display: flex
    align-items: center
    gap: $spacing-md
    justify-content: center
    color: $gray-700

    i
      color: $red
      font-size: 1.25rem

  &__btn-editar
    display: inline-flex
    align-items: center
    gap: $spacing-sm
    padding: $spacing-lg $spacing-2xl
    background: $red
    color: $white
    border: none
    border-radius: $radius-md
    font-size: 1rem
    font-weight: 700
    cursor: pointer
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s
    box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2)

    i
      font-size: 1.25rem

    &:hover
      background: $red-dark
      transform: translateY(-1px)
      box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3)
</style>
