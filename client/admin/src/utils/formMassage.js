const formErrorMassage = {
  required: "Vui lòng không bỏ trống !",
  email: "Email không hợp lệ !",
  minString: (min, name) => `Tối thiểu là ${min} ${name} !`,
  maxString: (max, name) => `Tối đa là ${max} ${name} !`,
};
export default formErrorMassage;
