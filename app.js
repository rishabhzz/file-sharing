const SSDP = require('node-ssdp');
const ssdp = new SSDP();

const deviceList = document.getElementById('device-list');

ssdp.on('response', function (headers, statusCode, rinfo) {
    const device = document.createElement('li');
    device.textContent = `Device: ${headers.ST} - IP: ${rinfo.address}`;
    deviceList.appendChild(device);
});

ssdp.search('ssdp:all');
