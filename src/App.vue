<template>
  <div class="layout">
    <HeaderBar />
    <div class="content">
      <SidebarPanel />
      <main>
        <ManifestSummary />
        <SpecimenTable />
      </main>
    </div>
  </div>
</template>

<script setup>
import HeaderBar from "./components/HeaderBar.vue";
import SidebarPanel from "./components/SidebarPanel.vue";
import ManifestSummary from "./components/ManifestSummary.vue";
import SpecimenTable from "./components/SpecimenTable.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  display: flex;
  flex: 1;
}
main {
  flex: 1;
  padding: 1rem;
}
</style>
