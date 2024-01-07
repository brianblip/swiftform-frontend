import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Aside() {
  return (
    <aside className="min-h-dvh rounded-md border border-solid border-white p-2">
      <div className="flex h-16 items-center justify-center gap-x-2 rounded-md border border-solid border-white text-2xl">
        <FontAwesomeIcon className="h-1em" icon={faStrikethrough} />
        <p>Logo</p>
      </div>
    </aside>
  );
}
