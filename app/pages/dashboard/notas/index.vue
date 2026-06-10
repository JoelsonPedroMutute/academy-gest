<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { data: notas, refresh } = await useAsyncData("notas", () =>
  useIFetch("admin/grades")
);

const isModalOpen = ref(false);
const editingNota = ref(null);

const openEditModal = (nota) => {
  editingNota.value = { ...nota };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingNota.value = null;
};

const handleUpdateNota = async () => {
  try {
    await useIFetch(`admin/grades/${editingNota.value.id}`, {
      method: "PUT",
      body: {
        student_id: editingNota.value.student_id,
        subject_id: editingNota.value.subject_id,
        class_id: editingNota.value.class_id,
        trimester_exam: editingNota.value.evaluations?.trimester_exam,
        semester_exam: editingNota.value.evaluations?.semester_exam,
        final_exam: editingNota.value.evaluations?.final_exam,
      },
    });

    await refresh();
    $swal.toast.fire({
      icon: "success",
      title: "Nota atualizada com sucesso!",
    });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar nota" });
  }
};

const handleDeleteNota = async (nota) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir esta nota. Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/grades/${nota.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({
        icon: "success",
        title: "Nota eliminada com sucesso!",
      });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar nota" });
  }
};
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
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar nota por aluno..."
      />
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
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota Final</th>
            <th>Média Final</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nota in notas?.data || []" :key="nota.id">
            <td>
              {{
                nota.evaluations?.trimester_exam
                  ? nota.evaluations.trimester_exam.toFixed(1)
                  : "-"
              }}
            </td>
            <td>
              {{
                nota.evaluations?.semester_exam
                  ? nota.evaluations.semester_exam.toFixed(1)
                  : "-"
              }}
            </td>
            <td>
              {{
                nota.evaluations?.final_exam
                  ? nota.evaluations.final_exam.toFixed(1)
                  : "-"
              }}
            </td>
            <td>
              <strong>{{
                nota.final_average ? nota.final_average.toFixed(1) : "-"
              }}</strong>
            </td>
            <td>
              <span
                :class="[
                  'status-tag',
                  nota.status === 'approved'
                    ? 'status-tag--ativa'
                    : nota.status === 'recovery'
                    ? 'status-tag--semester'
                    : 'status-tag--inativa',
                ]"
              >
                {{
                  nota.status
                    ? nota.status.charAt(0).toUpperCase() + nota.status.slice(1)
                    : "-"
                }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(nota)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteNota(nota)"
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
      v-if="editingNota"
      :is-open="isModalOpen"
      :title="'Editar Nota: ' + (editingNota.id || '')"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateNota" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="edit-trimester_exam" class="form__label"
              >Nota Trimestre</label
            >
            <input
              id="edit-trimester_exam"
              v-model.number="editingNota.evaluations.trimester_exam"
              type="number"
              step="0.1"
              class="form__input"
              placeholder="Ex: 7.5"
            />
          </div>
          <div class="form__group">
            <label for="edit-semester_exam" class="form__label"
              >Nota Semestre</label
            >
            <input
              id="edit-semester_exam"
              v-model.number="editingNota.evaluations.semester_exam"
              type="number"
              step="0.1"
              class="form__input"
              placeholder="Ex: 8.0"
            />
          </div>
        </div>
        <div class="form__group">
          <label for="edit-final_exam" class="form__label">Nota Final</label>
          <input
            id="edit-final_exam"
            v-model.number="editingNota.evaluations.final_exam"
            type="number"
            step="0.1"
            class="form__input"
            placeholder="Ex: 8.5"
          />
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
