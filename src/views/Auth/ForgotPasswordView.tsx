import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ArrowLeft, Cpu, Wifi, Zap, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForgotPasswordViewModel } from "@/viewmodels/auth/useForgotPasswordViewModel";
import { AuthLayout } from "@/layouts";
import { Button, Input, Card } from "@/components/ui";

export function ForgotPasswordView() {
  const { t } = useTranslation();
  const { isLoading, isSubmitted, handleSubmit, goToLogin } = useForgotPasswordViewModel();
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
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
              {t('forgot_password.title')}
            </h1>
            <p className="text-sm text-(--text-muted) mt-1">
              {t('forgot_password.subtitle')}
            </p>
          </div>

          {isSubmitted ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-16 h-16 bg-success/10 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-success" />
              </motion.div>
              <p className="text-sm text-(--text-muted) mb-6">
                {t('forgot_password.success_message')}
              </p>
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={goToLogin}
              >
                {t('forgot_password.back_to_login')}
              </Button>
            </motion.div>
          ) : (
            /* Form */
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                type="email"
                label={t('forgot_password.email')}
                icon={<Mail className="w-full h-full" />}
                placeholder={t('forgot_password.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                icon={!isLoading ? <ArrowRight /> : undefined}
                iconPosition="right"
              >
                {t('forgot_password.submit')}
              </Button>

              {/* Back to login */}
              <button
                type="button"
                onClick={goToLogin}
                className="w-full flex items-center justify-center gap-2 text-sm text-(--text-muted) hover:text-(--text-main) cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('forgot_password.back_to_login')}
              </button>
            </form>
          )}
        </Card>

      </motion.div>
    </AuthLayout>
  );
}
