const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'u4powo',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
