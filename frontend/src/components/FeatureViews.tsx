"use client";

import { ChangeEvent, useRef, useState } from "react";
import { ArrowRight, AudioLines, Check, FileText, Headphones, Mic2, Sparkles, Target, UploadCloud, WandSparkles } from "lucide-react";
import { Badge, ProgressBar } from "./ui";

type UploadedDocument = {
  name: string;
  uploadedAt: string;
};

export function LearningTwinView() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageIntro eyebrow="Your adaptive profile" title="Your Learning Twin" description="An evolving profile of how you learn." />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl bg-ink p-6 text-white shadow-soft sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                <Sparkles size={14} /> Personal insight
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold">You learn through momentum.</h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">
                Your recent work shows that visual examples and guided steps help you turn uncertainty into confidence.
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-indigo-200">
              <WandSparkles size={23} />
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-center">
            <div className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full bg-[conic-gradient(#818cf8_0_74%,#263248_74%_100%)]">
              <div className="grid h-32 w-32 place-items-center rounded-full bg-ink">
                <strong className="font-display text-5xl">
                  74
                  <small className="block text-center font-sans text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    confidence
                  </small>
                </strong>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-slate-400">Confidence trajectory</span>
                <span className="font-bold text-indigo-300">+8% this month</span>
              </div>
              <ProgressBar value={74} color="bg-indigo-400" />
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-slate-400">Learning style</span>
                  <strong className="mt-1 block text-white">Visual</strong>
                </div>
                <div>
                  <span className="block text-slate-400">Best explanation</span>
                  <strong className="mt-1 block text-white">Step-by-step</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Current strengths</h2>
            <Sparkles size={18} className="text-slate-300" />
          </div>
          <div className="space-y-4">
            <Performance label="Concept retention" value="81%" progress={81} />
            <Performance label="Practice streak" value="7 days" progress={70} color="bg-emerald-500" />
            <Performance label="Confidence growth" value="+8%" progress={75} color="bg-violet-500" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <TopicCard title="Strong topics" topics={["Kinematics", "Algebra", "Visual diagrams"]} tone="emerald" />
            <TopicCard title="Focus next" topics={["Energy", "Proofs", "Mistake review"]} tone="amber" />
          </div>
        </section>
      </div>
    </div>
  );
}

