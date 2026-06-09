<script setup>
definePageMeta({
  layout: "default",
});

const estatisticas = ref([
  {
    icon: "ti ti-users",
    label: "Total de Alunos",
    valor: "1,248",
    cor: "blue"
  },
  {
    icon: "ti ti-book",
    label: "Total de Cursos",
    valor: "42",
    cor: "purple"
  },
  {
    icon: "ti ti-users-group",
    label: "Total de Turmas",
    valor: "28",
    cor: "green"
  },
  {
    icon: "ti ti-school",
    label: "Total de Professores",
    valor: "56",
    cor: "red"
  }
]);

const atividadesRecentes = ref([
  {
    icon: "ti ti-user-plus",
    texto: "Novo aluno matriculado: Maria Silva",
    horario: "Há 2 minutos",
    cor: "green"
  },
  {
    icon: "ti ti-check",
    texto: "Notas de OPP lançadas para Turma A",
    horario: "Há 1 hora",
    cor: "blue"
  },
  {
    icon: "ti ti-edit",
    texto: "Curso de Comunicação Social atualizado",
    horario: "Há 3 horas",
    cor: "purple"
  },
  {
    icon: "ti ti-trash",
    texto: "Professor João removido do sistema",
    horario: "Há 5 horas",
    cor: "red"
  }
]);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__head">
      <h1 class="dashboard__titulo">Dashboard</h1>
      <p class="dashboard__subtitulo">Bem-vindo de volta!</p>
    </div>
    
    <div class="dashboard__estatisticas">
      <div 
        v-for="(stat, index) in estatisticas" 
        :key="index" 
        :class="['dashboard__card', 'dashboard__card--' + stat.cor]"
      >
        <div class="dashboard__card-icon">
          <i :class="stat.icon"></i>
        </div>
        <div class="dashboard__card-content">
          <p class="dashboard__card-label">{{ stat.label }}</p>
          <h3 class="dashboard__card-valor">{{ stat.valor }}</h3>
        </div>
      </div>
    </div>
    
    <div class="dashboard__conteudo">
      <div class="dashboard__secao">
        <h2 class="dashboard__secao-titulo">Atividades Recentes</h2>
        <div class="dashboard__atividades">
          <div 
            v-for="(atividade, index) in atividadesRecentes" 
            :key="index"
            class="dashboard__atividade"
          >
            <div :class="['dashboard__atividade-icon', 'dashboard__atividade-icon--' + atividade.cor]">
              <i :class="atividade.icon"></i>
            </div>
            <div class="dashboard__atividade-content">
              <p class="dashboard__atividade-texto">{{ atividade.texto }}</p>
              <span class="dashboard__atividade-horario">{{ atividade.horario }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dashboard__secao">
        <h2 class="dashboard__secao-titulo">Acesso Rápido</h2>
        <div class="dashboard__acessos">
          <NuxtLink to="/dashboard/alunos" class="dashboard__acesso">
            <div class="dashboard__acesso-icon dashboard__acesso-icon--blue">
              <i class="ti ti-users"></i>
            </div>
            <span class="dashboard__acesso-label">Alunos</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/disciplinas" class="dashboard__acesso">
            <div class="dashboard__acesso-icon dashboard__acesso-icon--red">
              <i class="ti ti-notebook"></i>
            </div>
            <span class="dashboard__acesso-label">Disciplinas</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/turmas" class="dashboard__acesso">
            <div class="dashboard__acesso-icon dashboard__acesso-icon--green">
              <i class="ti ti-users-group"></i>
            </div>
            <span class="dashboard__acesso-label">Turmas</span>
          </NuxtLink>
          <NuxtLink to="/dashboard/notas" class="dashboard__acesso">
            <div class="dashboard__acesso-icon dashboard__acesso-icon--purple">
              <i class="ti ti-clipboard-check"></i>
            </div>
            <span class="dashboard__acesso-label">Notas</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@use '~/assets/sass/variables' as *

.dashboard
  display: flex
  flex-direction: column
  gap: $spacing-2xl

  &__head
    margin-bottom: $spacing-md

  &__titulo
    font-size: 2rem
    font-weight: 800
    color: $gray-900
    margin: 0 0 $spacing-xs

  &__subtitulo
    font-size: 1.125rem
    color: $gray-500
    margin: 0

  &__estatisticas
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))
    gap: $spacing-xl

  &__card
    background: $white
    border-radius: $radius-lg
    border: 1px solid $gray-200
    box-shadow: $shadow-sm
    padding: $spacing-xl
    display: flex
    align-items: center
    gap: $spacing-lg
    transition: transform 0.2s, box-shadow 0.2s

    &:hover
      transform: translateY(-4px)
      box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1)

    &--blue
      .dashboard__card-icon
        background: rgba(59, 130, 246, 0.1)
        color: $blue

    &--purple
      .dashboard__card-icon
        background: rgba(139, 92, 246, 0.1)
        color: $purple

    &--green
      .dashboard__card-icon
        background: rgba(16, 185, 129, 0.1)
        color: $green

    &--red
      .dashboard__card-icon
        background: rgba(220, 38, 38, 0.1)
        color: $red

  &__card-icon
    width: 56px
    height: 56px
    border-radius: $radius-md
    display: flex
    align-items: center
    justify-content: center

    i
      font-size: 2rem

  &__card-label
    font-size: 0.875rem
    color: $gray-500
    margin: 0 0 $spacing-xs

  &__card-valor
    font-size: 2rem
    font-weight: 800
    color: $gray-900
    margin: 0

  &__conteudo
    display: grid
    grid-template-columns: 1fr 1fr
    gap: $spacing-xl

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__secao
    background: $white
    border-radius: $radius-lg
    border: 1px solid $gray-200
    box-shadow: $shadow-sm
    padding: $spacing-xl

  &__secao-titulo
    font-size: 1.25rem
    font-weight: 700
    color: $gray-900
    margin: 0 0 $spacing-lg

  &__atividades
    display: flex
    flex-direction: column
    gap: $spacing-md

  &__atividade
    display: flex
    align-items: center
    gap: $spacing-md
    padding: $spacing-md
    border-radius: $radius-md
    transition: background 0.15s

    &:hover
      background: $gray-50

  &__atividade-icon
    width: 40px
    height: 40px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0

    i
      font-size: 1.25rem

    &--green
      background: rgba(16, 185, 129, 0.1)
      color: $green

    &--blue
      background: rgba(59, 130, 246, 0.1)
      color: $blue

    &--purple
      background: rgba(139, 92, 246, 0.1)
      color: $purple

    &--red
      background: rgba(220, 38, 38, 0.1)
      color: $red

  &__atividade-content
    flex: 1

  &__atividade-texto
    font-size: 0.9375rem
    color: $gray-800
    margin: 0 0 $spacing-xs

  &__atividade-horario
    font-size: 0.8125rem
    color: $gray-500

  &__acessos
    display: grid
    grid-template-columns: repeat(2, 1fr)
    gap: $spacing-md

  &__acesso
    display: flex
    flex-direction: column
    align-items: center
    gap: $spacing-md
    padding: $spacing-xl
    background: $gray-50
    border-radius: $radius-md
    text-decoration: none
    transition: background 0.15s, transform 0.15s

    &:hover
      background: #e5e7eb
      transform: translateY(-2px)

  &__acesso-icon
    width: 48px
    height: 48px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center

    i
      font-size: 1.5rem
      color: $white

    &--blue
      background: $blue

    &--red
      background: $red

    &--green
      background: $green

    &--purple
      background: $purple

  &__acesso-label
    font-size: 0.9375rem
    font-weight: 600
    color: $gray-700
</style>
