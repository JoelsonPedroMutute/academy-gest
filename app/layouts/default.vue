
<script setup>
const { logout, user } = useAuth();
const router = useRouter();
const route = useRoute();

const sairDaSessao = async () => {
  await logout();
  await router.push("/login");
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

const isActive = (to) => {
  if (to === "/dashboard") return route.path === "/dashboard";
  return route.path.startsWith(to);
};

const iniciaisNome = computed(() => {
  if (!user.value?.nome) return "U";
  return user.value.nome
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
                {{ user?.nome ?? "Utilizador" }} —
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
$red: #c0392b
$red-dark: #a93226
$sidebar-w: 280px
$topbar-h: 64px

// ─── Layout base ─────────────────────────────────────────
.app-layout
    display: flex
    min-height: 100vh
    background: #f4f4f6

.app-main
    flex: 1
    display: flex
    flex-direction: column
    min-width: 0

.app-content
    flex: 1
    padding: 2rem 2.5rem
    overflow-y: auto

// ─── Sidebar ─────────────────────────────────────────────
.sidebar
    width: $sidebar-w
    min-height: 100vh
    background: #fff
    border-right: 1px solid #ebebeb
    display: flex
    flex-direction: column
    flex-shrink: 0

    &__brand
        display: flex
        align-items: center
        gap: 0.625rem
        padding: 1rem 1.25rem
        border-bottom: 1px solid #ebebeb
        min-height: $topbar-h

    &__brand-icon
        width: 32px
        height: 32px
        border-radius: 8px
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        flex-shrink: 0

        i
            font-size: 16px

    &__brand-name
        font-size: 1rem
        font-weight: 700
        color: #111827
        flex: 1

    &__brand-chevron
        background: none
        border: none
        cursor: pointer
        color: #9ca3af
        display: flex
        padding: 0

        i
            font-size: 16px

    &__nav
        flex: 1
        padding: 1.25rem 0.75rem
        overflow-y: auto

    &__nav-label
        font-size: 0.7rem
        font-weight: 600
        color: #9ca3af
        text-transform: uppercase
        letter-spacing: 0.07em
        padding: 0 0.625rem
        margin: 0 0 0.625rem

    &__nav-list
        list-style: none
        margin: 0
        padding: 0
        display: flex
        flex-direction: column
        gap: 2px

    &__nav-item
        display: flex
        align-items: center
        gap: 0.75rem
        padding: 0.625rem 0.75rem
        border-radius: 8px
        font-size: 0.9rem
        font-weight: 500
        color: #4b5563
        text-decoration: none
        transition: background 0.15s, color 0.15s

        i
            font-size: 18px
            flex-shrink: 0

        &:hover
            background: #f3f4f6
            color: #111827

        &--active
            background: $red
            color: #fff

            &:hover
                background: $red-dark
                color: #fff

    &__footer
        padding: 0.75rem
        border-top: 1px solid #ebebeb

    &__logout
        display: flex
        align-items: center
        gap: 0.75rem
        width: 100%
        padding: 0.7rem 0.75rem
        border-radius: 8px
        background: $red
        color: #fff
        border: none
        cursor: pointer
        font-size: 0.9rem
        font-weight: 600
        transition: background 0.15s

        i
            font-size: 18px

        &:hover
            background: $red-dark

// ─── Topbar ──────────────────────────────────────────────
.topbar
    height: $topbar-h
    background: #fff
    border-bottom: 1px solid #ebebeb
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 2rem
    flex-shrink: 0

    &__left,
    &__right
        display: flex
        align-items: center
        gap: 0.75rem

    &__icon-btn
        width: 36px
        height: 36px
        border-radius: 8px
        background: none
        border: none
        cursor: pointer
        color: #6b7280
        display: flex
        align-items: center
        justify-content: center
        transition: background 0.15s, color 0.15s

        i
            font-size: 20px

        &:hover
            background: #f3f4f6
            color: #111827

    &__avatar
        width: 36px
        height: 36px
        border-radius: 50%
        background: $red
        color: #fff
        display: flex
        align-items: center
        justify-content: center
        font-size: 0.8rem
        font-weight: 700
        flex-shrink: 0

    &__user
        display: flex
        align-items: center
        gap: 0.625rem

    &__user-info
        display: flex
        flex-direction: column
        line-height: 1.3

    &__user-name
        font-size: 0.85rem
        color: #111827

        strong
            font-weight: 700

    &__user-role
        font-size: 0.775rem
        color: #9ca3af
</style>
