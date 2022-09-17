/*
 *  Blipshot
 *  Screenshotter.DOM.js
 *  Half of the screenshotter algorithm. See Screenshotter.js for the other half.
 *
 *  ==========================================================================================
 *
 *  Copyright (c) 2010-2021, Erin Casali.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification, are
 *  permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this list of
 *  conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright notice, this list of
 *  conditions and the following disclaimer in the documentation and/or other materials
 *  provided with the distribution.
 *  Neither the name of the Baker Framework nor the names of its contributors may be used to
 *  endorse or promote products derived from this software without specific prior written
 *  permission.
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

  var shared = {};
  var templates = {};

  const SCROLL_DELAY = 500; // The delay is due to: https://github.com/folletto/Blipshot/issues/25

  // ****************************************************************************************** SCREENSHOT SEQUENCE

  // 1
  function screenshotBegin(shared) {
    console.log("1 screenshotBegin", shared)
    // Identify which part of the DOM is "scrolling", and store the previous position
    var scrollNode = document.scrollingElement || document.documentElement;

    if (scrollNode.scrollHeight > 32766) {
      alert("Due to Chrome canvas memory limits, the screenshot will be limited to 32766px height.\n\n");
    }

    shared.originalScrollTop = scrollNode.scrollTop; // ->[] save user scrollTop
    shared.tab.hasVscrollbar = (window.innerHeight < scrollNode.scrollHeight);
    scrollNode.scrollTop = 0;
    setTimeout(function() { screenshotVisibleArea(shared); }, 100);
  }

  // 2
  function screenshotVisibleArea(shared) { 
    console.log("2 screenshotVisibleArea", shared)
    chrome.runtime.sendMessage({ action: 'screenshotVisibleArea',type: 'screenshotVisibleArea', shared: shared }); 
  }

  // 3
  function screenshotScroll(shared) {
    console.log("3 screenshotScroll", shared)
    // Identify which part of the DOM is "scrolling", and store the previous position
    var scrollNode = document.scrollingElement || document.documentElement;
    var scrollTopBeforeScrolling = scrollNode.scrollTop;

    // Scroll down!
    scrollNode.scrollTop += window.innerHeight;

    if (scrollNode.scrollTop == scrollTopBeforeScrolling || scrollNode.scrollTop > 32766) { // 32766 --> Skia / Chrome Canvas Limitation, see recursiveImageMerge()
      // END ||
      shared.imageDirtyCutAt = scrollTopBeforeScrolling % window.innerHeight;
      scrollNode.scrollTop = shared.originalScrollTop; // <-[] restore user scrollTop
      screenshotEnd(shared);
    } else {
      // LOOP >>
      // This bounces to the screenshot call before coming back in this function.
      setTimeout(function() { screenshotVisibleArea(shared); }, SCROLL_DELAY);
    }
  }

  // 4
  function screenshotEnd(shared) { 
    console.log("4 screenshotEnd", shared)
    chrome.runtime.sendMessage({ action: 'screenshotEnd', type: 'screenshotEnd', shared: shared }); 
  }


  function handleRecursiveImageMerge(shared, imageDataURLPartial) { 
    console.log("4 handleRecursiveImageMerge", shared)
    recursiveImageMerge(imageDataURLPartial, shared.imageDirtyCutAt, shared.tab.hasVscrollbar, function(image) {
      shared.imageDataURL = image;
      chrome.runtime.sendMessage({ action: 'screenshotReturn', type: 'screenshotReturn', shared: shared }); 
    });
  }


  function recursiveImageMerge (imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, i) {
    /****************************************************************************************************
     * This function merges together all the pieces gathered during the scroll, recursively.
     * Returns a single data:// URL object from canvas.toDataURL("image/png") to the callback.
     */
    i = i || 0;
    images = images || [];

    let readBox = document.getElementById('readBox');
    let contentWidth = readBox.clientWidth + 40;

    if (i < imageDataURLs.length) {
      images[i] = new Image();
      images[i].onload = function() {
        imageDataURLs[i] = null; // clear for optimize memory consumption (not sure)
        if (i == imageDataURLs.length - 1) {
          // ****** We're at the end of the chain, let's have fun with canvas.
          var canvas = window.document.createElement('canvas');

          // NOTE: Resizing a canvas is destructive, we can do it just now before stictching
          //canvas.width = contentWidth - (hasVscrollbar ? 15 : 0); // <-- manage V scrollbar
          canvas.width = contentWidth; // <-- manage V scrollbar

          if (images.length > 1) canvas.height = (imageDataURLs.length - 1) * images[0].height + imageDirtyCutAt;
          else canvas.height = images[0].height;

          // Ouch: Skia / Chromium limitation
          // https://bugs.chromium.org/p/chromium/issues/detail?id=339725
          // https://bugs.chromium.org/p/skia/issues/detail?id=2122
          if (canvas.height > 32766) canvas.height = 32766;

          // ****** Stitch
          for (var j = 0; j < images.length; j++) {
            var cut = 0;
            if (images.length > 1 && j == images.length - 1) cut = images[j].height - imageDirtyCutAt;

            var height = images[j].height - cut;
            var width = contentWidth;
            let sx = (images[j].width - contentWidth)/2
            // void canvas.getContext("2d").drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            //console.log("[i:" + i + ", j:" + j + "] --- total images:" + imageDataURLs.length);
            //console.log("--> drawImage(images[" + j + "], sx:0, sy/cut:" + cut + ", swidth:" + width + ", sheight:" + height + ", dx:0, dy:" + (j * images[0].height) + ", dwidth:" + width + ", dheight:" + height + ");");
            canvas.getContext("2d").drawImage(images[j], sx, cut, width, height, 0, j * images[0].height, width, height);
          }

          callback(canvas.toDataURL("image/jpeg")); // --> CALLBACK (note that the file type is used also in the drag function)
        } else {
          // ****** Down!
          recursiveImageMerge(imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, ++i);
        }
      }
      images[i].src = imageDataURLs[i]; // Load!
    }
  }

  // 5
  function screenshotReturn(shared) {
    console.log("5 screenshotReturn", shared)
    function pad2(str) { if ((str + "").length == 1) return "0" + str; return "" + str; }

    var d = new Date();
    var timestamp = '' + d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + '-' + pad2(d.getHours()) + '' + pad2(d.getMinutes()) + '\'' + pad2(d.getSeconds()) + '';
    var filename = "pageshot of '" + normalizeFileName(shared.tab.title) + "' @ " + timestamp;
    var blobURL = dataToBlobURL(shared.imageDataURL);

    if (blobURL) {
      var img = document.createElement('a');
      img.href = blobURL;
      img.download = filename + '.jpeg';
      img.click();
    } else {
      // ****** No content! Maybe page too long?
      alert("I'm sorry.\n\nThere was some trouble in generating the screenshot.\n\nIt might be due to Chrome canvas size limitations.\nTry on a shorter page?\n\n");
    }

  }

  // ****************************************************************************************** EVENT MANAGER / HALF
  function eventManagerInit() {
    /****************************************************************************************************
     * This function prepares the internal plugin callbacks to bounce between the plugin and DOM side.
     * It's initialized right after declaration.
     */
    var self = this;
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("Screenshotter.DOM", request)
        switch (request.action) {
          case "screenshotBegin": screenshotBegin(request.shared); break;
          case "screenshotScroll": screenshotScroll(request.shared); break;
          case "screenshotReturn": screenshotReturn(request.shared); break;
        }

        sendResponse(true); // this can be checked to verify if the script is loaded (heartbeat)
    });
  }
  //eventManagerInit(); // Init

  // ****************************************************************************************** SUPPORT
  function renderScreenshotOverlay(blobURL, filename, callback) {
    // ****** Add DOM Elements to Page
    renderTemplate("overlay", {
      blobURL: blobURL,
      filename: filename,
      pageHeight: window.document.body.scrollHeight,
    }, callback);
  }

  function renderTemplate(name, data, callback) {
    /****************************************************************************************************
     * Loads the template and rendes it on the DOM.
     */
    var name = name || "template";

    if (!templates[name]) {
      // Load, cache and use
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function() {
        templates[name] = this.responseText;
        appendTemplate(templates[name], data, callback);
      });
      xhr.open("GET", chrome.runtime.getURL("resources/" + name + ".html"));
      xhr.send();
    } else {
      // Use cached
      appendTemplate(templates[name], data, callback);
    }
  }

  function appendTemplate(templateString, data, callback) {
    /****************************************************************************************************
     * Replaces the variables in the template and appends them to the DOM.
     */
    var templatePrepared = templateString;

    for(var key in data) {
      templatePrepared = templatePrepared.replace(new RegExp("{" + key + "}", "g"), data[key]);
    }

    var div = window.document.createElement('div');
    div.innerHTML = templatePrepared;
    window.document.body.appendChild(div);

    callback(div);
  }

  function dataToBlobURL(dataURL) {
    /****************************************************************************************************
     * Converts a data:// URL (i.e. `canvas.toDataURL("image/png")`) to a blob:// URL.
     * This allows a shorter URL and a simple management of big data objects.
     *
     * Contributor: Ben Ellis <https://github.com/ble>
     */
    var parts = dataURL.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);

    if (parts && parts.length >= 3) {
      // Assume base64 encoding
      var binStr = atob(parts[3]);

      // Convert to binary in ArrayBuffer
      var buf = new ArrayBuffer(binStr.length);
      var view = new Uint8Array(buf);
      for(var i = 0; i < view.length; i++)
        view[i] = binStr.charCodeAt(i);

      // Create blob with mime type, create URL for it
      var blob = new Blob([view], {'type': parts[1]});
      var objectURL = window.URL.createObjectURL(blob)

      return objectURL;
    } else {
      return null;
    }
  }

  function normalizeFileName(string) {
    out = string;
    //out = out.replace(/"/, '\''); // To avoid collision with DOM attribute
    //out = out.replace(/\/\?<>\\:\*\|/, '-'); // Windows safe
    out = out.replace(/[^a-zA-Z0-9_\-+,;'!?$£@&%()\[\]=]/g, " ").replace(/ +/g, " "); // Hard replace
    return out;
  }



/*
 *  Blanket CSS Style Set
 *  Converts a specific CSS property temporarily to another.
 *
 *  ==========================================================================================
 *
 *  Copyright (c) 2014, Erin Casali.
 *  All rights reserved.
 *
 *  Thanks to Guillermo Rauch.
 *
 *  Redistribution and use in source and binary forms, with or without modification, are
 *  permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this list of
 *  conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright notice, this list of
 *  conditions and the following disclaimer in the documentation and/or other materials
 *  provided with the distribution.
 *  Neither the name of the Baker Framework nor the names of its contributors may be used to
 *  endorse or promote products derived from this software without specific prior written
 *  permission.
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *  ==========================================================================================
 *
 *  USAGE:
 *  Include this file in the manifest.js as 'content_scripts', for example:
 *
 *    "content_scripts": [
 *      { "js": [ "blanketStyleSet.js" ], "matches": [ "<all_urls>" ], "run_at": "document_end" }
 *    ],
 *
 *  Call its functions using:
 *
 *    chrome.tabs.sendMessage(this.shared.tab.id, { action: 'blanketStyleSet', property: 'position', from: "fixed", to: 'absolute' });
 *
 *  Restore by calling:
 *
 *    chrome.tabs.sendMessage(this.shared.tab.id, { action: 'blanketStyleRestore', property: 'position' });
 *
 */

  var reverse = []; // Store the nodes to restore for each changed property (2-levels array)

  // ****************************************************************************************** EVENT MANAGER / HALF
  function eventManagerInit() {
    /****************************************************************************************************
     * This function prepares the internal plugin callbacks to bounce between the plugin and DOM side.
     * It's initialized right after declaration.
     */
     browser.runtime.onMessage.addListener(function(e) {
        console.log( "blanketStyleSet", e.action );
        switch (e.action) {
          case "blanketStyleSet": blanketStyleSet(e.property, e.from, e.to); break;
          case "blanketStyleRestore": blanketStyleRestore(e.property); break;
        }
    });
  }
  //eventManagerInit(); // Init

  function blanketStyleSet(property, from, to) {
    /****************************************************************************************************
     * Convert a CSS property value to a specific value for every DOM node
     * From a function by @guille
     */
    var els = document.getElementsByTagName('*');
    var el;
    var styles;

    // ****** Store the Restores
    if (property in reverse) {
      // This property was already reset!
      // Switch back before applying...
      blanketStyleRestore(property);
    }
    reverse[property] = [];

    // ****** Iterate the DOM
    for (var i = 0, l = els.length; i < l; i++) {
      el = els[i];

      if (from == el.style[property]) {
        // *** Check for node style:
        el.style[property] = to;
        reverse[property].push(function() {
          this.style[property] = from;
        }.bind(el));
      } else {
        // *** Check for computed style:
        styles = getComputedStyle(el);
        if (from == styles.getPropertyValue(property)) {
          el.style[property] = to;
          reverse[property].push(function(){
            this.style[property] = from;
          }.bind(el));
        }
      }
    }
  }

  function blanketStyleRestore(property) {
    /****************************************************************************************************
     * Convert back
     * From a function by @guille
     */
    var fx;

    while (fx = reverse[property].shift()) {
      fx();
    }
    delete reverse[property];
  };
