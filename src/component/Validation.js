function Validation(users) {
  let errors = {};

  if (users.name === "") {
    errors.name = 'username/email is required';
  }

  // if (users.email === "") {
    // errors.email = "email is required";
  // } else if (!/\S+@\S+\.\S+/.test(users.email)) {
  //   errors.email = 'invalid email address';
  // }

  if (users.password === "") {
    errors.password = 'password is required';
  }

  return errors;
}

export default Validation;
