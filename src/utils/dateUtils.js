const formatDate = (date) => {
  const inputDate = new Date(date);

  const year = inputDate.getUTCFullYear();
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getUTCDate().toString().padStart(2, "0");
  const hours = (inputDate.getUTCHours() + 1).toString().padStart(2, "0");
  const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};

export default formatDate;
