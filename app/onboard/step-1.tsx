// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Step1({ translations, ...children }: { translations: any } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...children} className="flex flex-col items-center justify-center min-h-dvh bg-base-200 diamond-pattern">
      <div className="w-fit text-center">
        <div className="torn-paper text-black">
          <h1 className="font-bold text-2xl sm:text-5xl">{translations['step_1_title']}</h1>
        </div>
      </div>

      <fieldset className="fieldset bg-base-300 border-base-100 rounded-box border p-4 mt-4 max-w-md w-full">
        <input type="text" placeholder="James Hype" className="input w-full" />
      </fieldset>
    </div>
  );
}
