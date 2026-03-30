import ContactPageClient from './ContactPageClient';
import { supabase } from '@/lib/supabase';
import type { Testimonial } from '@/types';

async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });
  return (data as Testimonial[]) ?? [];
}

export default async function ContactPage() {
  const testimonials = await getTestimonials();
  return <ContactPageClient testimonials={testimonials} />;
}
