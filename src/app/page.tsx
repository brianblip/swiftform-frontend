import FormSuggestionButton from "@/components/FormSuggestionButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <section className="mt-14 flex flex-col gap-y-7 px-14">
      <h1 className="text-4xl font-bold">Forms</h1>
      <div className="flex flex-col items-center">
        <div className="flex w-2/3 flex-col gap-y-5">
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
          <div className="grid grid-cols-2 gap-2">
            <FormSuggestionButton t="Title 1" s="subtitle 1" />
            <FormSuggestionButton t="Title 2" s="subtitle 2" />
            <FormSuggestionButton t="Title 3" s="subtitle 3" />
            <FormSuggestionButton t="Title 4" s="subtitle 4" />
          </div>
          <button className="mt-6 rounded-xl bg-white p-5 text-black transition-all hover:bg-neutral-200">
            Or create a new form
          </button>
        </div>
      </div>
    </section>
  );
}
