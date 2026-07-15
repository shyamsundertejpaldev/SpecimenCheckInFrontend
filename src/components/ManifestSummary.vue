<template>
  <div v-if="manifest" class="summary">
    <h2>Manifest {{ manifest.code }}</h2>
    <p>From Lab ID {{ manifest.labId }} • Status: {{ ManifestStatus[manifest.status] }}</p>

    <div class="stats">
      <div><strong>{{ expected }}</strong><br />Expected</div>
      <div><strong>{{ received }}</strong><br />Received</div>
      <div><strong>{{ pending }}</strong><br />Pending</div>
      <div><strong>{{ flagged }}</strong><br />Flagged</div>
    </div>

    <div class="actions">
      <!-- ✅ Hide if manifest is closed -->
      <button class="primary" @click="closeManifest" v-if="manifest.status !== 2">
        Mark Received & Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { store } from "../store";
import { performAction, getManifests } from "../Api";
import { ACTIONS, ManifestStatus } from "../constants";

const manifest = computed(() =>
  store.manifests.find((m) => m.manifestId === store.selectedManifestId)
);

const expected = computed(() => store.specimens.length);
const received = computed(() => store.specimens.filter(s => s.status === 2).length);
const pending = computed(() => store.specimens.filter(s => s.status === 1).length);
const flagged = computed(() => store.specimens.filter(s => s.status === 3).length);

const flagDiscrepancy = () => alert("Discrepancy flagged!");
const closeManifest = async () => {
  await performAction({
    manifestId: store.selectedManifestId,
    specimenId: 0,
    action: ACTIONS.CLOSE,
    closeManifest: true
  });
  const res = await getManifests();
  store.manifests = res.data.data.manifest;
};
</script>

<style scoped>
.summary {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.stats {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  text-align: center;
}
.actions {
  display: flex;
  gap: 1rem;
}
</style>
