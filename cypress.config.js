const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://demoauthor.magnolia-cms.com",
    viewportWidth: 1280,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
