// local forced defenitions DO NOT CHANGE WITHOUT ANY PURPOSE
LocalStorageExtName = "GETE_settings_blacklist"; // the key name to save to twitch.tv localstorage
LocalStorageExtNameBeta = "GETE_settings_version"; // the key name to save to twitch.tv localstorage
ListOfEmotes = []; // the list of emotes
EmotesBlackList = []; // the list of emotes not to display

// adds fstring globally
const fStr = (string="") => {
    end_pos = 0;
    

    while (true) { // yes "while (true)" should never be used but i like using break's so its fine.
        var start_pos = string.indexOf('{') + 1;
        var end_pos = string.indexOf('}',start_pos);
        var text_to_get = string.substring(start_pos,end_pos);
        if (start_pos == -1 || end_pos == -1) { 
            break;
        }
        string = string.replace("{" + text_to_get + "}", eval(text_to_get));
    }
    
    return string;
}

// makes css injecter
const injectCss = (id, css) => {
    const style = document.createElement('style');
    style.id = id;
    style.innerText = css;
    document.head.appendChild(style);
    return style;
}

// makes html injecter
const injectHTML = (id, html) => {
    const span = document.createElement('span');
    span.id = id;
    span.innerHTML = html;
    document.head.appendChild(span);
    return span;
}

// --------------------------------------
// popup manager
// --------------------------------------

// used for closing a popup
const closePopUp = () => {
    var element = document.getElementById("thisPopUp");
	element.style.display = "none";
}

// some css to style the popup window
injectCss("popup-Manager", `
.Absolutecenter {
    width:300px;
    height:300px;
    position:absolute;
    top:50%;
    left:50%;
    background-color: darkblue;
    border-radius: 5px;
    border-style: solid;
    border-width: 8px;
    transform:translate(-50%px,-50%);
    transform:translate(-150px, -150px);
}
`);

const popup = (popupmassage, okButtonText) => {
    var newPopup = document.createElement('div');
    newPopup.id = "thisPopUp";
    newPopup.innerHTML = popupmassage;
    newPopup.innerHTML += "<br><button id='TheButtonFromPopUp' style='width: 300px; margin-bottom: 0px;'>"+okButtonText+"</button>";
    newPopup.classList.add('Absolutecenter');
    document.body.appendChild(newPopup);
    document.getElementById("TheButtonFromPopUp").addEventListener('click', closePopUp);
}

// --------------------------------------
// end
// --------------------------------------

// some css for displaying emotes correctly
injectCss("MakesEmotesLookGood", `
.CostumeEmotes {
    cursor: pointer;
    width: 20px;
    height: 20px;
}
.CostumeEmotesDis {
    cursor: pointer;
    width: 50px;
    height: 50px;
}
`);

// tooltip styles
// code: https://www.codegrepper.com/code-examples/html/how+to+create+a+hover+text+box+in+html
injectCss("EmoteInfoDisplay", `

.Emotetooltip .Emotetooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 6000;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

.Emotetooltip .Emotetooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.Emotetooltip:hover .Emotetooltiptext {
    visibility: visible;
}
`);

// creates/changes localstorage key with value
function createItem(value) {
    localStorage.setItem(LocalStorageExtName, value);
}
function createItemVersion(value) {
    localStorage.setItem(LocalStorageExtNameBeta, value);
}

// gets localstorage key value
function getValue(nameOfItem) {
    return localStorage.getItem(nameOfItem);  
} // Gets the value of 'nameOfItem' and returns it


// fallback if localstorage key is not available
if (getValue(LocalStorageExtName) == null || getValue(LocalStorageExtName) == undefined) {
    createItem(" ");
}
// fallback if Beta key is not available
if (getValue(LocalStorageExtNameBeta) == "" || getValue(LocalStorageExtNameBeta) == null || getValue(LocalStorageExtNameBeta) == undefined) {
    createItemVersion("Beta");
}

