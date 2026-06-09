<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const professores = ref([
  { id: 1, nome: "Hernany Simão", email: "hernanysimao123@gmail.com", telefone: "930586957", disciplina: "OPP", status: "Ativo" },
  { id: 2, nome: "João Pereira", email: "joao.pereira@academia.edu", telefone: "(11) 91234-5678", disciplina: "Oratória", status: "Ativo" },
  { id: 3, nome: "Carlos Santos", email: "carlos.santos@academia.edu", telefone: "(11) 99876-5432", disciplina: "Matemática", status: "Ativo" },
])

const isModalOpen = ref(false)
const editingProfessor = ref(null)

const getInitials = (nome) => {
  return nome.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const openEditModal = (professor) => {
  editingProfessor.value = { ...professor }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingProfessor.value = null
}

const handleUpdateProfessor = () => {
  const index = professores.value.findIndex(p => p.id === editingProfessor.value.id)
  if (index !== -1) {
    professores.value[index] = { ...editingProfessor.value }
  }
  $swal.toast.fire({ icon: 'success', title: 'Professor atualizado com sucesso!' })
  closeModal()
}

const handleDeleteProfessor = async (professor) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir o professor "${professor.nome}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    professores.value = professores.value.filter(p => p.id !== professor.id)
    $swal.toast.fire({ icon: 'success', title: 'Professor excluído com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Professores</h1>
        <p class="page__subtitle">Gerencie todos os professores da instituição</p>
      </div>
      <NuxtLink to="/dashboard/professores/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Novo Professor
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar professor por nome..." />
      <select class="filters__select">
        <option>Todas as Disciplinas</option>
        <option>OPP</option>
        <option>Oratória</option>
        <option>Matemática</option>
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
            <th>Professor</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Disciplina</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="professor in professores" :key="professor.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__avatar">{{ getInitials(professor.nome) }}</div>
                <span>{{ professor.nome }}</span>
              </div>
            </td>
            <td>{{ professor.email }}</td>
            <td>{{ professor.telefone }}</td>
            <td>{{ professor.disciplina }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{ professor.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(professor)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteProfessor(professor)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :is-open="isModalOpen" :title="`Editar Professor: ${editingProfessor?.nome || ''}`" @close="closeModal">
      <form v-if="editingProfessor" @submit.prevent="handleUpdateProfessor" class="form">
        <div class="form__group">
          <label for="edit-nome" class="form__label">Nome completo</label>
          <input id="edit-nome" v-model="editingProfessor.nome" type="text" class="form__input" placeholder="Digite o nome completo" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-email" class="form__label">E-mail</label>
            <input id="edit-email" v-model="editingProfessor.email" type="email" class="form__input" placeholder="Digite o e-mail" required />
          </div>
          <div class="form__group">
            <label for="edit-telefone" class="form__label">Telefone</label>
            <input id="edit-telefone" v-model="editingProfessor.telefone" type="text" class="form__input" placeholder="(00) 00000-0000" required />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-disciplina" class="form__label">Disciplina</label>
          <input id="edit-disciplina" v-model="editingProfessor.disciplina" type="text" class="form__input" placeholder="Digite a disciplina" required />
        </div>

        <div class="form__group">
          <label for="edit-status" class="form__label">Status</label>
          <select id="edit-status" v-model="editingProfessor.status" class="form__select" required>
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
