<template>
  <aside class="sidebar">
    <h3>Recent Manifests</h3>
    <ul>
      <li v-for="m in store.manifests" :key="m.manifestId" @click="selectManifest(m.manifestId)">
        <div class="manifest-code">{{ m.code }}</div>
        <div class="manifest-status">{{ ManifestStatus[m.status] }}</div>
      </li>
    </ul>
    <button class="primary">View All Manifests</button>
  </aside>
</template>

<script setup>
import { onMounted } from "vue";
import { store } from "../store";
import { getManifests } from "../Api";
import { ManifestStatus } from "../constants";

const selectManifest = (id) => {
  store.selectedManifestId = id;
};

onMounted(async () => {
  const res = await getManifests();
  store.manifests = res.data.data.manifest;
});
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #f1f5f9;
  padding: 1rem;
  border-right: 1px solid #e2e8f0;
}
.manifest-code {
  font-weight: 600;
}
.manifest-status {
  font-size: 0.85rem;
  color: #475569;
}
li {
  margin-bottom: 0.75rem;
  cursor: pointer;
}
</style>
