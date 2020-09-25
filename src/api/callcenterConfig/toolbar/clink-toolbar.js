ClinkAgent.setup({sipPhone: true, debug: true}, function () {

    console.log("ClinkAgent.setup OK!");

    /** 状态事件 */
    ClinkAgent.registerListener(ClinkAgent.EventType.STATUS, handleState);  //当前座席状态
    ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_RINGING, handleState);  //外呼接通
    ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_BRIDGE, handleState);  //外呼接通
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_START, handleState);  //咨询开始
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_LINK, handleState);  //咨询接听
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_ERROR, handleState);  //咨询失败
    ClinkAgent.registerListener(ClinkAgent.EventType.UNCONSULT, handleState);  //咨询挂断/接回/取消
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY, handleState);  //咨询三方
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY_UNLINK, handleState);  //咨询三方挂断
    ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_TRANSFER, handleState);  //咨询转移
    ClinkAgent.registerListener(ClinkAgent.EventType.QUEUE_STATUS, function (token) {
        console.log("queueStatus: " + JSON.stringify(token));
    });

    ClinkAgent.registerListener(ClinkAgent.EventType.RINGING, handleRinging);
    ClinkAgent.registerListener(ClinkAgent.EventType.BREAK_LINE, breakLineInfo);
    ClinkAgent.registerListener(ClinkAgent.EventType.TICKET_NOTICE, ticketNotice);
    ClinkAgent.registerListener(ClinkAgent.EventType.TASK_PROPERTY_START, ticketNotice);
    ClinkAgent.registerListener(ClinkAgent.EventType.TASK_PROPERTY_PAUSE, ticketNotice);
    ClinkAgent.registerListener(ClinkAgent.EventType.KICKOUT, function (token) {
        unlogin();
        alert("被踢下线：" + JSON.stringify(token));
    });

    ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGIN, callbackLogin);
    ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGOUT, callbackLogout);


    /**
     * 会话收到事件
     */
    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_BRIDGE, function (token) {
        /*alert("会话接通：" + JSON.stringify(token));*/
    });
    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_TRANSFER, function (token) {
        /* alert("会话转接：" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_INVESTIGATION, function (token) {
        /*alert("满意度状态发送成功：" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_OFFLINE, function (token) {
        /*alert("访客离线：" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_CLOSE, function (token) {
        /* alert("会话结束：" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.EventType.CHAT_ONLINE, function (token) {
        /* alert("访客上线：" + JSON.stringify(token));*/
    });


    /**
     * 座席操作响应结果
     */
    ClinkAgent.registerListener(ClinkAgent.ResponseType.CHAT_MESSAGE, function (token) {
        /*alert("发送消息响应：" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.ResponseType.CHAT_TRANSFER, function (token) {
        /*alert("转移响应结果" + JSON.stringify(token));*/
    });
    ClinkAgent.registerListener(ClinkAgent.ResponseType.CHAT_CLOSE, function (token) {
        /* alert("关闭会话响应结果" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.ResponseType.CHAT_PAUSE, function (token) {
        /*alert("座席置忙" + JSON.stringify(token));*/
    });

    ClinkAgent.registerListener(ClinkAgent.ResponseType.CHAT_PAUSE, function (token) {
        /*alert("座席置闲" + JSON.stringify(token));*/
    });


    unlogin();
});


function login() {

    var params = {};

    var identifier = document.getElementById("identifier").value;
    var cno = document.getElementById("cno").value;
    var pwd = document.getElementById("pwd").value;
    var bindTel = document.getElementById("bindTel").value;
    var bindType = document.getElementById("bindType").value;
    var initStatus = document.getElementById("initStatus").value;

    var chatInitStatus = document.getElementById("chatInitStatus").value;

    params.identifier = identifier;
    params.cno = cno;
    params.loginStatus = initStatus;
    params.bindTel = bindTel;
    params.bindType = bindType;
    params.password = pwd;
    params.chatLoginStatus = chatInitStatus;

    if (initStatus === "2") {
        params.pauseDescription = "忙碌";
    }

    if (chatInitStatus === "2") {
        params.chatPauseDescription = "忙碌";
    }
    params.chatLimitNumber = 10;

    ClinkAgent.login(params);

}

function logout(removeBinding) {
    var params = {};

    params.logoutMode = 1;
    params.removeBinding = removeBinding;

    params.chatClose = 1;

    ClinkAgent.logout(params);
}

