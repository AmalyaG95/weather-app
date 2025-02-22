const formatTime = (time: string) =>
  new Date(time)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");

export default formatTime;
