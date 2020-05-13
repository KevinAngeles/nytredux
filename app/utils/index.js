const moment = require("moment");
// Helper Functions
const normalizeDate = (dt) => {
  let actualMoment = dt ? moment(dt) : moment();
  return actualMoment.calendar();
};

const getDateNewsFormat = (dt) => {
  moment.locale("en");
  const displayFormatDate = "dddd MMMM DD, YYYY";
  let actualMoment = dt ? moment(dt) : moment();
  return actualMoment.format(displayFormatDate);
};

const validateSearchInputs = (keyWord, beginDate, endDate) => {
  const DISPLAY_FORMAT_DATE = "YYYYMMDD";
  let beginMoment = moment(beginDate, DISPLAY_FORMAT_DATE, true);
  let endMoment = moment(endDate, DISPLAY_FORMAT_DATE, true);

  let inputErrors = {
    keyWord: {
      msg: "",
      status: false,
    },
    beginDate: {
      msg: "",
      status: false,
    },
    endDate: {
      msg: "",
      status: false,
    },
  };

  if (keyWord === null || keyWord === undefined) {
    inputErrors.keyWord.status = true;
    inputErrors.keyWord.msg = "Topic cannot be null nor undefined.";
  } else if (keyWord.trim().length === 0) {
    inputErrors.keyWord.status = true;
    inputErrors.keyWord.msg = "Topic cannot be empty.";
  }

  if (beginDate === null || beginDate === undefined) {
    inputErrors.beginDate.status = true;
    inputErrors.beginDate.msg = "Begin Date cannot be null nor undefined.";
  } else if (!beginMoment.isValid()) {
    inputErrors.beginDate.status = true;
    inputErrors.beginDate.msg = `Begin Date must have 8 digits with the format ${DISPLAY_FORMAT_DATE}.`;
  }

  if (endDate === null || endDate === undefined) {
    inputErrors.endDate.status = true;
    inputErrors.endDate.msg = "Begin Date cannot be null nor undefined.";
  } else if (!endMoment.isValid()) {
    inputErrors.endDate.status = true;
    inputErrors.endDate.msg = `Begin Date must have 8 digits with the format ${DISPLAY_FORMAT_DATE}.`;
  }

  if (
    !inputErrors.beginDate.status &&
    !inputErrors.endDate.status &&
    beginMoment.isAfter(endMoment)
  ) {
    inputErrors.beginDate.status = true;
    inputErrors.beginDate.msg = "Begin Date must be earlier than End Date.";
    inputErrors.endDate.status = true;
    inputErrors.endDate.msg = "End Date must be after Begin Date.";
  }

  return inputErrors;
};

module.exports = { normalizeDate, getDateNewsFormat, validateSearchInputs };
