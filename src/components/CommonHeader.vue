<template>
  <nav class="navbar">
    <div class="p-navbar-links">
      <div class=".p-navbar-links-left">
        <v-fa class="p-bookIcon" icon="book" />
      </div>
      <div class="p-navbar-links-right">
        <a class="p-link" href="#">Scan</a>
        <a class="p-link" href="#">書籍一覧</a>
      </div>
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

.p-navbar-links {
  display: flex;
}

.p-navbar-links-left {
  margin-right: auto;
}

.p-navbar-links-right {
  margin-left: auto;
}

.p-bookIcon {
  font-size: 2em;
  margin: 0.2em 0.5em;
}

.p-link {
  color: black;
  text-decoration: none;
  display: inline-block;
  margin: 0.7em 1em;
}
</style>
