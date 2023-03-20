const splitDate = (date) => {
  if (date) {
    const dateArray = date.split(" ");
    return dateArray[0];
  }
};
export default splitDate;