function handleRinging(token) {
    console.log(token);
}


function callbackLogout(token) {
    console.log("ClinkAgent.logout callback", token);
    if (token.code !== 0) {
        setTimeout(function () {
            alert("登录失败：" + token.msg);
        }, 1);
    } else {
        unlogin();
    }
}

function ticketNotice(token) {
    console.log("toolbar test success!!!");
}

function taskPropertyStart(token) {
    console.log("toolbar test taskPropertyStart success!!!");
}

function taskPropertyStart(token) {
    console.log("toolbar test taskPropertyStart success!!!");
}


function callbackLogin(token) {

    if (token.code === 0) {
        console.log("ClinkAgent.login callback", token);
        tinetJquery("#_cno").html(token.values.cno);
        tinetJquery("#_bindTel").html(token.values.bindTel);

        if (token.values.bindType === 3) {
            tinetJquery("#sip_phone_div").show();
        }

        tinetJquery("#infos").show();
        tinetJquery("#nologin").hide();

        setTimeout(function () {
            console.log(JSON.stringify(token));
        }, 1);

    } else {
        console.log("ClinkAgent.login callback", token);

        setTimeout(function () {
            alert("登录失败：" + token.msg);
        }, 1);
        unlogin();
    }
}


function handleState(token) {

    var stateShow = token.code;
    switch (token.code) {

        case "OFFLINE": {
            unlogin();
            break;
        }
        //软电话状态, 退出
        case "INVALID": {
            break;
        }
        // 初始状态
        case "IDLE": {
            idleState();
            break;
        }
        // 忙碌
        case "PAUSE": {
            busyState(token);
            break;
        }
        // 呼叫中
        case "CALLING": {
            bellToRing(4, token);
            break;
        }
        // 响铃中
        case "RINGING": {
            switch (token.action) {
                //呼入座席响铃
                case "ringingIb": {
                    bellToRing(1, token);
                    break;
                }
                //外呼座席响铃
                case "ringingAgentOb": {

                    /*
                     * 第三方代码
                     */

                    // 获取录音编号
                    top.CTI_ID = token.uniqueId;
                    bellToRing(2, token);
                    break;
                }
                // 咨询响铃
                case "ringingConsult": {
                    bellToRing(1, token);
                    break;
                }

            }
            break;
        }
        // 通话中
        case "BUSY": {
            switch (token.action) {
                //外呼座席接通，呼叫客户中
                case "busyAgentOb": {
                    outboundState();
                    break;
                }
                //外呼客户响铃
                case "ringingCustomerOb": {
                    break;
                }
                //呼入座席接听
                case "busyIb": {
                    callingState();
                    break;
                }
                //外呼客户接听 客户和座席通话
                case "busyOb" :
                    callingState();
                    break;
                // 咨询取消
                case "unconsult": {
                    callingState();
                    break;
                }
                //保持开始
                case "hold": {
                    hold();
                    break;
                }
                //保持结束
                case "unhold": {
                    callingState();
                    break;
                }
                //咨询开始
                case "consultStart": {
                    consultStartState();
                    break;
                }
                //咨询成功
                case "consultLink": {
                    consultLinkState();
                    break;
                }
                //被咨询的通话
                case "busyConsult": {
                    outboundState();
                    break;
                }
                // 被转移的通话
                case "busyTransfer": {
                    outboundState();
                    break;
                }
                // 咨询三方
                case "consultThreeway": {
                    consoltThreewayState();
                    break;
                }
                // 咨询失败
                case "consultError": {
                    callingState();
                    break;
                }
                // 咨询转移
                case "consultTransfer": {
                    callingState();
                    break;
                }

                default: {

                }

            }
            break;
        }

        //整理开始（座席挂断）
        case "WRAPUP": {
            console.log(token);
            arrangementState();
            break;
        }
    }
    if (stateShow !== "" && token.state !== "忙碌") {
        tinetJquery("#_statusInfo").html(stateShow)
    }

    if (stateShow === '离线') {
        unlogin();
    }
}

