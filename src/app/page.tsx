import FormSuggestionButton from "@/components/FormSuggestionButton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <section className="mt-14 px-14 flex flex-col gap-y-7">
      <h1 className="text-4xl font-bold">Forms</h1>
      <div className="flex flex-col items-center">
        <div className="w-2/3 flex flex-col gap-y-5">
          <div className="relative flex items-center">
            <textarea name="" id="" placeholder="type something" className="w-full p-3 pl-6 pr-14 border border-solid border-white rounded-lg resize-none bg-transparent"></textarea>
            <button className="absolute right-0 z-10 mr-6">
              <FontAwesomeIcon className="h-1em" icon={faPaperPlane} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormSuggestionButton t="Title 1" s="subtitle 1" />
            <FormSuggestionButton t="Title 2" s="subtitle 2" />
            <FormSuggestionButton t="Title 3" s="subtitle 3" />
            <FormSuggestionButton t="Title 4" s="subtitle 4" />
          </div>
          <button className="mt-6 p-5 bg-white rounded-xl text-black">Or create a new form</button>
        </div>
      </div>
    </section>
  )
}
