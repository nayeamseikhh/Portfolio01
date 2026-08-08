// const API_URL = import.meta.env.VITE_API_URL;

// export const getDatabaseStatus = async () => {
//   const response = await fetch(`${API_URL}/db-test`);

//   if (!response.ok) {
//     throw new Error("Backend request failed");
//   }

//   return response.json();
// };

// export const getProjects = async () => {
//   const response = await fetch(`${API_URL}/api/projects/`);

//   if (!response.ok) {
//     throw new Error(`Projects API error: ${response.status}`);
//   }

//   const data = await response.json();

//   return data.projects;
// };

const API_URL = import.meta.env.VITE_API_URL;

// Check backend / database
export const getDatabaseStatus = async () => {
  const response = await fetch(`${API_URL}/db-test`);

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
};

// Get all projects
export const getProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects/`);

  if (!response.ok) {
    throw new Error(`Projects API error: ${response.status}`);
  }

  const data = await response.json();

  return data.projects;
};

// Build the complete URL for backend images
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  // If backend already returns a complete URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Remove leading slash
  const cleanPath = imagePath.replace(/^\/+/, "");

  return `${API_URL}/${cleanPath}`;
};
