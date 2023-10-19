var Client = require('node-ssdp').Client;
let ssdp = new Client();

const deviceList = document.getElementById('device-list');

ssdp.on('response', function (headers, statusCode, rinfo) {
    const device = document.createElement('li');
    device.textContent = `Device: ${headers.ST} - IP: ${rinfo.address}`;
    deviceList.appendChild(device);
});

ssdp.search('ssdp:all');
