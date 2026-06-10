<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { estaAutenticado } = useAuth();
const { data: professores, refresh } = await useAsyncData("professores", () =>
  useIFetch("admin/teachers")
);

watch(estaAutenticado, (autenticado) => {
  if (autenticado) {
    refresh();
  }
});

const isModalOpen = ref(false);
const editingProfessor = ref(null);

const getInitials = (name) => {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
};

const openEditModal = (professor) => {
  editingProfessor.value = {
    ...professor,
    name: professor.user.name,
    email: professor.user.email,
    phone: professor.user.phone,
    address: professor.user.address,
    bi: professor.user.bi,
    gender: professor.user.gender,
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingProfessor.value = null;
};

const handleUpdateProfessor = async () => {
  try {
    await useIFetch(`admin/teachers/${editingProfessor.value.id}`, {
      method: "PUT",
      body: {
        name: editingProfessor.value.name,
        email: editingProfessor.value.email,
        phone: editingProfessor.value.phone,
        address: editingProfessor.value.address,
        bi: editingProfessor.value.bi,
        gender: editingProfessor.value.gender,
        subject: editingProfessor.value.subject,
        academic_qualification: editingProfessor.value.academic_qualification,
      },
    });

    await refresh();
    $swal.toast.fire({ icon: "success", title: "Professor atualizado com sucesso!" });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar professor" });
  }
};

const handleDeleteProfessor = async (professor) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir o professor "${professor.user.name}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/teachers/${professor.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({ icon: "success", title: "Professor eliminado com sucesso!" });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar professor" });
  }
};
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Professores</h1>
        <p class="page__subtitle">
          Gerencie todos os professores da instituição
        </p>
      </div>
      <NuxtLink to="/dashboard/professores/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Novo Professor
      </NuxtLink>
    </div>

    <div class="filters">
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar professor por nome..."
      />
      <select class="filters__select">
        <option>Todas as Especialidades</option>
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
            <th>Especialidade</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="professor in professores?.data || []" :key="professor.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__avatar">
                  {{ getInitials(professor.user.name) }}
                </div>
                <span>{{ professor.user.name }}</span>
              </div>
            </td>
            <td>{{ professor.user.email }}</td>
            <td>{{ professor.user.phone || "-" }}</td>
            <td>{{ professor.specialty || "-" }}</td>
            <td>
              <span class="status-tag status-tag--ativa">Ativo</span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(professor)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteProfessor(professor)"
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
      v-if="editingProfessor"
      :is-open="isModalOpen"
      :title="'Editar Professor: ' + editingProfessor.name"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateProfessor" class="form">
        <div class="form__group">
          <label for="edit-name" class="form__label">Nome completo</label>
          <input
            id="edit-name"
            v-model="editingProfessor.name"
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
              v-model="editingProfessor.email"
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
              v-model="editingProfessor.phone"
              type="text"
              class="form__input"
              placeholder="Digite o telefone"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-birth_date" class="form__label"
              >Data de Nascimento</label
            >
            <input
              id="edit-birth_date"
              v-model="editingProfessor.birth_date"
              type="date"
              class="form__input"
              placeholder="Selecione a data de nascimento"
            />
          </div>
          <div class="form__group">
            <label for="edit-specialty" class="form__label"
              >Especialidade</label
            >
            <input
              id="edit-specialty"
              v-model="editingProfessor.specialty"
              type="text"
              class="form__input"
              placeholder="Especialidade"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-address" class="form__label">Endereço</label>
            <input
              id="edit-address"
              v-model="editingProfessor.address"
              type="text"
              class="form__input"
              placeholder="Endereço"
            />
          </div>
          <div class="form__group">
            <label for="edit-bi" class="form__label">BI</label>
            <input
              id="edit-bi"
              v-model="editingProfessor.bi"
              type="text"
              class="form__input"
              placeholder="Número de BI"
            />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-gender" class="form__label">Gênero</label>
          <select
            id="edit-gender"
            v-model="editingProfessor.gender"
            class="form__select"
          >
            <option value="">Selecione o gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
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
