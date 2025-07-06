import { QRCodeSVG } from "qrcode.react";

export default function Share() {
  return (
    <div className="min-h-dvh bg-base-100">
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-8 md:col-span-3">
          <div className="bg-base-200 border-base-300 rounded-box border p-4 flex flex-col items-center justify-center">

            <span className="rounded-box p-4 bg-white">
              <QRCodeSVG
                value="https://prsskit.com/"
                size={256}
                fgColor="#000000"
                level="M"
              />
            </span>

            <h1 className="text-3xl font-bold mt-4">Fujixsan</h1>

            <span className="rounded-box py-2 px-3 bg-base-300 mt-2">
              <p className="text-sm font-mono">prsskit.com/fujixsan</p>
            </span>
          </div>
        </div>

        <div className="col-span-8 md:col-span-5">
          <div className="bg-base-200 border-base-300 rounded-box border p-4">
            <h1 className="text-2xl font-bold mb-4">test</h1>
            <p className="text-lg mb-8">Customize your PRSS Kit to fit your style!</p>
          </div>
        </div>
      </div>
    </div>
  );
}