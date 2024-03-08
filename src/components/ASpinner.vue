<script>
/**
 * @component ASpinner
 * @description A Vue component that renders a loading indicator
 */
export default {};
</script>
<template>
  <div class="loader-container">
    <span class="loader" />
  </div>
</template>
<style scoped>
.loader-container {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 0.5em 0;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #025feb;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
