export const pastFromClipboard = () => {
  return navigator.clipboard.readText();
}

export const isUrlStringValid = (url: string) => {
  return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(url);
} 

export const getDomainFromUrl = (url: string): string => {
  const domain = new URL(url);
  const hostname = domain.hostname.replace('www.','');

  return hostname;
} 