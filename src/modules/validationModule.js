const validateUserInput = (firstName, lastName, password, email) => {
    const nameRegex = /^[A-Za-z'-]{1,50}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const errors = [];
  
    if (!nameRegex.test(firstName)) {
      errors.push({ field: "firstName", message: "First name is not valid" });
    }
    if (!nameRegex.test(lastName)) {
      errors.push({ field: "lastName", message: "Last name is not valid" });
    }
  
    if (!passwordRegex.test(password)) {
      errors.push({ field: "password", message: "Password is not valid" });
    }
  
    if (!emailRegex.test(email)) {
      errors.push({ field: "email", message: "Email is not in a valid format" });
    }
  
    return { isValid: errors.length === 0, errors };
  };


  
  module.exports = {
    validateUserInput,
  };
  