<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const cursos = ref([
  { id: 1, nome: "Jornalismo", coordenador: "Maria Silva", duracao: "4 anos", totalAlunos: 120, status: "Ativo" },
  { id: 2, nome: "Comunicação Social", coordenador: "João Pereira", duracao: "4 anos", totalAlunos: 95, status: "Ativo" },
  { id: 3, nome: "Técnico de Informática", coordenador: "Carlos Santos", duracao: "2 anos", totalAlunos: 180, status: "Ativo" },
])

const isModalOpen = ref(false)
const editingCurso = ref(null)

const openEditModal = (curso) => {
  editingCurso.value = { ...curso }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingCurso.value = null
}

const handleUpdateCurso = () => {
  const index = cursos.value.findIndex(c => c.id === editingCurso.value.id)
  if (index !== -1) {
    cursos.value[index] = { ...editingCurso.value }
  }
  $swal.toast.fire({ icon: 'success', title: 'Curso atualizado com sucesso!' })
  closeModal()
}

const handleDeleteCurso = async (curso) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir o curso "${curso.nome}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    cursos.value = cursos.value.filter(c => c.id !== curso.id)
    $swal.toast.fire({ icon: 'success', title: 'Curso excluído com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Cursos</h1>
        <p class="page__subtitle">Gerencie todos os cursos da instituição</p>
      </div>
      <NuxtLink to="/dashboard/cursos/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Novo Curso
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar curso por nome..." />
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
            <th>Curso</th>
            <th>Coordenador</th>
            <th>Duração</th>
            <th>Total Alunos</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="curso in cursos" :key="curso.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--purple">
                  <i class="ti ti-books"></i>
                </div>
                <span>{{ curso.nome }}</span>
              </div>
            </td>
            <td>{{ curso.coordenador }}</td>
            <td>{{ curso.duracao }}</td>
            <td>{{ curso.totalAlunos }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{ curso.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(curso)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteCurso(curso)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="editingCurso" :is-open="isModalOpen" :title="`Editar Curso: ${editingCurso.nome}`" @close="closeModal">
      <form @submit.prevent="handleUpdateCurso" class="form">
        <div class="form__group">
          <label for="edit-nome" class="form__label">Nome do Curso</label>
          <input id="edit-nome" v-model="editingCurso.nome" type="text" class="form__input" placeholder="Digite o nome do curso" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-coordenador" class="form__label">Coordenador</label>
            <input id="edit-coordenador" v-model="editingCurso.coordenador" type="text" class="form__input" placeholder="Digite o nome do coordenador" required />
          </div>
          <div class="form__group">
            <label for="edit-duracao" class="form__label">Duração</label>
            <input id="edit-duracao" v-model="editingCurso.duracao" type="text" class="form__input" placeholder="Ex: 4 anos" required />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-status" class="form__label">Status</label>
          <select id="edit-status" v-model="editingCurso.status" class="form__select" required>
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
