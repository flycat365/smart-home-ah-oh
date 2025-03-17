document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('light-status');
    const toggleButton = document.getElementById('toggle-light');

    // 假设从服务器获取当前灯光状态
    let lightStatus = '关闭'; // 初始状态

    // 更新状态显示
    function updateStatus() {
        statusElement.textContent = lightStatus;
    }

    // 连接到 MQTT 服务器
    const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');

    client.on('connect', function() {
        console.log('已连接到MQTT服务器');
        // 订阅灯光状态主题
        client.subscribe('smarthome/light/status');
    });

    client.on('message', function(topic, message) {
        if (topic === 'smarthome/light/status') {
            lightStatus = message.toString();
            updateStatus();
        }
    });

    // 切换灯光状态
    toggleButton.addEventListener('click', function() {
        lightStatus = lightStatus === '开启' ? '关闭' : '开启';
        updateStatus();
        // 发送状态到服务器
        client.publish('smarthome/light/control', lightStatus);
    });

    // 初始化状态
    updateStatus();
}); 