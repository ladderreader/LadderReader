console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';
import * as WebDAV from 'webdav';
import * as permission
                   from 'permission';
import * as tips   from 'tips';
import PureRead    from 'puread';

// global update site tab id
let upTabId = -1;

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    storage.puread = new PureRead( storage.sites );
    if ( local.Firstload() ) {
        local.Version( ver.version );
        browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#firstload?ver=" + ver.version ) });
    }
    else {
       !local.Count() && storage.GetRemote( "remote", ( result, error ) => {
            if ( !error ) {
                storage.pr.Addsites( result );
                storage.Writesite( storage.pr.sites, getNewsitesHandler );
            }
        });
        ver.version != storage.version && storage.GetRemote( "local", ( result, error ) => {
            storage.pr.Addsites( result );
            storage.Writesite( storage.pr.sites, () => {
                ver.version != storage.version &&
                storage.Fix( storage.read.sites, storage.version, ver.version, storage.focus.sites );
                ver.version != storage.version && storage.Write( () => {
                        local.Version( ver.version );
                        browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#update?ver=" + ver.version ) });
                }, ver.Verify( storage.version, storage.simpread ) );
                getNewsitesHandler( result );
            });
        });
        ver.version == storage.version && ver.patch != storage.patch &&
            storage.Write(()=> {
                // when x.x.x.yyyy is silent update
                //browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#update?patch=" + ver.patch ) });
                //localStorage.setItem( "simpread-patch-update", true );
                local.Patch( "add", true );
            }, ver.FixSubver( ver.patch, storage.simpread ));
    }
    menu.CreateAll();
    setTimeout( ()=>uninstall(), 100 );
});

/**
 * Get newsites handler
 * @param {object} count: update site cou
 */
function getNewsitesHandler( result ) {
    watch.Push( "site", true );
}

/**
 * Listen menu event handler
 */
