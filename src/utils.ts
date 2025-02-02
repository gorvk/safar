
export const getDate = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
}

// timeStamp -> toISOString()
// from userInput: new Date('2024-09-10, 13:01').toISOString()
// from DBInput: '2024-09-10T06:31:00.000Z'
export const getTime = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}