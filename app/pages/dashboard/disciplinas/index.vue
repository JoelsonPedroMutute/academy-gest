<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const disciplinas = ref([
  { id: 1, nome: "OPP", cargaHoraria: "60h", status: "Ativo" },
  { id: 2, nome: "Oratória", cargaHoraria: "40h", status: "Ativo" },
  { id: 3, nome: "Matemática", cargaHoraria: "80h", status: "Ativo" },
])

const isModalOpen = ref(false)
const editingDisciplina = ref(null)

const openEditModal = (disciplina) => {
  editingDisciplina.value = { ...disciplina }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingDisciplina.value = null
}

const handleUpdateDisciplina = () => {
  const index = disciplinas.value.findIndex(d => d.id === editingDisciplina.value.id)
  if (index !== -1) {
    disciplinas.value[index] = { ...editingDisciplina.value }
  }
  $swal.toast.fire({ icon: 'success', title: 'Disciplina atualizada com sucesso!' })
  closeModal()
}

const handleDeleteDisciplina = async (disciplina) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir a disciplina "${disciplina.nome}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    disciplinas.value = disciplinas.value.filter(d => d.id !== disciplina.id)
    $swal.toast.fire({ icon: 'success', title: 'Disciplina excluída com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Disciplinas</h1>
        <p class="page__subtitle">Gerencie todas as disciplinas da instituição</p>
      </div>
      <NuxtLink to="/dashboard/disciplinas/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Nova Disciplina
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar disciplina por nome..." />
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
            <th>Disciplina</th>
            <th>Carga Horária</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="disciplina in disciplinas" :key="disciplina.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--blue">
                  <i class="ti ti-notebook"></i>
                </div>
                <span>{{ disciplina.nome }}</span>
              </div>
            </td>
            <td>{{ disciplina.cargaHoraria }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{ disciplina.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(disciplina)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteDisciplina(disciplina)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="editingDisciplina" :is-open="isModalOpen" :title="`Editar Disciplina: ${editingDisciplina.nome}`" @close="closeModal">
      <form @submit.prevent="handleUpdateDisciplina" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="edit-nome" class="form__label">Nome da Disciplina</label>
            <input id="edit-nome" v-model="editingDisciplina.nome" type="text" class="form__input" placeholder="Digite o nome da disciplina" required />
          </div>
          <div class="form__group">
            <label for="edit-cargaHoraria" class="form__label">Carga Horária</label>
            <input id="edit-cargaHoraria" v-model="editingDisciplina.cargaHoraria" type="text" class="form__input" placeholder="Ex: 60h" required />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-status" class="form__label">Status</label>
          <select id="edit-status" v-model="editingDisciplina.status" class="form__select" required>
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
