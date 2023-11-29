import PropTypes from 'prop-types';
import { createContext, useContext, useState } from "react";
import {
    getCoursesRequest,
    getTeacherRequest
} from "../api/type";
// import {
//     createPubRequest
// } from "../api/pub";

const PubContext = createContext();

export const usePubs = () => {
    const context = useContext(PubContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
}

export function PubProvider({ children }) {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const res = await getCoursesRequest();
            setCourses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getTeachers = async () => {
        try {
            const res = await getTeacherRequest();
            setCourses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createPub = async (pub) => {
        try {
            // const res = await createPubRequest(task);
            console.log(pub)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PubContext.Provider
            value={{
                courses,
                getCourses,
                createPub,
                getTeachers
            }}
        >
            {children}
        </PubContext.Provider>
    );
}

PubProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PubContext;