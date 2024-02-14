import ErrorIcon from "@mui/icons-material/Error";

export default function Error() {
    return (
        <section className="grid place-items-center gap-2 text-center">
            <ErrorIcon className="text-4xl" />
            <p>Oops! Something went wrong. Refresh to try again</p>
        </section>
    );
}
