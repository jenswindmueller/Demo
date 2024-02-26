import './commands'
import addContext from 'mochawesome/addContext'

const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://demoauthor.magnolia-cms.com",
    viewportWidth: 1280,
    viewportHeight: 1080,
    video: true,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      "configFile": "reporter-config.json"
    },
    setupNodeEvents(on, config) {
      on("test:after:run", (test, runnable) => {
        let videoName = Cypress.spec.name;
        videoName = videoName.replace('/.js.*', '.js');
        const videoUrl = 'videos/' + videoName + '.mp4';

        addContext({ test }, videoUrl);
      });
      // implement node event listeners here
    }
  }
});