import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'ar'].includes(locale)) {
    // Potentially handle invalid locales, e.g., by redirecting or showing a 404 page
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
