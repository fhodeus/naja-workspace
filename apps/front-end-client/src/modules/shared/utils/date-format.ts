export function formatDate(date: Date, format: string) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return `${year}${format}${month}${format}${day}`;
}

export function formatFromDateToTimestampEpoc(datestring: string) {
    return new Date(datestring).getTime();
}
