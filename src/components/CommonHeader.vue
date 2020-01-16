<template>
  <nav class="navbar navbar-right">
    <div class=" p-appIcon"></div>
    <div class="p-navbar-links">
      <a class="p-link" href="#">Scan</a>
      <a class="p-link" href="#">登録済書籍</a>
    </div>
  </nav>
</template>

<script></script>

<style scoped>
.navbar {
  background-color: #007bbf;
  height: 3em;
  width: 100%;
}

.p-appIcon {
  display: flex;
  justify-content: flex-start;
}

.p-navbar-links {
  display: flex;
  justify-content: flex-end;
}

.p-link {
  color: white;
  text-decoration: none;
  display: inline-block;
  margin: 0.7em 0.7em;
}
</style>
