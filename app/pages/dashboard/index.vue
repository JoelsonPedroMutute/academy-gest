<script setup>
definePageMeta({
  layout: "default",
});

const stats = [
  { label: "Cursos", value: 12, icon: "ti-books", color: "#6366f1" },
  { label: "Disciplinas", value: 48, icon: "ti-book", color: "#0ea5e9" },
  { label: "Professores", value: 34, icon: "ti-users", color: "#10b981" },
  { label: "Alunos", value: 1240, icon: "ti-school", color: "#f59e0b" },
];
</script>

<template>
  <div class="dash">
    <div class="dash__head">
      <div>
        <h1 class="dash__title">Dashboard</h1>
        <p class="dash__subtitle">Bem-vindo ao painel de administração</p>
      </div>
    </div>

    <div class="dash__stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div
          class="stat-card__icon"
          :style="{ background: stat.color + '18', color: stat.color }"
        >
          <i :class="`ti ${stat.icon}`" aria-hidden="true"></i>
        </div>
        <div class="stat-card__info">
          <span class="stat-card__value">{{
            stat.value.toLocaleString("pt")
          }}</span>
          <span class="stat-card__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="dash__grid">
      <div class="dash-widget">
        <p class="dash-widget__title">Acesso Rápido</p>
        <div class="dash-widget__links">
          <NuxtLink to="/dashboard/cursos" class="quick-link">
            <i class="ti ti-books"></i> Cursos
          </NuxtLink>
          <NuxtLink to="/dashboard/disciplinas" class="quick-link">
            <i class="ti ti-book"></i> Disciplinas
          </NuxtLink>
          <NuxtLink to="/dashboard/professores" class="quick-link">
            <i class="ti ti-users"></i> Professores
          </NuxtLink>
          <NuxtLink to="/dashboard/alunos" class="quick-link">
            <i class="ti ti-school"></i> Alunos
          </NuxtLink>
          <NuxtLink to="/dashboard/turmas" class="quick-link">
            <i class="ti ti-building"></i> Turmas
          </NuxtLink>
          <NuxtLink to="/dashboard/matriculas" class="quick-link">
            <i class="ti ti-clipboard-list"></i> Matrículas
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
$red: #dc2626
$red-dark: #b91c1c

.dash
    display: flex
    flex-direction: column
    gap: 2rem

    &__head
        display: flex
        align-items: flex-start
        justify-content: space-between

    &__title
        font-size: 2rem
        font-weight: 800
        color: #0f172a
        margin: 0 0 0.5rem

    &__subtitle
        font-size: 1.125rem
        color: #64748b
        margin: 0

    &__stats
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
        gap: 1.25rem

    &__grid
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
        gap: 1.5rem

.stat-card
    background: #fff
    border-radius: 16px
    padding: 1.5rem
    display: flex
    align-items: center
    gap: 1rem
    border: 1px solid #e2e8f0
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)
    transition: transform 0.2s, box-shadow 0.2s

    &:hover
        transform: translateY(-2px)
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)

    &__icon
        width: 56px
        height: 56px
        border-radius: 14px
        display: flex
        align-items: center
        justify-content: center
        flex-shrink: 0

        i
            font-size: 26px

    &__info
        display: flex
        flex-direction: column
        gap: 4px

    &__value
        font-size: 2rem
        font-weight: 800
        color: #0f172a
        line-height: 1

    &__label
        font-size: 0.9375rem
        color: #64748b
        font-weight: 500

.dash-widget
    background: #fff
    border-radius: 16px
    padding: 1.75rem
    border: 1px solid #e2e8f0
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)

    &__title
        font-size: 0.875rem
        font-weight: 700
        color: #64748b
        text-transform: uppercase
        letter-spacing: 0.08em
        margin: 0 0 1.25rem

    &__links
        display: flex
        flex-wrap: wrap
        gap: 0.75rem

.quick-link
    display: inline-flex
    align-items: center
    gap: 0.625rem
    padding: 0.75rem 1rem
    background: #f8fafc
    border-radius: 10px
    font-size: 0.9375rem
    font-weight: 600
    color: #1e293b
    text-decoration: none
    transition: background 0.15s, color 0.15s, transform 0.15s

    i
        font-size: 18px

    &:hover
        background: $red
        color: #fff
        transform: translateY(-1px)
</style>