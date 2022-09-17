console.log( "=== simpread theme load ===" )

const names  = [ "github", "newsprint", "gothic", "engwrite", "octopress", "pixyii", "monospace", "night", "dark" ],
      flag   = "sr-rd-theme-",
      themes = {},
      colors = [
        "251, 251, 251, 1",
        "243, 242, 238, 1",
        "252, 252, 252, 1",
        "252, 245, 237, 1",
        "248, 248, 248, 1",
        "250, 250, 250, 1",
        "245, 245, 245, 1",
        "54,  59,  64,  1",
        "34,  34,  34,  1"
       ];

let curtheme = "";

/**
 * Theme class
 * 
 * @class
 */

class Theme {

    /**
     * Theme colors[read]
     * 
     * @return {array} theme colors
     */
    get colors() {
        return  colors;
    }

    /**
     * Theme names[read]
     * 
     * @return {array} theme name array
     */
    get names() {
        return names;
    }

    /**
     * Current theme name[read]
     * 
     * @return {string} theme name
     */
    get theme() {
        return curtheme;
    }

    /**
     * Change theme
     * 
     * @param {string} theme name
     */
    Change( theme ) {
        curtheme = theme;
        findThemeStyle( function( name, css, $target ) {
            if ( name == theme )  $target.html( themes[theme] );
            else                  $target.html( `${flag}${name}` + "{}" );
        });
        tocTheme( theme );
    }

    Get( theme ) {
        return themes[theme];
    }

    GetAll() {
        findThemeStyle();
    }

    constructor() {
        require( `../assets/css/theme_common.css` );
        names.forEach( name => require( `../assets/css/theme_${name}.css` ) );
        require( `../assets/css/theme_mobile.css` );
        findThemeStyle( ( name, content ) => themes[name] = content );
    }
}

/**
 * Find theme style tag
 * 
 * @return {function} param1: theme name; param2: theme css; param3: theme style tag jquery object
 */
function findThemeStyle( callback ) {
    $( "head" ).find( "style" ).map( (index, item) => {
        const $target = $(item),
              css     = $target.text();
        if ( css.startsWith( flag ) ) {
            const arr  = css.replace( flag, "" ).match( /\w+/ ),
                  name = arr[ arr.length - 1 ];
            callback && callback( name, css, $target );
        } else if ( css.search( ".simpread-font" ) > -1 ) {
            !themes["global"] && ( themes["global"] = css );
        } else if ( css.search( "(pointer:coarse)" ) == -1 && css.search( ".simpread-theme-root" ) > -1 ) {
            !themes["common"] && ( themes["common"] = css );
        } else if ( css.search( "(pointer:coarse)" ) > -1 && css.search( "sr-read" ) > -1 ) {
            !themes["mobile"] && ( themes["mobile"] = css );
        }
    });
}

/**
 * Change toc <a> style( hacked )
 * 
 * @param {string} theme
 */
function tocTheme( theme ) {
    $( "toc outline a" ).removeClass().addClass( "toc-outline-theme-" + theme );
}

const theme = new Theme();

export default theme;