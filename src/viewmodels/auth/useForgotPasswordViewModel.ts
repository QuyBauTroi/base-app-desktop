import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useForgotPasswordViewModel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Call forgot password API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Forgot password for:", email);
      setIsSubmitted(true);
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return {
    isLoading,
    isSubmitted,
    error,
    handleSubmit,
    goToLogin,
  };
}
