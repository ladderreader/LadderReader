var child = require('child_process');
var path  = require('path')

function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    let filePath = path.join(__dirname, '')
    console.log("filePath", filePath);
    let shell = "cat " + filePath + "/src/bundle/common.js " + filePath + "/src/bundle/background.js > " + filePath + "/src/bundle/backgroundscripts.js"
    child.exec(shell, function(err, sto) {
      let shell3 = "sed -i '' 's/window/self/g' " + filePath + "/src/bundle/backgroundscripts.js"
      child.exec(shell3, function(err, sto) {
      })
    })

    let shell2 = "cat " + filePath + "/publish/bundle/common.js " + filePath + "/publish/bundle/background.js > " + filePath + "/publish/bundle/backgroundscripts.js"
    child.exec(shell2, function(err, sto) {
      console.log(sto);

      let shell4 = "sed -i '' 's/window/self/g' " + filePath + "/publish/bundle/backgroundscripts.js"
      child.exec(shell4, function(err, sto) {
        console.log(sto);
      })

    })

    let shell4 = "cat " + filePath + "/src/vender/lineWrapDetector.js " + filePath + "/src/bundle/contentscripts.js > " + filePath + "/src/bundle/contentscripts2.js"
    child.exec(shell4, function(err, sto) {
        let shell5 = "cat " + filePath + "/src/service/screenshotter.js " + filePath + "/src/bundle/contentscripts2.js > " + filePath + "/src/bundle/contentscripts3.js"
        child.exec(shell5, function(err, sto) {
          console.log(sto);
        })  
    })

    let shell6 = "cat " + filePath + "/src/vender/lineWrapDetector.js " + filePath + "/publish/bundle/contentscripts.js > " + filePath + "/publish/bundle/contentscripts2.js"
    child.exec(shell6, function(err, sto) {
      let shell7 = "cat " + filePath + "/src/service/screenshotter.js " + filePath + "/publish/bundle/contentscripts2.js > " + filePath + "/publish/bundle/contentscripts3.js"
      child.exec(shell7, function(err, sto) {
          let shell8 = "rm -rf " + filePath + "/publish/bundle/contentscripts.js"
          child.exec(shell8, function(err, sto) {
              console.log(sto);
          })  
          let shell9 = "rm -rf " + filePath + "/publish/bundle/contentscripts2.js"
          child.exec(shell9, function(err, sto) {
              console.log(sto);
          })  
        })  
    })
    

  });
};

module.exports = HelloWorldPlugin;