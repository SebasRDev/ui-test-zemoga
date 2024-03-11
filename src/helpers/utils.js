export const calculateDiferenceDates = (dateString) => {
  const currentDate = new Date();
  const votingDate = new Date(dateString);
  const difference = currentDate - votingDate;
  const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

export const calculatePercentage = (positive, negative) => {
  const total = positive + negative;
  return {
    positive: `${(positive / total * 100).toFixed(1)}%`,
    negative: `${(negative / total * 100).toFixed(1)}%`,
  }
}