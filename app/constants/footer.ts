import { FooterLink } from "../types";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'LinkedIn',
    hoverText: 'Connect with me',
    icon: 'icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/batuhan-karakus/',
  },
  {
    name: 'GitHub',
    hoverText: 'Open Source',
    icon: 'icons/github.svg',
    url: 'https://github.com/karakushbatu',
  },
  {
    name: 'Instagram',
    hoverText: '@karakushbatu',
    icon: 'icons/instagram.svg',
    url: 'https://www.instagram.com/karakushbatu/',
  },
  {
    // TODO: point to the dedicated blog page once it's live.
    name: 'Blog',
    hoverText: 'Read my writing',
    icon: 'icons/file.svg',
    url: 'https://medium.com/@batukarakush',
  },
  {
    name: 'Email',
    hoverText: 'Get in touch',
    icon: 'icons/file.svg',
    url: 'mailto:batukarakush@gmail.com',
  },
  {
    name: 'Resume',
    hoverText: 'Download CV',
    icon: 'icons/file.svg',
    url: './Batu_Karakus_CV-EN.pdf',
  },
];
