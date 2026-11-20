const SHEET_NAME = "TRAFFIC_LIGHTS";
const VALID_SIGNALS = ["red", "yellow", "green"];

function doGet(e) {
  if (!e || !e.parameter || e.parameter.action !== "list") {
    return jsonError_("unknown_action", "Unsupported action");
  }

  try {
    return jsonOk_({
      trafficLights: listTrafficLights_(),
    });
  } catch (error) {
    return jsonError_(error.code || "storage_error", error.message);
  }
}

function doPost(e) {
  let command;

  try {
    command = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (error) {
    return jsonError_("bad_request", "Request body must be valid JSON.");
  }

  if (!command || command.action !== "updateState") {
    return jsonError_("unknown_action", "Unsupported action");
  }

  if (typeof command.id !== "string" || !command.id.trim()) {
    return jsonError_("invalid_id", "A traffic-light id is required.");
  }

  if (VALID_SIGNALS.indexOf(command.currentSignal) === -1) {
    return jsonError_("invalid_signal", "Unsupported traffic-light signal.");
  }

  try {
    const sheet = getTrafficLightsSheet_();
    const table = readTrafficLightsTable_(sheet);
    const rowIndex = table.rows.findIndex(
      (row) => String(row[table.idColumn]).trim() === command.id.trim(),
    );

    if (rowIndex === -1) {
      return jsonError_("not_found", "Traffic light not found.");
    }

    const rowNumber = rowIndex + 2;
    sheet
      .getRange(rowNumber, table.signalColumn + 1)
      .setValue(command.currentSignal);

    return jsonOk_({
      trafficLight: {
        id: command.id.trim(),
        currentSignal: command.currentSignal,
      },
    });
  } catch (error) {
    return jsonError_(error.code || "storage_error", error.message);
  }
}

function listTrafficLights_() {
  const table = readTrafficLightsTable_(getTrafficLightsSheet_());

  return table.rows.reduce(function (trafficLights, row, index) {
    const id = String(row[table.idColumn]).trim();
    const currentSignal = String(row[table.signalColumn]).trim();

    if (!id && !currentSignal) {
      return trafficLights;
    }

    if (!id || VALID_SIGNALS.indexOf(currentSignal) === -1) {
      throw apiError_(
        "storage_error",
        "The traffic-light sheet contains an invalid record on row " +
          (index + 2) +
          ".",
      );
    }

    trafficLights.push({ id: id, currentSignal: currentSignal });
    return trafficLights;
  }, []);
}

function getTrafficLightsSheet_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty("DB_SPREADSHEET_ID");

  if (!spreadsheetId) {
    throw apiError_("storage_error", "DB_SPREADSHEET_ID is not configured.");
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw apiError_("storage_error", "The TRAFFIC_LIGHTS sheet was not found.");
  }

  return sheet;
}

function readTrafficLightsTable_(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values.length
    ? values[0].map(function (header) {
        return String(header).trim();
      })
    : [];
  const idColumn = headers.indexOf("id");
  const signalColumn = headers.indexOf("current_signal");

  if (idColumn === -1 || signalColumn === -1) {
    throw apiError_(
      "storage_error",
      "The sheet must contain id and current_signal columns.",
    );
  }

  return {
    rows: values.slice(1),
    idColumn: idColumn,
    signalColumn: signalColumn,
  };
}

function jsonOk_(data) {
  return json_({
    ok: true,
    data: data,
    error: null,
  });
}

function jsonError_(code, message) {
  return json_({
    ok: false,
    data: null,
    error: {
      code: code,
      message: message,
    },
  });
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function apiError_(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}
