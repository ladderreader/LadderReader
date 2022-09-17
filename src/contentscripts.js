console.log( "=== simpread contentscripts load ===" )

import './assets/css/simpread.css';
import './assets/css/setting.css';
import 'notify_css';

import Velocity       from 'velocity';
import Notify         from 'notify';

import {focus}        from 'focus';
import * as read      from 'read';
import * as setting   from 'setting';
import * as kbd       from 'keyboard';
import * as highlight from 'highlight';
import * as scheme    from 'urlscheme';

import * as util      from 'util';
import { storage, STORAGE_MODE as mode } from 'storage';
import * as msg       from 'message';
import {browser}      from 'browser';
import * as watch     from 'watch';

import PureRead       from 'puread';
import * as puplugin  from 'puplugin';
import jsPDF from 'jspdf';

import {EXPORT_TYPE_IMG, EXPORT_TYPE_PDF}  from 'config';

let pr,                           // pure read object
    is_blacklist = false,
    current_url  = location.href; // current page url ( when changed page changed )

$.fn.sreffect = $.fn.velocity == undefined ? $.fn.animate : $.fn.velocity; // hack code for firefox

let isLoadFont = false

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    if ( blacklist() ) {
        $( "style" ).map( ( idx, item ) => {
            if ( item.innerText.includes( "simpread"        ) || 
                 item.innerText.includes( "sr-opt-focus"    ) || 
                 item.innerText.includes( "sr-rd-theme"     ) || 
                 item.innerText.includes( "html.simpread-theme-root, .simpread-theme-root" ) || 
                 item.innerText.includes( "notify-gp"       ) || 
                 item.innerText.includes( "md-waves-effect" )
            ) {
                $(item).remove();
            }
        });
    } else {
        bindShortcuts();
        !isLazyload() && autoOpen();
    }
});

/**
 * Blacklist
 * 
 * @return {boolean} true: is blacklist; false: is't blacklist
 */
function blacklist() {
    is_blacklist = util.Blacklist( puplugin.Plugin( "minimatch" ), storage.option );
    console.log( "current site is blacklist", is_blacklist )
    return is_blacklist;
}

/**
 * isLazyload verify
 * 
 * @return {boolen} true: lazyload; false: preload
 */

function isLazyload() {
    return util.Lazyload( puplugin.Plugin( "minimatch" ), storage.option );
}