// creates/adds emotes to chat
const newEmoteCheck = (thechat, emoteText, emoteimglink, emotename) => {
    try {
        if (thechat.innerText.includes(emoteText)) {
            thechat.innerHTML = thechat.innerHTML.replace(emoteText, "<span class='Emotetooltip'><span class='Emotetooltiptext'>costume emote: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClick(`"+emotename+"`)' src='"+emoteimglink+"' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClick(`"+emotename+"`)' src='"+emoteimglink+"' alt='"+emotename+"'></img></span>");
        }
    } catch {
    }
}
// creates/adds emote gifs to chat
const newEmoteCheckGif = (thechat, emoteText, emoteimglink, emotename) => {
    try {
        if (thechat.innerText.includes(emoteText)) {
            thechat.innerHTML = thechat.innerHTML.replace(emoteText, "<span class='Emotetooltip'><span class='Emotetooltiptext'>costume gif: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif(`"+emotename+"`)' src='"+emoteimglink+"' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClickGif(`"+emotename+"`)' src='"+emoteimglink+"' alt='"+emotename+"'></img></span>");
        }
    } catch {
        // why tf is this catch empty!?
    }
}

// WARNING THIS IS THE OUTDATET WAY OF ADDING SCRIPT TO MAIN WEBPAGE!!!!!!!!

const EmoteClick = document.createElement("script");
EmoteClick.innerHTML = `
function copyToClipboard(text) {
    // const elem = document.createElement('textarea');
    // elem.value = text;
    // document.body.appendChild(elem);
    // elem.select();
    // document.execCommand('copy');
    // document.body.removeChild(elem);
    navigator.clipboard.writeText(text);
}
const EmoteClick = (EmoteName) => {
    copyToClipboard("::"+EmoteName+"::");
}
const EmoteClickGif = (EmoteName) => {
    copyToClipboard(":::"+EmoteName+":::");
}
`;
document.head.appendChild(EmoteClick)

// --------------------------------------
// end
// --------------------------------------

