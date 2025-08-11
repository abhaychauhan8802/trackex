export const formatDate = (date: Date) => date.toLocaleDateString("en-CA");

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);

  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .toUpperCase()
    .replace(/,/g, "");
};
