console.log( "=== simpread menu load ===" )

import {storage} from 'storage';
import {browser} from 'browser';
import * as msg  from 'message';

/**
 * Create context menus
*/
const context = {
        focus : { id: "", menu: {} },
        read  : { id: "", menu: {} },
        link  : { id: "", menu: {} },
        list  : { id: "", menu: {} },
        whitelist : { id: "", menu: {} },
        exclusion : { id: "", menu: {} },
        blacklist : { id: "", menu: {} },
        unrdist   : { id: "", menu: {} },
        lazyload  : { id: "", menu: {} },
    },
    menu = {
        "type"     : "normal",
        "contexts" :  [ "all" ],
        "documentUrlPatterns" : [ "http://*/*" , "https://*/*" ]
    };

Object.assign( context.read.menu,       menu, { id: "read",      "title" : "reading mode (hot key : R M )", contexts: [ "page" ] });
// Object.assign( context.focus.menu,      menu, { id: "focus",     "title" : "focus mode", contexts: [ "page" ] });
Object.assign( context.link.menu,       menu, { id: "link",      "title" : "使用reading mode打开此链接", contexts: [ "link" ] });

Object.assign( context.list.menu,       menu, { id: "list",      "title" : "打开稍后读", contexts: [ "page" ] });
Object.assign( context.unrdist.menu,    menu, { id: "unrdist",   "title" : "将当前页面加入稍后读", contexts: [ "page" ] });

Object.assign( context.whitelist.menu,  menu, { id: "whitelist", "title" : "Add the current page to the whitelist", contexts: [ "page" ] });
Object.assign( context.exclusion.menu,  menu, { id: "exclusion", "title" : "将当前页面加入到排除列表", contexts: [ "page" ] });
Object.assign( context.blacklist.menu,  menu, { id: "blacklist", "title" : "Add the current page to the blacklist", contexts: [ "page" ] });
Object.assign( context.lazyload.menu,   menu, { id: "lazyload",  "title" : "将当前页面加入到延迟加载", contexts: [ "page" ] });

/**
 * Listen contextMenus message
 */
function onClicked( callback ) {
    browser.contextMenus.onClicked.addListener( callback );
}

/**
 * Create all context menu
 */
function createAll() {
    storage.option.menu.focus &&
        ( context.focus.id = browser.contextMenus.create( context.focus.menu ));

    storage.option.menu.read &&
        ( context.read.id  = browser.contextMenus.create( context.read.menu ));

    storage.option.menu.link &&
        ( context.link.id  = browser.contextMenus.create( context.link.menu ));

    browser.contextMenus.create({ "type": "separator" });

    storage.option.menu.list &&
        ( context.list.id     = browser.contextMenus.create( context.list.menu ));

    storage.option.menu.unrdist &&
        ( context.unrdist.id  = browser.contextMenus.create( context.unrdist.menu ));

    browser.contextMenus.create({ "type": "separator" });

    storage.option.menu.whitelist &&
        ( context.whitelist.id  = browser.contextMenus.create( context.whitelist.menu ));

    storage.option.menu.exclusion &&
        ( context.exclusion.id  = browser.contextMenus.create( context.exclusion.menu ));

    storage.option.menu.blacklist &&
        ( context.blacklist.id  = browser.contextMenus.create( context.blacklist.menu ));

    storage.option.menu.lazyload &&
        ( context.lazyload.id   = browser.contextMenus.create( context.lazyload.menu ));

    // all menu is false remove contextMenus
    Object.values( storage.option.menu ).findIndex( menu => menu == true ) == -1 && browser.contextMenus.removeAll();
}

/**
 * Create menu from type
 * 
 * @param {string} include: foucs read link
 */
function create( type ) {
    /*
    if ( !context[type].id ) {
        delete context[type].menu.generatedId;
        context[type].id = browser.contextMenus.create( context[type].menu );
    }
    */
   browser.contextMenus.removeAll();
   createAll();
}

/**
 * Remove menu from type
 * 
 * @param {string} include: foucs read link
 */
function remove( type ) {
    /*
    if ( context[type].id ) {
        browser.contextMenus.remove( context[type].id );
        context[type].id = undefined;
    }
    */
    browser.contextMenus.removeAll();
    createAll();
}

/**
 * Update menu from type
 * 
 * @param {string} include: tempread and read
 */
function update( type ) {
    if ( context.read.id ) {
        const title = type == "read" ? "reading mode (hot key : R M )" : "临时reading mode";
        browser.contextMenus.update( context.read.id, { title } );
    }
}

/**
 * Refresh menu ( Enforcement fresh )
 * 
 * @param {object} new menu object 
 */
function refresh( cur ) {
    Object.keys( cur ).forEach( item => {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.menu, { id: item, value: cur[item] } ));
    });
}

export {
    createAll as CreateAll,
    create    as Create,
    remove    as Remove,
    update    as Update,
    refresh   as Refresh,
    onClicked as OnClicked,
}