import SuggestionButton from "@/components/SuggestionButton";

export default function Home() {
   return (
      <main className="h-[calc(100dvh-57.0667px)] w-dvw p-4 grid place-items-center sm:p-8 md:h-dvh">
         <div className="w-full flex flex-col items-center gap-y-4 md:gap-y-6">
            <h1 className="text-3xl font-bold md:text-4xl">Forms</h1>
            <div className="w-full flex flex-col items-center gap-y-6 md:gap-y-9 lg:w-[720px] xl:w-[820px]">
               <div className="w-11/12 grid grid-cols-2 gap-x-2 gap-y-4">
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
               </div>
               <button className="w-full bg-primary-white text-primary-black px-2 py-3">Create new form</button>
            </div>
         </div>
      </main>
   );
}
