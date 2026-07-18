const apiKey = '***REMOVED***'; // Replace with your API key (store securely in a backend)
const orgID = '615304299089514759'; // Replace with your organization ID
const netowrkID = 'L_615304299089539584'; // Replace with your organization ID

const min = 10000;
const max = 15000;

async function fetchNetworkCount() {
    // const tableBody = document.getElementById('loader-background');
    // tableBody.style.visibility = "visible";

    var deviceSerial = 'Q2KY-SV6K-F3SL';

    var urlNetworkDevices = `http://localhost:8080/https://api.meraki.com/api/v1/devices/${deviceSerial}/clients`;
    const url = `http://localhost:8080/https://api.meraki.com/api/v1/organizations/${orgID}/devices/availabilities`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }

        const devices = await response.json();

        devices.forEach(async device => {
            if (device.productType == 'appliance') {
                deviceSerial = device.serial;
                urlNetworkDevices = `http://localhost:8080/https://api.meraki.com/api/v1/devices/${deviceSerial}/clients`;

                const response = await fetch(urlNetworkDevices, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5500',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                        'X-Cisco-Meraki-API-Key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }

                const devicesClients = await response.json();

                displayNetowrkCount(devicesClients, device);
            }
        });

        // displayDeviceClients(devices);
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
}

function displayNetowrkCount(devicesClients, devices) {
    const countLabel = document.getElementById('network-core');
    countLabel.textContent = 'Network Core Clients Count: ' + devicesClients.length;
}


async function fetchClients() {
    const tableBody = document.getElementById('loader-background');
    tableBody.style.visibility = "visible";

    const url = `http://localhost:8080/https://api.meraki.com/api/v1/networks/${netowrkID}/clients`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }

        const devices = await response.json();
        displayClients(devices);
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
    tableBody.style.visibility = "hidden";

}

function displayClients(devices) {
    const tableBody = document.getElementById('clients-table-body');
    tableBody.innerHTML = '';

    devices.forEach(device => {
        const row = `<tr>
            <td>${device.id}</td>
            <td>${device.description}</td>
            <td>${device.ip}</td>
            <td>${device.mac}</td>
            <td>${device.switchport}</td>
            <td>${device.vlan}</td>
            <td>${device.usage.sent}</td>
            <td>${device.usage.recv}</td>
        </tr>`;
        tableBody.innerHTML += row;

    });
    const countLabel = document.getElementById('count');
    countLabel.textContent = 'Network Clients Count: ' + devices.length;


}

async function fetchDeviceClients() {
    // const tableBody = document.getElementById('loader-background-device-clients');
    // console.log("run");

    var loaderBG = document.getElementsByClassName('loader-background-device-clients');
    for (let index = 0; index < loaderBG.length; index++) {
        var element = loaderBG[index];
        element.style.visibility = "visible";
    }

    // tableBody.style.visibility = "visible";

    var deviceSerial = 'Q2KY-SV6K-F3SL';

    var urlNetworkDevices = `http://localhost:8080/https://api.meraki.com/api/v1/devices/${deviceSerial}/clients`;
    const url = `http://localhost:8080/https://api.meraki.com/api/v1/organizations/${orgID}/devices/availabilities`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }

        const devices = await response.json();

        devices.forEach(async device => {
            if (device.productType == 'switch') {
                deviceSerial = device.serial;
                urlNetworkDevices = `http://localhost:8080/https://api.meraki.com/api/v1/devices/${deviceSerial}/clients`;

                const response = await fetch(urlNetworkDevices, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5500',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                        'X-Cisco-Meraki-API-Key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }

                const devicesClients = await response.json();

                displayDeviceClients(devicesClients, device);
            }
            else if (device.productType == 'wireless') {
                deviceSerial = device.serial;
                urlNetworkDevices = `http://localhost:8080/https://api.meraki.com/api/v1/devices/${deviceSerial}/clients`;

                const response = await fetch(urlNetworkDevices, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:5500',
                        'Access-Control-Allow-Credentials': 'true',
                        'Content-Type': 'application/json',
                        'X-Cisco-Meraki-API-Key': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }

                const devicesClients = await response.json();

                displayDeviceClients(devicesClients, device);

            }
        });


        // displayDeviceClients(devices);
    } catch (error) {
        console.error('Error fetching clients:', error);
    }

    for (let index = 0; index < loaderBG.length; index++) {
        var element = loaderBG[index];
        element.style.visibility = "hidden";
    }

    // tableBody.style.visibility = "hidden";

}

