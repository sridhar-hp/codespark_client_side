import React, { useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Flame, Zap, Code2, X } from "lucide-react";

/**
 * LogoutModal
 * Production-ready logout confirmation modal for CodeSpark.
 *
 * Props:
 *  - onClose: () => void   Called when the modal should close (Cancel, ESC, backdrop click, X)
 *  - onLogout: () => void  Called when the user confirms logout
 */
const LogoutModal = ({ onClose, onLogout }) => {
  const modalRef = useRef(null);
  const cancelBtnRef = useRef(null);

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }

      // Basic focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Autofocus cancel button on mount
  useEffect(() => {
    cancelBtnRef.current?.focus();
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 26, mass: 0.9 },
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      y: 12,
      transition: { duration: 0.18, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: "rgba(11, 17, 32, 0.75)" }}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onMouseDown={handleBackdropClick}
      >
        <div className="absolute inset-0 backdrop-blur-sm" aria-hidden="true" />

        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-heading"
          aria-describedby="logout-modal-subtitle"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md rounded-[24px] border shadow-2xl overflow-hidden"
          style={{
            backgroundColor: "#111827",
            borderColor: "#1F2937",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(31, 41, 55, 0.5)",
          }}
        >
          {/* Close (X) button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close logout modal"
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-white/5 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/60"
          >
            <X size={18} />
          </button>

          <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8 flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="flex items-center justify-center rounded-full mb-5"
              style={{
                width: 64,
                height: 64,
                background:
                  "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(249,115,22,0.18))",
                border: "1px solid rgba(245,158,11,0.35)",
              }}
            >
              <LogOut size={28} color="#F59E0B" strokeWidth={2.25} />
            </motion.div>

            {/* Heading */}
            <h2
              id="logout-modal-heading"
              className="text-xl sm:text-2xl font-semibold mb-2"
              style={{ color: "#F9FAFB" }}
            >
              Ready to end your session?
            </h2>

            {/* Subtitle */}
            <p
              id="logout-modal-subtitle"
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "#9CA3AF" }}
            >
              You're currently on a 35-day coding streak.
              <br />
              Don't forget to continue tomorrow.
            </p>

            {/* Developer summary cards */}
            <div className="w-full grid grid-cols-3 gap-3 mb-8">
              <SummaryCard
                icon={<Flame size={16} color="#F97316" />}
                label="Current Streak"
                value="35 Days"
              />
              <SummaryCard
                icon={<Zap size={16} color="#F59E0B" />}
                label="Today's XP"
                value="+120 XP"
              />
              <SummaryCard
                icon={<Code2 size={16} color="#F59E0B" />}
                label="Current Project"
                value="CodeSpark"
              />
            </div>

            {/* Actions */}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <motion.button
                ref={cancelBtnRef}
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/50"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#1F2937",
                  color: "#F9FAFB",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="button"
                onClick={onLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/50"
                style={{
                  backgroundColor: "#F59E0B",
                  color: "#0B1120",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F97316";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F59E0B";
                }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SummaryCard = ({ icon, label, value }) => (
  <div
    className="rounded-xl px-3 py-3 flex flex-col items-center justify-center gap-1.5 border"
    style={{ backgroundColor: "#0B1120", borderColor: "#1F2937" }}
  >
    <div className="flex items-center justify-center">{icon}</div>
    <span
      className="text-[10px] sm:text-[11px] font-medium text-center leading-tight"
      style={{ color: "#9CA3AF" }}
    >
      {label}
    </span>
    <span
      className="text-xs sm:text-sm font-semibold text-center leading-tight"
      style={{ color: "#F9FAFB" }}
    >
      {value}
    </span>
  </div>
);

export default LogoutModal;