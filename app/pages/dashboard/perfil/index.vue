<script setup>
definePageMeta({
  layout: "default",
});

const user = {
  nome: "Administrador",
  email: "admin@academia.edu",
  telefone: "(11) 98765-4321",
  cargo: "Gestor Acadêmico",
  dataCadastro: "01/01/2024"
};

const handleSalvar = () => {
  console.log("Salvar perfil");
};

const handleAlterarSenha = () => {
  console.log("Alterar senha");
};
</script>

<template>
  <div class="perfil">
    <div class="perfil__head">
      <div>
        <h1 class="perfil__title">Meu Perfil</h1>
        <p class="perfil__subtitle">Gerencie suas informações pessoais</p>
      </div>
    </div>

    <div class="perfil__content">
      <div class="perfil__card">
        <div class="perfil__avatar-section">
          <div class="perfil__avatar">
            {{ user.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() }}
          </div>
          <div class="perfil__info-basic">
            <h2 class="perfil__nome">{{ user.nome }}</h2>
            <p class="perfil__cargo">{{ user.cargo }}</p>
          </div>
        </div>

        <div class="perfil__form">
          <div class="perfil__form-grid">
            <div class="perfil__form-group">
              <label class="perfil__label">Nome completo</label>
              <input type="text" class="perfil__input" :value="user.nome" />
            </div>
            <div class="perfil__form-group">
              <label class="perfil__label">Email</label>
              <input type="email" class="perfil__input" :value="user.email" />
            </div>
            <div class="perfil__form-group">
              <label class="perfil__label">Telefone</label>
              <input type="text" class="perfil__input" :value="user.telefone" />
            </div>
            <div class="perfil__form-group">
              <label class="perfil__label">Cargo</label>
              <input type="text" class="perfil__input" :value="user.cargo" disabled />
            </div>
            <div class="perfil__form-group">
              <label class="perfil__label">Data de cadastro</label>
              <input type="text" class="perfil__input" :value="user.dataCadastro" disabled />
            </div>
          </div>

          <div class="perfil__actions">
            <button class="perfil__btn perfil__btn--primary" @click="handleSalvar">
              <i class="ti ti-device-floppy"></i>
              Salvar alterações
            </button>
            <button class="perfil__btn perfil__btn--secondary" @click="handleAlterarSenha">
              <i class="ti ti-lock"></i>
              Alterar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
$red: #dc2626
$red-dark: #b91c1c

.perfil
    display: flex
    flex-direction: column
    gap: 2rem

    &__head
        display: flex
        align-items: flex-start
        justify-content: space-between
        gap: 1rem

    &__title
        font-size: 2rem
        font-weight: 800
        color: #0f172a
        margin: 0 0 0.5rem

    &__subtitle
        font-size: 1.125rem
        color: #64748b
        margin: 0

    &__content
        max-width: 900px

    &__card
        background: #fff
        border-radius: 16px
        border: 1px solid #e2e8f0
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
        padding: 2.5rem

    &__avatar-section
        display: flex
        align-items: center
        gap: 1.5rem
        padding-bottom: 2rem
        margin-bottom: 2rem
        border-bottom: 1px solid #e2e8f0

    &__avatar
        width: 120px
        height: 120px
        border-radius: 50%
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        font-size: 2.5rem
        font-weight: 800
        flex-shrink: 0

    &__info-basic
        display: flex
        flex-direction: column
        gap: 0.25rem

    &__nome
        font-size: 1.75rem
        font-weight: 700
        color: #0f172a
        margin: 0

    &__cargo
        font-size: 1.125rem
        color: #64748b
        margin: 0

    &__form
        display: flex
        flex-direction: column
        gap: 2rem

    &__form-grid
        display: grid
        grid-template-columns: repeat(2, 1fr)
        gap: 1.5rem

    &__form-group
        display: flex
        flex-direction: column
        gap: 0.5rem

    &__label
        font-size: 0.875rem
        font-weight: 600
        color: #374151

    &__input
        padding: 0.875rem 1.125rem
        border: 1px solid #e2e8f0
        border-radius: 12px
        font-size: 1rem
        color: #0f172a
        transition: border-color 0.15s, box-shadow 0.15s
        background: #fafafa

        &:focus
            outline: none
            border-color: $red
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1)
            background: #fff

        &:disabled
            background: #f3f4f6
            color: #9ca3af
            cursor: not-allowed

    &__actions
        display: flex
        gap: 1rem
        padding-top: 1rem

    &__btn
        display: flex
        align-items: center
        gap: 0.625rem
        padding: 0.875rem 1.5rem
        border: none
        border-radius: 12px
        font-size: 1rem
        font-weight: 600
        cursor: pointer
        transition: background 0.15s, transform 0.1s, box-shadow 0.15s

        i
            font-size: 1.125rem

        &--primary
            background: $red
            color: #fff
            box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2)

            &:hover
                background: $red-dark
                transform: translateY(-1px)
                box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3)

        &--secondary
            background: #f3f4f6
            color: #374151

            &:hover
                background: #e5e7eb
                transform: translateY(-1px)
</style>
