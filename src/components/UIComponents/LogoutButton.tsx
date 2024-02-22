import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const LogoutButton = () => {
    return (
        <button
            className={`flex w-full gap-2 p-2 hover:bg-primary-secondary`}
        >
            <LogoutOutlinedIcon />
            <p>Log out</p>
        </button>
    );
};

export default LogoutButton;
