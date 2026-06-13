/**
 * Workspace payload helpers.
 */
import { buildBackupPayload } from "./exportHelpers.js";

export function buildCurrentWorkspacePayload(workspaceData) {
  return buildBackupPayload(workspaceData);
}
