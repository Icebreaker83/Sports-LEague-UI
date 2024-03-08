<script>
/**
 * @component TheHeader
 * @description This component renders the application header, containing the logo and navigation links.
 */
export default {};
</script>
<template>
  <header class="header-container">
    <img src="../../public/images/logo.svg" alt="Logo" class="header-logo" />
    <div class="header-link-container">
      <router-link :to="{ name: 'schedule' }" class="header-link">
        <img
          src="../../public/images/schedule.png"
          alt="Schedule icon"
          class="header-link-icon"
        />
        <span class="header-link-text">
          {{ $t('league.schedule.self') }}
        </span>
      </router-link>
      <router-link :to="{ name: 'leaderboard' }" class="header-link">
        <img
          src="../../public/images/leaderboard.png"
          alt="Leaderboard icon"
          class="header-link-icon"
        />
        <span class="header-link-text">
          {{ $t('league.leaderboard.self') }}
        </span>
      </router-link>
    </div>
  </header>
</template>
<style scoped>
.header-container {
  align-items: center;
  background-color: #025feb;
  color: #ffffff;
  display: flex;
  font-size: 16px;
  height: 60px;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;

  .header-logo {
    width: 110px;
  }

  .header-link-container {
    display: flex;
    .header-link {
      align-items: center;
      background-color: transparent;
      border: none;
      color: inherit;
      display: flex;
      font-size: inherit;
      gap: 0.5em;
      text-decoration: none;

      .header-link-icon {
        height: 25px;
      }
      .header-link-text {
        @media screen and (max-width: 470px) {
          display: none;
        }
      }

      &:not(:first-child) {
        margin-left: 40px;
      }
    }
  }
}
</style>
