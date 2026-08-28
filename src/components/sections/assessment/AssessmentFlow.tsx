"use client";

import { useReducer, useState, useCallback } from "react";
import {
  EMPTY_ANSWERS,
  QUESTIONS,
  isQuestionAnswered,
  type AssessmentAnswers,
  type Registration,
} from "@/lib/assessment/questions";
import type { AssessmentReport } from "@/lib/assessment/report";
import IntroScreen from "./IntroScreen";
import RegistrationScreen from "./RegistrationScreen";
import QuestionScreen from "./QuestionScreen";
import GeneratingScreen from "./GeneratingScreen";
import ResultsScreen from "./ResultsScreen";

type Screen = "intro" | "registration" | "question" | "generating" | "results";

interface State {
  screen: Screen;
  /** Index into QUESTIONS while `screen === "question"`. */
  step: number;
  registration: Registration;
  answers: AssessmentAnswers;
}

type Action =
  | { type: "start" }
  | { type: "setRegistration"; field: keyof Registration; value: string }
  | { type: "submitRegistration" }
  | { type: "setSingle"; key: keyof AssessmentAnswers; value: string }
  | { type: "toggleMulti"; key: keyof AssessmentAnswers; value: string }
  | { type: "setText"; key: keyof AssessmentAnswers; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "generating" }
  | { type: "results" }
  | { type: "restart" };

const initialState: State = {
  screen: "intro",
  step: 0,
  registration: { name: "", email: "", industry: "", companySize: "" },
  answers: EMPTY_ANSWERS,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { ...state, screen: "registration" };

    case "setRegistration":
      return {
        ...state,
        registration: { ...state.registration, [action.field]: action.value },
      };

    case "submitRegistration":
      return { ...state, screen: "question", step: 0 };

    case "setSingle":
      return { ...state, answers: { ...state.answers, [action.key]: action.value } };

    case "toggleMulti": {
      const current = state.answers[action.key] as string[];
      const next = current.includes(action.value)
        ? current.filter((v) => v !== action.value)
        : [...current, action.value];
      return { ...state, answers: { ...state.answers, [action.key]: next } };
    }

    case "setText":
      return { ...state, answers: { ...state.answers, [action.key]: action.value } };

    case "next":
      return { ...state, step: Math.min(state.step + 1, QUESTIONS.length - 1) };

    case "back":
      // Stepping back off the first question returns to registration.
      if (state.step === 0) return { ...state, screen: "registration" };
      return { ...state, step: state.step - 1 };

    case "generating":
      return { ...state, screen: "generating" };

    case "results":
      return { ...state, screen: "results" };

    case "restart":
      return initialState;

    default:
      return state;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function AssessmentFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [emailSent, setEmailSent] = useState(true);
  const [error, setError] = useState("");

  const question = QUESTIONS[state.step];
  const isLastStep = state.step === QUESTIONS.length - 1;
  const canAdvance = question ? isQuestionAnswered(question, state.answers) : false;

  const submit = useCallback(async () => {
    dispatch({ type: "generating" });
    setError("");
    scrollToTop();

    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state.registration, ...state.answers }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.report) {
        setError(result.error || "We couldn't generate your assessment. Please try again.");
        dispatch({ type: "results" });
        return;
      }

      setReport(result.report as AssessmentReport);
      setEmailSent(result.emailSent !== false);
      dispatch({ type: "results" });
      scrollToTop();
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      dispatch({ type: "results" });
    }
  }, [state.registration, state.answers]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      void submit();
      return;
    }
    dispatch({ type: "next" });
    scrollToTop();
  }, [isLastStep, submit]);

  const handleBack = useCallback(() => {
    dispatch({ type: "back" });
    scrollToTop();
  }, []);

  if (state.screen === "intro") {
    return <IntroScreen onStart={() => { dispatch({ type: "start" }); scrollToTop(); }} />;
  }

  if (state.screen === "registration") {
    return (
      <RegistrationScreen
        values={state.registration}
        onChange={(field, value) => dispatch({ type: "setRegistration", field, value })}
        onContinue={() => { dispatch({ type: "submitRegistration" }); scrollToTop(); }}
      />
    );
  }

  if (state.screen === "generating") {
    return <GeneratingScreen />;
  }

  if (state.screen === "results") {
    return (
      <ResultsScreen
        report={report}
        error={error}
        emailSent={emailSent}
        onRestart={() => {
          setReport(null);
          setError("");
          dispatch({ type: "restart" });
          scrollToTop();
        }}
      />
    );
  }

  return (
    <QuestionScreen
      question={question}
      stepIndex={state.step}
      totalSteps={QUESTIONS.length}
      answers={state.answers}
      canAdvance={canAdvance}
      isLastStep={isLastStep}
      onSelectSingle={(key, value) => dispatch({ type: "setSingle", key, value })}
      onToggleMulti={(key, value) => dispatch({ type: "toggleMulti", key, value })}
      onChangeText={(key, value) => dispatch({ type: "setText", key, value })}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
}
