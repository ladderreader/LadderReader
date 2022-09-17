console.log( "==== simpread options page load ====" )

import '../assets/css/options_page.css';
import '../assets/css/setting.css';
import 'mduikit_css';
import 'notify_css';
import 'intro_css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import Tabs       from 'tabs';
import * as waves from 'waves';
import * as tt    from 'tooltip';
import Button     from 'button';
import * as side  from 'sidebar';

import { storage, STORAGE_MODE as mode } from 'storage';
import local      from 'local';
import * as ss    from 'stylesheet';
import * as conf  from 'config';
import * as ver   from 'version';
import * as watch from 'watch';
import {browser,br}from 'browser';
import * as msg   from 'message';
import * as exp   from 'export';

import FocusOpt   from 'focusopt';
import ReadOpt    from 'readopt';
import CommonOpt  from 'commonopt';
import LabsOpt    from 'labsopt';
import PluginsOpt from 'pluginsopt';
import SitesOpts  from 'sitesopt';
import AccountOps from 'accountopt';
import About      from 'about';
import Unrdist    from 'unrdist';
import * as welc  from 'welcome';
import * as guide from 'guide';
import * as fb    from 'feedback';

import PureRead   from 'puread';

let tabsItemID   = 0,
    loadState    = { first: false, update: false },
    website_sync = false; // when first and update checked versions.json

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    const $target = $( event.target ),
          scroll  = $target.scrollTop(),
          offset  = 0 - scroll;
    scroll >  200 && ( $( ".header" ).css({ opacity: 1, visibility: "visible" }) );
    scroll <= 200 && ( $( ".header" ).css({ opacity: 0, visibility: "hidden"  }) );
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` );
});

/**
 * Add event listenr
 */
window.addEventListener( msg.MESSAGE_ACTION.turn_tab, event => {
    const idx = event.detail.page;
    tabChange( idx );
});

window.addEventListener( msg.MESSAGE_ACTION.welcome_close, event => {
    const { first, version } = event.detail;
    !first && new Notify().Render({ content: "是否查看新版本的入门指引？", action: "确认", cancel: "取消", callback: type => {
        type == "action" && guide.Start( version );
    }});
});

/**
 * Get tabsItemID from window.location.hash exist
 */
window.location.hash && ( tabsItemID = conf.tabsItem.findIndex( item => window.location.hash.startsWith(item.route)));
tabsItemID == -1 || tabsItemID == 0 ? tabsItemID = 0 : conf.tabsItem.forEach( ( item, index ) => item.active = tabsItemID == index ? true : false );

/**
 * Listen runtime message
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.redirect_uri ) {
        const { id, uri } = request.value;
        if ([ "pocket", "dropbox", "evernote", "gdrive" ].includes( id )) {
            exp[id].Accesstoken( uri );
        } else if ( id == "yinxiang" ) {
            exp.evernote.Accesstoken( uri );
        } else if ( uri.indexOf( "state=yuque_authorize" ) > 0 ) {
            exp.yuque.Accesstoken( uri );
        } else {
            id.startsWith( "http://ksria.com/simpread/auth.html?" ) &&
            exp.onenote.Accesstoken( uri );
        }
    }
});

/**
 * Change tab
 * 
 * @param {number} tab index
 */
function tabChange( idx ) {
    if ( idx == -1 ) return;
    conf.tabsItem.forEach( ( item, index ) => item.active = idx == index ? true : false );
    mainRender( idx );
}

/**
 * Entry
 */
storage.Read( first => {
    console.log( "simpread storage get success!", storage.focus, storage.read, first );
    loadingRender();
    pRead();
    hashnotify();
    firstLoad( first );
    sidebarRender();
    navRender();
    vernotify( first );
    //welcomeRender( false, "1.1.4" );
    mainRender( tabsItemID );
    setTimeout(() => noticeRender(), 500 );
    helpRender();
    feedbackRender();
    tt.Render( "body" );
    waves.Render({ root: "body" });
});

/**
 * Loading Render
 */
function loadingRender() {
    setTimeout( () => {
        $( '.loadingbar' ).animate({
            opacity: 0,
        }, () => {
            $( '.loadingbar' ).remove();
            $( ".bottom" ).removeAttr( "style" );
        });
    }, 1000 );
}

/**
 * Pure Read
*/
function pRead() {
    storage.puread     = new PureRead( storage.sites );
    storage.pr.origins = storage.option.origins;
    console.log( "current puread object is   ", storage.pr )
}

/**
 * Incompatible and update 
 */
function updateData() {
    ver.Incompatible( storage.version, storage.simpread ) && storage.Write( () => {
        console.log( "current simpread is update ", storage.simpread )
        new Notify().Render({ type: 2, content: `检测到你曾经修改过第三方适配源，<b>务必刷新后重新导入</b>！<a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=第三方适配源">详细说明</a>`, state: "holdon" });
        watch.SendMessage( "option", true );
    }, storage.simpread );
    ver.VerifyPlugins( storage.option ) && new Notify().Render({ type: 2, content: `有需要清理的已失效插件，详细请看 <a href="http://ksria.com/simpread/welcome/version_${storage.version}.html#badplugins" target="_blank">失效插件</a>`, state: "holdon" });
}

