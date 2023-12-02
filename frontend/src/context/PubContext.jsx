import PropTypes from 'prop-types';
import { createContext, useContext, useState } from "react";
import {
    getCoursesRequest,
    getTeacherRequest,
} from "../api/type";
import { createPubRequest, getPubRequest, getPubByIDRequest, getComRequest } from '../api/pub'

const PubContext = createContext();

export const usePubs = () => {
    const context = useContext(PubContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
}

export function PubProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [pubs, setPubs] = useState([]);
    const [pub, setPub] = useState([]);
    const [comments, setComments] = useState([]);

    const getPubs = async () => {
        const res = await getPubRequest();
        console.log(res.data)
        setPubs(res.data);
    }

    const getPubByID = async (id) => {
        try {
            const res = await getPubByIDRequest(id);
            // console.log(res.data[0])
            setPub(res.data[0]);
            // console.log(res.data)
        } catch (error) {
            console.log(error)
            setPub(null);
        }
    }

    const getComments = async (id) => {
        const res = await getComRequest(id);
        // console.log(res)
        setComments(res.data);
    }

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
            const res = await createPubRequest(pub);
            getPubs();
            console.log(res);
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
                getTeachers,
                setPubs,
                pubs,
                getPubs,
                getPubByID,
                pub,
                getComments,
                comments
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