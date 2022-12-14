console.log( "==== simpread options page: custom load ====" )

import '../assets/css/simpread.css';
import '../assets/css/options_page.css';
import '../assets/css/options_custom.css';
import 'notify_css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import TextField  from 'textfield';
import SelField   from 'selectfield';

import Button     from 'button';
import * as waves from 'waves';
import * as tt    from 'tooltip';
import Switch     from 'switch';

import { storage, STORAGE_MODE as mode } from 'storage';
import * as ss    from 'stylesheet';
import * as conf  from 'config';
import * as ver   from 'version';
import * as watch from 'watch';
import th         from 'theme';

let cur_custom;

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage.focus, storage.read );
    cur_custom = storage.read.custom;
    navRender();
    propertyRender();
    setPreviewStyle();
    tt.Render( "body" );
    waves.Render({ root: "body" });
    $( "body" ).velocity({ opacity: 1 }, { duration: 1000, complete: ()=> {
        $( "body" ).removeAttr( "style" );
    }});
}); 

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        location.href = location.origin + "/options/options.html#labs";
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "gohome_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

/**
 * Set preview style
 */
function setPreviewStyle() {
    th.Change( storage.read.theme );
    ss.FontFamily( storage.read.fontfamily );
    ss.FontSize( storage.read.fontsize );
    ss.Layout( storage.read.layout );
    ss.Preview( storage.read.custom );
}

/**
 * Property Render
 */
