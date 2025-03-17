document.addEventListener('DOMContentLoaded', function() {
    const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

    document.getElementById('working-temp').textContent = '未连接到设备';
    document.getElementById('environment-temp').textContent = '未连接到设备';
    document.getElementById('mode').textContent = '未连接到设备';

    client.on('connect', function() {
        console.log('Connected to MQTT broker');
        client.subscribe('ac/status');
    });

    client.on('message', function(topic, message) {
        if (topic === 'ac/status') {
            const data = JSON.parse(message.toString());
            document.getElementById('working-temp').textContent = data.workingTemp + '°C';
            document.getElementById('environment-temp').textContent = data.environmentTemp + '°C';
            document.getElementById('mode').textContent = data.mode;
        }
    });

    const powerBtn = document.getElementById('power-btn');
    powerBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'togglePower' }));
    });

    const tempUpBtn = document.getElementById('temp-up-btn');
    tempUpBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'increaseTemp' }));
    });

    const tempDownBtn = document.getElementById('temp-down-btn');
    tempDownBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'decreaseTemp' }));
    });

    const modeBtn = document.getElementById('mode-btn');
    modeBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'changeMode' }));
    });

    const swingBtn = document.getElementById('swing-btn');
    swingBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'toggleSwing' }));
    });

    const timerBtn = document.getElementById('timer-btn');
    timerBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'toggleTimer' }));
    });

    const smartTempBtn = document.getElementById('smart-temp-btn');
    smartTempBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'toggleSmartTemp' }));
    });

    const auxHeatBtn = document.getElementById('aux-heat-btn');
    auxHeatBtn.addEventListener('click', () => {
        client.publish('ac/control', JSON.stringify({ action: 'toggleAuxHeat' }));
    });
}); 