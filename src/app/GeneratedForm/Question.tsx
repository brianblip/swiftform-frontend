import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Question() {
  return (
    <section className="flex w-2/3 flex-col gap-y-5">
      <div className="relative flex items-center">
        <textarea
          name=""
          id=""
          placeholder="type something"
          className="w-full resize-none rounded-lg border border-solid border-white bg-transparent p-3 pl-6 pr-14"
        ></textarea>
        <button className="absolute right-0 z-10 mr-6 rounded-lg border border-transparent p-2 transition-all hover:rounded-lg hover:border hover:border-solid hover:border-white">
          <FontAwesomeIcon className="h-1em" icon={faPaperPlane} />
        </button>
      </div>
      <button className="mt-6 rounded-xl bg-white p-5 text-center text-black transition-all hover:bg-neutral-200">
        Add a section
      </button>
    </section>
  );
}
