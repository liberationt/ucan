// 回调函数
import axios from 'axios'
var getMessage;
export function inits(getMessageArgs) {
    getMessage = getMessageArgs;
    let baseUrl = 'ws://127.0.0.1:12345';
    output("Connecting at " + baseUrl + ".");
    openSocket();
    window.output = output;
    setInterval(()=>{
      startIDCard()
    },1000)
  };
  function startIDCard() {
    if(window.dialog){
      window.dialog.get_actionType("startIDCard");
    }
    // try{
    //   window.dialog.get_actionType("startIDCard");
    // }catch{
    //   console.log(111)
    // }
  }
  function output(message){
    var output = document.getElementById("output");
    output.innerHTML = output.innerHTML + message + "\n";
    output.scrollTop = output.scrollHeight;
  }
  function openSocket() {
    var socket = new WebSocket('ws://127.0.0.1:12345');
    socket.onclose = function()
    {
    };
    socket.onerror = function(error)
    {
    };
    socket.onopen = function()
    {
      window.output("WebSocket start connect");
      new QWebChannel(socket, function(channel) {
        // make dialog object accessible globally
        window.dialog = channel.objects.dialog;
        //网页关闭函数
        window.onbeforeunload = function() {
          dialog.get_actionType("closeSignal");
          socket.close();
        }
        window.onunload = function() {
          dialog.get_actionType("closeSignal");
          socket.close();
        }
        //反初始化
        document.getElementById("closeHtml").onclick = function() {
          dialog.get_actionType("closeSignal");
          var element = document.getElementById("bigPriDev");
          element.src = "";
        };
        //初始化
        document.getElementById("openHtml").onclick = function() {
          dialog.html_loaded("one");
        };
        //设备列表点击
        document.getElementById("devList").onchange = function() {
          //清除展示信息
          var resolutionList = document.getElementById("resolutionList");
          resolutionList.options.length = 0;
          var modelList = document.getElementById("modelList");
          modelList.options.length = 0;
          var select = document.getElementById("devList");
          dialog.devChanged("primaryDev_:" + select.value);
        };
        //模式列表点击
        document.getElementById("modelList").onchange = function() {
          //清除展示信息
          var resolutionList = document.getElementById("resolutionList");
          resolutionList.options.length = 0;
          var select = document.getElementById("modelList");
          dialog.devChanged("primaryDev_:" + select.value);
        };

        //分辨率列表点击
        document.getElementById("resolutionList").onchange = function() {
          //清除展示信息
          var select = document.getElementById("resolutionList");
          dialog.devChanged("primaryDev_:" + select.value);
        };
        //打开视频
        document.getElementById("openPriVideo").onclick = function() {
          //清除展示信息
          var resolutionList = document.getElementById("resolutionList");
          resolutionList.options.length = 0;
          var modelList = document.getElementById("modelList");
          modelList.options.length = 0;
          var select = document.getElementById("devList");
          dialog.devChanged("primaryDev_:" + select.value);
        };
        //关闭视频
        document.getElementById("closePriVideo").onclick = function() {
          dialog.get_actionType("closePriVideo");
          var element = document.getElementById("bigPriDev");
          element.src = "";
        };
        //拍照按钮点击
        document.getElementById("photographPri").onclick = function() {
          dialog.photoBtnClicked("primaryDev_");
          dialog.get_actionType("savePhotoPriDev");
        };
        //左转
        document.getElementById("rotateLeft").onclick = function() {
          dialog.get_actionType("rotateLeft");
        };
        //右转
        document.getElementById("rotateRight").onclick = function() {
          dialog.get_actionType("rotateRight");
        };
        //属性设置
        document.getElementById("showProperty").onclick = function() {
          dialog.get_actionType("showProperty");
        };
        //纠偏裁边
        document.getElementById("setdeskew").onclick = function() {
          dialog.get_actionType("setdeskew");
        };
        //获取文件base64
        document.getElementById("getFileBase64").onclick = function() {
          dialog.get_functionTypes("getFileBase64","C:\\12345100.pdf" , "","");
          //dialog.get_functionTypes("getFileBase64","C:/1234.pdf" , "","");
        };
        //图片合成pdf
        document.getElementById("composePDF").onclick = function() {
          if(imgPathArray.length > 0)
          {
            for (var i = 0; i < imgPathArray.length; i++)
            {
              //发送合成pdf图片的路径，第2个参数：图片文件路径，第3，第4个参数为空
              var path = imgPathArray[i];
              if(path.indexOf("file:///") >= 0)
              {
                path = path.substr(8);
              }
              dialog.get_functionTypes("sendPDFImgPath", path, "","");
            }
            //发送合成pdf命令
            //第2个参数：保存路径，如果该路径不存在则保存在.exe文件下的eloamFile文件夹
            //第3个参数：保存文件名称，如果为空则按照当前时间命名，
            //第4个参数为空
            dialog.get_functionTypes("composePDF", "C:" , "eloamFile\\1234", "");
          }
        };
        //删除本地文件
        document.getElementById("deleteFile").onclick = function() {
          //dialog.get_functionTypes("deleteFile", "C:\\Users\\Administrator\\Desktop\\eloamPhoto\\20180903-200102046.jpg", "", "");
          //dialog.get_functionTypes("deleteFile", "C:/Users/Administrator/Desktop/eloamPhoto/eeee.jpg", "", "");
          for (var i = 0; i < imgPathArray.length; i++)
          {
            //删除文件，第2个参数：图片文件路径，第3，第4个参数为空
            var path = imgPathArray[i];
            if(path.indexOf("file:///") >= 0)
            {
              path = path.substr(8);
            }
            dialog.get_functionTypes("deleteFile", path, "", "");
          }
          removeAll();
          //imgPathArray = [];
        };
        //图片保存参数
        document.getElementById("setImageProperty").onclick = function() {
          //第二个参数是图片dpi，正整数
          //第三个参数是图片保存质量：10表示最高质量，1表示较高质量，2表示中等质量,3表示较差质量，4表示差质量
          //如果参数为空则表示默认
          dialog.get_functionTypes("setImageProperty", "300" , "", "");
        };

        //服务器返回消息
        // dialog.sendPrintInfo.connect(function(message) {
        //   let IDcardInfo="IDcardInfo:";
        //   if(message.indexOf(IDcardInfo)>=0){
        //     IDcardInfo=message.substr(IDcardInfo.length)
        //     IdCardList = IDcardInfo.split(" ")
        //   }
        // });
        dialog.sendPrintInfo.connect(getMessage);
        //接收图片流用来展示，多个，较小的base64数据
        dialog.send_priImgData.connect(function(message) {
          var element = document.getElementById("bigPriDev");
          element.src = "data:image/jpg;base64," + message;
        });
        //接收拍照base64
        dialog.send_priPhotoData.connect(function(message) {
          var element = document.getElementById("devPhoto");
          element.src = "data:image/jpg;base64," + message;
        });
        window.output("ready to send/receive messages!");
        //网页加载完成信号
        dialog.html_loaded("one");
      });
    }
  }
