function AddNewCostumeEmote(emotename, linkex) {

    // if (EmotesBlackList == null || EmotesBlackList == undefined) {
    //     setTimeout('AddNewCostumeEmote(''+emotename+'', ''+linkex+'')', 500);
    //     return
    // }
    NewEmotesBlackList = getValue(LocalStorageExtName).split(',');

    if (NewEmotesBlackList.includes(allLetter(emotename)) || getValue(LocalStorageExtName) == '*') {
        if (linkex == 'png') {
            MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew('"+emotename+"');'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg' class='UpdateViewNow' title='Block/Show emote'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume emote: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClick('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><hr></span>"
        } else if (linkex == 'gif') {
            MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew('"+emotename+"');'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_off_white.svg' class='UpdateViewNow' title='Block/Show emote'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume gif: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><hr></span>"
        }
        return
    }
    if (linkex == 'png') {
        MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew('"+emotename+"');'><img src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg' class='UpdateViewNow' title='Block/Show emote' alt='"+emotename+"'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume emote: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClick('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".png' alt='"+emotename+"'></img></span><hr></span>"
    } else if (linkex == 'gif') {
        MyEmotePicker.innerHTML += "<span><button onclick='HideShowEmoteNew('"+emotename+"');'><img class='IsEmoteActiveDis"+emotename+"' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/visibility_white.svg' class='UpdateViewNow' title='Block/Show emote' alt='"+emotename+"'></button>"+emotename+":<span class='Emotetooltip'><span class='Emotetooltiptext'>costume gif: "+emotename+"<br><img width='50' height='50' class='CostumeEmotesDis' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><img class='CostumeEmotes' onClick='EmoteClickGif('"+emotename+"')' src='https://raw.githubusercontent.com/Goldenegg000/TwitchEmote/main/"+emotename+".gif' alt='"+emotename+"'></img></span><hr></span>"
    }
}