import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type GTagParams = {
  page_title?: string;
  page_path?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'js' | 'config' | 'event',
      targetId: string | Date,
      params?: GTagParams
    ) => void;
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();
  const TRACKING_ID = 'G-H1THH9TWG4';

  useEffect(() => {
    // Load the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];

    // Create the gtag function
    const gtag = (..._args: Parameters<Window['gtag']>) => {
      window.dataLayer.push(_args);
    };
    window.gtag = gtag;

    // Basic gtag setup
    window.gtag('js', new Date());
    window.gtag('config', TRACKING_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};
