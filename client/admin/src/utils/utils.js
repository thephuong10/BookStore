const regexNumber = /^[0-9\b]+$/;
export const isObject = (obj) =>
  obj && typeof obj === "object" && Object.keys(obj).length > 0;

export const deleteKey = (obj, key) => {
  delete obj[key];
  return obj;
};
export const formatPrice = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const isArray = (arr) => Array.isArray(arr) && arr.length;
export const isNumber = (num) => regexNumber.test(num);

export const isDecimal = (num) => num.trim() !== "" && !isNaN(num);
const joinZero = (num) => (num < 10 ? `0${num}` : num);
export const toDateString = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${joinZero(date.getMonth() + 1)}-${joinZero(
    date.getDate()
  )}T${date.getHours()}:${joinZero(date.getMinutes())}`;
};
export const flattenObject = (obj) =>
  Object.keys(obj).reduce(
    (result, key) =>
      typeof obj[key] === "object"
        ? {
            ...result,
            ...obj[key],
          }
        : {
            ...result,
            [key]: obj[key],
          },
    {}
  );
