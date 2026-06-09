<script setup>
definePageMeta({
  layout: "default",
});

const alunos = [
  { id: 1, nome: "Ana Souza", email: "ana.souza@academia.edu", telefone: "(11) 98765-4321", curso: "Jornalismo", semestre: "3º Semestre", status: "Ativo" },
  { id: 2, nome: "Pedro Costa", email: "pedro.costa@academia.edu", telefone: "(11) 91234-5678", curso: "Comunicação social", semestre: "2º Semestre", status: "Ativo" },
  { id: 3, nome: "Lucia Oliveira", email: "lucia.oliveira@academia.edu", telefone: "(11) 99876-5432", curso: "Técnico de Informática", semestre: "1º Semestre", status: "Ativo" },
];

const handleNovoAluno = () => {
  console.log("Novo aluno");
};

const handleVerAluno = (aluno) => {
  console.log("Ver aluno:", aluno);
};

const handleEditarAluno = (aluno) => {
  console.log("Editar aluno:", aluno);
};

const handleExcluirAluno = (aluno) => {
  console.log("Excluir aluno:", aluno);
};
</script>

<template>
  <div class="alunos">
    <div class="alunos__head">
      <div>
        <h1 class="alunos__title">Gestão de Alunos</h1>
        <p class="alunos__subtitle">Gerencie todos os alunos da instituição</p>
      </div>
      <button class="alunos__btn-new" @click="handleNovoAluno">
        <i class="ti ti-plus"></i>
        Novo Aluno
      </button>
    </div>

    <div class="alunos__filters">
      <input
        type="text"
        class="alunos__search"
        placeholder="Buscar aluno por nome..."
      />
      <select class="alunos__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="alunos__select">
        <option>Todos os Semestres</option>
        <option>1º Semestre</option>
        <option>2º Semestre</option>
        <option>3º Semestre</option>
        <option>4º Semestre</option>
      </select>
      <select class="alunos__select">
        <option>Todos os Status</option>
        <option>Ativo</option>
        <option>Inativo</option>
      </select>
    </div>

    <div class="alunos__table-container">
      <table class="alunos__table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Status</th>
            <th class="alunos__actions-header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.id">
            <td>
              <div class="alunos__cell-name">
                <div class="alunos__avatar">
                  {{ aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() }}
                </div>
                <span>{{ aluno.nome }}</span>
              </div>
            </td>
            <td>{{ aluno.email }}</td>
            <td>{{ aluno.telefone }}</td>
            <td>{{ aluno.curso }}</td>
            <td>{{ aluno.semestre }}</td>
            <td>
              <span class="alunos__status-tag alunos__status-tag--active">{{ aluno.status }}</span>
            </td>
            <td>
              <div class="alunos__actions">
                <button
                  class="alunos__action-btn alunos__action-btn--view"
                  @click="handleVerAluno(aluno)"
                >
                  Ver
                </button>
                <button
                  class="alunos__action-btn alunos__action-btn--edit"
                  @click="handleEditarAluno(aluno)"
                >
                  Editar
                </button>
                <button
                  class="alunos__action-btn alunos__action-btn--delete"
                  @click="handleExcluirAluno(aluno)"
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

.alunos
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