menu.OnClicked( ( info, tab ) => {
    console.log( "background contentmenu Listener", info, tab );
    tracked({ eventCategory: "menu", eventAction: "menu", eventValue: info.menuItemId });
    if ( info.menuItemId == "link" ) {
        info.linkUrl && browser.tabs.create({ url: info.linkUrl + "?simpread_mode=read" });
    } else if ( info.menuItemId == "list" ) {
        browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#later" ) });
    } else if ( info.menuItemId == "whitelist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_whitelist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "exclusion" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_exclusion, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "blacklist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_blacklist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "unrdist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_unrdist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "lazyload" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_lazyload, {url: info.pageUrl } ));
    } else {
        if ( !tab.url.startsWith( "chrome://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    }
});

/**
 * Listen runtime message, include: `corb`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.CORB ) {
        $.ajax( request.value.settings )
            .done( result => {
                sendResponse({ done: result });
            })
            .fail( ( jqXHR, textStatus, errorThrown ) => {
                sendResponse({ fail: { jqXHR, textStatus, errorThrown }});
            });
    }
    return true;
});

/**
 * Listen runtime message, include: `jianguo`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.jianguo ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                dav.dir( method.root + "/" + method.folder ).mkdir( result => {
                    sendResponse({ done: result, status: result.status });
                });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.path ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        } else if ( method.type == "read" ) {
            dav.file( method.path ).read( result => {
                sendResponse({ done: result.response, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `webdav`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.WebDAV ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                sendResponse({ done: result, status: result.status });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.root + "/" + method.name ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `download`, `base64` && `permission`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.download ) {
        const { data, name } = request.value;
        const blob = new Blob([data], {
            type: "html/plain;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        browser.downloads.download({
            url     : url,
            filename: name.replace( /[|]/ig, "" ),
        }, downloadId => {
            sendResponse({ done: downloadId });
        });
    } else if ( request.type == msg.MESSAGE_ACTION.base64 ) {
        const { url } = request.value;
        fetch( url )
            .then( response => response.blob() )
            .then( blob     => new Promise(( resolve, reject ) => {
                const reader = new FileReader()
                reader.onloadend = event => {
                    sendResponse({ done: { url, uri: event.target.result }});
                };
                reader.onerror = error => {
                    sendResponse({ fail: { error, url } });
                };
                reader.readAsDataURL( blob );
            }))
            .catch( error => {
                sendResponse({ fail: { error, url } });
            });
    } else if ( request.type == msg.MESSAGE_ACTION.permission ) {
        permission.Get({ permissions: [ "downloads" ] }, result => {
            sendResponse({ done: result });
        });
    }
    return true;
});

/**
 * Listen runtime message, include: `snapshot`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.snapshot ) {
        const { left, top, width, height } = request.value;
        chrome.tabs.captureVisibleTab( { format: "png" }, base64 => {
            const image  = new Image();
            image.src    = base64;
            image.onload = () => {
                const canvas  = document.createElement( "canvas" ),
                      ctx     = canvas.getContext( "2d" ),
                      dpi     = self.devicePixelRatio,
                      sx      = left   * dpi,
                      sy      = top    * dpi,
                      sWidth  = width  * dpi,
                      sHeight = height * dpi;
                canvas.width  = sWidth;
                canvas.height = sHeight;
                ctx.drawImage( image, sx, sy, sWidth, height * dpi, 0, 0, sWidth, sHeight );
                const uri     = canvas.toDataURL( "image/png" );
                sendResponse({ done: uri });
          };
        });
    }
    return true;
});

/**
 * Listen runtime message
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "background runtime Listener", request );
    switch ( request.type ) {
        case msg.MESSAGE_ACTION.shortcuts:
            getCurTab( { url: request.value.url }, tabs => {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.shortcuts ));
            });
            break;
        case msg.MESSAGE_ACTION.browser_action:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 && tabs[0].url == request.value.url ) {
                    setMenuAndIcon( tabs[0].id, request.value.code );
                } else console.error( request );
            });
            break;
        case msg.MESSAGE_ACTION.new_tab:
            browser.tabs.create({ url: request.value.url });
            break;
        case msg.MESSAGE_ACTION.close_tab:
            getCurTab( { "active": true }, tabs => {
                tabs.forEach( tab => {
                    tab.active && tab.url == request.value.url &&
                        browser.tabs.remove( tab.id );
                });
            });
            break;
        case msg.MESSAGE_ACTION.menu:
            const { id, value } = request.value;
            // hack code refresh options menu changed, and not saved storage
            storage.option.menu[id] = value;
            value === true ? menu.Create( id ) : menu.Remove( id );
            break;
        case msg.MESSAGE_ACTION.updated:
            watch.Push( request.value.type, request.value.value );
            break;
        case msg.MESSAGE_ACTION.save_verify:
            sendResponse( watch.Lock( request.value.url ));
            break;
        case msg.MESSAGE_ACTION.auth:
            browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#labs?auth=" + request.value.name.toLowerCase() ) });
            break;
        case msg.MESSAGE_ACTION.update_site:
            getCurTab({ active: true, url: request.value.url }, tabs => {
                tabs.length > 0 && ( upTabId = tabs[0].id );
                browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#sites?update=" + encodeURI( JSON.stringify( request.value.site ))) });
            });
            break;
        case msg.MESSAGE_ACTION.save_site:
            browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#sites?pending=" + encodeURI( JSON.stringify( request.value ))) });
            break;
        case msg.MESSAGE_ACTION.temp_site:
            browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#sites?temp=" + encodeURI( JSON.stringify( request.value ))) });
            break;
        case msg.MESSAGE_ACTION.auth_success:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 ) {
                    browser.tabs.remove( tabs[0].id );
                    getCurTab( { "active": true }, tabs => {
                        tabs.forEach( tab => browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.export, {type: request.value.name.toLowerCase()} )) );
                    });
                }
            });
            break;
        case msg.MESSAGE_ACTION.track:
            tracked( request.value );
            break;
        case msg.MESSAGE_ACTION.speak:
            browser.tts.speak( request.value.content );
            break;
        case msg.MESSAGE_ACTION.speak_stop:
            browser.tts.stop();
            break;
        case msg.MESSAGE_ACTION.tips:
            tips.Verify( request.value.code, sendResponse );
            break;
        case msg.MESSAGE_ACTION.tips_norepeat:
            tips.Done( request.value.code );
            break;
        case msg.MESSAGE_ACTION.screenshot:
            UI.status('orange', "grab");
            Screenshotter.grab(request.value.exportType);
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
browser.tabs.onActivated.addListener( function( active ) {
    getCurTab( { "active": true, "currentWindow": true }, tabs => {
        if ( tabs && tabs.length > 0 && tabs[0].status == "complete" ) {
            console.log( "background tabs Listener:active", active );
            if ( tabs && tabs.length > 0 && !tabs[0].url.startsWith( "chrome://" ) ) {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: false } ));
            } else {
                setMenuAndIcon( tabs[0].id, -1 );
            }
        } else console.error( "onActivated.addListener error" );
    });
});

/**
 * Listen chrome tab update message, include: `tab_selected`
 */
browser.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
    watch.Pull( tabId );
    if ( changeInfo.status == "complete" ) {
        console.log( "background tabs Listener:update", tabId, changeInfo, tab );

        if ( tab.url.startsWith( "http://ksria.com/simpread/auth.html" )) {
            const url = tab.url.replace( "http://ksria.com/simpread/auth.html?id=", "" ),
                  id  = url.includes( "#" ) || url.includes( "&" ) ? url.substr( 0, url.search( /\S(#|&)/ ) + 1 ) : url ;
            browser.tabs.query( {}, tabs => {
                const opts = tabs.find( tab => tab.url.includes( chrome.runtime.getURL( "options/options.html" ) ));
                if ( opts ) {
                    browser.tabs.sendMessage( opts.id, msg.Add( msg.MESSAGE_ACTION.redirect_uri, { uri: tab.url, id } ));
                    browser.tabs.remove( tabId );
                }
            });
        } else if ( tab.url.startsWith( "https://simpread.ksria.cn/plugins/install/" )) {
            const url = tab.url.replace( "https://simpread.ksria.cn/plugins/install/", "" );
            browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#plugins?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );
        } else if ( tab.url.startsWith( "https://simpread.ksria.cn/sites/install/" )) {
            const url = tab.url.replace( "https://simpread.ksria.cn/sites/install/", "" );
            browser.tabs.create({ url: chrome.runtime.getURL( "options/options.html#sites?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=success" ) ) {
            browser.tabs.remove( tabId );
            upTabId > 0 && chrome.tabs.reload( upTabId, () => { upTabId == -1; });
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=failed" ) ) {
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=complete" ) ) {
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=pending" ) ) {
            browser.tabs.remove( tabId );
            upTabId > 0 && browser.tabs.sendMessage( upTabId, msg.Add( msg.MESSAGE_ACTION.pending_site ));
            upTabId == -1;
        }

        if ( !tab.url.startsWith( "chrome://" ) ) {
            browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: true } ));
        } else {
            setMenuAndIcon( tab.id, -1 );
        }
    }
});

/**
 * Listen chrome tab remove message
 */
browser.tabs.onRemoved.addListener( tabId => watch.Pull( tabId ));

/**
 * Listen chrome page, include: `read`
 */
chrome.action.onClicked.addListener( function( tab ) {
    browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.browser_click ));
});


/**
 * Get current tab object
 * 
 * @param {object}   query
 * @param {function} callback
 */
function getCurTab( query, callback ) {
    if ( query.url && query.url.includes( "#" ) ) {
        browser.tabs.query( {}, tabs => callback( tabs.filter( tab => tab.url == query.url && tab.active ) ) );
    } else browser.tabs.query( query, function( tabs ) { callback( tabs ); });
}

/**
 * Set page action icon and context menu
 * 
 * @param {int} tab.id
 * @param {int} -1: disable icon;
 */
function setMenuAndIcon( id, code ) {
    let icon = "";
    if ( code == -1 ) {
        //chrome.action.hide( id ); todo
        menu.Update( "tempread" );
    } else {
        icon = "-enable";
        //chrome.action.show( id ); todo
        storage.option.menu.read === true && menu.Create( "read" );
        menu.Update( "read" );
    }
    chrome.action.setIcon({ tabId: id, path: chrome.runtime.getURL( `assets/images/icon16${icon}.png` ) });
}

/**
 * Track
 * 
 * @param {object} google analytics track object
 */
function tracked({ eventCategory, eventAction, eventValue }) {
    console.log( "current track is", eventCategory, eventAction, eventValue )
    // _gaq.push([ '_trackEvent', eventCategory, eventValue ]);
}

/**
 * Uninstall
 */
function uninstall() {
    browser.runtime.setUninstallURL( storage.option.uninstall ? storage.service + "/uninstall" : "" );
    tracked({ eventCategory: "install", eventAction: "install", eventValue: "uninstall" });
}


async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


chrome.runtime.onInstalled.addListener(function (details) {
    console.log('安装成功后默认打开设置页面 details', details);
    // 安装完成后事件
    const { reason, previousVersion } = details;
    if (reason === 'install') {
      console.log('安装成功后默认打开设置页面');
      // 安装成功后默认打开设置页面
      chrome.tabs.create({ url : "https://ladderreader.com", active : true });
    } else if (reason === 'update' && !hasNewVersion(previousVersion)) {
        //chrome.tabs.create({ url, active });
    }
});


// begin 截图


var UI = {
    status: function(color, text, timed) {
        if (color == null) {
        return;
        } else if (color == 'green') {
        chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] });
        } else if (color == 'red') {
        chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        } else if (color == 'orange' ) {
        chrome.action.setBadgeBackgroundColor({ color: [255, 128, 0, 255] });
        } else if (color == 'azure' ) {
        chrome.action.setBadgeBackgroundColor({ color: [0, 128, 255, 255] });
        }
        chrome.action.setBadgeText({ text: text });

        // *** Triggered if the message will be shown just for a short amout of time (specified)
        if (timed > 0) {
        setTimeout(function() {
            chrome.action.setBadgeText({ text: "" });
        }, timed);
        }
    }
}