// this function strips strings to only have valid characters
function allLetter(inputtxt)
{ 

    if (inputtxt == undefined) { // fallback case
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
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // list of valid letters

    TheArray = inputtxt.split('');
    const TheNewArray = inputtxt.split('');
    for (let index = 0; index < TheArray.length; index++) { // check if char valid
        const element = TheArray[index];
        if (letters.includes(element)) {
            continue;
        }
        TheNewArray[index] = "";
    }

    return TheNewArray.join("").toString();
}

// detecting emotes
function update() {

    thechat = document.getElementsByClassName("text-fragment");

    for (var i = 0; i < thechat.length; i++) { // for gifs
        if (thechat[i].innerText.includes(":::")) {
            while (true) { // yes "while (true)" should never be used but i like using break's so its fine.
                var start_pos = thechat[i].innerText.indexOf(':::') + 3;
                var end_pos = thechat[i].innerText.indexOf(':::',start_pos);
                if (thechat[i].innerText[start_pos] == ":") { break; }
                var text_to_get = thechat[i].innerText.substring(start_pos,end_pos);
                EmotesBlackList = getValue(LocalStorageExtName).split(",");
                if (start_pos == -1 || end_pos == -1 || EmotesBlackList.includes(allLetter(text_to_get)) || getValue(LocalStorageExtName) == "*") {
                    break;
                }
                newEmoteCheckGif(thechat[i], ":::" + text_to_get + ":::", "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+allLetter(text_to_get)+".gif", allLetter(text_to_get));
        
            }
        }
    }

    for (var i = 0; i < thechat.length; i++) { // for pngs
        if (thechat[i].innerText.includes("::")) {
            while (true) { // yes "while (true)" should never be used but i like using break's so its fine.
                var start_pos = thechat[i].innerText.indexOf('::') + 2;
                var end_pos = thechat[i].innerText.indexOf('::',start_pos);
                var text_to_get = thechat[i].innerText.substring(start_pos,end_pos);
                EmotesBlackList = getValue(LocalStorageExtName).split(",");
                if (start_pos == -1 || end_pos == -1 || EmotesBlackList.includes(allLetter(text_to_get)) || getValue(LocalStorageExtName) == "*") {
                    break;
                }
                newEmoteCheck(thechat[i], "::" + text_to_get + "::", "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+allLetter(text_to_get)+".png", allLetter(text_to_get));
        
            }
        }
    }
}
// manages emotes list in the emotes tab on twitch and blocking emotes
function AddNewCostumeEmote(emotename, linkex, description) {

    NewEmotesBlackList = getValue(LocalStorageExtName).split(",");

    if (NewEmotesBlackList.includes(allLetter(emotename)) || getValue(LocalStorageExtName) == "*") {
        if (linkex == "png") {
            MyEmotePicker.innerHTML += `
            <span>
                <button onclick="HideShowEmoteNew('`+emotename+`');">
                    <img src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg" class="UpdateViewNow" title="Block/Show emote">
                </button>
                `+emotename+`:
                <span class='Emotetooltip'>
                    <span class='Emotetooltiptext'>
                        costume emote: `+emotename+`<br>
                        <img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.png' alt='`+emotename+`'></img>
                    </span>
                    <img class='CostumeEmotes' onClick='EmoteClick("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.png' alt='`+emotename+`'></img>
                </span>
                <hr>
            </span>
            `
        } else if (linkex == "gif") {
            MyEmotePicker.innerHTML += `
            <span>
                <button onclick="HideShowEmoteNew('`+emotename+`');">
                    <img src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg" class="UpdateViewNow" title="Block/Show emote">
                </button>
                `+emotename+`:
                <span class='Emotetooltip'>
                    <span class='Emotetooltiptext'>
                        costume gif: `+emotename+`<br>
                        <img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.gif' alt='`+emotename+`'></img>
                    </span>
                    <img class='CostumeEmotes' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.gif' alt='`+emotename+`'></img>
                </span>
                <hr>
            </span>
            `
        }
        return
    }
    if (linkex == "png") {
        MyEmotePicker.innerHTML += `
        <span>
            <button onclick="HideShowEmoteNew('`+emotename+`');">
                <img src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg" class="UpdateViewNow" title="Block/Show emote" alt="`+emotename+`">
            </button>
            `+emotename+`:
            <span class='Emotetooltip'>
                <span class='Emotetooltiptext'>
                    costume emote: `+emotename+`<br>
                    <img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.png' alt='`+emotename+`'></img>
                </span>
                <img class='CostumeEmotes' onClick='EmoteClick("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.png' alt='`+emotename+`'></img>
            </span>
            <hr>
        </span>
        `
    } else if (linkex == "gif") {
        MyEmotePicker.innerHTML += `
        <span>
            <button onclick="HideShowEmoteNew('`+emotename+`');">
                <img class="IsEmoteActiveDis`+emotename+`" src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg" class="UpdateViewNow" title="Block/Show emote" alt="`+emotename+`">
            </button>
            `+emotename+`:
            <span class='Emotetooltip'>
                <span class='Emotetooltiptext'>
                    costume gif: `+emotename+`<br>
                    <img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.gif' alt='`+emotename+`'></img>
                </span>
                <img class='CostumeEmotes' onClick='EmoteClickGif("`+emotename+`")' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/`+emotename+`.gif' alt='`+emotename+`'></img>
            </span>
            <hr>
        </span>
        `
    }
}

MyEmotePicker = document.createElement("div");
MyEmotePicker.id = "thisIsMyEmotePicker";

// gets script from local file
function scriptFromFile(file) {
    var script = document.createElement("script");
    script.src = file;
    console.log(script);
    return script;
}

// runs script text
function scriptFromSource(source) {
    var script = document.createElement("script");
    script.textContent = source;
    return script;
}

// function to handle two functions above
function inject(scripts) {
    if (scripts.length === 0)
        return;
    var otherScripts = scripts.slice(1);
    var script = scripts[0];
    var onload = function() {
        script.parentNode.removeChild(script);
        inject(otherScripts);
    };
    if (script.src != "") {
        script.onload = onload;
        document.head.appendChild(script);
    } else {
        document.head.appendChild(script);
        onload();
    }
}

// basicly Jquery inplementation
/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> */
var JquerySetup = document.createElement("script");
// JquerySetup.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
JquerySetup.src = chrome.extension.getURL("JQuery/jquery.min.js");

// OMG AJAX WORKS WTH
JquerySetup.onload = () => {
    inject([scriptFromSource(` // checks for privilage and does somthing special...
        $.ajax({url: "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/public.js", success: function(result){
            eval(result);
        }});
    `)]);
    
    stop = setInterval(() => {
        // "emote-picker__scroll-container"
        var TheEmotesList = document.getElementsByClassName("emote-picker__content-block")[0];
        if (TheEmotesList != undefined) {
            TheEmotesList.appendChild(MyEmotePicker);
            SetupCostumeEmotes();
            clearInterval(stop);
        }
        
    }, 500);
}
document.head.appendChild(JquerySetup); // appends Jquery to page

const SetupCostumeEmotes = () => {
    MyEmotePicker.innerHTML = `
    <div class="Layout-sc-nxg1ff-0 emote-picker__content-block"></div>
    <p class="emote-grid-section__header-title kNETjQ bupcyV"><img style="width: 50px;" src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/icon_40.jpg">GE Twitch Emotes<br>
    emotes list:</p></img>
    <br>
    <div onclick="ShowEmoteNew();">
        Show All<img src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg" class="UpdateViewNow" title="Show all emotes">
    </div>
    <div onclick="HideEmoteNew();">
        Hide All<img src="https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg" class="UpdateViewNow" title="Block all emotes">
    </div>
    `;

    
    inject([scriptFromSource(`
        GetCurrentEmotesList();
    `)]);
    MyEmotePicker.innerHTML += `
    <p onclick="location.reload()"><font color="blue" style="cursor: pointer; padding-top: 0px; padding-bottom: 0px;"><strong>click here to reload page to update old massages(optional)</strong></font></p>
    <br>
    <input type="text" class="SearchBar" id="mySearch" placeholder="Search a emote" title="Search for a Emote">
    <br>
    `;

    inject([scriptFromSource(`
        setTimeout(() => {
            // filter thing
            document.getElementById("mySearch").addEventListener('keyup', (event) => {
                // Declare variables
                var input, filter, ul, li, i;
                input = event.srcElement;
                filter = input.value.replace(/\s+/g, "").toUpperCase();
                ul = document.getElementById("thisIsMyEmotePicker");
                li = ul.getElementsByClassName("Emotetooltip");
        
                // Loop through all list items, and hide those who don't match the search query
                for (i = 0; i < li.length; i++) {
                    a = li[i].getElementsByTagName("img")[0];
                    if (a.alt.toUpperCase().includes(filter)) {
                        li[i].parentElement.style.display = "";
                    } else {
                        li[i].parentElement.style.display = "none";
                    }
                }
            });
        }, 500);
    `)]);
}

const UpdateEmoteIsTrueDis = () => {
    ListOfEmotes.forEach(element => {
        if (EmotesBlackList.includes(allLetter(element))) {
            document.getElementsByClass("IsEmoteActiveDis"+element)[0].src = "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg"
        } else {
            document.getElementsByClass("IsEmoteActiveDis"+element)[0].src = "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg"
        }
    });
    document.getElementsByClass("")
}


inject([
    scriptFromSource(`
    function createItem(value) {
        localStorage.setItem("`+LocalStorageExtName+`", value); 
    }
    function getValue(nameOfItem) {
        return localStorage.getItem(nameOfItem);  
    }
    const HideShowEmoteNew = (EmoteName) => {
        createItem(getValue("`+LocalStorageExtName+`").replace("*", ""));
        if (getValue("`+LocalStorageExtName+`").split(',').includes(EmoteName)) {
            createItem(getValue("`+LocalStorageExtName+`").replace(","+EmoteName, ""));
            // alert("removed " + EmoteName + " from blacklist.");
        } else {
            createItem(getValue("`+LocalStorageExtName+`") + "," + EmoteName);
            // alert("added " + EmoteName + " to blacklist.");
        }
    }
    const ShowEmoteNew = (EmoteName) => {
        createItem("");
    }
    const HideEmoteNew = (EmoteName) => {
        createItem("*");
    }



    LocalStorageExtName = "`+LocalStorageExtName+`"
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
        // return inputtxt;
        return TheNewArray.join("").toString();
    }
    function AddNewCostumeEmote(emotename, linkex, description) {

        // if (EmotesBlackList == null || EmotesBlackList == undefined) {
        //     setTimeout('AddNewCostumeEmote(''+emotename+'', ''+linkex+'')', 500);
        //     return
        // }
        NewEmotesBlackList = getValue(LocalStorageExtName).split(',');
        MyEmotePicker = document.getElementById("thisIsMyEmotePicker");
    
        if (NewEmotesBlackList.includes(allLetter(emotename)) || getValue(LocalStorageExtName) == '*') {
            if (linkex == 'png') {
                MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew(`+'`'+`"+emotename+"`+'`'+`);'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg' class='UpdateViewNow' title='Block/Show emote'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume emote: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClick(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClick(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><hr></span>"
            } else if (linkex == 'gif') {
                MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew(`+'`'+`"+emotename+"`+'`'+`);'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg' class='UpdateViewNow' title='Block/Show emote'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume gif: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClickGif(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><hr></span>"
            }
            return
        }
        if (linkex == 'png') {
            MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew(`+'`'+`"+emotename+"`+'`'+`);'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg' class='UpdateViewNow' title='Block/Show emote' alt='"+emotename+"'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume emote: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClick(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClick(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><hr></span>"
        } else if (linkex == 'gif') {
            MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew(`+'`'+`"+emotename+"`+'`'+`);'><img class='IsEmoteActiveDis"+emotename+"' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg' class='UpdateViewNow' title='Block/Show emote' alt='"+emotename+"'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume gif: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClickGif(`+'`'+`"+emotename+"`+'`'+`)' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><hr></span>"
        }
    }
    `),
    scriptFromSource(`
    const GetCurrentEmotesList = () => {
        $.ajax({url: "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/emoteslist.js", success: function(result){
            eval(result);
        }});
    }
    `)
]);

previusVar = "";

// main start event
if (getValue(LocalStorageExtNameBeta) == "Beta") {
    setInterval(update, 500);
    setInterval(() => {
        MegaNewEmotesBlackListVar = getValue(LocalStorageExtName);

        if (MegaNewEmotesBlackListVar != previusVar) {
            previusVar = MegaNewEmotesBlackListVar;
            SetupCostumeEmotes();
        }
    }, 100);
    window.addEventListener('popstate', function (event) {
        // The URL changed...
        location.reload();
    });
} else if (getValue(LocalStorageExtNameBeta) == "βEtaDelota") {
    document.body.onload = function () {
        var yee = confirm('Are you sure you want to ACTIVATE "βEtaDelota" MODE!?');
        if (yee) {
            document.head.innerHTML = `
                <style>
                    html {
                        background-color: hsl(0deg 0% 18%);
                    }
                    h2, p {
                        color: hsl(0deg 100% 100%);
                    }
                </style>
            `;
    
    
            // basicly Jquery inplementation
            /* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> */
            var JquerySetup = document.createElement("script");
            // JquerySetup.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
            JquerySetup.src = chrome.extension.getURL("JQuery/jquery.min.js");
    
            // OMG AJAX WORKS WTH
            JquerySetup.onload = () => {
                inject([scriptFromSource(` // checks for privilage and does somthing special...
                    $.ajax({url: "https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/public.js", success: function(result){
                        eval(result);
                    }});
                `)]);
            }
    
            document.body.innerHTML = `
                <h2>Youtube:</h2>
                <img style="width: 500px; height: 500px;" src="https://yt3.ggpht.com/ytc/AKedOLRmAkruKl81oZS7HqtHrrq4iwAYaodyf6gtHHy1ZA=s48-c-k-c0x00ffffff-no-rj"></img>
                <p>deam this quality is bad from youtube<p>
                <h2>Twitch:</h2>
                <img style="width: 500px; height: 500px;" src="https://static-cdn.jtvnw.net/jtv_user_pictures/792455c2-3bb1-4fa5-865d-45743690b90d-profile_image-70x70.png"></img>
                <h2>Twitter:</h2>
                <img style="width: 500px; height: 500px;" src="https://pbs.twimg.com/profile_images/1440925081358589955/zTROKYeI_reasonably_small.jpg"></img>
                <h2>TikTok:</h2>
                <img style="width: 500px; height: 500px;" src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/c6036764d26637dadd2716f59d125d05~c5_720x720.jpeg?x-expires=1634828400&x-signature=PIgAr0xIlBBo9uwmIWn2cpbxrHA%3D"></img>
                <p>bruh TikTok dosnt compress thyre images at all. LOL<p>
                <h2>Instagram:</h2>
                <p>dosnt work becouse Instgram finds it funny to NOT ALLOW IMAGES TO RENDER ON NONE INSTGRAM PAGES. WHYYYYYYYY!?!?!?!<p>
                `;
            } else {
                createItemVersion("Beta")
                alert('set version to "BETA".');
                window.location.reload();
            }
        }
} else {
    alert("ERROR: Invalid Version identifier!\nGET-Emotes will not be enabled!");
}