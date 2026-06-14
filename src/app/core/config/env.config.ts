const isDevMode = false;

export const ENV = {
  isDevMode,
  apiUrl: isDevMode ? 'http://localhost:5000/api' : 'https://prawin-portfolio-server.onrender.com/api',
};