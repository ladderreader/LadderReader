console.log( "===== simpread option welcome page load =====" )

import 'carous_css';
import 'carousel';

import Button   from 'button';

import * as ss  from 'stylesheet';
import {br}     from 'browser';
import * as msg from 'message';

const welcbgcls   = "welcome",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;
let   curidx, max = [ 0, 0 ];

const style = {

    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'relative',

        minWidth: '400px',
        minHeight: '400px',

        width: '650px',
        height: '600px',

        backgroundColor: '#fff',

        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, .247059) 0px 14px 45px',

        userSelect: 'none',
    },

    section: {
        textAlign: 'center',
    },

    h2: {
        marginBottom: 0,

        color: 'inherit',

        fontSize: '24px',
        fontWeight: 'bold',

        lineHeight: '32px',
        textAlign: 'center',
    },

    desc: {
        padding: '5px',

        color: 'rgba(51, 51, 51, 0.7)',

        fontSize: '15px',
        fontWeight: 400,

        lineHeight: '32px',
        textAlign: 'center',
    },

    img: {
        width: '100%',
        marginTop: '-82px',
    },

    gif : {
        paddingTop: '58px',
        width: '550px',
    },

    strong: {
        fontWeight: 'normal',
        color: '#3f51b5',
    },

    footer: {
        display: 'flex',
        flexDirection: 'row',

        marginBottom: '24px',
    },

    close: {
        position: 'absolute',

        top: 0,
        right: 0,
    },

}

class Welcome extends React.Component {

    state = {
        style: { display: "none" },
        state: "next_icon",
    }

    prevClick() {
        $( '.carousel.carousel-slider' ).carousel( "prev" );
    }

    nextClick() {
        if ( curidx != max ) {
            $( '.carousel.carousel-slider' ).carousel( "next" );
        } else this.closeClick();
    }

    closeClick() {
        window.dispatchEvent( new CustomEvent( msg.MESSAGE_ACTION.welcome_close, { detail: { first: this.props.first, version: this.props.version }}));
        exit();
    }

    carousel() {
        $( ".carousel-item" ).map( ( _, item ) => {
            const $item = $(item),
                  version = $item.attr( "id" );
            version != "end" && version != "start" && version != this.props.version && $item.remove();
        });
    }

    componentDidMount() {
        !this.props.first && this.carousel();
        max = $( ".carousel-item" ).length - 1;
        $( '.carousel.carousel-slider' ).carousel({
            fullWidth: true,
            onCycleTo: idx => {
                curidx = idx;
                if ( curidx == max ) {
                    this.setState({
                        style: { display: "block" },
                        state: "right_icon",
                    });
                } else if ( curidx == 0 ) {
                    this.setState({
                        style: { display: "none" },
                        state: "next_icon",
                    });
                } else {
                    this.state.style.display != "block" && this.setState({ style: { display: "block" } });
                    this.state.state != "next_icon"     && this.setState({ state: "next_icon" });
                }
            }
        });
    }

    componentWillUnmount() {
        $( welcbgclsjq ).remove();
    }