/**
 * Listen runtime message, include: `focus` `read` `shortcuts` `tab_selected`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "contentscripts runtime Listener", request );
    if ( is_blacklist ) return;
    switch ( request.type ) {
        case "blanketStyleSet": blanketStyleSet(request.property, request.from, request.to); break;
        case "blanketStyleRestore": blanketStyleRestore(request.property); break;
        case "screenshotBegin": screenshotBegin(request.shared); break;
        case "screenshotScroll": screenshotScroll(request.shared); break;
        case "handleRecursiveImageMerge": handleRecursiveImageMerge(request.shared, request.imageDataURLPartial); break;
        case "screenshotReturn": 
            if(EXPORT_TYPE_IMG === request.shared.exportType){
                screenshotReturn(request.shared); 
            }else if(EXPORT_TYPE_PDF === request.shared.exportType){
                screenshotToPDF(request.shared)
            }
            storage.read.showMenu = true
            storage.Write( ()=> {})
            break;
        
        case msg.MESSAGE_ACTION.focus_mode:
            if ( storage.option.br_exit ) focus.Exist( false ) ? focus.Exit() : focusMode();
            else focusMode();
            break;
        case msg.MESSAGE_ACTION.shortcuts:
            bindShortcuts();
            break;
        case msg.MESSAGE_ACTION.tab_selected:
            if ( isLazyload() ) {
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.browser_action, { code: 0 , url: window.location.href } ));
            } else {
                request.value.is_update ?
                    setTimeout( () => browserAction( request.value.is_update ), 200 )
                    : browserAction( request.value.is_update );
            }
            break;
        case msg.MESSAGE_ACTION.read_mode:
        case msg.MESSAGE_ACTION.browser_click:
            watch.Verify( ( state, result ) => {
                if ( state ) {
                    console.log( "watch.Lock()", result );
                    new Notify().Render( "The configuration file has been updated and will take effect after refreshing the current page", "refresh", ()=>window.location.reload() );
                } else {
                     if ( storage.option.br_exit ) {
                        setting.Exist()  && setting.Exit();
                        !setting.Exist() && read.Exist( false ) ? read.Exit() : readMode();
                     }
                     else readMode();
                }
            });
            break;
        case msg.MESSAGE_ACTION.pending_site:
            new Notify().Render({ content: "whether to submit to better fit this page？", action: "yes", cancel: "no", callback: type => {
                if ( type == "cancel" ) return;
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_site, { url: location.href, site: storage.pr.current.site, uid: storage.user.uid, type: "failed" }));
            }});
            break;
        case msg.MESSAGE_ACTION.menu_whitelist:
        case msg.MESSAGE_ACTION.menu_exclusion:
        case msg.MESSAGE_ACTION.menu_blacklist:
        case msg.MESSAGE_ACTION.menu_lazyload:
        case msg.MESSAGE_ACTION.menu_unrdist:
            const menuSrv = ( type, url ) => {
                if ( type == msg.MESSAGE_ACTION.menu_whitelist ) {
                    storage.read.whitelist.push( url );
                    new Notify().Render( "Added to whitelist" );
                } else if ( type == msg.MESSAGE_ACTION.menu_exclusion ) {
                    storage.read.exclusion.push( url );
                    new Notify().Render( "Added to exclusion list" );
                } else if ( type == msg.MESSAGE_ACTION.menu_blacklist ) {
                    storage.option.blacklist.push( url );
                    new Notify().Render( "Added to blacklist" );
                } else if ( type == msg.MESSAGE_ACTION.menu_lazyload ) {
                    storage.option.lazyload.push( url );
                    new Notify().Render( "Added to lazy loading" );
                } else if ( type == msg.MESSAGE_ACTION.menu_unrdist ) {
                    storage.UnRead( "add", util.GetPageInfo(), success => {
                        success  && new Notify().Render( 0, "Successfully added to the unread list" );
                        !success && new Notify().Render( 0, "Successfully added to the unread list" );
                    });
                }
                storage.Write( () => {
                    watch.SendMessage( "option", true );
                });
            };
            if ( storage.option.urlscheme && /whitelist|exclusion|blacklist|lazyload/ig.test( request.type )) {
                scheme.Render( request.type.replace( "menu_", "" ), storage.option.urlscheme, ( type, off, value ) => {
                    storage.option.urlscheme = off;
                    menuSrv( "menu_" + type, value );
                });
            } else menuSrv( request.type, request.value.url );
            break;
    }
    sendResponse(true);
});

/**
 * Keyboard event handler
 */
 function screenshotToPDF(shared) {

    console.log("screenshotToPDF", shared)
    function pad2(str) { if ((str + "").length == 1) return "0" + str; return "" + str; }

    var d = new Date();
    var timestamp = '' + d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + '-' + pad2(d.getHours()) + '' + pad2(d.getMinutes()) + '\'' + pad2(d.getSeconds()) + '';
    var filename = "pageshot of '" + normalizeFileName(shared.tab.title) + "' @ " + timestamp;
    var blobURL = dataToBlobURL(shared.imageDataURL);
    //var blobURL = shared.imageDataURL;

    if (blobURL) {

        let readBox = document.getElementById('readBox');
        let contentWidth = readBox.clientWidth;
        let contentHeight = readBox.clientHeight;
    
        let pageHeight = (contentWidth / 592.28) * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //页面偏移
        let position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 595.28;
        let imgHeight = (592.28 / contentWidth) * contentHeight;
        let pdf = new jsPDF('p', 'pt', 'a4');
    
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(blobURL, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(blobURL, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save(filename + '.pdf');

    } else {
      // ****** No content! Maybe page too long?
      alert("I'm sorry.\n\nThere was some trouble in generating the screenshot.\n\nIt might be due to Chrome canvas size limitations.\nTry on a shorter page?\n\n");
    }

}

/**
 * Keyboard event handler
 */
function bindShortcuts() {
    kbd.Bind( [ storage.focus.shortcuts.toLowerCase() ], focusMode );
    kbd.Bind( [ storage.read.shortcuts.toLowerCase()  ], readMode  );
    kbd.ListenESC( combo => {
        if ( combo == "esc" && storage.option.esc ) {
            setting.Exist()  && setting.Exit();
            !setting.Exist() && focus.Exist() && focus.Exit();
            !setting.Exist() && read.Exist()  && read.Exit();
        }
    });
}

/**
 * Focus mode
 */
function focusMode() {
    console.log( "=== simpread focus mode active ===" )

    if ( !entry( focus, read, "read mode", "focus mode" )) return;

    watch.Verify( ( state, result ) => {
        if ( state ) {
            console.log( "watch.Lock()", result );
            new Notify().Render( "The configuration file has been updated and will take effect after refreshing the current page", "refresh", ()=>window.location.reload() );
        } else {
            getCurrent( mode.focus );
            if ( storage.current.site.name.startsWith( "txtread:" ) ) {
                new Notify().Render( "It is currently in TXT reader mode and cannot use the setting function" )
                return;
            }
            if ( pr.state == "temp" && pr.dom ) {
                focus.Render( $(pr.dom), storage.current.bgcolor );
            } else {
                focus.GetFocus( pr.Include(), storage.current.site.include ).done( result => {
                    storage.pr.state == "none" && pr.TempMode( mode.focus, result[0] );
                    focus.Render( result, storage.current.bgcolor );
                }).fail( () => {
                    new Notify().Render( 2, "Didn't get any text before, please reselect" );
                });
            }
        }
    });
}

/**
 * Read mode
 */
function readMode() {
    console.log( "=== simpread read mode active ===" )

    if ( !entry( read, focus, "focus mode", "read mode" )) return;

    watch.Verify( ( state, result ) => {
        if ( state ) {
            console.log( "watch.Lock()", result );
            new Notify().Render( "The configuration file has been updated and will take effect after refreshing the current page", "refresh", ()=>window.location.reload() );
        } else {
            getCurrent( mode.read );
            if ( storage.current.site.name != "" ) {
                read.Render();
            } else if ( pr.state == "temp" && pr.dom ) {
                read.Render();
            } else {
                new Notify().Render( "Ladder reader temporarily does not support this website" );
                // new Notify().Render( "The intellisense text failed, please move the mouse and generate the text by manual box selection" );
                // read.Highlight().done( dom => {
                //     const rerender = element => {
                //         pr.TempMode( mode.read, dom );
                //         read.Render();
                //     };
                //     storage.current.highlight ? 
                //         highlight.Control( dom ).done( newDom => {
                //             rerender( newDom );
                //         }) : rerender( dom );
                // });
            }
        }
    });
}

/**
 * Auto open read mode, include:
 * 
 * - http://xxxx?simpread_mode=read
 * - auto && location.href not include exclusion list
 * - location.href include white list
 */
function autoOpen() {
    getCurrent( mode.read );
    const suffix    = window.location.href.includes( "simpread_mode=read" ),
          auto      = storage.current.auto,
          minimatch = puplugin.Plugin( "minimatch" ),
          whitelist = util.Whitelist( minimatch, storage.current ),
          exclusion = util.Exclusion( minimatch, storage.current );
    if  (
        suffix || whitelist || ( auto && exclusion == false )
        ) {
        switch ( storage.current.site.name ) {
            case "my.oschina.net":
            case "36kr.com":
            case "chiphell.com":
            case "question.zhihu.com":
                $( () => readMode() );
                break;
            case "post.juejin.im":
            case "entry.juejin.im":
                setTimeout( ()=>readMode(), 2500 );
                break;
            case "kancloud.cn":
            case "sspai.com":
                setTimeout( ()=>readMode(), 1000 );
                break;
            default:
                pr.state == "adapter" && readMode();
                pr.state == "temp"    && pr.current.site.html != "" && whitelist && readMode();
                break;
        }
    }
}

/**
 * Focus and Read mode entry
 * 
 * @param  {object}  current mode object
 * @param  {object}  other   mode object
 * @param  {array}   render str
 * @return {boolean} true:continue; false: return
 */
function entry( current, other, ...str ) {
    if ( other.Exist(false) ) {
        new Notify().Render( `请先退出${str[0]}模式，才能进入${str[1]}模式。` );
        return false;
    }
    if ( current.Exist(true) ) return false;
    return true;
}

/**
 * Get storage.current
 * 
 * @param {string} value is mode.focus or mode.read or undefined
 */
function getCurrent( mode ) {
    if ( mode && storage.VerifyCur( mode ) ) {
        ( !pr || !pr.Exist() ) && pRead();
        storage.Getcur( mode, pr.current.site );
    }
}

/**
 * Browser action
 * 
 * @param {boolean} when set icon is_update = true
 */
function browserAction( is_update ) {
    if ( is_update && current_url != location.href ) {
        current_url = location.href;
        autoOpen();
    }
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.browser_action, { code: storage.current.site.name == "" ? -1 : 0 , url: window.location.href } ));
}

