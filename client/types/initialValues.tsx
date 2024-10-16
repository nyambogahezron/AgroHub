export const GlobalContextInitialValues = {
  User: null,
  setUser: () => {},
  isLoading: false,
  session: null,
  organization: null,
  setSession: () => {},
  deleteSession: () => {},
  getOrganization: () => Promise<void>,
  deleteOrganization: () => {},
  setUserOrganization: () => {},
  currentOrganization: null,
  setCurrentOrganizationData: () => {},
};
