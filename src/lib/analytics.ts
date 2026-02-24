// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaType: string, destination: string) => {
  trackEvent('cta_click', {
    cta_type: ctaType,
    destination: destination,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};

// Track navigation
export const trackNavigation = (linkName: string, destination: string) => {
  trackEvent('navigation', {
    link_name: linkName,
    destination: destination,
  });
};

// Track project views
export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    project_name: projectName,
  });
};

// Track service interest
export const trackServiceInterest = (serviceName: string) => {
  trackEvent('service_interest', {
    service_name: serviceName,
  });
};