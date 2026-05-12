setInterval(() => {
    setTimeout(() => {
        document.querySelector(".caption").innerText = "adi is a bitch ass fucking gay nigga"
        setTimeout(() => {
            document.querySelector(".caption").innerText = "adi is gay"
        }, Math.floor(Math.random() * 100))
    }, Math.floor(Math.random() * 1000))
}, 1000)
var selector = document.querySelector(".test-select");
(async function(){
    var response = await fetch("https://cool-frog-03dd.gavin-li2.workers.dev/")
    var tests = await response.json()
    var prompt = document.querySelector(".prompt")
    var input = document.querySelector(".input")
    var submit = document.querySelector(".submit")
    var overlay = document.querySelector(".overlay")
    var correctAnswers = [""]
    if(tests){
        for(var i in tests){
            var t = tests[i]
            selector.innerHTML += `<option value="${i}">${t.name}</option>`
        }
    }
    selector.innerHTML += `<option value="create-new">Create New...</option>`
    alert(selector.innerHTML)
    selector.onchange = () => {
        if(selector.value != "" && selector.value != "create-new"){
            document.querySelector("option[value=\"\"]").remove()
            document.querySelector(".q-cont").style.display = "block"
            var questions = tests[selector.value].questions
            var q = questions[Math.floor(Math.random() * questions.length)]
            prompt.innerText = q.prompt
            correctAnswers = q.answers
        }
        else if(selector.value == "create-new"){
            location.href = "new.html"
        }
    }
    submit.onclick = () => {
        overlay.style.animation = "500ms linear 0s " + (correctAnswers.includes(input.value) ? "overlay-correct" : "overlay-wrong")
        setTimeout(() => {
            overlay.style.animation = "none"
        }, 500)
        var questions = tests[selector.value].questions
        var q = questions[Math.floor(Math.random() * questions.length)]
        prompt.innerText = q.prompt
        correctAnswers = q.answers
    }
})()