export function QuizView() {
  const questions = [
    {
      topic: "Newton's Laws",
      difficulty: "Medium",
      prompt: "What happens when a net force acts on an object?",
      options: [
        "The object always stops moving",
        "The object accelerates in the direction of the net force",
        "The object loses its mass",
        "The object moves at a constant speed",
      ],
      correctIndex: 1,
    },
    {
      topic: "Photosynthesis",
      difficulty: "Easy",
      prompt: "Which part of the plant mainly absorbs sunlight for photosynthesis?",
      options: ["Roots", "Stem", "Leaves", "Flowers"],
      correctIndex: 2,
    },
    {
      topic: "Algebra",
      difficulty: "Medium",
      prompt: "Solve for x: 2x + 5 = 17.",
      options: ["x = 4", "x = 5", "x = 6", "x = 7"],
      correctIndex: 2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = selectedIndex !== null ? currentIndex + 1 : currentIndex;
  const progress = (answeredCount / questions.length) * 100;
  const isCorrect = selectedIndex === question.correctIndex;

  const handleAnswerSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    if (index === question.correctIndex) setScore((value) => value + 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;

    if (isLast) {
      setCurrentIndex(0);
      setSelectedIndex(null);
      setScore(0);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedIndex(null);
  };

  return (
    <div className="mx-auto max-w-[900px]">
      <PageIntro eyebrow="Practice with purpose" title="Take a quiz" description="Questions shaped by your progress and your goals." />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-9">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div>
            <Badge tone="violet">
              {question.topic} · {question.difficulty}
            </Badge>
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Question <span className="text-ink">{currentIndex + 1}</span> of {questions.length}
            </p>
          </div>
          <div className="w-full sm:w-44">
            <div className="mb-2 flex justify-between text-[10px] font-bold text-slate-400">
              <span>Progress</span>
              <span>{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <ProgressBar value={Math.min(Math.round(progress), 100)} />
          </div>
        </div>

        <div className="py-10">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
            <Target size={22} />
          </div>
          <h2 className="max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {question.prompt}
          </h2>
          <p className="mt-3 text-sm text-slate-500">Choose the best answer.</p>

          <div className="mt-8 grid gap-3">
            {question.options.map((option, index) => {
              const isChosen = selectedIndex === index;
              const showCorrect = selectedIndex !== null && index === question.correctIndex;
              const showWrong = selectedIndex !== null && isChosen && index !== question.correctIndex;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedIndex !== null}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left text-sm font-medium transition ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                      : showWrong
                        ? "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100"
                        : isChosen
                          ? "border-primary bg-indigo-50 text-primary ring-2 ring-indigo-100"
                          : "border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50"
                  } ${selectedIndex !== null ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${
                      showCorrect
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : showWrong
                          ? "border-red-600 bg-red-600 text-white"
                          : isChosen
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 text-slate-400"
                    }`}
                  >
                    {showCorrect ? <Check size={14} /> : String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {selectedIndex !== null && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-ink">{isCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-1">
                {isCorrect
                  ? "Nice job — that answer matches the best explanation."
                  : `The correct answer is: ${question.options[question.correctIndex]}.`}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="text-xs font-semibold text-slate-500">Score: {score}/{questions.length}</div>
          <button
            type="button"
            onClick={handleNext}
            disabled={selectedIndex === null}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-glow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLast ? "Restart" : "Next"}
            {!isLast && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function UploadView() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ tone: "info" | "success" | "error"; message: string } | null>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setStatus({ tone: "info", message: "Uploading document..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => null);
      const message = payload?.message ?? "The server returned an invalid response.";

      if (!response.ok) {
        throw new Error(message);
      }

      const uploadedName = payload?.filename ?? file.name;
      const uploadedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setSelectedFile(file);
      setUploadedDocuments((current) => [{ name: uploadedName, uploadedAt }, ...current]);
      setStatus({ tone: "success", message: `${uploadedName} uploaded successfully.` });
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "Upload failed. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    await uploadFile(file);
  };

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageIntro eyebrow="Bring your material" title="Upload notes" description="Turn your course PDFs into a learning space built around you." />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-8 text-center shadow-sm sm:p-14">
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-primary shadow-sm">
            <UploadCloud size={28} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink">Drop your PDF here</h2>
          <p className="mt-2 text-sm text-slate-500">or click to browse from your device</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="mt-7 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white shadow-glow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? "Uploading..." : "Choose a file"}
          </button>
          {selectedFile && <p className="mt-5 text-sm text-slate-600">Selected: {selectedFile.name}</p>}
          {status && (
            <p className={`mt-5 text-sm ${status.tone === "success" ? "text-emerald-600" : status.tone === "error" ? "text-red-600" : "text-slate-600"}`}>
              {status.message}
            </p>
          )}
          <p className="mt-5 text-[11px] text-slate-400">PDF files up to 20 MB</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Your documents</h2>
            <FileText size={18} className="text-slate-300" />
          </div>
          <div className="space-y-3">
            {uploadedDocuments.length > 0 ? (
              uploadedDocuments.map((doc) => (
                <div key={`${doc.name}-${doc.uploadedAt}`} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-left">
                  <p className="text-sm font-semibold text-emerald-700">{doc.name}</p>
                  <p className="mt-1 text-[11px] text-emerald-600">Uploaded at {doc.uploadedAt}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                <p className="text-sm font-semibold text-slate-500">No documents yet</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Upload a PDF to start asking questions about your material.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export function LectureView() {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<{ tone: "info" | "success" | "error"; message: string } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadAudio = async (file: File) => {
    setIsUploading(true);
    setStatus({ tone: "info", message: "Uploading lecture recording..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/lecture/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json().catch(() => null);
      const message = payload?.message ?? "The server returned an invalid response.";

      if (!response.ok) {
        throw new Error(message);
      }

      setStatus({ tone: "success", message: `Lecture uploaded: ${payload.filename}` });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "Lecture upload failed.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.stop();
    setIsRecording(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus({ tone: "error", message: "This browser does not support microphone recording." });
      return;
    }

    try {
      setStatus({ tone: "info", message: "Microphone access granted. Recording audio..." });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const file = new File([blob], "lecture-recording.webm", { type: blob.type || "audio/webm" });
        await uploadAudio(file);
      };

      recorder.start();
      setIsRecording(true);
    } catch {
      setStatus({ tone: "error", message: "Microphone permission was denied. Please allow access and try again." });
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadAudio(file);
  };

  return (
    <div className="mx-auto max-w-[1000px]">
      <PageIntro eyebrow="Capture the classroom" title="Lecture mode" description="Turn a recording into clear, personalized study material." />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl bg-ink p-7 text-white shadow-soft sm:p-9">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
            <AudioLines size={15} /> Lecture studio
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold">Make your next lecture count.</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Record live or upload audio. AdaptIQ will organize the important concepts around how you learn.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isUploading}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-glow hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Mic2 size={16} /> {isRecording ? "Stop recording" : "Record lecture"}
            </button>
            <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Headphones size={16} /> Upload recording
            </button>
          </div>
          {status && (
            <p className={`mt-6 text-sm ${status.tone === "success" ? "text-emerald-300" : status.tone === "error" ? "text-red-300" : "text-slate-300"}`}>
              {status.message}
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">Processing flow</h2>
          <div className="mt-7 space-y-5">
            {[
              "Uploading",
              "Transcribing",
              "Analyzing",
              "Creating personalized notes",
            ].map((step, index) => (
              <div className="flex items-center gap-3" key={step}>
                <div className={`grid h-9 w-9 place-items-center rounded-xl ${index === 0 ? "bg-indigo-50 text-primary" : "bg-slate-100 text-slate-400"}`}>
                  {index + 1}
                </div>
                <div>
                  <strong className="block text-sm text-ink">{step}</strong>
                  <span className="text-[11px] text-slate-400">
                    {index === 0 ? "Ready when you are" : "Waiting for recording"}
                  </span>
                </div>
                {index < 3 && <div className="ml-auto h-5 w-px bg-slate-200" />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {eyebrow}
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </section>
  );
}

function Performance({ label, value, progress, color = "bg-primary" }: { label: string; value: string; progress: number; color?: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className="text-ink">{value}</span>
      </div>
      <ProgressBar value={progress} color={color} />
    </div>
  );
}

function TopicCard({ title, topics, tone }: { title: string; topics: string[]; tone: "emerald" | "amber" | "violet" }) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${styles[tone]}`} key={topic}>
            {topic}
          </span>
        ))}
      </div>
    </section>
  );
}
