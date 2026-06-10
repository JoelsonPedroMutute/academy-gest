<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const form = ref({
  student_id: null,
  course_id: null,
  school_class_id: null,
  academic_year: '',
  semester: null,
  capacity: null,
  shift: '',
  status: 'active',
  enrollment_date: null
})

const handleSubmit = async () => {
  try {
    await useIFetch('admin/enrollments', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Matrícula criada com sucesso!' })
    router.push('/dashboard/matriculas')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar matrícula' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/matriculas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Matrícula</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__row">
          <div class="form__group">
            <label for="academic_year" class="form__label">Ano Letivo</label>
            <input id="academic_year" v-model="form.academic_year" type="text" class="form__input" placeholder="Ano letivo" />
          </div>
          <div class="form__group">
            <label for="semester" class="form__label">Semestre</label>
            <input id="semester" v-model.number="form.semester" type="number" min="1" max="2" class="form__input" placeholder="Semestre" />
          </div>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="enrollment_date" class="form__label">Data da Matrícula</label>
            <input id="enrollment_date" v-model="form.enrollment_date" type="date" class="form__input" placeholder="Data de matrícula" />
          </div>
          <div class="form__group">
            <label for="status" class="form__label">Status</label>
            <select id="status" v-model="form.status" class="form__select">
              <option value="active">Ativa</option>
              <option value="suspended">Suspensa</option>
              <option value="cancelled">Cancelada</option>
              <option value="completed">Concluída</option>
            </select>
          </div>
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/matriculas" class="form__button form__button--secondary">
            Cancelar
          </NuxtLink>
          <button type="submit" class="form__button form__button--primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass">
// Estilos globais já estão no style.sass
</style>
