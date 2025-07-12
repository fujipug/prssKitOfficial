'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import { PiGlobeFill } from 'react-icons/pi';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [, startTransition] = useTransition();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const locale = event.target.value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn ml-1">
        <PiGlobeFill size={22} />

        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 mt-2 p-2 shadow">
        <li className='flex items-center'>
          <p className="pe-1 font-mono text-[.65rem] font-bold tracking-[0.05rem] opacity-60">EN</p>
          <input
            type="radio"
            name="language-dropdown"
            className="btn btn-sm btn-ghost justify-start"
            aria-label="English"
            value="en"
            checked={locale === 'en'}
            onChange={onChange}
          />
        </li>
        <li className='flex items-center'>
          <p className="pe-1 font-mono text-[.65rem] font-bold tracking-[0.05rem] opacity-60">ES</p>
          <input
            type="radio"
            name="language-dropdown"
            className="btn btn-sm btn-ghost justify-start"
            aria-label="Español"
            value="es"
            checked={locale === 'es'}
            onChange={onChange}
          />
        </li>
      </ul>
    </div>
  )
}