<template>
  <div v-if="store.specimens.length" class="table-container">
    <h3>Specimens on Manifest</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Specimen ID</th>
          <th>Patient</th>
          <th>Provider</th>
          <th>Received By</th>
          <th>At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in store.specimens" :key="s.specimenId">
          <td>
            <span :class="statusClass(s.status)" class="status-badge">
              {{ SpecimenStatus[s.status] }}
            </span>
          </td>
          <td>{{ s.code }}</td>
          <td>{{ s.patient }}</td>
          <td>{{ s.provider }}</td>
          <td>Lab Tech 1</td>
          <td>{{ s.receivedAt?.slice(11,16) }}</td>
          <td>
            <!-- Only show buttons if specimen is not already received AND manifest is not closed -->
            <template v-if="s.status !== 2 && manifestStatus !== 2">
              <button @click="markReceived(s.specimenId)" class="secondary">✓</button>
              <button @click="flagSpecimen(s.specimenId)" class="secondary">⚑</button>
            </template>
            <span v-else class="disabled">—</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import { store } from "../store";
import { getSpecimens, performAction } from "../Api";
import { ACTIONS, SpecimenStatus, ManifestStatus } from "../constants";

const loadSpecimens = async () => {
  if (!store.selectedManifestId) return;
  const res = await getSpecimens(store.selectedManifestId);
  store.specimens = res.data.data.specimens;
};

watch(() => store.selectedManifestId, loadSpecimens);

// Get current manifest status
const manifestStatus = computed(() => {
  const m = store.manifests.find((x) => x.manifestId === store.selectedManifestId);
  return m ? m.status : null;
});

const markReceived = async (specimenId) => {
  await performAction({
    manifestId: store.selectedManifestId,
    specimenId,
    action: ACTIONS.RECEIVED,
    closeManifest: false
  });
  await loadSpecimens();
};

const flagSpecimen = async (specimenId) => {
  await performAction({
    manifestId: store.selectedManifestId,
    specimenId,
    action: ACTIONS.FLAGGED,
    closeManifest: false
  });
  await loadSpecimens();
};

// ✅ Status badge color logic
const statusClass = (status) => {
  switch (status) {
    case 1:
      return "status-pending";
    case 2:
      return "status-received";
    case 3:
      return "status-flagged";
    default:
      return "";
  }
};
</script>

<style scoped>
.table-container {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.table th, .table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 10px;
  text-align: left;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-received {
  background-color: #dcfce7;
  color: #166534;
}

.status-pending {
  background-color: #fef9c3;
  color: #854d0e;
}

.status-flagged {
  background-color: #fee2e2;
  color: #991b1b;
}

button.secondary {
  background-color: #f1f5f9;
  color: #1e293b;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button.secondary:hover {
  background-color: #e2e8f0;
}

.disabled {
  color: #9ca3af;
  font-size: 0.85rem;
}
</style>
