const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type ChatResponse = {
  answer: string;
  source: "ai";
  student_id: string;
};

type ApiError = {
  code?: string;
  message?: string;
};

export async function askAdaptIQ(
  question: string,
  studentId = process.env.NEXT_PUBLIC_STUDENT_ID ?? "development-student",
): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, student_id: studentId }),
  });

  let payload: ChatResponse | ApiError;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error((payload as ApiError).message ?? "AdaptIQ could not answer right now.");
  }

  return payload as ChatResponse;
}
