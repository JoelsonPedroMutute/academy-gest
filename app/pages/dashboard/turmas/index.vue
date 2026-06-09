<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const turmas = ref([
  { id: 1, nome: "Turma A", curso: "Jornalismo", semestre: "3º Semestre", professor: "Maria Silva", totalAlunos: 30, status: "Ativo" },
  { id: 2, nome: "Turma B", curso: "Comunicação Social", semestre: "2º Semestre", professor: "João Pereira", totalAlunos: 25, status: "Ativo" },
  { id: 3, nome: "Turma C", curso: "Técnico de Informática", semestre: "1º Semestre", professor: "Carlos Santos", totalAlunos: 35, status: "Ativo" },
])

const isModalOpen = ref(false)
const editingTurma = ref(null)

const openEditModal = (turma) => {
  editingTurma.value = { ...turma }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingTurma.value = null
}

const handleUpdateTurma = () => {
  const index = turmas.value.findIndex(t => t.id === editingTurma.value.id)
  if (index !== -1) {
    turmas.value[index] = { ...editingTurma.value }
  }
  $swal.toast.fire({ icon: 'success', title: 'Turma atualizada com sucesso!' })
  closeModal()
}

const handleDeleteTurma = async (turma) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir a turma "${turma.nome}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    turmas.value = turmas.value.filter(t => t.id !== turma.id)
    $swal.toast.fire({ icon: 'success', title: 'Turma excluída com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Turmas</h1>
        <p class="page__subtitle">Gerencie todas as turmas da instituição</p>
      </div>
      <NuxtLink to="/dashboard/turmas/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Nova Turma
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar turma por nome..." />
      <select class="filters__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação Social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="filters__select">
        <option>Todos os Semestres</option>
        <option>1º Semestre</option>
        <option>2º Semestre</option>
        <option>3º Semestre</option>
        <option>4º Semestre</option>
      </select>
      <select class="filters__select">
        <option>Todos os Status</option>
        <option>Ativo</option>
        <option>Inativo</option>
      </select>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Turma</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Professor</th>
            <th>Total Alunos</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turma in turmas" :key="turma.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--purple">
                  <i class="ti ti-users-group"></i>
                </div>
                <span>{{ turma.nome }}</span>
              </div>
            </td>
            <td>{{ turma.curso }}</td>
            <td>{{ turma.semestre }}</td>
            <td>{{ turma.professor }}</td>
            <td>{{ turma.totalAlunos }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{ turma.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(turma)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteTurma(turma)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :is-open="isModalOpen" :title="`Editar Turma: ${editingTurma?.nome || ''}`" @close="closeModal">
      <form v-if="editingTurma" @submit.prevent="handleUpdateTurma" class="form">
        <div class="form__group">
          <label for="edit-nome" class="form__label">Nome da Turma</label>
          <input id="edit-nome" v-model="editingTurma.nome" type="text" class="form__input" placeholder="Digite o nome da turma" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-curso" class="form__label">Curso</label>
            <select id="edit-curso" v-model="editingTurma.curso" class="form__select" required>
              <option value="">Selecione um curso</option>
              <option>Jornalismo</option>
              <option>Comunicação Social</option>
              <option>Técnico de Informática</option>
            </select>
          </div>
          <div class="form__group">
            <label for="edit-semestre" class="form__label">Semestre</label>
            <select id="edit-semestre" v-model="editingTurma.semestre" class="form__select" required>
              <option value="">Selecione um semestre</option>
              <option>1º Semestre</option>
              <option>2º Semestre</option>
              <option>3º Semestre</option>
              <option>4º Semestre</option>
            </select>
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-professor" class="form__label">Professor</label>
            <input id="edit-professor" v-model="editingTurma.professor" type="text" class="form__input" placeholder="Digite o nome do professor" required />
          </div>
          <div class="form__group">
            <label for="edit-status" class="form__label">Status</label>
            <select id="edit-status" v-model="editingTurma.status" class="form__select" required>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>

        <div class="form__actions">
          <button type="button" @click="closeModal" class="form__button form__button--secondary">Cancelar</button>
          <button type="submit" class="form__button form__button--primary">Salvar Alterações</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
