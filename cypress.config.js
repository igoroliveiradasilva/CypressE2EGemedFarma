const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

