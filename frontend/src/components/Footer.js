import React from 'react';
import '../Css/Footer.css';

const Footer = () => {
  const quickLinks = [
    { href: '/about', text: 'About Us' },
    { href: '/courses', text: 'Courses' },
    { href: '/career', text: 'Career' },
    { href: '/contact', text: 'Contact' },
  ];

  const supportLinks = [
    { href: '/help', text: 'Help Center' },
    { href: '/terms', text: 'Terms of Service' },
    { href: '/privacy', text: 'Privacy Policy' },
    { href: '/faq', text: 'FAQ' },
  ];

  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerWrapper">
          <div className="footerSections">
            <div>
              <h1 className="brandName">EduMaster</h1>
              <p className="brandDescription">
                Empowering futures through innovative online education.
              </p>
            </div>
            <FooterSection title="Quick Links" links={quickLinks} />
            <FooterSection title="Support" links={supportLinks} />
            <div>
              <h2 className="sectionTitle">Connect</h2>
              <SocialIcons />
            </div>
          </div>
        </div>
        <p className="copyright">© 2025 EduMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }) => {
  return (
    <div>
      <h2 className="sectionTitle">{title}</h2>
      <nav className="linkList">
        {links.map((link, index) => (
          <a key={index} href={link.href} className="footerLink">
            {link.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

const SocialIcons = () => {
  return (
    <div className="socialIcons">
      <a href="https://facebook.com" aria-label="Facebook">
        <i className="ti ti-brand-facebook" />
      </a>
      <a href="https://twitter.com" aria-label="Twitter">
        <i className="ti ti-brand-twitter" />
      </a>
      <a href="https://linkedin.com" aria-label="LinkedIn">
        <i className="ti ti-brand-linkedin" />
      </a>
      <a href="https://instagram.com" aria-label="Instagram">
        <i className="ti ti-brand-instagram" />
      </a>
    </div>
  );
};

export default Footer;