function idleState() {//置闲状态
    //console.log("置闲")
    init('no-idle_button');
    init('busy_button');
    init('little_rest_button');
    init('little_rest_button');
    init('have_meals_button');
    init('train_button');
    init('rest_button');
    init('calling_button');
    init('no-callCancel_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-answer_button');
    init('no-interactive_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    init("no-mute_button");
    init("no-cancel_mute_button");

    timer();

    tinetJquery("#_phone").html("");
    tinetJquery("#nologin").hide();
    tinetJquery("#agentChangeBindTel").show();
    tinetJquery("#prolongWrapup").hide();

    tinetJquery("input[name=logoutButton]").show();
    tinetJquery("input[name=loginButton]").hide();


    check = true;
}

function busyState(token) {//置忙状态
    init('idle_button');
    init('no-busy_button');
    init('little_rest_button');
    init('little_rest_button');
    init('have_meals_button');
    init('train_button');
    init('rest_button');
    init('calling_button');
    init('no-callCancel_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('no-hangUp_button');

    tinetJquery("input[name=logoutButton]").show();
    tinetJquery("input[name=loginButton]").hide();

    //忙碌、小休、用餐、培训、休息
    //console.log(token.pauseDescription)
    if (token.pauseDescription === "小休") {
        init('no-little_rest_button');
        tinetJquery('#status').text("小休");
        tinetJquery("#_statusInfo").html("小休")
    } else if (token.pauseDescription === "午饭") {
        init('no-have_meals_button');
        tinetJquery('#status').text("午饭");
        tinetJquery("#_statusInfo").html("午饭")
    } else if (token.pauseDescription === "忙碌" || token.pauseDescription === "管理置忙") {
        init('no-busy_button');
        tinetJquery('#status').text("忙碌");
        tinetJquery("#_statusInfo").html("忙碌")
    } else if (token.pauseDescription === "勿打扰") {
        init('no-train_button');
        tinetJquery('#status').text("勿打扰");
        tinetJquery("#_statusInfo").html("勿打扰")
    } else if (token.pauseDescription === "WC") {
        init('no-rest_button');
        tinetJquery('#status').text("WC");
        tinetJquery("#_statusInfo").html("WC")
    }
    timer();
    tinetJquery("#prolongWrapup").hide();
    check = true;
}

function outboundState() {//外呼状态
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    //init('answer_button');
    //init('refuse_button');
    init('no-refuse_button');
    init('no-callCancel_button');
    init('hangUp_button');
    timer()
}

function hold() {//保持开始
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    init("no-mute_button");
    init("no-cancel_mute_button");
    timer()
}

function callingState() {//通话中
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('keep_button');
    init('no-keep_back_button');
    init('consulting_button');
    init('transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('satisfaction_button');
    init('interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('hangUp_button');
    init("mute_button");
    init("no-callCancel_button");
    timer()
}

function consultStartState() {//咨询开始
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init("no-consulting_back_button");
    init('consulting_cancel_button');
    init('no-consulting_transfer_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    timer()
}

function consultLinkState() {//咨询中
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init("consulting_back_button");
    init('no-consulting_cancel_button');
    init('consulting_transfer_button');
    init('three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    timer();
}

function consoltThreewayState() {//咨询三方
    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('hangUp_button');
    timer()
}

function arrangementState() {//整理
    init('idle_button');
    init('busy_button');
    init('little_rest_button');
    init('have_meals_button');
    init('train_button');
    init('rest_button');
    init('calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-consulting_transfer_button');
    init('no-consulting_cancel_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-interactive_button');
    init('no-answer_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    init("no-mute_button");
    init("no-cancel_mute_button");
    timer("zl")
}

function prolongWrapup() {//置忙延时

    var params = {};
    params.wrapupTime = 30;

    ClinkAgent.prolongWrapup(params);
    tinetJquery("#prolongWrapup").hide();
    setTimeout("check = true;", 30000);
}


function unlogin() {

    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-callCancel_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-consulting_cancel_button');
    init('no-consulting_transfer_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    init('no-answer_button');
    init('no-interactive_button');
    init('no-refuse_button');
    init('no-hangUp_button');
    init("no-mute_button");
    init("no-cancel_mute_button");

    tinetJquery("#infos").hide();
    tinetJquery("#nologin").show();

    tinetJquery("input[name=loginButton]").show();
    tinetJquery("input[name=logoutButton]").hide();

    // tinetJquery("#sip_phone_div").hide();

}

//对应状态
function bellToRing(type, token) { //响铃
    switch (type) {
        case 1: {//呼入座席响铃
            if (bindType === 3) {
                init('answer_button');
            }
            init('refuse_button');
            break;
        }
        case 2: {//外呼座席响铃
            //第三方代码
            top.CTI_ID = token.uniqueId;//获取录音编号
            init('callCancel_button');   //初始化外呼取消按钮
            break;
        }
        case 3: {//外呼客户响铃
            console.log("外呼客户响铃");
            break;
        }
        case 4: {//呼叫中
            console.log("呼叫中");
            break;
        }
    }

    init('no-idle_button');
    init('no-busy_button');
    init('no-little_rest_button');
    init('no-have_meals_button');
    init('no-train_button');
    init('no-rest_button');
    init('no-calling_button');
    init('no-keep_button');
    init('no-keep_back_button');
    init('no-consulting_button');
    init('no-consulting_transfer_button');
    init('no-transfer_button');
    init('no-consulting_back_button');
    init('no-three_party_consultation_button');
    init('no-satisfaction_button');
    //init('answer_button');

    init('no-hangUp_button');
    timer()
}

//计时器
var timerInterval = null;
var check = true;

function timer(zl) {
    tinetJquery("#timer").html("00:00:00");
    var reg = /^\d$/, sleep = 1000, sum = 0;
    if (timerInterval !== null) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
        sum++;
        var d = new Date("1111/1/1,00:00:00");
        d.setSeconds(sum);
        var h = d.getHours();
        h = reg.test(h) ? "0" + h + ":" : h + ":";
        var m = d.getMinutes();
        m = reg.test(m) ? "0" + m + ":" : m + ":";
        var s = d.getSeconds();
        s = reg.test(s) ? "0" + s : s;
        if (zl !== undefined) {//整理计时
            if (check && 30 - s > 0 && 30 - s <= 10) {
                console.log("延长整理");
                tinetJquery("#prolongWrapup").show();
                check = false;
            }
        }
        tinetJquery("#timer").html(h + m + s)
    }, sleep);
}

function init(id) {
    i = id.indexOf("-");
    if (i > 0) {
        tinetJquery("#" + id).show();
        id = id.substring(i + 1, id.length);
        tinetJquery("#" + id).hide();
    } else {
        tinetJquery("#" + id).show();
        tinetJquery("#no-" + id).hide()
    }
}

function toggle(id) {

    var i = id.indexOf("-");
    if (i > 0) {
        id = id.substring(i + 1, id.length)
    }
    tinetJquery("#" + id).toggle();
    tinetJquery("#no-" + id).hide();

    triggerEvent(id)
}

//点击事件处理
function triggerEvent(id) {
    var params = {};
    switch (id) {
        case "busy": {//点击置忙触发事件

            params.pauseType = 1;
            params.pauseDescription = "忙碌";
            ClinkAgent.pause(params);
            break;
        }
        case "little_rest": {//小休
            params.pauseType = 1;
            params.pauseDescription = "小休";
            ClinkAgent.pause(params);
            break;
        }
        case "idle": {//置闲
            ClinkAgent.unpause();
            break;
        }
        case "have_meals": {//午饭
            params.pauseType = 1;
            params.pauseDescription = "午饭";
            ClinkAgent.pause(params);
            break;
        }
        case "train": {//勿打扰
            params.pauseType = 1;
            params.pauseDescription = "勿打扰";
            ClinkAgent.pause(params);
            break;
        }
        case "rest": {//WC
            params.pauseType = 1;
            params.pauseDescription = "WC";
            ClinkAgent.pause(params);
            break;
        }
        case "calling": {//呼叫
            showDialog(1);
            return;
        }
        case "callCancel": {//取消外呼
            ClinkAgent.previewOutcallCancel();
            return;
        }
        case "keep": {//保持
            params.holdType = 0;
            ClinkAgent.hold(params);
            break;
        }
        case "keep_back": {//保持接回
            params.holdType = 0;
            ClinkAgent.unhold(params);
            break;
        }
        case "consulting": {//咨询

            tinetJquery("#consultDialogButton").unbind("click");
            tinetJquery("#consultDialogButton").bind({
                click: function () {
                    consult();
                }
            });
            tinetJquery("#consultDialog").show();
            tinetJquery("#dialogOver").show();

            params.holdType = 1;
            ClinkAgent.hold(params);

            break;
        }
        case "transfer": {//转接

            tinetJquery("#transferDialogButton").unbind("click");
            tinetJquery("#transferDialogButton").bind({
                click: function () {
                    transfer();
                }
            });
            tinetJquery("#transferDialog").show();
            tinetJquery("#dialogOver").show();

            params.holdType = 2;
            ClinkAgent.hold(params);
            break;
        }
        case "consulting_back": {//咨询接回
            ClinkAgent.unconsult();
            callingState();//咨询接回 回到通话状态
            break;
        }
        case "three_party_consultation": {//咨询三方
            ClinkAgent.consultThreeway();
            break;
        }
        case "interactive": {    //交互

            tinetJquery("#interactDialogButton").unbind("click");
            tinetJquery("#interactDialogButton").bind({
                click: function () {

                    var ivrId = tinetJquery("#interactIvrRoot_text").val();

                    if (!ivrId) {
                        setTimeout(function () {
                            alert("语音导航id不能为空");
                        }, 1);
                    }

                    var endpoint = tinetJquery("#interactIvrChild_text").val();

                    var params = {};

                    params.ivrId = ivrId;
                    params.ivrNode = endpoint;

                    ClinkAgent.interact(params, function () {
                        interactDialogHide();
                    });
                }
            });
            tinetJquery("#interactDialog").show();
            tinetJquery("#dialogOver").show();

            break;
        }
        case "satisfaction": {//满意度
            ClinkAgent.investigation();
            break;
        }
        case "answer": {//接听
           alert('接听 answer');
            ClinkAgent.sipLink();
            break;
        }
        case "refuse": {//拒接
            ClinkAgent.refuse();
            break;
        }
        case "hangUp": {//挂断
            ClinkAgent.unlink();
            break;
        }
        case "mute": {//静音
            params.direction = 'in';
            ClinkAgent.mute(params, function (token) {
                if (token.code === 0) {
                    init("no-mute_button");
                    init("cancel_mute_button");
                }
            });
            break;
        }
        case "cancel_mute": {//取消静音
            params.direction = 'in';
            ClinkAgent.unmute(params, function (token) {
                if (token.code === 0) {
                    init("mute_button");
                    init("no-cancel_mute_button");
                }
            });
            break;
        }
        // 咨询取消
        case "consulting_cancel": {
            ClinkAgent.consultCancel();
            break;
        }

        case "consulting_transfer": {

            tinetJquery("#consultTransferButton").unbind("click");
            tinetJquery("#consultTransferButton").bind("click", function () {

                var params = {};

                params.limitTimeSecond = tinetJquery("#limitTimeSecond").val();
                params.limitTimeAlertSecond = tinetJquery("#limitTimeAlertSecond").val();
                params.limitTimeFile = tinetJquery("#limitTimeFile").val();

                ClinkAgent.consultTransfer(params);

                consultTransferDialogHide();

            });
            tinetJquery("#consultTransferDialog").show();
            tinetJquery("#dialogOver").show();
            break;
        }

        default: {
            console.log("can not trigger: " + id);
        }
    }
}

function consultTransferDialogHide() {
    tinetJquery("#consultTransferDialog").hide();
    tinetJquery("#dialogOver").hide();
}

/**
 * 修改绑定电话
 */
function changeAgentTel() {

    tinetJquery("#telDialogButtonName").unbind("click");
    tinetJquery("#telDialogButtonName").bind({
        click: function () {
            changeAgentBindTel();
        }
    });
    tinetJquery("#telDialogCancel").unbind("click");
    tinetJquery("#telDialogCancel").bind({
        click: function () {
            bindTelDialogHide();
        }
    });
    tinetJquery("#changeBindTelDialog").show();
    tinetJquery("#dialogOver").show();
}

//修改绑定电话
function changeAgentBindTel() {
    var agentTel = tinetJquery("#agentTel").val();
    var agentTelType = tinetJquery("#agentTelType option:selected").val();
    var params = {};
    if (agentTel === '' || agentTel.length < 3) {
        alert("请输入正确绑定电话！");
        return;
    }
    params.bindTel = agentTel;
    params.bindType = agentTelType;
    bindTelDialogHide();
    ClinkAgent.changeBindTel(params, function (token) {
        if (token.code === 0) {
            tinetJquery("#_bindTel").html(agentTel);
        } else {
            setTimeout(function () {
                alert("修改绑定电话失败：" + token.msg);
            }, 1)
        }
    });
}

function showDialog(type) {//显示弹层

    tinetJquery("#dialogButtonName").val("外呼");
    tinetJquery("#dialogSelect").hide();//外呼
    tinetJquery("#dialogSelectTel").hide();//外呼
    tinetJquery("#dialogSelectIvr").hide();
    tinetJquery("#dialogButtonName").unbind("click");
    tinetJquery("#dialogButtonName").bind("click", function () {

        var num = tinetJquery("#phone_num").val();
        var obClid = tinetJquery("#phone_obClid").val();
        var taskId = tinetJquery("#task_id").val();

        var params = {};
        if (num === '' || num.length < 5) {
            alert("请输入正确号码！");
            return;
        }
        params.tel = num;
        params.obClid = obClid; //外显号码
        params.callType = 4; //3点击外呼
        params.taskId = taskId;

        dialogHide(1);

        ClinkAgent.previewOutcall(params, function (token) {
            console.log(token);
        });

        timer();

        tinetJquery("#_phone").html("通话号码：" + num);

    });
    tinetJquery("#dialogCancel").unbind("click");
    tinetJquery("#dialogCancel").bind({
        click: function () {
            dialogHide(1);
        }
    });
    tinetJquery("#dialog").show();
    tinetJquery("#dialogOver").show();

}

function dialogHide(type) {

    switch (type) {
        case 1: {
            init("hujiao");
            break;
        }
        case 2: {
            init("zixun");
            break;
        }
        case 3: {
            init("zhuanjie");
            break;
        }
    }
    tinetJquery("#dialog").hide();
    tinetJquery("#dialogOver").hide();
}

function consultDialogHide() {

    ClinkAgent.unhold({holdType: 1});

    tinetJquery("#consultDialog").hide();
    tinetJquery("#dialogOver").hide();
}

function transferDialogHide() {

    ClinkAgent.unhold({holdType: 2});

    tinetJquery("#transferDialog").hide();
    tinetJquery("#dialogOver").hide();
}

function interactDialogHide() {
    tinetJquery("#interactDialog").hide();
    tinetJquery("#dialogOver").hide();
}

/**
 * 隐藏绑定电话框
 */
function bindTelDialogHide() {
    tinetJquery("#changeBindTelDialog").hide();
    tinetJquery("#dialogOver").hide();
}

/**
 * 隐藏断线重连框
 */
function breakLineDialogHide() {
    unlogin();
    tinetJquery("#breakLineDialog").hide();
    tinetJquery("#dialogOver").hide();
}


function showBreakLineDialog() { //显示弹层
    tinetJquery("#breakLineDialog").show();
    tinetJquery("#dialogOver").show();
}

/**
 * 咨询
 */
function consult() {
    var number = tinetJquery("#consultTel_text").val();
    var type = tinetJquery('input[name="consultPhoneType"]:checked').val();
    console.log('consultation number ' + number + "type " + type);
    if (type === 0) {
        if (number === '' || number.length < 4) {
            alert("请输入正确号码！")
            return;
        }
    }
    if (type === 1) {
        number = tinetJquery("#onlineFreeCno_select").val();
    }

    consultDialogHide();

    var params = {};
    params.objectType = type;
    params.consultObject = number;

    ClinkAgent.consult(params, function (token) {

        if (token.code === 0) {
            timer();
            tinetJquery("#_phone").html("通话号码：" + number);
        } else {
            var _msg = "咨询失败！" + token.msg;
        }
    });
}

/**
 * 转移
 */
function transfer() {

    var number = tinetJquery("#transferTel_text").val();
    var type = tinetJquery('input[name="transferPhoneType"]:checked').val();
    console.log('transfer number ' + number + "type " + type);
    if (type === 0) {
        if (number === '' || number.length < 4) {
            alert("请输入正确号码！");
            return;
        }
    }
    if (type === 1) {
        number = tinetJquery("#transferOnlineFreeCno_text").val();

    } else if (type === 3) {
        var ivrid = tinetJquery("#transferIvrRoot_text").val();
        var ivrPath = tinetJquery("#transferIvrChild_text").val();
        if (ivrid === 'pleaseSelect' || ivrPath === 'pleaseSelect') {
            return;
        }
        number = ivrid + "," + ivrPath;
        var ivrTransferType = tinetJquery("#ivrTransferType option:selected").val();
        if (ivrTransferType === 2) {
            type = 4;
        }
    }

    transferDialogHide();

    var params = {};
    params.objectType = type;
    params.transferObject = number;
    ClinkAgent.transfer(params);

}


/**
 * 交互
 */
function interact() {


}

/**
 * 断线重连
 * @param token
 */
function breakLineInfo(token) {
    console.log("breakLine token: " + JSON.stringify(token));
    if (token.code === -1) {
        if (token.attempts >= 11) {
            tinetJquery("#breakLinkInfo").find("span").html("连接失败,请稍后再试或联系管理员");
        } else if (token.attempts === 10) {
            tinetJquery("#breakLinkInfo").find("span")
                .html("系统将在" + token.randoms + "s后第" + token.attempts + "次尝试连接...");
            tinetJquery("#breakLinkDiv").html("<input id='breakLineDialogCancel' style='margin-right:20px;' " +
                "onclick='breakLineDialogHide()' type='button' value='手动重连' />");
            showBreakLineDialog();
        } else {
            tinetJquery("#breakLinkInfo").find("span")
                .html("系统将在" + token.randoms + "s后第" + token.attempts + "次尝试连接...");
            showBreakLineDialog();
        }

    } else {
        breakLineDialogHide();
    }
}


function sipCallEach() {
    var params = {};
    params.tel = tinetJquery("#eachCallTel").val();
    if (!params.tel) {
        alert("互拨号码不能为空！");
        return;
    }
    ClinkAgent.sipCall(params);
}

function sipLink() {
    ClinkAgent.sipLink();
}

/**
 * 说出来你可能不信，这是工具条的挂断
 */
function refuse() {
    ClinkAgent.refuse();
}

function sipUnlink() {
    ClinkAgent.sipUnlink();
}

function dtmfNumber() {

    var params = {};
    params.digits = tinetJquery("#dtmfDigits").val();
    params.direction = tinetJquery("#dtmfDirection").val();

    ClinkAgent.dtmf(params);
}

/**
 * 发送消息
 */
function sendMessage() {
    var message = document.getElementById("message").value;
    var mainUniqueId = document.getElementById("mainUniqueId").value;

    var params = {};
    params.content = message;
    params.mainUniqueId = mainUniqueId;

    //消息id，建议用UUID，用于区分消息是否发成功
    params.messageId = "3213213123123";
    params.messageType = 1;

    ClinkAgent.chatSendMessage(params);
}

/**
 * 会话转移
 */
function chatTransfer() {
    var targetType = document.getElementById("targetType").value;
    var targetNo = document.getElementById("targetNo").value;
    var mainUniqueId = document.getElementById("mainUniqueId").value;

    var params = {};
    params.targetType = targetType;
    params.targetNo = targetNo;
    params.mainUniqueId = mainUniqueId;

    ClinkAgent.chatTransfer(params);
}

/**
 * 关闭会话
 */
function chatClose() {
    var mainUniqueIdEle = document.getElementById("mainUniqueId").value;
    var mainUniqueIds = mainUniqueIdEle.split(",");

    var params = {};

    params.mainUniqueIds = mainUniqueIds;

    ClinkAgent.chatClose(params);
}

/**
 * 查看历史会话
 */
function chatHistory() {
    var mainUniqueIdEle = document.getElementById("mainUniqueId").value;

    var params = {};

    params.visitorId = mainUniqueIdEle;

    ClinkAgent.chatHistory(params);
}

/**
 * 在线回访
 */
function visitBridge() {

    console.log("回访");
    var mainUniqueId = document.getElementById("mainUniqueId").value;

    var params = {};

    params.mainUniqueId = mainUniqueId;

    ClinkAgent.visitBridge(params);
}

/**
 * 座席置忙
 */
function chatPause() {

    var pauseDescription = "忙碌";
    var params = {};
    params.pauseDescription = pauseDescription;

    ClinkAgent.chatPause(params);
}

/**
 * 座席置闲
 */
function chatUnpause() {


    ClinkAgent.chatUnpause();
}

/**
 *获取ws模块的http地址
 */
function chatWebSocketUrl() {

    console.log(ClinkAgent.WsConstant.getWebSocketUrl());

}
