
import React from 'react';

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.502 6.002C7.502 4.345 8.847 3 10.502 3h3C15.157 3 16.5 4.345 16.5 6.002v1.501A1.5 1.5 0 0115 9.002h- basada.75v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-.75-.75h-.75V6.002a.752.752 0 00-.75-.75h-3a.752.752 0 00-.75.75v1.501h-.75a.75.75 0 00-.75.75v.75a.75.75 0 001.5 0v-.75A1.5 1.5 0 019 7.503v-1.5zM4.12 9.375A3.375 3.375 0 017.5 6h9a3.375 3.375 0 013.375 3.375V15A3.375 3.375 0 0116.5 18.375h-9A3.375 3.375 0 014.125 15V9.375zM8.25 12a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H9z" clipRule="evenodd" />
     <path d="M12 1.5a.75.75 0 01.75.75V3h1.5V2.25A2.25 2.25 0 0012.75 0h-1.5A2.25 2.25 0 009 2.25V3h1.5V2.25a.75.75 0 01.75-.75zm-.75 9a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-3z"/>
     <path fillRule="evenodd" d="M6.323 19.854C3.69 18.002 1.5 15.206 1.5 12c0-3.745 2.513-6.91 5.886-8.484.22-.103.46-.166.714-.166h6.75c.255 0 .495.063.715.166C18.987 5.09 21.5 8.255 21.5 12c0 3.206-2.19 6.002-4.823 7.854a.75.75 0 01-1.033-.219 8.264 8.264 0 00-3.144-2.135 8.264 8.264 0 00-3.144 2.135.75.75 0 01-1.033.219zM4.502 16.5c.542.944 1.325 1.76 2.28 2.386a.75.75 0 01.44.686 6.737 6.737 0 003.278 1.678 6.737 6.737 0 003.278-1.678.75.75 0 01.44-.686c.955-.627 1.738-1.442 2.28-2.386A8.001 8.001 0 0020 12a8.001 8.001 0 00-3.5-6.5C15.958 4.562 14.326 4 12.5 4s-3.458.561-4 1.5A8.001 8.001 0 003 12a8.001 8.001 0 001.502 4.5z" clipRule="evenodd" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);
    