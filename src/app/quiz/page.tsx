"use client";
import { useState } from "react";
import { useThemeClasses } from "@/hooks/useThemeClasses";

export default function QuizPage() {
  const {
    bgColor,
    textColor,
    buttonGreen,
    borderColor,
    optionHoverBg,
    highlightCorrect,
    highlightWrong,
  } = useThemeClasses();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: "a", text: "Hyper Text Markup Language" },
    { id: "b", text: "Home Tool Markup Language" },
    { id: "c", text: "Hyperlinks and Text Markup Language" },
    { id: "d", text: "Hyper Terminal Machine Language" },
  ];

  const correctAnswer = "a";

  return (
    <div className={`min-h-screen py-20 px-6 ${bgColor} ${textColor}`}>
      <div className="max-w-2xl mx-auto p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800 border dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🧠 Sample Quiz Question
        </h1>

        <p className="mb-4 text-lg font-medium">
          Q: What does <code>HTML</code> stand for?
        </p>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = submitted && opt.id === correctAnswer;
            const isWrong = submitted && isSelected && opt.id !== correctAnswer;

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium
                  border ${borderColor} ${optionHoverBg}
                  ${
                    isCorrect
                      ? highlightCorrect
                      : isWrong
                      ? highlightWrong
                      : isSelected
                      ? "bg-opacity-30"
                      : ""
                  }`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        <button
          disabled={!selectedOption}
          onClick={() => setSubmitted(true)}
          className={`mt-6 w-full py-3 rounded-xl text-white font-semibold ${buttonGreen} ${
            !selectedOption ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit
        </button>

        {submitted && (
          <div className="mt-6 text-lg font-semibold text-center">
            {selectedOption === correctAnswer ? (
              <p className="text-green-500">✅ Correct! Well done.</p>
            ) : (
              <p className="text-red-500">
                ❌ Oops! The correct answer is:{" "}
                <strong>Hyper Text Markup Language</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
