"use client";

import { useState } from "react";
import Question from "./Question";
import Response from "./Response";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GeneratedForm() {
  const [isQuestion, setIsQuestion] = useState(true);

  function handleQuestionClick() {
    setIsQuestion(true);
  }

  function handleResponseClick() {
    setIsQuestion(false);
  }

  return (
    <section className="my-14 flex flex-col gap-y-7 px-14">
      <h1 className="text-4xl font-bold">Form Name</h1>
      <div className="flex flex-col gap-y-7">
        <div className="flex gap-x-5 border-b">
          <button
            onClick={handleQuestionClick}
            className={` border-b-2 ${
              isQuestion ? "border-current" : "border-transparent"
            }`}
          >
            Question
          </button>
          <button
            onClick={handleResponseClick}
            className={` border-b-2 ${
              !isQuestion ? "border-current" : "border-transparent"
            }`}
          >
            Response
          </button>
        </div>
        <div className="flex flex-col items-center">
          {isQuestion ? <Question /> : <Response />}
        </div>
      </div>
    </section>
  );
}