    render() {
        const { first, version } = this.props;
        return (
            <welcome style={ style.root }>
                <div className="carousel carousel-slider" data-indicators="true">

                    <div className="carousel-item chrome" id="start">
                        <section style={ style.section }>
                        <img src={ ss.IconPath( "welcome" )} style={ style.img }/>
                            <h2 style={{ ...style.h2, ...{ 'margin-bottom': 0 } }}>{ this.props.first ? "???????????? ??????": "?????? ??????????????????" }</h2>
                            <div style={ style.desc }>
                                { br.isFirefox() ? "Chrome ??????????????? 99% ???reading mode???????????? Firefox" : "???????????????????????????????????? Chrome ??????????????? Safari ???reading mode" }<br/>
                                ??????????????????????????????????????????<strong style={ style.strong }>?????????</strong>???????????????<strong style={ style.strong }>?????????</strong>??????<br/>
                                ???????????? <strong style={ style.strong }>????????????</strong> ???reading mode?????????????????? <strong style={ style.strong }><a target="_blank" href="https://simpread.ksria.cn/sites/">???????????????</a></strong> ?????????
                            </div>
                        </section>
                    </div>

                    { first &&
                        <div className="carousel-item">
                            <section style={ style.section }>
                                <img src={ ss.IconPath( "welcome-mode" )} style={ style.img }/>
                                <h2 style={ style.h2 }>reading mode ??? focus mode</h2>
                                <div style={ style.desc }>
                                    reading mode ??? <strong>????????????</strong>????????????????????????????????????????????????????????????????????????<br/>
                                    ?????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????">????????????</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????reading mode">??????????????????</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????????????????">??????????????????</a>
                                    ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????????????????">??????????????? / ??????</a><br/>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/focus mode">focus mode</a> ??? ??????????????????????????????????????????????????????????????????<br/>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.1" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.1">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-adapter.png" style={ style.img }/>
                                <h2 style={ style.h2 }>??????????????????????????????</h2>
                                <div style={ style.desc }>
                                    ????????? <b>??????????????????</b><sup>2.0</sup>???????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/TXT-?????????">TXT</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=markdown-??????">Markdown</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=latex-??????">LaTeX</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=??????????????????">?????????</a><br/>
                                    Wordpress ?? Hexo ?? Ghost ?? Discuz ????????? / ?????????????????????<br/>
                                    ????????????????????????????????????????????????????????????????????????reading mode????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????????????????">????????????</a>
                                </div>
                            </section>
                        </div> }

                    { first &&
                        <div className="carousel-item" id="1.0.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-service-v2.png?201806111215" style={ style.img }/>
                                <h2 style={ style.h2 }>???????????????????????????</h2>
                                <div style={ style.desc }>
                                    ???????????? HTML ?? PDF ?? Markdown ?? PNG ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/?????????-Epub">Epub</a> ????????? ?????? ????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/?????????-Kindle">Kindle</a><br/>
                                    ??????????????? ????????? ?? ??????????????? ?? ???????????? ?? ?????? ?? ???????????? ?? Dropbox ?? Onenote ?? Notion ???<br/>
                                    ????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/?????????">?????????</a> ?? Pocket ?? Instapaper ?? Linnk????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????????????????">????????????</a>
                                </div>
                            </section>
                        </div> }

                    { first &&
                        <div className="carousel-item" id="1.1.0">
                            <section style={ style.section }>
                                <img src={ ss.IconPath( "welcome-custom" )} style={ style.img }/>
                                <h2 style={ style.h2 }>??????????????? ?? ??????????????? ?? ???????????????</h2>
                                <div style={ style.desc }>
                                    ?????????????????????????????????????????????????????????????????? <a href="http://ksria.com/simpread/docs/#/???????????????" target="_blank">???????????????</a><br/>
                                    ?????????????????????????????? <a href="http://ksria.com/simpread/docs/#/???????????????" target="_blank">???????????????</a><br/>
                                    ????????? <a href="http://ksria.com/simpread/docs/#/???????????????" target="_blank">???????????????</a>????????????????????????????????????
                                </div>
                            </section>
                        </div> }

                    { !first && version == "1.1.1" && 
                        <div className="carousel-item" id="1.1.1">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-fap.png" style={ style.img }/>
                                <h2 style={ style.h2 }>????????????????????????</h2>
                                <div style={ style.desc }>
                                    ????????????????????????????????????????????????????????????????????????<br/>
                                    ???????????????????????????????????????????????????????????????<br/>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.2" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.2">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-plugins.png" style={ style.img }/>
                                <h2 style={ style.h2 }>????????????</h2>
                                <div style={ style.desc }>
                                    <a target="_blank" href="https://simpread.ksria.cn/plugins/details/kw36BtjGu0">????????????</a> ?? <a target="_blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">???????????????</a> ?? <a target="_blank" href="https://simpread.ksria.cn/plugins/details/VQOZdNET2d">?????????????????????Lightbox???</a> ?? <a target="_blank" href="https://simpread.ksria.cn/plugins/details/ohnTKVHz4a">????????????</a> ??????????????? <br/>
                                    ?????? JavaScript ???????????????????????????????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????">????????????</a><br/>
                                    ???????????????????????????????????? ??? <a target="_blank" href="https://simpread.ksria.cn/plugins/">????????????</a>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.2" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.2">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-sites.png" style={ style.img }/>
                                <h2 style={ style.h2 }>????????????</h2>
                                <div style={ style.desc }>
                                    ??????????????????????????????????????????????????????????????????<br/>
                                    ???????????????????????????????????????????????????????????????????????????????????????????????????<br/>
                                    ??????????????? <a target="_blank" href="https://simpread.ksria.cn/sites/">????????????</a> ?????????????????????????????????????????????
                                </div>
                            </section>
                        </div> }

                    { !first &&
                            <div className="carousel-item" id="5005">
                                <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-puread-ii.png" style={ style.img }/>
                                    <h2 style={ style.h2 }>?????????????????? 2.0</h2>
                                    <div style={ style.desc }>
                                        ??????????????????????????????Markdown / LaTeX / ????????? ???????????????<br/>
                                        ??????????????????????????????????????????????????????????????????????????? PC ????????????<br/>
                                        ?????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????????????????">??????????????????</a>
                                    </div>
                                </section>
                            </div> }

                    { !first && version == "1.1.3" &&
                        <div className="carousel-item" id="1.1.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-newservice.png?201906301335" style={ style.img }/>
                                <h2 style={ style.h2 }>??????????????????????????????????????? WebDAV</h2>
                                <div style={ style.desc }>
                                    ??????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????????????????">??????</a> ??? <a target="_blank" href="http://ksria.com/simpread/docs/#/?????????">?????????</a> ???????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????????????????">????????????</a> ???????????????<br/>
                                    ????????????????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????">?????????</a> ???<br/>
                                    ?????????????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV">WebDAV</a> ??????????????????????????????????????????
                                </div>
                            </section>
                        </div> }

                    { !first && version == "1.1.4" &&
                        <div className="carousel-item" id="1.1.4">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-newservice-ii.png?202001181335" style={ style.img }/>
                                <h2 style={ style.h2 }>????????????????????????????????????</h2>
                                <div style={ style.desc }>
                                    ??????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/Notion">Notion</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????">???????????????</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????">????????????</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/URLSCHEME">Bear</a> ?? <a target="_blank" href="http://ksria.com/simpread/docs/#/URLSCHEME">Ulysses</a> ??????~<br/>
                                    ????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????HTML">?????? HTML / Markdown</a> ?????????????????????????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/??????">??????</a> ??????<br/>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV?id=??????">WebDAV</a> ???????????????????????????????????? <span>Markdown</span> ?? <span>HTML</span>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.3" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-notice.png?20190630" style={ style.img }/>
                                <h2 style={ style.h2 }>???????????? ?? ???????????? ?? ????????????</h2>
                                <div style={ style.desc }>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????">????????????</a> ?????????????????????<br/>
                                    ?????????????????????????????????????????????????????????????????????????????? <a target="_blank" href="http://ksria.com/simpread/docs/#/????????????">????????????</a><br/>
                                    ??????????????????????????????<a target="_blank" href="http://ksria.com/simpread/guide">????????????</a> ???????????????????????????
                                </div>
                            </section>
                        </div> }

                    <div className="carousel-item" id="end">
                        <section style={ style.section }>
                        <img src={ ss.IconPath( "welcome-others" )} style={ style.img }/>
                            <h2 style={ style.h2 }>???????????? ???????????????</h2>
                            { !first && version == "5005" && <div style={ style.desc }>
                                ?????????????????????????????? ???????????? / ???????????? / ???????????????<br/>
                                ?????????????????? <a target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.2.5005.html">????????????</a>
                            </div> }
                            { !first && version == "1.1.3" && <div style={ style.desc }>
                                <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=???????????????">?????????</a> <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=????????????">????????????</a> <a target="_blank" href="http://ksria.com/simpread/docs/#/???????????????????id=????????????">????????????</a> ??? <a target="_blank" href="http://ksria.com/simpread/docs/#/?????????????id=????????????">????????????????????????</a> ??????????????????<br/>
                                ?????????????????? <a target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.3.html">????????????</a>
                            </div> }
                        </section>
                    </div>
                </div>
                <footer style={ style.footer }>
                    <Button style={ this.state.style }
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#C8E6C9"
                        icon={ ss.IconPath( "prev_icon" ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.prevClick() } />
                    <Button
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#4CAF50"
                        icon={ ss.IconPath( this.state.state ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.nextClick() } />
                </footer>
                <div style={ style.close }>
                    <Button
                        shape="circle" width="36px"
                        color="#fff" backgroundColor="transparent" hoverColor="transparent"
                        icon={ ss.IconPath( "close_icon" ) }
                        onClick={ ()=>this.closeClick() } />
                </div>
            </welcome>
        )
    }
}

/**
 * Exit
 */
function exit() {
    $( welcbgclsjq ).velocity({ opacity: 0 }, { complete: () => {
        ReactDOM.unmountComponentAtNode( $(welcbgclsjq)[0] );
    }});
}

/**
 * Welcome Render
 * 
 * @param {string} root name
 * @param {boolean} true: first load
 * @param {string} version
 */
export function Render( root, first, version ) {
    const $root = $( root );
    if ( $root.find( "." + welcbgcls ).length == 0 ) {
        $root.append( welcbg );
    }
    ReactDOM.render( <Welcome first={ first } version={ version } />, $( welcbgclsjq )[0] );
}