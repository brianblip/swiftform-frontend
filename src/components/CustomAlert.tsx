import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CustomAlert() {
    return (
            <section>
                <button>
                    <CloseIcon />
                </button>
                    <CheckCircleIcon />
                    <CancelIcon />
                <div>
                    <h1>
                        Custom Alert
                    </h1>
                </div>
            </section>
    );
}
