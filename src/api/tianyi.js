/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import axios from "axios";
export function tianyi() {
    'use strict';
    var $ = $ || window.$;
    var obj = {
        file_page: {
            shareId: ""
        }
    };

    obj.showTipSuccess = function (text, time) {
        obj.showNotify({
            type: "success",
            text: text,
            time: time || 3000
        });
    };

    obj.showTipError = function (text, time) {
        obj.showNotify({
            type: "error",
            text: text,
            time: time || 3000
        });
    };

    obj.showTipLoading = function (text, time) {
        obj.showNotify({
            type: "loading",
            text: text,
            time: time || 3000
        });
    };

    obj.showNotify = function (opts) {
        var $Vue = (document.querySelector(".content") || document.querySelector(".p-web")).__vue__;
        if (opts.type == "loading") {
            $Vue.$loading.show(opts);
        }
        else {
            $Vue.$toast.show(opts);
        }
    };

    obj.hideNotify = function() {
        var $Vue = (document.querySelector(".content") || document.querySelector(".p-web")).__vue__;
        $Vue.$toast.hide();
        $Vue.$loading.hide();
    };

    obj.getSignature = function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) {
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
        }
        var i = []
        for (var s in e){
            i.push(s + "=" + e[s]);
        }
        i.sort(function(e, t) {
            return e > t ? 1 : e < t ? -1 : 0
        })
        e = i.join("&");
        return window.md5(e);
    };

    obj.getFileDownloadUrl = function (fileId, shareId) {
        var accessToken = localStorage.getItem("accessToken").replace(/[\"\\]/g, "")
        , timestamp = Date.now()
        , data = Object.assign({
            AccessToken: accessToken,
            Timestamp: timestamp,
            fileId: fileId
        }, shareId ? {dt: 1, shareId: shareId} : {})
        , signature = obj.getSignature(data);

        return new Promise(function (resolve) {
            $.ajax({
                url: "https://api.cloud.189.cn/open/file/getFileDownloadUrl.action?fileId=" + fileId + (shareId ? "&dt=1&shareId=" + shareId : ""),
                headers: {
                    Accept: "application/json;charset=UTF-8",
                    AccessToken: accessToken,
                    Signature: signature,
                    "Sign-Type": 1,
                    Timestamp: timestamp
                },
                async: true,
                success: function (t) {
                    if (0 === t.res_code) {
                        resolve(t.fileDownloadUrl);
                    }
                    else if ("InfoSecurityErrorCode" === t.res_code) {
                        obj.showTipError("文件内容违规，下载失败");
                        resolve("");
                    }
                    else {
                        obj.showTipError("下载失败，网络错误，刷新重试");
                        resolve("");
                    }
                },
                error: function () {
                    obj.showTipError("网络错误，刷新重试");
                    localStorage.removeItem("accessToken");
                    resolve("");
                }
            });
        });
    };

    obj.getFinalUrl = function (url) {
        return new Promise(function (resolve) {
            const xhr = axios.get({
                url: url,
                method: "get",
                onreadystatechange: function(response) {
                    if (response.readyState === 4 || response.finalUrl !== url) {
                        xhr.abort();
                        if (!xhr.mark) {
                            xhr.mark = true;
                            resolve(response.finalUrl);
                        }
                    }
                },
                onerror: function (error) {
                    resolve("");
                }
            });
        });
    };

    obj.getAccessToken = function () {
        return new Promise(function (resolve) {
            var accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                resolve(accessToken);
                return;
            }
            obj.getFinalUrl("https://api.cloud.189.cn/open/oauth2/ssoH5.action").then(function (location) {
                if (location) {
                    var accessToken = (/accessToken=(.+)/.exec(location) || [])[1];
                    accessToken && localStorage.setItem("accessToken", accessToken);
                    resolve(accessToken);
                }
                else {
                    resolve("");
                }
            });
        });
    };

    obj.getDownloadUrl = function (fileId, shareId) {
        return obj.getAccessToken().then(function (accessToken) {
            if (accessToken) {
                return obj.getFileDownloadUrl(fileId, shareId);
            }
            else {
                return new Promise(function (resolve) {
                    resolve("");
                });
            }
        });
    };

    obj.getSelectedFileList = function () {
        var $Vue;
        if (document.querySelector(".c-file-list")) {
            $Vue = document.querySelector(".c-file-list").__vue__;
            if ($Vue.selectLength > 0) {
                return $Vue.selectedList;
            }
            else {
                return $Vue.fileList;
            }
        }
        else if (document.querySelector(".info-detail")) {
            $Vue = document.querySelector(".info-detail").__vue__;
            if (Object.keys($Vue.fileDetail).length) {
                return [$Vue.fileDetail];
            }
            else {
                return [];
            }
        }
        else {
            return [];
        }
    };

    obj.showBox = function (body) {
        if ($(".c-share").length == 0) {
            var style = document.createElement("style");
            style.textContent = ".c-share[data-v-66e962d0]{position:fixed;left:0;right:0;bottom:0;top:0;background:rgba(0,0,0,.2);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;z-index:5999}";
            document.head.appendChild(style);
            $("body").append('<section data-v-66e962d0 class="c-share" style="display: none;"></section>');
        }
        var attrName = document.querySelector(".c-share").getAttributeNames()[0];
        var template = '<div ' + attrName + ' class="share-content"><div ' + attrName + ' class="share-content-head"><span ' + attrName + ' class="share-content-head-span">文件下载</span><span ' + attrName + ' class="share-content-head-close">×</span></div><div ' + attrName + ' class="share-detail" style="height: 450px;"></div>';

        $(".c-share").append(template);
        $(".c-share .share-detail").append(body);
        $(".c-share").show();

        $(".c-share .share-content-head-close").off("click").on("click", function () {
            $(".c-share").hide();
            $(".c-share .share-content").remove();
        });
    };

    obj.showDownload = function () {
        var $Vue = document.querySelector(".p-main").__vue__;
        if (!$Vue.isLogin) {
            obj.showTipError("无法显示链接，请登录后重试");
            return;
        }

        var fileList = obj.getSelectedFileList();
        if (fileList.length == 0) {
            obj.showTipError("getSelectedFileList 获取选中文件出错");
            return;
        }

        obj.showTipLoading("正在获取链接...");
        var html = '<div style="padding: 20px; height: 450px; overflow-y: auto;">';
        var rowStyle = "margin:10px 0px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;";

        var shareId = window.location.href.match("/web/main/") ? null : obj.file_page.shareId;
        var retCount = 0;
        fileList.forEach(function (item, index) {
            if (item.isFolder) {
                html += '<p>' + (++index) + '：' + (item.fileName ? item.fileName : item.fileId) + ' || <font color="green">请进入文件夹下载</font></p>';
                html += '<p style="' + rowStyle + '"></p>';
                retCount++;
            }
            else {
                if (item.downloadUrl) {
                    html += '<p>' + (++index) + '：' + (item.fileName ? item.fileName : item.fileId) + '</p>';
                    html += '<p style="' + rowStyle + '"><a title="' + item.downloadUrl + '" href="' + item.downloadUrl + '" style="color: blue;">' + item.downloadUrl + '</a></p>';
                    retCount++;
                }
                else {
                    obj.getDownloadUrl(item.fileId, shareId).then(function (downloadUrl) {
                        item.downloadUrl = downloadUrl;
                        html += '<p>' + (++index) + '：' + (item.fileName ? item.fileName : item.fileId) + '</p>';
                        html += '<p style="' + rowStyle + '"><a title="' + item.downloadUrl + '" href="' + item.downloadUrl + '" style="color: blue;">' + item.downloadUrl + '</a></p>';
                        retCount++;
                    });
                }
            }
        });
        var waitId = setInterval(function(){
            if (retCount == fileList.length){
                html += '</div>';
                obj.showBox(html);
                obj.hideNotify();
                clearInterval(waitId);
            }
        }, 200);
    };

    obj.initDownloadPage = function () {
        if ($(".btn-show-link").length) {
            return;
        }
        if ($(".file-operate").length) {
            var node = document.querySelector(".file-operate a"), attrName = node ? node.getAttributeNames()[0] : "";
            $(".file-operate").append('<a ' + attrName + ' class="btn btn-show-link" style="margin-left: 60px;background: #2b89ea; position: relative">显示链接</a>');
            $(".btn").css({"margin-left": "5px", "margin-right": "5px"});
            $(".tips-save-box").css("display", "none");
            $(".btn-show-link").on("click", obj.showDownload);
        }
        else if ($(".FileHead_file-head-left_3AuQ6").length) {
            $(".FileHead_file-head-left_3AuQ6").append('<div class="FileHead_file-head-upload_kgWbF btn btn-show-link">显示链接</div>');
            $(".btn-show-link").on("click", obj.showDownload);
        }
    };

    obj.initPageFileInfo = function () {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener("load", function() {
                if (! (this.readyState == 4 && this.status == 200)) {
                    return;
                }

                var responseURL = this.responseURL;
                var response = this.response;
                if (response instanceof Object && response.res_code == 0) {
                    if (responseURL.indexOf("/checkAccessCode.action") > 0 || responseURL.indexOf("/getShareInfoByCodeV2.action") > 0) {
                        if (response.shareId) {
                            obj.file_page.shareId = response.shareId;
                        }
                    }
                    else if (responseURL.indexOf("/listShareDir.action") > 0 || responseURL.indexOf("/listFiles.action") > 0) {
                        if (response.fileListAO) {
                            obj.initDownloadPage();
                            obj.showTipSuccess("文件加载完成 共：" + (response.fileListAO.count || (response.fileListAO.fileList || []).length) + "项");
                        }
                    }
                }
            }, false);
            open.apply(this, arguments);
        };
    }();

    console.log("=== 天翼云盘 ===");
    console.log(obj);
    return obj;
    
};

