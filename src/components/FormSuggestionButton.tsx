type text = string;

export default function FormSuggestionButton({ t, s }: { t: text; s: text }) {
  return (
    <button className="rounded-lg border border-solid border-white p-3 text-left transition-all hover:bg-neutral-500">
      <b>{t}</b>
      <p>{s}</p>
    </button>
  );
}
