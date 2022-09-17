console.log( "=== simpread read load ===" )

import ProgressBar        from 'schedule';
import * as spec          from 'special';
import ReadCtlbar         from 'readctlbar';
import * as toc           from 'toc';
import * as setting       from 'setting';
import * as se            from 'siteeditor';
import * as kbd           from 'keyboard';
import * as fb            from 'feedback';

import { storage, Clone } from 'storage';
import th                 from 'theme';
import * as ss            from 'stylesheet';
import {browser}          from 'browser';
import * as msg           from 'message';
import * as highlight     from 'highlight';
import * as run           from 'runtime';
import * as tips          from 'tips';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';

import  * as visualEngine from 'readapt_visual_engine'

import {READ_MODE_FAST, READ_MODE_GENERAL, READ_MODE_DYSLEXIA_1, READ_MODE_DYSLEXIA_2, FONT_FAMILY_DYSLEXIC, EXPORT_TYPE_IMG, EXPORT_TYPE_PDF}  from 'config';

// Linear interpolate between v0 and v1 at percent t
function lerp(v0, v1, t)
{
	return v0 * (1 - t) + v1 * t
}

// Convert a hex triplet (#XXXXXX) to an array containing red, green, and blue
function hex_to_rgb(hex)
{
	return hex.replace('#', '').match(/.{1,2}/g).map(
		x => parseInt(x, 16)
	);
}

// Color all lines in the page
function applyGradient(colors, color_text, gradient_size, element)
{
	const paragraphs = element.getElementsByTagName('p');
	const base_color = hex_to_rgb(color_text);
	let coloridx = 0;
	let lineno = 0;

	for (let paragraph of paragraphs) {
		const lines = lineWrapDetector.getLines(paragraph);

		for (let line of lines) {
			// Alternate between left and right for every color
			const active_color = hex_to_rgb(colors[coloridx]);

			// Flip array around if on left to color correctly
			const is_left = (lineno % 2 === 0);
			if(is_left) {
				line = Array.from(line).reverse();
			}

			// Color lines using lerp of RGB values
			for (let loc in line) {
				const t = 1 - (loc / (line.length * gradient_size / 50));
				const red = lerp(base_color[0], active_color[0], t);
				const green = lerp(base_color[1], active_color[1], t);
				const blue = lerp(base_color[2], active_color[2], t);

				line[loc].style.color = "rgb(" + (red|0) + "," + (green|0) + "," + (blue|0) + ")";
			}

			// Increment color index after every left/right pair, and lineno
			// after every line
			if (!is_left) {
				coloridx = (coloridx + 1) % colors.length;
			}
			lineno += 1;
		}
	}
    return element
}

const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

// load count,.0: call Readability. 1: call highlight 2: all failed
let   load_count = 0;

