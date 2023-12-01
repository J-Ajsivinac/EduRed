import axios from "./axios";

export const createPubRequest = async (pub) => axios.post("/pub", pub);
export const getPubRequest = async (pub) => axios.get("/pub", pub);