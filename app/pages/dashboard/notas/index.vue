<script setup>
definePageMeta({
  layout: "default",
});

const notas = [
  { id: 1, aluno: "Ana Souza", curso: "Jornalismo", disciplina: "OPP", turma: "Turma A - Jornalismo", professor: "Maria Silva", nota1: 8.5, nota2: 7.0, nota3: 9.0, media: 8.2, status: "Aprovado" },
  { id: 2, aluno: "Pedro Costa", curso: "Comunicação social", disciplina: "Oratória", turma: "Turma B - Comunicação", professor: "João Pereira", nota1: 6.5, nota2: 7.5, nota3: 8.0, media: 7.3, status: "Aprovado" },
  { id: 3, aluno: "Lucia Oliveira", curso: "Técnico de Informática", disciplina: "Matemática", turma: "Turma C - Informática", professor: "Carlos Santos", nota1: 5.0, nota2: 4.5, nota3: 6.0, media: 5.2, status: "Recuperação" },
];

const handleNovaNota = () => {
  console.log("Nova nota");
};

const handleVerNota = (nota) => {
  console.log("Ver nota:", nota);
};

const handleEditarNota = (nota) => {
  console.log("Editar nota:", nota);
};

const handleExcluirNota = (nota) => {
  console.log("Excluir nota:", nota);
};

const getStatusClass = (status) => {
  if (status === "Aprovado") return "notas__status-tag--aprovado";
  if (status === "Recuperação") return "notas__status-tag--recuperacao";
  return "notas__status-tag--reprovado";
};
</script>

<template>
  <div class="notas">
    <div class="notas__head">
      <div>
        <h1 class="notas__title">Gestão de Notas</h1>
        <p class="notas__subtitle">Gerencie todas as notas da instituição</p>
      </div>
      <button class="notas__btn-new" @click="handleNovaNota">
        <i class="ti ti-plus"></i>
        Nova Nota
      </button>
    </div>

    <div class="notas__filters">
      <input
        type="text"
        class="notas__search"
        placeholder="Buscar nota por aluno..."
      />
      <select class="notas__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="notas__select">
        <option>Todas as Disciplinas</option>
        <option>OPP</option>
        <option>Oratória</option>
        <option>Matemática</option>
      </select>
      <select class="notas__select">
        <option>Todos os Status</option>
        <option>Aprovado</option>
        <option>Recuperação</option>
        <option>Reprovado</option>
      </select>
    </div>

    <div class="notas__table-container">
      <table class="notas__table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Turma</th>
            <th>Professor</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Média</th>
            <th>Status</th>
            <th class="notas__actions-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nota in notas" :key="nota.id">
            <td>
              <div class="notas__cell-name">
                <div class="notas__avatar">
                  {{ nota.aluno.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() }}
                </div>
                <span>{{ nota.aluno }}</span>
              </div>
            </td>
            <td>{{ nota.disciplina }}</td>
            <td>{{ nota.turma }}</td>
            <td>{{ nota.professor }}</td>
            <td>{{ nota.nota1 }}</td>
            <td>{{ nota.nota2 }}</td>
            <td>{{ nota.nota3 }}</td>
            <td><strong>{{ nota.media }}</strong></td>
            <td>
              <span :class="['notas__status-tag', getStatusClass(nota.status)]">{{ nota.status }}</span>
            </td>
            <td>
              <div class="notas__actions">
                <button
                  class="notas__action-btn notas__action-btn--view"
                  @click="handleVerNota(nota)"
                >
                  Ver
                </button>
                <button
                  class="notas__action-btn notas__action-btn--edit"
                  @click="handleEditarNota(nota)"
                >
                  Editar
                </button>
                <button
                  class="notas__action-btn notas__action-btn--delete"
                  @click="handleExcluirNota(nota)"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="sass">
$red: #dc2626
$red-dark: #b91c1c
$blue: #3b82f6
$green: #10b981
$orange: #f59e0b

