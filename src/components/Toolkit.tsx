import { faBell, faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Toolkit() {
   return (
      <nav className="flex p-2 px-8 h-16 text-l items-center justify-end gap-x-2 border border-solid border-white rounded-md">
         <div className="flex items-center justify-center gap-x-3">
            <FontAwesomeIcon className="h-1em" icon={faBell} />
            <FontAwesomeIcon className="h-1em" icon={faUser} />
            <p>User Name</p>
            <FontAwesomeIcon className="h-1em" icon={faCaretDown} />
         </div>
      </nav>
   )
}