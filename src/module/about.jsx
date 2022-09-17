console.log( "===== simpread option about load =====" )

import {br,browser} from 'browser';

const style = {

    root: {
        padding: '50px 0',

        backgroundColor: '#fff',

        fontSize: '1.6rem',
        color: 'rgba(51, 51, 51, 0.87)',

        boxShadow: '0 1px 3px rgba(0, 0, 0, .12)',
    },

    title: {
        fontSize: '2rem',
        fontWeight: 800,
    },

    badges: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        margin: '1.2em 0',
    },

    img: {
        padding: '5px',
    },

    stat: {
        color: '#ff3f80',
        fontWeight: 600
    },

    href: {
        color: 'rgba(51, 51, 51, 0.87)',
    },

    link: {
        borderBottom: '1px solid #4285f4',
    },

},
urls = {

    href: {
        version: "https://github.com/Kenshin/simpread/releases",
        website: "http://ksria.com/simpread",
        githubstar: "https://github.com/Kenshin/simpread",
        changelog: "http://ksria.com/simpread/changelog.html",
        feedback: "https://github.com/kenshin/simpread/issues",
        issues: "https://github.com/kenshin/simpread/issues",
    },

    badges: {
        version: "data:image/png;base64,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",
        website: "data:image/png;base64,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",
        githubstar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAUCAMAAAAQlCuDAAACplBMVEVVVVXVVSvmcjP0gEFNTU1PT09fX1/kbzD2gUJfX1/3g0VdXV3nczT1gkJPT09NTU3kcDE5OTk7Ozs8PDw9PT0+Pj5BQUFCQkJDQ0NERERFRUVISEhJSUlMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBiYmJlZWVnZ2dra2t4eHh8fHx/f3+CgoKGhoaIiIiJiYmKioqLi4uMjIyQkJCTk5OZmZmampqenp6fn5+jUiajo6OkpKSmpqanp6eqqqqrq6usrKyuVyivWCivWCmwsLCxYDSzXCy0XC21Wyq1XCy3XCq4Xi65YTG6Zzq7Xiu9YS/BajvCwsLDYi3Dw8PEZjTEb0DExMTFxcXGxsbHZC7Hx8fIZjLKjGzPz8/QazTSqJDTqJHVbDPVk2/V1dXWazLWcjzW1tbZczzb29vcnXrcrJLc3NzdgE7d3d3e3t7f39/g4ODht6DicjXkcDHkdDfk5OTlcTLlczXlxrXl5eXmcjPmdTfml2znczTodDXoe0DpdTbpdzjpfULp6enqdjfq6urrdzjreTrrejzrhk/rmWzrzr/r1srseDnsez3sgkjs1MfteTrtfUHthU3twant1cjt7e3uejvvezzvfkDv0sLv7+/wfD3wfkDwgEPwhEnwlGHwzLjw8PDxfT7xfkDxoXXxrorx8fHyfj/y8vLzf0Dzpnz0gEH1gUL1so71v6L149n2gkP3g0T3wKL3waP37Ob37+v39/f4vZ34yK74z7n46eD4+Pj50Lr52Mf58/D60r361MD61sL61sP65tv6+vr73s/739D739H75tr759z76N376uD85dj85tr859z87OT9/f3+/fz+/f3///9Ftc+TAAAAEXRSTlMGBo2Njo6Ojo7j4+jo6Ons7CIlfBEAAAABYktHROFfCM+mAAACOUlEQVQYGZXBT0iTYQDH8e/7vs82l6ibYgYWMrE0QaE/VEKXBJMIBKVDHSLoUhSdO3axbqVEERFENwnqVpMIIoIoioIuSRCUFSFWrkzd9u7Z++udUgnhXJ+PQ9Rrp1IjrGx/kDfRzYhKiZXdoc9EROUs5awxraJyopxbRvyHgLKM+A8BZblabswohZTWcmn9UfgrYQv/MGKZoz4XBwIQy4nf8vzRPOnxlyNCrhY1HR5M3ZWumw6vvz9Cy4FjjYqfl9ybEm1Dh9ZqkQ25bdu2ttt1Tnenm9qybZNn7a6mjUlbYkSo5viZTBeC4FlxrFhH/uqGI5eDQAjB/LXG4eE5QgJiz+878f6x02e1e3xWbX1TkP5c10PIiFA8bRMfEaiauiJMJmZ2XhFCCD4lsumqn4R84Mm+7tkJfwe9HoMpZ2raB9uLT8iIUDHiqgqBhASuTAGL8BDEcp4biJAFqkY3bB14VMCPNDSesw09FtZbFhkRmut79X0dAul1/CcgUC5T+6MBQdP75J7HIpQHWqo/PGzNFr/Fsm+/dlc3Z/IQybPIiNDs6ND8y9cCaWTQv40Acan3yzQC72D0wrxLKACyfVHncn39jVPF63avHW8JIGCJ00qJZp2OjgdkEk4u79R8T0Im4fh5x8slycR9xaOUnAQ+vUNN7byZcrdPWGMWdnGvnyVOipLOLi/zMMtqTlCWESUvnsqNe6xGlGVmkoRiMUCspkg5Z002QeUs5SyYwufqWipVZGWjWf0CDsxBCuuBMAQAAAAASUVORK5CYII=",
        changelog: "data:image/png;base64,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",
    },
};

