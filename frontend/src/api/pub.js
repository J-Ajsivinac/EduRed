import axios from "./axios";

export const createPubRequest = async (pub) => axios.post("/pub", pub);
export const getPubRequest = async (pub) => axios.get("/pub", pub);
export const getPubByIDRequest = async (id) => axios.get(`/pub/one/${id}`);
export const getComRequest = async (id) => axios.get(`/com/${id}`);
export const createComRequest = async (com) => axios.post("/com", com);