const Footer = () => {
    const good_icon = '<svg t="1556354786433" viewBox="0 0 1024 1024" version="1.1" width="33" height="33"><defs><style type="text/css"></style></defs><path d="M859.8 191.2c-80.8-84.2-212-84.2-292.8 0L512 248.2l-55-57.2c-81-84.2-212-84.2-292.8 0-91 94.6-91 248.2 0 342.8L512 896l347.8-362C950.8 439.4 950.8 285.8 859.8 191.2z" p-id="6225" fill="#8C8C8C"></path></svg>',
          bad_icon  = '<svg t="1556354650943" viewBox="0 0 1024 1024" version="1.1" p-id="5899" width="33" height="33"><defs><style type="text/css"></style></defs><path d="M458 576c2-36 0-76 16-110 4-10 2-20 2-30-8-42-28-80-30-120 0-2.78 2.008-9.542 2.01-12.314-6.432 4.468-15.214 8.048-22.01 10.314-40 12-35.02 5.146-69.02 27.146l-23.866 14.456c32.686-35.878 77.056-49.562 113.05-77.428 0.388-30.876 1.716-61.354 6.274-91.68C371.22 106.992 243.57 108.536 164.246 191.14c-90.994 94.688-90.994 248.202 0 342.89l305.698 318.192c-0.17-21.312-0.886-42.352-3.944-62.222C454 718 458 648 458 576z" p-id="5900" fill="#8C8C8C"></path><path d="M644 602c-22-52-66-88-126-100-1.7 0-3.758-1.086-5.872-2.638-0.046 0.214-0.082 0.426-0.128 0.638-22 96-46 188-42 284 0 24.454 7.966 50.234 7.666 76.262L512 896l208-216.5C690.306 658.542 660.856 637.242 644 602z" p-id="5901" fill="#8C8C8C"></path><path d="M859.748 191.14c-80.852-84.188-211.978-84.188-292.816 0L528 230.806c0.15 26.35 0.426 52.404-6 77.194-4 20-38 38-32 62 6.006 26.426 16.332 51.41 21.464 77.118C542.028 464.168 569.542 485.792 594 512c45.602 53.532 75.494 114.918 130.566 162.742l135.182-140.71C950.75 439.342 950.75 285.828 859.748 191.14z" p-id="5902" fill="#8C8C8C"></path></svg>',
          onClick   = ( rate = false ) => {
            fb.Render( storage.version, storage.user, rate );
                setTimeout( () => tooltip.Render( ".simpread-feedback" ), 200 );
            };
    return (
        <sr-rd-footer>
            <sr-rd-footer-group>
                <sr-rd-footer-line></sr-rd-footer-line>
                <sr-rd-footer-text>END</sr-rd-footer-text>
                <sr-rd-footer-line></sr-rd-footer-line>
            </sr-rd-footer-group>
            <sr-rd-footer-copywrite>
                <div>This article is optimized by 
                    <a target="_blank" href="https://ladderreader.com">
                    &nbsp; Ladder Reader  &nbsp; 
                    </a>
                    to improve the reading experience</div>
            </sr-rd-footer-copywrite>
        </sr-rd-footer>
    )
}

class Read extends React.Component {

    state = {
        html  : "",
        showMenu : true
    };

