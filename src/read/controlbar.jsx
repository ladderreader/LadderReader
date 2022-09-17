console.log( "=== simpread read controlbar load ===" )

import * as ss     from 'stylesheet';
import {browser,br}from 'browser';
import * as msg    from 'message';
import th          from 'theme';
import * as conf   from 'config';
import * as output from 'output';
import * as watch  from 'watch';
import * as kbd    from 'keyboard';
import { storage } from 'storage';
import * as run    from 'runtime';

import ReadOpt     from 'readopt';
import Actionbar   from 'actionbar';
import Pluginbar   from 'pluginbar';
import Sitebar     from 'sitebar';

import Fab         from 'fab';
import Fap         from 'fap'
import * as ttips  from 'tooltip';

import Button      from 'button';

import 'button_component_css';
import 'asidenav_css';

import If from 'react_if';

let notify, readItems;
const tooltip_options = {
    target   : "name",
    position : "bottom",
    delay    : 50,
};


const ruler = document.createElement('div');
ruler.setAttribute('id', 'dyslexia-friendly-ruler');
ruler.setAttribute('style', 'height:30px;');


let speak = false;

/**
 * Read controlbar
 * 
 * @class
 */
export default class ReadCtlbar extends React.Component {

    static propTypes = {
        onAction: React.PropTypes.func,
    }

    verify( type ) {
        if ( ss.VerifyCustom( type, storage.current.custom ) ) {
            !notify && ( notify = new Notify().Render({ state: "holdon", content: '由于已使用自定义样式，设定 <b style="color: #fff;">有可能无效</b>，详细说明 <a href="http://ksria.com/simpread/docs/#/自定义样式" target="_blank">请看这里</a>', callback:()=>notify=undefined }));
        }
    }