function displayDeviceClients(devicesClients, devices) {
    var element = document.getElementById(devices.name + " " + "device-clients-count");
    // console.log(element);
    if (element != null) {


        // const contentBody = document.getElementById('device-clients-container');

        var tbody = document.getElementById(devices.name + " " + "device-clients-table-body");
        tbody.innerHTML = '';

        devicesClients.forEach(device => {
            const row = `<tr>
                <td>${device.id}</td>
                <td>${device.description}</td>
                <td>${device.ip}</td>
                <td>${device.mac}</td>
                <td>${device.switchport}</td>
                <td>${device.vlan}</td>
                <td>${device.usage.recv}</td>
                <td>${device.usage.sent}</td>
            </tr>`;
            tbody.innerHTML += row;

        });

        element.textContent = devices.name + ' ' + '[' + devices.productType + ']' + ' ' + 'Device Clients Count:' + ' ' + devicesClients.length;
        if (devicesClients.length > 14) {
            tbody.style.height = '300px';
        }
    }
    else {
        const contentBody = document.getElementById('device-clients-container');
        // contentBody.innerHTML = '';
        // Create the device clients count paragraph
        const deviceClientsCount = document.createElement("p");
        deviceClientsCount.id = devices.name + " " + "device-clients-count";
        deviceClientsCount.className = "device-clients-count";
        deviceClientsCount.textContent = "Device Clients Count: 0";

        // Create the content wrapper
        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        // Create the loader background
        const loaderBackground = document.createElement("div");
        loaderBackground.className = "loader-background-device-clients";

        const loader = document.createElement("div");
        loader.className = "loader";
        loaderBackground.appendChild(loader);

        // Create the table container
        const tableContainer = document.createElement("div");
        tableContainer.className = "device-clients-table";

        // Create the table
        const table = document.createElement("table");

        // Create table head
        const thead = document.createElement("thead");
        thead.className = "sticky-head";
        const headerRow = document.createElement("tr");
        const headers = [
            "ID", "Description", "IP", "MAC Address", "Switch Port", "VLAN", "KILOBIT Sent", "KILOBIT Received"
        ];

        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);

        // Create table body
        const tbody = document.createElement("tbody");
        tbody.id = devices.name + " " + "device-clients-table-body";
        tbody.className = "scroll-table device-clients-table-body";

        // Append elements to build the structure
        table.appendChild(thead);
        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // contentDiv.appendChild(loaderBackground);
        contentDiv.appendChild(loaderBackground);
        contentDiv.appendChild(tableContainer);

        // Append everything to the body (or another container)
        contentBody.appendChild(deviceClientsCount);
        contentBody.appendChild(contentDiv);

        devicesClients.forEach(device => {
            const row = `<tr>
                <td>${device.id}</td>
                <td>${device.description}</td>
                <td>${device.ip}</td>
                <td>${device.mac}</td>
                <td>${device.switchport}</td>
                <td>${device.vlan}</td>
                <td>${device.usage.sent}</td>
                <td>${device.usage.recv}</td>
            </tr>`;
            tbody.innerHTML += row;

        });

        deviceClientsCount.textContent = devices.name + ' ' + '[' + devices.productType + ']' + ' ' + 'Device Clients Count:' + ' ' + devicesClients.length;

        if (devicesClients.length > 14) {
            tableContainer.style.height = '300px';
        }
    }
}




