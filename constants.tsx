import React from 'react';

export const APP_NAME = "The Link Vibe";

export const CATEGORIES = [
  "Marketing", "Social Media", "Enterprise", "Education", "Personal"
];

export const FEATURES = [
  {
    id: 1,
    title: "Instant Shortening",
    description: "Generate clean, memorable links in less than a second.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Global CDN",
    description: "Optimized routing for the fastest redirects possible.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: ['Unlimited links', 'Standard speed'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    features: ['Custom domains', 'Priority routing'],
  }
];