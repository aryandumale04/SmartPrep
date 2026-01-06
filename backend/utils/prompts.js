const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  description,
  numberOfQuestions
) => `
You are an AI interview preparation system.

CONTEXT:
- Target Role: ${role}
- Years of Experience: ${experience}
- Focus Topics: ${topicsToFocus.join(", ")}
- Session Description / Goals: ${description || "General interview preparation"}

TASK:
- Generate EXACTLY ${numberOfQuestions} interview questions.
- Each question MUST be clearly related to at least one focus topic.
- Difficulty and depth MUST be appropriate for someone with ${experience} of real-world development experience.
- Use the session description to decide whether answers should be more code-focused, concept-focused, or interview-oriented.
- Avoid purely academic or textbook definitions unless they test practical understanding.
- At most ONE question may be a basic definition.
- Prefer questions that test usage, reasoning, debugging, or integration of concepts.

ANSWERS:
- Adjust explanation depth dynamically based on the candidate’s experience and the session description.
- Do NOT artificially simplify or restrict explanations.
- Include examples or code snippets whenever they help the candidate understand or explain the concept better in an interview.
- Keep answers focused and relevant, not verbose for the sake of length.

OUTPUT RULES (MANDATORY):
- Output ONLY a valid JSON array.
- No text before or after the JSON.
- Use ONLY double quotes for keys and string values.
- Markdown (including lists or code blocks) is ALLOWED INSIDE string values.
- The output MUST be fully parseable by JSON.parse().

REQUIRED FORMAT:
[
  {
    "question": "Question text",
    "answer": "Answer text"
  }
]

FINAL CHECK:
Ensure the output is valid JSON and strictly follows the required format.
`;


const conceptExplainPrompt = (question) => `
You are an AI system that explains interview concepts.

TASK:
- Explain the following interview question clearly and effectively.
- Adjust explanation depth based on what would help a real interview candidate understand and explain the concept.
- Focus on practical understanding and real-world usage.
- Provide a short, clear title summarizing the core concept.
- Include a code example if it improves clarity or interview readiness.

OUTPUT RULES (MANDATORY):
- Output ONLY a valid JSON object.
- No text before or after the JSON.
- Use ONLY double quotes for keys and string values.
- Markdown (including code blocks) is ALLOWED INSIDE string values.
- The output MUST be fully parseable by JSON.parse().

REQUIRED FORMAT:
{
  "title": "Short clear title",
  "explanation": "Explanation text"
}

FINAL CHECK:
Ensure the output is valid JSON and strictly follows the required format.
`;


module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt
};
