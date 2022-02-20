const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const isValidDate = (date) => {
  return typeof date === "object" && date !== null && "getDate" in date;
};

function DMY(strDate) {
  const date = new Date(strDate);
  if (isValidDate(date)) {
    const formatted_date = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return formatted_date;
  }
  return;
}

function DMYHM(strDate) {
  const date = new Date(strDate);
  if (isValidDate(date)) {
    let min = date.getMinutes();
    if (String(min).length < 2) {
      min = `0${min}`;
    }
    const formatted_date = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${min}`;
    return formatted_date;
  }
  return;
}

function DMYorHM(strDate) {
  const date = new Date(strDate);
  if (isValidDate(date)) {
    const curDate = new Date();
    const formatted_curDate = `${curDate.getDate()} ${months[curDate.getMonth()]} ${curDate.getFullYear()}`;
    const formatted_date = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    if (formatted_curDate === formatted_date) {
      let min = date.getMinutes();
      if (String(min).length === 1) {
        min = `0${min}`;
      }
      return `${date.getHours()}:${min}`;
    } else {
      return formatted_date;
    }
  }
  return;
}

export { DMY, DMYHM, DMYorHM };
