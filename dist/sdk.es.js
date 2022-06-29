/**
 * Copyright (c) 2021 Zoom Video Communications, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var version = "0.16.1";

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var ZERO_SIXTEEN = '0.16';
var ZERO_FOURTEEN = '0.14';

function createApplyProxy(targetApi, prop) {
    return new Proxy(targetApi, {
        apply: function (addEventListenerTarget, thisArg, argumentsList) {
            return Reflect.apply(addEventListenerTarget, thisArg, __spreadArray([
                prop
            ], argumentsList, true));
        },
    });
}
function interceptUndefinedMethod(sdk) {
    return new Proxy(sdk, {
        get: function (sdkTarget, prop) {
            var safeProp = String(prop);
            if (safeProp !== '_version' &&
                safeProp !== '_clientVersion' &&
                !sdkTarget[safeProp]) {
                console.warn("Method ".concat(safeProp, " is not available in this version of Zoom Apps SDK and might not work correctly. Please, update your version of Zoom Apps SDK"));
                if (String(safeProp).match(/^on/gm)) {
                    return createApplyProxy(sdk.addEventListener, safeProp);
                }
                else {
                    return createApplyProxy(sdk.callZoomApi, safeProp);
                }
            }
            else {
                return Reflect.get(sdkTarget, safeProp);
            }
        },
    });
}

var ZoomApiError =  (function (_super) {
    __extends(ZoomApiError, _super);
    function ZoomApiError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, ZoomApiError.prototype);
        return _this;
    }
    return ZoomApiError;
}(Error));

var NativeApis;
(function (NativeApis) {
    NativeApis["ALLOW_PARTICIPANT_TO_RECORD"] = "allowParticipantToRecord";
    NativeApis["AUTHORIZE"] = "authorize";
    NativeApis["BREAKOUT_ROOM_ADD"] = "addBreakoutRoom";
    NativeApis["BREAKOUT_ROOM_ASSIGN_PARTICIPANT"] = "assignParticipantToBreakoutRoom";
    NativeApis["BREAKOUT_ROOM_CHANGE"] = "changeBreakoutRoom";
    NativeApis["BREAKOUT_ROOM_DELETE"] = "deleteBreakoutRoom";
    NativeApis["BREAKOUT_ROOM_LIST_GET"] = "getBreakoutRoomList";
    NativeApis["BREAKOUT_ROOM_RENAME"] = "renameBreakoutRoom";
    NativeApis["BREAKOUT_ROOMS_CLOSE"] = "closeBreakoutRooms";
    NativeApis["BREAKOUT_ROOMS_CONFIGURE"] = "configureBreakoutRooms";
    NativeApis["BREAKOUT_ROOMS_CREATE"] = "createBreakoutRooms";
    NativeApis["BREAKOUT_ROOMS_OPEN"] = "openBreakoutRooms";
    NativeApis["CLEAR_IMAGE"] = "clearImage";
    NativeApis["CLEAR_PARTICIPANT"] = "clearParticipant";
    NativeApis["CLEAR_WEBVIEW"] = "clearWebView";
    NativeApis["CLOSE_RENDERING_CONTEXT"] = "closeRenderingContext";
    NativeApis["CLOUD_RECORDING"] = "cloudRecording";
    NativeApis["COLLABORATE_END"] = "endCollaborate";
    NativeApis["COLLABORATE_JOIN"] = "joinCollaborate";
    NativeApis["COLLABORATE_LEAVE"] = "leaveCollaborate";
    NativeApis["COLLABORATE_START"] = "startCollaborate";
    NativeApis["CONFIG"] = "config";
    NativeApis["CONNECT"] = "connect";
    NativeApis["DRAW_IMAGE"] = "drawImage";
    NativeApis["DRAW_PARTICIPANT"] = "drawParticipant";
    NativeApis["DRAW_WEBVIEW"] = "drawWebView";
    NativeApis["END_SYNC_DATA"] = "endSyncData";
    NativeApis["EXPAND_APP"] = "expandApp";
    NativeApis["GET_MEETING_CONTEXT"] = "getMeetingContext";
    NativeApis["GET_MEETING_JOIN_URL"] = "getMeetingJoinUrl";
    NativeApis["GET_MEETING_PARTICIPANTS"] = "getMeetingParticipants";
    NativeApis["GET_MEETING_UUID"] = "getMeetingUUID";
    NativeApis["GET_RECORDING_CONTEXT"] = "getRecordingContext";
    NativeApis["GET_RUNNING_CONTEXT"] = "getRunningContext";
    NativeApis["GET_SUPPORTED_JS_APIS"] = "getSupportedJsApis";
    NativeApis["GET_USER_CONTEXT"] = "getUserContext";
    NativeApis["GET_USER_MEDIA_AUDIO"] = "getUserMediaAudio";
    NativeApis["GET_USER_MEDIA_VIDEO"] = "getUserMediaVideo";
    NativeApis["LAUNCH_APP_IN_MEETING"] = "launchAppInMeeting";
    NativeApis["LIST_CAMERAS"] = "listCameras";
    NativeApis["OPEN_URL"] = "openUrl";
    NativeApis["POST_MESSAGE"] = "postMessage";
    NativeApis["PROMPT_AUTHORIZE"] = "promptAuthorize";
    NativeApis["REMOVE_VIRTUAL_BACKGROUND"] = "removeVirtualBackground";
    NativeApis["REMOVE_VIRTUAL_FOREGROUND"] = "removeVirtualForeground";
    NativeApis["RUN_RENDERING_CONTEXT"] = "runRenderingContext";
    NativeApis["SEND_APP_INVITATION"] = "sendAppInvitation";
    NativeApis["SEND_APP_INVITATION_TO_ALL_PARTICIPANTS"] = "sendAppInvitationToAllParticipants";
    NativeApis["SEND_APP_INVITATION_TO_MEETING_OWNER"] = "sendAppInvitationToMeetingOwner";
    NativeApis["SET_CAMERA"] = "setCamera";
    NativeApis["SET_USER_MEDIA_AUDIO"] = "setUserMediaAudio";
    NativeApis["SET_USER_MEDIA_VIDEO"] = "setUserMediaVideo";
    NativeApis["SET_VIDEO_MIRROR_EFFECT"] = "setVideoMirrorEffect";
    NativeApis["SET_VIRTUAL_BACKGROUND"] = "setVirtualBackground";
    NativeApis["SET_VIRTUAL_FOREGROUND"] = "setVirtualForeground";
    NativeApis["SHARE_APP"] = "shareApp";
    NativeApis["SHOW_APP_INVITATION_DIALOG"] = "showAppInvitationDialog";
    NativeApis["SHOW_NOTIFICATION"] = "showNotification";
    NativeApis["TOGGLE_PARTICIPANT_MEDIA_AUDIO"] = "toggleParticipantMediaAudio";
})(NativeApis || (NativeApis = {}));
var NativeEvents;
(function (NativeEvents) {
    NativeEvents["ON_ACTIVE_SPEAKER_CHANGE"] = "onActiveSpeakerChange";
    NativeEvents["ON_APP_POPOUT"] = "onAppPopout";
    NativeEvents["ON_CLOUD_RECORDING"] = "onCloudRecording";
    NativeEvents["ON_CONNECT"] = "onConnect";
    NativeEvents["ON_EXPAND_APP"] = "onExpandApp";
    NativeEvents["ON_MEETING"] = "onMeeting";
    NativeEvents["ON_MESSAGE"] = "onMessage";
    NativeEvents["ON_MY_ACTIVE_SPEAKER_CHANGE"] = "onMyActiveSpeakerChange";
    NativeEvents["ON_MY_MEDIA_CHANGE"] = "onMyMediaChange";
    NativeEvents["ON_MY_REACTION"] = "onMyReaction";
    NativeEvents["ON_MY_USER_CONTEXT_CHANGE"] = "onMyUserContextChange";
    NativeEvents["ON_PARTICIPANT_CHANGE"] = "onParticipantChange";
    NativeEvents["ON_REACTION"] = "onReaction";
    NativeEvents["ON_SEND_APP_INVITATION"] = "sendAppInvitation";
    NativeEvents["ON_SHARE_APP"] = "shareApp";
    NativeEvents["ON_MEETING_CONFIG_CHANGED"] = "onMeetingConfigChanged";
    NativeEvents["ON_BREAKOUT_ROOM_CHANGE"] = "onBreakoutRoomChange";
    NativeEvents["ON_INVITE_COLLABORATION"] = "onInviteCollaboration";
    NativeEvents["ON_COLLABORATE_CHANGE"] = "onCollaborateChange";
    NativeEvents["ON_RUNNING_CONTEXT_CHANGE"] = "onRunningContextChange";
    NativeEvents["ON_AUTHORIZED"] = "onAuthorized";
    NativeEvents["ON_CLOSE_APP_FOR_PARTICIPANTS"] = "onCloseAppForParticipants";
    NativeEvents["ON_RENDERED_APP_OPENED"] = "onRenderedAppOpened";
})(NativeEvents || (NativeEvents = {}));
var Timeouts;
(function (Timeouts) {
    Timeouts[Timeouts["DEFAULT"] = 10000] = "DEFAULT";
    Timeouts[Timeouts["SET_VIRTUAL_BACKGROUND"] = 120000] = "SET_VIRTUAL_BACKGROUND";
    Timeouts[Timeouts["RUN_RENDERING_CONTEXT"] = 120000] = "RUN_RENDERING_CONTEXT";
})(Timeouts || (Timeouts = {}));

/**
 * @license
 * MIT LICENSE
 * Copyright 2011 Jon Leighton
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function base64ArrayBuffer(arrayBuffer) {
    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;
    var base64 = '';
    var a, b, c, d;
    var chunk;
    for (var i = 0; i < mainLength; i = i + 3) {
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        a = (chunk & 16515072) >> 18;
        b = (chunk & 258048) >> 12;
        c = (chunk & 4032) >> 6;
        d = chunk & 63;
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2;
        b = (chunk & 3) << 4;
        base64 += encodings[a] + encodings[b] + '==';
    }
    else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10;
        b = (chunk & 1008) >> 4;
        c = (chunk & 15) << 2;
        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }
    return base64;
}

function serialize(message) {
    return JSON.stringify(message, function (key, value) {
        if ((value === null || value === void 0 ? void 0 : value.constructor) === ImageData) {
            return serializeImageData(value);
        }
        return value;
    });
}
function serializeImageData(imageData) {
    return {
        width: imageData.width,
        height: imageData.height,
        bitmap: 'data:object/Uint8ClampedArray;base64,' +
            base64ArrayBuffer(imageData.data),
    };
}

var getWindow = (function () { return window; });

function detectBrowser(window) {
    var _a, _b, _c;
    if (window.android) {
        return {
            type: 'android',
            nativeInterface: window.android,
        };
    }
    else if ((_a = window.chrome) === null || _a === void 0 ? void 0 : _a.webview) {
        return {
            type: 'chrome',
            nativeInterface: window.chrome.webview,
        };
    }
    else if ((_c = (_b = window.webkit) === null || _b === void 0 ? void 0 : _b.messageHandlers) === null || _c === void 0 ? void 0 : _c.jsOCHelper) {
        return {
            type: 'webkit',
            nativeInterface: window.webkit.messageHandlers.jsOCHelper,
        };
    }
}
function setPostMessage() {
    var win = getWindow();
    var browser = detectBrowser(win);
    if (!browser) {
        throw new Error('The Zoom Apps SDK is not supported by this browser');
    }
    if (browser.type === 'chrome') {
        browser.nativeInterface.addEventListener('message', this.native2js.bind(this));
    }
    if (!win.zoomSdk) {
        win.zoomSdk = this;
    }
    return function (message) {
        try {
            var json = serialize(message);
            browser.nativeInterface.postMessage(json);
        }
        catch (error) {
            throw new Error('Failed to serialize NativeApiRequest');
        }
    };
}

var FIXED_WIDTH = 1280;
var helpers = {
    getImageData: function (fileUrl, width, height) {
        return new Promise(function (resolve) {
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var calculatedWidth = width || FIXED_WIDTH;
                var calculatedHeight = height || (calculatedWidth * img.height) / img.width;
                canvas.width = calculatedWidth;
                canvas.height = calculatedHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, calculatedWidth, calculatedHeight);
                var imageData = ctx.getImageData(0, 0, calculatedWidth, calculatedHeight);
                resolve(imageData);
            };
            img.src = fileUrl;
        });
    },
};

var _a$1, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
var mappings = (_a$1 = {},
    _a$1[NativeApis.SEND_APP_INVITATION] = (_b = {},
        _b[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapInput: renameKeys({
                    participants: 'user_list',
                    participantUUIDs: 'user_UUID_list',
                }),
            },
        },
        _b),
    _a$1[NativeApis.TOGGLE_PARTICIPANT_MEDIA_AUDIO] = (_c = {},
        _c[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapInput: renameKeys({ participants: 'user_list' }),
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _c),
    _a$1[NativeApis.GET_RUNNING_CONTEXT] = (_d = {},
        _d[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'context', value: value });
                },
            },
        },
        _d),
    _a$1[NativeApis.GET_RUNNING_CONTEXT] = (_e = {},
        _e[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (context) { return ({ context: context }); },
            },
        },
        _e),
    _a$1[NativeApis.OPEN_URL] = (_f = {},
        _f[ZERO_FOURTEEN] = {
            '0.0.0': {
                validate: function (data) {
                    new URL(data.url);
                },
            },
        },
        _f[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
                validate: function (data) {
                    new URL(data.url);
                },
            },
        },
        _f),
    _a$1[NativeApis.SET_VIRTUAL_BACKGROUND] = (_g = {},
        _g[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _g),
    _a$1[NativeApis.REMOVE_VIRTUAL_BACKGROUND] = (_h = {},
        _h[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _h),
    _a$1[NativeApis.SET_VIRTUAL_FOREGROUND] = (_j = {},
        _j[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _j),
    _a$1[NativeApis.REMOVE_VIRTUAL_FOREGROUND] = (_k = {},
        _k[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _k),
    _a$1[NativeApis.SHOW_NOTIFICATION] = (_l = {},
        _l[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _l),
    _a$1[NativeApis.CLOUD_RECORDING] = (_m = {},
        _m[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _m),
    _a$1[NativeApis.SHARE_APP] = (_o = {},
        _o[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _o),
    _a$1[NativeApis.SET_CAMERA] = (_p = {},
        _p[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _p),
    _a$1[NativeApis.SET_VIDEO_MIRROR_EFFECT] = (_q = {},
        _q[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _q),
    _a$1[NativeApis.EXPAND_APP] = (_r = {},
        _r[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _r),
    _a$1[NativeApis.CONNECT] = (_s = {},
        _s[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _s),
    _a$1[NativeApis.POST_MESSAGE] = (_t = {},
        _t[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _t),
    _a$1[NativeApis.ALLOW_PARTICIPANT_TO_RECORD] = (_u = {},
        _u[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _u),
    _a$1[NativeApis.LAUNCH_APP_IN_MEETING] = (_v = {},
        _v[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _v),
    _a$1[NativeApis.SHOW_APP_INVITATION_DIALOG] = (_w = {},
        _w[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _w),
    _a$1[NativeApis.RUN_RENDERING_CONTEXT] = (_x = {},
        _x[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _x),
    _a$1[NativeApis.CLOSE_RENDERING_CONTEXT] = (_y = {},
        _y[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _y),
    _a$1[NativeApis.DRAW_PARTICIPANT] = (_z = {},
        _z[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _z),
    _a$1[NativeApis.CLEAR_PARTICIPANT] = (_0 = {},
        _0[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _0),
    _a$1[NativeApis.CLEAR_IMAGE] = (_1 = {},
        _1[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _1),
    _a$1[NativeApis.DRAW_WEBVIEW] = (_2 = {},
        _2[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _2),
    _a$1[NativeApis.CLEAR_WEBVIEW] = (_3 = {},
        _3[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _3),
    _a$1[NativeApis.BREAKOUT_ROOMS_OPEN] = (_4 = {},
        _4[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _4),
    _a$1[NativeApis.BREAKOUT_ROOMS_CLOSE] = (_5 = {},
        _5[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _5),
    _a$1[NativeApis.BREAKOUT_ROOM_DELETE] = (_6 = {},
        _6[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _6),
    _a$1[NativeApis.BREAKOUT_ROOM_RENAME] = (_7 = {},
        _7[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _7),
    _a$1[NativeApis.BREAKOUT_ROOM_ASSIGN_PARTICIPANT] = (_8 = {},
        _8[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _8),
    _a$1[NativeApis.BREAKOUT_ROOM_CHANGE] = (_9 = {},
        _9[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _9),
    _a$1[NativeApis.COLLABORATE_START] = (_10 = {},
        _10[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _10),
    _a$1[NativeApis.COLLABORATE_END] = (_11 = {},
        _11[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _11),
    _a$1[NativeApis.COLLABORATE_LEAVE] = (_12 = {},
        _12[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _12),
    _a$1[NativeApis.COLLABORATE_JOIN] = (_13 = {},
        _13[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _13),
    _a$1[NativeApis.AUTHORIZE] = (_14 = {},
        _14[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
                validate: function (data) {
                    if (!data.codeChallenge || typeof data.codeChallenge !== 'string') {
                        throw new Error('codeChallenge is required for zoomSdk.authorize');
                    }
                },
            },
        },
        _14),
    _a$1[NativeApis.PROMPT_AUTHORIZE] = (_15 = {},
        _15[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _15),
    _a$1[NativeApis.SET_USER_MEDIA_VIDEO] = (_16 = {},
        _16[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _16),
    _a$1[NativeApis.SET_USER_MEDIA_AUDIO] = (_17 = {},
        _17[ZERO_SIXTEEN] = {
            '0.0.0': {
                mapOutput: function (value) {
                    return wrapInObject({ key: 'message', value: value });
                },
            },
        },
        _17),
    _a$1);
function renameKeys(keyMap) {
    return function (data) {
        if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
            return Object.keys(data).reduce(function (acc, key) {
                var _a;
                return __assign(__assign({}, acc), (_a = {}, _a[keyMap[key] || key] = data[key], _a));
            }, {});
        }
        return data;
    };
}
function wrapInObject(_a) {
    var _b;
    var key = _a.key, value = _a.value;
    return _b = {}, _b[key] = value, _b;
}

var identity = function (x) { return x; };
var noop = function (x) { };
function getMappingFunctions(apiName, sdkVersion, clientVersion) {
    var fns = {
        mapInput: identity,
        mapOutput: identity,
        validate: noop,
    };
    var convertedSdkVersion = convertVersion(sdkVersion);
    var apiMappings = mappings[apiName];
    if (!apiMappings)
        return fns;
    var sdkMappings = apiMappings[convertedSdkVersion];
    if (!sdkMappings)
        return fns;
    var versions = Object.keys(sdkMappings).sort(compareVersions);
    var matchedVersion = versions
        .reverse()
        .find(function (version) { return compareVersions(clientVersion, version) >= 0; });
    if (!matchedVersion)
        return fns;
    var _a = sdkMappings[matchedVersion], mapInput = _a.mapInput, mapOutput = _a.mapOutput, validate = _a.validate;
    if (mapInput)
        fns.mapInput = mapInput;
    if (mapOutput)
        fns.mapOutput = mapOutput;
    if (validate)
        fns.validate = validate;
    return fns;
}
function compareVersions(v1, v2) {
    var vals1 = v1.split('.').map(function (n) { return parseInt(n); });
    var vals2 = v2.split('.').map(function (n) { return parseInt(n); });
    if (vals1.some(isNaN)) {
        return -1;
    }
    var a1 = vals1[0], b1 = vals1[1], c1 = vals1[2];
    var a2 = vals2[0], b2 = vals2[1], c2 = vals2[2];
    if (a1 > a2)
        return 1;
    else if (a2 > a1)
        return -1;
    if (b1 > b2)
        return 1;
    else if (b2 > b1)
        return -1;
    if (c1 > c2)
        return 1;
    else if (c2 > c1)
        return 1;
    return 0;
}
function convertVersion(sdkVersion) {
    if (typeof sdkVersion !== 'string') {
        console.warn('You have not provided a valid sdk version');
        return;
    }
    var _a = sdkVersion.split('.'), maj = _a[0], min = _a[1]; _a[2];
    switch ("".concat(maj, ".").concat(min)) {
        case ZERO_FOURTEEN:
            return ZERO_FOURTEEN;
        case ZERO_SIXTEEN:
            return ZERO_SIXTEEN;
        default:
            console.warn('You have not provided a valid sdk version');
    }
}

var _a;
var nativeApiCallbacks = {};
var nativeEventHandlers = {};
var mappingFunctionCache = (_a = {},
    _a[NativeApis.CONFIG] = {
        mapInput: function (d) { return d; },
        mapOutput: function (d) { return d; },
        validate: function (d) { return d; },
    },
    _a);
var ZoomSdk =  (function () {
    function ZoomSdk(options) {
        this._version = options.version;
        return interceptUndefinedMethod(this);
    }
    ZoomSdk.prototype.native2js = function (message) {
        if (message.data.type === 'apiResponse') {
            var jsCallId = message.data.data.jsCallId;
            var callback = nativeApiCallbacks[jsCallId];
            if (callback) {
                callback(message.data.data);
            }
        }
        else if (message.data.type === 'event') {
            nativeEventHandlers[message.data.name] &&
                nativeEventHandlers[message.data.name].forEach(function (handler) {
                    return handler(message.data.data);
                });
        }
    };
    ZoomSdk.prototype.callZoomApi = function (apiName, data, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var jsCallId, nativeApiRequest, _a, mapInput, mapOutput, validate;
            var _this = this;
            return __generator(this, function (_b) {
                jsCallId = getJsCallId();
                nativeApiRequest = {
                    jsCallId: jsCallId,
                    apiName: apiName,
                };
                if (apiName !== NativeApis.CONFIG &&
                    (!isString(this._version) || !isString(this._clientVersion))) {
                    throw new Error('must call zoomSdk.config before using other API methods');
                }
                _a = mappingFunctionCache[apiName], mapInput = _a.mapInput, mapOutput = _a.mapOutput, validate = _a.validate;
                if (data) {
                    validate(data);
                    nativeApiRequest.data = mapInput(data);
                }
                if (apiName === NativeApis.OPEN_URL &&
                    this._version !== ZERO_FOURTEEN) {
                    this._postMessage(nativeApiRequest);
                    return [2 , { message: 'success' }];
                }
                return [2 , new Promise(function (resolve, reject) {
                        var timer = setTimeout(function () {
                            var error = new Error("".concat(apiName, " took longer than ").concat(timeout || Timeouts.DEFAULT, "ms to respond"));
                            reject(error);
                            removeNativeApiCallback(jsCallId);
                        }, timeout || Timeouts.DEFAULT);
                        setNativeApiCallback(jsCallId, function (_a) {
                            var errorCode = _a.errorCode, errorMessage = _a.errorMessage, result = _a.result;
                            if (errorCode || errorMessage) {
                                var error = new ZoomApiError(errorMessage, errorCode);
                                reject(error);
                            }
                            else {
                                resolve(mapOutput(result));
                            }
                            removeNativeApiCallback(jsCallId);
                            clearTimeout(timer);
                        });
                        _this._postMessage(nativeApiRequest);
                    })];
            });
        });
    };
    ZoomSdk.prototype.config = function (_a) {
        var capabilities = _a.capabilities, popoutSize = _a.popoutSize, size = _a.size, _b = _a.version, version = _b === void 0 ? ZERO_FOURTEEN : _b;
        return __awaiter(this, void 0, void 0, function () {
            var newOptions, response;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newOptions = {
                            js_api_lists: capabilities,
                            size: popoutSize || size,
                        };
                        if (!isString(this._version)) {
                            this._version = version;
                        }
                        if (this._version === ZERO_FOURTEEN) {
                            console.warn('You are using an outdated version of the SDK, please update to the latest version.');
                        }
                        this._postMessage = setPostMessage.call(this);
                        return [4 , this.callZoomApi(NativeApis.CONFIG, newOptions)];
                    case 1:
                        response = _c.sent();
                        if (response.clientVersion) {
                            this._clientVersion = response.clientVersion;
                            Object.values(NativeApis).forEach(function (apiName) {
                                mappingFunctionCache[apiName] = getMappingFunctions(apiName, _this._version, _this._clientVersion);
                            });
                        }
                        return [2 , response];
                }
            });
        });
    };
    ZoomSdk.prototype.getSupportedJsApis = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_SUPPORTED_JS_APIS, null, null)];
            });
        });
    };
    ZoomSdk.prototype.openUrl = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.OPEN_URL, options)];
            });
        });
    };
    ZoomSdk.prototype.getRunningContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_RUNNING_CONTEXT)];
            });
        });
    };
    ZoomSdk.prototype.getMeetingContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_MEETING_CONTEXT, null, null)];
            });
        });
    };
    ZoomSdk.prototype.setVirtualBackground = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options.blur) {
                            return [2 , this.callZoomApi(NativeApis.SET_VIRTUAL_BACKGROUND, { blur: true }, Timeouts.SET_VIRTUAL_BACKGROUND)];
                        }
                        if (!options.fileUrl) return [3 , 2];
                        new URL(options.fileUrl);
                        return [4 , helpers.getImageData(options.fileUrl)];
                    case 1:
                        params = _a.sent();
                        return [2 , this.callZoomApi(NativeApis.SET_VIRTUAL_BACKGROUND, params, Timeouts.SET_VIRTUAL_BACKGROUND)];
                    case 2:
                        if (options.imageData) {
                            return [2 , this.callZoomApi(NativeApis.SET_VIRTUAL_BACKGROUND, options.imageData, Timeouts.SET_VIRTUAL_BACKGROUND)];
                        }
                        throw new Error('setVirtualBackground() parameter fileUrl or imageData is required if blur is not true');
                }
            });
        });
    };
    ZoomSdk.prototype.removeVirtualBackground = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.REMOVE_VIRTUAL_BACKGROUND)];
            });
        });
    };
    ZoomSdk.prototype.setVirtualForeground = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SET_VIRTUAL_FOREGROUND, options)];
            });
        });
    };
    ZoomSdk.prototype.removeVirtualForeground = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.REMOVE_VIRTUAL_FOREGROUND)];
            });
        });
    };
    ZoomSdk.prototype.showNotification = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SHOW_NOTIFICATION, options)];
            });
        });
    };
    ZoomSdk.prototype.cloudRecording = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CLOUD_RECORDING, options)];
            });
        });
    };
    ZoomSdk.prototype.shareApp = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SHARE_APP, options)];
            });
        });
    };
    ZoomSdk.prototype.listCameras = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.LIST_CAMERAS)];
            });
        });
    };
    ZoomSdk.prototype.setCamera = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SET_CAMERA, options)];
            });
        });
    };
    ZoomSdk.prototype.setVideoMirrorEffect = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SET_VIDEO_MIRROR_EFFECT, options)];
            });
        });
    };
    ZoomSdk.prototype.getMeetingParticipants = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_MEETING_PARTICIPANTS)];
            });
        });
    };
    ZoomSdk.prototype.sendAppInvitation = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SEND_APP_INVITATION, options)];
            });
        });
    };
    ZoomSdk.prototype.getUserContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_USER_CONTEXT)];
            });
        });
    };
    ZoomSdk.prototype.getRecordingContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_RECORDING_CONTEXT)];
            });
        });
    };
    ZoomSdk.prototype.getMeetingJoinUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_MEETING_JOIN_URL)];
            });
        });
    };
    ZoomSdk.prototype.getMeetingUUID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_MEETING_UUID)];
            });
        });
    };
    ZoomSdk.prototype.expandApp = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.EXPAND_APP, options)];
            });
        });
    };
    ZoomSdk.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CONNECT)];
            });
        });
    };
    ZoomSdk.prototype.postMessage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.POST_MESSAGE, options)];
            });
        });
    };
    ZoomSdk.prototype.endSyncData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.END_SYNC_DATA)];
            });
        });
    };
    ZoomSdk.prototype.allowParticipantToRecord = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.ALLOW_PARTICIPANT_TO_RECORD, options)];
            });
        });
    };
    ZoomSdk.prototype.launchAppInMeeting = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.LAUNCH_APP_IN_MEETING, options)];
            });
        });
    };
    ZoomSdk.prototype.showAppInvitationDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SHOW_APP_INVITATION_DIALOG)];
            });
        });
    };
    ZoomSdk.prototype.sendAppInvitationToMeetingOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SEND_APP_INVITATION_TO_MEETING_OWNER)];
            });
        });
    };
    ZoomSdk.prototype.sendAppInvitationToAllParticipants = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SEND_APP_INVITATION_TO_ALL_PARTICIPANTS)];
            });
        });
    };
    ZoomSdk.prototype.runRenderingContext = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.RUN_RENDERING_CONTEXT, options, Timeouts.RUN_RENDERING_CONTEXT)];
            });
        });
    };
    ZoomSdk.prototype.closeRenderingContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CLOSE_RENDERING_CONTEXT)];
            });
        });
    };
    ZoomSdk.prototype.drawParticipant = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options) {
                    if (options.x) {
                        options.x = getDevicePixelsForValue(options.x, window.innerWidth);
                    }
                    if (options.y) {
                        options.y = getDevicePixelsForValue(options.y, window.innerHeight);
                    }
                    if (options.width) {
                        options.width = getDevicePixelsForValue(options.width, window.innerWidth);
                    }
                    if (options.height) {
                        options.height = getDevicePixelsForValue(options.height, window.innerHeight);
                    }
                }
                return [2 , this.callZoomApi(NativeApis.DRAW_PARTICIPANT, options)];
            });
        });
    };
    ZoomSdk.prototype.clearParticipant = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CLEAR_PARTICIPANT, options)];
            });
        });
    };
    ZoomSdk.prototype.drawImage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (options.x) {
                    options.x = getDevicePixelsForValue(options.x, window.innerWidth);
                }
                if (options.y) {
                    options.y = getDevicePixelsForValue(options.y, window.innerHeight);
                }
                return [2 , this.callZoomApi(NativeApis.DRAW_IMAGE, options)];
            });
        });
    };
    ZoomSdk.prototype.clearImage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CLEAR_IMAGE, options)];
            });
        });
    };
    ZoomSdk.prototype.drawWebView = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.DRAW_WEBVIEW, options)];
            });
        });
    };
    ZoomSdk.prototype.clearWebView = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.CLEAR_WEBVIEW, options)];
            });
        });
    };
    ZoomSdk.prototype.onShareApp = function (handler) {
        this.addEventListener(NativeEvents.ON_SHARE_APP, handler);
    };
    ZoomSdk.prototype.onSendAppInvitation = function (handler) {
        this.addEventListener(NativeEvents.ON_SEND_APP_INVITATION, handler);
    };
    ZoomSdk.prototype.onCloudRecording = function (handler) {
        this.addEventListener(NativeEvents.ON_CLOUD_RECORDING, handler);
    };
    ZoomSdk.prototype.onReaction = function (handler) {
        this.addEventListener(NativeEvents.ON_REACTION, handler);
    };
    ZoomSdk.prototype.onParticipantChange = function (handler) {
        this.addEventListener(NativeEvents.ON_PARTICIPANT_CHANGE, handler);
    };
    ZoomSdk.prototype.onActiveSpeakerChange = function (handler) {
        this.addEventListener(NativeEvents.ON_ACTIVE_SPEAKER_CHANGE, handler);
    };
    ZoomSdk.prototype.onAppPopout = function (handler) {
        this.addEventListener(NativeEvents.ON_APP_POPOUT, handler);
    };
    ZoomSdk.prototype.onExpandApp = function (handler) {
        this.addEventListener(NativeEvents.ON_EXPAND_APP, handler);
    };
    ZoomSdk.prototype.onConnect = function (handler) {
        this.addEventListener(NativeEvents.ON_CONNECT, handler);
    };
    ZoomSdk.prototype.onMessage = function (handler) {
        this.addEventListener(NativeEvents.ON_MESSAGE, handler);
    };
    ZoomSdk.prototype.onMeeting = function (handler) {
        this.addEventListener(NativeEvents.ON_MEETING, handler);
    };
    ZoomSdk.prototype.onMeetingConfigChanged = function (handler) {
        this.addEventListener(NativeEvents.ON_MEETING_CONFIG_CHANGED, handler);
    };
    ZoomSdk.prototype.onBreakoutRoomChange = function (handler) {
        this.addEventListener(NativeEvents.ON_BREAKOUT_ROOM_CHANGE, handler);
    };
    ZoomSdk.prototype.onCollaborateChange = function (handler) {
        this.addEventListener(NativeEvents.ON_COLLABORATE_CHANGE, handler);
    };
    ZoomSdk.prototype.onRunningContextChange = function (handler) {
        this.addEventListener(NativeEvents.ON_RUNNING_CONTEXT_CHANGE, handler);
    };
    ZoomSdk.prototype.onMyReaction = function (handler) {
        this.addEventListener(NativeEvents.ON_MY_REACTION, handler);
    };
    ZoomSdk.prototype.onMyActiveSpeakerChange = function (handler) {
        this.addEventListener(NativeEvents.ON_MY_ACTIVE_SPEAKER_CHANGE, handler);
    };
    ZoomSdk.prototype.onMyUserContextChange = function (handler) {
        this.addEventListener(NativeEvents.ON_MY_USER_CONTEXT_CHANGE, handler);
    };
    ZoomSdk.prototype.onMyMediaChange = function (handler) {
        this.addEventListener(NativeEvents.ON_MY_MEDIA_CHANGE, handler);
    };
    ZoomSdk.prototype.onAuthorized = function (handler) {
        this.addEventListener(NativeEvents.ON_AUTHORIZED, handler);
    };
    ZoomSdk.prototype.onCloseAppForParticipants = function (handler) {
        this.addEventListener(NativeEvents.ON_CLOSE_APP_FOR_PARTICIPANTS, handler);
    };
    ZoomSdk.prototype.onRenderedAppOpened = function (handler) {
        this.addEventListener(NativeEvents.ON_RENDERED_APP_OPENED, handler);
    };
    ZoomSdk.prototype.addEventListener = function (event, handler) {
        nativeEventHandlers[event]
            ? nativeEventHandlers[event].push(handler)
            : (nativeEventHandlers[event] = [handler]);
    };
    ZoomSdk.prototype.removeEventListener = function (event, handler) {
        if (!nativeEventHandlers[event])
            return;
        nativeEventHandlers[event] = nativeEventHandlers[event].filter(function (fn) { return fn !== handler; });
    };
    ZoomSdk.prototype.createBreakoutRooms = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOMS_CREATE, options)];
            });
        });
    };
    ZoomSdk.prototype.configureBreakoutRooms = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOMS_CONFIGURE, options)];
            });
        });
    };
    ZoomSdk.prototype.openBreakoutRooms = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOMS_OPEN)];
            });
        });
    };
    ZoomSdk.prototype.closeBreakoutRooms = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOMS_CLOSE)];
            });
        });
    };
    ZoomSdk.prototype.getBreakoutRoomList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_LIST_GET)];
            });
        });
    };
    ZoomSdk.prototype.addBreakoutRoom = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_ADD, options)];
            });
        });
    };
    ZoomSdk.prototype.deleteBreakoutRoom = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_DELETE, options)];
            });
        });
    };
    ZoomSdk.prototype.renameBreakoutRoom = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_RENAME, options)];
            });
        });
    };
    ZoomSdk.prototype.assignParticipantToBreakoutRoom = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_ASSIGN_PARTICIPANT, options)];
            });
        });
    };
    ZoomSdk.prototype.changeBreakoutRoom = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.BREAKOUT_ROOM_CHANGE, options)];
            });
        });
    };
    ZoomSdk.prototype.startCollaborate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.COLLABORATE_START, options)];
            });
        });
    };
    ZoomSdk.prototype.endCollaborate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.COLLABORATE_END)];
            });
        });
    };
    ZoomSdk.prototype.leaveCollaborate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.COLLABORATE_LEAVE)];
            });
        });
    };
    ZoomSdk.prototype.joinCollaborate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.COLLABORATE_JOIN)];
            });
        });
    };
    ZoomSdk.prototype.authorize = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.AUTHORIZE, options)];
            });
        });
    };
    ZoomSdk.prototype.promptAuthorize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.PROMPT_AUTHORIZE)];
            });
        });
    };
    ZoomSdk.prototype.setUserMediaVideo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SET_USER_MEDIA_VIDEO, options)];
            });
        });
    };
    ZoomSdk.prototype.setUserMediaAudio = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.SET_USER_MEDIA_AUDIO, options)];
            });
        });
    };
    ZoomSdk.prototype.getUserMediaVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_USER_MEDIA_VIDEO)];
            });
        });
    };
    ZoomSdk.prototype.getUserMediaAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.GET_USER_MEDIA_AUDIO)];
            });
        });
    };
    ZoomSdk.prototype.toggleParticipantMediaAudio = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 , this.callZoomApi(NativeApis.TOGGLE_PARTICIPANT_MEDIA_AUDIO, options)];
            });
        });
    };
    return ZoomSdk;
}());
function getJsCallId() {
    return 'id' + Math.random().toString(16).slice(2);
}
function setNativeApiCallback(jsCallId, callback) {
    nativeApiCallbacks[jsCallId] = callback;
}
function removeNativeApiCallback(jsCallId) {
    if (nativeApiCallbacks[jsCallId])
        delete nativeApiCallbacks[jsCallId];
}
function isString(v) {
    return typeof v === 'string';
}
function getDevicePixelsForValue(pixelValue, containerSize) {
    if (isString(pixelValue)) {
        var value = parseFloat(pixelValue);
        if (pixelValue.endsWith('px')) {
            return Math.trunc(value * window.devicePixelRatio);
        }
        else if (pixelValue.endsWith('%')) {
            return Math.trunc((value / 100.0) * containerSize * window.devicePixelRatio);
        }
    }
    return pixelValue;
}

var module = new ZoomSdk({ version: version });

export { module as default };
