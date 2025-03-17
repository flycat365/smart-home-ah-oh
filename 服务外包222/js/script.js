document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.details-btn');
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    // 页面跳转功能
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-target');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    // 尝试连接 MQTT，但不阻塞页面跳转功能
    try {
        const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');
        
        // MQTT连接成功回调
        client.on('connect', function() {
            console.log('已连接到MQTT服务器');
            
            // 订阅设备状态主题
            client.subscribe('smarthome/+/status');
        });
        
        // 接收MQTT消息
        client.on('message', function(topic, message) {
            const device = topic.split('/')[1];
            const status = message.toString();
            updateDeviceStatus(device, status);
        });

        // 处理开关按钮点击事件
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const device = button.getAttribute('data-device');
                const statusElement = document.getElementById(`${device}-status`);
                const currentStatus = statusElement.textContent;
                
                // 切换状态
                const newStatus = currentStatus === '开启' ? '关闭' : '开启';
                
                // 发送MQTT消息
                client.publish(`smarthome/${device}/control`, newStatus);
                
                // 更新UI
                updateDeviceStatus(device, newStatus);
            });
        });
        
        // 更新设备状态显示
        function updateDeviceStatus(device, status) {
            const statusElement = document.getElementById(`${device}-status`);
            if (statusElement) {
                statusElement.textContent = status;
            }
        }
    } catch (error) {
        console.error('MQTT连接失败:', error);
        // 即使 MQTT 连接失败，页面跳转功能仍然可用
    }
});