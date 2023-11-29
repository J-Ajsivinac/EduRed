import axios from "./axios";

export const getCoursesRequest = async () => axios.get("/course");
export const getTeacherRequest = async () => axios.get("/teacher");
