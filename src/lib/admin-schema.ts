export const workAdminFields = [
  "Work ID",
  "Title",
  "Description",
  "Language",
  "Type",
  "Status",
  "Price",
  "Tax configuration",
  "Audio",
  "Film",
  "AI-assisted",
  "Publication date",
  "Copyright owner",
  "Version",
  "Published status",
] as const;

export const paidAdminFields = [
  "Price",
  "Payment status",
  "Access rights",
  "Purchase history",
] as const;

export const adminActions = [
  "Create work",
  "Edit work",
  "Publish / unpublish",
  "Set FREE / PAID",
  "Change price",
  "Upload book files",
  "Upload audio",
  "Upload video",
  "Upload film",
  "Manage chapters",
  "Manage language versions",
] as const;

export const versionFields = [
  "Version number",
  "Publication date",
  "Status",
  "File",
  "Language",
] as const;
