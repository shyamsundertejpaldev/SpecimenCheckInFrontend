import { reactive } from "vue";

export const store = reactive({
  selectedManifestId: null,
  manifests: [],
  specimens: [],
  loading: false,
  userRole: 3 // Example: Admin (can be set dynamically later)
});
