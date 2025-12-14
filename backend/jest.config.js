// jest.config.js
// -------------------- JEST CONFIGURATION --------------------

module.exports = {
  // Specifies the test environment
  // 'node' is required for backend/API testing
  testEnvironment: 'node',

  // Runs this setup file after Jest environment is initialized
  // Used for DB sync, connection setup, and global test hooks
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],

  // Increases default test timeout
  // Necessary for database operations and async integration tests
  testTimeout: 30000,

  // Displays individual test results for better visibility
  verbose: true,

  // Forces Jest to exit after tests complete
  // Helps avoid hanging processes due to open DB connections
  forceExit: true,

  // Automatically clears mock usage data between tests
  clearMocks: true,

  // Resets mock state between tests
  resetMocks: true,

  // Restores original implementations of mocked functions
  restoreMocks: true
};
