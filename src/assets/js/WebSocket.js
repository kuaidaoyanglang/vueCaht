let Socket = null;
let Token = null;
let lockReconnect = false; //是否真正建立连接
let timeout = 30 * 1000; //5秒一次心跳
let timeoutObj = null; //心跳心跳倒计时
let serverTimeoutObj = null; //心跳倒计时
let timeoutNum = null; //断开 重连倒计时

export function creatWebsocket() {
  Token = localStorage.getItem("token");
  if (Token === "" || Token === null) {
    console.log("Token不存在");
  } else {
    // console.log(Token);
    const WebsocketUrl = `ws://192.168.0.106:9502/socket?token=${Token}`;
    if (Socket == null) {
      Socket = new WebSocket(WebsocketUrl);
      Socket.onopen = onopenWS;
      Socket.onmessage = onmessageWS;
      Socket.onerror = onerrorWS;
      Socket.onclose = oncloseWS;
    }
    // console.log(Socket)
  }
}

// Socket建立连接时
export function onopenWS() {
  start();
  console.log("Socket已经建立了链接");
}

// Socket处理消息时
export function onmessageWS(e) {
  console.log("Socket消息数据")
  console.log(e.data)
  if (isJSON(e.data)) {
    // window.dispatchEvent(
    //   new CustomEvent("onmessageWS", {
    //     detail: {
    //       data: e.data
    //     }
    //   })
    // );


    // switch (e.data.code) {
    //   case 121:
    //     localStorage.setItem("data", e.data)
    //     break;
    // }
  } else {
    reset();
  }
}

// Socket链接错误时
export function onerrorWS() {
  //错误
  console.log("WebSocket连接发生错误");
  //重连
  reconnect();
}

/**
 * Socket关闭时候
 * @param e
 */
export function oncloseWS(e) {
  if (Socket !== null) {
    Socket.close();
    Socket = null;
  }
  console.log("关闭Socket连接");
}

/**
 * 重新连接
 */
export function reconnect() {
  if (lockReconnect) {
    return;
  }
  lockReconnect = true;
  timeoutNum && clearTimeout(timeoutNum);
  timeoutNum = setTimeout(function () {
    //新连接
    creatWebsocket();
    lockReconnect = false;
  }, 30000);
}

/**
 * 重置心跳
 */
export function reset() {
  //清除时间
  clearTimeout(timeoutObj);
  clearTimeout(serverTimeoutObj);
  //重启心跳
  start();
}

/**
 * 开启心跳
 */
export function start() {
  timeoutObj && clearTimeout(timeoutObj);
  serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(function () {
    //这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (Socket.readyState === 1) {
      //如果连接正常
      Socket.send("PING");
    } else {
      //否则重连
      reconnect();
    }
    serverTimeoutObj = setTimeout(function () {
      //超时关闭
      console.log("触发超时关闭");
      Socket.close();
    }, timeout);
  }, timeout);
}

/**
 * 判断是否为Json
 * @param str
 * @returns {boolean}
 */
export function isJSON(str) {
  if (typeof str == "string") {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// 发送信息的时候
export function sendMessage(val) {
  Socket.send(val);
}
