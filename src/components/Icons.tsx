type P = { size?: number };
export const IconClose = ({ size = 18 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const IconMenu = ({ size = 20 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
);
export const IconArrow = ({ size = 16 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const Diamond = ({ size = 9, filled = true }: P & { filled?: boolean }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 10 10" style={{ flex: 'none' }}><path d="M5 .5 9.5 5 5 9.5 .5 5Z" fill={filled ? 'var(--gold)' : 'none'} stroke="var(--gold)" /></svg>
);
export const IconInstagram = ({ size = 18 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>
);
export const IconSearch = ({ size = 18 }: P) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></svg>
);
