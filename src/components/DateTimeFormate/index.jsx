export const ConvertTo24Hour = (time12Hour) => {
    // console.log("time12Hour",time12Hour)
    if (time12Hour !== undefined) {
        const [time, period] = time12Hour && time12Hour.split(" ");
        let [hours, minutes] = time && time.split(":");
        // Convert hours to 24-hour format
        if (period === "pm" && hours !== "12") {
            hours = parseInt(hours, 10) + 12;
        } else if (period === "am" && hours === "12") {
            hours = "00";
        }
        return `${hours}:${minutes}`;
    }
};


export const TimeIn12HourFormat = ({ dateTimeString }) => {
    if (dateTimeString !== undefined) {
        const date = new Date(dateTimeString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert midnight (0) to 12
        minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes less than 10
        return `${hours}:${minutes} ${ampm}`;
    }
};


export const FormatDateTime = ({text, isTime}) => {
    // console.log("isTime",isTime)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(text);

    // Extract date components
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear() % 100; // Get the last two digits of the year

    // Format hours and minutes in 12-hour format
    let hours = date.getHours() % 12;
    hours = hours === 0 ? 12 : hours; // Convert midnight (0) to 12
    const minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero if minutes < 10

    // Determine AM or PM
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    // Construct the formatted date and time string
    // const formattedDateTime = `${day}-${months[monthIndex]}-${year} ${hours}:${minutes}${ampm}`;
    const formattedDateTime = `${day}-${months[monthIndex]}-${year} ${isTime !== undefined && isTime == false ? "" : hours+':'+minutes+ampm} `;

    return formattedDateTime;
};



// const dateTime = '2024-01-08 23:57:26';
// const formattedDateTime = formatDateTime(dateTime);
// console.log(formattedDateTime); // Output: "08-Jan-24 12:00 AM"
