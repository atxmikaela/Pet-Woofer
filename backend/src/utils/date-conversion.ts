

export function dateConverter(date: Date): string {
    let currDate = new Date(date);

    let dateStr = `${currDate.getMonth()} ${currDate.getDate()}, ${currDate.getFullYear()}`;
    return dateStr;

}
