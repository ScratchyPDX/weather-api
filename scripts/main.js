
// set footer dates
// document.getElementById("today-date").textContent = `${weekday[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
date = new Date().getFullYear();
document.getElementById("year").innerHTML = date;
document.getElementById("last_modified").innerHTML = document.lastModified;