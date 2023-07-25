import { useState, useEffect } from "react";

export const usePasswordValidation = ({ checkPassword = "" }) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);

  useEffect(() => {
    setValidLength(checkPassword?.length >= 8 ? true : false);
    setUpperCase(checkPassword.toLowerCase() !== checkPassword);
    setLowerCase(checkPassword.toUpperCase() !== checkPassword);
    setHasNumber(/\d/.test(checkPassword));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(checkPassword));
  }, [checkPassword]);

  return [validLength, hasNumber, upperCase, lowerCase, specialChar];
}