/**
 * Hash notify
 */
function hashnotify() {
    const search = location.search,
          prefix = "?simpread_mode=";
    if ( search.startsWith( prefix ) ) {
        switch ( search.replace( prefix, "" ) ) {
            case "reload":
                new Notify().Render( 0, "数据导入成功！" );
                break;
            case "clear":
                new Notify().Render( 0, "数据清除成功！" );
                break;
            case "sync":
                new Notify().Render( 0, "数据同步成功！" );
                break;
            default:
                // TO-DO
        }
        history.pushState( "", "", "/options/options.html" );
    }
}

/**
 * Version update notify
 * 
 * @param {boolean} is first load
 */
function vernotify( first ) {
    const hash = location.hash;
    if ( hash.startsWith( "#firstload?ver=" ) || hash.startsWith( "#update?ver=" ) ) {
        const prefix  = hash.match( /\w+/      )[0],
              version = hash.match( /[0-9\.]+/ )[0],
              message = ver.Notify( first, prefix, version );

        new Notify().Render( "简悦 版本提示", message );

        loadState = { first: true };
        if ( hash.startsWith( "#update?ver=" )) {
            watch.SendMessage( "version", true );
            loadState = { first: true, update: true };
            welcomeRender( false, version );
            updateData();
        }
        // website_sync = true; when version is 1.1.3 website_list is newer
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "install", eventAction: hash.startsWith( "#firstload?ver=" ) ? "install" : "update", eventValue: hash.startsWith( "#firstload?ver=" ) ? "install" : "update" }) );
        history.pushState( "", "", "/options/options.html" );
    } else if ( hash.startsWith( "#update?patch=" ) ) {
        const patch = hash.match( /[0-9\.]+/ )[0];
        patch == "5005" && welcomeRender( false, patch );
        history.pushState( "", "", "/options/options.html" );
    }
    // silent update
    if ( local.Patch( "get" ) ) {
        new Notify().Render( "简悦 版本提示", ver.SilentUpdate() );
        local.Patch( "remove" );
    }
}

/**
 * First load
 *
 * @param {bool} is first load
 */
function firstLoad( first ) {
    first && storage.GetRemote( "local", ( result, error ) => {
        if ( !error ) {
            storage.pr.Addsites( result );
            storage.Writesite( storage.pr.sites, () => storage.Statistics( "create" ) );
        } else new Notify().Render( 0, "本地更新出现错误，请选择手动点击 同步配置列表" );
    });
    window.location.hash && window.location.hash.startsWith( "#firstload" ) && first && welcomeRender( true, "all" );
}

/**
 * Welcome page render()
 * 
 * exclude: 1.0.4
 * 
 * @param {boolean} true: first load
 * @param {string} version
 */
