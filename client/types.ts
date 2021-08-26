export type Post = {
  authors: [
    {
      bio: string;
      cover_image: string;
      facebook: string;
      id: string;
      location: string;
      meta_description: string;
      meta_title: string;
      name: string;
      profile_image: string;
      slug: string;
      twitter: string;
      url: string;
      website: string;
    }
  ];
  canonical_url: string;
  codeinjection_foot: string;
  codeinjection_head: string;
  comment_id: string;
  created_at: string;
  custom_excerpt: string;
  custom_template: null;
  email_subject: null;
  excerpt: string;
  feature_image: string;
  featured: boolean;
  html: string;
  id: string;
  meta_description?: string;
  meta_title?: string;
  og_description?: string;
  og_image?: string;
  og_title?: string;
  published_at: string;
  reading_time: number;
  send_email_when_published: boolean;
  slug: string;
  title: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  updated_at: string;
  url: string;
  uuid: string;
  visibility: string;
  tags: [
    {
      name: string;
    }
  ];
};

export type password_category =
  | "entertainment"
  | "business"
  | "payment and banking"
  | "personal"
  | "travel"
  | "other";

export type PassObj = {
  siteName: string;
  email: string;
  password: string;
  strength: number;
  credentialID: string;
  siteLogo?: string;
};
