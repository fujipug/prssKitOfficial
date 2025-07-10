// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Step3({ translations, step3Complete, ...children }: { translations: any, step3Complete: (age: string | null) => void } & React.HTMLAttributes<HTMLDivElement>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const age = formData.get("age") as string | null;
    step3Complete(age);
  };

  return (
    <div {...children} className="flex flex-col items-center justify-center min-h-dvh bg-base-200 checker-pattern">
      <div className="w-fit text-center">
        <div className="torn-paper text-black">
          <h1 className="font-bold text-2xl sm:text-5xl">{translations['step_3_title']}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-300 border-base-100 rounded-box border p-4 mt-4 max-w-md w-full">
          <input type="text" className="input w-full" name="age" />
        </fieldset>
      </form>
    </div>
  );
}