function welcomeRender( first, version ) {
    welc.Render( "body", first, version );
}

/**
 * Set options page style and tabs.Render()
 *
 * @param {number} conf.headerColors index
 */
function mainRender( idx ) {
    $( ".top" ).css( "background-color", conf.topColors[idx] );
    $( ".header" ).css( "background-color", conf.topColors[idx] ).find( ".title" ).text( conf.tabsItem[idx].name );
    ( idx == 1 || idx == 2 || idx == 3 || idx == 4 || idx == 6 || idx == 7 ) ? $( '.main' ).addClass( "main_labs" ) : $( '.main' ).removeClass( "main_labs" );
    tabsRender( conf.headerColors[ idx ] );
}

/**
 * Tabs render
 *
 * @param {string} header background color
 */
function tabsRender( color ) {
    const tabs = <Tabs waves="md-waves-effect md-waves-light"
                    headerStyle={{ transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}
                    bgColor={ color }
                    items={ conf.tabsItem }
                    onChange={ ( $p, $t, evt )=>tabsOnChange( $p, $t, evt ) }>
                    <section>
                        <CommonOpt website_sync={website_sync} backgroundColor={ conf.topColors[0] } sync={ ()=> refresh() } />
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <div id="labs" style={{ width: '100%' }}>
                            <div className="version-tips" data-hits="focusmode">
                            <div className="label">focus mode</div>
                            <div className="lab" style={{ 'padding': '30px 30px 10px 10px' }}>
                                <FocusOpt option={ storage.focus } />
                                <Button type="raised" width="100%" text="保 存"
                                        color="#fff" backgroundColor={ conf.topColors[1] }
                                        icon={ ss.IconPath( "save_icon" ) }
                                        waves="md-waves-effect md-waves-button"
                                        onClick={ ()=>save( true ) } />
                            </div>
                            </div>
                            <div className="version-tips" data-hits="readmode">
                            <div className="label">reading mode</div>
                            <div className="lab" style={{ 'padding': '30px 30px 10px 10px' }}>
                                <ReadOpt option={ storage.read } />
                                <Button type="raised" width="100%" text="保 存"
                                        color="#fff" backgroundColor={ conf.topColors[1] }
                                        icon={ ss.IconPath( "save_icon" ) }
                                        waves="md-waves-effect md-waves-button"
                                        onClick={ ()=>save( true ) } />
                            </div>
                            </div>
                        </div>
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <LabsOpt option={ storage.option } read={ storage.read } focus={ storage.focus } onChange={ (s)=>save(s) } />
                    </section>
                    <section style={{ 'padding': '0;', 'overflow-x': 'hidden' }}>
                        <SitesOpts option={ storage.option } onChange={ (s)=>save(s) } />
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <PluginsOpt />
                    </section>
                    <section><Unrdist list={ storage.unrdist.map( item => { return { ...item }} ) } onLoadMoreClick={ ()=> setTimeout( ()=> tt.Render( "list" ), 200 ) } /></section>
                    <section style={{ 'padding': '0;' }}>
                        <AccountOps user={ storage.user } load={ loadState } />
                    </section>
                    <section style={{ 'padding': '0;' }}><About option={ storage.option } site={ storage.simpread.sites.length } statistics={ storage.statistics } onClick={t=>welcomeRender(true,"all")}/></section>
                </Tabs>,
          tabsOnChange = ( $prev, $target, event ) => {
                const idx = $target.attr( "id" );
                tabChange( idx );
          },
          refresh = () => {
                tt.Render( "body" );
          },
          save = state => {
                storage.Write( ()=> {
                    watch.SendMessage( "option", true );
                    state && new Notify().Render( 0, "保存成功，页面刷新后生效！" );
                });
          };
    ReactDOM.render( tabs, $( ".tabscontainer" )[0] );
}

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        side.Open();
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "sidebar_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
    ReactDOM.render( button, $( ".topnav" )[0] );
}

/**
 * sidebar Render
 */
