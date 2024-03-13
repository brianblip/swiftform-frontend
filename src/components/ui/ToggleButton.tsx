//TODO: Toggle button still not working
const ToggleButton = () => {
    return (
        <label htmlFor="toggleButton" className="flex cursor-pointer items-center">
            <div className="relative">
                <input type="checkbox" id="toggleButton" className="sr-only" />
                <div className="block h-6 w-10 rounded-full bg-gray-600"></div>
                <div className="dot absolute left-1 top-1 size-4 rounded-full bg-white transition"></div>
            </div>
        </label>
    )
}
export default ToggleButton;