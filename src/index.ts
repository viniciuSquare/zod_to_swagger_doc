import { App } from './app';

const PORT = process.env.PORT || 5002;

// Create http instance
const appInstance = new App();

appInstance.server?.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});