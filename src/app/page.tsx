import SuggestionButton from "@/components/SuggestionButton";

export default function Home() {
   return (
      <main className="h-[calc(100dvh-57.0667px)] w-dvw p-4 grid place-items-center">
         <div className="w-full flex flex-col items-center gap-y-4">
            <h1 className="text-3xl font-bold">Forms</h1>
               <div>
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
                  <SuggestionButton />
               </div>
         </div>
      </main>
   );
}
