export const handleIcons = (context) => {
  // function to import all the images from given context
  const icons = {};
  context.keys().forEach((item) => {
    const key = item.replace("./", "");
    icons[key] = context(item);
  });
  return icons;
};

// function to add commas to long digit
export const  numberWithCommas = (x) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
}