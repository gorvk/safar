import { debounceTimeInMS, pageSize } from "./constants";
import { TTimepickerState } from "./types";

export const getDate = (timeStamp: string) => {
    const date = new Date(timeStamp);
    const day = getZeroedNumber(date.getDate()); 
    const year = getZeroedNumber(date.getFullYear()); 
    const month = getZeroedNumber(date.getMonth() + 1); 
    return year + "-" + month + "-" + day
}

export const getZeroedNumber = (num: number): string => num < 10 ? "0" + num : num.toString(); 

export const getTime = (data: TTimepickerState): string => {
    return `${data.hour}:${data.minute} ${data.meridiem}`;
}

export const debounce = <T>(
    cb: (event: T) => void
) => {
    let ref: NodeJS.Timeout;
    return (event: T) => {
        clearTimeout(ref);
        ref = setTimeout(() => cb(event), debounceTimeInMS);
    };
};

export const getPaginatationIndex = (pageNumber?: number) => {
    const page = pageNumber || 0;
    const start = page * pageSize;
    const end = start + pageSize;
    return { start, end }
}