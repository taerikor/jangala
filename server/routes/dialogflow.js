const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");

const config = require("../config/key");

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

router.post("/textQuery", async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  res.send(result);
});

router.post("/eventQuery", async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  res.send(result);
});

module.exports = router;
