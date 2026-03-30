export interface Project {
  id: string;
  name: string;
  description: string | null;
  project_type: 'lucratif' | 'non-lucratif';
  privacy: 'public' | 'privé';
  link: string | null;
  image_url: string | null;
  technos: string[];
  created_at: string;
}

export interface Service {
  id: string;
  label: string;
  description: string | null;
}

export interface ServiceRequest {
  id: string;
  client_name: string;
  client_contact: string;
  service_id: string;
  project_description: string | null;
  status: 'pending' | 'contacted' | 'completed';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  sender_name: string;
  sender_contact: string;
  message: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  rating: number;
  content: string | null;
  is_visible: boolean;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  category: 'tech' | 'leadership';
  description: string;
  skills_demonstrated: string[];
}

export interface Analytics {
  id: string;
  day: string;
  views: number;
}
