import { atom } from "recoil";

export const courseState = atom({
    key: 'courseSate',
    default: {
        isLoading: true,
        course: null
    }
})