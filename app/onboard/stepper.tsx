"use client";

import { useEffect, useState } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Link from "next/link";
import { scrollToId } from "@/lib/scroll-to-id";

type OnboardProps = {
  step_1_title: string;
  step_2_title: string;
  step_3_title: string;
};

export default function Stepper({ messages }: { messages: OnboardProps }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    scrollToId(`step-${index + 1}`);
  }, [index]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
        <Link role="button" href="/" className={`${index === 3 && 'hidden'} hover:-rotate-6`}>Home </Link>

        {index < 2 && (
          <button onClick={() => setIndex((prevIndex) => prevIndex + 1)} className="hover:rotate-6">Skip </button>
        )}

        {index === 2 && (
          <Link role="button" className="hover:rotate-6" href="/register">Register </Link>
        )}
      </div>

      {/* Render the current step based on the index */}
      {index >= 0 && <Step1 id="step-1" translations={messages} />}
      {index >= 1 && <Step2 id="step-2" translations={messages} />}
      {index >= 2 && <Step3 id="step-3" translations={messages} />}
    </>
  );
}
