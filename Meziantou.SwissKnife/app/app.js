'use strict';

var app = angular.module('app', [
    'ngRoute'
    //'ui.bootstrap'
]);


app.config(function ($routeProvider) {
    $routeProvider
     .when('/browser-info', {
         templateUrl: 'views/BrowserInfo.html',
         controller: 'browserInfoController',
     })
    .when('/tools', {
        templateUrl: 'views/tools.html',

    })
    .otherwise({
        redirectTo: '/tools'
    });
});

app.controller('guidGeneratorController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.newGuid = function () {
            $http.get('/api/guid/new').success(function (data) {
                $scope.value = angular.fromJson(data);
            });
        }
    }
]);

app.controller('xmlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/xml/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }

        $scope.decode = function () {
            $http.post('/api/xml/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }
    }
]);

app.controller('xmlAttributeEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/xml-attribute/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }

        $scope.decode = function () {
            $http.post('/api/xml-attribute/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }
    }
]);

app.controller('urlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/url/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }

        $scope.pathEncode = function () {
            $http.post('/api/url/path-encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }

        $scope.decode = function () {
            $http.post('/api/url/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }
    }
]);

app.controller('htmlEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/html/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }

        $scope.decode = function () {
            $http.post('/api/html/decode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
            });
        }
    }
]);

app.controller('htmlAttributeEncodeController', [
    '$scope', '$http', function ($scope, $http) {
        $scope.encode = function () {
            $http.post('/api/html-attribute/encode', angular.toJson($scope.value)).success(function (data) {
                $scope.result = angular.fromJson(data);
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
            $scope.ipAddress = angular.fromJson(data);
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