import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FormsList from "../FormsList";

const MobileMenu = () => {
    const pathname = usePathname();
    // Extract form ID from the pathname
    const currentFormId = Number(pathname.split("/Form/")[1]);

    return (
        <div>
            <button
                className={`p-4 hover:bg-primary-secondary`}
            >
                <MenuIcon />
            </button>
            <div
                className={`absolute top-0 flex h-screen w-3/4 flex-col justify-end bg-primary-black p-2`}
            >
                <button
                    className="absolute right-full top-0 m-2 p-2 hover:bg-primary-secondary"
                >
                    <CloseIcon />
                </button>
                <div className="flex size-full flex-col justify-between gap-2">
                    <FormsList formId={currentFormId} />
                    <div className="flex flex-col gap-2">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
