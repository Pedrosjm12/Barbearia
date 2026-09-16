# Implementation Guide — FADE Barbershop

Practical examples and code patterns for implementing the design system with Next.js, React, and Tailwind CSS.

---

## Tailwind Configuration

Update your `tailwind.config.ts` to include the FADE design tokens:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        'fade-black': '#000000',
        'fade-cream': '#F5F1E8',
        'fade-red': '#E63946',
        'fade-charcoal': '#2A2A2A',
        'fade-gray-light': '#E8E8E8',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.3',
        'relaxed': '1.6',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Component Examples

### Primary Button

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold font-display transition-colors duration-fast outline-none focus:outline-2 focus:outline-offset-2 focus:outline-fade-red disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-fade-red text-fade-black hover:bg-[#D62828] active:bg-[#BF2D2D]',
    secondary: 'border border-fade-cream text-fade-cream hover:bg-fade-charcoal active:text-fade-red',
    icon: 'p-0 hover:bg-fade-charcoal',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base min-w-[120px]',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Form Input

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random()}`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-fade-cream"
        >
          {label}
          {props.required && <span className="text-fade-red ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          bg-fade-charcoal text-fade-cream px-4 py-3 text-base
          border transition-colors duration-fast
          focus:outline-none
          ${error ? 'border-fade-red focus:border-fade-red' : 'border-fade-gray-light focus:border-fade-red'}
          placeholder:text-fade-gray-light placeholder:opacity-60
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-fade-red">✕ {error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-fade-gray-light">{helperText}</p>
      )}
    </div>
  );
}
```

### Service Card

```tsx
interface ServiceCardProps {
  name: string;
  description: string;
  icon?: React.ReactNode;
  onBook?: () => void;
}

export function ServiceCard({
  name,
  description,
  icon,
  onBook,
}: ServiceCardProps) {
  return (
    <div className="bg-fade-charcoal p-6 shadow-lg hover:shadow-2xl transition-shadow duration-base">
      {icon && (
        <div className="mb-4 text-fade-red text-3xl">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold text-fade-cream mb-2 font-display">
        {name}
      </h3>
      <p className="text-sm text-fade-gray-light mb-6 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onBook}
        className="text-fade-red font-bold text-base flex items-center gap-2 hover:gap-3 transition-all duration-fast"
      >
        Book Now
        <span>→</span>
      </button>
    </div>
  );
}
```

### Modal

```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-fade-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal Box */}
      <dialog
        open={isOpen}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-fade-black border-2 border-fade-red p-8 outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-fade-cream font-display">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-fade-cream hover:text-fade-red transition-colors duration-fast text-2xl leading-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mb-6 text-fade-cream">
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div className="border-t border-fade-gray-light pt-6">
            {actions}
          </div>
        )}
      </dialog>
    </>
  );
}
```

### Responsive Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="bg-fade-black min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl w-full">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-fade-cream font-display leading-tight mb-4">
          Real Cuts.
          <br />
          Real People.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-fade-gray-light mb-8 max-w-lg leading-relaxed">
          Walk in, get sharp. No appointments needed. Just the precision you deserve.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg">
            Book Your Cut
          </Button>
          <Button variant="secondary" size="lg">
            View Services
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### Reduced Motion Support

```tsx
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Usage in a component with animations:
export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={prefersReducedMotion ? '' : 'animate-slideUp'}
    >
      {children}
    </div>
  );
}
```

---

## CSS Custom Properties (Alternative Approach)

If you prefer CSS variables over Tailwind utilities:

```css
/* styles/globals.css */

:root {
  /* Colors */
  --color-black: #000000;
  --color-cream: #F5F1E8;
  --color-red: #E63946;
  --color-charcoal: #2A2A2A;
  --color-gray-light: #E8E8E8;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* Typography */
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Respects prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Then use in components:

```tsx
import styles from './Button.module.css';

export function Button() {
  return (
    <button className={styles.primary}>
      Click Me
    </button>
  );
}
```

```css
/* Button.module.css */

.primary {
  background-color: var(--color-red);
  color: var(--color-black);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: bold;
  transition: all var(--transition-fast);
  border: none;
}

.primary:hover {
  background-color: #D62828;
}

.primary:focus {
  outline: 2px solid var(--color-red);
  outline-offset: 2px;
}
```

---

## Dark Mode (Primary)

Since FADE operates in dark mode by default, structure your Tailwind theme accordingly:

```ts
const config: Config = {
  darkMode: 'media', // or 'class' if you want manual toggle
  theme: {
    extend: {
      colors: {
        'fade-black': '#000000',
        'fade-cream': '#F5F1E8',
        'fade-red': '#E63946',
      },
    },
  },
};
```

In your layout or app component, ensure the dark class is applied:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-fade-black text-fade-cream">
        {children}
      </body>
    </html>
  );
}
```

---

## Testing Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Shift+Tab to go backward
- Enter/Space to activate buttons
- Escape to close modals

### Screen Readers
Test with NVDA (Windows) or VoiceOver (Mac):
- Headings are announced with level (H1, H2, etc.)
- Buttons announce their label
- Form fields announce their label and state (required, error)
- Links announce their destination

### Color Contrast
Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
- Black on cream: ✓ 21:1 (AAA)
- Cream on black: ✓ 21:1 (AAA)
- Red on black: ✓ 5.3:1 (AA)

---

## Performance

### Image Optimization
Use Next.js `Image` component with optimization:

```tsx
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/barber-hero.jpg"
      alt="Master barber perfecting a fade"
      width={800}
      height={600}
      priority // for LCP images
      className="w-full h-auto"
    />
  );
}
```

### Font Loading
Load Inter and JetBrains Mono from Google Fonts or self-host to avoid layout shift:

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Troubleshooting

### Tailwind classes not applying?
- Clear Tailwind cache: `rm -rf .next/`
- Ensure all files are scanned in `tailwind.config.ts`:
  ```ts
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  ```

### Colors look different on different devices?
- Use a color picker to verify hex values
- Test on multiple browsers and monitors
- Check if browser extensions are interfering (color blindness filters, etc.)

### Focus states not visible?
- Ensure focus outlines are not being reset:
  ```css
  * {
    /* Remove box-shadow reset, keep outline */
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  ```

### Animations feel slow or janky?
- Use `will-change` sparingly
- Avoid animating large elements; animate their children instead
- Keep animations under 500ms
- Test on lower-end devices
