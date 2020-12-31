import { messageActionTypes } from "../../config";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case messageActionTypes.SET_MESSAGE:
            return { message: payload.message, success: payload.success, info: payload.info };

        case messageActionTypes.CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}