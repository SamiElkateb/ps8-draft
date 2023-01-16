const timestampToLocalTime = (timestamp) => {
  const date = new Date(timestamp);
  date.toLocaleString();
};

export { timestampToLocalTime };
