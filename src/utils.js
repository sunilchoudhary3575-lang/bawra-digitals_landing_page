export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Clean the target path from leading slash and 'landingpage' prefix if present
  let cleanPath = path.replace(/^\//, '');
  if (cleanPath.startsWith('landingpage/')) {
    cleanPath = cleanPath.substring('landingpage/'.length);
  }
  
  const pathname = window.location.pathname;
  
  // Find where 'landingpage' is in the current pathname to resolve the dynamic base
  const landingPageIndex = pathname.indexOf('/landingpage');
  if (landingPageIndex !== -1) {
    const dynamicBase = pathname.substring(0, landingPageIndex + '/landingpage'.length);
    return `${dynamicBase}/${cleanPath}`;
  }
  
  // Find where 'bawra-digitals_landing_page' is in the current pathname
  const ghPageIndex = pathname.indexOf('/bawra-digitals_landing_page');
  if (ghPageIndex !== -1) {
    const dynamicBase = pathname.substring(0, ghPageIndex + '/bawra-digitals_landing_page'.length);
    return `${dynamicBase}/${cleanPath}`;
  }
  
  // Default fallback (uses base path e.g. '/' or relative)
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};
