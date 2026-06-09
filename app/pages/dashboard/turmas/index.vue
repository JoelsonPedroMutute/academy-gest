<script setup>
definePageMeta({
  layout: "default",
});

const turmas = [
  { id: 1, nome: "Turma A - Jornalismo", curso: "Jornalismo", semestre: "3º Semestre", professor: "Maria Silva", totalAlunos: 35, disciplina: "OPP", periodo: "Matutino" },
  { id: 2, nome: "Turma B - Comunicação", curso: "Comunicação social", semestre: "2º Semestre", professor: "João Pereira", totalAlunos: 30, disciplina: "Oratória", periodo: "Vespertino" },
  { id: 3, nome: "Turma C - Informática", curso: "Técnico de Informática", semestre: "1º Semestre", professor: "Carlos Santos", totalAlunos: 40, disciplina: "Matemática", periodo: "Noturno" },
];

const handleNovaTurma = () => {
  console.log("Nova turma");
};

const handleVerTurma = (turma) => {
  console.log("Ver turma:", turma);
};

const handleEditarTurma = (turma) => {
  console.log("Editar turma:", turma);
};

const handleExcluirTurma = (turma) => {
  console.log("Excluir turma:", turma);
};
</script>

<template>
  <div class="turmas">
    <div class="turmas__head">
      <div>
        <h1 class="turmas__title">Gestão de Turmas</h1>
        <p class="turmas__subtitle">Gerencie todas as turmas da instituição</p>
      </div>
      <button class="turmas__btn-new" @click="handleNovaTurma">
        <i class="ti ti-plus"></i>
        Nova Turma
      </button>
    </div>

    <div class="turmas__filters">
      <input
        type="text"
        class="turmas__search"
        placeholder="Buscar turma por nome..."
      />
      <select class="turmas__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="turmas__select">
        <option>Todos os Períodos</option>
        <option>Matutino</option>
        <option>Vespertino</option>
        <option>Noturno</option>
      </select>
    </div>

    <div class="turmas__table-container">
      <table class="turmas__table">
        <thead>
          <tr>
            <th>Turma</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Professor</th>
            <th>Disciplina</th>
            <th>Período</th>
            <th>Alunos</th>
            <th class="turmas__actions-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turma in turmas" :key="turma.id">
            <td>
              <div class="turmas__cell-name">
                <div class="turmas__icon">
                  <i class="ti ti-building"></i>
                </div>
                <span>{{ turma.nome }}</span>
              </div>
            </td>
            <td>{{ turma.curso }}</td>
            <td>{{ turma.semestre }}</td>
            <td>{{ turma.professor }}</td>
            <td>{{ turma.disciplina }}</td>
            <td>
              <span class="turmas__period-tag">{{ turma.periodo }}</span>
            </td>
            <td>{{ turma.totalAlunos }}</td>
            <td>
              <div class="turmas__actions">
                <button
                  class="turmas__action-btn turmas__action-btn--view"
                  @click="handleVerTurma(turma)"
                >
                  Ver
                </button>
                <button
                  class="turmas__action-btn turmas__action-btn--edit"
                  @click="handleEditarTurma(turma)"
                >
                  Editar
                </button>
                <button
                  class="turmas__action-btn turmas__action-btn--delete"
                  @click="handleExcluirTurma(turma)"
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

.turmas
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

    &__icon
        width: 48px
        height: 48px
        border-radius: 12px
        background: rgba(245, 158, 11, 0.1)
        color: $orange
        display: flex
        align-items: center
        justify-content: center

        i
            font-size: 24px

    &__period-tag
        display: inline-flex
        align-items: center
        gap: 0.375rem
        padding: 0.375rem 0.875rem
        background: rgba(107, 114, 128, 0.1)
        color: #6b7280
        border-radius: 999px
        font-size: 0.875rem
        font-weight: 600

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