async function fetchDevices() {
    const tableBody = document.getElementById('loader-background-devices');
    tableBody.style.visibility = "visible";

    const url = `http://localhost:8080/https://api.meraki.com/api/v1/organizations/${orgID}/devices/availabilities`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }

        const devices = await response.json();
        displayDevices(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
    tableBody.style.visibility = "hidden";

}

function displayDevices(devices) {
    const tableBody = document.getElementById('devices-table-body');
    tableBody.innerHTML = '';

    devices.forEach(device => {
        const row = `<tr>
            <td>${device.mac}</td>
            <td>${device.name}</td>
            <td>${device.network.id}</td>
            <td>${device.productType}</td>
            <td>${device.serial}</td>
            <td>${device.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    var table = document.getElementById("devices-table-body");
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop
            if (col.innerHTML === 'switch') {
                var img = document.createElement('img');
                img.src = "./img/switch.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'camera') {
                var img = document.createElement('img');
                img.src = "./img/camera.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'wireless') {
                var img = document.createElement('img');
                img.src = "./img/wireless.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'appliance') {
                var img = document.createElement('img');
                img.src = "./img/appliance.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
        }
    }

    const countLabel = document.getElementById('count-devices');
    countLabel.textContent = 'Devices Count: ' + devices.length;
}


async function fetchTopClients() {
    const tableBody = document.getElementById('loader-background-top-clients');
    tableBody.style.visibility = "visible";

    const url = `http://localhost:8080/https://api.meraki.com/api/v1//organizations/${orgID}/summary/top/clients/byUsage`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }

        const devices = await response.json();
        displayTopClients(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
    tableBody.style.visibility = "hidden";

}

function displayTopClients(devices) {
    const tableBody = document.getElementById('top-clients-table-body');
    tableBody.innerHTML = '';

    devices.forEach(device => {
        const row = `<tr>
            <td>${device.id}</td>
            <td>${device.name}</td>
            <td>${device.mac}</td>
            <td>${device.usage.upstream}</td>
            <td>${device.usage.downstream}</td>
            <td>${device.usage.percentage}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    const countLabel = document.getElementById('count-top-clients');
    countLabel.textContent = 'Top Clients By Usage: ' + devices.length;
}


async function fetchTopApplications() {
    const tableBody = document.getElementById('loader-background-top-applications');
    tableBody.style.visibility = "visible";

    const url = `http://localhost:8080/https://api.meraki.com/api/v1//organizations/${orgID}/summary/top/applications/byUsage`;
    // https://api.meraki.com/api/v1/organizations/615304299089514759/devices/availabilities

    try {
        var response = await fetch(url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5500',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }

        var devices = await response.json();
        displayTopApplications(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
    tableBody.style.visibility = "hidden";

}

function displayTopApplications(devices) {
    const tableBody = document.getElementById('top-applications-table-body');
    tableBody.innerHTML = '';

    devices.forEach(device => {
        const row = `<tr>
            <td>${device.application}</td>
            <td>${device.total}</td>
            <td>${device.upstream}</td>
            <td>${device.downstream}</td>
            <td>${device.percentage}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    const countLabel = document.getElementById('count-top-applications');
    countLabel.textContent = 'Top Applications Count: ' + devices.length;
}



document.addEventListener('DOMContentLoaded', () => {
    fetchNetworkCount();
    fetchClients();
    fetchDeviceClients();
    fetchDevices();
    fetchTopClients();
    fetchTopApplications();
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setInterval(fetchNetworkCount, getRandomArbitrary(min, max));
setInterval(fetchClients, getRandomArbitrary(min, max));
setInterval(fetchDeviceClients, getRandomArbitrary(min, max));
setInterval(fetchDevices, getRandomArbitrary(min, max));
setInterval(fetchTopClients, getRandomArbitrary(min, max));
setInterval(fetchTopApplications, getRandomArbitrary(min, max));