-- 1. Table des Projets
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    project_type TEXT CHECK (project_type IN ('lucratif', 'non-lucratif')),
    privacy TEXT CHECK (privacy IN ('public', 'privé')),
    link TEXT,
    image_url TEXT,
    technos TEXT[], -- Tableau de technologies utilisées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des Services (pour alimenter ta liste déroulante)
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT NOT NULL,
    description TEXT
);

-- 3. Table des Demandes de Services (Formulaire B)
CREATE TABLE service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_contact TEXT NOT NULL,
    service_id UUID REFERENCES services(id),
    project_description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des Messages de Contact (Formulaire A)
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_contact TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table des Avis (Testimonials)
CREATE TABLE testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_role TEXT,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    content TEXT,
    is_visible BOOLEAN DEFAULT true
);

-- Insertion des données initiales pour les services
INSERT INTO services (label) VALUES 
('Automatisation n8n'), 
('Création d''Agent IA'), 
('Conception Site de Gestion'), 
('Audit de projet informatique'),
('Coaching technique');

-- Insertion des avis clients
INSERT INTO testimonials (author_name, author_role, rating, content) VALUES 
('Amour G.', 'Co-fondateur AGC Space', 4.5, 'Un jeune dynamique et multi-compétence.'),
('Clovis', 'CEO de AGC Space', 5.0, 'Jeune à grand potentiel.');

-- 6. Table Analytics (tracking visites)
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    day DATE DEFAULT CURRENT_DATE UNIQUE,
    views INTEGER DEFAULT 1
);

-- Fonction pour incrémenter les visites du jour
CREATE OR REPLACE FUNCTION increment_visit()
RETURNS void AS $$
BEGIN
  INSERT INTO analytics (day, views)
  VALUES (CURRENT_DATE, 1)
  ON CONFLICT (day)
  DO UPDATE SET views = analytics.views + 1;
END;
$$ LANGUAGE plpgsql;

-- 7. Table Experiences
CREATE TABLE experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    period TEXT NOT NULL,
    category TEXT CHECK (category IN ('tech', 'leadership')) NOT NULL,
    description TEXT NOT NULL,
    skills_demonstrated TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
