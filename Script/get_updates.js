// Function to map month numbers to month names
function getMonthName(monthNumber) {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    return months[parseInt(monthNumber, 10) - 1]; // Subtract 1 to match array index
}

// Function to load and display XML content
function loadXMLContent() {
    // Fetch the XML file
    fetch('Content/updates.xml')
        .then(response => response.text()) // Get the response as text
        .then(data => {
            // Parse the XML content
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Get elements from the XML
            const updateEntries = xmlDoc.getElementsByTagName("update_entry");
            const itemList = document.getElementById("itemList");

            // Loop through each item and append it to the list
            for (let i = 0; i < updateEntries.length; i++) {
                const updateEntry = updateEntries[i];

                // Get the date
                const day = updateEntry.getElementsByTagName("day")[0].textContent;
                const month = updateEntry.getElementsByTagName("month")[0].textContent;
                const year = updateEntry.getElementsByTagName("year")[0].textContent;
                // Convert the numeric month to a month name
                const monthName = getMonthName(month);
                // Get all descriptions
                const actions = updateEntry.getElementsByTagName("action");
                let actionList = [];

                // Loop through each <description> and add it to the descriptionList
                for (let j = 0; j < actions.length; j++) {
                    actionList.push(actions[j].textContent);
                }

                // Join all descriptions into a single string, separated by commas
                const actionText = actionList.join(', ');

                // Create a list item with the format "Name: Description(s)"
                const listItem = document.createElement("li");
                listItem.textContent = `${monthName} ${parseInt(day,10)}, ${year}: ${actionText}`;

                // Append the list item to the <ul> element
                itemList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error("Error fetching or parsing XML:", error);
        });
}

// Call the function to load XML when the page loads
window.onload = loadXMLContent;