/** 
 * Pure Read
*/
async function pRead() {
    pr = new PureRead( storage.sites );
    pr.cleanup = storage.read.cleanup == undefined ? true  : storage.read.cleanup;
    pr.pure    = storage.read.pure    == undefined ? false : storage.read.pure;
    pr.AddPlugin( puplugin.Plugin() );
    pr.Getsites();

    //preloadFont()

    storage.puread = pr;
    console.log( "current puread object is   ", pr )

    storage.read.showMenu = true
}


/* global chrome */
const loadFont = (fontPath, type) => {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.href = chrome.runtime.getURL(fontPath)
    preloadLink.as = 'font'
    preloadLink.type = type
    preloadLink.setAttribute('crossorigin', '')
    document.head.appendChild(preloadLink)
  }


  /* 加载字体 */
const preloadFont = () => {
    if(isLoadFont){
        return
    }
    loadFont('/assets/fonts/OpenDyslexic-Bold.otf', 'font/otf')
    loadFont('/assets/fonts/OpenDyslexic-BoldItalic.otf', 'font/otf')
    loadFont('/assets/fonts/OpenDyslexic-Italic.otf', 'font/otf')
    loadFont('/assets/fonts/OpenDyslexic-Regular.otf', 'font/otf')
    isLoadFont = true
}
