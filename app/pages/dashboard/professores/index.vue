<script setup>
definePageMeta({
  layout: "default",
});

const professores = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@academia.edu", telefone: "(11) 98765-4321", disciplina: "OPP", status: "Ativo" },
  { id: 2, nome: "João Pereira", email: "joao.pereira@academia.edu", telefone: "(11) 91234-5678", disciplina: "Oratória", status: "Ativo" },
  { id: 3, nome: "Carlos Santos", email: "carlos.santos@academia.edu", telefone: "(11) 99876-5432", disciplina: "Matemática", status: "Ativo" },
];

const handleNovoProfessor = () => {
  console.log("Novo professor");
};

const handleVerProfessor = (professor) => {
  console.log("Ver professor:", professor);
};

const handleEditarProfessor = (professor) => {
  console.log("Editar professor:", professor);
};

const handleExcluirProfessor = (professor) => {
  console.log("Excluir professor:", professor);
};
</script>

<template>
  <div class="professores">
    <div class="professores__head">
      <div>
        <h1 class="professores__title">Gestão de Professores</h1>
        <p class="professores__subtitle">Gerencie todos os professores da instituição</p>
      </div>
      <button class="professores__btn-new" @click="handleNovoProfessor">
        <i class="ti ti-plus"></i>
        Novo Professor
      </button>
    </div>

    <div class="professores__filters">
      <input
        type="text"
        class="professores__search"
        placeholder="Buscar professor por nome..."
      />
      <select class="professores__select">
        <option>Todas as Disciplinas</option>
        <option>OPP</option>
        <option>Oratória</option>
        <option>Matemática</option>
      </select>
      <select class="professores__select">
        <option>Todos os Status</option>
        <option>Ativo</option>
        <option>Inativo</option>
      </select>
    </div>

    <div class="professores__table-container">
      <table class="professores__table">
        <thead>
          <tr>
            <th>Professor</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Disciplina</th>
            <th>Status</th>
            <th class="professores__actions-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="professor in professores" :key="professor.id">
            <td>
              <div class="professores__cell-name">
                <div class="professores__avatar">
                  {{ professor.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() }}
                </div>
                <span>{{ professor.nome }}</span>
              </div>
            </td>
            <td>{{ professor.email }}</td>
            <td>{{ professor.telefone }}</td>
            <td>{{ professor.disciplina }}</td>
            <td>
              <span class="professores__status-tag professores__status-tag--active">{{ professor.status }}</span>
            </td>
            <td>
              <div class="professores__actions">
                <button
                  class="professores__action-btn professores__action-btn--view"
                  @click="handleVerProfessor(professor)"
                >
                  Ver
                </button>
                <button
                  class="professores__action-btn professores__action-btn--edit"
                  @click="handleEditarProfessor(professor)"
                >
                  Editar
                </button>
                <button
                  class="professores__action-btn professores__action-btn--delete"
                  @click="handleExcluirProfessor(professor)"
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

.professores
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

        &--active
            background: rgba(16, 185, 129, 0.1)
            color: $green

            &::before
                content: ""
                width: 6px
                height: 6px
                border-radius: 50%
                background: $green

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
