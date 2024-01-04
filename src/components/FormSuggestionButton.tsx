type text = string

export default function FormSuggestionButton({ t, s }: {
   t: text,
   s: text
}) {
   return (
      <button className="p-3 text-left border border-solid border-white rounded-lg">
         <b>{t}</b>
         <p>{s}</p>
      </button>
   )
}