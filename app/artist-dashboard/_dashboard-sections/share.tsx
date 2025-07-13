import { useAuth } from "@/lib/AuthContext";
import { QRCodeSVG } from "qrcode.react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Share({ translations }: { translations: any }) {
  const { artist } = useAuth();

  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-4 lg:col-span-3">
          <div className="bg-base-200 border-base-300 rounded-box border p-4 flex flex-col items-center justify-center">

            <span className="rounded-box p-4 bg-white">
              <QRCodeSVG
                value="https://prsskit.com/"
                size={256}
                fgColor="#000000"
                level="M"
              />
            </span>

            <h1 className="text-3xl font-bold mt-4">{artist?.artistName}</h1>

            <span className="rounded-box py-2 px-3 bg-base-300 mt-2">
              <p className="text-sm font-mono">prsskit.com/{artist?.urlIdentifier}</p>
            </span>
          </div>
        </div>

        <div className="col-span-8 md:col-span-4 lg:col-span-5">
          <div className="bg-base-200 border-base-300 rounded-box border p-4">
            <h1 className="text-2xl font-bold mb-1">{translations['title']}</h1>
            <p className="text-sm mb-4">{translations['description']}</p>
            <ul className="list bg-base-100 rounded-box shadow">

              {/* <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li> */}

              <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                <div>
                  <div>Dio Lupa</div>
                  <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
                </div>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
              </li>

              <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp" /></div>
                <div>
                  <div>Ellie Beilish</div>
                  <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
                </div>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
              </li>

              <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp" /></div>
                <div>
                  <div>Sabrino Gardener</div>
                  <div className="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
                </div>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                </button>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}