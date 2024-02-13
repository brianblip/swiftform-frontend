import { useState, useEffect } from "react";
import useAuth from "@/store/useAuth";

export default function useUserId() {
    const [userId, setUserId] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const parsedData = JSON.stringify(user);
            const startIndex = parsedData.indexOf('"id":') + 5;
            const endIndex = parsedData.indexOf(",", startIndex);
            const userIdString = parsedData.substring(startIndex, endIndex);
            const userId = Number(userIdString);
            setUserId(userId);
        }
    }, [user]);

    return userId;
}