export function aliyun() {
    'use strict';
    var $ = $ || window.$;
    var obj = {
        file_page: {
            parent_file_id: "root",
            order_by: "",
            order_direction: "",
            next_marker_list: [],
            items: []
        },
        video_page: {
            play_info: {},
            playerObject: {
                NativePlayer : {
                    name: "原生播放器",
                    container: "video"
                },
                DPlayer : {
                    name: "DPlayer播放器",
                    container: ".dplayer"
                }
            },
            file_id: "",
            elevideo: "",
            elequality: "",
            dPlayer: null,
            attributes: {},
            media_num: 0
        }
    };

    obj.initVideoPage = function () {
        obj.initButtonVideoPage();

        obj.initEventVideoPage();

        obj.getItem("default_player") == "NativePlayer" && obj.onNativeVideoPageEvent();
    };

    obj.initButtonVideoPage = function () {
        $(document).on("click", ".header-more--a8O0Y, .ant-dropdown-trigger", function() {
            if (document.querySelector("video")) {
                if ($(".ant-switch-lights").length == 0) {
                    $(".ant-dropdown-menu").append('<li class="ant-dropdown-menu-item ant-switch-lights" role="menuitem"><div class="outer-menu--ihDUR"><div>关灯</div></div></li>');
                }

                if ($(".ant-switch-player").length == 0) {
                    var preference = obj.getItem("default_player") || "DPlayer";
                    var players = obj.video_page.playerObject;
                    Object.keys(players).forEach(function(item) {
                        if (item != preference) {
                            $(".ant-dropdown-menu").append('<li class="ant-dropdown-menu-item ant-switch-player" role="menuitem" type=' + item + '><div class="outer-menu--ihDUR"><div>' + players[item].name + '</div></div></li>');
                        }
                    });
                }

                if ($(".ant-add-subtitle").length == 0) {
                    $(".ant-dropdown-menu").append('<li class="ant-dropdown-menu-item ant-add-subtitle" role="menuitem"><div class="outer-menu--ihDUR"><div>添加本地字幕</div></div></li>');
                }
            }
            else {
                $(".ant-switch-player").remove();
                $(".ant-add-subtitle").remove();
            }
        });
    };

    obj.initEventVideoPage = function () {
        obj.switchLights();

        obj.switchPlayer();

        obj.openLocalSubtitleFile();
    };

    obj.switchLights = function () {
        $(document).on("click", ".ant-switch-lights", function(event) {
            var thisText = $(this).children().children();
            var videoParents = $("video").closest("[class^=content]").children();
            if (thisText.text() == "关灯") {
                videoParents.css("background", "#000");
                thisText.text("开灯");
                if (obj.isHomePage()) {
                    $("[class^=toolbar-wrapper]").css("opacity", .1);
                }
            }
            else {
                videoParents.css("background", "");
                thisText.text("关灯");
                if (obj.isHomePage()) {
                    $("[class^=toolbar-wrapper]").css("opacity", 1);
                }
            }
        });

        $(document).on("click", "[data-icon-type=PDSClose]", function(event) {
            var thisText = $(".ant-switch-lights").children().children();
            if (thisText.text() == "开灯") {
                $("video").closest("[class^=content]").children().css("background", "");
                thisText.text("关灯");
                if (obj.isHomePage()) {
                    $("[class^=toolbar-wrapper]").css("opacity", 1);
                }
            }
        });
    };

    obj.switchPlayer = function () {
        $(document).on("click", ".ant-switch-player", function(event) {
            var $this = $(this), $thisType = $this.attr("type");
            var players = obj.video_page.playerObject;
            obj.showTipSuccess("正在切换到" + players[$thisType].name);

            var currentPlayer = obj.getItem("default_player");
            var currentPlayerObject = players[currentPlayer];

            $this.attr("type", currentPlayer);
            $this.children().children().text(currentPlayerObject.name);

            var container = currentPlayerObject.container;
            if ($thisType == "NativePlayer") {
                $(container).parent().append(obj.video_page.elevideo);
                $(container).remove();

                obj.video_page.dPlayer = null;
                obj.onNativeVideoPageEvent();

                $(".video-player--29_72").css({display: "block"});
                $(".video-player--29_72 .btn--1cZfA").click();
            }
            else {
                obj.offNativeVideoPageEvent();
            }

            obj.setItem("default_player", $thisType);
            obj.autoPlayer();
        });
    };

    obj.openLocalSubtitleFile = function () {
        $(document).on("click", ".ant-add-subtitle", function(event) {
            if (obj.getItem("default_player") == "NativePlayer") {
                obj.showTipSuccess("暂不支持原生播放器");
                return;
            }

            if ($("#addsubtitle").length == 0) {
                $("body").append('<input id="addsubtitle" type="file" accept=".srt,.ass,.ssa" style="display: none;">');
            }

            $("#addsubtitle").click();
        });
    };

    obj.onNativeVideoPageEvent = function () {
        $(document).on("DOMNodeInserted", ".video-player--29_72 .btn--1cZfA", function() {
            var video = document.querySelector("video");
            if (video.paused) {
                $(this).click();
                setTimeout(function () {
                    try {
                        video.paused && video.play();
                        $(".video-player--29_72").css({opacity: 0});
                    } catch (a) {};
                }, 500);
            }
        });

        $(document).on("click", "video", function(event) {
            var elevideo = $(this).get(0);
            elevideo.paused && elevideo.play() || elevideo.pause();

            var opacity = elevideo.paused ? .9 : 0;
            $(".video-player--29_72").css({opacity: opacity});
        });

        $(document).on("mouseover mouseout mousedown", ".video-player--29_72", function(event) {
            var that = this;
            if (event.type == "mouseover" || event.type == "mouseout") {
                var opacity = event.type == "mouseover" ? .9 : 0;
                $(that).css({opacity: opacity});
                return;
            }

            var positionDiv = $(that).children("div:first").offset();
            var distenceX = event.pageX - positionDiv.left;
            var distenceY = event.pageY - positionDiv.top;

            $(document).mousemove(function(event){
                $(that).css({cursor: "move"});
                var $that = $(that).children("div:first");
                var $document = $(document);

                var offsetX = event.pageX - distenceX;
                var offsetY = event.pageY - distenceY;
                if(offsetX < 0) {
                    offsetX = 0;
                }
                else {
                    var widthDifference = $document.width() - $that.outerWidth(true);
                    if (offsetX > widthDifference) {
                        offsetX = widthDifference;
                    }
                }

                if(offsetY < 0){
                    offsetY = 0;
                }
                else {
                    var heightDifference = $document.height() - $that.outerHeight(true);
                    if(offsetY > heightDifference) {
                        offsetY = heightDifference;
                    }
                }

                $that.offset({
                    left: offsetX,
                    top: offsetY
                })
            })

            $(document).mouseup(function(e){
                $(that).css({cursor: ""});
                $(document).off("mousemove");
            })
        });
    };
    
    obj.dPlayerHotkey = function () {
        if (!window.dPlayerHotkey) {
            window.dPlayerHotkey = true;
        }
        else {
            return;
        }

        document.addEventListener("keydown", (function(e) {
            var t = obj.video_page.dPlayer;
            if (t && document.getElementById("dplayer")) {
                var a = document.activeElement.tagName.toUpperCase()
                , n = document.activeElement.getAttribute("contenteditable");
                if ("INPUT" !== a && "TEXTAREA" !== a && "" !== n && "true" !== n) {
                    var o, r = e || window.event;
                    switch (r.keyCode) {
                        case 13:
                            r.preventDefault();
                            t.fullScreen.toggle("web");
                            break;
                        case 32:
                            r.preventDefault();
                            t.toggle();
                            break;
                        case 37:
                            r.preventDefault();
                            t.seek(t.video.currentTime - 5);
                            t.controller.setAutoHide();
                            break;
                        case 39:
                            r.preventDefault();
                            t.seek(t.video.currentTime + 5);
                            t.controller.setAutoHide();
                            break;
                        case 38:
                            r.preventDefault();
                            o = t.volume() + .1;
                            t.volume(o);
                            break;
                        case 40:
                            r.preventDefault();
                            o = t.volume() - .1;
                            t.volume(o);
                            break;
                        case 36:
                            r.preventDefault();
                            o = document.querySelector("[data-icon-type=PDSChevronLeft]");
                            o && o.click();
                            break;
                        case 35:
                            r.preventDefault();
                            o = document.querySelector("[data-icon-type=PDSChevronRight]");
                            o && o.click();
                            break;
                    }
                }
            }
        }));
    };

    obj.getVideoPreviewPlayInfo = function () {
        if (window.location.href.includes("aliyundrive.com/s/")) {
            obj.get_share_link_video_preview_play_info();
        }
        else {
            obj.get_video_preview_play_info();
        }
    };

    obj.get_share_link_video_preview_play_info = function (callback) {
        var token = obj.getItem("token") || {}, share_id = obj.getShareId(), file_id = obj.video_page.play_info.file_id;
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_share_link_video_preview_play_info",
            data: JSON.stringify({
                category: "live_transcoding",
                file_id: file_id,
                get_preview_url: true,
                share_id: share_id,
                template_id: ""
            }),
            headers: {
                "authorization": "".concat(token.token_type || "", " ").concat(token.access_token || ""),
                "content-type": "application/json;charset=UTF-8",
                "x-share-token": obj.getItem("shareToken").share_token
            },
            async: true,
            success: function (response) {
                callback && callback(response);
            },
            error: function (error) {
                if (error.responseJSON.code == "AccessTokenInvalid") {
                    obj.refresh_token(function (response) {
                        if (response instanceof Object) {
                            obj.get_share_link_video_preview_play_info(callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else if (error.responseJSON.code == "ShareLinkTokenInvalid") {
                    obj.get_share_token(function (response) {
                        if (response instanceof Object) {
                            obj.get_share_link_video_preview_play_info(callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else {
                    console.error("get_share_link_video_preview_play_info 错误", error);
                    if (error.responseJSON.code == "InvalidParameterNotMatch.ShareId") {
                        obj.showTipError("错误：参数不匹配，此错误可能是打开了另一个分享链接导致，请刷新", 10000);
                    }
                    callback && callback("");
                }
            }
        });
    };

    obj.get_video_preview_play_info = function (callback) {
        var token = obj.getItem("token") || {}, file_id = obj.video_page.play_info.file_id;
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_video_preview_play_info",
            data: JSON.stringify({
                category: "live_transcoding",
                drive_id: token.default_drive_id,
                file_id: file_id,
                template_id: ""
            }),
            headers: {
                "authorization": "".concat(token.token_type || "", " ").concat(token.access_token || ""),
                "content-type": "application/json;charset=UTF-8",
            },
            async: true,
            success: function (response) {
                callback && callback(response);
            },
            error: function (error) {
                if (error.responseJSON.code == "AccessTokenInvalid") {
                    obj.refresh_token(function (response) {
                        if (response instanceof Object) {
                            obj.get_video_preview_play_info(callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else {
                    console.error("get_video_preview_play_info 错误", error);
                    callback && callback("");
                }
            }
        });
    };

    obj.expires = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6e3
        , n = e.match(/&x-oss-expires=(\d+)&/);
        return !n || n && n[1] && +"".concat(n[1], "000") - t < Date.now();
    };

    obj.addCueVideoSubtitle = function () {
        obj.getSubtitles(function (subtitles) {
            if (subtitles.length) {
                var video = document.querySelector("video");
                if (video) {
                    var textTrackCue, textTrackList = video.textTracks;
                    if (textTrackList.length == 0) {
                        video.addTextTrack("subtitles", "", "");
                    }

                    var textTrack = textTrackList[0];
                    if (textTrack.cues && textTrack.cues.length) {
                        textTrack.mode == "showing" || (textTrack.mode = "showing");
                        return;
                    }
                    textTrack.mode == "hidden" || (textTrack.mode = "hidden");
                    subtitles.forEach(function (item, index) {
                        textTrackCue = new VTTCue(item.startTime, item.endTime, item.text);
                        textTrackCue.id = item.index;
                        textTrack.addCue(textTrackCue);
                    });

                    if (textTrack.cues && textTrack.cues.length) {
                        textTrack.mode = "showing";
                        obj.showTipSuccess("字幕添加完成");
                    }
                }
            }
        });
    };

    obj.getSubtitles = function (callback) {
        var play_info = obj.video_page.play_info;
        if (play_info.subtitleText) {
            var subtitles = obj.parseTextToArray(play_info.subtitle_extension, play_info.subtitleText);
            if (subtitles.length) {
                callback && callback(subtitles);
                return;
            }
        }

        obj.getFilesSubtitleText(function (fileList) {
            if (fileList.length) {
                for (var i = 0; i < fileList.length; i++) {
                    var fileInfo = fileList[i];
                    if (fileInfo.subtitleText) {
                        var subtitles = obj.parseTextToArray(fileInfo.file_extension, fileInfo.subtitleText);
                        if (subtitles.length) {
                            callback && callback(subtitles);
                            return;
                        }
                    }
                }
            }
            else {
                callback && callback([]);
            }
        });

        obj.localFilesSubtitleText(function (fileInfo) {
            if (fileInfo.subtitleText) {
                var subtitles = obj.parseTextToArray(fileInfo.file_extension, fileInfo.subtitleText);
                if (subtitles.length) {
                    var fileList = obj.file_page.items;
                    var file_id = obj.video_page.play_info.file_id;
                    for (var i = 0; i < fileList.length; i++) {
                        if (fileList[i].file_id == file_id) {
                            obj.file_page.items[i].subtitleText = fileInfo.subtitleText;
                            obj.file_page.items[i].subtitle_extension = fileInfo.file_extension;
                            break;
                        }
                    }
                    callback && callback(subtitles);
                }
            }
            else {
                callback && callback([]);
            }
        });
    };

    obj.getFilesSubtitleText = function (callback) {
        var subtitleFiles = obj.findSubtitleFiles();
        if (subtitleFiles.length) {
            var results = [];
            subtitleFiles.forEach(function (item, index) {
                obj.addToFileSubtitleText(item, function (fileInfo) {
                    results.push(fileInfo);
                    if (++index == subtitleFiles.length) {
                        callback && callback(results);
                    }
                });
            });
        }
        else {
            callback && callback([]);
        }
    };

    obj.addToFileSubtitleText = function (fileInfo, callback) {
        if (fileInfo instanceof Object) {
            if (fileInfo.hasOwnProperty("subtitleText")) {
                callback && callback(fileInfo);
            }
            else if (fileInfo.hasOwnProperty("download_url")) {
                obj.getSubtitleText(fileInfo.download_url, function (subtitleText) {
                    if (subtitleText) {
                        fileInfo.subtitleText = subtitleText;
                    }
                    callback && callback(fileInfo);
                });
            }
            else {
                obj.getShareLinkDownloadUrl(fileInfo.file_id, obj.getShareId(), function (download_url) {
                    if (download_url) {
                        obj.getSubtitleText(download_url, function (subtitleText) {
                            if (subtitleText) {
                                fileInfo.subtitleText = subtitleText;
                            }
                            callback && callback(fileInfo);
                        });
                    }
                    else {
                        callback && callback(fileInfo);
                    }
                });
            }
        }
        else {
            callback && callback({});
        }
    };

    obj.localFilesSubtitleText = function (callback) {
        $(document).on("change", "#addsubtitle", function(event) {
            if (this.files.length) {
                var file = this.files[0];
                var file_extension = file.name.split(".").pop().toLowerCase();
                var subtitle_extension = Object.keys(obj.subtitleParser());
                if (!(file_extension && subtitle_extension.includes(file_extension))) {
                    obj.showTipError("暂不支持此类型文件");
                    return [];
                }

                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = function(e) {
                    var result = reader.result;
                    if (result.indexOf("�") > -1) {
                        return reader.readAsText(file, "GBK");
                    }
                    callback && callback({file_extension: file_extension, subtitleText: result});
                };
            }
        });
    };

    obj.findSubtitleFiles = function () {
        var fileList = obj.file_page.items;
        if (fileList.length == 0) {
            console.error("致命错误：劫持文件列表失败");
            return [];
        }
        var play_info = obj.video_page.play_info, video_file_id = play_info.file_id, video_name = "";
        if (video_file_id) {
            if (play_info.name) {
                video_name = play_info.name.replace("." + play_info.file_extension, "");
            }
            else {
                for (var i = 0; i < fileList.length; i++) {
                    if (fileList[i].file_id == video_file_id) {
                        obj.video_page.play_info = Object.assign(fileList[i], obj.video_page.play_info);
                        video_name = fileList[i].name.replace("." + fileList[i].file_extension, "");
                        break;
                    }
                }
            }

            video_name = (/.+\.s\d+e\d+/i.exec(video_name) || [])[0] || video_name;
            if (video_name) {
                video_name = video_name.toLowerCase();
            }
            else {
                console.error("致命错误：寻找视频名称失败");
                return [];
            }
        }
        else {
            console.error("致命错误：劫持视频信息失败");
            return [];
        }

        var subtitleFileList = [], exactlySubtitleFileList = [], videoFileList = [];
        var subtitle_extension = Object.keys(obj.subtitleParser());
        var file_extension, file_name;
        fileList.forEach(function (item, index) {
            if (item.type == "file") {
                file_extension = item.file_extension.toLowerCase();
                if (subtitle_extension.includes(file_extension)) {
                    file_name = item.name.replace("." + item.file_extension, "").toLowerCase();
                    if (file_name.includes(video_name) || video_name.includes(file_name)) {
                        exactlySubtitleFileList.push(item);
                    }
                    else {
                        subtitleFileList.push(item);
                    }
                }
                else if (item.category == "video") {
                    videoFileList.push(item);
                }
            }
        });

        if (exactlySubtitleFileList.length) {
            return exactlySubtitleFileList;
        }
        else if (subtitleFileList.length == 1 || videoFileList.length == 1) {
            return subtitleFileList;
        }
        else {
            return [];
        }
    };

    obj.getSubtitleText = function (url, callback) {
        axios({
            method: "get",
            url : url,
            headers: {
                referer: "https://www.aliyundrive.com/"
            },
            responseType: "blob",
            onload: function(result){
                if (result.status == 200) {
                    var blob = result.response;
                    var reader = new FileReader();
                    reader.readAsText(blob, 'UTF-8');
                    reader.onload = function(e) {
                        var result = reader.result;
                        if (result.indexOf("�") > -1) {
                            return reader.readAsText(blob, "GBK");
                        }
                        callback && callback(result);
                    };
                }
                else {
                    callback && callback("");
                }
            },
            onerror: function (error) {
                callback && callback("");
            }
        });
    };

    obj.parseTextToArray = function (subtitleType, subtitleText) {
        subtitleType = subtitleType.toLowerCase();
        var subtitleParser = obj.subtitleParser(), method = subtitleParser[subtitleType];
        if (method) {
            var itemArray = method.getItems(subtitleText);
            if (itemArray.length) {
                return method.getInfo(itemArray)
            }
            else {
                return [];
            }
        }
        else {
            return [];
        }
    };

    obj.subtitleParser = function() {
        return {
            srt: {
                getItems(text) {
                    text = text.replace(/\r/g, "");
                    var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) -?-> (\d{2}:\d{2}:\d{2},\d{3})/g;
                    var data = text.split(regex);
                    data.shift();
                    return data;
                },
                getInfo(data) {
                    var items = [];
                    for (var i = 0; i < data.length; i += 4) {
                        items.push({
                            index: parseInt(data[i]),
                            startTime: obj.toSeconds(data[i + 1]),
                            endTime: obj.toSeconds(data[i + 2]),
                            text: data[i + 3].trim().replace(/{.*?}/g, "")
                        });
                    }
                    return items;
                }
            },
            ass: {
                getItems(text) {
                    text = text.replace(/\r\n/g, "");
                    var regex = /Dialogue: \d+,(\d+:\d{2}:\d{2}\.\d{2}),(\d+:\d{2}:\d{2}\.\d{2}),.*?,\d+,\d+,\d+,,/g;
                    var data = text.split(regex);
                    data.shift();
                    return data;
                },
                getInfo(data) {
                    var items = [];
                    for (var i = 0; i < data.length; i += 3) {
                        items.push({
                            index: items.length,
                            startTime: obj.toSeconds(data[i]),
                            endTime: obj.toSeconds(data[i + 1]),
                            text: data[i + 2].trim().replace(/\\N/g, "\n").replace(/{.*?}/g, "")
                        });
                    }
                    return items;
                }
            },
            ssa: {
                getItems(text) {
                    text = text.replace(/\r\n/g, "");
                    var regex = /Dialogue: \d+,(\d+:\d{2}:\d{2}\.\d{2}),(\d+:\d{2}:\d{2}\.\d{2}),.*?,\d+,\d+,\d+,,/g;
                    var data = text.split(regex);
                    data.shift();
                    return data;
                },
                getInfo(data) {
                    var items = [];
                    for (var i = 0; i < data.length; i += 3) {
                        items.push({
                            index: items.length,
                            startTime: obj.toSeconds(data[i]),
                            endTime: obj.toSeconds(data[i + 1]),
                            text: data[i + 2].trim().replace(/\\N/g, "\n").replace(/{.*?}/g, "")
                        });
                    }
                    return items;
                }
            }
        };
    };

    obj.toSeconds = function (timeStr) {
        var _timeArr = timeStr.split(","), timeArr = _timeArr[0].split(':');
        var timeSec = 0;
        for (var i = 0; i < timeArr.length; i++) {
            timeSec += 60 ** (timeArr.length - i - 1) * parseFloat(timeArr[i]);
        }
        return timeSec + parseFloat(_timeArr[1] || 0) / 1000;
    };

    obj.unlockPageFileLimit = function () {
        (function(open) {
            XMLHttpRequest.prototype.open = function() {
                if (!this._hooked) {
                    this._hooked = true;
                    setupHook(this);
                }
                open.apply(this, arguments);
            }
        })(XMLHttpRequest.prototype.open);

        function setupHook(xhr) {
            function setup() {
                Object.defineProperty(xhr, "responseText", {
                    get: function() {
                        delete xhr.responseText;
                        var responseJson, responseURL = xhr.responseURL, responseText = xhr.responseText;
                        if (responseURL.includes("/file/list") && responseText.includes("items")) {
                            responseJson = JSON.parse(responseText);
                            responseJson.items.forEach(function (item) {
                                if (item.category && item.category == "video") {
                                    if (["ts"].includes(item.file_extension)) {
                                        item.file_extension = "mp4";
                                    }
                                }

                                if (item.punish_flag && item.punish_flag != 0) {
                                    item.punish_flag = 0;
                                }
                            });
                            responseText = JSON.stringify(responseJson);
                        }
                        else if (responseURL.includes("/file/get_share_link_video_preview_play_info") && responseText && responseText.includes("preview_url")) {
                            responseJson = JSON.parse(responseText);
                            responseJson.video_preview_play_info.live_transcoding_task_list.forEach(function (item) {
                                item.preview_url = item.url || item.preview_url;
                            });
                            responseText = JSON.stringify(responseJson);
                        }

                        setup();
                        return responseText;
                    },
                    configurable: true
                });
            }

            setup();
        }
    };

    obj.customSharePwd = function () {
        $(document).on("DOMNodeInserted", ".ant-modal-root", function() {
            if ($(this).find(".ant-modal-title").text() == "分享文件") {
                if ($(".input-share-pwd").length == 0) {
                    if ($(".choose-expiration-wrapper--vo0z9").length) {
                        var sharePwd = localStorage.getItem("share_pwd");
                        var html = '<label class="label--3Ub6A" style="margin-left: 12px;">自定义提取码</label>';
                        html += '<input type="text" class="ant-input input-share-pwd" value="' + (sharePwd ? sharePwd : "") + '" placeholder="" style="width: 100px;height: 25px;line-height: normal;border: 1px solid #D4D7DE;text-align: center;"></div>';
                        $(".choose-expiration-wrapper--vo0z9").append(html);
                    }
                }
            }
        });

        (function(send) {
            XMLHttpRequest.prototype.send = function() {
                if (arguments.length && typeof arguments[0] == "string" && arguments[0].includes("expiration")) {
                    var sharePwd = localStorage.getItem("share_pwd");
                    if (sharePwd) {
                        var body = JSON.parse(arguments[0]);
                        body.share_pwd = sharePwd;
                        arguments[0] = JSON.stringify(body);

                        this.addEventListener("load", function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var url = this.responseURL;
                                if (url.includes("/share_link/create") || url.includes("/share_link/update")) {
                                    if (this.response.includes(sharePwd)) {
                                        obj.showTipSuccess("自定义分享密码 成功");
                                    }
                                    else {
                                        localStorage.removeItem("share_pwd");
                                        obj.showTipError("自定义分享密码 失败，请修改分享密码后重试");
                                    }
                                }
                            }
                        }, false);
                    }
                }
                send.apply(this, arguments);
            };
        })(XMLHttpRequest.prototype.send);

        $(document).on("change", ".input-share-pwd", function () {
            var value = this.value;
            localStorage.setItem("share_pwd", value);
        });
    };

    obj.initDownloadSharePage = function () {
        if ($(".button-download--batch").length) {
            return;
        }
        if ($("#root [class^=banner] [class^=right]").length) {
            var html = '<button class="button--2Aa4u primary--3AJe5 small---B8mi button-download--batch" style="margin-right: 28px;">显示链接</button>';
            $("#root [class^=banner] [class^=right]").prepend(html);
            $(".button-download--batch").on("click", obj.showDownloadSharePage);
        }
        else {
            setTimeout(obj.initDownloadSharePage, 500)
        }
    };

    obj.initDownloadHomePage = function () {
        if ($(".button-download--batch").length) {
            return;
        }
        if ($("#root header").length) {
            var html = '<div style="margin:0px 8px;"></div><button class="button--2Aa4u primary--3AJe5 small---B8mi button-download--batch">显示链接</button>';
            $("#root header:eq(0)").append(html);
            $(".button-download--batch").on("click", obj.showDownloadHomePage);
        }
        else {
            setTimeout(obj.initDownloadHomePage, 1000)
        }
    };

    obj.showDownloadSharePage = function () {
        var token = obj.getItem("token");
        if (token && token.access_token && obj.isLogin()) {
            obj.showTipLoading("正在获取链接...");
        }
        else {
            obj.showTipError("缺少必要参数，请登陆后刷新此页面重试！");
            return;
        }

        var fileList = obj.getSelectedFileList();
        if (fileList.length == 0) {
            console.error("致命错误：获取分享文件列表失败");
            obj.showTipError("致命错误：获取分享文件列表失败");
            return;
        }

        obj.showBox('<div class="item-list" style="padding: 20px; height: 410px; overflow-y: auto;"></div>');
        var rowStyle = "margin:10px 0px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;";

        var share_id = obj.getShareId();
        fileList.forEach(function (item, index) {
            var html = '<p>' + (++index) + '：' + item.name + '</p>';
            if (item.download_url) {
                html += '<p style="' + rowStyle + '"><a title="' + item.download_url + '" href="' + item.download_url + '" style="color: blue;">' + item.download_url + '</a></p>';
                $(".item-list").append(html);
            }
            else {
                if (item.type == "folder") {
                    html += '<p style="' + rowStyle + '"><font color="green">&emsp;&emsp;请进入文件夹下载</font></p>';
                    $(".item-list").append(html);
                }
                else {
                    setTimeout(function() {
                        obj.getShareLinkDownloadUrl(item.file_id, share_id, function (download_url) {
                            item.download_url = download_url;
                            html += '<p style="' + rowStyle + '"><a title="' + item.download_url + '" href="' + item.download_url + '" style="color: blue;">' + item.download_url + '</a></p>';
                            $(".item-list").append(html);
                        });
                    }, 66 * index);
                }
            }
        });

        obj.hideTip();
    };

    obj.showDownloadHomePage = function () {
        var token = obj.getItem("token");
        if (token && token.access_token) {
            obj.showTipLoading("正在获取链接...");
        }
        else {
            obj.showTipError("缺少必要参数，请刷新此页面重试！");
            return;
        }

        var fileList = obj.getSelectedFileList();
        if (fileList.length == 0) {
            console.error("致命错误：获取个人文件列表失败");
            obj.showTipError("致命错误：获取个人文件列表失败");
            return;
        }

        obj.showBox('<div class="item-list" style="padding: 20px; height: 410px; overflow-y: auto;"></div>');
        var rowStyle = "margin:10px 0px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;";
        var Re = function(e) {
            var t = document.createElement("a");
            t.rel = "noopener";
            t.href = e;
            t.download = "download";
            //t.target = "_blank";
            (function(e) {
                try {
                    e.dispatchEvent(new MouseEvent("click"))
                } catch (n) {
                    var t = document.createEvent("MouseEvents");
                    t.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null);
                    e.dispatchEvent(t);
                }
            }(t));
        };

        fileList.forEach(function (item, index) {
            var html = '<p>' + (++index) + '：' + item.name + '</p>';
            if (item.download_url) {
                html += '<p style="' + rowStyle + '"><a title="' + item.download_url + '" style="color: blue;">' + item.download_url + '</a></p>';
                $(".item-list").append(html);
            }
            else {
                if (item.type == "folder") {
                    html += '<p style="' + rowStyle + '"><font color="green">&emsp;&emsp;请进入文件夹下载</font></p>';
                    $(".item-list").append(html);
                }
                else {
                    setTimeout(function() {
                        obj.getHomeLinkDownloadUrl(item.file_id, item.drive_id, function (download_url) {
                            item.download_url = download_url;
                            html += '<p style="' + rowStyle + '"><a title="' + item.download_url + '" style="color: blue;">' + item.download_url + '</a></p>';
                            $(".item-list").append(html);
                        });
                    }, 66 * index);
                }
            }
        });

        obj.hideTip();

        $(document).on("click", ".item-list a", function(event) {
            var url = $(this).attr("href");
            if (!url) {
                url = $(this).attr("title");
                Re(url);
            }
        });
    };

    obj.showBox = function (body) {
        var template = '<div class="ant-modal-root ant-modal-my"><div class="ant-modal-mask"></div><div tabindex="-1" class="ant-modal-wrap" role="dialog"><div role="document" class="ant-modal modal-wrapper--2yJKO" style="width: 666px;"><div class="ant-modal-content"><div class="ant-modal-header"><div class="ant-modal-title" id="rcDialogTitle1">文件下载</div></div><div class="ant-modal-body"><div class="icon-wrapper--3dbbo"><span data-role="icon" data-render-as="svg" data-icon-type="PDSClose" class="close-icon--33bP0 icon--d-ejA "><svg viewBox="0 0 1024 1024"><use xlink:href="#PDSClose"></use></svg></span></div>';
        template += body;
        template += '</div><div class="ant-modal-footer"><div class="footer--1r-ur"><div class="buttons--nBPeo"><button class="button--2Aa4u primary--3AJe5 small---B8mi">IDM 导出文件</button></div></div></div></div></div></div></div>';
        $("body").append(template);

        $(".icon-wrapper--3dbbo").one("click", function () {
            $(".ant-modal-my").remove();
        });

        $(".ant-modal-my button").off("click").on("click", function () {
            var content = "", referer = "https://www.aliyundrive.com/", userAgent = navigator.userAgent;
            $(".item-list a").each(function (index, value) {
                content += ["<", this.title, "referer: " + referer, "User-Agent: " + userAgent, ">"].join("\r\n") + "\r\n";
            });
            obj.downloadFile(content, "IDM 导出文件.ef2")
        });

        //$(".ant-modal.modal-wrapper--2yJKO").css({width: "666px"}); //调整宽度（"666px" 改成 "777px"  "888px"  "999px" ...）
        $(".ant-modal-wrap").off("click").on("click", function (event) {
            //点击链接窗口外部自动关闭窗口
            if ($(event.target).closest(".ant-modal-content").length == 0) {
                $(".ant-modal-my").remove();
            }
        });
    };

    obj.downloadFile = function(content, filename) {
        var a = document.createElement("a");
        var blob = new Blob([content]);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    obj.getSelectedFileList = function () {
        var selectedFileList = [], fileList = obj.file_page.items;
        if (fileList.length == 0) {
            console.error("致命错误：劫持文件列表失败");
            return [];
        }

        var $node = "";
        if ($(".tbody--3Y4Fn  .tr--5N-1q.tr--3Ypim").length) {
            $node = $(".tbody--3Y4Fn  .tr--5N-1q.tr--3Ypim");
        }
        else if ($(".outer-wrapper--25yYA").length) {
            $node = $(".outer-wrapper--25yYA");
        }
        $node.each(function (index) {
            var $this = $(this);
            if ($this.attr("data-is-selected") == "true") {
                var data_index = $this.closest("[data-index]").attr("data-index");
                data_index && selectedFileList.push(fileList[data_index]);
            }
        });

        return selectedFileList.length ? selectedFileList : fileList;
    };

    obj.getShareLinkDownloadUrl = function (file_id, share_id, callback) {
        var token = obj.getItem("token") || {};
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_share_link_download_url",
            data: JSON.stringify({
                expire_sec: 600,
                file_id: file_id,
                share_id: share_id
            }),
            headers: {
                "authorization": "".concat(token.token_type || "", " ").concat(token.access_token || ""),
                "content-type": "application/json;charset=utf-8",
                "x-share-token": obj.getItem("shareToken").share_token
            },
            async: true,
            success: function (response) {
                if (response instanceof Object && response.download_url) {
                    callback && callback(response.download_url);
                }
                else {
                    console.error("getShareLinkDownloadUrl 失败", response);
                    callback && callback("");
                }
            },
            error: function (error) {
                if (error.responseJSON.code == "AccessTokenInvalid") {
                    obj.refresh_token(function (response) {
                        if (response instanceof Object) {
                            obj.getShareLinkDownloadUrl(file_id, share_id, callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else if (error.responseJSON.code == "ShareLinkTokenInvalid") {
                    obj.get_share_token(function (response) {
                        if (response instanceof Object) {
                            obj.getShareLinkDownloadUrl(file_id, share_id, callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else {
                    console.error("getShareLinkDownloadUrl 错误", error);
                    if (error.responseJSON.code == "InvalidParameterNotMatch.ShareId") {
                        obj.showTipError("错误：参数不匹配，此错误可能是打开了另一个分享页面导致，请刷新", 10000);
                    }
                    callback && callback("");
                }
            }
        });
    };

    obj.getHomeLinkDownloadUrl = function (file_id, drive_id, callback) {
        var token = obj.getItem("token") || {};
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/file/get_download_url",
            data: JSON.stringify({
                drive_id: drive_id,
                file_id: file_id
            }),
            headers: {
                "authorization": "".concat(token.token_type || "", " ").concat(token.access_token || ""),
                "content-type": "application/json;charset=utf-8"
            },
            async: true,
            success: function (response) {
                if (response instanceof Object && response.url) {
                    callback && callback(response.url);
                }
                else {
                    console.error("getHomeLinkDownloadUrl 失败", response);
                    callback && callback("");
                }
            },
            error: function (error) {
                if (error.responseJSON.code == "AccessTokenInvalid") {
                    obj.refresh_token(function (response) {
                        if (response instanceof Object) {
                            obj.getHomeLinkDownloadUrl(file_id, drive_id, callback);
                        }
                        else {
                            callback && callback("");
                        }
                    });
                }
                else {
                    console.error("getHomeLinkDownloadUrl 错误", error);
                    callback && callback("");
                }
            }
        });
    };

    obj.refresh_token = function (callback) {
        var token = obj.getItem("token");
        if (!(token && token.refresh_token)) {
            obj.showTipError("缺少必要参数，请登陆后刷新此页面重试！", 10000);
            callback && callback("");
            return;
        }
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/token/refresh",
            data: JSON.stringify({
                refresh_token: token.refresh_token
            }),
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
            success: function (response) {
                if (response instanceof Object && response.access_token) {
                    obj.showTipLoading("更新 token");
                    delete response.user_data;
                    obj.setItem("token", response);
                    callback && callback(response);
                }
                else {
                    callback && callback("");
                }
            },
            error: function () {
                callback && callback("");
            }
        });
    };

    obj.get_share_token = function (callback) {
        $.ajax({
            type: "post",
            url: "https://api.aliyundrive.com/v2/share_link/get_share_token",
            data: JSON.stringify({
                share_id: obj.getShareId(),
                share_pwd: ""
            }),
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
            success: function (response) {
                if (response instanceof Object && response.share_token) {
                    obj.showTipLoading("更新 share_token");
                    obj.setItem("shareToken", response);
                    callback && callback(response);
                }
                else {
                    callback && callback("");
                }
            },
            error: function (error) {
                if (error.responseJSON.code == "InvalidResource.SharePwd") {
                    obj.showTipError("更新share_token错误，请刷新并重新填写提取码", 10000);
                }
                callback && callback("");
            }
        });
    };

    obj.loadScript = function (src) {
        if (!window.instances) {
            window.instances = {};
        }
        if (!window.instances[src]) {
            window.instances[src] = new Promise((resolve, reject) => {
                const script = document.createElement("script")
                script.src = src;
                script.type = "text/javascript";
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
        return window.instances[src];
    };

    obj.loadStyle = function (href) {
        if (!window.instances) {
            window.instances = {};
        }
        if (!window.instances[href]) {
            window.instances[href] = new Promise((resolve, reject) => {
                const style = document.createElement("link");
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = href;
                style.onload = resolve;
                style.onerror = reject;
                document.head.appendChild(style);
            });
        }
        return window.instances[href];
    };

    obj.switchViewArrow = function () {
        var parent_file_id = ((window.location.href.match(/\/folder\/(\w+)/) || [])[1]) || "root";
        if (window.parent_file_id != parent_file_id) {
            window.parent_file_id = parent_file_id;
            var dragDom = document.querySelector("[data-icon-type=PDSDrag]");
            dragDom && dragDom.click();
            var arrowDown = document.querySelector("[data-icon-type=PDSArrowDown]");
            arrowDown && arrowDown.click();
        }

        var listViewType = obj.getItem("listViewType");
        if (listViewType) {
            var iconDom = listViewType == "PDSDrag" ? document.querySelector("[data-icon-type=PDSDrag]") : document.querySelector("[data-icon-type=PDSSquareGrid]");
            iconDom && iconDom.click();
        }

        $(document).off("click", "[class^=switch-wrapper]").on("click", "[class^=switch-wrapper]", function() {
            var iconType = this.firstChild.getAttribute("data-icon-type");
            if (iconType) {
                obj.setItem("listViewType", iconType);
                obj.showTipSuccess("切换默认视图为：" + {PDSDrag: "列表模式", PDSSquareGrid: "图标模式"}[iconType], 5000);
            }
        });
    };

    obj.getShareId = function () {
        var url = window.location.href;
        var match = url.match(/aliyundrive\.com\/s\/([a-zA-Z\d]+)/);
        return match ? match[1] : null;
    };

    obj.isHomePage = function () {
        var url = window.location.href;
        if (url.indexOf("aliyundrive.com/drive") > 0) {
            return true;
        }
        else {
            return false;
        }
    };

    obj.isLogin = function () {
        return !document.querySelector("[class^=login]");
    };

    obj.getItem = function(n) {
        n = window.localStorage.getItem(n);
        if (!n) {
            return null;
        }
        try {
            return JSON.parse(n);
        } catch (e) {
            return n;
        }
    };

    obj.setItem = function(n, t) {
        n && t && window.localStorage.setItem(n, t instanceof Object ? JSON.stringify(t) : t);
    };

    obj.showTipSuccess = function (msg, timeout) {
        obj.hideTip();

        var $element = $(".aDrive div");
        if ($element.length) {
            $element.append('<div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-success"><span data-role="icon" data-render-as="svg" data-icon-type="PDSCheckmarkCircleFill" class="success-icon--2Zvcy icon--d-ejA "><svg viewBox="0 0 1024 1024"><use xlink:href="#PDSCheckmarkCircleFill"></use></svg></span><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 44px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div>');
        }
        else {
            $(document.body).append('<div class="aDrive"><div><div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-success"><span data-role="icon" data-render-as="svg" data-icon-type="PDSCheckmarkCircleFill" class="success-icon--2Zvcy icon--d-ejA "><svg viewBox="0 0 1024 1024"><use xlink:href="#PDSCheckmarkCircleFill"></use></svg></span><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 44px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div></div></div></div>');
        }

        setTimeout(function () {
            obj.hideTip();
        }, timeout || 3000);
    };

    obj.showTipError = function (msg, timeout) {
        obj.hideTip();

        var $element = $(".aDrive div");
        if ($element.length) {
            $element.append('<div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-error"><span data-role="icon" data-render-as="svg" data-icon-type="PDSCloseCircleFill" class="error-icon--1Ov4I icon--d-ejA "><svg viewBox="0 0 1024 1024"><use xlink:href="#PDSCloseCircleFill"></use></svg></span><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 44px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div></div>');
        }
        else {
            $(document.body).append('<div><div class="aDrive"><div><div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-error"><span data-role="icon" data-render-as="svg" data-icon-type="PDSCloseCircleFill" class="error-icon--1Ov4I icon--d-ejA "><svg viewBox="0 0 1024 1024"><use xlink:href="#PDSCloseCircleFill"></use></svg></span><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 44px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div></div></div></div></div>');
        }

        setTimeout(function () {
            obj.hideTip()
        }, timeout || 3000);
    };

    obj.showTipLoading = function (msg, timeout) {
        obj.hideTip();

        var $element = $(".aDrive div");
        if ($element.length) {
            $element.append('<div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-loading"><div></div><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 20px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div></div>');
        }
        else {
            $(document.body).append('<div><div class="aDrive"><div><div class="aDrive-notice"><div class="aDrive-notice-content"><div class="aDrive-custom-content aDrive-loading"><div></div><span><div class="content-wrapper--B7mAG" data-desc="false" style="margin-left: 20px; padding-right: 20px;"><div class="title-wrapper--3bQQ2">' + msg + '<div class="desc-wrapper--218x0"></div></div></div></span></div></div></div></div></div></div>');
        }

        setTimeout(function () {
            obj.hideTip()
        }, timeout || 5000);
    };

    obj.hideTip = function() {
        var t = $(".aDrive-notice");
        t.length && "function" == typeof t.remove ? t.remove() : "function" == typeof t.removeNode && t.removeNode(!0);
    };

    obj.addPageFileList = function () {
        var send = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(data) {
            this.addEventListener("load", function(event) {
                if (this.readyState == 4 && this.status == 200) {
                    var response, responseURL = this.responseURL;
                    if (responseURL.indexOf("/file/list") > 0) {
                        if (document.querySelector(".ant-modal-mask")) {
                            //排除【保存 移动 等行为触发】
                            return;
                        };

                        response = JSON.parse(this.response);
                        if (response instanceof Object && response.items) {
                            try { data = JSON.parse(data) } catch (error) { data = {} };

                            if (obj.file_page.parent_file_id != data.parent_file_id) {
                                //变换页面
                                obj.file_page.parent_file_id = data.parent_file_id;
                                obj.file_page.order_by = data.order_by;
                                obj.file_page.order_direction = data.order_direction;
                                obj.file_page.next_marker_list = [];
                                obj.file_page.items = [];
                            }

                            if (obj.file_page.order_by != data.order_by || obj.file_page.order_direction != data.order_direction) {
                                //排序改变
                                obj.file_page.order_by = data.order_by;
                                obj.file_page.order_direction = data.order_direction;
                                obj.file_page.next_marker_list = [];
                                obj.file_page.items = [];
                            }

                            var next_marker = response.next_marker, next_marker_list = obj.file_page.next_marker_list;
                            if (next_marker_list.includes(next_marker)) {
                                if (next_marker_list.indexOf(next_marker) == 0) {
                                    //重复排序
                                    obj.file_page.next_marker_list = [response.next_marker];
                                    obj.file_page.items = [];
                                }
                            }
                            else {
                                obj.file_page.next_marker_list.push(response.next_marker)
                            }

                            obj.file_page.items = obj.file_page.items.concat(response.items);
                            obj.showTipSuccess("文件列表获取完成 共：" + obj.file_page.items.length + "项");

                            if (obj.file_page.items.length) {
                                if (obj.isHomePage()) {
                                    obj.initDownloadHomePage();
                                }
                                else {
                                    obj.initDownloadSharePage();

                                    obj.switchViewArrow();
                                }
                            }
                        }
                    }
                    else if ((responseURL.indexOf("/file/get_share_link_video_preview_play_info") > 0 || responseURL.indexOf("/file/get_video_preview_play_info") > 0)) {
                        response = JSON.parse(this.response);
                        if (response instanceof Object && response.file_id) {
                            var fileList = obj.file_page.items;
                            if (fileList.length) {
                                for (var i = 0; i < fileList.length; i++) {
                                    if (fileList[i].file_id == response.file_id) {
                                        obj.video_page.play_info = Object.assign(fileList[i], response);
                                        break;
                                    }
                                }
                            }
                            obj.video_page.play_info.name || (obj.video_page.play_info = response);

                            obj.autoPlayer();
                        }
                    }
                }
                else if (this.readyState == 4 && this.status == 403) {
                    if (obj.video_page.dPlayer && obj.expires(this.responseURL)) {
                        var media_num = (this.responseURL.match(/media-(\d+)\.ts/) || [])[1] || 0;
                        if (media_num > 0 && obj.video_page.media_num != media_num) {
                            obj.video_page.media_num = media_num;
                            obj.getVideoPreviewPlayInfo();
                        }
                    }
                }
            }, false);
            send.apply(this, arguments);
        };
    };

    var url = window.location.href;
    if (url.indexOf(".aliyundrive.com/s/") > 0) {
        obj.addPageFileList();

        obj.unlockPageFileLimit();

        obj.initVideoPage();
    }
    else if (url.indexOf(".aliyundrive.com/drive") > 0) {
        obj.addPageFileList();

        obj.unlockPageFileLimit();

        obj.initVideoPage();

        obj.customSharePwd();
    }
    console.log("=== 阿里云盘 好棒棒！===");
    return obj;
    // Your code here...
};