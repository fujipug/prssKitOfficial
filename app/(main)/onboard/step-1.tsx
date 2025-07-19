// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Step1({ translations, step1Complete, ...children }: { translations: any, step1Complete: (name: string | null) => void } & React.HTMLAttributes<HTMLDivElement>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string | null;

    step1Complete(name);
  };

  return (
    <div {...children} className="flex flex-col items-center justify-center min-h-dvh bg-base-200 diamond-pattern">
      <div className="w-fit text-center">
        <div className="torn-paper text-black">
          <h1 className="font-bold text-2xl sm:text-5xl">{translations['step_1_title']}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-300 border-base-100 rounded-box border p-4 mt-4 max-w-md w-full">
          <div className="join">
            <input type="text" name="name" placeholder="James Hype" className="input w-full" />
            <button type="submit" className="btn join-item">{translations['step_1_button']}</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
