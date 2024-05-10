import { fetch } from "../utils/fetch";

const createWindowData = async (payload) => {
    try {
        const resData = await fetch.post(`/window`, payload);
        return resData
    } catch (err) {
        return err.response
    }
}

const updateWindowData = async (payload) => {
    try {
        const resData = await fetch.put(`/window`, payload);
        return resData
    } catch (err) {
        return err.response
    }
}

const getWindowData = async () => {
    let endpoint = `/window`;
    try {
        const resData = await fetch.get(endpoint);
        return resData
    } catch (err) {
        return err.response
    }
}




export default { createWindowData, updateWindowData, getWindowData }