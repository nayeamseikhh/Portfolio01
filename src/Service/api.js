const API_URL = import.meta.env.VITE_API_URL;

export const getDatabaseStatus = async () => {
  const response = await fetch(`${API_URL}/db-test`);

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects/`);

  if (!response.ok) {
    throw new Error(`Projects API error: ${response.status}`);
  }

  const data = await response.json();

  return data.projects;
};
