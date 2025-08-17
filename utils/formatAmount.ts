export const formatINR = (num: number) => {
  return num.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
