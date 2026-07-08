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
  
  // Find where 'landingpage' is in the current pathname to resolve the dynamic base
  const pathname = window.location.pathname;
  const landingPageIndex = pathname.indexOf('/landingpage');
  
  if (landingPageIndex !== -1) {
    const dynamicBase = pathname.substring(0, landingPageIndex + '/landingpage'.length);
    return `${dynamicBase}/${cleanPath}`;
  }
  
  return `/landingpage/${cleanPath}`;
};