function propertyRender() {
    const getThemes = ( names, values ) => {
        const arr = [];
        return names.map( ( name, idx ) => {
            return { value: values[idx], name : name }
        });
    },
    changeTheme = ( value, name ) => {
        storage.read.theme = th.names[conf.readLabels.indexOf( name )];
        th.Change( storage.read.theme );
    },
    change     = ( type, props, value ) => {
        typeof value == "string" && ( value = value.trim());
        if ( type == "global" ) {
            props == "Layout" && ( value = `${ 100 - value }%` );
            ss[props]( value );
            storage.read[props.toLowerCase()] = value;
        } else if ( props ) {
            cur_custom[type][props] = value;
            props == "textShadow" && ( cur_custom[type]["textShadow"]  = value ? "0 1px rgba(0,0,0,0.3)" : "" );
            ss.Custom( type, cur_custom[type] );
        } else {
            cur_custom[type] = value;
            ss.CSS( type, value );
        }
    },
    click      = type => {
        if ( type == "save" ) {
            save();
        } else {
            new Notify().Render( "snackbar", "??????????????? ??????????????? ??????????????????", "??????", () => {
                Object.keys( cur_custom ).forEach( v => {
                    v != "css" ? Object.keys( cur_custom[v] ).forEach( item => {
                        cur_custom[v][item] = "";
                    }) : cur_custom[v] = "";
                });
                save( "clear" );
            });
        }
    },
    save       = state => {
        storage.Write( () => {
            watch.SendMessage( "option", true );
            state == "clear" ? 
                new Notify().Render( "snackbar", "???????????????????????????????????????????????????", "?????? ", ()=>{
                    location.href = location.origin + location.pathname;
                })
            : new Notify().Render( 0, "???????????????????????????????????????" );
        });
    };
    const doms = <div>
                    <group className="lab">
                        <h1>??????</h1>
                        <group>
                            <p>?????????????????????????????? <a href="http://ksria.com/simpread/docs/#/???????????????" target="_blank">????????????</a><br/>
                            ??????????????????????????? <a href="https://github.com/Kenshin/simpread/issues/71" target="_blank">??????????????????</a></p>
                        </group>
                    </group>

                    <group className="lab">
                        <h1>??????</h1>
                        <group>
                            <SelField waves="md-waves-effect"
                                floatingtext="??????"
                                name={ conf.readLabels[ th.names.indexOf( storage.read.theme ) ] }
                                items={ getThemes( conf.readLabels, th.colors )}
                                onChange={ (v,n)=>changeTheme(v,n) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 font-family ???"
                                value = { storage.read.fontfamily }
                                onChange={ (evt)=>change( "global", "FontFamily", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????????????????????????????????????????? 70 ~ 100"
                                value = { 100 - parseInt( storage.read.layout == "" ? 20 : storage.read.layout ) }
                                onChange={ (evt)=>change( "global", "Layout", evt.target.value ) }
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>???????????????</h1>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="??????????????????"
                                placeholder="?????? CSS3 font-family ???"
                                value = { cur_custom.title.fontFamily }
                                onChange={ (evt)=>change( "title", "fontFamily", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="??????????????????"
                                placeholder="?????? CSS3 font-size ???"
                                value = { cur_custom.title.fontSize }
                                onChange={ (evt)=>change( "title", "fontSize", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 color ?????????"
                                value = { cur_custom.title.color }
                                onChange={ (evt)=>change( "title", "color", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="??????????????????"
                                placeholder="?????? CSS3 font-family ???"
                                value = { cur_custom.desc.fontFamily }
                                onChange={ (evt)=>change( "desc", "fontFamily", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="??????????????????"
                                placeholder="?????? CSS3 font-size ???"
                                value = { cur_custom.desc.fontSize }
                                onChange={ (evt)=>change( "desc", "fontSize", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 color ?????????"
                                value = { cur_custom.desc.color }
                                onChange={ (evt)=>change( "desc", "color", evt.target.value ) }
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>??????</h1>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 font-family ???"
                                value = { cur_custom.art.fontFamily }
                                onChange={ (evt)=>change( "art", "fontFamily", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 font-size ???"
                                value = { cur_custom.art.fontSize }
                                onChange={ (evt)=>change( "art", "fontSize", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 color ?????????"
                                value = { cur_custom.art.color }
                                onChange={ (evt)=>change( "art", "color", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="??????"
                                placeholder="?????? CSS3 font-weight ???"
                                value = { cur_custom.art.fontWeight }
                                onChange={ (evt)=>change( "art", "fontWeight", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 word-spacing ???"
                                value = { cur_custom.art.wordSpacing }
                                onChange={ (evt)=>change( "art", "wordSpacing", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="?????????"
                                placeholder="?????? CSS3 letter-spacing ???"
                                value = { cur_custom.art.letterSpacing }
                                onChange={ (evt)=>change( "art", "letterSpacing", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="?????????"
                                placeholder="?????? CSS3 line-height ???"
                                value = { cur_custom.art.lineHeight }
                                onChange={ (evt)=>change( "art", "lineHeight", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 text-indent ???"
                                value = { cur_custom.art.textIndent }
                                onChange={ (evt)=>change( "art", "textIndent", evt.target.value ) }
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>?????????</h1>
                        <group>
                            <Switch width="100%" checked={ false }
                                thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                                label="??????????????????"
                                checked = { cur_custom.pre.textShadow ? true : false }
                                onChange={ (s)=>change( "pre", "textShadow", s ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 font-family ???"
                                value = { cur_custom.code.fontFamily }
                                onChange={ (evt)=>change( "code", "fontFamily", evt.target.value ) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="????????????"
                                placeholder="?????? CSS3 font-size ???"
                                value = { cur_custom.code.fontSize }
                                onChange={ (evt)=>change( "code", "fontSize", evt.target.value ) }
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>????????? CSS</h1>
                        <group>
                            <TextField 
                                multi ={ true } rows ={ 10 }
                                value = { cur_custom.css }
                                onChange={ (evt)=>change( "css", "", evt.target.value ) }
                            />
                        </group>
                    </group>

                    <group>
                        <group>
                            <Button type="raised" text="??????" width="100%"
                                style={{ "margin": "0" }}
                                icon={ ss.IconPath( "save_icon" ) }
                                color="#fff" backgroundColor="#3f51b5"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>click( "save" ) }
                            />
                        </group>

                        <group>
                            <Button type="raised" text="??????????????????" width="100%"
                                style={{ "margin": "0" }}
                                icon={ ss.IconPath( "clear_icon" ) }
                                tooltip={{ text: "?????????????????????????????????????????????????????????????????????" }}
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>click( "clear" ) }
                            />
                        </group>
                    </group>

                </div>;
    ReactDOM.render( doms, $( ".custom .property" )[0] );
}