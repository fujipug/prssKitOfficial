// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Step2({ translations, step2Complete, ...children }: { translations: any, step2Complete: (email: string | null) => void } & React.HTMLAttributes<HTMLDivElement>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string | null;
    step2Complete(email);
  };

  return (
    <div {...children} className="flex flex-col items-center justify-center min-h-dvh bg-base-200 brick-pattern">
      <div className="w-fit text-center">
        <div className="torn-paper text-black">
          <h1 className="font-bold text-2xl sm:text-5xl">{translations['step_2_title']}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-300 border-base-100 rounded-box border p-4 mt-4 max-w-md w-full">
          <input type="text" className="input w-full" name="email" />
        </fieldset>
      </form>
    </div>
  );
}
