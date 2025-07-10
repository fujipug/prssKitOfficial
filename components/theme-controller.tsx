'use client';
import { useTheme } from "@/lib/ThemeContext";

const themes = [
  { name: 'fantasy', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'cupcake', label: 'Cupcake' },
  { name: 'coffee', label: 'Coffee' },
  { name: 'retro', label: 'Retro' }
];

export default function ThemeController({ translations }: { translations: { theme: string } }) {
  const { setTheme } = useTheme();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn ml-1">
        <span className="text-xs">{translations['theme']}</span>
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
        {themes.map((theme, index) => (
          <li key={index}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme.label}
              onChange={() => setTheme(theme.name)}
              value={theme.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}