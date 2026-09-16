# Page Patterns — FADE Barbershop

Reusable page layouts and common design patterns for FADE website.

---

## Standard Page Structure

Every page follows this basic structure:

```
┌─────────────────────────────────────┐
│         Header / Navigation         │
├─────────────────────────────────────┤
│         Hero / Banner Section       │
├─────────────────────────────────────┤
│      Main Content Sections          │
│   (Services, Pricing, Testimonials) │
├─────────────────────────────────────┤
│         CTA Section                 │
├─────────────────────────────────────┤
│          Footer                     │
└─────────────────────────────────────┘
```

### Spacing Rules Between Sections
- Small sections: 48px gap (2xl)
- Medium sections: 64px gap (3xl)
- Large sections: 96px gap (4xl)
- On mobile: 32px gap (xl) to maintain rhythm

---

## Hero Section Pattern

### Full-Screen Hero (Homepage)

```tsx
export function HeroSection() {
  return (
    <section className="bg-fade-black min-h-[90vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full text-center sm:text-left">
        {/* Optional accent line */}
        <div className="w-12 h-1 bg-fade-red mb-8" />

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-fade-cream font-display leading-tight mb-6">
          Precision Cuts for Real People
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-fade-cream mb-8 max-w-2xl">
          Sharp fades, clean lines, and the confidence that comes with a perfect cut. Walk in or book online.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg">
            Book Your Cut
          </Button>
          <Button variant="secondary" size="lg">
            See Services
          </Button>
        </div>

        {/* Optional: Hours below CTAs */}
        <div className="mt-12 text-sm text-fade-gray-light">
          <p className="font-mono">Open Daily 10 AM – 9 PM</p>
        </div>
      </div>
    </section>
  );
}
```

**Responsive Behavior**:
- Mobile: Headline 32px, center-aligned, full-width CTAs
- Tablet: Headline 48px, left-aligned, side-by-side CTAs
- Desktop: Headline 64px, generous padding, full spacing

---

## Services Section Pattern

### Grid of Service Cards

```tsx
export function ServicesSection() {
  const services = [
    {
      id: 'fade',
      name: 'Fade Haircut',
      description: 'Crisp blending from top to fade. Precision lineups.',
      price: '$35',
    },
    {
      id: 'beard-trim',
      name: 'Beard Trim & Shape',
      description: 'Clean edges, defined lines, professional finish.',
      price: '$25',
    },
    {
      id: 'lineup',
      name: 'Lineup with Fade',
      description: 'Fresh shape with a sharp, clean fade.',
      price: '$40',
    },
    {
      id: 'styling',
      name: 'Styling & Product',
      description: 'Finishing touch with premium styling products.',
      price: '+$10',
    },
  ];

  return (
    <section className="bg-fade-black px-4 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-black text-fade-cream font-display mb-4">
            Our Services
          </h2>
          <p className="text-lg text-fade-gray-light max-w-2xl">
            Everything you need to stay sharp. All services include a consultation and styling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ name, description, price }) {
  return (
    <div className="bg-fade-charcoal p-8 hover:shadow-xl transition-shadow duration-base border border-fade-gray-light/20">
      <h3 className="text-2xl font-bold text-fade-cream mb-3 font-display">
        {name}
      </h3>
      <p className="text-fade-gray-light mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-mono text-fade-red font-bold">
          {price}
        </span>
        <button className="text-fade-red text-sm font-bold hover:translate-x-1 transition-transform">
          Details →
        </button>
      </div>
    </div>
  );
}
```

**Responsive Behavior**:
- Mobile: Single column, full width cards
- Tablet: 2-column grid, 24px gap
- Desktop: 4-column grid (2 rows), 32px gap

---

## Testimonials Section Pattern

### Carousel or Grid of Testimonials

```tsx
export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: 'Best fade in the city. Clean lines, great technique.',
      author: 'Marcus',
      rating: 5,
    },
    {
      id: 2,
      quote: 'Professional, fast, and exactly what I asked for.',
      author: 'James',
      rating: 5,
    },
    {
      id: 3,
      quote: 'Walk-ins welcome, no long waits. Just sharp cuts.',
      author: 'David',
      rating: 5,
    },
  ];

  return (
    <section className="bg-fade-black px-4 py-20 md:py-32 border-t border-fade-gray-light/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl font-black text-fade-cream mb-16 font-display">
          What Clients Say
        </h2>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, rating }) {
  return (
    <div className="bg-fade-charcoal border border-fade-gray-light/20 p-8">
      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-fade-red text-lg">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-fade-cream mb-6 leading-relaxed italic">
        "{quote}"
      </p>

      {/* Author */}
      <p className="text-fade-gray-light font-semibold">
        — {author}
      </p>
    </div>
  );
}
```

---

## Pricing Section Pattern

### Pricing Table or Cards

```tsx
export function PricingSection() {
  const pricing = [
    { service: 'Haircut (Fade)', price: '$35' },
    { service: 'Beard Trim', price: '$25' },
    { service: 'Lineup with Fade', price: '$40' },
    { service: 'Line Up Only', price: '$15' },
    { service: 'Shave', price: '$30' },
    { service: 'Styling Add-On', price: '+$10' },
  ];

  return (
    <section className="bg-fade-black px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-fade-cream mb-4 font-display">
          Pricing
        </h2>
        <p className="text-fade-gray-light mb-12">
          Transparent pricing. No hidden fees.
        </p>

        {/* Pricing Table */}
        <div className="space-y-4 border-t border-fade-gray-light/20 pt-8">
          {pricing.map(({ service, price }, i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-4 border-b border-fade-charcoal"
            >
              <span className="text-fade-cream">{service}</span>
              <span className="text-fade-red font-mono font-bold text-lg">
                {price}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button variant="primary" size="lg">
            Ready to Book?
          </Button>
        </div>
      </div>
    </section>
  );
}
```

