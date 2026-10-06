import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

interface LoginCredentials {
  username: string;
  password: string;
}

export function useLoginViewModel() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (credentials: LoginCredentials) => {
    login({ username: credentials.username || "Admin" });
    navigate("/dashboard");
  };

  return {
    handleLogin,
  };
}
