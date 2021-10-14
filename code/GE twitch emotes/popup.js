// --------------------------------------
// popup manager
// --------------------------------------

const popup = (popupmassage, okButtonText) => {
    var newPopup = document.createElement('span');
    newPopup.id = "thisPopUp";
    newPopup.innerHTML = popupmassage;
    newPopup.innerHTML += "<br>";
    
    newbutton = document.createElement("button");
    newbutton.innerHTML = okButtonText;
    newbutton.style.width = "300px";

    newPopup.classList.add('Absolutecenter');
    newbutton.onclick = () => {
        var element = document.getElementById("thisPopUp");
	    element.remove();
    };
    newPopup.appendChild(newbutton);
    document.body.appendChild(newPopup);
}

// --------------------------------------
// end
// --------------------------------------

function copyToClipboard(text) {
    // const elem = document.createElement('textarea');
    // elem.value = text;
    // document.body.appendChild(elem);
    // elem.select();
    // document.execCommand('copy');
    // document.body.removeChild(elem);
    navigator.clipboard.writeText(text);
}
document.getElementsByClassName("imgInfo")[0].addEventListener("click", () => {
    popup(`
        <h3>info:</h3>
        <li>
            <ul>version: v.InDev</ul>
        </li>
        <h3>credits:</h3>
        <li>
            <ul>Developer:<br>
            - Goldenegg000
            </ul>
            <ul>Helpers:<br>
            <font color="darkblue">null</font>
            </ul>
            <ul>Beta Testers:<br>
            - geckobooi
            </ul>
        </li>
    `, "close");
});
const EmoteClick = (EmoteName) => {
    copyToClipboard("::"+EmoteName+"::");
}
const EmoteClickGif = (EmoteName) => {
    copyToClipboard(":::"+EmoteName+":::");
}

function allLetter(inputtxt)
{ 

    if (inputtxt == undefined) { 
        return "";
    }

    const letters = ["a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w",
    "x", "y", "z", 
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W",
    "X", "Y", "Z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    TheArray = inputtxt.split('');
    const TheNewArray = inputtxt.split('');
    for (let index = 0; index < TheArray.length; index++) {
        const element = TheArray[index];
        if (letters.includes(element)) {
            continue;
        }
        TheNewArray[index] = "";
    }

    // console.log("Added Emote: " + TheNewArray.join("").toString());
    //return inputtxt;
    return TheNewArray.join("").toString();
}

function AddNewCostumeEmote(emotename, linkex, description) {

    // if (EmotesBlackList == null || EmotesBlackList == undefined) {
    //     setTimeout('AddNewCostumeEmote(''+emotename+'', ''+linkex+'')', 500);
    //     return
    // }
    MySearchEmote = document.getElementById("myMenu");
    MyEmotePicker = document.getElementsByClassName("grid-container")[0];
    

    if (linkex == 'png') {
        //MyEmotePicker.innerHTML += `
        MyEmotePicker.innerHTML += `
        <span class='Emotetooltip'>
            <span class='Emotetooltiptext'>costume emote: `+allLetter(emotename)+`<br>
                <img class='CostumeEmotesDis'  src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+allLetter(emotename)+`.png' alt='`+allLetter(emotename)+`'></img>
                <p>`+description+`</p>
            </span>
            <img class='CostumeEmotesDis' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+allLetter(emotename)+`.png' alt='`+allLetter(emotename)+`'></img>
            <p>`+allLetter(emotename)+`</p>
        </span>
        `
        //NewSearchResult.innerHTML += emotename + ": <br>" + "<img class='CostumeEmotesDis' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+allLetter(emotename)+".png' alt='"+allLetter(emotename)+"'></img>";
    } else if (linkex == 'gif') {
        //MyEmotePicker.innerHTML += `
        MyEmotePicker.innerHTML += `
        <span class='Emotetooltip'>
            <span class='Emotetooltiptext'>costume gif: `+allLetter(emotename)+`<br>
                <img class='CostumeEmotesDis'  src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+allLetter(emotename)+`.gif' alt='`+allLetter(emotename)+`'></img>
                <p>`+description+`</p>
            </span>
            <img class='CostumeEmotesDis' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+allLetter(emotename)+`.gif' alt='`+allLetter(emotename)+`'></img>
            <p>`+allLetter(emotename)+`</p>
        </span>
        `
        //NewSearchResult.innerHTML += emotename + ": <br>" + "<img class='CostumeEmotesDis' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+allLetter(emotename)+".gif' alt='"+allLetter(emotename)+"'></img>";
    }
    return
}

// filter thing
document.getElementById("mySearch").addEventListener('keyup', (event) => {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = event.srcElement;
    filter = input.value.replace(/\s+/g, "").toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByClassName("Emotetooltip");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("img")[0];
        if (a.alt.toUpperCase().includes(filter)) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});

// JquerySetup.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";

const endsearch = setInterval(() => {
    if (!window.navigator.onLine) {
        alert("WARNING!, you dont have Internet.");
        document.getElementsByTagName("body").innerHTML = "Sorry the page couldn't load becouse you have no internet. <a onclick='window.location.reload();'></a>";
        clearInterval(endsearch);
        return
    }
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if (tabs[0]?.url == undefined) {
            return
        }
        clearInterval(endsearch);
        const url = new URL(tabs[0].url);
        console.log(url)
        if (url.host == "www.twitch.tv" || url.host == "dashboard.twitch.tv") {
            $.ajax({url: "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/emoteslist.js ", success: function(result){
                eval(result);
                elements = document.getElementsByClassName("CostumeEmotesDis");
                for(var i = 0; i < elements.length; i++)
                {
                    var current = elements[i];
                    current.addEventListener("click", (event) => {
                        if (event.srcElement.src.endsWith(".png")) {
                            EmoteClick(event.srcElement.alt);
                        } else {
                            EmoteClickGif(event.srcElement.alt);
                        }
                    })
                }
            }});
        } else {
            MyEmotePicker = document.getElementsByClassName("grid-container")[0];
            MyEmotePicker.innerHTML += `
                <h1>please open a valid twitch page for the extension to work like: <a id="twitchLink" href="">twitch.tv</a></h1>
                <br><br><br><br><br><br><br><br><br><br>
            `
            document.getElementById("twitchLink").addEventListener("click", (event) => {
                window.open("https://www.twitch.tv");
            });
            document.getElementById("mySearch").disabled = true;
        }
    });
}, 500);