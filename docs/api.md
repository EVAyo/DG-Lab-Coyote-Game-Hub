# 第三方插件接口

## 获取游戏信息

```sh
GET /api/game/{clientId}
```

### 请求参数

无

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "gameConfig": {
        "strength": {
            "minStrength": 1, // 最小随机强度
            "maxStrength": 10, // 最大随机强度
            "minInterval": 10, // 最小随机间隔
            "maxInterval": 15 // 最大随机间隔
        },
        "pulseId": "pulse-1" // 脉冲ID
    },
    "clientStrength": {
        "strength": 0, // 当前强度
        "limit": 20 // 强度上限
    }
}
```

## 获取脉冲列表

```sh
GET /api/game/{clientId}/pulse_list
```

### 请求参数

无

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "pulseList": [
        {
            "id": "pulse-1",
            "name": "脉冲1"
        },
        {
            "id": "pulse-2",
            "name": "脉冲2"
        }
    ]
}
```

## 获取游戏强度配置

```sh
GET /api/game/{clientId}/strength_info
```

### 请求参数

无

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "strengthConfig": { // 强度配置，同上
        "minStrength": 5,
        "maxStrength": 10,
        "minInterval": 10,
        "maxInterval": 15
    }
}
```

## 设置游戏强度配置

```sh
POST /api/game/{clientId}/strength_info
```

### 请求参数

如果服务器配置```allowBroadcastToClients: true```，可以将请求地址中的```{clientId}```设置为```all```，将设置到所有客户端。


以下是请求参数的类型定义：

```typescript
type SetStrengthConfigRequest = {
    minStrength?: {
        add?: number; // 增加最低随机强度（基础强度）
        sub?: number; // 减少强度
        set?: number; // 设置强度
    },
    maxStrength?: {
        add?: number; // 增加最高随机强度
        sub?: number; // 减少强度
        set?: number; // 设置强度
        keep?: boolean; // 是否保持最低强度不变，默认会根据最低强度的变化调整最高强度
    },
    minInterval?: {
        set?: number; // 设置最低随机间隔
    },
    maxInterval?: {
        set?: number; // 设置最高随机间隔
    },
}
```

发送请求时，需要发送 JSON POST 请求，例如：

```json
{
    "minStrength": {
        "add": 1
    }
}
```

强度配置在服务端已做限制，不会超出范围。插件可以随意发送请求，不需要担心超出范围。

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "message": "成功设置了 1 个游戏的强度配置",
    "successNum": 1
}
```

## 获取游戏当前脉冲ID

```sh
GET /api/game/{clientId}/pulse_id
```

### 请求参数

无

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "pulseId": "pulse-1"
}
```

## 设置游戏当前脉冲ID

```sh
POST /api/game/{clientId}/pulse_id
```

### 请求参数

如果服务器配置```allowBroadcastToClients: true```，可以将请求地址中的```{clientId}```设置为```all```，将设置到所有客户端。

```json
{
    "pulseId": "pulse-1" // 脉冲ID
}
```

### 响应

```json
{
    "status": 1,
    "code": "OK",
    "message": "成功设置了 1 个游戏的脉冲ID",
    "successNum": 1
}
```

## 请求错误响应

```json
{
    "status": 0,
    "code": "ERR::INVALID_REQUEST",
    "message": "请求参数不正确"
}
```