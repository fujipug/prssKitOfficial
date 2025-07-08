'use client';
import SocialAuthButtonGrid from "@/components/social-auth-button-grid";
import { createSessionCookie } from "@/services/cookies";
import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";

type LoginFormProps = {
  email_title: string;
  email_error: string;
  password_requirements: string;
  password_title: string;
  login_button: string;
  divider_text: string;
  login_error: string;
};

export default function LoginForm({ messages, ...formProps }: { messages: LoginFormProps } & React.HTMLAttributes<HTMLFormElement>) {
  const auth = useAuth();
  const [alert, setAlert] = useState<boolean>(false);
  const translationsPasswordRequirementsList = messages['password_requirements'].split(/[,;]/).map((item, idx) => (
    <li key={idx}>{item}</li>
  ));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) return;

    await auth.signIn({ email, password }).then(async () => {
      const token = await auth.firebaseUser?.getIdToken();
      if (typeof token === "string") {
        await createSessionCookie(token, 12 * 60 * 60 * 24).then((response) => {
          console.log("Session cookie created successfully:", response);
          setAlert(false);
        })
      } else {
        setAlert(true);
      }
    });
  }

  return (
    <>
      {alert && (
        <div role="alert" className="alert alert-error alert-soft">
          <span>{messages['login_error']}</span>
        </div>
      )}

      <form {...formProps} onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 space-y-4">
          <span>
            <p className="text-sm mb-1">{messages['email_title']}</p>
            <label className="input validator w-full">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" name="email" placeholder="email@prsskit.com" required />
            </label>
            <div className="validator-hint hidden">{messages['email_error']}</div>
          </span>

          <span>
            <p className="text-sm mb-1">{messages['password_title']}</p>
            <label className="input validator w-full">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
            </label>
            <ul className="validator-hint hidden">
              {translationsPasswordRequirementsList}
            </ul>
          </span>

          <button className="btn btn-lg btn-secondary" type="submit">
            <span className={auth.isLoading ? "loading loading-spinner" : ""}></span>
            {messages['login_button']}
          </button>
        </fieldset>
      </form>

      <div className="divider my-6">
        <span className="bg-base-300 rounded-field p-1 rotate-3 text-sm">{messages['divider_text']}</span>
      </div>

      <SocialAuthButtonGrid />
    </>
  )
}