import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
export default function LoadingPage() {
    return (
        <section className="grid place-items-center gap-2">
            <HourglassEmptyRoundedIcon className="animate-loading" />
            <p>Loading...</p>
        </section>
    );
}
