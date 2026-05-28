setInterval(() => {
    setTimeout(() => {
        document.querySelector(".caption").innerText = "adi is a stupid bitch ass fucking gay nigga"
        setTimeout(() => {
            document.querySelector(".caption").innerText = "adi is gay"
        }, Math.floor(Math.random() * 100))
    }, Math.floor(Math.random() * 1000))
}, 1000)
var selector = document.querySelector(".test-select")
var curTest = {"name": "", "questions": []}
;(async function(){
    var response = await fetch("https://cool-frog-03dd.gavin-li2.workers.dev/")
    var tests = await response.json()
    var prompt = document.querySelector(".prompt")
    var input = document.querySelector(".input")
    var submit = document.querySelector(".submit")
    var overlay = document.querySelector(".overlay")
    var name = document.querySelector(".name")
    var addButton = document.querySelector(".q-add")
    var questionsCont = document.querySelector(".qs-cont")
    var nqButton = document.querySelector(".submit-nq")
    var correctAnswers = [""]
    if(tests){
        for(var i in tests){
            var t = tests[i]
            var option = document.createElement("option")
            option.value = i
            option.textContent = t.name
            selector.appendChild(option)
        }
    }
    selector.innerHTML += `<option value="create-new">Create New...</option>`
    selector.onchange = () => {
        if(selector.value != "" && selector.value != "create-new"){
            document.querySelector("option[value=\"\"]").remove()
            document.querySelector(".q-cont").style.display = "block"
            document.querySelector(".c-cont").style.display = "none"
            var questions = tests[selector.value].questions
            var q = questions[Math.floor(Math.random() * questions.length)]
            prompt.innerText = q.prompt
            correctAnswers = q.answers
            for(var i in correctAnswers){
                correctAnswers[i] = correctAnswers[i].toLowerCase()
            }
        }
        else if(selector.value == "create-new"){
            document.querySelector("option[value=\"\"]").remove()
            document.querySelector(".c-cont").style.display = "block"
            curTest = {"name": "", "questions": []}
        }
    }
    submit.onclick = () => {
        overlay.style.animation = "500ms linear 0s " + (correctAnswers.includes(input.value.toLowerCase()) ? "overlay-correct" : "overlay-wrong")
        setTimeout(() => {
            overlay.style.animation = "none"
        }, 500)
        var questions = tests[selector.value].questions
        var q = questions[Math.floor(Math.random() * questions.length)]
        prompt.innerText = q.prompt
        correctAnswers = q.answers
        for(var i in correctAnswers){
            correctAnswers[i] = correctAnswers[i].toLowerCase()
        }
        input.value = ""
    }
    name.onchange = () => {
        curTest.name = name.value
    }
    addButton.onclick = () => {
        var i = curTest.questions.length
        curTest.questions.push({
            prompt: "",
            answers: []
        })
        var promptTextarea = document.createElement("textarea")
        promptTextarea.className = "prompt"
        var answersTextarea = document.createElement("textarea")
        answersTextarea.className = "answers"
        var div = document.createElement("div")
        div.className = "q"
        var promptLabel = document.createElement("label")
        promptLabel.className = "entry-l"
        promptLabel.textContent = "Prompt:"
        var answersLabel = document.createElement("label")
        answersLabel.className = "entry-l"
        answersLabel.textContent = "Answers (comma separated):"
        promptTextarea.onchange = () => {
            curTest.questions[i].prompt = promptTextarea.value
        };
        answersTextarea.onchange = () => {
            curTest.questions[i].answers = answersTextarea.value.split(",")
        }
        div.appendChild(promptLabel)
        div.appendChild(promptTextarea)
        div.appendChild(answersLabel)
        div.appendChild(answersTextarea)
        questionsCont.appendChild(div)
    }
    nqButton.onclick = async function(){
        var postResponse = await fetch("https://cool-frog-03dd.gavin-li2.workers.dev/", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(curTest)
        })
    }
})()
