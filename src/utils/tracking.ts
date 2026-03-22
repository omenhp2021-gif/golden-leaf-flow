/**
 * Tracking Utilities for Taju Tea
 * 
 * This file handles loading of GA4, Meta Pixel, and Microsoft Clarity/Hotjar.
 * Project IDs are pulled from .env for security/obfuscation.
 */

declare global {
  interface Window {
    dataLayer: any[];
    fbq: any;
    _fbq: any;
    clarity: any;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID;
const META_ID = import.meta.env.VITE_META_PIXEL_ID;
const HEATMAP_ID = import.meta.env.VITE_HEATMAP_ID;

const loadGoogleAnalytics = (id: string) => {
  if (!id || id === 'YOUR_GOOGLE_ANALYTICS_ID') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]): void {
    window.dataLayer.push(args);
  }
  // @ts-ignore
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id);
};

const loadMetaPixel = (id: string) => {
  if (!id || id === 'YOUR_META_PIXEL_ID') return;
  // @ts-ignore
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', id);
  window.fbq('track', 'PageView');
};

const loadHeatmap = (id: string) => {
  if (!id || id === 'YOUR_HEATMAP_ID') return;
  // @ts-ignore
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", id);
};

export const initTracking = () => {
  const consent = localStorage.getItem("taju-cookie-consent");
  if (consent === "accepted") {
    loadGoogleAnalytics(GA_ID);
    loadMetaPixel(META_ID);
    loadHeatmap(HEATMAP_ID);
  }
};
