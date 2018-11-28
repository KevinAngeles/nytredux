// Helper Functions
export const normalizeDate = dt => {
  let actualMoment = dt ? moment(dt):moment();
  return actualMoment.calendar();
};

export const getDateNewsFormat = dt => {
  moment.locale('en');
  const displayFormatDate = 'dddd MMMM DD, YYYY';
  let actualMoment = dt ? moment(dt):moment();
  return actualMoment.format(displayFormatDate);
};