module.exports = (str) => {
  // Trim string and set all characters to lowercase
  let output = str.trim().toLowerCase();
  // replace all non char values with a -
  output = output.replace(/\W/g, '-');
  return output;
};
