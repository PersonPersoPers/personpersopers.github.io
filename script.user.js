// ==UserScript==
// @name         Gavin Li's script
// @namespace    http://tampermonkey.net/
// @version      2026-03-30
// @description  Stuff
// @author       Gavin Li
// @match        *://*/*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    var popupMode = GM_getValue("popupMode")
    var flowrDefaultColors = [{"name":"Common","color":"#7eef6d","border":"#66c258"},{"name":"Unusual","color":"#ffe65d","border":"#cfba4b"},{"name":"Rare","color":"#4d52e3","border":"#3e42b8"},{"name":"Epic","color":"#861fde","border":"#6d19b4"},{"name":"Legendary","color":"#de1f1f","border":"#b41919"},{"name":"Mythic","color":"#1fdbde","border":"#19b1b4"},{"name":"Ultra","color":"#ff2b75","border":"#cf235f"},{"name":"Super","color":"#2bffa3","border":"#23cf84"},{"name":"Omega","color":"#494849","border":"#3b3a3b"},{"name":"Fabled","color":"#ff5500","border":"#cf4500"},{"name":"Divine","color":"#67549c","border":"#53447e","fancy":{"border":"#53447e","hue":256,"light":47,"sat":30,"spread":20,"period":1.5}},{"name":"Supreme","color":"#b25dd9","border":"#904bb0","fancy":{"border":"#904bb0","hue":281,"light":61,"sat":62,"spread":12,"period":2,"stars":1}},{"name":"Omnipotent","color":"#5e004f","border":"#000000","fancy":{"border":"#151515","hue":285,"light":20,"sat":100,"spread":35,"period":1.5,"stars":2}},{"name":"Astral","color":"#046307","border":"#035005","fancy":{"border":"#035005","hue":122,"light":25,"sat":100,"spread":60,"period":1.5,"stars":2}},{"name":"Celestial","color":"#608efc","border":"#4f6bd1","fancy":{"border":"#4f6bd1","hue":225,"light":69,"sat":100,"spread":10,"period":1,"stars":2}},{"name":"Seraphic","color":"#c77e5b","border":"#a16649","fancy":{"border":"#a16649","hue":19,"light":57,"sat":49,"spread":15,"period":1.5,"stars":2}},{"name":"Transcendent","color":"#ffffff","border":"#cfcfcf","fancy":{"border":"#cfcfcf","hue":180,"light":93,"sat":100,"spread":80,"period":1.5,"stars":2}},{"name":"Ethereal","color":"#f6c5de","border":"#d1a3ba","fancy":{"border":"#d1a3ba","hue":341,"light":89,"sat":100,"spread":40,"period":1,"stars":2}},{"name":"Galactic","color":"#7f0226","border":"#974d63","fancy":{"border":"#974d63","hue":343,"light":26,"sat":97,"spread":20,"period":0.75,"stars":2}},{"name":"Eternal","color":"#0cc151","border":"#0b3b1f","fancy":{"border":"#0b3b1f","hue":145,"light":40,"sat":90,"spread":30,"period":0.75,"stars":2}},{"name":"Apotheotic","color":"#ad831e","border":"#5e4b2c","fancy":{"border":"#5e4b2c","hue":55,"light":40,"sat":70,"spread":35,"period":0.75,"stars":2}},{"name":"Voidbound","color":"#4b1dad","border":"#3c1263","fancy":{"border":"#3c1263","hue":271,"light":40,"sat":75,"spread":35,"period":0.75,"stars":2}},{"name":"Exalted","color":"#197f8d","border":"#3c1157","fancy":{"border":"#3c1157","hue":203,"light":35,"sat":72,"spread":35,"period":0.75,"stars":2}},{"name":"Chaos","color":"#1d0f3e","border":"#161a61","fancy":{"border":"#161a61","hue":237,"light":15,"sat":62,"spread":30,"period":0.5,"stars":2}},{"name":"Cataclysmic","color":"#c2410a","border":"#630808","fancy":{"border":"#630808","hue":30,"light":40,"sat":90,"spread":30,"period":0.75,"stars":2}},{"name":"Nullborne","color":"#434246","border":"#666666","fancy":{"border":"#666666","hue":313,"light":26,"sat":15,"spread":200,"period":0.75,"stars":2}},{"name":"Eclipsed","color":"#6584c7","border":"#2f1d70","fancy":{"border":"#2f1d70","hue":221,"light":41,"sat":33,"spread":50,"period":0.75,"stars":2}},{"name":"Radiant","color":"#990077","border":"#770060","fancy":{"border":"#770060","hue":305,"light":35,"sat":100,"spread":50,"period":2,"stars":2}},{"name":"Forsaken","color":"#006742","border":"#055","fancy":{"border":"#055","hue":150,"light":20,"sat":100,"spread":150,"period":2,"stars":2}},{"name":"Chromatic","color":"#a6fffb","border":"#8bd9d5","fancy":{"border":"#8bd9d5","hue":177,"light":81,"sat":100,"spread":100,"period":0.75,"stars":2}},{"name":"Prismatic","color":"#fff0a6","border":"#c2a92d","fancy":{"border":"#c2a92d","hue":50,"light":83,"sat":100,"spread":100,"period":0.75,"stars":2}},{"name":"Arcane","color":"#a14b0e","border":"#cc5604","fancy":{"border":"#cc5604","hue":25,"light":34,"sat":84,"spread":60,"period":0.75,"stars":2}},{"name":"Esoteric","color":"#32947b","border":"#43ba9c","fancy":{"border":"#43ba9c","hue":165,"light":40,"sat":47,"spread":90,"liSpread":10,"period":0.75,"stars":2}},{"name":"Metaphysical","color":"#6e3470","border":"#87438a","fancy":{"border":"#87438a","hue":298,"light":32,"sat":37,"spread":90,"satSpread":20,"period":0.75,"stars":2}},{"name":"Primordial","color":"#b8e0cc","border":"#000000","fancy":{"border":"#000000","hue":149,"light":60,"sat":47,"spread":90,"liSpread":30,"period":0.75,"stars":3}},{"name":"Vanguard","color":"#ff8800","border":"#dd7700","hitbox":"#ff8800","fancy":{"hue":0,"light":50,"sat":100,"satSpread":0,"spread":90,"liSpread":0,"period":1.25,"stars":2}},{"name":"Luminous","color":"#cc88ff","border":"#aa77dd","hitbox":"#cc88ff","fancy":{"hue":300,"light":50,"sat":100,"satSpread":0,"spread":30,"liSpread":100,"period":0.5,"stars":8}},{"name":"Fractured","color":"#00ff00","border":"#00cc00","hitbox":"#00ff00","fancy":{"hue":175,"light":50,"sat":100,"spread":180,"satSpread":0,"liSpread":20,"period":1.67,"stars":2}},{"name":"Eloquent","color":"#ff00ff","border":"#cc00cc","hitbox":"#ff00ff","fancy":{"hue":320,"light":0,"sat":100,"spread":0,"satSpread":0,"liSpread":50,"period":0.2,"stars":0}},{"name":"Tesselated","color":"#005555","border":"#004444","hitbox":"#005555","fancy":{"hue":200,"light":30,"sat":100,"spread":120,"satSpread":20,"liSpread":-15,"period":0.8,"stars":1}},{"name":"Vanquished","color":"#ff0099","border":"#dd0077","hitbox":"#ff0099","fancy":{"hue":0,"light":50,"sat":100,"spread":200,"satSpread":0,"liSpread":0,"period":1.25,"stars":1}},{"name":"Coalescent","color":"#eeaaff","border":"#bb77cc","hitbox":"#eeaaff","fancy":{"hue":270,"light":75,"sat":100,"spread":30,"satSpread":0,"liSpread":0,"period":0.2,"stars":1}},{"name":"Spectral","color":"#ccffcc","border":"#aaffaa","hitbox":"#ccffcc","fancy":{"hue":140,"light":50,"sat":50,"spread":50,"satSpread":0,"liSpread":40,"period":0.2,"stars":4}},{"name":"Unfathomable","color":"#ff9999","border":"#bb6666","hitbox":"#ff9999","fancy":{"hue":360,"light":50,"sat":50,"spread":500,"satSpread":0,"liSpread":0,"period":2,"stars":0}},{"name":"Paramount","color":"#0000ff","border":"#0000bb","hitbox":"#0000ff","fancy":{"hue":200,"light":30,"sat":100,"spread":0,"satSpread":0,"liSpread":20,"period":0.4,"stars":3}},{"name":"Evanescent","color":"#ffff00","border":"#cccc00","hitbox":"#ffff00","fancy":{"hue":70,"light":-960,"sat":100,"spread":0,"satSpread":0,"liSpread":1000,"period":0.1,"stars":3}},{"name":"Starforged","color":"#ff0000","border":"#cc0000","hitbox":"#ff0000","fancy":{"hue":30,"light":50,"sat":100,"spread":100,"satSpread":0,"liSpread":0,"period":0.2,"stars":1}},{"name":"Timelit","color":"#ffaaff","border":"#bb99bb","hitbox":"#ffaaff","fancy":{"hue":250,"light":80,"sat":100,"spread":100,"satSpread":0,"liSpread":40,"period":0.2,"stars":1}},{"name":"Aeonic","color":"#6600ff","border":"#4400dd","hitbox":"#6600ff","fancy":{"hue":280,"light":30,"sat":100,"spread":60,"satSpread":0,"liSpread":-30,"period":0.3,"stars":6}},{"name":"Unreal","color":"#660000","border":"#440000","hitbox":"#660000","fancy":{"hue":200,"light":0,"sat":100,"spread":200,"satSpread":0,"liSpread":-60,"period":0.075,"stars":12}}]
    if(location.href == "https://harshulsilverspoon.github.io/FNAE-HTML5-1.2.3/index.html"){
        unsafeWindow.autoElectrocute = false
        unsafeWindow.autoPlay = 0
        document.body.innerHTML += `
            <div style="position:absolute;width:200px;height:350px;background-color:#111111;left:10px;top:50px;z-index:2147483647;color:#ffffff;padding:10px;">
                <p style="margin-block-end:0px;">Epstein is at: <span id="epstein-loc">cam11</span></p>
                <button style="background-color:#555555;color:#ffffff;" onclick="game.enemyAI.epstein.currentLocation=prompt('Enter location')||game.enemyAI.epstein.currentLocation;game.enemyAI.updateCameraDisplay()">Move</button>
                <p style="margin-block-end:0px;">Trump is at: <span id="trump-loc">cam10</span> <span style="display:none;color:#ff0000;font-weight:bold;cursor:pointer;" id="trump-crawl" onclick="game.enemyAI.stopTrumpCrawling();game.state.ventsClosed=false;">[!]</span></p>
                <button style="background-color:#555555;color:#ffffff;margin-bottom:20px;margin-right:20px;" onclick="game.enemyAI.trump.currentLocation=prompt('Enter location')||game.enemyAI.trump.currentLocation;game.enemyAI.updateCameraDisplay()">Move</button>
                <button style="background-color:#555555;color:#ffffff;margin-bottom:20px;" onclick="autoElectrocute=!autoElectrocute;" id="hawking-auto">Auto Electrocute <span id="hawking-indicator">OFF</span></button>
                <button style="background-color:#555555;color:#ffffff;margin-bottom:20px;margin-right:20px;" onclick="game.state.cameraFailed=false">Restart Cameras</button>
                <button style="background-color:#555555;color:#ffffff;margin-bottom:20px;margin-right:20px;" onclick="autoPlay=(autoPlay+1)%3" id="auto">Auto Play <span id="auto-status">OFF</span></button>
                <button style="background-color:#555555;color:#ffffff;margin-bottom:20px;margin-right:20px;" onclick="game.state.currentTime=parseInt(prompt('Enter time'))">Set Time</button>
                <button style="background-color:#555555;color:#ffffff;" onclick="game.winNight();">Skip Night</button>
                <button style="background-color:#550000;color:#ffffff;" onclick="game.enemyAI.triggerJumpscare()">Suicide</button>
            </div>
        `
        window.setInterval(() => {
            document.getElementById("epstein-loc").innerHTML = game.enemyAI.epstein.currentLocation
            document.getElementById("trump-loc").innerHTML = game.enemyAI.trump.currentLocation
            if(game.enemyAI.trump.isCrawling){document.getElementById("trump-crawl").style.display = "inline"}
            else{document.getElementById("trump-crawl").style.display = "none"}
            if(unsafeWindow.autoElectrocute){
                document.getElementById("hawking-auto").style.backgroundColor = "#00ffff"
                document.getElementById("hawking-auto").style.color = "#000000"
                document.getElementById("hawking-indicator").innerHTML = "ON"
                game.enemyAI.shockHawking()
            }
            else{
                document.getElementById("hawking-auto").style.backgroundColor = "#555555"
                document.getElementById("hawking-auto").style.color = "#ffffff"
                document.getElementById("hawking-indicator").innerHTML = "OFF"
            }
            if(unsafeWindow.autoPlay == 0){
                document.getElementById("auto-status").innerHTML = "OFF"
            }
            else if(unsafeWindow.autoPlay == 1){
                document.getElementById("auto-status").innerHTML = "ON"
                game.enemyAI.epstein.currentLocation = "cam11"
                game.enemyAI.trump.currentLocation = "cam10"
                game.enemyAI.shockHawking()
            }
            else{
                document.getElementById("auto-status").innerHTML = "TROLL"
                if(game.enemyAI.epstein.currentLocation == "cam1" || game.enemyAI.epstein.currentLocation == "cam2"){
                    game.enemyAI.epstein.currentLocation = "cam11"
                }
                if(game.enemyAI.trump.isCrawling){
                    game.enemyAI.stopTrumpCrawling();
                    game.state.ventsClosed = false;
                }
                if(game.enemyAI.hawking.warningLevel == 2){
                    game.enemyAI.shockHawking()
                }
            }
        }, 1000)
    }
    GM_registerMenuCommand("Play FNAE", () => {
        if(popupMode == "page-replace"){document.head.innerHTML = ""}
        if(popupMode == "page-replace" || popupMode == "replace"){
            document.body.innerHTML = `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://harshulsilverspoon.github.io/FNAE-HTML5-1.2.3/index.html"></iframe>
            `
        }
        else{
            document.body.innerHTML += `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://harshulsilverspoon.github.io/FNAE-HTML5-1.2.3/index.html"></iframe>
            `
        }
    })
    GM_registerMenuCommand("Play florr", () => {
        if(popupMode == "page-replace"){document.head.innerHTML = ""}
        if(popupMode == "page-replace" || popupMode == "replace"){
            document.body.innerHTML = `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://florr.io"></iframe>
            `
        }
        else{
            document.body.innerHTML += `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://florr.io"></iframe>
            `
        }
    })
    GM_registerMenuCommand("Play Bloxd", () => {
        if(popupMode == "page-replace"){document.head.innerHTML = ""}
        if(popupMode == "page-replace" || popupMode == "replace"){
            document.body.innerHTML = `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://bloxd.io"></iframe>
            `
        }
        else{
            document.body.innerHTML += `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://bloxd.io"></iframe>
            `
        }
    })
    GM_registerMenuCommand("Play zorr", () => {
        if(popupMode == "page-replace"){document.head.innerHTML = ""}
        if(popupMode == "page-replace" || popupMode == "replace"){
            document.body.innerHTML = `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://zorr.pro"></iframe>
            `
        }
        else{
            document.body.innerHTML += `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://zorr.pro"></iframe>
            `
        }
    })
    GM_registerMenuCommand("Watch Youtube", () => {
        var id = prompt("Enter video id")
        if(popupMode == "page-replace"){document.head.innerHTML = ""}
        if(popupMode == "page-replace" || popupMode == "replace"){
            document.body.innerHTML = `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://youtube.com/embed/${id}"></iframe>
            `
        }
        else{
            document.body.innerHTML += `
                <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://youtube.com/embed/${id}"></iframe>
            `
        }
    })
    GM_registerMenuCommand("Settings", () => {
        GM_openInTab("https://personpersopers.github.io/settings.html")
    })
    if(location.href == "https://personpersopers.github.io/settings.html"){
        document.head.innerHTML = `
            <title>Settings</title>
        `
        document.body.style.margin = "0px"
        document.body.innerHTML = `
            <div style="width:100vw;height:100%;background-color:#333333;padding:50px;color:#ffffff;font-family:Arial;font-size:25px;">
                <lable>Popup Method: </label>
                <select id="popup-mode">
                   <option value="replace" selected>Replace Page</option>
                   <option value="page-replace">Replace Full Page</option>
                   <option value="overlay">Overlay on Page</option>
                </select>
                <div style="width:50vw;margin-top:100px;" id="selector">
                </div>
            </div>
        `
        document.getElementById("popup-mode").addEventListener("change", function(){
            GM_setValue("popupMode", this.value)
        })
        var colorSelector = document.getElementById("selector")
        for(var i = 0; i < 50; i++){
            var color = flowrDefaultColors[i].color.replace("#", "")
            var r = parseInt(color.substring(0, 2), 16)
            var g = parseInt(color.substring(2, 4), 16)
            var b = parseInt(color.substring(4, 6), 16)
            var l = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255
            var button = document.createElement("button")
            button.style.backgroundColor = "#" + color
            button.style.borderWidth = "2px"
            button.style.fontSize = "25px"
            button.style.borderColor = flowrDefaultColors[i].border
            button.innerHTML = flowrDefaultColors[i].name
            button.style.margin = "10px"
            button.style.color = l >= 0.179 ? "#000000" : "#ffffff"
            colorSelector.appendChild(button)
        }
    }
    if(location.href.includes("flowr.fun") && location.href.includes("?copyData=true")){
        GM_setClipboard(JSON.stringify(Colors))
    }
    if(location.href.includes("flowr.fun")){
    }
})();
