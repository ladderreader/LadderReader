var child = require('child_process');

function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    
    let shell = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/common.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/background.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/backgroundscripts.js"
    child.exec(shell, function(err, sto) {

      let shell3 = "sed -i '' 's/window/self/g' /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/backgroundscripts.js"
      child.exec(shell3, function(err, sto) {
        console.log(sto);
      })

    })

    let shell2 = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/common.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/background.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/backgroundscripts.js"
    child.exec(shell2, function(err, sto) {
      console.log(sto);

      let shell4 = "sed -i '' 's/window/self/g' /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/backgroundscripts.js"
      child.exec(shell4, function(err, sto) {
        console.log(sto);
      })

    })

    let shell4 = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/vender/lineWrapDetector.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/contentscripts.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/contentscripts2.js"
    child.exec(shell4, function(err, sto) {
        let shell5 = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/service/screenshotter.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/contentscripts2.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/bundle/contentscripts3.js"
        child.exec(shell5, function(err, sto) {
          console.log(sto);
        })  
    })

    let shell6 = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/vender/lineWrapDetector.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts2.js"
    child.exec(shell6, function(err, sto) {
      let shell7 = "cat /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/src/service/screenshotter.js /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts2.js > /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts3.js"
      child.exec(shell7, function(err, sto) {
          let shell8 = "rm -rf /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts.js"
          child.exec(shell8, function(err, sto) {
              console.log(sto);
          })  
          let shell9 = "rm -rf /Users/tan/Desktop/work/m/project/my-word/ladder-reader/code/ladder-reader-front-end/publish/bundle/contentscripts2.js"
          child.exec(shell9, function(err, sto) {
              console.log(sto);
          })  
        })  
    })
    

  });
};

module.exports = HelloWorldPlugin;