.notas
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

    &__btn-new
        display: flex
        align-items: center
        gap: 0.625rem
        padding: 0.875rem 1.5rem
        background: $red
        color: #fff
        border: none
        border-radius: 12px
        font-size: 1rem
        font-weight: 700
        cursor: pointer
        transition: background 0.15s, transform 0.1s, box-shadow 0.15s
        box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2)
        white-space: nowrap

        i
            font-size: 20px

        &:hover
            background: $red-dark
            transform: translateY(-1px)
            box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3)

    &__filters
        display: flex
        gap: 1rem
        flex-wrap: wrap
        background: #fff
        padding: 1.5rem
        border-radius: 16px
        border: 1px solid #e2e8f0
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

    &__search
        flex: 1
        min-width: 200px
        padding: 0.875rem 1.25rem
        border: 1px solid #e2e8f0
        border-radius: 12px
        font-size: 1rem
        color: #0f172a
        transition: border-color 0.15s, box-shadow 0.15s

        &:focus
            outline: none
            border-color: $red
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1)

        &::placeholder
            color: #94a3b8

    &__select
        padding: 0.875rem 1.25rem
        border: 1px solid #e2e8f0
        border-radius: 12px
        font-size: 1rem
        color: #0f172a
        background: #fff
        cursor: pointer
        transition: border-color 0.15s, box-shadow 0.15s
        min-width: 180px

        &:focus
            outline: none
            border-color: $red
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1)

    &__table-container
        background: #fff
        border-radius: 16px
        border: 1px solid #e2e8f0
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
        overflow: hidden

    &__table
        width: 100%
        border-collapse: collapse

        thead
            background: #f8fafc

            th
                padding: 1rem 1.5rem
                text-align: left
                font-size: 0.875rem
                font-weight: 700
                color: #64748b
                text-transform: uppercase
                letter-spacing: 0.05em

        tbody
            tr
                transition: background 0.1s

                &:hover
                    background: #f8fafc

        td
            padding: 1.25rem 1.5rem
            font-size: 0.9375rem
            color: #1e293b
            border-top: 1px solid #e2e8f0

    &__cell-name
        display: flex
        align-items: center
        gap: 1rem

    &__avatar
        width: 48px
        height: 48px
        border-radius: 50%
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        font-size: 1rem
        font-weight: 800

    &__status-tag
        display: inline-flex
        align-items: center
        gap: 0.375rem
        padding: 0.375rem 0.875rem
        border-radius: 999px
        font-size: 0.875rem
        font-weight: 600

        &--aprovado
            background: rgba(16, 185, 129, 0.1)
            color: $green

            &::before
                content: ""
                width: 6px
                height: 6px
                border-radius: 50%
                background: $green

        &--recuperacao
            background: rgba(245, 158, 11, 0.1)
            color: $orange

            &::before
                content: ""
                width: 6px
                height: 6px
                border-radius: 50%
                background: $orange

        &--reprovado
            background: rgba(220, 38, 38, 0.1)
            color: $red

            &::before
                content: ""
                width: 6px
                height: 6px
                border-radius: 50%
                background: $red

    &__actions-header
        text-align: right

    &__actions
        display: flex
        gap: 0.5rem
        justify-content: flex-end

    &__action-btn
        padding: 0.5rem 0.875rem
        border: none
        border-radius: 8px
        font-size: 0.875rem
        font-weight: 600
        cursor: pointer
        transition: background 0.15s, transform 0.1s
        background: transparent

        &--view
            color: $blue

            &:hover
                background: rgba(59, 130, 246, 0.1)
                transform: translateY(-1px)

        &--edit
            color: $green

            &:hover
                background: rgba(16, 185, 129, 0.1)
                transform: translateY(-1px)

        &--delete
            color: $red

            &:hover
                background: rgba(220, 38, 38, 0.1)
                transform: translateY(-1px)
</style>
