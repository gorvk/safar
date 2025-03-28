export const pageSize = 10;
export const debounceTimeInMS = 1000;
export const appName = "Toorist";
export const hours: string[] = Array.from(Array(12).keys()).map(k => (k + 1).toString().padStart(2, "0"));
export const minutes: string[] = Array.from(Array(60).keys()).map(k => k.toString().padStart(2, "0"));