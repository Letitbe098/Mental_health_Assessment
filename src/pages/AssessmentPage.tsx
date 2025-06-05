// AssessmentPage.tsx

import React, { useState } from 'react';
import {
  getAgeSpecificQuestions,
  interpretDepressionResult,
  interpretAnxietyResult,
  AssessmentType,
  AgeGroup,
  AssessmentQuestion,
  AssessmentResult,
} from '../models/assessmentTypes';

// Simple icon helper (customize as desired)
const getTherapyIcon = (type: string) => {
  switch (type) {
    case 'music': return '🎵';
    case 'breathing': return '🫁';
    case 'yoga': return '🧘‍♂️';
    case 'journaling': return '📓';
    case 'meditation': return '🧘‍♀️';
    case 'exercise': return '🏃‍♂️';
    case 'story': return '📖';
    case 'mindfulness': return '🧠';
    default: return '💡';
  }
};

const AssessmentPage: React.FC = () => {
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('depression');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('child');
  const [answers, setAnswers] = useState<{ [id: string]: number }>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: AssessmentQuestion[] = getAgeSpecificQuestions(assessmentType, ageGroup);

  const handleAnswer = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const score = questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    let res: AssessmentResult;
    if (assessmentType === 'depression') {
      res = interpretDepressionResult(score, ageGroup);
    } else {
      res = interpretAnxietyResult(score, ageGroup);
    }
    setResult(res);
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Mental Health Assessment</h2>
      {!result && (
        <>
          <div className="flex gap-4 mb-4">
            <label>
              Assessment:
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value as AssessmentType)}
                className="ml-2 border rounded px-2 py-1"
              >
                <option value="depression">Depression</option>
                <option value="anxiety">Anxiety</option>
              </select>
            </label>
            <label>
              Age Group:
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="ml-2 border rounded px-2 py-1"
              >
                <option value="child">Child</option>
                <option value="teen">Teen</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
            </label>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {questions.map((q, idx) => (
              <div key={q.id} className="mb-4">
                <label className="block font-semibold mb-2">
                  {idx + 1}. {q.text}
                </label>
                <div className="flex gap-4">
                  {q.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => handleAnswer(q.id, opt.value)}
                        required
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </>
      )}

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Your Result</h3>
          <div
            className="p-4 rounded mb-4"
            style={{ backgroundColor: result.color, color: '#fff' }}
          >
            <p>
              <strong>Score:</strong> {result.score}
            </p>
            <p>
              <strong>Severity:</strong> {result.severity}
            </p>
            <p>
              <strong>Interpretation:</strong> {result.interpretation}
            </p>
          </div>
          <h4 className="text-lg font-semibold mb-2 text-blue-700">Personalized Recommendations</h4>
          <div className="grid gap-4">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-white border border-gray-200 mr-3 text-2xl">
                    {getTherapyIcon(rec.type)}
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">{rec.title}</h5>
                    <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                    {rec.duration && (
                      <p className="text-sm text-primary-600">
                        Recommended duration: {rec.duration}
                      </p>
                    )}
                  </div>
                </div>
                {rec.videoUrl && (
                  <div className="mt-3">
                    <iframe
                      width="100%"
                      height="180"
                      src={rec.videoUrl}
                      title={rec.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {rec.imageUrl && (
                  <img
                    src={rec.imageUrl}
                    alt={rec.title}
                    className="w-full h-32 object-cover rounded-lg mt-3"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleRestart}
          >
            Restart Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
