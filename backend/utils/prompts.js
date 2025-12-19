const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI that generates interview questions and answers.

TASK:
- Role: ${role}
- Experience: ${experience}
- Focus Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} interview questions.
- For each question, generate a clear beginner-friendly answer.
- Include a small code example only if necessary.

OUTPUT RULES:
- Output ONLY a valid JSON array.
- No markdown.
- No backticks.
- No trailing commas.
- No text before or after the JSON.

FORMAT:
[
  {
    "question": "...",
    "answer": "..."
  }
]
  
`;


const conceptExplainPrompt = (question) => `
You are an AI that explains technical interview concepts.

TASK:
-  Explain the following question briefly in 4–6 lines, simple and crisp.
- Question: "${question}"
- Provide a short, clear title summarizing the concept.
- Include code examples only if helpful.

OUTPUT RULES:
- Output ONLY a valid JSON object.
- No markdown.
- No backticks.
- No extra text.

FORMAT:
{
  "title": "Short title here.",
  "explanation": "Detailed explanation here."
}

`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt}
