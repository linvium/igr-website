'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/layout';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic
    console.log('Newsletter signup:', email);
  };

  return (
    <section className="py-16 bg-accent/30">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Prijavite se na naš bilten
            </h2>
            <p className="text-foreground/80">
              Najnovije vijesti, događaji i ponude direktno u vaš inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[400px]"
          >
            <Input
              type="email"
              placeholder="Unesite email adresu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-lg border-[#0F1C2D]/20 bg-white flex-1"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
