// Mirror of Domain.Enums

export const ManifestStatus = {
  1: "Open",
  2: "Closed",
  3: "Closed With Discrepancy"
};

export const SpecimenStatus = {
  1: "Pending",
  2: "Received",
  3: "Flagged"
};

export const DiscrepancyType = {
  1: "Missing",
  2: "Off Manifest"
};

export const DiscrepancyStatus = {
  1: "Open",
  2: "Resolved"
};

export const LabType = {
  1: "Central Lab",
  2: "Satellite Lab"
};

export const UserRole = {
  1: "Lab Technician",
  2: "Supervisor",
  3: "Admin"
};

// Action codes for backend
export const ACTIONS = {
  CLOSE: 1,
  RECEIVED: 2,
  FLAGGED: 3
};
