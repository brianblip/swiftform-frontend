import { useState, useEffect } from "react";
import useAuth from "@/store/useAuth";

export default function useUserValues() {
    const [userValues, setUserValues] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const parsedData = JSON.stringify(user);
            const userData = JSON.parse(parsedData).data;
            const valuesArray = Object.values(userData);
            setUserValues(valuesArray);
        }
    }, [user]);

    return userValues;
}
