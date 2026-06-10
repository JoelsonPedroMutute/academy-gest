<script setup>
definePageMeta({
  layout: "default",
});

const { $swal } = useNuxtApp();
const { estaAutenticado } = useAuth();
const { data: disciplinas, refresh } = await useAsyncData("disciplinas", () =>
  useIFetch("admin/subjects")
);
const { data: cursos } = await useAsyncData("cursos", () =>
  useIFetch("admin/courses")
);

watch(estaAutenticado, (autenticado) => {
  if (autenticado) {
    refresh();
  }
});

const isModalOpen = ref(false);
const editingDisciplina = ref(null);

const openEditModal = (disciplina) => {
  editingDisciplina.value = { ...disciplina };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  editingDisciplina.value = null;
};

const handleUpdateDisciplina = async () => {
  try {
    await useIFetch(`admin/subjects/${editingDisciplina.value.id}`, {
      method: "PUT",
      body: {
        name: editingDisciplina.value.name,
        description: editingDisciplina.value.description,
        hourly_load: editingDisciplina.value.hourly_load,
        course_id: editingDisciplina.value.course_id,
      },
    });

    await refresh();
    $swal.toast.fire({ icon: "success", title: "Disciplina atualizada com sucesso!" });
    closeModal();
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao atualizar disciplina" });
  }
};

const handleDeleteDisciplina = async (disciplina) => {
  try {
    const { isConfirmed } = await $swal.modal.fire({
      title: "Tem certeza?",
      text: `Você está prestes a excluir a disciplina "${disciplina.name}". Esta ação não pode ser desfeita!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await useIFetch(`admin/subjects/${disciplina.id}`, {
        method: "DELETE",
      });

      await refresh();
      $swal.toast.fire({ icon: "success", title: "Disciplina eliminada com sucesso!" });
    }
  } catch (error) {
    $swal.toast.fire({ icon: "error", title: "Erro ao eliminar disciplina" });
  }
};
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
            <th>Descrição</th>
            <th>Carga Horária</th>
            <th>Curso</th>
            <th>Status</th>
            <th class="actions__header">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="disciplina in disciplinas?.data || []" :key="disciplina.id">
            <td>
              <div class="cell-name">
                <div class="cell-name__icon cell-name__icon--blue">
                  <i class="ti ti-notebook"></i>
                </div>
                <span>{{ disciplina.name }}</span>
              </div>
            </td>
            <td>{{ disciplina.description || '-' }}</td>
            <td>{{ disciplina.hourly_load ? `${disciplina.hourly_load}h` : '-' }}</td>
            <td>{{ disciplina.course?.name || '-' }}</td>
            <td>
              <span class="status-tag status-tag--ativa">Ativo</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn action-btn--edit" @click="openEditModal(disciplina)">Editar</button>
                <button class="btn btn--primary btn--danger" @click="handleDeleteDisciplina(disciplina)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal v-if="editingDisciplina" :is-open="isModalOpen" :title="'Editar Disciplina: ' + editingDisciplina.name" @close="closeModal">
      <form @submit.prevent="handleUpdateDisciplina" class="form">
        <div class="form__group">
          <label for="edit-name" class="form__label">Nome da Disciplina</label>
          <input id="edit-name" v-model="editingDisciplina.name" type="text" class="form__input" placeholder="Digite o nome da disciplina" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="edit-course_id" class="form__label">Curso</label>
            <select id="edit-course_id" v-model="editingDisciplina.course_id" class="form__select" required>
              <option :value="null">Selecione um curso</option>
              <option v-for="curso in cursos?.data" :key="curso.id" :value="curso.id">{{ curso.name }}</option>
            </select>
          </div>
          <div class="form__group">
            <label for="edit-hourly_load" class="form__label">Carga Horária</label>
            <input id="edit-hourly_load" v-model.number="editingDisciplina.hourly_load" type="number" min="1" class="form__input" placeholder="Ex: 60" />
          </div>
        </div>

        <div class="form__group">
          <label for="edit-description" class="form__label">Descrição</label>
          <textarea id="edit-description" v-model="editingDisciplina.description" class="form__input" placeholder="Digite a descrição" rows="3" />
        </div>

        <div class="form__actions">
          <button type="button" @click="closeModal" class="form__button form__button--secondary">Cancelar</button>
          <button type="submit" class="form__button form__button--primary">Salvar Alterações</button>
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
