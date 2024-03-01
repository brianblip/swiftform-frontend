export default function Input() {
    return (
        <div className="grid gap-1">
            <label
                className={`text-sm font-semibold`}
                htmlFor="Form Name"
            >
                Form Name
            </label>
            <input
                id="Form Name"
                type="text"
                className={`w-full rounded border-2 px-3 py-2 text-primary-black focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            />
        </div>
    );
}
