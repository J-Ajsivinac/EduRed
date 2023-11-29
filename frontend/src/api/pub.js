import axios from "./axios";

export const createPubRequest = async (pub) => axios.post("/pub", pub);