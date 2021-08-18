export const passwordStrengthCalculator = (passwordToCheck: string): number => {
  let strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (strongPassword.test(passwordToCheck)) {
    return 3;
  }
  let mediumPassword = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  if (mediumPassword.test(passwordToCheck)) {
    return 2;
  }
  return 1;
};

console.log(passwordStrengthCalculator("Hello@1223"));
