<script setup>
definePageMeta({
  layout: "default",
})

const { $swal } = useNuxtApp()
const router = useRouter()

const { data: cursos } = await useAsyncData('cursos', () => useIFetch('admin/courses'))


const form = ref({
  name: '',
  description: '',
  course_id: null,
  hourly_load: null
})

const handleSubmit = async () => {

  try {
    await useIFetch('admin/subjects', {
      method: 'POST',
      body: form.value
    })

    $swal.toast.fire({ icon: 'success', title: 'Disciplina criada com sucesso!' })
    router.push('/dashboard/disciplinas')
  } catch (error) {
    $swal.toast.fire({ icon: 'error', title: 'Erro ao criar disciplina' })
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-page__header">
      <NuxtLink to="/dashboard/disciplinas" class="form-page__back">
        <i class="ti ti-arrow-left"></i>
        Voltar
      </NuxtLink>
      <h1 class="form-page__title">Nova Disciplina</h1>
    </div>

    <div class="form-page__card">
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form__group">
          <label for="name" class="form__label">Nome da Disciplina</label>
          <input id="name" v-model="form.name" type="text" class="form__input" placeholder="Digite o nome da disciplina" required />
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="course_id" class="form__label">Curso</label>
            <select id="course_id" v-model="form.course_id" class="form__select" required>
              <option :value="null">Selecione um curso</option>
              <option v-for="curso in cursos?.data" :key="curso.id" :value="curso.id">
                {{ curso.name }}
              </option>
            </select>
          </div>
          <div class="form__group">
            <label for="hourly_load" class="form__label">Carga Horária</label>
            <input id="hourly_load" v-model.number="form.hourly_load" type="number" min="1" class="form__input" placeholder="Ex: 60" />
          </div>
        </div>

        <div class="form__group">
          <label for="description" class="form__label">Descrição</label>
          <textarea id="description" v-model="form.description" class="form__input" placeholder="Digite a descrição" rows="3" />
        </div>

        <div class="form__actions">
          <NuxtLink to="/dashboard/disciplinas" class="form__button form__button--secondary">
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
