<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();

const alunos = ref([
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana.souza@academia.edu",
    telefone: "(11) 98765-4321",
    curso: "Jornalismo",
    semestre: "3º Semestre",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Pedro Costa",
    email: "pedro.costa@academia.edu",
    telefone: "(11) 91234-5678",
    curso: "Comunicação Social",
    semestre: "2º Semestre",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Lucia Oliveira",
    email: "lucia.oliveira@academia.edu",
    telefone: "(11) 99876-5432",
    curso: "Técnico de Informática",
    semestre: "1º Semestre",
    status: "Ativo",
  },
]);

const isModalOpen = ref(false);
const editingAluno = ref(null);

const modalTitle = computed(() => {
  if (!editingAluno.value) return "";
  return `Editar Aluno: ${editingAluno.value.nome}`;
});

const getInitials = (nome) => {
  return nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const openEditModal = (aluno) => {
  editingAluno.value = { ...aluno };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingAluno.value = null;
};

const handleUpdateAluno = () => {
  const index = alunos.value.findIndex((a) => a.id === editingAluno.value.id);
  if (index !== -1) {
    alunos.value[index] = { ...editingAluno.value };
  }
  $swal.toast.fire({ icon: "success", title: "Aluno atualizado com sucesso!" });
  closeModal();
};

const handleDeleteAluno = async (aluno) => {
  const { isConfirmed } = await $swal.modal.fire({
    title: "Tem certeza?",
    text: `Você está prestes a excluir o aluno "${aluno.nome}". Esta ação não pode ser desfeita!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  });

  if (isConfirmed) {
    alunos.value = alunos.value.filter((a) => a.id !== aluno.id);
    $swal.toast.fire({ icon: "success", title: "Aluno excluído com sucesso!" });
  }
};
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Alunos</h1>
        <p class="page__subtitle">Gerencie todos os alunos da instituição</p>
      </div>
      <NuxtLink to="/dashboard/alunos/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Novo Aluno
      </NuxtLink>
    </div>

    <div class="filters">
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar aluno por nome..."
      />
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
            <th>Aluno</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__avatar">
                  {{ getInitials(aluno.nome) }}
                </div>
                <span>{{ aluno.nome }}</span>
              </div>
            </td>
            <td>{{ aluno.email }}</td>
            <td>{{ aluno.telefone }}</td>
            <td>{{ aluno.curso }}</td>
            <td>{{ aluno.semestre }}</td>
            <td>
              <span class="status-tag status-tag--ativa">{{
                aluno.status
              }}</span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(aluno)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteAluno(aluno)"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal
      v-if="editingAluno"
      :is-open="isModalOpen"
      :title="modalTitle"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateAluno" class="form">
        <div class="form__group">
          <label for="edit-nome" class="form__label">Nome completo</label>
          <input
            id="edit-nome"
            v-model="editingAluno.nome"
            type="text"
            class="form__input"
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-email" class="form__label">E-mail</label>
            <input
              id="edit-email"
              v-model="editingAluno.email"
              type="email"
              class="form__input"
              placeholder="Digite o e-mail"
              required
            />
          </div>
          <div class="form__group">
            <label for="edit-telefone" class="form__label">Telefone</label>
            <input
              id="edit-telefone"
              v-model="editingAluno.telefone"
              type="text"
              class="form__input"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-curso" class="form__label">Curso</label>
            <select
              id="edit-curso"
              v-model="editingAluno.curso"
              class="form__select"
              required
            >
              <option value="">Selecione um curso</option>
              <option>Jornalismo</option>
              <option>Comunicação Social</option>
              <option>Técnico de Informática</option>
            </select>
          </div>
          <div class="form__group">
            <label for="edit-semestre" class="form__label">Semestre</label>
            <select
              id="edit-semestre"
              v-model="editingAluno.semestre"
              class="form__select"
              required
            >
              <option value="">Selecione um semestre</option>
              <option>1º Semestre</option>
              <option>2º Semestre</option>
              <option>3º Semestre</option>
              <option>4º Semestre</option>
            </select>
          </div>
        </div>

        <div class="form__group">
          <label for="edit-status" class="form__label">Status</label>
          <select
            id="edit-status"
            v-model="editingAluno.status"
            class="form__select"
            required
          >
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>

        <div class="form__actions">
          <button
            type="button"
            @click="closeModal"
            class="form__button form__button--secondary"
          >
            Cancelar
          </button>
          <button type="submit" class="form__button form__button--primary">
            Salvar Alterações
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<style lang="sass">
@use '~/assets/sass/variables' as *

.btn--danger
  background: $red
  color: $white
  padding: $spacing-sm $spacing-md
  font-size: 0.875rem

  &:hover
    background: $red-dark
</style>