export default class About extends React.Component {

    render() {
        const href = br.isFirefox() ? "https://addons.mozilla.org/addon/simpread?src=external-ext" : "https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll/reviews";
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div style={ style.root }>
                    <image src={browser.runtime.getURL("assets/images/icon128.png")}></image>
                    <div style={ style.title }>简悦 SimpRead</div>
                    <div>为你提供「如杂志般沉浸式阅读体验」的扩展</div>
                    <div style={ style.badges }>
                        <a href={ urls.href.version      } target="_blank"><img style={ style.img } src={ urls.badges.version }/></a>
                        <a href={ urls.href.website      } target="_blank"><img style={ style.img } src={ urls.badges.website }/></a>
                        <a href={ urls.href.githubstar   } target="_blank"><img style={ style.img } src={ urls.badges.githubstar }/></a>
                        <a href={ urls.href.changelog    } target="_blank"><img style={ style.img } src={ urls.badges.changelog }/></a>
                    </div>

                    <div>
                        <a style={ style.link } href="http://ksria.com/simpread">简悦</a> 的初衷：还原一个干净的阅读空间，提升你的阅读体验。<br/>
                        截至到目前为止，简悦已经适配了 <spn style={ style.stat }>{ this.props.site }</spn> 类网址，详细请看 <a style={ style.link } href="https://simpread.ksria.cn/sites/" target="_blank">这里</a>。<br/>
                        自从 <span style={ style.stat }>{ this.props.option.create && this.props.option.create.split(" ")[0] }</span> 安装后，共使用了 <spn style={ style.stat }>{ this.props.statistics.focus }次</spn> focus mode，以及 <span style={ style.stat }>{ this.props.statistics.read }次</span> reading mode。<br/>
                        </div>
                </div>

                <div className="label" data-head-level="h1">帮助</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <div><a style={style.href} target="_blank" href="http://sr.ksria.cn/zhifu_m2.png">如果简悦可以解决你在阅读上痛点，可以请我喝杯咖啡</a></div>
                        <span className="desc">简悦是一个免费且开源的项目</span>
                        <span className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <div><a style={style.href} target="_blank" href={href}>如果简悦对你有所帮助，请帮忙投票</a></div>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="https://github.com/Kenshin/simpread">简悦是一个开源的产品，代码托管在 Github 上</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="http://ksria.com/simpread/guide/">第一次使用简悦？或者并不了解「reading mode」请前往 <b>新手入门</b></a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href}><b onClick={()=>this.props.onClick("welcome")}>重看引导页面</b> 或者 <a style={style.href} target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.4.html"><b>重看当前版本</b></a> 的功能介绍</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>

                <div className="label" data-head-level="h1">其它平台的简悦</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <div><a style={style.href} target="_blank" href="http://ksria.com/simpread/#downloads">简悦已经上线了 Firefox 版，UserScript 版，JSBox 版，总有一款适合你</a></div>
                        <span className="desc">包括但不限于：Chrome · Firefox · Safari · Apple Safari · Microsoft Edge · Opera · iPhone · iPad</span>
                        <span className="arrow"></span>
                    </div>
                </div>

                <div className="label" data-head-level="h1">反馈</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="https://github.com/kenshin/simpread/issues">如果有任何问题请提交 issues</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="https://t.me/simpread">现在就加入 Telegram 群，获取简悦的第一手资料</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more" style={{cursor: 'default'}}>
                        可以在 <a style={style.href} target="_blank" href="https://twitter.com/wanglei001"><b>Twitter</b></a> 或 <a style={style.href} target="_blank" href="https://weibo.com/23784148"><b>新浪微博</b></a> 上关注我
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>

                <div className="label" data-head-level="h1">其它作品</div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="http://ksria.com/gnvm">GNVM - 使用 Go 语言编写的 Node.js 多版本管理器</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="http://ksria.com/emoji">+Emoji - 一个 简单、可靠、纯粹、中文语义化的 Emoji 扩展</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="http://ksria.com/sov2ex">SOV2EX - 一个便捷的 V2EX 站内搜索引擎（前端界面）</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
                <div style={{ 'margin-top': '10px', 'position': 'relative' }} className="lab">
                    <div className="more">
                        <a style={style.href} target="_blank" href="http://ksria.com/simptab">简 Tab - 极简的 Chrome 新标签页扩展，望你每次打开都有好心情</a>
                        <span style={{ bottom: "11px" }} className="arrow"></span>
                    </div>
                </div>
            </div>
        )
    }
}