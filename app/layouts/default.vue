
<script setup>
const { logout, user } = useAuth();

const sairDaSessao = async () => {
  await logout();
};

const navItems = [
  { label: "Dashboard", icon: "ti-layout-dashboard", to: "/dashboard" },
  { label: "Cursos", icon: "ti-books", to: "/dashboard/cursos" },
  { label: "Disciplinas", icon: "ti-book", to: "/dashboard/disciplinas" },
  { label: "Professores", icon: "ti-users", to: "/dashboard/professores" },
  { label: "Alunos", icon: "ti-school", to: "/dashboard/alunos" },
  { label: "Turmas", icon: "ti-building", to: "/dashboard/turmas" },
  {
    label: "Matrículas",
    icon: "ti-clipboard-list",
    to: "/dashboard/matriculas",
  },
  { label: "Notas", icon: "ti-file-description", to: "/dashboard/notas" },
  { label: "Perfil", icon: "ti-user-circle", to: "/dashboard/perfil" },
];

const route = useRoute();

const isActive = (to) => {
  if (to === "/dashboard") return route.path === "/dashboard";
  return route.path.startsWith(to);
};

const iniciaisNome = computed(() => {
  if (!user.value?.name) return "U";
  return user.value.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar__brand">
        <span class="sidebar__brand-icon">
          <i class="ti ti-star-filled" aria-hidden="true"></i>
        </span>
        <span class="sidebar__brand-name">AcademyGest</span>
        <button class="sidebar__brand-chevron" aria-label="Recolher menu">
          <i class="ti ti-chevron-down" aria-hidden="true"></i>
        </button>
      </div>

      <nav class="sidebar__nav">
        <p class="sidebar__nav-label">Painel de Administração</p>
        <ul class="sidebar__nav-list">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="sidebar__nav-item"
              :class="{ 'sidebar__nav-item--active': isActive(item.to) }"
            >
              <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="sidebar__footer">
        <button class="sidebar__logout" @click="sairDaSessao">
          <i class="ti ti-logout" aria-hidden="true"></i>
          <span>Terminar Sessão</span>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="app-main">
      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar__left">
          <button class="topbar__icon-btn" aria-label="Documentos">
            <i class="ti ti-file-description" aria-hidden="true"></i>
          </button>
        </div>
        <div class="topbar__right">
          <button class="topbar__icon-btn" aria-label="Notificações">
            <i class="ti ti-bell" aria-hidden="true"></i>
          </button>
          <div class="topbar__user">
            <div class="topbar__avatar">{{ iniciaisNome }}</div>
            <div class="topbar__user-info">
              <span class="topbar__user-name">
                {{ user?.name ?? "Utilizador" }} —
                <strong>{{ user?.role ?? "ADMIN" }}</strong>
              </span>
              <span class="topbar__user-role">Gestão Académica</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="app-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="sass">
// ─── Variáveis ───────────────────────────────────────────
$red: #dc2626
$red-dark: #b91c1c
$sidebar-w: 280px
$topbar-h: 68px

// ─── Layout base ─────────────────────────────────────────
.app-layout
    display: flex
    min-height: 100vh
    background: #f8fafc

.app-main
    flex: 1
    display: flex
    flex-direction: column
    min-width: 0

.app-content
    flex: 1
    padding: 2.5rem
    overflow-y: auto

// ─── Sidebar ─────────────────────────────────────────────
.sidebar
    width: $sidebar-w
    min-height: 100vh
    background: #fff
    border-right: 1px solid #e2e8f0
    display: flex
    flex-direction: column
    flex-shrink: 0

    &__brand
        display: flex
        align-items: center
        gap: 0.75rem
        padding: 1.25rem 1.5rem
        border-bottom: 1px solid #e2e8f0
        min-height: $topbar-h

    &__brand-icon
        width: 36px
        height: 36px
        border-radius: 10px
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        flex-shrink: 0

        i
            font-size: 18px

    &__brand-name
        font-size: 1.0625rem
        font-weight: 800
        color: #0f172a
        flex: 1

    &__brand-chevron
        background: none
        border: none
        cursor: pointer
        color: #94a3b8
        display: flex
        padding: 0

        i
            font-size: 18px

    &__nav
        flex: 1
        padding: 1.5rem 1rem
        overflow-y: auto

    &__nav-label
        font-size: 0.75rem
        font-weight: 700
        color: #94a3b8
        text-transform: uppercase
        letter-spacing: 0.08em
        padding: 0 0.75rem
        margin: 0 0 0.75rem

    &__nav-list
        list-style: none
        margin: 0
        padding: 0
        display: flex
        flex-direction: column
        gap: 4px

    &__nav-item
        display: flex
        align-items: center
        gap: 0.875rem
        padding: 0.875rem 1rem
        border-radius: 10px
        font-size: 0.9375rem
        font-weight: 600
        color: #475569
        text-decoration: none
        transition: background 0.15s, color 0.15s, transform 0.1s

        i
            font-size: 20px
            flex-shrink: 0

        &:hover
            background: #f1f5f9
            color: #0f172a

        &--active
            background: $red
            color: #fff
            box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2), 0 2px 4px -2px rgba(220, 38, 38, 0.1)

            &:hover
                background: $red-dark
                color: #fff

    &__footer
        padding: 1rem
        border-top: 1px solid #e2e8f0

    &__logout
        display: flex
        align-items: center
        gap: 0.875rem
        width: 100%
        padding: 0.875rem 1rem
        border-radius: 10px
        background: $red
        color: #fff
        border: none
        cursor: pointer
        font-size: 0.9375rem
        font-weight: 700
        transition: background 0.15s, transform 0.1s, box-shadow 0.15s
        box-shadow: 0 1px 3px 0 rgba(220, 38, 38, 0.2)

        i
            font-size: 20px

        &:hover
            background: $red-dark
            transform: translateY(-1px)
            box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3)

// ─── Topbar ──────────────────────────────────────────────
.topbar
    height: $topbar-h
    background: #fff
    border-bottom: 1px solid #e2e8f0
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 2.5rem
    flex-shrink: 0

    &__left,
    &__right
        display: flex
        align-items: center
        gap: 1rem

    &__icon-btn
        width: 40px
        height: 40px
        border-radius: 10px
        background: none
        border: none
        cursor: pointer
        color: #64748b
        display: flex
        align-items: center
        justify-content: center
        transition: background 0.15s, color 0.15s

        i
            font-size: 22px

        &:hover
            background: #f1f5f9
            color: #0f172a

    &__avatar
        width: 40px
        height: 40px
        border-radius: 50%
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        font-size: 0.875rem
        font-weight: 800
        flex-shrink: 0

    &__user
        display: flex
        align-items: center
        gap: 0.75rem

    &__user-info
        display: flex
        flex-direction: column
        line-height: 1.3

    &__user-name
        font-size: 0.9375rem
        color: #0f172a

        strong
            font-weight: 800

    &__user-role
        font-size: 0.8125rem
        color: #94a3b8
</style>
