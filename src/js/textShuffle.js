const staticEl = document.querySelector("#prefix")
const prefix = staticEl.textContent

const words = document.querySelector("#words")
const skills = [
    "  TypeScript",
    "  React",
    "  JavaScript",
    "  HTML & CSS",
    "  jQuery",
    "  Node.js",
    "  MongoDB",
    "  PHP & MySQL",
    "  Passion & love",
].map((s) => `${s}.`)
const delay = 50
const step = 1
const tail = 5
const timeout = 25

const p = document.createElement("p")
words.appendChild(p)

const colors = []

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomColoredString(n) {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < n; i++) {
        const char = document.createElement("span")

        fragment.appendChild(char)
    }
    return fragment
}

const $ = {
    text: "",

    skillI: 0,
    skillP: 0,
    direction: "forward",
    delay,
    step,
}

function render() {
    const skill = skills[$.skillI]

    if ($.step) {
        $.step--
    } else {
        $.step = step
        if ($.prefixP < prefix.length) {
            if ($.prefixP >= 0) {
                $.text += prefix[$.prefixP]
            }
            $.prefixP++
        } else {
            if ($.direction === "forward") {
                if ($.skillP < skill.length) {
                    $.text += skill[$.skillP]
                    $.skillP++
                } else {
                    if ($.delay) {
                        $.delay--
                    } else {
                        $.direction = "backward"
                        $.delay = delay
                    }
                }
            } else {
                if ($.skillP > 0) {
                    $.text = $.text.slice(0, -1)
                    $.skillP--
                } else {
                    $.skillI = ($.skillI + 1) % skills.length
                    $.direction = "forward"
                }
            }
        }
    }

    p.textContent = $.text
    p.appendChild(
        getRandomColoredString(
            $.prefixP < prefix.length
                ? Math.min(tail, tail + $.prefixP)
                : Math.min(tail, skill.length - $.skillP),
        ),
    )
    setTimeout(render, timeout)
}
setTimeout(render, 500)
