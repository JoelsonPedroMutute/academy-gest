<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { estaAutenticado } = useAuth();
const { data: alunos, refresh } = await useAsyncData("alunos", () =>
  useIFetch("admin/students")
);

watch(estaAutenticado, (autenticado) => {
  if (autenticado) {
    refresh();
  }
});

const isModalOpen = ref(false);
const editingAluno = ref(null);

const getInitials = (name) => {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
};

const openEditModal = (aluno) => {
  editingAluno.value = {
    ...aluno,
    name: aluno.user.name,
    email: aluno.user.email,
    phone: aluno.user.phone,
    address: aluno.user.address,
    bi: aluno.user.bi,
    gender: aluno.user.gender,
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingAluno.value = null;
};

const handleUpdateAluno = async () => {
  try {
    await useIFetch(`admin/students/${editingAluno.value.id}`, {
      method: "PUT",
      body: {
        name: editingAluno.value.name,
        email: editingAluno.value.email,
        phone: editingAluno.value.phone,
        address: editingAluno.value.address,
        bi: editingAluno.value.bi,
        gender: editingAluno.value.gender,
        birth_date: editingAluno.value.birth_date,
        student_number: editingAluno.value.student_number,
      },
    });

    await refresh();
    $swal.toast.fire({ icon: "success", title: "Aluno atualizado com sucesso!" });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar aluno" });
  }
};

const handleDeleteAluno = async (aluno) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir o aluno "${aluno.user.name}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/students/${aluno.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({ icon: "success", title: "Aluno eliminado com sucesso!" });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar aluno" });
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
      <input type="text" class="filters__search" placeholder="Buscar aluno por nome..." />
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
            <th>Data de Nascimento</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos?.data || []" :key="aluno.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__avatar">{{ getInitials(aluno.user.name) }}</div>
                <span>{{ aluno.user.name }}</span>
              </div>
            </td>
            <td>{{ aluno.user.email }}</td>
            <td>{{ aluno.user.phone || "-" }}</td>
            <td>{{ aluno.birth_date }}</td>
            <td>
              <span class="status-tag status-tag--ativa">Ativo</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(aluno)">
                  Editar
                </button>
                <button class="btn btn--primary btn--danger" @click="handleDeleteAluno(aluno)">
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
      :title="'Editar Aluno: ' + editingAluno.name"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateAluno" class="form">
        <div class="form__group">
          <label for="edit-name" class="form__label">Nome completo</label>
          <input
            id="edit-name"
            v-model="editingAluno.name"
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
            <label for="edit-phone" class="form__label">Telefone</label>
            <input
              id="edit-phone"
              v-model="editingAluno.phone"
              type="text"
              class="form__input"
              placeholder="Digite o telefone"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-birth_date" class="form__label">Data de Nascimento</label>
            <input
              id="edit-birth_date"
              v-model="editingAluno.birth_date"
              type="date"
              class="form__input"
              placeholder="Selecione a data de nascimento"
            />
          </div>
          <div class="form__group">
            <label for="edit-student_number" class="form__label">Número de Aluno</label>
            <input
              id="edit-student_number"
              v-model="editingAluno.student_number"
              type="text"
              class="form__input"
              placeholder="Número de aluno"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-address" class="form__label">Endereço</label>
            <input
              id="edit-address"
              v-model="editingAluno.address"
              type="text"
              class="form__input"
              placeholder="Endereço"
            />
          </div>
          <div class="form__group">
            <label for="edit-bi" class="form__label">BI</label>
            <input
              id="edit-bi"
              v-model="editingAluno.bi"
              type="text"
              class="form__input"
              placeholder="Número de BI"
            />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-gender" class="form__label">Gênero</label>
          <select id="edit-gender" v-model="editingAluno.gender" class="form__select">
            <option value="">Selecione o gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
        </div>

        <div class="form__actions">
          <button type="button" @click="closeModal" class="form__button form__button--secondary">
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
