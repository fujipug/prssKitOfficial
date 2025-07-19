'use client';
import { useTheme } from "@/lib/ThemeContext";
import { PiSwatchesFill } from "react-icons/pi";

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'cupcake', label: 'Cupcake' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'retro', label: 'Retro' }
];

export default function ThemeController() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn ml-1">
        <PiSwatchesFill size={22} />

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
        {themes.map((themeItem, index) => (
          <li key={index}>
            <input
              type="radio"
              name="theme-dropdown"
              className={`${theme === themeItem.value ? 'btn-active' : ''} theme-controller btn btn-sm btn-ghost btn-block justify-start`}
              aria-label={themeItem.label}
              onChange={() => setTheme(themeItem.value)}
              value={themeItem.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}