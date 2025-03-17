document.addEventListener('DOMContentLoaded', function() {
    // 连接MQTT服务器
    const client = mqtt.connect('wss://broker.hivemq.com:8000/mqtt');
    
    // 连接成功后订阅电视相关主题
    client.on('connect', function() {
        console.log('已连接到MQTT服务器');
        client.subscribe('smarthome/tv/+');
    });
    
    // 接收MQTT消息
    client.on('message', function(topic, message) {
        const topicParts = topic.split('/');
        const parameter = topicParts[2];
        const value = message.toString();
        
        // 根据主题更新UI
        switch(parameter) {
            case 'power':
                document.getElementById('power-status').textContent = value;
                break;
            case 'volume':
                document.getElementById('volume-level').textContent = value;
                document.getElementById('volume-slider').value = value;
                break;
            case 'channel':
                document.getElementById('current-channel').textContent = value;
                break;
            case 'source':
                document.getElementById('input-source').textContent = value;
                break;
        }
    });
    
    // 电源按钮
    document.getElementById('power-btn').addEventListener('click', function() {
        const currentStatus = document.getElementById('power-status').textContent;
        const newStatus = currentStatus === '开启' ? '关闭' : '开启';
        client.publish('smarthome/tv/power', newStatus);
        document.getElementById('power-status').textContent = newStatus;
    });
    
    // 音量调节
    document.getElementById('vol-up').addEventListener('click', function() {
        let volume = parseInt(document.getElementById('volume-level').textContent);
        if (volume < 100) {
            volume += 5;
            client.publish('smarthome/tv/volume', volume.toString());
            document.getElementById('volume-level').textContent = volume;
            document.getElementById('volume-slider').value = volume;
        }
    });
    
    document.getElementById('vol-down').addEventListener('click', function() {
        let volume = parseInt(document.getElementById('volume-level').textContent);
        if (volume > 0) {
            volume -= 5;
            client.publish('smarthome/tv/volume', volume.toString());
            document.getElementById('volume-level').textContent = volume;
            document.getElementById('volume-slider').value = volume;
        }
    });
    
    document.getElementById('volume-slider').addEventListener('change', function() {
        const volume = this.value;
        client.publish('smarthome/tv/volume', volume);
        document.getElementById('volume-level').textContent = volume;
    });
    
    // 静音按钮
    document.getElementById('mute-btn').addEventListener('click', function() {
        client.publish('smarthome/tv/mute', 'toggle');
    });
    
    // 频道控制
    document.getElementById('ch-next').addEventListener('click', function() {
        client.publish('smarthome/tv/channel_control', 'next');
    });
    
    document.getElementById('ch-prev').addEventListener('click', function() {
        client.publish('smarthome/tv/channel_control', 'prev');
    });
    
    document.getElementById('ch-return').addEventListener('click', function() {
        client.publish('smarthome/tv/channel_control', 'return');
    });
    
    // 信号源切换
    document.getElementById('input-btn').addEventListener('click', function() {
        const sources = ['HDMI 1', 'HDMI 2', 'HDMI 3', '电视', 'AV'];
        const currentSource = document.getElementById('input-source').textContent;
        const currentIndex = sources.indexOf(currentSource);
        const nextIndex = (currentIndex + 1) % sources.length;
        const nextSource = sources[nextIndex];
        
        client.publish('smarthome/tv/source', nextSource);
        document.getElementById('input-source').textContent = nextSource;
    });
    
    // 应用按钮
    document.querySelectorAll('.app-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const appName = this.querySelector('span').textContent;
            client.publish('smarthome/tv/app', appName);
            alert(`正在启动应用：${appName}`);
        });
    });
}); 