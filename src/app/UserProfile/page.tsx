import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile() {
  return (
    <section className="my-14 flex flex-col gap-y-7 px-14">
      <h1 className="text-4xl font-bold">My Account</h1>
      <div className="flex flex-col items-center gap-y-12">
        <div className="flex w-2/3 flex-col gap-y-5">
          <h2 className="text-2xl font-medium">Profile Information</h2>
          <div className="flex items-center gap-x-4">
            <div className="aspect-square h-20 rounded-full bg-white"></div>
            <button className="rounded-lg border border-solid border-white p-3 transition-all duration-300 ease-in-out hover:rounded-lg hover:bg-white hover:text-black">
              Change avatar
            </button>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-3">
              <label className="flex flex-col gap-y-1">
                Name
                <input type="text" className="p-2 text-black" />
              </label>
              <label className="flex flex-col gap-y-1">
                Email
                <input type="text" className="p-2 text-black" />
              </label>
            </div>
            <button className="w-fit rounded-xl bg-white px-5 py-3 text-black transition-all hover:bg-neutral-200">
              Save changes
            </button>
          </div>
        </div>
        <div className="flex w-2/3 flex-col gap-y-5">
          <h2 className="text-2xl font-medium">Account Settings</h2>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-3">
              <label className="flex flex-col gap-y-1">
                New password
                <input type="password" className="p-2 text-black" />
              </label>
              <label className="flex flex-col gap-y-1">
                Confirm password
                <input type="password" className="p-2 text-black" />
              </label>
            </div>
            <button className="w-fit rounded-xl bg-white px-5 py-3 text-black transition-all hover:bg-neutral-200">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
