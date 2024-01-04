import { faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Aside() {
   return (
      <aside className="h-dvh p-2 rounded-md border border-solid border-white">
         <div className="flex h-16 text-2xl items-center justify-center gap-x-2 border border-solid border-white rounded-md">
            <FontAwesomeIcon className="h-1em" icon={faStrikethrough} />
            <p>Logo</p>
         </div>
      </aside>
   );
}
