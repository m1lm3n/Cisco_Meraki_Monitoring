const apiKey = '***REMOVED***'; // Replace with your API key (store securely in a backend)
const orgID = '615304299089514759'; // Replace with your organization ID
const netowrkID = 'L_615304299089539584'; // Replace with your organization ID

const min = 3500;
const max = 5000;


async function fetchClients() {
    const tableBody = document.getElementById('loader-background');
    tableBody.style.visibility = "visible";

    const url = `https://fast-thicket-18722-58f838c326e4.herokuapp.com/https://api.meraki.com/api/v1/networks/${netowrkID}/clients`;
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
    countLabel.textContent = 'Clients Count: ' + devices.length;


}





async function fetchDevices() {
    const tableBody = document.getElementById('loader-background-devices');
    tableBody.style.visibility = "visible";

    const url = `https://fast-thicket-18722-58f838c326e4.herokuapp.com/https://api.meraki.com/api/v1/organizations/${orgID}/devices/availabilities`;
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
                img.src = "/img/switch.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'camera') {
                var img = document.createElement('img');
                img.src = "/img/camera.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'wireless') {
                var img = document.createElement('img');
                img.src = "/img/wireless.png";
                img.className = "icon";
                col.appendChild(img);
                // col.style.lineHeight = '48px';
            }
            if (col.innerHTML === 'appliance') {
                var img = document.createElement('img');
                img.src = "/img/appliance.png";
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

    const url = `https://fast-thicket-18722-58f838c326e4.herokuapp.com/https://api.meraki.com/api/v1//organizations/${orgID}/summary/top/clients/byUsage`;
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

    const url = `https://fast-thicket-18722-58f838c326e4.herokuapp.com/https://api.meraki.com/api/v1//organizations/${orgID}/summary/top/applications/byUsage`;
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
    const myUl = document.getElementById('mymenu');
    fetchClients();
    fetchDevices();
    fetchTopClients();
    fetchTopApplications();
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setInterval(fetchClients, getRandomArbitrary(min, max));
setInterval(fetchDevices, getRandomArbitrary(min, max));
setInterval(fetchTopClients, getRandomArbitrary(min, max));
setInterval(fetchTopApplications, getRandomArbitrary(min, max));