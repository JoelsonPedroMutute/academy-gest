<script setup>
definePageMeta({
  layout: "auth",
});

const { login } = useAuth();
const router = useRouter();

const credencial = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const carregando = ref(false);
const erro = ref("");

const entrar = async () => {
  erro.value = "";
  carregando.value = true;

  try {
    const sucesso = await login(credencial.value.trim(), senha.value);
    if (sucesso) {
      await router.push("/dashboard");
    } else {
      erro.value = "Credenciais incorretas. Verifique e tente novamente.";
    }
  } finally {
    carregando.value = false;
  }
};
</script>

<template>
  <div class="login-card">
    <div class="login-card__header">
      <!-- <img src="/logo.png" alt="Metodista de Angola" class="login-card__logo" /> -->
      <h1 class="login-card__title">Portal Universitário</h1>
      <p class="login-card__subtitle">Acesse sua conta académica</p>
    </div>

    <form class="login-card__form" @submit.prevent="entrar">
      <div class="form-group">
        <label for="credencial" class="form-label">Usuário, Email ou BI</label>
        <div class="form-input-wrapper">
          <input
            id="credencial"
            v-model="credencial"
            type="text"
            class="form-input"
            placeholder="Digite nome do usuário, email ou BI"
            autocomplete="username"
            :disabled="carregando"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="senha" class="form-label">Senha</label>
        <div class="form-input-wrapper">
          <input
            id="senha"
            v-model="senha"
            :type="mostrarSenha ? 'text' : 'password'"
            class="form-input form-input--senha"
            placeholder="••••••••"
            autocomplete="current-password"
            :disabled="carregando"
            required
          />
          <button
            type="button"
            class="form-input-toggle"
            :aria-label="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'"
            @click="mostrarSenha = !mostrarSenha"
          >
            <i
              :class="mostrarSenha ? 'ti ti-eye-off' : 'ti ti-eye'"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>

      <p v-if="erro" class="login-card__erro" role="alert">
        <i class="ti ti-alert-circle" aria-hidden="true"></i>
        {{ erro }}
      </p>

      <button type="submit" class="btn-entrar" :disabled="carregando">
        <span v-if="!carregando">Entrar</span>
        <span v-else class="btn-entrar__loading">
          <i class="ti ti-loader-2" aria-hidden="true"></i>
          A entrar...
        </span>
      </button>
    </form>
  </div>
</template>

<style lang="sass">
.login-card
    background: #ffffff
    border-radius: 16px
    padding: 2.5rem 2rem
    width: 100%
    max-width: 420px
    position: relative
    z-index: 1
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08)

    &__header
        text-align: center
        margin-bottom: 2rem

    &__logo
        height: 96px
        width: auto
        margin-bottom: 1.25rem
        object-fit: contain

    &__title
        font-size: 1.375rem
        font-weight: 700
        color: #1a1a2e
        margin: 0 0 0.375rem

    &__subtitle
        font-size: 0.9rem
        color: #6b7280
        margin: 0

    &__form
        display: flex
        flex-direction: column
        gap: 1.25rem

    &__erro
        display: flex
        align-items: center
        gap: 0.5rem
        font-size: 0.875rem
        color: #dc2626
        background: #fef2f2
        border: 1px solid #fecaca
        border-radius: 8px
        padding: 0.625rem 0.875rem
        margin: 0

        i
            font-size: 16px
            flex-shrink: 0

.form-group
    display: flex
    flex-direction: column
    gap: 0.5rem

.form-label
    font-size: 0.875rem
    font-weight: 500
    color: #374151

.form-input-wrapper
    position: relative
    display: flex
    align-items: center

.form-input
    width: 100%
    padding: 0.7rem 1rem
    border: 1px solid #d1d5db
    border-radius: 8px
    font-size: 0.9375rem
    color: #111827
    background: #fff
    transition: border-color 0.15s, box-shadow 0.15s
    outline: none

    &::placeholder
        color: #9ca3af

    &:focus
        border-color: #c0392b
        box-shadow: 0 0 0 3px rgba(#c0392b, 0.12)

    &:disabled
        background: #f9fafb
        color: #6b7280
        cursor: not-allowed

    &--senha
        padding-right: 2.75rem

.form-input-toggle
    position: absolute
    right: 0.75rem
    background: none
    border: none
    padding: 0
    cursor: pointer
    color: #9ca3af
    display: flex
    align-items: center
    transition: color 0.15s

    i
        font-size: 18px

    &:hover
        color: #4b5563

.btn-entrar
    width: 100%
    padding: 0.8rem
    background: #c0392b
    color: #fff
    border: none
    border-radius: 8px
    font-size: 1rem
    font-weight: 700
    cursor: pointer
    transition: background 0.15s, transform 0.1s
    margin-top: 0.25rem
    letter-spacing: 0.01em

    &:hover:not(:disabled)
        background: #a93226

    &:active:not(:disabled)
        transform: scale(0.98)

    &:disabled
        opacity: 0.65
        cursor: not-allowed

    &__loading
        display: flex
        align-items: center
        justify-content: center
        gap: 0.5rem

        i
            font-size: 16px
            animation: spin 0.8s linear infinite

@keyframes spin
    to
        transform: rotate(360deg)
</style>