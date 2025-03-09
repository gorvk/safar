import { debounceTimeInMS, pageSize } from "./constants";

export const getDate = (timeStamp: string) => {
    const date = new Date(timeStamp);
    const day = getZeroedNumber(date.getDate()); 
    const year = getZeroedNumber(date.getFullYear()); 
    const month = getZeroedNumber(date.getMonth() + 1); 
    return year + "-" + month + "-" + day
}

export const getZeroedNumber = (num: number): string => num < 10 ? "0" + num : num.toString(); 

// timeStamp -> toISOString()
// from userInput: new Date('2024-09-10, 13:01').toISOString()
// from DBInput: '2024-09-10T06:31:00.000Z'
export const getTime = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
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