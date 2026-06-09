<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal" @click.stop>
        <div class="modal__header">
          <h2 class="modal__title">{{ title }}</h2>
          <button class="modal__close" @click="closeModal">
            <i class="ti ti-x"></i>
          </button>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="sass">
@use '~/assets/sass/variables' as *

.modal-overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.5)
  display: flex
  align-items: center
  justify-content: center
  z-index: 99999
  padding: $spacing-xl

.modal
  background: $white
  border-radius: $radius-lg
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
  width: 100%
  max-width: 600px
  max-height: 90vh
  overflow-y: auto
  opacity: 1
  transform: scale(1)

  &__header
    display: flex
    align-items: center
    justify-content: space-between
    padding: $spacing-xl
    border-bottom: 1px solid $gray-200

  &__title
    font-size: 1.5rem
    font-weight: 700
    color: $gray-900
    margin: 0

  &__close
    width: 40px
    height: 40px
    border: none
    background: $gray-100
    border-radius: $radius-md
    color: $gray-600
    font-size: 1.5rem
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: background 0.15s, color 0.15s

    &:hover
      background: $gray-200
      color: $gray-900

  &__body
    padding: $spacing-xl

.modal-enter-active,
.modal-leave-active
  transition: opacity 0.2s ease, transform 0.2s ease

.modal-enter-from,
.modal-leave-to
  opacity: 0
  .modal
    transform: scale(0.9)
</style>
