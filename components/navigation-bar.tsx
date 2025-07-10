'use client';
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import ThemeController from "./theme-controller";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NavigationBar({ translations }: { translations: any }) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const isHidden = pathname === "/onboard";
  const isAuthPath = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/artist-dashboard");
  const isHomePath = pathname === "/" || pathname === "/home";
  const isDashboardPath = pathname === "/artist-dashboard";

  return (
    <div className={`${isHidden ? 'hidden' : 'navbar bg-transparent mx-auto px-4 py-2 items-center sticky top-0 z-50 backdrop-blur'}`}>
      <div className="navbar-start">
        <div className={`${isDashboardPath ? 'dropdown' : 'hidden'}`}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-300 rounded-box z-1 mt-2 p-2 shadow">
            <li><a>{translations['profile']}</a></li>
            <li><a>{translations['settings']}</a></li>
            <li role="button" onClick={signOut} className="btn btn-error mt-1">
              {translations['logout']}
            </li>
          </ul>
        </div>
      </div>
      <div className={`${!isDashboardPath ? 'hidden' : 'navbar-center'}`}>
        <div className="text-center">
          <Link href="/">
            <div className="torn-paper text-black">
              <h1 className="font-bold text-md sm:text-xl">PRSS KIT</h1>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <ThemeController translations={translations} />
        <LocaleSwitcher />
        <Link role="button" className={`${!isAuthPath ? 'btn btn-primary ml-1' : 'hidden'}`} href="/login">
          <span className="text-sm">{translations['login']}</span>
        </Link>
        <Link role="button" className={`${!isAuthPath && !isHomePath ? 'btn btn-secondary ml-1' : 'hidden'}`} href="/register">
          <span className="text-sm">{translations['register']}</span>
        </Link>
      </div>
    </div>
  );
} 