    verifyContent() {
        if ( $("sr-rd-content").text().length < 100 ) {
            if ( load_count == 0 ) {
                new Notify().Render({ content: "If an exception is detected in the acquisition of the body, whether to re-acquire it？", action: "yes", cancel: "no", callback: type => {
                    if ( type == "cancel" ) return;
                    load_count++;
                    this.componentWillUnmount();
                    storage.pr.Readability();
                    Render();
                }});
            } else if ( load_count == 1 ) {
                this.componentWillUnmount();
                new Notify().Render({ content: 'Failed to get the text, whether to use manual box selection to highlight？', action: "yes", cancel: "no", callback: type => {
                    if ( type == "cancel" ) return;
                    setTimeout( () => {
                        Highlight().done( dom => {
                            const rerender = element => {
                                load_count++;
                                storage.pr.TempMode( "read", element );
                                Render();
                            };
                            storage.current.highlight ? 
                                highlight.Control( dom ).done( newDom => {
                                    rerender( newDom );
                                }) : rerender( dom );
                        });
                    }, 200 );
                }});
            } else if ( load_count >= 2 ) {
                this.componentWillUnmount();
                new Notify().Render({ content: "The highlight still cannot adapt to this page, whether to submit？", action: "yes", cancel: "no", callback: type => {
                    if ( type == "cancel" ) return;
                    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_site, { url: location.href, site: {}, uid: storage.user.uid, type: "failed" }));
                }});
                load_count = 0;
            }
            return false;
        } else {
            return true;
        }
    }

    componentWillMount() {
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
        if ( storage.current.fap ) {
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/solid.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/brands.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" />' );
        }
    }

    async componentDidMount() {
        if ( load_count > 0 && !this.verifyContent() ) {
            return;
        }

        $root
            .addClass( "simpread-font" )
            .addClass( theme )
            .find( rdclsjq )
                .addClass( theme )
                .sreffect( { opacity: 1 }, { delay: 100 })
                .addClass( "simpread-read-root-show" );

        this.props.read.fontfamily && ss.FontFamily( this.props.read.fontfamily );
        this.props.read.fontsize   && ss.FontSize( this.props.read.fontsize );
        this.props.read.layout     && ss.Layout( this.props.read.layout );
        this.props.read.site.css   && this.props.read.site.css.length > 0
            && ss.SiteCSS( this.props.read.site.css );
        ss.Preview( this.props.read.custom );

        storage.pr.state == "txt"             && !location.href.endsWith( ".md" ) && $( "sr-rd-content" ).css({ "word-wrap": "break-word", "white-space": "pre-wrap" });
        $( "sr-rd-desc" ).text().trim() == "" && $( "sr-rd-desc" ).addClass( "simpread-hidden" );

        excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        storage.pr.Beautify( $( "sr-rd-content" ) );
        storage.pr.Format( rdcls );

        kbd.Render( $( "sr-rd-content" ));
        tooltip.Render( rdclsjq );
        waves.Render({ root: rdclsjq });
        storage.Statistics( "read" );
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "mode", eventAction: "readmode", eventValue: "readmode" }) );

        !this.props.wrapper.avatar && this.props.read.toc 
            && toc.Render( "sr-read", $( "sr-rd-content" ), this.props.read.theme, this.props.read.toc_hide );

        this.props.wrapper.avatar && $( ".simpread-read-root" ).addClass( "simpread-multi-root" );

        loadPlugins( "read_complete" );

        this.setState({
            html: this.props.wrapper.include,
        })

        if(storage.read.mode === READ_MODE_FAST){
            this.openFastMode()
        }else if(storage.read.mode === READ_MODE_DYSLEXIA_1 || storage.read.mode === READ_MODE_DYSLEXIA_2){
            this.openDyslexiaMode(storage.read.mode)
        }
        
        setTimeout( ()=>{
            this.verifyContent();
            tips.Render( storage.option.plugins );
            tips.Help( storage.statistics );
        }, 50 );

        // 监听更新列表
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName !== 'local') {
            return;
            }
            console.log('chrome.storage.onChanged.addListener', changes);
            if(changes && changes.simpread && changes.simpread.newValue){
                console.log('监听更新列表 showMenu ', changes.simpread.newValue.read.showMenu);
                this.setState({
                    showMenu: changes.simpread.newValue.read.showMenu
                })
            }
        });
    }

    componentWillUnmount() {
        run.Event( "read_end" );
        loadPlugins( "read_end" );
        ss.FontSize( "" );
        $root.removeClass( theme )
             .removeClass( "simpread-font" );
        $root.attr("style") && $root.attr( "style", $root.attr("style").replace( "font-size: 62.5%!important", "" ));
        ss.SiteCSS();
        $( "body" ).removeClass( "simpread-hidden" );
        $( rdclsjq ).remove();
        tooltip.Exit( rdclsjq );
    }

    /**
     * Controlbar action event
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     * @param {string} custom value, storage.current.custom.art.xxx 
     */
    onAction( type, value, custom ) {
        switch ( type ) {
            case "exit":
                this.exit();
                break;
            case "setting":
                setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                break;
            case "siteeditor":
                $( "panel-bg" ).length > 0 && $( "panel-bg" )[0].click();
                setTimeout( ()=>se.Render(), 500 );
                break;
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
            case "shortcuts":
            case "custom":
                type != "custom" ? storage.current[type]=value : storage.current.custom.art[custom]=value;
                storage.Setcur( storage.current.mode );
                break;
            case "remove":
                $( "panel-bg" ).length > 0 && $( "panel-bg" ).trigger( "click" );
                new Notify().Render({ content: "Move the mouse to select the content you don't want to display, you can select multiple times, use ESC to exit", delay: 5000 });
                highlight.Multi( dom => {
                    const path = storage.pr.Utils().dom2Xpath( dom ),
                          site = { ...storage.pr.current.site };
                    site.exclude.push( `[[\`${path}\`]]` );
                    if ( storage.pr.state == "temp" ) {
                        const include = storage.pr.Utils().dom2Xpath( storage.pr.dom );
                        site.include  = `[[\`${include}\`]]`;
                        site.name     = site.name.replace( "tempread::", "" );
                    }
                    storage.pr.Updatesite( 'local', storage.current.url, [ site.url, storage.pr.Cleansite(site) ]);
                    storage.Writesite( storage.pr.sites, () => {
                        storage.pr.current.site.name    = site.name;
                        storage.pr.current.site.include = site.include;
                    });
                    $(dom).remove();
                });
                break;
            case "highlight":
                new Notify().Render( `Move the mouse to select the highlighted area to generate the reading mode, which will be invalid after the page is refreshed` );
                this.exit();
                Highlight().done( dom => {
                    const rerender = element => {
                        storage.pr.TempMode( "read", element );
                        Render();
                    };
                    storage.current.highlight ? 
                        highlight.Control( dom ).done( newDom => {
                            rerender( newDom );
                        }) : rerender( dom );
                });
                break;
            case "updateFontfamily":
                this.updateFontfamily()
                break;
            case "fastMode":
                if(storage.read.mode === READ_MODE_FAST){
                    this.closeFastMode()
                    // 更新设置
                    storage.read.mode = READ_MODE_GENERAL
                }else{
                    // 退出fast模式
                    this.openFastMode()
                    // 更新设置
                    storage.read.mode = READ_MODE_FAST
                }
                storage.Write( ()=> {})
                break;
                
            case READ_MODE_DYSLEXIA_1:
            case READ_MODE_DYSLEXIA_2:
                if(storage.read.mode === READ_MODE_DYSLEXIA_1 || storage.read.mode === READ_MODE_DYSLEXIA_2){
                    // 退出fast模式
                    this.openDyslexiaMode(type)
                    // 更新设置
                    storage.read.mode = type
                }else{
                    this.closeDyslexiaMode()
                    // 更新设置
                    storage.read.mode = READ_MODE_GENERAL
                }
                storage.Write( ()=> {})
                break;

            case "exportPNG":
                this.exportPNG()
                break;
            case "exportPDF":
                this.exportPDF()
                break;
            /*
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            */
        }
    }

    openFastMode(){
        new Notify().Render( "enter fast mode" );
        const element = document.createElement("div");
        element.innerHTML = this.props.wrapper.include
        let element2 = applyGradient(
            ['#0000ff', '#ff0000'], "#000000", "50", element
        );
        element2.style.fontFamily = storage.read.fontfamily
        this.setState({
            html: element2.outerHTML,
        })
    }

    closeFastMode(){
        new Notify().Render( "quit fast mode" );
        this.resetArticle()
    }

    openDyslexiaMode(mode){
        //new Notify().Render( "enter dyslexia mode");
        const element = document.createElement("div");
        element.innerHTML = this.props.wrapper.include
        let settingsStr = "{}"
        if(mode === READ_MODE_DYSLEXIA_1){
            new Notify().Render( "enter dyslexia A mode");
            settingsStr = '{"fontFamily":"OpenDyslexic","fontSize":"inherit","language":"en","letterSpacing":"inherit","letters":[{"active":true,"bold":false,"color":"#a3cce9","key":"1","value":"b"},{"active":true,"bold":false,"color":"#5fa2ce","key":"2","value":"d"},{"active":true,"bold":false,"color":"#fc7d0b","key":"3","value":"p"},{"active":true,"bold":false,"color":"#ffbc79","key":"4","value":"q"},{"active":false,"bold":false,"key":"5","value":"k"},{"active":false,"bold":false,"key":"6","value":"c"},{"active":true,"bold":false,"color":"#b07aa1","key":"7","value":"n"},{"active":true,"bold":false,"color":"#76b7b2","key":"8","value":"m"},{"active":false,"bold":false,"key":"9","value":"v"},{"active":false,"bold":false,"key":"10","value":"s"},{"active":false,"bold":false,"key":"11","value":"z"},{"active":false,"bold":false,"key":"12","value":"a"},{"active":false,"bold":false,"key":"13","value":"e"},{"active":false,"bold":false,"key":"14","value":"f"},{"active":false,"bold":false,"key":"15","value":"g"},{"active":false,"bold":false,"key":"16","value":"h"},{"active":false,"bold":false,"key":"17","value":"i"},{"active":false,"bold":false,"key":"18","value":"j"},{"active":true,"bold":false,"color":"#ff9da7","key":"19","value":"u"},{"active":false,"bold":false,"key":"20","value":"l"},{"active":false,"bold":false,"key":"21","value":"o"},{"active":false,"bold":false,"key":"22","value":"r"},{"active":false,"bold":false,"key":"23","value":"t"},{"active":true,"bold":false,"color":"#59a14f","key":"24","value":"w"},{"active":false,"bold":false,"key":"25","value":"x"},{"active":false,"bold":false,"key":"26","value":"y"}],"lettersActive":true,"lineSpacing":"2.1","phonemes":[{"active":false,"bold":false,"key":"7","value":"b"},{"active":false,"bold":false,"key":"8","value":"ch"},{"active":false,"bold":false,"key":"9","value":"d"},{"active":false,"bold":false,"key":"10","value":"dh"},{"active":false,"bold":false,"key":"12","value":"er"},{"active":false,"bold":false,"key":"13","value":"ey"},{"active":false,"bold":false,"key":"14","value":"f"},{"active":false,"bold":false,"key":"15","value":"g"},{"active":false,"bold":false,"key":"17","value":"ih"},{"active":false,"bold":false,"key":"18","value":"iy"},{"active":false,"bold":false,"key":"19","value":"jh"},{"active":false,"bold":false,"key":"20","value":"k"},{"active":false,"bold":false,"key":"21","value":"l"},{"active":false,"bold":false,"key":"22","value":"m"},{"active":false,"bold":false,"key":"23","value":"n"},{"active":false,"bold":false,"key":"24","value":"ng"},{"active":false,"bold":false,"key":"27","value":"p"},{"active":false,"bold":false,"key":"28","value":"r"},{"active":false,"bold":false,"key":"29","value":"s"},{"active":false,"bold":false,"key":"30","value":"sh"},{"active":false,"bold":false,"key":"31","value":"t"},{"active":false,"bold":false,"key":"32","value":"th"},{"active":false,"bold":false,"key":"35","value":"v"},{"active":false,"bold":false,"key":"36","value":"w"},{"active":false,"bold":false,"key":"37","value":"y"},{"active":false,"bold":false,"key":"38","value":"z"},{"active":false,"bold":false,"key":"39","value":"zh"},{"active":false,"bold":false,"key":"1","value":"aa"},{"active":false,"bold":false,"key":"2","value":"ae"},{"active":false,"bold":false,"key":"3","value":"ah"},{"active":false,"bold":false,"key":"4","value":"ao"},{"active":false,"bold":false,"key":"5","value":"aw"},{"active":false,"bold":false,"key":"6","value":"ay"},{"active":false,"bold":false,"key":"11","value":"eh"},{"active":false,"bold":false,"key":"16","value":"hh"},{"active":false,"bold":false,"key":"25","value":"ow"},{"active":false,"bold":false,"key":"26","value":"oy"},{"active":false,"bold":false,"key":"33","value":"uh"},{"active":false,"bold":false,"key":"34","value":"uw"}],"phonemesActive":true,"shadeAlternateLinesActive":true,"shadeAlternateLinesOpacity":"66","silentLetterActive":true,"silentLetterOpacity":"0.5","syllableActive":false,"syllableOpacity":"33","wordSpacing":"inherit"}';
        }else if(mode === READ_MODE_DYSLEXIA_2){
            new Notify().Render( "enter dyslexia B mode");
            settingsStr = '{"fontFamily":"inherit","fontSize":"inherit","language":"en","letterSpacing":"inherit","letters":[{"active":false,"bold":false,"key":"1","value":"b"},{"active":false,"bold":false,"key":"2","value":"d"},{"active":false,"bold":false,"key":"3","value":"p"},{"active":false,"bold":false,"key":"4","value":"q"},{"active":false,"bold":false,"key":"5","value":"k"},{"active":false,"bold":false,"key":"6","value":"c"},{"active":false,"bold":false,"key":"7","value":"n"},{"active":false,"bold":false,"key":"8","value":"m"},{"active":false,"bold":false,"key":"9","value":"v"},{"active":false,"bold":false,"key":"10","value":"s"},{"active":false,"bold":false,"key":"11","value":"z"},{"active":false,"bold":false,"key":"12","value":"a"},{"active":false,"bold":false,"key":"13","value":"e"},{"active":false,"bold":false,"key":"14","value":"f"},{"active":false,"bold":false,"key":"15","value":"g"},{"active":false,"bold":false,"key":"16","value":"h"},{"active":false,"bold":false,"key":"17","value":"i"},{"active":false,"bold":false,"key":"18","value":"j"},{"active":false,"bold":false,"key":"19","value":"u"},{"active":false,"bold":false,"key":"20","value":"l"},{"active":false,"bold":false,"key":"21","value":"o"},{"active":false,"bold":false,"key":"22","value":"r"},{"active":false,"bold":false,"key":"23","value":"t"},{"active":false,"bold":false,"key":"24","value":"w"},{"active":false,"bold":false,"key":"25","value":"x"},{"active":false,"bold":false,"key":"26","value":"y"}],"lettersActive":true,"lineSpacing":"inherit","phonemes":[{"active":false,"bold":false,"key":"7","value":"b"},{"active":false,"bold":false,"key":"8","value":"ch"},{"active":false,"bold":false,"key":"9","value":"d"},{"active":false,"bold":false,"key":"10","value":"dh"},{"active":false,"bold":false,"key":"12","value":"er"},{"active":false,"bold":false,"key":"13","value":"ey"},{"active":false,"bold":false,"key":"14","value":"f"},{"active":false,"bold":false,"key":"15","value":"g"},{"active":false,"bold":false,"key":"17","value":"ih"},{"active":false,"bold":false,"key":"18","value":"iy"},{"active":false,"bold":false,"key":"19","value":"jh"},{"active":false,"bold":false,"key":"20","value":"k"},{"active":false,"bold":false,"key":"21","value":"l"},{"active":false,"bold":false,"key":"22","value":"m"},{"active":false,"bold":false,"key":"23","value":"n"},{"active":false,"bold":false,"key":"24","value":"ng"},{"active":false,"bold":false,"key":"27","value":"p"},{"active":false,"bold":false,"key":"28","value":"r"},{"active":false,"bold":false,"key":"29","value":"s"},{"active":false,"bold":false,"key":"30","value":"sh"},{"active":false,"bold":false,"key":"31","value":"t"},{"active":false,"bold":false,"key":"32","value":"th"},{"active":false,"bold":false,"key":"35","value":"v"},{"active":false,"bold":false,"key":"36","value":"w"},{"active":false,"bold":false,"key":"37","value":"y"},{"active":false,"bold":false,"key":"38","value":"z"},{"active":false,"bold":false,"key":"39","value":"zh"},{"active":false,"bold":false,"key":"1","value":"aa"},{"active":false,"bold":false,"key":"2","value":"ae"},{"active":false,"bold":false,"key":"3","value":"ah"},{"active":false,"bold":false,"key":"4","value":"ao"},{"active":false,"bold":false,"key":"5","value":"aw"},{"active":false,"bold":false,"key":"6","value":"ay"},{"active":false,"bold":false,"key":"11","value":"eh"},{"active":false,"bold":false,"key":"16","value":"hh"},{"active":false,"bold":false,"key":"25","value":"ow"},{"active":false,"bold":false,"key":"26","value":"oy"},{"active":false,"bold":false,"key":"33","value":"uh"},{"active":false,"bold":false,"key":"34","value":"uw"}],"phonemesActive":true,"shadeAlternateLinesActive":false,"shadeAlternateLinesOpacity":"33","silentLetterActive":true,"silentLetterOpacity":"0.5","syllableActive":true,"syllableColor1":"#fc7d0b","syllableColor2":"#a3cce9","syllableOpacity":"66","wordSpacing":"inherit"}'
        }
        settingsStr = '{"language":"en","fontFamily":"OpenDyslexic","fontSize":"inherit","letterSpacing":"inherit","wordSpacing":"inherit","lineSpacing":"inherit","syllableActive":true,"syllableOpacity":"66","silentLetterActive":true,"silentLetterOpacity":"0.5","shadeAlternateLinesActive":false,"shadeAlternateLinesOpacity":"33","phonemesActive":true,"phonemes":[{"key":"7","value":"b","active":false,"bold":false},{"key":"8","value":"ch","active":false,"bold":false},{"key":"9","value":"d","active":false,"bold":false},{"key":"10","value":"dh","active":false,"bold":false},{"key":"12","value":"er","active":false,"bold":false},{"key":"13","value":"ey","active":false,"bold":false},{"key":"14","value":"f","active":false,"bold":false},{"key":"15","value":"g","active":false,"bold":false},{"key":"17","value":"ih","active":false,"bold":false},{"key":"18","value":"iy","active":false,"bold":false},{"key":"19","value":"jh","active":false,"bold":false},{"key":"20","value":"k","active":false,"bold":false},{"key":"21","value":"l","active":false,"bold":false},{"key":"22","value":"m","active":false,"bold":false},{"key":"23","value":"n","active":false,"bold":false},{"key":"24","value":"ng","active":false,"bold":false},{"key":"27","value":"p","active":false,"bold":false},{"key":"28","value":"r","active":false,"bold":false},{"key":"29","value":"s","active":false,"bold":false},{"key":"30","value":"sh","active":false,"bold":false},{"key":"31","value":"t","active":false,"bold":false},{"key":"32","value":"th","active":false,"bold":false},{"key":"35","value":"v","active":false,"bold":false},{"key":"36","value":"w","active":false,"bold":false},{"key":"37","value":"y","active":false,"bold":false},{"key":"38","value":"z","active":false,"bold":false},{"key":"39","value":"zh","active":false,"bold":false},{"key":"1","value":"aa","active":false,"bold":false},{"key":"2","value":"ae","active":false,"bold":false},{"key":"3","value":"ah","active":false,"bold":false},{"key":"4","value":"ao","active":false,"bold":false},{"key":"5","value":"aw","active":false,"bold":false},{"key":"6","value":"ay","active":false,"bold":false},{"key":"11","value":"eh","active":false,"bold":false},{"key":"16","value":"hh","active":false,"bold":false},{"key":"25","value":"ow","active":false,"bold":false},{"key":"26","value":"oy","active":false,"bold":false},{"key":"33","value":"uh","active":false,"bold":false},{"key":"34","value":"uw","active":false,"bold":false}],"lettersActive":true,"letters":[{"key":"1","value":"b","active":false,"bold":false},{"key":"2","value":"d","active":false,"bold":false},{"key":"3","value":"p","active":false,"bold":false},{"key":"4","value":"q","active":false,"bold":false},{"key":"5","value":"k","active":false,"bold":false},{"key":"6","value":"c","active":false,"bold":false},{"key":"7","value":"n","active":false,"bold":false},{"key":"8","value":"m","active":false,"bold":false},{"key":"9","value":"v","active":false,"bold":false},{"key":"10","value":"s","active":false,"bold":false},{"key":"11","value":"z","active":false,"bold":false},{"key":"12","value":"a","active":false,"bold":false},{"key":"13","value":"e","active":false,"bold":false},{"key":"14","value":"f","active":false,"bold":false},{"key":"15","value":"g","active":false,"bold":false},{"key":"16","value":"h","active":false,"bold":false},{"key":"17","value":"i","active":false,"bold":false},{"key":"18","value":"j","active":false,"bold":false},{"key":"19","value":"u","active":false,"bold":false},{"key":"20","value":"l","active":false,"bold":false},{"key":"21","value":"o","active":false,"bold":false},{"key":"22","value":"r","active":false,"bold":false},{"key":"23","value":"t","active":false,"bold":false},{"key":"24","value":"w","active":false,"bold":false},{"key":"25","value":"x","active":false,"bold":false},{"key":"26","value":"y","active":false,"bold":false}],"syllableColor1":"#fc7d0b","syllableColor2":"#a3cce9"}';
        var settings = JSON.parse(settingsStr)   
        settings.fontFamily = storage.read.fontfamily      
        visualEngine.adaptHtmlElement(element, settings, 'chrome')
        this.setState({
            html: element.outerHTML,
        })

    }

    closeDyslexiaMode(){
        new Notify().Render( "quit dyslexia mode" );
        this.resetArticle()
    }


    updateFontfamily(){
        if(storage.read.fontfamily === FONT_FAMILY_DYSLEXIC){
            new Notify().Render("activate dyslexia fontfamily");
        }else{
            new Notify().Render("cancel dyslexia fontfamily");
        }
        ss.FontFamily(storage.read.fontfamily)
        if(storage.read.mode === READ_MODE_DYSLEXIA_1 
            || storage.read.mode === READ_MODE_DYSLEXIA_2){
                this.openDyslexiaMode(storage.read.mode)
                return;
        }
        if(storage.read.mode === READ_MODE_FAST){
            this.openFastMode()
            return;
        }
        this.resetArticle()
    }

    resetArticle(){
        ss.FontFamily(storage.read.fontfamily)
        const element = document.createElement("div");
        element.innerHTML = this.props.wrapper.include
        element.style.fontFamily = storage.read.fontfamily
        this.setState({
            html: element.outerHTML,
        })
    }

    async exportPNG(){
        this.setState({
            showMenu: false
        })
        new Notify().Render({content:"begin export PNG",delay: 2000});
        setTimeout(function() { 
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.screenshot, {exportType: EXPORT_TYPE_IMG}) );
        }, 2000);
    }

    async exportPDF(){
        this.setState({
            showMenu: false
        })
        new Notify().Render({content:"begin export PDF",delay: 2000});
        setTimeout(function() { 
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.screenshot, {exportType: EXPORT_TYPE_PDF}) );
        }, 2000);
    }

    // exit read mode
    exit() {
        Exit();
    }

    render() {
        const Article = this.props.wrapper.avatar && this.props.wrapper.avatar.length > 0 ? 
                        <spec.Multiple include={ this.state.html } avatar={ this.props.wrapper.avatar } /> :
                        <sr-rd-content dangerouslySetInnerHTML={{__html: this.state.html }} ></sr-rd-content>;

        const Page    = this.props.wrapper.paging && this.props.wrapper.paging.length > 0 && 
                        <spec.Paging paging={ this.props.wrapper.paging } />;
        return (
            <sr-read id="readBox">
                <ProgressBar show={ this.props.read.progress } />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                { Article }
                { Page    }
                <Footer />
                <ReadCtlbar show={ this.state.showMenu} 
                            multi={ this.props.wrapper.avatar ? true : false }
                            type={ this.props.wrapper.name }
                            site={{ title: this.props.wrapper.title, url: window.location.href }} 
                            custom={ this.props.read.custom } onAction={ (t,v,c)=>this.onAction( t,v,c ) }/>
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 * @param {boolean} true: call mathJaxMode(); false: @see mathJaxMode
 */
function Render( callMathjax = true ) {
    loadPlugins( "read_start" );
    callMathjax && mathJaxMode();
    storage.pr.ReadMode();
    if ( typeof storage.pr.html.include == "string" && storage.pr.html.include.startsWith( "<sr-rd-content-error>" ) ) {
        console.warn( '=== Adapter failed call Readability View ===' )
        storage.pr.Readability();
        storage.pr.ReadMode();
    } else console.warn( '=== Normal Read mode ===' )
    console.warn( "=== Current PuRead object is ===", storage.pr )
    ReactDOM.render( <Read read={ storage.current } wrapper={ storage.pr.html } />, getReadRoot() );
}

/**
 * High light current page to read mode( read only )
 */
function Highlight() {
    const dtd = $.Deferred();
    highlight.Start().done( dom => {
        dtd.resolve( dom );
    });
    return dtd;
}

/**
 * Verify simpread-read-root tag exit
 * 
 * @param  {boolean}
 * @return {boolean}
 */
function Exist( action ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        action && setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
        return true;
    } else {
        return false;
    }
}

/**
 * Exit
 */
function Exit() {
    $( rdclsjq ).sreffect( { opacity: 0 }, {
        delay: 100,
        complete: ( elements ) => {
            ReactDOM.unmountComponentAtNode( getReadRoot() );
        }
    }).addClass( "simpread-read-root-hide" );
}

/**
 * MathJax Mode
 */
function mathJaxMode() {
    if ( storage.pr.isMathJax() && storage.pr.state == "temp" ) {
        console.warn( '=== MathJax Mode ===' )
        const dom = storage.pr.MathJaxMode();
        console.log( 'current get dom is ', dom )
        if ( typeof dom == "undefined" ) {
            new Notify().Render( "IntelliSense failed, please move the mouse to select" );
            Highlight().done( dom => {
                const rerender = element => {
                    storage.pr.TempMode( "read", element );
                    Render( false );
                };
                storage.current.highlight ? 
                    highlight.Control( dom ).done( newDom => {
                        rerender( newDom );
                    }) : rerender( dom );
            });
        } else if ( typeof dom == "string" ) {
            const html = storage.pr.GetDom( dom, "html" );
            storage.pr.Newsite( "read", html );
        } else {
            storage.pr.TempMode( "read", dom[0] );
        }
    }
}

/**
 * Get read root
 * 
 * @return {jquery} read root jquery object
 */
function getReadRoot() {
    if ( $root.find( rdclsjq ).length == 0 ) {
        $root.append( bgtmpl );
    }
    return $( rdclsjq )[0];
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
function excludes( $target, exclude ) {
    const tags = storage.pr.Exclude( $target );
    $target.find( tags ).remove();
}

/**
 * Load plugins from storage and exec
 * 
 * @param {string} state include: plugin.run_at
 */
function loadPlugins( state ) {
    storage.Plugins( () => {
        storage.option.plugins.forEach( id => {
            storage.plugins[id] && run.Exec( state, storage.current.site.name, storage.plugins[id] );
        });
    });
}

export { Render, Exist, Exit, Highlight };
