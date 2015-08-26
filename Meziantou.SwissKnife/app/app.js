'use strict';

var app = angular.module('app', [
    'ngRoute'
    //'ui.bootstrap'
]);


app.config(function ($routeProvider) {
    $routeProvider
     .when('/browser-info', {
         templateUrl: 'views/BrowserInfo.html',
         controller: 'browserInfoController'
     })
     .when('/viewstate', {
         templateUrl: 'views/ViewState.html',
         controller: 'viewStateController'
     })
    .when('/tools', {
        templateUrl: 'views/tools.html'

    })
    .otherwise({
        redirectTo: '/tools'
    });
});

app.controller('guidGeneratorController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.guidValue = '';

        $scope.newGuid = function () {
            $http.get('/api/guid/new').success(function (data) {
                $scope.value = data;
            });
        };

        $scope.parse = function () {
            $http.post('/api/guid/parse', JSON.stringify($scope.guidValue)).success(function (data) {
                //$http.post('/api/guid/parse', '"'+ $scope.guidValue + '"').success(function (data) {
                $scope.value = data;
            });
        }
    }
]);

app.controller('xmlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/xml/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }

        $scope.decode = function () {
            $http.post('/api/xml/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);

app.controller('xmlAttributeEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/xml-attribute/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }

        $scope.decode = function () {
            $http.post('/api/xml-attribute/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);

app.controller('urlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/url/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }

        $scope.pathEncode = function () {
            $http.post('/api/url/path-encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }

        $scope.decode = function () {
            $http.post('/api/url/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);

app.controller('htmlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/html/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }

        $scope.decode = function () {
            $http.post('/api/html/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);

app.controller('htmlAttributeEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/html-attribute/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);

app.controller('xpathController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.find = function () {
            $http.post('/api/xpath', { xml: $scope.value, xpath: $scope.query }).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }
    }
]);

app.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseFloat(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        return num.toFixed(len);
    };
});

app.controller('browserInfoController', [
    '$scope', '$http', '$window', function ($scope, $http, $window) {

        $scope.Modernizr = Modernizr;

        $http.get('/api/ip/my').success(function (data) {
            $scope.ipAddress = data;
        });

        $scope.userAgent = navigator.userAgent;

        var htmlElement = document.getElementById('html');
        $scope.rootFontSize = parseInt(window.getComputedStyle(htmlElement, null).getPropertyValue('font-size'), 10);
        $scope.deviceAspectRatio = screen.width / screen.height;

        $scope.pixelRatio = $window.devicePixelRatio || $window.screen.availWidth / document.documentElement.clientWidth;

        var resolutionRatio = window.devicePixelRatio || Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / one.dpi || 0;
        $scope.resolutionDpi = resolutionRatio * 96;
        $scope.resolutionDppx = resolutionRatio;
        $scope.resolutionDpcm = resolutionRatio * 96 / 2.54;

        getWidthAndHeight();

        function getWidthAndHeight() {

            $scope.screenWidth = screen.width;
            $scope.innerWidth = $window.innerWidth;
            $scope.clientWidth = document.body.clientWidth;
            $scope.availWidth = screen.availWidth;

            $scope.screenHeight = screen.height;
            $scope.innerHeight = $window.innerHeight;
            $scope.clientHeight = document.body.clientHeight;
            $scope.availHeight = screen.availHeight;
        }

        $window.addEventListener('resize', function () {
            $scope.$apply(function () {
                getWidthAndHeight();
            });
        });

        $scope.features = {
            // CSS3
            '@font-face': Modernizr.fontface,
            'background-size': Modernizr.backgroundsize,
            'border-image': Modernizr.borderimage,
            'border-radius': Modernizr.borderradius,
            'box-shadow': Modernizr.boxshadow,
            'flexbox': Modernizr.flexbox,
            'flexbox legacy': Modernizr.flexboxlegacy,
            'hsla': Modernizr.hsla,
            'multiple backgrounds': Modernizr.multiplebgs,
            'opacity': Modernizr.opacity,
            'rgba()': Modernizr.rgba,
            'text-shadow': Modernizr.textshadow,
            'CSS Animations': Modernizr.cssanimations,
            'CSS Columns': Modernizr.csscolumns,
            'CSS Generated content (:before/:after)': Modernizr.generatedcontent,
            'CSS Gradients': Modernizr.cssgradients,
            'CSS Reflections': Modernizr.cssreflections,
            'CSS Transforms': Modernizr.csstransforms,
            'CSS Transforms3d': Modernizr.csstransforms3d,
            'CSS Transitions': Modernizr.csstransitions,
            // HTML5
            'ApplicationCache': Modernizr.applicationCache,
            'Canvas': Modernizr.canvas,
            'Canvas Text': Modernizr.canvastext,
            'Drag\'n Drop': Modernizr.draganddrop,
            'hashchange': Modernizr.hashchange,
            'History (pushState)': Modernizr.history,
            'HTML5 Audio (ogg)': Modernizr.audio.ogg,
            'HTML5 Audio (mp3)': Modernizr.audio.mp3,
            'HTML5 Audio (wav)': Modernizr.audio.wav,
            'HTML5 Audio (m4a)': Modernizr.audio.m4a,
            'HTML5 Video (ogg)': Modernizr.video.ogg,
            'HTML5 Video (h264)': Modernizr.video.h264,
            'HTML5 Video (webm)': Modernizr.video.webm,
            'IndexedDB': Modernizr.indexeddb,
            'input-autocomplete': Modernizr.input.autocomplete,
            'input-autofocus': Modernizr.input.autofocus,
            'input-list': Modernizr.input.list,
            'input-placeholder': Modernizr.input.placeholder,
            'input-max': Modernizr.input.max,
            'input-min': Modernizr.input.min,
            'input-multiple': Modernizr.input.multiple,
            'input-pattern': Modernizr.input.pattern,
            'input-required': Modernizr.input.required,
            'input-step': Modernizr.input.step,
            'inputtypes-search': Modernizr.inputtypes.search,
            'inputtypes-tel': Modernizr.inputtypes.tel,
            'inputtypes-url': Modernizr.inputtypes.url,
            'inputtypes-email': Modernizr.inputtypes.email,
            'inputtypes-datetime': Modernizr.inputtypes.datetime,
            'inputtypes-date': Modernizr.inputtypes.date,
            'inputtypes-month': Modernizr.inputtypes.month,
            'inputtypes-week': Modernizr.inputtypes.week,
            'inputtypes-time': Modernizr.inputtypes.time,
            'inputtypes-datetimelocal': Modernizr.inputtypes.datetimelocal,
            'inputtypes-number': Modernizr.inputtypes.number,
            'inputtypes-range': Modernizr.inputtypes.range,
            'inputtypes-color': Modernizr.inputtypes.color,
            'localStorage': Modernizr.localstorage,
            'postMessage': Modernizr.postmessage,
            'sessionStorage': Modernizr.sessionstorage,
            'Web Sockets': Modernizr.websockets,
            'Web SQL Database': Modernizr.websqldatabase,
            'Web Workers': Modernizr.webworkers,
            // MISC
            'Geolocation API': Modernizr.geolocation,
            'Inline SVG': Modernizr.inlinesvg,
            'SMIL': Modernizr.smil,
            'SVG': Modernizr.svg,
            'SVG clip paths': Modernizr.svgclippaths,
            'Touch Events': Modernizr.touchAction,
            'WebGL': Modernizr.webgl,
            // Non-core detects
            'a-download': Modernizr.adownload,
            'audio-audiodata-api': Modernizr.audiodata,
            'audio-webaudio-api': Modernizr.webaudio,
            'battery-api': Modernizr.battery,
            'battery-level': Modernizr.lowbattery,
            'blob-constructor': Modernizr.blobconstructor,
            'canvas-todataurl-jpeg': Modernizr.todataurljpeg,
            'canvas-todataurl-webp': Modernizr.todataurlwebp,
            'contenteditable': Modernizr.contenteditable,
            'contentsecuritypolicy': Modernizr.contentsecuritypolicy,
            'cookies': Modernizr.cookies,
            'cors': Modernizr.cors,
            'css-backgroundposition-shorthand': Modernizr.bgpositionshorthand,
            'css-backgroundposition-xy': Modernizr.bgpositionxy,
            'css-backgroundrepeat-round': Modernizr.bgrepeatround,
            'css-backgroundrepeat-space': Modernizr.bgrepeatspace,
            'css-backgroundsize-cover': Modernizr.bgsizecover,
            'css-boxsizing': Modernizr.boxsizing,
            'css-calc': Modernizr.csscalc,
            'css-cubicbezierrange': Modernizr.cubicbezierrange,
            'css-display-runin': Modernizr['display-runin'],
            'css-display-table': Modernizr['display-table'],
            'css-filters': Modernizr.cssfilters,
            'css-hyphens': Modernizr.csshyphens,
            'css-softhyphens': Modernizr.softhyphens,
            'css-softhyphensfind': Modernizr.softhyphensfind,
            'css-mask': Modernizr.cssmask,
            'css-lastchild': Modernizr.lastchild,
            'css-mediaqueries': Modernizr.mediaqueries,
            'css-object-fit': Modernizr['object-fit'],
            'css-overflowscrolling': Modernizr.overflowscrolling,
            'css-pointerevents': Modernizr.pointerevents,
            'css-positionsticky': Modernizr.csspositionsticky,
            'css-remunit': Modernizr.cssremunit,
            'css-regions': Modernizr.regions,
            'css-resize': Modernizr.cssresize,
            'css-scrollbar': Modernizr.cssscrollbar,
            'css-shapes': Modernizr.shapes,
            'css-subpixelfont': Modernizr.subpixelfont,
            'css @supports': Modernizr.supports,
            'css-userselect': Modernizr.userselect,
            'css-vhunit': Modernizr.cssvhunit,
            'css-vmaxunit': Modernizr.cssvmaxunit,
            'css-vminunit': Modernizr.cssvminunit,
            'css-vwunit': Modernizr.cssvwunit,
            'custom-protocol-handler': Modernizr.customprotocolhandler,
            'dataview-api': Modernizr.dataview,
            'dom-classlist': Modernizr.classlist,
            'dom-createelement-attrs': Modernizr['createelement-attrs'],
            'dom-dataset': Modernizr.dataset,
            'dom-microdata': Modernizr.microdata,
            'elem-datalist': Modernizr.datalistelem,
            'elem-details': Modernizr.details,
            'elem-output': Modernizr.outputelem,
            'elem-progressbar': Modernizr.progressbar,
            'elem-meter': Modernizr.meter,
            'elem-ruby': Modernizr.ruby,
            'elem-time': Modernizr.time,
            'elem-track': Modernizr.track,
            'elem-texttrackapi': Modernizr.texttrackapi,
            'emoji': Modernizr.emoji,
            'es5-strictmode': Modernizr.strictmode,
            'event-devicemotion': Modernizr.devicemotion,
            'event-deviceorientation': Modernizr.deviceorientation,
            'file-api': Modernizr.filereader,
            'exif-orientation': Modernizr['exif-orientation'],
            'forms-fileinput': Modernizr.fileinput,
            'forms-formattribute': Modernizr.formattribute,
            'file-filesystem': Modernizr.filesystem,
            'forms-placeholder': Modernizr.placeholder,
            'forms-speechinput': Modernizr.speechinput,
            'forms-formvalidation': Modernizr.formvalidation,
            'fullscreen-api': Modernizr.fullscreen,
            'gamepads': Modernizr.gamepads,
            'getusermedia': Modernizr.getusermedia,
            'ie8compat': Modernizr.ie8compat,
            'iframe-sandbox': Modernizr.sandbox,
            'iframe-seamless': Modernizr.seamless,
            'iframe-srcdoc': Modernizr.srcdoc,
            'img-apng': Modernizr.apng,
            'img-webp': Modernizr.webp,
            'json': Modernizr.json,
            'lists-reversed': Modernizr.olreversed,
            'mathml': Modernizr.mathml,
            'network-connection': Modernizr.lowbandwidth,
            'network-eventsource': Modernizr.eventsource,
            'network-xhr2': Modernizr.xhr2,
            'notification': Modernizr.notification,
            'performance': Modernizr.performance,
            'pointerlock-api': Modernizr.pointerlock,
            'quota-management-api': Modernizr.quotamanagement,
            'requestAnimationFrame': Modernizr.raf,
            'script-async': Modernizr.scriptasync,
            'script-defer': Modernizr.scriptdefer,
            'style-scoped': Modernizr.stylescoped,
            'svg-filters': Modernizr.svgfilters,
            'unicode': Modernizr.unicode,
            'url-data-uri': Modernizr.datauri,
            'userdata': Modernizr.userdata,
            'vibration': Modernizr.vibrate,
            'web-intents': Modernizr.webintents,
            //'webgl-extensions': Modernizr.webgl, // TODO list properties
            'websockets-binary': Modernizr.websocketsbinary,
            'window-framed': Modernizr.framed,
            'workers-blobworkers': Modernizr.blobworkers,
            'workers-dataworkers': Modernizr.dataworkers,
            'workers-sharedworkers': Modernizr.sharedworkers,


        };

    }
]);

app.controller('viewStateController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.viewState = "/wEPDwUKMTIwNDE1NjMwMQ8WAh4TVmFsaWRhdGVSZXF1ZXN0TW9kZQIBFgJmD2QWAgIBDxYCHgdlbmN0eXBlBRNtdWx0aXBhcnQvZm9ybS1kYXRhFgYCAQ8PFgIeBVZhbHVlZ2RkAgQPZBYEAgYPFCsAAg8WBB4LXyFEYXRhQm91bmRnHgtfIUl0ZW1Db3VudAIBZGQWAmYPZBYCAgEPDxYCHwIy6AcAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGFNvZnRGbHVlbnQuUm93U2hhcmUuTGlzdBAAAAAbX3JhaXNlUHJvcGVydHlDaGFuZ2VkRXZlbnRzDF9lbnRpdHlTdGF0ZQNfaWQMX2Rpc3BsYXlOYW1lCV9mb2xkZXJJZAtfYWNjZXNzTW9kZQtfY2F0ZWdvcnlJZAhfb3B0aW9ucxBfbGFzdENvbHVtbkluZGV4BV9sY2lkDF9kZXNjcmlwdGlvbglfcm93Q291bnQIX3N1bW1hcnkQX2F1dG9OdW1iZXJWYWx1ZRJfbGFzdFVwZGF0ZURhdGVVdGMJX2xhbmd1YWdlAAQDAQMEAAQAAAEAAQAAAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQiU29mdEZsdWVudC5Sb3dTaGFyZS5MaXN0QWNjZXNzTW9kZQIAAAAIH1NvZnRGbHVlbnQuUm93U2hhcmUuTGlzdE9wdGlvbnMCAAAACAgICQ0gU3lzdGVtLkdsb2JhbGl6YXRpb24uQ3VsdHVyZUluZm8CAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAmbio0bsOOxCqKbZS1O/VvkGBgAAAAZzZGZ2Y3gB+f////v///9j6FzZEi4JQ7oWtooncu2hBfj///8iU29mdEZsdWVudC5Sb3dTaGFyZS5MaXN0QWNjZXNzTW9kZQEAAAAHdmFsdWVfXwAIAgAAAAEAAAACAAAABff///8fU29mdEZsdWVudC5Sb3dTaGFyZS5MaXN0T3B0aW9ucwEAAAAHdmFsdWVfXwAIAgAAAAAAAAAAAAAAegAAAAYKAAAAAAAAAAAKAAAAAAAAAABwdH8FZqzSCAoLZGQCCg9kFgICAQ88KwAKAgAPFgQfA2cfBAIBZAcWBg8FC0Rpc3BsYXlOYW1lBQZzZGZ2Y3gPBQpDYXRlZ29yeUlkBQEyDwULRGVzY3JpcHRpb25lDwUETGNpZAUDMTIyDwUIRm9sZGVySWQFJGQ5NWNlODYzLTJlMTItNDMwOS1iYTE2LWI2OGEyNzcyZWRhMQ8FC0NvbmN1cnJlbmN5ZxYCZg9kFgZmDw8WAh4HVmlzaWJsZWhkZAIBD2QWAmYPZBYCZg9kFgoCBg8QDxYCHwNnZBAVBwZFdmVudHMIQnVzaW5lc3MMUHJvZHVjdGl2aXR5DUVudGVydGFpbm1lbnQHRmluYW5jZQVTcG9ydAVPdGhlchUHATIBMQE2ATMBNQE0ATcUKwMHZ2dnZ2dnZxYBZmQCCQ8WAh4JaW5uZXJodG1sZWQCFQ8VAQBkAhsPDxYCHgtDb21tYW5kTmFtZQUGVXBkYXRlZGQCIA8PFgIfAmdkFgICAQ8PFgIfA2dkFgICAQ9kFhICAQ8PFgIfAmRkFgJmDw9kFgIeB2RhdGEtaWQFJGQ5NWNlODYzLTJlMTItNDMwOS1iYTE2LWI2OGEyNzcyZWRhMWQCBA9kFgQCAQ8PFgIfAjLoBAABAAAA/////wEAAAAAAAAADAIAAABWU29mdEZsdWVudC5Sb3dTaGFyZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTI5ODg3NzYzODE2Mzc4ZjYMAwAAAFVDb2RlRmx1ZW50LlJ1bnRpbWUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0xYmI2ZDdjY2NmMTA0NWVjBQEAAAAaU29mdEZsdWVudC5Sb3dTaGFyZS5Gb2xkZXIFAAAAG19yYWlzZVByb3BlcnR5Q2hhbmdlZEV2ZW50cwxfZW50aXR5U3RhdGUDX2lkDF9kaXNwbGF5TmFtZQlfcGFyZW50SWQABAMBAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQCAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAmPoXNkSLglDuha2iidy7aEGBgAAAChhbnRvaW5lLmRpZWttYW5uQG91dGxvb2suY29tIFJvb3QgRm9sZGVyAfn////7////AAAAAAAAAAAAAAAAAAAAAAtkFgJmDw8WAh4EVGV4dAUBYRYEHwgFJDEwM2ViYmU1LTU3NmItNDM1Zi05ODhhLTQ3MTI1YzRiZjdmNh4JZGF0YS1wYXRoBQJcYWQCBA9kFgQCAQ8PFgIfAjLBBAABAAAA/////wEAAAAAAAAADAIAAABWU29mdEZsdWVudC5Sb3dTaGFyZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTI5ODg3NzYzODE2Mzc4ZjYMAwAAAFVDb2RlRmx1ZW50LlJ1bnRpbWUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0xYmI2ZDdjY2NmMTA0NWVjBQEAAAAaU29mdEZsdWVudC5Sb3dTaGFyZS5Gb2xkZXIFAAAAG19yYWlzZVByb3BlcnR5Q2hhbmdlZEV2ZW50cwxfZW50aXR5U3RhdGUDX2lkDF9kaXNwbGF5TmFtZQlfcGFyZW50SWQABAMBAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQCAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAuW7PhBrV19DmIpHElxL9/YGBgAAAAFhAfn////7////Y+hc2RIuCUO6FraKJ3LtoQtkFgJmDw8WAh8JBQFhFgQfCAUkYzExNzMzMjktMmFhYy00MGYzLTlmZmMtZTQyYmI2N2M3NDBjHwoFBFxhXGFkAgQPZBYCAgEPDxYCHwIywQQAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGlNvZnRGbHVlbnQuUm93U2hhcmUuRm9sZGVyBQAAABtfcmFpc2VQcm9wZXJ0eUNoYW5nZWRFdmVudHMMX2VudGl0eVN0YXRlA19pZAxfZGlzcGxheU5hbWUJX3BhcmVudElkAAQDAQMBKENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUDAAAAC1N5c3RlbS5HdWlkC1N5c3RlbS5HdWlkAgAAAAEF/P///yhDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAQAAAAd2YWx1ZV9fAAgDAAAAAQAAAAT7////C1N5c3RlbS5HdWlkCwAAAAJfYQJfYgJfYwJfZAJfZQJfZgJfZwJfaAJfaQJfagJfawAAAAAAAAAAAAAACAcHAgICAgICAgIpMxfBrCrzQJ/85Cu2fHQMBgYAAAABYQH5////+////+W7PhBrV19DmIpHElxL9/YLZBYCZg8PFgIfCQUBYRYEHwgFJDVhOWZmMzg1LWRhY2QtNDc0Yy1iOWMyLWMxNThiYjQ1YzZjNR8KBQZcYVxhXGFkAgUPZBYEAgEPDxYCHwIy6AQAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGlNvZnRGbHVlbnQuUm93U2hhcmUuRm9sZGVyBQAAABtfcmFpc2VQcm9wZXJ0eUNoYW5nZWRFdmVudHMMX2VudGl0eVN0YXRlA19pZAxfZGlzcGxheU5hbWUJX3BhcmVudElkAAQDAQMBKENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUDAAAAC1N5c3RlbS5HdWlkC1N5c3RlbS5HdWlkAgAAAAEF/P///yhDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAQAAAAd2YWx1ZV9fAAgDAAAAAQAAAAT7////C1N5c3RlbS5HdWlkCwAAAAJfYQJfYgJfYwJfZAJfZQJfZgJfZwJfaAJfaQJfagJfawAAAAAAAAAAAAAACAcHAgICAgICAgJj6FzZEi4JQ7oWtooncu2hBgYAAAAoYW50b2luZS5kaWVrbWFubkBvdXRsb29rLmNvbSBSb290IEZvbGRlcgH5////+////wAAAAAAAAAAAAAAAAAAAAALZBYCZg8PFgIfCQUBbhYEHwgFJGQ4MmEwNzc3LTgzYWMtNGJkZC04ZmQ0LTE5NmQ4NmQ2MDE4Yx8KBQJcbmQCBA9kFgQCAQ8PFgIfAjLBBAABAAAA/////wEAAAAAAAAADAIAAABWU29mdEZsdWVudC5Sb3dTaGFyZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTI5ODg3NzYzODE2Mzc4ZjYMAwAAAFVDb2RlRmx1ZW50LlJ1bnRpbWUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0xYmI2ZDdjY2NmMTA0NWVjBQEAAAAaU29mdEZsdWVudC5Sb3dTaGFyZS5Gb2xkZXIFAAAAG19yYWlzZVByb3BlcnR5Q2hhbmdlZEV2ZW50cwxfZW50aXR5U3RhdGUDX2lkDF9kaXNwbGF5TmFtZQlfcGFyZW50SWQABAMBAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQCAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAncHKtisg91Lj9QZbYbWAYwGBgAAAAFuAfn////7////Y+hc2RIuCUO6FraKJ3LtoQtkFgJmDw8WAh8JBQFmFgQfCAUkNjgxNjRkZjUtM2EyNS00YzNkLWE4MDYtYTM0MjBlNDJlNzEzHwoFBFxuXGZkAgQPZBYEAgEPDxYCHwIywQQAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGlNvZnRGbHVlbnQuUm93U2hhcmUuRm9sZGVyBQAAABtfcmFpc2VQcm9wZXJ0eUNoYW5nZWRFdmVudHMMX2VudGl0eVN0YXRlA19pZAxfZGlzcGxheU5hbWUJX3BhcmVudElkAAQDAQMBKENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUDAAAAC1N5c3RlbS5HdWlkC1N5c3RlbS5HdWlkAgAAAAEF/P///yhDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAQAAAAd2YWx1ZV9fAAgDAAAAAQAAAAT7////C1N5c3RlbS5HdWlkCwAAAAJfYQJfYgJfYwJfZAJfZQJfZgJfZwJfaAJfaQJfagJfawAAAAAAAAAAAAAACAcHAgICAgICAgL1TRZoJTo9TKgGo0IOQucTBgYAAAABZgH5////+////3cHKtisg91Lj9QZbYbWAYwLZBYCZg8PFgIfCQUDZnNmFgQfCAUkYTczNmJkYWMtYjYxMi00NWFlLWEzNWItNmU1MDM3ZjA2MWU3HwoFCFxuXGZcZnNmZAIED2QWAgIBDw8WAh8CMsMEAAEAAAD/////AQAAAAAAAAAMAgAAAFZTb2Z0Rmx1ZW50LlJvd1NoYXJlLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Mjk4ODc3NjM4MTYzNzhmNgwDAAAAVUNvZGVGbHVlbnQuUnVudGltZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTFiYjZkN2NjY2YxMDQ1ZWMFAQAAABpTb2Z0Rmx1ZW50LlJvd1NoYXJlLkZvbGRlcgUAAAAbX3JhaXNlUHJvcGVydHlDaGFuZ2VkRXZlbnRzDF9lbnRpdHlTdGF0ZQNfaWQMX2Rpc3BsYXlOYW1lCV9wYXJlbnRJZAAEAwEDAShDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAwAAAAtTeXN0ZW0uR3VpZAtTeXN0ZW0uR3VpZAIAAAABBfz///8oQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQEAAAAHdmFsdWVfXwAIAwAAAAEAAAAE+////wtTeXN0ZW0uR3VpZAsAAAACX2ECX2ICX2MCX2QCX2UCX2YCX2cCX2gCX2kCX2oCX2sAAAAAAAAAAAAAAAgHBwICAgICAgICrL02pxK2rkWjW25QN/Bh5wYGAAAAA2ZzZgH5////+/////VNFmglOj1MqAajQg5C5xMLZBYCZg8PFgIfCQUBbBYEHwgFJDIwMmIzZWI0LTA1ZDktNDRhZS1iZGMwLWY2OGVkMzIwNGNjOR8KBQpcblxmXGZzZlxsZAIGD2QWAgIBDw8WAh8CMugEAAEAAAD/////AQAAAAAAAAAMAgAAAFZTb2Z0Rmx1ZW50LlJvd1NoYXJlLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Mjk4ODc3NjM4MTYzNzhmNgwDAAAAVUNvZGVGbHVlbnQuUnVudGltZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTFiYjZkN2NjY2YxMDQ1ZWMFAQAAABpTb2Z0Rmx1ZW50LlJvd1NoYXJlLkZvbGRlcgUAAAAbX3JhaXNlUHJvcGVydHlDaGFuZ2VkRXZlbnRzDF9lbnRpdHlTdGF0ZQNfaWQMX2Rpc3BsYXlOYW1lCV9wYXJlbnRJZAAEAwEDAShDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAwAAAAtTeXN0ZW0uR3VpZAtTeXN0ZW0uR3VpZAIAAAABBfz///8oQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQEAAAAHdmFsdWVfXwAIAwAAAAEAAAAE+////wtTeXN0ZW0uR3VpZAsAAAACX2ECX2ICX2MCX2QCX2UCX2YCX2cCX2gCX2kCX2oCX2sAAAAAAAAAAAAAAAgHBwICAgICAgICY+hc2RIuCUO6FraKJ3LtoQYGAAAAKGFudG9pbmUuZGlla21hbm5Ab3V0bG9vay5jb20gUm9vdCBGb2xkZXIB+f////v///8AAAAAAAAAAAAAAAAAAAAAC2QWAmYPDxYCHwkFAiB2FgQfCAUkMTdhMDI2OWMtNDkwZS00MDIwLTlmZTEtMDIyNWZkYmYyYjcwHwoFA1wgdmQCBw9kFgICAQ8PFgIfAjLoBAABAAAA/////wEAAAAAAAAADAIAAABWU29mdEZsdWVudC5Sb3dTaGFyZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTI5ODg3NzYzODE2Mzc4ZjYMAwAAAFVDb2RlRmx1ZW50LlJ1bnRpbWUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0xYmI2ZDdjY2NmMTA0NWVjBQEAAAAaU29mdEZsdWVudC5Sb3dTaGFyZS5Gb2xkZXIFAAAAG19yYWlzZVByb3BlcnR5Q2hhbmdlZEV2ZW50cwxfZW50aXR5U3RhdGUDX2lkDF9kaXNwbGF5TmFtZQlfcGFyZW50SWQABAMBAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQCAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAmPoXNkSLglDuha2iidy7aEGBgAAAChhbnRvaW5lLmRpZWttYW5uQG91dGxvb2suY29tIFJvb3QgRm9sZGVyAfn////7////AAAAAAAAAAAAAAAAAAAAAAtkFgJmDw8WAh8JBQFiFgQfCAUkNGU1NzIwYzQtZjJmMy00NTJmLWE1YmUtZDI4OTNjZGE5MTc3HwoFAlxiZAIID2QWBAIBDw8WAh8CMugEAAEAAAD/////AQAAAAAAAAAMAgAAAFZTb2Z0Rmx1ZW50LlJvd1NoYXJlLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Mjk4ODc3NjM4MTYzNzhmNgwDAAAAVUNvZGVGbHVlbnQuUnVudGltZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTFiYjZkN2NjY2YxMDQ1ZWMFAQAAABpTb2Z0Rmx1ZW50LlJvd1NoYXJlLkZvbGRlcgUAAAAbX3JhaXNlUHJvcGVydHlDaGFuZ2VkRXZlbnRzDF9lbnRpdHlTdGF0ZQNfaWQMX2Rpc3BsYXlOYW1lCV9wYXJlbnRJZAAEAwEDAShDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAwAAAAtTeXN0ZW0uR3VpZAtTeXN0ZW0uR3VpZAIAAAABBfz///8oQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQEAAAAHdmFsdWVfXwAIAwAAAAEAAAAE+////wtTeXN0ZW0uR3VpZAsAAAACX2ECX2ICX2MCX2QCX2UCX2YCX2cCX2gCX2kCX2oCX2sAAAAAAAAAAAAAAAgHBwICAgICAgICY+hc2RIuCUO6FraKJ3LtoQYGAAAAKGFudG9pbmUuZGlla21hbm5Ab3V0bG9vay5jb20gUm9vdCBGb2xkZXIB+f////v///8AAAAAAAAAAAAAAAAAAAAAC2QWAmYPDxYCHwkFCVRlbXBsYXRlcxYEHwgFJGUzYjYwZGYwLTk5MGMtNDJkNi1hNjdiLTc3NTJlOGVmYTFhOB8KBQpcVGVtcGxhdGVzZAIED2QWAgIBDw8WAh8CMskEAAEAAAD/////AQAAAAAAAAAMAgAAAFZTb2Z0Rmx1ZW50LlJvd1NoYXJlLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Mjk4ODc3NjM4MTYzNzhmNgwDAAAAVUNvZGVGbHVlbnQuUnVudGltZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTFiYjZkN2NjY2YxMDQ1ZWMFAQAAABpTb2Z0Rmx1ZW50LlJvd1NoYXJlLkZvbGRlcgUAAAAbX3JhaXNlUHJvcGVydHlDaGFuZ2VkRXZlbnRzDF9lbnRpdHlTdGF0ZQNfaWQMX2Rpc3BsYXlOYW1lCV9wYXJlbnRJZAAEAwEDAShDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAwAAAAtTeXN0ZW0uR3VpZAtTeXN0ZW0uR3VpZAIAAAABBfz///8oQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQEAAAAHdmFsdWVfXwAIAwAAAAEAAAAE+////wtTeXN0ZW0uR3VpZAsAAAACX2ECX2ICX2MCX2QCX2UCX2YCX2cCX2gCX2kCX2oCX2sAAAAAAAAAAAAAAAgHBwICAgICAgIC8A224wyZ1kKme3dS6O+hqAYGAAAACVRlbXBsYXRlcwH5////+////2PoXNkSLglDuha2iidy7aELZBYCZg8PFgIfCQUCRlIWBB8IBSQ2MWYzNDgyOS0yYmY1LTQ2OGUtYTBhNC0yNjQzOWQzMjc1ZTUfCgUNXFRlbXBsYXRlc1xGUmQCCQ9kFgICAQ8PFgIfAjLoBAABAAAA/////wEAAAAAAAAADAIAAABWU29mdEZsdWVudC5Sb3dTaGFyZSwgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPTI5ODg3NzYzODE2Mzc4ZjYMAwAAAFVDb2RlRmx1ZW50LlJ1bnRpbWUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0xYmI2ZDdjY2NmMTA0NWVjBQEAAAAaU29mdEZsdWVudC5Sb3dTaGFyZS5Gb2xkZXIFAAAAG19yYWlzZVByb3BlcnR5Q2hhbmdlZEV2ZW50cwxfZW50aXR5U3RhdGUDX2lkDF9kaXNwbGF5TmFtZQlfcGFyZW50SWQABAMBAwEoQ29kZUZsdWVudC5SdW50aW1lLkNvZGVGbHVlbnRFbnRpdHlTdGF0ZQMAAAALU3lzdGVtLkd1aWQLU3lzdGVtLkd1aWQCAAAAAQX8////KENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUBAAAAB3ZhbHVlX18ACAMAAAABAAAABPv///8LU3lzdGVtLkd1aWQLAAAAAl9hAl9iAl9jAl9kAl9lAl9mAl9nAl9oAl9pAl9qAl9rAAAAAAAAAAAAAAAIBwcCAgICAgICAmPoXNkSLglDuha2iidy7aEGBgAAAChhbnRvaW5lLmRpZWttYW5uQG91dGxvb2suY29tIFJvb3QgRm9sZGVyAfn////7////AAAAAAAAAAAAAAAAAAAAAAtkFgJmDw8WAh8JBQJqLBYEHwgFJGE4MjI3NDBlLTg2NWEtNDcwMS1iOWZlLWFmOTA2MTk0OTYyZR8KBQNcaixkAgoPZBYCAgEPDxYCHwIy6AQAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGlNvZnRGbHVlbnQuUm93U2hhcmUuRm9sZGVyBQAAABtfcmFpc2VQcm9wZXJ0eUNoYW5nZWRFdmVudHMMX2VudGl0eVN0YXRlA19pZAxfZGlzcGxheU5hbWUJX3BhcmVudElkAAQDAQMBKENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUDAAAAC1N5c3RlbS5HdWlkC1N5c3RlbS5HdWlkAgAAAAEF/P///yhDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAQAAAAd2YWx1ZV9fAAgDAAAAAQAAAAT7////C1N5c3RlbS5HdWlkCwAAAAJfYQJfYgJfYwJfZAJfZQJfZgJfZwJfaAJfaQJfagJfawAAAAAAAAAAAAAACAcHAgICAgICAgJj6FzZEi4JQ7oWtooncu2hBgYAAAAoYW50b2luZS5kaWVrbWFubkBvdXRsb29rLmNvbSBSb290IEZvbGRlcgH5////+////wAAAAAAAAAAAAAAAAAAAAALZBYCZg8PFgIfCQUDQUFBFgQfCAUkOWUwYzNlZjctMTU3YS00NjU1LWI1ODUtOTI2OGYzZDRkYTI2HwoFBFxBQUFkAgsPZBYCAgEPDxYCHwIy6AQAAQAAAP////8BAAAAAAAAAAwCAAAAVlNvZnRGbHVlbnQuUm93U2hhcmUsIFZlcnNpb249MS4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOTg4Nzc2MzgxNjM3OGY2DAMAAABVQ29kZUZsdWVudC5SdW50aW1lLCBWZXJzaW9uPTEuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MWJiNmQ3Y2NjZjEwNDVlYwUBAAAAGlNvZnRGbHVlbnQuUm93U2hhcmUuRm9sZGVyBQAAABtfcmFpc2VQcm9wZXJ0eUNoYW5nZWRFdmVudHMMX2VudGl0eVN0YXRlA19pZAxfZGlzcGxheU5hbWUJX3BhcmVudElkAAQDAQMBKENvZGVGbHVlbnQuUnVudGltZS5Db2RlRmx1ZW50RW50aXR5U3RhdGUDAAAAC1N5c3RlbS5HdWlkC1N5c3RlbS5HdWlkAgAAAAEF/P///yhDb2RlRmx1ZW50LlJ1bnRpbWUuQ29kZUZsdWVudEVudGl0eVN0YXRlAQAAAAd2YWx1ZV9fAAgDAAAAAQAAAAT7////C1N5c3RlbS5HdWlkCwAAAAJfYQJfYgJfYwJfZAJfZQJfZgJfZwJfaAJfaQJfagJfawAAAAAAAAAAAAAACAcHAgICAgICAgJj6FzZEi4JQ7oWtooncu2hBgYAAAAoYW50b2luZS5kaWVrbWFubkBvdXRsb29rLmNvbSBSb290IEZvbGRlcgH5////+////wAAAAAAAAAAAAAAAAAAAAALZBYCZg8PFgIfCQUDQ0NDFgQfCAUkMWJiZDJlNWMtYzlhNy00MDg1LThiYWUtZDA1MzVlZDdjNjU3HwoFBFxDQ0NkAgIPDxYCHwVoZGQCEQ8QZA8WAmYCARYCEAUHRW5nbGlzaAUCZW5nEAUJZnJhbsOnYWlzBQJmcmcWAQIBZBgDBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUcY3RsMDAkbWFpbiRjdGwwNSRDb25jdXJyZW5jeQUQY3RsMDAkbWFpbiRjdGwwNQ8UKwAHZGQCAgIBFQEJRW50aXR5S2V5FgEPBQlFbnRpdHlLZXkFJDQ2YTNlMjY2LTM4ZWMtNDJlYy1hOGE2LWQ5NGI1M2JmNTZmOQIBZAUQY3RsMDAkbWFpbiRjdGwwMg8UKwAOZGRkZGRkFQEJRW50aXR5S2V5FCsAARQrAAEFJDQ2YTNlMjY2LTM4ZWMtNDJlYy1hOGE2LWQ5NGI1M2JmNTZmOQIBZGRkZgL/////D2QIy6+inIy0q09sBuHCzcDAnI3XvUdHsY1Q+PxNohr0wA==";

        $scope.decode = function () {
            $http.post('/api/viewstate/decode', angular.toJson($scope.viewState)).success(function (data) {
                $scope.result = data;
            });
        }
    }
]);