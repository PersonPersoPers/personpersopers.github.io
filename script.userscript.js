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
// ==/UserScript==

(function() {
    var popupMode = GM_getValue("popupMode") == "replace" ? "=" : "+="
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
        eval(`document.body.innerHTML ${popupMode} \`
            <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://harshulsilverspoon.github.io/FNAE-HTML5-1.2.3/index.html"></iframe>
        \``)
    })
    GM_registerMenuCommand("Play florr", () => {
        eval(`document.body.innerHTML ${popupMode} \`
            <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://florr.io/"></iframe>
        \``)
    })
    GM_registerMenuCommand("Play zorr", () => {
        eval(`document.body.innerHTML ${popupMode} \`
            <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://zorr.pro/"></iframe>
        \``)
    })
    GM_registerMenuCommand("Watch Youtube", () => {
        eval(`var id = prompt("Enter video id")
        document.body.innerHTML = \`
            <iframe style="position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index:2147483647;" src="https://youtube.com/embed/\${id}"></iframe>
        \``)
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
            <div style="width:100vw;height:100vh;background-color:#333333;padding:50px;color:#ffffff;font-family:Arial;font-size:25px;">
                <lable>Popup Method: </label>
                <select id="popup-mode">
                   <option value="replace" selected>Replace Page</option>
                   <option value="overlay">Overlay on Page</option>
                </select>
            </div>
        `
        document.getElementById("popup-mode").addEventListener("change", function(){
            GM_setValue("popupMode", this.value)
        })
    }
})();
