<template>
  <div class="auth-wrapper">
    <div class="auth-bg">
      <div class="auth-bg__logo" aria-hidden="true"></div>
      <div class="auth-bg__logo auth-bg__logo--2" aria-hidden="true"></div>
    </div>
    <slot />
  </div>
</template>

<style lang="sass">
.auth-wrapper
    min-height: 100vh
    display: flex
    align-items: center
    justify-content: center
    background-color: #f5f5f5
    position: relative
    overflow: hidden

.auth-bg
    position: absolute
    inset: 0
    pointer-events: none

    &__logo
        position: absolute
        width: 420px
        height: 420px
        border-radius: 50%
        background: rgba(#c0392b, 0.06)
        top: -120px
        right: -100px

    &__logo--2
        width: 300px
        height: 300px
        bottom: -80px
        left: -80px
        top: unset
        right: unset
        background: rgba(#c0392b, 0.04)
</style>