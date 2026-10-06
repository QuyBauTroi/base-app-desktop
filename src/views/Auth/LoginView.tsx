import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User, Cpu, Wifi, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLoginViewModel } from "@/viewmodels/auth/useLoginViewModel";
import { AuthLayout } from "@/layouts";
import { Button, Input, Card, Divider } from "@/components/ui";

export function LoginView() {
  const { handleLogin } = useLoginViewModel();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    handleLogin({ username, password });
    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card variant="glass" padding="lg" className="backdrop-blur-xl border border-(--divider) shadow-2xl">
          {/* Header with tech icons */}
          <div className="mb-6 text-center">
            {/* IoT indicator icons */}
            <div className="flex justify-center gap-6 mb-4">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="text-(--color-primary)/60"
              >
                <Wifi className="w-4 h-4" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-(--color-primary)/60"
              >
                <Cpu className="w-4 h-4" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="text-(--color-primary)/60"
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            </div>

            {/* Logo with glow effect */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-(--color-primary)/20 rounded-full blur-2xl" />
            </motion.div>

            <h1 className="text-xl font-bold text-(--text-main)">
              {t('login.welcome')}
            </h1>
            <p className="text-sm text-(--text-muted) mt-1">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label={t('login.username')}
              icon={<User className="w-full h-full" />}
              placeholder={t('login.username_placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <Input
              type="password"
              label={t('login.password')}
              icon={<Lock className="w-full h-full" />}
              placeholder={t('login.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-(--color-primary) font-medium hover:underline cursor-pointer"
              >
                {t('login.forgot_password')}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={!isLoading ? <ArrowRight /> : undefined}
              iconPosition="right"
            >
              {t('login.sign_in')}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <Divider className="flex-1" />
            <span className="text-xs text-(--text-muted)">{t('login.or')}</span>
            <Divider className="flex-1" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-(--bg-layer-2)/50 hover:bg-(--bg-layer-2) border border-(--divider) rounded-lg transition-all cursor-pointer backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-(--text-main)">{t('login.login_google')}</span>
          </button>

          {/* Register link */}
          <p className="mt-5 text-center text-sm text-(--text-muted)">
            {t('login.no_account')}{' '}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-(--color-primary) font-semibold cursor-pointer hover:underline"
            >
              {t('login.register')}
            </button>
          </p>
        </Card>

      </motion.div>
    </AuthLayout>
  );
}