function sidebarRender() {
    const sidebarClick = ( $target, items ) => {
        const idx = conf.tabsItem.findIndex( item => item.value == items.value );
        tabChange( idx );
    }, newItems = [
        {
            name: "帮助中心",
            value: "help",
            fontIcon: "<i class=\"fas fa-question-circle\"></i>",
            route: "http://ksria.com/simpread/docs/",
        },
        {
            name: "开源列表",
            value: "license",
            fontIcon: "<i class=\"fas fa-keyboard\"></i>",
            route: "http://ksria.com/simpread/docs/#/开源列表",
        },
    ];
    conf.menuItem = conf.menuItem.concat( newItems );
    const sidebar = <side.Sidebar items={ conf.menuItem }
                             waves="md-waves-effect" autoClose={false} showClose={ true }
                             header="设定" footer=" 简悦 © 2017 ~ 2020" onClick={ ($t,o)=>sidebarClick($t,o) } />;
    ReactDOM.render( sidebar, $( ".sidebar" )[0] );
}

/*
 * Notice bubbles
 */
function noticeRender() {
    sessionStorage.setItem( "is_update", false );
    const tmpl = `
        <div class="md-waves-effect bubbles notice effect" aria-label="消息中心" data-balloon-pos="up">
            <i><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2555" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M787.908422 563.765991 787.908422 349.052814c0-152.726403-96.294137-222.682685-223.373417-236.678444 0.031722-0.931209 0.278339-1.811252 0.278339-2.76702 0-27.231201-22.429849-49.288566-50.031487-49.288566-27.662013 0-50.058093 22.057365-50.058093 49.288566 0 0.937348 0.23843 1.804089 0.295735 2.677992-127.636982 13.70207-224.524636 83.607186-224.524636 236.767472l0 214.713176c0 172.349323-442.565605 257.698177 265.890766 257.698177C1214.842001 821.464167 787.908422 736.115314 787.908422 563.765991L787.908422 563.765991zM514.782881 960.670649c52.405557 0 94.916766-41.893132 94.916766-93.54042L419.849742 867.13023C419.849742 918.777517 462.347648 960.670649 514.782881 960.670649L514.782881 960.670649zM514.782881 960.670649" p-id="2556" fill="#ffffff"></path></svg></i>
            <em class="init">...</em>
        </div>`;
    storage.Notice( result => {
        if ( $.isEmptyObject( result ) ) {
            storage.notice.latest = 0;
        }
        $.get( storage.notice_service.latest + "?" + Math.round(+new Date()), result => {
            console.log( "notice latest id ", result )
            if ( storage.notice.latest == 0 ) {
                $( "body" ).append( tmpl );
                sessionStorage.setItem( "is_update", true );
            } else if ( storage.notice.latest < result ) {
                $( "body" ).append( tmpl );
                $( ".bubbles em" ).removeClass( "init" ).text( result - storage.notice.read.length );
                sessionStorage.setItem( "is_update", true );
            } else if ( storage.notice.latest > storage.notice.read.length ) {
                $( "body" ).append( tmpl );
                $( ".bubbles em" ).removeClass( "init" ).text( storage.notice.latest - storage.notice.read.length );
            } else if ( storage.notice.latest == storage.notice.read.length && storage.option.notice ) {
                $( "body" ).append( tmpl );
                $( ".bubbles em" ).remove();
            }
        });
    });
    $( "body" ).on( "click", ".notice", event => {
        location.href = location.origin + "/options/notice.html?is_update=" + sessionStorage.getItem( "is_update" );
    });
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "notice" }) );
}

/*
 * Help bubbles
 */
