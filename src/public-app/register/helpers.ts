export const redirectToWorkspace = (workspace: string) => {
  const host = process.env.REACT_APP_HOST;
  const sub = workspace.toLowerCase();
  window.location.hostname = `${sub}.${host}`;
};
