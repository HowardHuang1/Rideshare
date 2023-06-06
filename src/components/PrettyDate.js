

export function processDate(inputDate){
    const date = new Date(inputDate); 
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes == "0") minutes = "00"
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours %12 || 12
    let time = `${hours}:${minutes} ${ampm}`

    const formattedDate = `${month} ${day}, ${year}, ${time}`;

    return(formattedDate);
}
