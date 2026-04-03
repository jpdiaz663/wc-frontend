/**
 * Tailwind preset for consumers: merge into your tailwind.config.js.
 * Requires :root tokens from @your-scope/tokens/tokens.css (or copy tokens.css).
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
          950: "var(--color-brand-950)",
          primary: "var(--color-brand-primary)",
          "primary-hover": "var(--color-brand-primary-hover)",
          "primary-active": "var(--color-brand-primary-active)",
          "on-primary": "var(--color-brand-on-primary)",
        },
        semantic: {
          success: {
            fg: "var(--color-semantic-success-fg)",
            subtle: "var(--color-semantic-success-bg-subtle)",
            border: "var(--color-semantic-success-border)",
            icon: "var(--color-semantic-success-icon)",
          },
          warning: {
            fg: "var(--color-semantic-warning-fg)",
            subtle: "var(--color-semantic-warning-bg-subtle)",
            border: "var(--color-semantic-warning-border)",
            icon: "var(--color-semantic-warning-icon)",
          },
          error: {
            fg: "var(--color-semantic-error-fg)",
            subtle: "var(--color-semantic-error-bg-subtle)",
            border: "var(--color-semantic-error-border)",
            icon: "var(--color-semantic-error-icon)",
          },
          info: {
            fg: "var(--color-semantic-info-fg)",
            subtle: "var(--color-semantic-info-bg-subtle)",
            border: "var(--color-semantic-info-border)",
            icon: "var(--color-semantic-info-icon)",
          },
        },
        surface: {
          DEFAULT: "var(--color-surface-default)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
          inverse: "var(--color-surface-inverse)",
        },
        content: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          disabled: "var(--color-text-disabled)",
        },
        focus: {
          ring: "var(--color-focus-ring)",
        },
        border: {
          DEFAULT: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
        },
      },
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        "component-gap": "var(--space-component-gap)",
        section: "var(--space-section)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: [
          "var(--font-family-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: [
          "var(--text-xs)",
          { lineHeight: "var(--text-xs--line-height)" },
        ],
        sm: [
          "var(--text-sm)",
          { lineHeight: "var(--text-sm--line-height)" },
        ],
        base: [
          "var(--text-base)",
          { lineHeight: "var(--text-base--line-height)" },
        ],
        lg: [
          "var(--text-lg)",
          { lineHeight: "var(--text-lg--line-height)" },
        ],
        xl: [
          "var(--text-xl)",
          { lineHeight: "var(--text-xl--line-height)" },
        ],
        "2xl": [
          "var(--text-2xl)",
          { lineHeight: "var(--text-2xl--line-height)" },
        ],
        "3xl": [
          "var(--text-3xl)",
          { lineHeight: "var(--text-3xl--line-height)" },
        ],
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      boxShadow: {
        glass: "var(--effect-glass-shadow)",
      },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        DEFAULT: "var(--motion-duration-normal)",
      },
      transitionTimingFunction: {
        standard: "var(--motion-easing-standard)",
      },
    },
  },
};
