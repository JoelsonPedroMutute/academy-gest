<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { estaAutenticado } = useAuth();
const { data: cursos, refresh } = await useAsyncData("cursos", () =>
  useIFetch("admin/courses")
);

watch(estaAutenticado, (autenticado) => {
  if (autenticado) {
    refresh();
  }
});

const isModalOpen = ref(false);
const editingCurso = ref(null);

const openEditModal = (curso) => {
  editingCurso.value = { ...curso };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingCurso.value = null;
};

const handleUpdateCurso = async () => {
  try {
    await useIFetch(`admin/courses/${editingCurso.value.id}`, {
      method: "PUT",
      body: {
        name: editingCurso.value.name,
        description: editingCurso.value.description,
        duration: editingCurso.value.duration,
        code: editingCurso.value.code,
      },
    });

    await refresh();
    $swal.toast.fire({ icon: "success", title: "Curso atualizado com sucesso!" });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar curso" });
  }
};

const handleDeleteCurso = async (curso) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir o curso "${curso.name}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/courses/${curso.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({ icon: "success", title: "Curso eliminado com sucesso!" });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar curso" });
  }
};
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
      <input
        type="text"
        class="filters__search"
        placeholder="Buscar curso por nome..."
      />
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
            <th>Descrição</th>
            <th>Duração</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="curso in cursos?.data || []" :key="curso.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--purple">
                  <i class="ti ti-books"></i>
                </div>
                <span>{{ curso.name }}</span>
              </div>
            </td>
            <td>{{ curso.description || "-" }}</td>
            <td>{{ curso.duration ? `${curso.duration} anos` : "-" }}</td>
            <td>
              <span class="status-tag status-tag--ativa">Ativo</span>
            </td>
            <td>
              <div class="actions">
                <button
                  class="action-btn action-btn--edit"
                  @click="openEditModal(curso)"
                >
                  Editar
                </button>
                <button
                  class="btn btn--primary btn--danger"
                  @click="handleDeleteCurso(curso)"
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
      v-if="editingCurso"
      :is-open="isModalOpen"
      :title="'Editar Curso: ' + editingCurso.name"
      @close="closeModal"
    >
      <form @submit.prevent="handleUpdateCurso" class="form">
        <div class="form__group">
          <label for="edit-name" class="form__label">Nome do Curso</label>
          <input
            id="edit-name"
            v-model="editingCurso.name"
            type="text"
            class="form__input"
            placeholder="Digite o nome do curso"
            required
          />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-duration" class="form__label"
              >Duração (anos)</label
            >
            <input
              id="edit-duration"
              v-model.number="editingCurso.duration"
              type="number"
              min="1"
              max="10"
              class="form__input"
              placeholder="Ex: 4"
            />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-description" class="form__label">Descrição</label>
          <textarea
            id="edit-description"
            v-model="editingCurso.description"
            class="form__input"
            placeholder="Digite a descrição"
            rows="3"
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
