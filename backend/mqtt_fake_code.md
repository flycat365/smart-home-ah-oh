# MQTT Fake Code V1

所有设备具有基本相同的MQTT Topic结构：

+ /device/{device_id}/
    + meta/ 元数据
    + heartbeat/ 心跳
    + will/ 遗嘱消息
    + attrib/ 属性

后文单独介绍各个topic

# Attrib - 属性

是一个JSON对象，记录该设备的所有属性，具体属性类型，范围，是否可读可写，在元数据中记录。

由于设备的不同，具体的属性也会不一样，比如对于温湿探测设备，将会有：

/device/21fvs93432j/attrib = 
```json
{
    "temperature":23.4,
    "humidity":23,
    "alert":false
}
```
*很明显其中有的属性（alert）应该是可写的，关于这部分到元数据中再讨论。*

对于电机控制设备，将会有：

/device/s934rgr32j/attrib = 
```json
{
    "speed":0.25,
    "angle":13.24,
    "running":false
}
```

# Meta - 元数据

元数据主要描述设备的一些基本不会改变的静态属性，比如设备使用的控制协议版本，设备的位置，设备的描述，以及设备拥有哪些属性，这些属性的描述，以及这些属性的数据类型，值域等。

比如。对于上面的温度传感器的例子：

/device/21fvs93432j/meta = 
```json
{
    "type": ["thermometer","hygrometer"],
    "desc": "门口的温湿度传感器",
    "heartbeat_interval": 30,
    "attrib_schema": "v1",
    "attrib": [
        {
            "topic": "/temperature",
            "type": "float",
            "desc": "摄氏温度传感器读数",
            "rw": "r"
        },
        {
            "topic": "/humidity",
            "type": "float",
            "desc": "湿度传感器读数",
            "rw": "r"
        },
        {
            "topic": "/alert",
            "type": "bool",
            "desc": "传感器报警状态",
            "rw": "rw"
        }
    ]
}
```

# HeartBeat - 心跳

心跳机制用于检测设备在线状态。
例如，对于某个设备：

/device/21fvs93432j/heartbeat = 
```json
{
    "timestamp":1145141919810,
    "status":"online"
}
```

心跳超时时间在设备的元数据中，当时间戳超时未变化，则认为设备失去心跳，设备可能离线，此时考虑检查遗嘱消息检查离线原因。


# Will - 遗嘱

遗嘱机制用于检测设备离线原因，设备正常开机后清除，设备关机前修改为遗嘱消息。

如果设备没有心跳但遗嘱消息为空，则认为设备异常离线，还没来得及留下遗嘱就死了。

例如，对于某设备，有遗嘱消息：

/device/21fvs93432j/will = 
```json
{
    "status":"offline",
    "will":"i don't wanna to work anymore"
}
```

# 后续内容

除了一些功能上的改进，可能还需要实现加密，校验和鉴权，以后再说吧。