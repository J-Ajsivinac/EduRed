import axios from "./axios";

export const getCoursesRequest = async (id) => axios.get(`/users/course/${id}`);
export const addCoursesRequest = async (course) => axios.post(`/users/course/`,course);