function helpRender() {
    const help_icon  = '<svg viewBox="0 0 1024 1024" version="1.1" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M512 704c-187.733333 0-341.333333-153.6-341.333333-341.333333s153.6-341.333333 341.333333-341.333334 341.333333 153.6 341.333333 341.333334-153.6 341.333333-341.333333 341.333333z m0-597.333333c-140.8 0-256 115.2-256 256s115.2 256 256 256 256-115.2 256-256-115.2-256-256-256z" p-id="4789" fill="#ffffff"></path><path d="M512 576c119.466667 0 213.333333-93.866667 213.333333-213.333333s-93.866667-213.333333-213.333333-213.333334-213.333333 93.866667-213.333333 213.333334 93.866667 213.333333 213.333333 213.333333z" fill="#ffffff"></path><path d="M384 776.533333c0-25.6 21.333333-42.666667 42.666667-42.666666h170.666666c21.333333 0 42.666667 17.066667 42.666667 42.666666s-21.333333 42.666667-42.666667 42.666667h-170.666666c-25.6 0-42.666667-17.066667-42.666667-42.666667z m42.666667 110.933334c0-25.6 17.066667-42.666667 42.666666-42.666667h85.333334c25.6 0 42.666667 17.066667 42.666666 42.666667s-17.066667 42.666667-42.666666 42.666666h-85.333334c-21.333333 0-42.666667-21.333333-42.666666-42.666666z m42.666666 85.333333c0-12.8 8.533333-21.333333 21.333334-21.333333h42.666666c12.8 0 21.333333 8.533333 21.333334 21.333333s-8.533333 21.333333-21.333334 21.333333h-42.666666c-12.8-4.266667-21.333333-12.8-21.333334-21.333333z" p-id="4791" fill="#ffffff"></path></svg>',
          close_icon = '<svg viewBox="0 0 1024 1024" version="1.1" width="24" height="24"><defs><style type="text/css"></style></defs><path d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z" fill="#ffffff"></path></svg>',
          tmpl       = `
                <div class="md-waves-effect bubbles help effect" aria-label="帮助中心" data-balloon-pos="up">
                    <i>${help_icon}</i>
                </div>`,
    exit = () => {
        ReactDOM.unmountComponentAtNode( $( ".guide-bg" )[0] );
        $( ".help i" ).html( help_icon ).css({ "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popdown" });
        $( ".guide-bg" ).remove();
    };
    $( "body" ).append( tmpl );
    $( "body" ).on( "click", ".help", event => {
        if ( $(".guide-bg").length == 0 ) {
            $( "body" ).append( `<div class="guide-bg"></div>` );
            ReactDOM.render( <guide.Guide onExit={ ()=> exit() } />, $( ".guide-bg" )[0] );
            $( ".help i" ).html( close_icon ).css({ "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
        } else {
            exit();
        }
    });
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "help" }) );
}

/*
 * Feedback bubbles
 */
function feedbackRender() {
    const tmpl = `
        <div class="md-waves-effect bubbles feedback effect" aria-label="给我反馈" data-balloon-pos="up">
            <i><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M896 981.333333l-213.333333-128H213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V128c0-46.933333 38.4-85.333333 85.333333-85.333333h597.333334c46.933333 0 85.333333 38.4 85.333333 85.333333v853.333333zM298.666667 512c-8.533333 0-12.8 0-21.333334 4.266667s-17.066667 17.066667-21.333333 25.6c0 12.8 0 25.6 4.266667 34.133333 55.466667 93.866667 153.6 149.333333 260.266666 149.333333 106.666667 0 204.8-55.466667 260.266667-149.333333 4.266667-8.533333 8.533333-21.333333 4.266667-34.133333-4.266667-12.8-8.533333-21.333333-21.333334-25.6-8.533333-4.266667-12.8-4.266667-21.333333-4.266667-17.066667 0-29.866667 8.533333-38.4 21.333333C665.6 597.333333 597.333333 640 520.533333 640c-76.8 0-145.066667-42.666667-183.466666-106.666667-8.533333-12.8-21.333333-21.333333-38.4-21.333333z" fill="#ffffff"></path></svg></i>
        </div>`;
    $( "body" ).append( tmpl );
    $( "body" ).on( "click", ".feedback", event => {
        fb.Render( storage.version, storage.user );
        setTimeout( () => tt.Render( ".simpread-feedback" ), 200 );
    });
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "help", eventAction: "help", eventValue: "feedback" }) );
}