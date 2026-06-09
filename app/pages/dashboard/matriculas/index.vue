<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const matriculas = ref([
  { id: 1, aluno: "Ana Souza", turma: "Turma A", curso: "Jornalismo", dataMatricula: "2024-01-15", status: "Ativa" },
  { id: 2, aluno: "Pedro Costa", turma: "Turma B", curso: "Comunicação Social", dataMatricula: "2024-01-10", status: "Ativa" },
  { id: 3, aluno: "Lucia Oliveira", turma: "Turma C", curso: "Técnico de Informática", dataMatricula: "2024-01-20", status: "Ativa" },
])

const isModalOpen = ref(false)
const editingMatricula = ref(null)

const openEditModal = (matricula) => {
  editingMatricula.value = { ...matricula }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingMatricula.value = null
}

const handleUpdateMatricula = () => {
  const index = matriculas.value.findIndex(m => m.id === editingMatricula.value.id)
  if (index !== -1) {
    matriculas.value[index] = { ...editingMatricula.value }
  }
  $swal.toast.fire({ icon: 'success', title: 'Matrícula atualizada com sucesso!' })
  closeModal()
}

const handleDeleteMatricula = async (matricula) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir a matrícula de "${matricula.aluno}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    matriculas.value = matriculas.value.filter(m => m.id !== matricula.id)
    $swal.toast.fire({ icon: 'success', title: 'Matrícula excluída com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Matrículas</h1>
        <p class="page__subtitle">Gerencie todas as matrículas da instituição</p>
      </div>
      <NuxtLink to="/dashboard/matriculas/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Nova Matrícula
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar matrícula por aluno..." />
      <select class="filters__select">
        <option>Todas as Turmas</option>
        <option>Turma A</option>
        <option>Turma B</option>
        <option>Turma C</option>
      </select>
      <select class="filters__select">
        <option>Todos os Cursos</option>
        <option>Jornalismo</option>
        <option>Comunicação Social</option>
        <option>Técnico de Informática</option>
      </select>
      <select class="filters__select">
        <option>Todos os Status</option>
        <option>Ativa</option>
        <option>Inativa</option>
      </select>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Curso</th>
            <th>Data da Matrícula</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="matricula in matriculas" :key="matricula.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--blue">
                  <i class="ti ti-user-plus"></i>
                </div>
                <span>{{ matricula.aluno }}</span>
              </div>
            </td>
            <td>{{ matricula.turma }}</td>
            <td>{{ matricula.curso }}</td>
            <td>{{ matricula.dataMatricula }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{ matricula.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(matricula)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteMatricula(matricula)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :is-open="isModalOpen" :title="`Editar Matrícula: ${editingMatricula?.aluno || ''}`" @close="closeModal">
      <form v-if="editingMatricula" @submit.prevent="handleUpdateMatricula" class="form">
        <div class="form__group">
          <label for="edit-aluno" class="form__label">Aluno</label>
          <input id="edit-aluno" v-model="editingMatricula.aluno" type="text" class="form__input" placeholder="Digite o nome do aluno" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-turma" class="form__label">Turma</label>
            <select id="edit-turma" v-model="editingMatricula.turma" class="form__select" required>
              <option value="">Selecione uma turma</option>
              <option>Turma A</option>
              <option>Turma B</option>
              <option>Turma C</option>
            </select>
          </div>
          <div class="form__group">
            <label for="edit-curso" class="form__label">Curso</label>
            <select id="edit-curso" v-model="editingMatricula.curso" class="form__select" required>
              <option value="">Selecione um curso</option>
              <option>Jornalismo</option>
              <option>Comunicação Social</option>
              <option>Técnico de Informática</option>
            </select>
          </div>
        </div>

        <div class="form__group">
          <label for="edit-status" class="form__label">Status</label>
          <select id="edit-status" v-model="editingMatricula.status" class="form__select" required>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>

        <div class="form__actions">
          <button type="button" @click="closeModal" class="form__button form__button--secondary">Cancelar</button>
          <button type="submit" class="form__button form__button--primary">Salvar Alterações</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