---

## Call-to-Action Section Pattern

### Primary CTA Block

```tsx
export function CTASection() {
  return (
    <section className="bg-fade-red px-4 py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-fade-black mb-6 font-display">
          Get Your Sharp Look Today
        </h2>
        <p className="text-fade-black text-lg mb-8">
          Walk in anytime. No appointment necessary. Just precision cuts and professional service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" className="bg-fade-black text-fade-red hover:bg-fade-charcoal">
            Book Online
          </Button>
          <Button variant="secondary" size="lg" className="border-fade-black text-fade-black hover:bg-fade-black/10">
            View Hours
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Color Inversion**: 
- Background: Red (`#E63946`)
- Text: Black (`#000000`)
- Buttons: Adjusted for contrast on red background

---

## Contact / Hours Section Pattern

### Store Information

```tsx
export function ContactSection() {
  return (
    <section className="bg-fade-black px-4 py-20 md:py-32 border-t border-fade-gray-light/20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-fade-cream mb-12 font-display">
          Find Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Location */}
          <div>
            <h3 className="text-sm font-bold text-fade-gray-light uppercase tracking-wide mb-2">
              Location
            </h3>
            <p className="text-fade-cream text-lg font-display font-bold mb-4">
              FADE Brooklyn
            </p>
            <p className="text-fade-gray-light leading-relaxed">
              123 Brooklyn Ave<br />
              Brooklyn, NY 11205<br />
              <a href="tel:+17185551234" className="text-fade-red hover:underline">
                (718) 555-1234
              </a>
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-bold text-fade-gray-light uppercase tracking-wide mb-2">
              Hours
            </h3>
            <div className="text-fade-cream space-y-2">
              <p><span className="text-fade-gray-light">Monday – Friday:</span> 10 AM – 9 PM</p>
              <p><span className="text-fade-gray-light">Saturday:</span> 9 AM – 9 PM</p>
              <p><span className="text-fade-gray-light">Sunday:</span> 11 AM – 7 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Form Section Pattern

### Booking or Contact Form

```tsx
export function BookingForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: 'fade',
    date: '',
    time: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and submission logic
  };

  return (
    <section className="bg-fade-black px-4 py-20 md:py-32">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-fade-cream mb-2 font-display">
          Book Your Appointment
        </h2>
        <p className="text-fade-gray-light mb-12">
          Choose your service and preferred time. Walk-ins always welcome.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Your Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <div>
            <label className="text-sm font-medium text-fade-cream block mb-2">
              Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-fade-charcoal text-fade-cream px-4 py-3 border border-fade-gray-light focus:border-fade-red focus:outline-none"
            >
              <option value="fade">Fade Haircut</option>
              <option value="beard">Beard Trim</option>
              <option value="lineup">Lineup with Fade</option>
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <Input
            label="Preferred Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          <Button variant="primary" size="lg" type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </div>
    </section>
  );
}
```

---

## Footer Pattern

### Standard Footer

```tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fade-black border-t border-fade-gray-light/20 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-fade-cream font-display font-bold text-2xl mb-4">
              FADE
            </h3>
            <p className="text-fade-gray-light text-sm">
              Premium barbershop. Real cuts for real people.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-fade-cream font-bold mb-3 uppercase text-xs tracking-widest">
              Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Haircuts</a></li>
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Beard Trims</a></li>
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Styling</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-fade-cream font-bold mb-3 uppercase text-xs tracking-widest">
              Hours
            </h4>
            <p className="text-fade-gray-light text-sm">
              Mon–Fri: 10 AM – 9 PM<br />
              Sat: 9 AM – 9 PM<br />
              Sun: 11 AM – 7 PM
            </p>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-fade-cream font-bold mb-3 uppercase text-xs tracking-widest">
              Connect
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Instagram</a></li>
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Facebook</a></li>
              <li><a href="#" className="text-fade-gray-light hover:text-fade-red transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-fade-charcoal pt-8 flex flex-col sm:flex-row justify-between items-center text-fade-gray-light text-sm">
          <p>&copy; {currentYear} FADE Barbershop. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-fade-red transition">Privacy</a>
            <a href="#" className="hover:text-fade-red transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Mobile Responsiveness Checklist

For each pattern, ensure:
- [ ] Touch targets are 44px minimum (for mobile)
- [ ] Text is readable without zooming (16px min on mobile)
- [ ] Buttons stack vertically on mobile
- [ ] Forms are single-column on mobile
- [ ] Images scale responsively
- [ ] No horizontal scroll
- [ ] Safe area respected (notches, home bar)
- [ ] Dark mode tested on mobile browser

---

## Animation Patterns

### Page Load Entrance
```tsx
<div className="animate-fadeIn">
  <h1>Welcome</h1>
  <p>Subtitle appears after headline</p>
</div>
```

### Hover Lift on Card
```tsx
<div className="transition-shadow duration-base hover:shadow-lg">
  {/* Card content */}
</div>
```

### Focus Indicator
```tsx
<button className="focus:outline-2 focus:outline-offset-2 focus:outline-fade-red">
  Click Me
</button>
```

---

## Dos & Don'ts for Page Layout

### Do
✓ Use consistent spacing between sections  
✓ Align content to a grid  
✓ Prioritize mobile experience first  
✓ Make CTAs visible and actionable  
✓ Use whitespace intentionally  
✓ Ensure readable line lengths  

### Don't
✗ Don't mix centered and left-aligned text  
✗ Don't have sections without clear hierarchy  
✗ Don't autoplay videos or music  
✗ Don't hide navigation on scroll  
✗ Don't use image text (not accessible)  
✗ Don't assume desktop-only experience  
