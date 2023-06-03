

export function processDate(inputDate){
    const date = new Date(inputDate); 

    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours %12 || 12
    const time = `${hours}:${minutes} ${ampm}`

    const formattedDate = `${weekday}, ${month} ${day}, ${year}, ${time}`;

    return(formattedDate);
}
