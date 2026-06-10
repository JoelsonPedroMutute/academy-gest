<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { data: turmas, refresh } = await useAsyncData("turmas", () =>
  useIFetch("admin/classes")
);

const isModalOpen = ref(false);
const editingTurma = ref(null);

const openEditModal = (turma) => {
  editingTurma.value = { ...turma };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingTurma.value = null;
};

const handleUpdateTurma = async () => {
  try {
    await useIFetch(`admin/classes/${editingTurma.value.id}`, {
      method: "PUT",
      body: {
        name: editingTurma.value.name,
        course_id: editingTurma.value.course_id,
        academic_year: editingTurma.value.academic_year,
        semester: editingTurma.value.semester,
        capacity: editingTurma.value.capacity,
        shift: editingTurma.value.shift,
      },
    });

    await refresh();
    $swal.toast.fire({
      icon: "success",
      title: "Turma atualizada com sucesso!",
    });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar turma" });
  }
};

const handleDeleteTurma = async (turma) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir a turma "${turma.name}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/classes/${turma.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({
        icon: "success",
        title: "Turma eliminada com sucesso!",
      });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar turma" });
  }
};
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
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar turma por nome..."
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
            <th>Ano Letivo</th>
            <th>Semestre</th>
            <th>Capacidade</th>
            <th>Turno</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turma in turmas?.data || []" :key="turma.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--purple">
                  <i class="ti ti-users-group"></i>
                </div>
                <span>{{ turma.name }}</span>
              </div>
            </td>
            <td>{{ turma.academic_year || "-" }}</td>
            <td>{{ turma.semester ? `${turma.semester}º Semestre` : "-" }}</td>
            <td>{{ turma.capacity || "-" }}</td>
            <td>
              {{
                turma.shift
                  ? turma.shift.charAt(0).toUpperCase() + turma.shift.slice(1)
                  : "-"
              }}
            </td>
            <td>
              <span class="status-tag status-tag--ativa">Ativo</span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(turma)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteTurma(turma)"
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
      v-if="editingTurma"
      :is-open="isModalOpen"
      :title="'Editar Turma: ' + editingTurma.name"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateTurma" class="form">
        <div class="form__group">
          <label for="edit-name" class="form__label">Nome da Turma</label>
          <input
            id="edit-name"
            v-model="editingTurma.name"
            type="text"
            class="form__input"
            placeholder="Digite o nome da turma"
            required
          />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-academic_year" class="form__label"
              >Ano Letivo</label
            >
            <input
              id="edit-academic_year"
              v-model.number="editingTurma.academic_year"
              type="number"
              min="2000"
              max="2100"
              class="form__input"
              placeholder="Ex: 2024"
            />
          </div>
          <div class="form__group">
            <label for="edit-semester" class="form__label">Semestre</label>
            <select
              id="edit-semester"
              v-model.number="editingTurma.semester"
              class="form__select"
            >
              <option :value="null">Selecione um semestre</option>
              <option :value="1">1º Semestre</option>
              <option :value="2">2º Semestre</option>
            </select>
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-capacity" class="form__label">Capacidade</label>
            <input
              id="edit-capacity"
              v-model.number="editingTurma.capacity"
              type="number"
              min="1"
              class="form__input"
              placeholder="Capacidade máxima"
            />
          </div>
          <div class="form__group">
            <label for="edit-shift" class="form__label">Turno</label>
            <select
              id="edit-shift"
              v-model="editingTurma.shift"
              class="form__select"
            >
              <option value="">Selecione um turno</option>
              <option value="morning">Manhã</option>
              <option value="afternoon">Tarde</option>
              <option value="night">Noite</option>
            </select>
          </div>
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
