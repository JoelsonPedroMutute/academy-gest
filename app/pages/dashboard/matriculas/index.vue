<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { data: matriculas, refresh } = await useAsyncData("matriculas", () =>
  useIFetch("admin/enrollments")
);

const isModalOpen = ref(false);
const editingMatricula = ref(null);

const openEditModal = (matricula) => {
  editingMatricula.value = { ...matricula };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingMatricula.value = null;
};

const handleUpdateMatricula = async () => {
  try {
    await useIFetch(`admin/enrollments/${editingMatricula.value.id}`, {
      method: "PUT",
      body: {
        student_id: editingMatricula.value.student_id,
        school_class_id: editingMatricula.value.school_class_id,
        academic_year: editingMatricula.value.academic_year,
        semester: editingMatricula.value.semester,
        enrollment_date: editingMatricula.value.enrollment_date,
        status: editingMatricula.value.status,
      },
    });

    await refresh();
    $swal.toast.fire({
      icon: "success",
      title: "Matrícula atualizada com sucesso!",
    });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar matrícula" });
  }
};

const handleDeleteMatricula = async (matricula) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir esta matrícula. Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/enrollments/${matricula.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({
        icon: "success",
        title: "Matrícula eliminada com sucesso!",
      });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar matrícula" });
  }
};
</script>

<template>
  <div class="page">
    <div class="page__head">
      <div>
        <h1 class="page__title">Gestão de Matrículas</h1>
        <p class="page__subtitle">
          Gerencie todas as matrículas da instituição
        </p>
      </div>
      <NuxtLink to="/dashboard/matriculas/criar" class="btn btn--primary">
        <i class="ti ti-plus"></i>
        Nova Matrícula
      </NuxtLink>
    </div>

    <div class="filters">
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar matrícula por aluno..."
      />
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
            <th>Ano Letivo</th>
            <th>Semestre</th>
            <th>Data da Matrícula</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="matricula in matriculas?.data || []" :key="matricula.id">
            <td>{{ matricula.academic_year || "-" }}</td>
            <td>
              {{ matricula.semester ? `${matricula.semester}º Semestre` : "-" }}
            </td>
            <td>{{ matricula.enrollment_date || "-" }}</td>
            <td>
              <span
                :class="[
                  'status-tag',
                  matricula.status === 'active' ? 'status-tag--ativa' : '',
                ]"
              >
                {{
                  matricula.status
                    ? matricula.status.charAt(0).toUpperCase() +
                      matricula.status.slice(1)
                    : "-"
                }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(matricula)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteMatricula(matricula)"
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
      v-if="editingMatricula"
      :is-open="isModalOpen"
      :title="'Editar Matrícula: ' + (editingMatricula.id || '')"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateMatricula" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="edit-academic_year" class="form__label"
              >Ano Letivo</label
            >
            <input
              id="edit-academic_year"
              v-model="editingMatricula.academic_year"
              type="text"
              class="form__input"
              placeholder="Ano letivo"
            />
          </div>
          <div class="form__group">
            <label for="edit-semester" class="form__label">Semestre</label>
            <input
              id="edit-semester"
              v-model.number="editingMatricula.semester"
              type="number"
              min="1"
              max="2"
              class="form__input"
              placeholder="Semestre"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-enrollment_date" class="form__label"
              >Data da Matrícula</label
            >
            <input
              id="edit-enrollment_date"
              v-model="editingMatricula.enrollment_date"
              type="date"
              class="form__input"
              placeholder="Data de matrícula"
            />
          </div>
          <div class="form__group">
            <label for="edit-status" class="form__label">Status</label>
            <select
              id="edit-status"
              v-model="editingMatricula.status"
              class="form__select"
            >
              <option value="">Selecione o status</option>
              <option value="active">Ativa</option>
              <option value="suspended">Suspensa</option>
              <option value="cancelled">Cancelada</option>
              <option value="completed">Concluída</option>
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
