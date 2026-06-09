<script setup>
definePageMeta({
  layout: "default",
});

const disciplinas = [
  { id: 1, nome: "OPP", curso: "Jornalismo", cargaHoraria: "60h", semestre: "1º Semestre" },
  { id: 2, nome: "Oratória", curso: "Comunicação social", cargaHoraria: "40h", semestre: "2º Semestre" },
  { id: 3, nome: "Matemática", curso: "Técnico de Informática", cargaHoraria: "80h", semestre: "1º Semestre" },
];

const handleNovaDisciplina = () => {
  // Função para abrir modal de nova disciplina
  console.log("Nova disciplina");
};

const handleVerDisciplina = (disciplina) => {
  console.log("Ver disciplina:", disciplina);
};

const handleEditarDisciplina = (disciplina) => {
  console.log("Editar disciplina:", disciplina);
};

const handleExcluirDisciplina = (disciplina) => {
  console.log("Excluir disciplina:", disciplina);
};
</script>

<template>
  <div class="disciplinas">
    <div class="disciplinas__head">
      <div>
        <h1 class="disciplinas__title">Gestão de Disciplinas</h1>
        <p class="disciplinas__subtitle">Gerencie todas as disciplinas da instituição</p>
      </div>
      <button class="disciplinas__btn-new" @click="handleNovaDisciplina">
        <i class="ti ti-plus"></i>
        Nova Disciplina
      </button>
    </div>

    <div class="disciplinas__filters">
      <input
        type="text"
        class="disciplinas__search"
        placeholder="Buscar disciplina por nome..."
      />
      <select class="disciplinas__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="disciplinas__select">
        <option>Todos os Semestres</option>
        <option>1º Semestre</option>
        <option>2º Semestre</option>
        <option>3º Semestre</option>
        <option>4º Semestre</option>
      </select>
    </div>

    <div class="disciplinas__table-container">
      <table class="disciplinas__table">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Curso</th>
            <th>Carga Horária</th>
            <th>Semestre</th>
            <th class="disciplinas__actions-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="disciplina in disciplinas" :key="disciplina.id">
            <td>
              <div class="disciplinas__cell-name">
                <div class="disciplinas__icon">
                  <i class="ti ti-book"></i>
                </div>
                <span>{{ disciplina.nome }}</span>
              </div>
            </td>
            <td>{{ disciplina.curso }}</td>
            <td>{{ disciplina.cargaHoraria }}</td>
            <td>
              <span class="disciplinas__semester-tag">{{ disciplina.semestre }}</span>
            </td>
            <td>
              <div class="disciplinas__actions">
                <button
                  class="disciplinas__action-btn disciplinas__action-btn--view"
                  @click="handleVerDisciplina(disciplina)"
                >
                  Ver
                </button>
                <button
                  class="disciplinas__action-btn disciplinas__action-btn--edit"
                  @click="handleEditarDisciplina(disciplina)"
                >
                  Editar
                </button>
                <button
                  class="disciplinas__action-btn disciplinas__action-btn--delete"
                  @click="handleExcluirDisciplina(disciplina)"
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

.disciplinas
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
        background: rgba(124, 58, 237, 0.1)
        color: #7c3aed
        display: flex
        align-items: center
        justify-content: center

        i
            font-size: 24px

    &__semester-tag
        display: inline-flex
        align-items: center
        gap: 0.375rem
        padding: 0.375rem 0.875rem
        background: rgba(59, 130, 246, 0.1)
        color: $blue
        border-radius: 999px
        font-size: 0.875rem
        font-weight: 600

        &::before
            content: ""
            width: 6px
            height: 6px
            border-radius: 50%
            background: $blue

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
