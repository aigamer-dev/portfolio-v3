export function calculateYearsSince(monthYearString) {
    // 1. Create a Date object for the input month-year
    // Assuming monthYearString is in "MM-YYYY" format
    const [month, year] = monthYearString.split('-').map(Number);
    const inputDate = new Date(year, month - 1, 1); // Month is 0-indexed in Date constructor

    // 2. Get the current date
    const now = new Date();

    // 3. Calculate the difference in years
    let years = now.getFullYear() - inputDate.getFullYear();

    // Adjust if the current month/day is before the input month/day
    if (now.getMonth() < inputDate.getMonth() ||
        (now.getMonth() === inputDate.getMonth() && now.getDate() < inputDate.getDate())) {
        years--;
    }

    return years;
}

export function humanReadableDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}