/*
 *  Blipshot
 *  Screenshotter.js
 *  Half of the screenshotter algorithm. See Screenshotter.DOM.js for the other half.
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

var Screenshotter = {

    imageDataURL: [],
  
    shared: {
      imageDirtyCutAt: 0,
      imageDataURL: 0,
  
      originalScrollTop: 0,
  
      tab: {
        id: 0,
        url: "",
        title: "",
        hasVscrollbar: false
      }
    },
  
    // ****************************************************************************************** SCREENSHOT SEQUENCE START
  
    // 0
    grab: async function(exportType) {
      /****************************************************************************************************
       * It's a chaos: the ball must bounce between background and script content since the first
       * can grab and the second can access the DOM (scroll)
       *
       * So the call stack is:
       *    grab (bg)
       *      screenshotBegin (script)
       *      loop {
       *        screenshotVisibleArea (bg)
       *        screenshotScroll (script)
       *      }
       *      screenshotEnd (bg)
       *      screenshotReturn (script)
       */
      var self = this;
  
      // ****** Reset screenshot container
      this.imageDataURLPartial = [];

      // ****** Get tab data

      let queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      let [tab] = await chrome.tabs.query(queryOptions);
        self.shared.tab = tab;
        // ****** Check if everything's is in order.
        var parts = tab.url.match(/https?:\/\/chrome.google.com\/?.*/);
        if (parts !== null) {
        alert("I'm sorry.\n\nDue to security restrictions \non the Google Chrome Store, \nBlipshot can't run here.\n\nTry on any other page. ;)\n\n");
        return false;
        }

        // ****** Check if script is loaded
        chrome.tabs.sendMessage(self.shared.tab.id, { action: 'heartbeat' }, function(response) {
        if (!response) {
            UI.status('red', "!", 1000);
        }
        });
        self.shared.exportType = exportType;
        // ****** Begin!
        chrome.tabs.sendMessage(self.shared.tab.id, { action: 'blanketStyleSet', type: 'blanketStyleSet', property: 'position', from: 'fixed', to: 'absolute' });
        chrome.tabs.sendMessage(self.shared.tab.id, { action: 'blanketStyleSet', type: 'blanketStyleSet', property: 'position', from: 'sticky', to: 'relative' });
        self.screenshotBegin(self.shared);
    },
  
    // 1
    screenshotBegin: function(shared) { chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotBegin', type: 'screenshotBegin', shared: shared }); },
  
    // 2
    screenshotVisibleArea: function(shared) {
      console.log( "2 screenshotVisibleArea", shared )
      var self = this;
      chrome.tabs.captureVisibleTab(null, { format: "png" /* png, jpeg */, quality: 100 }, function(dataUrl) {
        if (dataUrl) {
          // Grab successful
          self.imageDataURLPartial.push(dataUrl);
          self.screenshotScroll(shared);
        } else {
          // Grab failed, warning
          // To handle issues like permissions - https://github.com/folletto/Blipshot/issues/9
          alert("I'm sorry.\n\nIt seems Blipshot wasn't able to grab the screenshot of the active tab.\n\nPlease check the extension permissions.\n\nIf the problem persists contact me at \nhttp://github.com/folletto/Blipshot/issues\n\nError: " + chrome.runtime.lastError.message + "\n\n");
          return false;
        }
      });
    },
  
    // 3
    screenshotScroll: function(shared) { 
        console.log( "3 screenshotScroll", shared )
        chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotScroll',type: 'screenshotScroll',  shared: shared }); 
    },
  
    // 4
    screenshotEnd: function(shared) {
      console.log( "4 screenshotEnd", shared )
      var self = this;
      UI.status('azure', "make");
      chrome.tabs.sendMessage(this.shared.tab.id, { action: 'handleRecursiveImageMerge',type: 'handleRecursiveImageMerge',  shared: shared,imageDataURLPartial: this.imageDataURLPartial}); 
    },
  
    // 5
    screenshotReturn: function(shared) {
      console.log( "5 screenshotReturn", shared )
      UI.status('green', "✓", 3000);
      chrome.tabs.sendMessage(this.shared.tab.id, { action: 'blanketStyleRestore',type: 'blanketStyleRestore', property: 'position' });
      chrome.tabs.sendMessage(this.shared.tab.id, { action: 'screenshotReturn',type: 'screenshotReturn', shared: shared });
    },
  
    // ****************************************************************************************** EVENT MANAGER / HALF
    eventManagerInit: function() {
      /****************************************************************************************************
       * This function prepares the internal plugin callbacks to bounce between the plugin and DOM side.
       * It's initialized at the end of this file.
       */
      var self = this;
      browser.runtime.onMessage.addListener(function(e) {
          console.log( "eventManagerInit", e )
          switch (e.action) {
            case "grab": self.grab(); break;
            case "screenshotVisibleArea": self.screenshotVisibleArea(e.shared); break;
            case "screenshotEnd": self.screenshotEnd(e.shared); break;
            case "screenshotReturn": self.screenshotReturn(e.shared); break;       
          }
      });
    },
  
    // ****************************************************************************************** SUPPORT
    recursiveImageMerge: function(imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, i) {
      /****************************************************************************************************
       * This function merges together all the pieces gathered during the scroll, recursively.
       * Returns a single data:// URL object from canvas.toDataURL("image/png") to the callback.
       */
      i = i || 0;
      images = images || [];
  
      if (i < imageDataURLs.length) {
        images[i] = new Image();
        images[i].onload = function() {
          imageDataURLs[i] = null; // clear for optimize memory consumption (not sure)
          if (i == imageDataURLs.length - 1) {
            // ****** We're at the end of the chain, let's have fun with canvas.
            var canvas = window.document.createElement('canvas');
  
            // NOTE: Resizing a canvas is destructive, we can do it just now before stictching
            canvas.width = images[0].width - (hasVscrollbar ? 15 : 0); // <-- manage V scrollbar
  
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
              var width = images[j].width;
  
              // void canvas.getContext("2d").drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
              //console.log("[i:" + i + ", j:" + j + "] --- total images:" + imageDataURLs.length);
              //console.log("--> drawImage(images[" + j + "], sx:0, sy/cut:" + cut + ", swidth:" + width + ", sheight:" + height + ", dx:0, dy:" + (j * images[0].height) + ", dwidth:" + width + ", dheight:" + height + ");");
              canvas.getContext("2d").drawImage(images[j], 0, cut, width, height, 0, j * images[0].height, width, height);
            }
  
            callback(canvas.toDataURL("image/png")); // --> CALLBACK (note that the file type is used also in the drag function)
          } else {
            // ****** Down!
            recursiveImageMerge(imageDataURLs, imageDirtyCutAt, hasVscrollbar, callback, images, ++i);
          }
        }
        images[i].src = imageDataURLs[i]; // Load!
      }
    }
  }
  
  /* \/ Initialize callback listeners */
  Screenshotter.eventManagerInit();
  /* /\ Initialize callback listeners */
  
// end 截图