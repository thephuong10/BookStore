import queryString from "query-string";
const regexNumber = /^[0-9\b]+$/;
export const chunkArray = (myArray, chunk_size) => {
  const results = [];
  const arr = [...myArray];
  while (arr.length) {
    results.push(arr.splice(0, chunk_size));
  }
  return results;
};

export const overLimitNumber = (num, limit) =>
  num > limit ? `${limit}+` : num;

export const isObject = (object) =>
  object && typeof object === "object" && Object.keys(object).length;

export const formatPrice = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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

export const isNumber = (num) => regexNumber.test(num);

export const isDecimal = (num) => num.trim() !== "" && !isNaN(num);

export const isArray = (arr) => Array.isArray(arr) && arr.length;

export const deleteKey = (obj, key) =>
  Object.keys(obj).reduce(
    (acc, name) => (name !== key ? { ...acc, [name]: obj[name] } : acc),
    {}
  );
