import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User, Mail, ArrowLeft, Cpu, Wifi, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRegisterViewModel } from "@/viewmodels/auth/useRegisterViewModel";
import { AuthLayout } from "@/layouts";
import { Button, Input, Card } from "@/components/ui";

export function RegisterView() {
  const { t } = useTranslation();
  const { isLoading, handleRegister, goToLogin } = useRegisterViewModel();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister({ username, email, password, confirmPassword });
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card variant="glass" padding="lg" className="backdrop-blur-xl border border-white/10 shadow-2xl">
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
              {t('register.title')}
            </h1>
            <p className="text-sm text-(--text-muted) mt-1">
              {t('register.subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label={t('register.username')}
              icon={<User className="w-full h-full" />}
              placeholder={t('register.username_placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <Input
              type="email"
              label={t('register.email')}
              icon={<Mail className="w-full h-full" />}
              placeholder={t('register.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <Input
              type="password"
              label={t('register.password')}
              icon={<Lock className="w-full h-full" />}
              placeholder={t('register.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <Input
              type="password"
              label={t('register.confirm_password')}
              icon={<Lock className="w-full h-full" />}
              placeholder={t('register.confirm_password_placeholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            {/* Terms and Privacy */}
            <p className="text-xs text-(--text-muted) text-center">
              {t('register.agree_to')}{' '}
              <button type="button" className="text-(--color-primary) hover:underline cursor-pointer">
                {t('register.terms_of_service')}
              </button>
              {' '}{t('register.and')}{' '}
              <button type="button" className="text-(--color-primary) hover:underline cursor-pointer">
                {t('register.privacy_policy')}
              </button>
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              icon={!isLoading ? <ArrowRight /> : undefined}
              iconPosition="right"
            >
              {t('register.submit')}
            </Button>
          </form>

          {/* Back to login */}
          <button
            type="button"
            onClick={goToLogin}
            className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-(--text-muted) hover:text-(--text-main) cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('register.back_to_login')}
          </button>
        </Card>

      </motion.div>
    </AuthLayout>
  );
}
