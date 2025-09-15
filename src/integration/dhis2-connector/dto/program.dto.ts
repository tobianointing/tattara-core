export interface Dhis2Program {
  id: string;
  displayName: string;
  [key: string]: unknown;
}

export interface Dhis2ProgramResponse {
  programs: Dhis2Program[];
}
