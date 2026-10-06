import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterViewModel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (credentials: RegisterCredentials) => {
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Call register API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Register with:", credentials.username, credentials.email);
      navigate("/login");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return {
    isLoading,
    error,
    handleRegister,
    goToLogin,
  };
}