    componentDidMount() {
        browser.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
            if ( request.type == msg.MESSAGE_ACTION.export ) {
                console.log( "controlbar runtime Listener", request );
                new Notify().Render( "Reauthorized successfully！" );
                br.isFirefox() ? new Notify().Render( "Please refresh this page to take effect" ) : this.onAction( undefined, request.value.type );
            }
        });
        kbd.Listen( combo => {
            this.onAction( undefined, combo )
        });
        run.Controlbar( undefined, event => {
            this.onAction( undefined, event.detail.type );
        });

        $("#closeIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#close-icon" ).addClass( "hi-icon hi-icon-close" );

        $("#fastIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#fast-icon" ).addClass( "hi-icon hi-icon-fast-mode" );

        $("#dyslexiaIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#dyslexia-icon" ).addClass( "hi-icon hi-icon-accessibility" );
        
        $("#dyslexiaMenuFirstIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#dyslexia-menu-first-icon" ).addClass( "hi-icon hi-icon-font" );

        $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#dyslexia-menu-second-icon" ).addClass( "hi-icon hi-icon-template-1" );
                
        $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#dyslexia-menu-third-icon" ).addClass( "hi-icon hi-icon-template-2" );

        $("#dyslexiaMenuFourthIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#dyslexia-menu-fourth-icon" ).addClass( "hi-icon hi-icon-ruler" );

        $("#speakIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#speak-icon" ).addClass( "hi-icon hi-icon-speak" );

        $("#exportIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#export-icon" ).addClass( "hi-icon hi-icon-export" );
        
        $("#exportMenuFirstIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#export-menu-first-icon" ).addClass( "hi-icon hi-icon-export-pdf" );

        $("#exportMenuSecondIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#export-menu-second-icon" ).addClass( "hi-icon hi-icon-export-img" );
                
        $("#exportMenuThirdIconBox" ).addClass( "hi-icon-wrap hi-icon-effect-3 hi-icon-effect-3b" );
        $("#export-menu-third-icon" ).addClass( "hi-icon hi-icon-export-md" );

        if(storage.read.mode === conf.READ_MODE_FAST){
            $("#fastIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#fastIconBox" ).addClass( "hi-icon-effect-3a" );
        }else if(storage.read.mode === conf.READ_MODE_DYSLEXIA_1){
            $("#dyslexiaMenuSecondIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-effect-3a" );
        }else if(storage.read.mode === conf.READ_MODE_DYSLEXIA_2){
            $("#dyslexiaMenuThirdIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-effect-3a" );
        }

        // 字体图标
        if(storage.read.fontfamily === conf.FONT_FAMILY_DYSLEXIC){
            $("#dyslexiaMenuFirstIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuFirstIconBox" ).addClass( "hi-icon-effect-3a" );
        }

        // Dyslexia的菜单
        $("#aside-nav" ).addClass("aside-nav bounceInUp animated");
        $("#aside-menu" ).addClass("aside-menu");
        $("#menu-first" ).addClass("menu-item menu-first");
        $("#menu-second" ).addClass("menu-item menu-second");
        $("#menu-third" ).addClass("menu-item menu-third");
        $("#menu-fourth" ).addClass("menu-item menu-line menu-fourth");

        // 导出的菜单
        $("#aside-nav2" ).addClass("aside-nav2 bounceInUp animated");
        $("#aside-menu2" ).addClass("aside-menu2");
        $("#menu-first2" ).addClass("menu-item2 menu-first2");
        $("#menu-second2" ).addClass("menu-item2 menu-second2");
        $("#menu-third2" ).addClass("menu-item2 menu-third2");

        this.dyslexiaMainMenuActive();

        // 显示ruler
        this.handlerRulerClick(storage.read.rulerVisible, false)

        // 监听更新列表
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName !== 'local') {
            return;
            }
            console.log('chrome.storage.onChanged.addListener', changes);
            if(changes && changes.simpread && changes.simpread.newValue){
                console.log('监听更新列表 showMenu ', changes.simpread.newValue.read.showMenu);
                if(changes.simpread.newValue.read.showMenu){
                    $("#aside-nav2" ).addClass("aside-nav2 bounceInUp animated");
                }
            }
        });
    }

    handlerFastClick(event) {
        if(storage.read.mode === conf.READ_MODE_FAST){
            $("#fastIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#fastIconBox" ).removeClass( "hi-icon-effect-3a" );
        }else{
            $("#fastIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#fastIconBox" ).addClass( "hi-icon-effect-3a" );

            // 取消其他dyslexia mode的选中
            $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuThirdIconBox" ).removeClass( "hi-icon-effect-3a" );
            $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuSecondIconBox" ).removeClass( "hi-icon-effect-3a" );  
        }
        this.onAction(event, "fastMode" )
    }

    handlerDyslexiaClick(event,mode){
        // 取消快速模式
        $("#fastIconBox" ).addClass( "hi-icon-effect-3b" );
        $("#fastIconBox" ).removeClass( "hi-icon-effect-3a" );

        if(mode === conf.READ_MODE_DYSLEXIA_1){
            if(storage.read.mode === conf.READ_MODE_DYSLEXIA_1){
                $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuSecondIconBox" ).removeClass( "hi-icon-effect-3a" );
                storage.read.mode = conf.READ_MODE_GENERAL
            }else{
                $("#dyslexiaMenuSecondIconBox" ).removeClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-effect-3a" );

                // 取消其他dyslexia mode的选中
                $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuThirdIconBox" ).removeClass( "hi-icon-effect-3a" );
                storage.read.mode = conf.READ_MODE_DYSLEXIA_1
            }
        }

        if(mode === conf.READ_MODE_DYSLEXIA_2){
            if(storage.read.mode === conf.READ_MODE_DYSLEXIA_2){
                $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuThirdIconBox" ).removeClass( "hi-icon-effect-3a" );
                storage.read.mode = conf.READ_MODE_GENERAL
            }else{
                $("#dyslexiaMenuThirdIconBox" ).removeClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuThirdIconBox" ).addClass( "hi-icon-effect-3a" );

                // 取消其他dyslexia mode的选中
                $("#dyslexiaMenuSecondIconBox" ).addClass( "hi-icon-effect-3b" );
                $("#dyslexiaMenuSecondIconBox" ).removeClass( "hi-icon-effect-3a" );  
                storage.read.mode = conf.READ_MODE_DYSLEXIA_2                      
            }
        }

        this.dyslexiaMainMenuActive()

        this.onAction(event, mode)
        
    }

    handlerDyslexiaFontfamilyClick(event){

        if(storage.read.fontfamily === conf.FONT_FAMILY_DYSLEXIC){
            storage.read.fontfamily = conf.FONT_FAMILY_DEFAULT
            $("#dyslexiaMenuFirstIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuFirstIconBox" ).removeClass( "hi-icon-effect-3a" );
        }else{
            storage.read.fontfamily = conf.FONT_FAMILY_DYSLEXIC
            $("#dyslexiaMenuFirstIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuFirstIconBox" ).addClass( "hi-icon-effect-3a" );
        }
        storage.Write( ()=> {
            this.dyslexiaMainMenuActive()
            this.onAction(event, "updateFontfamily")
        })
        
    }


    dyslexiaMainMenuActive(){
        if(storage.read.fontfamily === conf.FONT_FAMILY_DYSLEXIC 
            || storage.read.mode === conf.READ_MODE_DYSLEXIA_1 
            || storage.read.mode === conf.READ_MODE_DYSLEXIA_2
            || storage.read.rulerVisible){
                $("#dyslexiaIconBox" ).removeClass( "hi-icon-effect-3b" );
                $("#dyslexiaIconBox" ).addClass( "hi-icon-effect-3a" );
        }else{
                $("#dyslexiaIconBox" ).addClass( "hi-icon-effect-3b" );
                $("#dyslexiaIconBox" ).removeClass( "hi-icon-effect-3a" );
        }        
    }


    handlerRulerClick(rulerVisible, showNotify = true) {
        if(!rulerVisible){
            try {
                $(".simpread-read-root").children("#dyslexia-friendly-ruler").remove();
            } catch (e) {
                console.error(e)
            }
            storage.read.rulerVisible = false;

            $("#dyslexiaMenuFourthIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuFourthIconBox" ).removeClass( "hi-icon-effect-3a" );

            if(showNotify){
                new Notify().Render("cancel ruler");
            }

        }else{
            
            $(".simpread-read-root").append(ruler );
            $('.simpread-read-root').mousemove(function(event) {
              $(ruler).css('top', event.pageY - 30 / 2);
            });
            storage.read.rulerVisible = true;

            $("#dyslexiaMenuFourthIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#dyslexiaMenuFourthIconBox" ).addClass( "hi-icon-effect-3a" );

            if(showNotify){
                new Notify().Render("activate ruler");
            }

        }
        this.dyslexiaMainMenuActive();
        storage.Write( ()=> {})
    }



    handlerSpeakClick(event) {
        if(speak){
            $("#speakIconBox" ).addClass( "hi-icon-effect-3b" );
            $("#speakIconBox" ).removeClass( "hi-icon-effect-3a" );
            speak = false
            this.onAction(event, "dyslexia_speak_stop" )
        }else{
            $("#speakIconBox" ).removeClass( "hi-icon-effect-3b" );
            $("#speakIconBox" ).addClass( "hi-icon-effect-3a" );
            speak = true
            this.onAction(event, "dyslexia_speak" )
        }
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )

        this.verify( type.split( "_" )[0] );

        run.Event( "export", type );

        const action = ( event, type ) => {
            this.props.multi && 
            [ "markdown", "dropbox", "yinxiang","evernote", "onenote", "gdrive" ].includes( type ) &&
            new Notify().Render( "Currently it is a forum type page, it is not recommended to use the export service, there may be unknown errors" );

            switch ( true ) {
                case [ "exit", "setting", "siteeditor", "remove", "highlight","fastMode",conf.READ_MODE_DYSLEXIA_1,conf.READ_MODE_DYSLEXIA_2,conf.READ_MODE_DYSLEXIA_3,"updateFontfamily","exportPDF","exportPNG",',"exportMD"' ].includes( type ):
                    this.props.onAction( type );
                    break;
                case type.indexOf( "_" ) > 0 && ( type.startsWith( "fontfamily" ) || type.startsWith( "fontsize" ) || type.startsWith( "layout" )):
                    const [ key, value ] = [ type.split( "_" )[0], type.split( "_" )[1] ];
                    Object.keys( ss ).forEach( (name)=>name.toLowerCase() == key && ss[name]( value ));
                    this.props.onAction && this.props.onAction( key, value );
                    break;
                case type.indexOf( "_" ) > 0 && type.startsWith( "theme" ):
                    let i = th.names.indexOf( th.theme );
                    i = type.endsWith( "prev" ) ? --i : ++i;
                    i >= th.names.length && ( i = 0 );
                    i < 0 && ( i = th.names.length - 1 );
                    th.Change( th.names[i] );
                    this.props.onAction && this.props.onAction( type.split( "_" )[0], th.theme );
                    break;
                case type.startsWith( "dyslexia" ):
                    output.Action( type, $( "sr-rd-title" ).text(), "", $( "sr-rd-content" ).text() );
                    break;
                case type == "tempread":
                    if ( storage.pr.state != "temp" ) {
                        new Notify().Render( "This function is only available in temporary reading mode" );
                        return;
                    }
                    // hack code
                    const news = { ...storage.pr.current.site };
                    storage.pr.dom && ( news.include = storage.pr.dom.outerHTML.replace( storage.pr.dom.innerHTML, "" ).replace( /<\/\S+>$/i, "" ));
                    delete news.html;
                    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.temp_site, { url: location.href, site: news, uid: storage.user.uid, type: "temp" }));
                    break;
                case type.startsWith( "webdav_" ) :
                        const [ title, desc, content ] = [ $( "sr-rd-title" ).text().trim(), $( "sr-rd-desc" ).text().trim(), $( "sr-rd-content" ).html().trim() ];
                        output.Action( type, title, desc, content );
                    break;
                default:
                    if ( type.indexOf( "_" ) > 0 && type.startsWith( "share" ) || 
                        [ "fullscreen", "save", "markdown", "offlinemarkdown", "png", "epub", "pdf", "kindle", "temp", "bear", "ulysses", "html", "offlinehtml", "snapshot", "dropbox", "pocket", "instapaper", "linnk", "yinxiang", "evernote", "onenote", "gdrive", "jianguo", "yuque", "notion", "youdao", "weizhi" ].includes( type )) {
                        const [ title, desc, content ] = [ $( "sr-rd-title" ).text().trim(), $( "sr-rd-desc" ).text().trim(), $( "sr-rd-content" ).html().trim() ];
                        output.Action( type, title, desc, content );
                    }
            }
        };

        type != "exit" ? watch.Verify( ( state, result ) => {
            if ( state ) {
                console.log( "watch.Lock()", result );
                new Notify().Render( "The configuration file has been updated and will take effect after refreshing the current page", "refresh", ()=>location.href = location.href );
            } else action( event, type );
        }) : action( event, type );

    }

    onChange( type, custom ) {
        const [ key, value ] = [ type.split( "_" )[0], type.split( "_" )[1] ];
        run.Event( "read_ui", { key, value, custom });
        this.props.onAction && this.props.onAction( key, value, custom );
        this.verify( key );
    }

    onPop( type ) {
        type == "open" ? ttips.Render( ".simpread-read-root", "panel" ) : ttips.Exit( ".simpread-read-root", "panel" );
    }

    componentWillMount() {
        readItems = $.extend( true, {}, conf.readItems );
        try {
            if ( storage.current.fap ) {
                delete readItems.exit;
                delete readItems.option.items.setting;
                delete readItems.fontfamily;
                delete readItems.fontsize;
                delete readItems.layout;
                delete readItems.theme;
            } else {
                delete readItems.trigger;
            }
            if ( this.props.type.startsWith( "txtread::" ) && this.props.type.endsWith( "::local" )) {
                delete readItems.download;
                delete readItems.readlater;
                delete readItems.send;
                delete readItems.share;
                delete readItems.option;
            }
            if ( this.props.type.startsWith( "metaread::" ) || this.props.type.startsWith( "txtread::" ) ) {
                delete readItems.option;
            }
            if ( !/macintosh|mac os x/i.test(navigator.userAgent) ) {
                delete readItems.send.items.bear;
                delete readItems.send.items.ulysses;
            }
            readItems.send && storage.Safe( () => {
                storage.secret.webdav.forEach( item => {
                    item = JSON.parse( item );
                    readItems.send.items[ "webdav_" + item.name ] = {
                        name: item.name,
                        icon: ss.IconPath("webdav_icon"),
                        "color": "#00BCD4",
                    };
                });
            })
            // Add test source
            storage.current.fap && storage.Plugins( () => {
                !$.isEmptyObject( storage.plugins ) && storage.option.plugins.forEach( id => {
                    const plugin = storage.plugins[id];
                    // Add test source
                    if ( plugin.enable != false && ( plugin.trigger == true || plugin.trigger == "true" )) {
                    //if ( plugin.id == "Y7JxbP7B4H" ) {
                        readItems.trigger.items["plugin_" + plugin.id] = {
                            "name"     : plugin.name,
                            "fontIcon" : plugin.icon.type,
                            "color"    : plugin.icon.bgColor,
                        };
                    }
                });
                if ( readItems.trigger && $.isEmptyObject( readItems.trigger.items )) {
                    delete readItems.trigger;
                }
            });
        } catch ( err ) {
            // TO-DO
        }
        // hack code
        !/chrome/ig.test( navigator.userAgent ) && ( delete readItems.dyslexia );
    }

    constructor( props ) {
        super( props );
    }

    render() {
        const Controlbar = storage.current.fap ? 
            <Fap items={ [ "样式", "动作", "站点", "插件" ] } autoHide={ false }
                waves="md-waves-effect md-waves-circle md-waves-float" 
                onOpen={ ()=> this.onPop( "open" ) } onClose={ ()=> this.onPop( "close" ) }
                onAction={ (event, type)=>this.onAction(event, type ) }>
                <ReadOpt option={ storage.current } onChange={ (t,c)=>this.onChange(t,c)}/>
                <Actionbar items={ readItems } onAction={ (type)=>this.onAction(undefined, type ) }/>
                <Sitebar />
                <Pluginbar />
            </Fap>
            :
            <Fab items={ readItems } tooltip={ tooltip_options } waves="md-waves-effect md-waves-circle md-waves-float" onAction={ (event, type)=>this.onAction(event, type ) } />
        return (
            <sr-rd-crlbar class={ this.props.show ? "" : "controlbar" } style={{ "zIndex": "2" }}>
                {/* { Controlbar } */}

                    <div id="menuBox">

                        <div id="speakIconBox" title="Speak">
                            <div id="speak-icon"onClick={ (event)=>this.handlerSpeakClick(event)}>
                            </div>
                        </div>

                        <div id="aside-nav2">
                            <label id="aside-menu2" for="" class="aside-menu" title="export">
                                <div id="exportIconBox">
                                    <div id="export-icon"onClick={ ()=>this.handlerDyslexiaFontfamilyClick()}>
                                    </div>
                                </div>
                            </label>

                            <div id="export-menu-brank">

                            </div>

                            <div id="menu-first2" title="Export PDF" class="menu-item menu-first">
                                <div id="exportMenuFirstIconBox">
                                    <div id="export-menu-first-icon"onClick={ (event)=>{
                                        this.onAction(event, "exportPDF" )
                                        $("#aside-nav2" ).removeClass("aside-nav2 bounceInUp animated");
                                    }}>
                                    </div>
                                </div>
                            </div>

                            <div id="menu-second2" title="Export PNG" class="menu-item menu-first">
                                <div id="exportMenuSecondIconBox">
                                    <div id="export-menu-second-icon"onClick={ (event)=>{
                                        this.onAction(event, "exportPNG" )
                                        $("#aside-nav2" ).removeClass("aside-nav2 bounceInUp animated");
                                     }}>
                                    </div>
                                </div>
                            </div>

                            <div id="menu-third2" title="Export Markdown" class="menu-item menu-first">
                                <div id="exportMenuThirdIconBox">
                                    <div id="export-menu-third-icon"onClick={ (event)=>this.onAction(event, "markdown" )}>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="aside-nav bounceInUp animated" id="aside-nav">
                            <label id="aside-menu" for="" class="aside-menu" title="dyslexia mode">
                                <div id="dyslexiaIconBox" title="Dyslexia Mode">
                                    <div id="dyslexia-icon"onClick={ ()=>this.handlerDyslexiaFontfamilyClick()}>
                                    </div>
                                </div>
                            </label>

                            <div id="dyslexia-menu-brank">

                            </div>

                            <div id="menu-first" title="Dyslexia Front" class="menu-item menu-first">
                                <div id="dyslexiaMenuFirstIconBox">
                                    <div id="dyslexia-menu-first-icon"onClick={ ()=>this.handlerDyslexiaFontfamilyClick()}>
                                    </div>
                                </div>
                            </div>

                            <div id="menu-second" title="Dyslexia Template A" class="menu-item menu-first">
                                <div id="dyslexiaMenuSecondIconBox">
                                    <div id="dyslexia-menu-second-icon"onClick={ (event)=>this.handlerDyslexiaClick(event, conf.READ_MODE_DYSLEXIA_1)}>
                                    </div>
                                </div>
                            </div>

                            <div id="menu-third" title="Dyslexia Template B" class="menu-item menu-first">
                                <div id="dyslexiaMenuThirdIconBox">
                                    <div id="dyslexia-menu-third-icon"onClick={ (event)=>this.handlerDyslexiaClick(event, conf.READ_MODE_DYSLEXIA_2)}>
                                    </div>
                                </div>
                            </div>

                            <div id="menu-fourth" title="Ruler" class="menu-item menu-first">
                                <div id="dyslexiaMenuFourthIconBox">
                                    <div id="dyslexia-menu-fourth-icon"onClick={ (event)=>this.handlerRulerClick(!storage.read.rulerVisible)}>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div id="fastIconBox" title="Fast Mode" >
                            <div id="fast-icon"onClick={ ()=>this.handlerFastClick()}>
                            </div>
                        </div>
                        <div id="closeIconBox" title="Close" >
                            <div id="close-icon"
                                onClick={ (event, type)=>this.onAction(event, "exit" ) }
                                >Settings
                            </div>
                        </div>
                    </div>

            </sr-rd-crlbar>
        )
    }
}
