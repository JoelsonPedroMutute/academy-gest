<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()

const notas = ref([
  { id: 1, aluno: "Ana Souza", disciplina: "OPP", turma: "Turma A", nota1: 8.5, nota2: 7.5, media: 8.0, status: "Aprovado" },
  { id: 2, aluno: "Pedro Costa", disciplina: "Oratória", turma: "Turma B", nota1: 6.0, nota2: 5.5, media: 5.75, status: "Recuperação" },
  { id: 3, aluno: "Lucia Oliveira", disciplina: "Matemática", turma: "Turma C", nota1: 9.0, nota2: 9.5, media: 9.25, status: "Aprovado" },
])

const isModalOpen = ref(false)
const editingNota = ref(null)

const openEditModal = (nota) => {
  editingNota.value = { ...nota }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingNota.value = null
}

const handleUpdateNota = () => {
  const index = notas.value.findIndex(n => n.id === editingNota.value.id)
  if (index !== -1) {
    const media = (Number(editingNota.value.nota1) + Number(editingNota.value.nota2)) / 2
    const status = media >= 7 ? 'Aprovado' : media >= 5 ? 'Recuperação' : 'Reprovado'
    notas.value[index] = { ...editingNota.value, media, status }
  }
  $swal.toast.fire({ icon: 'success', title: 'Nota atualizada com sucesso!' })
  closeModal()
}

const handleDeleteNota = async (nota) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a excluir a nota de "${nota.aluno}". Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  })
  
  if (isConfirmed) {
    notas.value = notas.value.filter(n => n.id !== nota.id)
    $swal.toast.fire({ icon: 'success', title: 'Nota excluída com sucesso!' })
  }
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Notas</h1>
        <p class="page__subtitle">Gerencie todas as notas da instituição</p>
      </div>
      <NuxtLink to="/dashboard/notas/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Nova Nota
      </NuxtLink>
    </div>

    <div class="filters">
      <input type="text" class="filters__search" placeholder="Buscar nota por aluno..." />
      <select class="filters__select">
        <option>Todas as Disciplinas</option>
        <option>OPP</option>
        <option>Oratória</option>
        <option>Matemática</option>
      </select>
      <select class="filters__select">
        <option>Todas as Turmas</option>
        <option>Turma A</option>
        <option>Turma B</option>
        <option>Turma C</option>
      </select>
      <select class="filters__select">
        <option>Todos os Status</option>
        <option>Aprovado</option>
        <option>Recuperação</option>
        <option>Reprovado</option>
      </select>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Disciplina</th>
            <th>Turma</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Média</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nota in notas" :key="nota.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--purple">
                  <i class="ti ti-clipboard-check"></i>
                </div>
                <span>{{ nota.aluno }}</span>
              </div>
            </td>
            <td>{{ nota.disciplina }}</td>
            <td>{{ nota.turma }}</td>
            <td>{{ nota.nota1.toFixed(1) }}</td>
            <td>{{ nota.nota2.toFixed(1) }}</td>
            <td><strong>{{ nota.media.toFixed(1) }}</strong></td>
            <td>
              <span :class="['status-tag', nota.status === 'Aprovado' ? 'status-tag--ativa' : nota.status === 'Recuperação' ? 'status-tag--semester' : 'status-tag--inativa']">
                {{ nota.status }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(nota)">Editar</button>
                <button class="btn btn--danger" @click="handleDeleteNota(nota)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="editingNota" :is-open="isModalOpen" :title="`Editar Nota: ${editingNota.aluno}`" @close="closeModal">
      <form @submit.prevent="handleUpdateNota" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="edit-aluno" class="form__label">Aluno</label>
            <input id="edit-aluno" v-model="editingNota.aluno" type="text" class="form__input" placeholder="Digite o nome do aluno" required />
          </div>
          <div class="form__group">
            <label for="edit-disciplina" class="form__label">Disciplina</label>
            <input id="edit-disciplina" v-model="editingNota.disciplina" type="text" class="form__input" placeholder="Digite a disciplina" required />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-turma" class="form__label">Turma</label>
          <select id="edit-turma" v-model="editingNota.turma" class="form__select" required>
            <option value="">Selecione uma turma</option>
            <option>Turma A</option>
            <option>Turma B</option>
            <option>Turma C</option>
          </select>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-nota1" class="form__label">Nota 1</label>
            <input id="edit-nota1" v-model.number="editingNota.nota1" type="number" step="0.1" class="form__input" placeholder="Ex: 7.5" required />
          </div>
          <div class="form__group">
            <label for="edit-nota2" class="form__label">Nota 2</label>
            <input id="edit-nota2" v-model.number="editingNota.nota2" type="number" step="0.1" class="form__input" placeholder="Ex: 8.0" required />
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
