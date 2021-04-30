class FateCoreOfficialConstants { 

    static getFateLadder(){
        return  {
                    "10":"",
                    "9":"",
                    "8":game.i18n.localize("FateCoreOfficial.Legendary"),
                    "7":game.i18n.localize("FateCoreOfficial.Epic"),
                    "6":game.i18n.localize("FateCoreOfficial.Fantastic"),
                    "5":game.i18n.localize("FateCoreOfficial.Superb"),
                    "4":game.i18n.localize("FateCoreOfficial.Great"),
                    "3":game.i18n.localize("FateCoreOfficial.Good"),
                    "2":game.i18n.localize("FateCoreOfficial.Fair"),
                    "1":game.i18n.localize("FateCoreOfficial.Average"),
                    "0":game.i18n.localize("FateCoreOfficial.Mediocre"),
                    "-1":game.i18n.localize("FateCoreOfficial.Poor"),
                    "-2":game.i18n.localize("FateCoreOfficial.Terrible"),
                }
    }

    static getAdjective(r){
        const ladder = this.getFateLadder()
        return (ladder[r])
    }

    static getPen (id){
        let editor = $(`#${id}`)[0];
        var options = {
            editor: editor, // {DOM Element} [required]
            stay: false,
            class: 'pen', // {String} class of the editor,
            debug: false, // {Boolean} false by default
            textarea: '<textarea name="content"></textarea>', // fallback for old browsers
            linksInNewWindow: false // open hyperlinks in a new windows/tab
        }
        return new Pen(options);
    }

    static awaitOKDialog(prompt, content, width, height){
        if (width === undefined){
            width = "500";
        }
        if (height === undefined){
            height = "auto";
        }
        
        return new Promise(resolve => {
            new Dialog({
                title: prompt,
                content: content,
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.OK"),
                        callback: () => {
                            resolve("OK");
                        }
                    }
                },
                default:"ok",
                close: ()=> {resolve("OK)")},
            },
            {
                width:width,
                height:height,
            }).render(true);
        })
    }

    static awaitYesNoDialog(prompt, content){
        return new Promise(resolve => {
            new Dialog({
                title: prompt,
                content: content,
                buttons: {
                    yes: {
                        label: game.i18n.localize("FateCoreOfficial.Yes"),
                        callback: () => {
                            resolve("yes");
                        }
                    },
                    no: {
                        label: game.i18n.localize("FateCoreOfficial.No"),
                        callback: () => {
                            resolve("no");
                        }
                    }
                },
                default:"no",
                close: ()=> {resolve("no")},
            }).render(true);
        })
    }

    static awaitColourPicker(prompt){
        return new Promise(resolve => {
            new Dialog({
                title: prompt,
                content: '<input type="color" id="mf_cp" value="#000000"></input>',
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.OK"),
                        callback: () => {
                            resolve(document.getElementById("mf_cp").value)
                        }
                    }
                },
                default:"ok",
            }).render(true);
        })
    }

    static async confirmDeletion(){
        let confirm = game.settings.get("FateCoreOfficial","confirmDeletion");
        if (!confirm){
            return true;
        } else {
            let del = await FateCoreOfficialConstants.awaitYesNoDialog(game.i18n.localize("FateCoreOfficial.ConfirmDeletion"));
            if (del=="yes"){
                return true;
            } else {
                return false;
            }
        }
    }

    static getInput(prompt){        
        return new Promise(resolve => {
            new Dialog({
                title: prompt,
                content: '<div align="center"><input id="dialog_box" style="width:375px" autofocus></input></div>',
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.OK"),
                        callback: () => {
                            resolve(document.getElementById("dialog_box").value)
                        }
                    }
                },
                default:"ok"
            }).render(true);
        });
    }

    static getInputFromList(prompt, options){
        let optionsText = "";
        options.forEach(option =>{
            optionsText+=`<option>${option}</option>`
        })        
        return new Promise(resolve => {
            new Dialog({
                title: prompt,
                content: `<div align="center"><select id="dialog_box" style="width:375px">${optionsText}</select></div>`,
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.OK"),
                        callback: () => {
                            resolve(document.getElementById("dialog_box").value)
                        }
                    }
                },
                default:"ok"
            }).render(true);
        });
    }

    static updateText(prompt, textToUpdate){
    return new Promise(resolve => {
        new Dialog({
            title: prompt, 
            content: `<div style="background-color:white; color:black;"><textarea rows="10" style="font-family:Montserrat; width:382px; background-color:white; border:1px solid lightsteelblue; color:black;" id="get_text_box">${textToUpdate}</textarea></div>`,
            buttons: {
                ok: {
                    label: game.i18n.localize("FateCoreOfficial.Save"),
                    callback: () => {
                        resolve(document.getElementById("get_text_box").value)
                    }
                }
            },
        }).render(true);
    });
    }

    static updateShortText(prompt, textToUpdate){
        return new Promise(resolve => {
            new Dialog({
                title: prompt, 
                content: `<div style="background-color:white; color:black;"><textarea rows="1" style="font-family:Montserrat; width:382px; background-color:white; border:1px solid lightsteelblue; color:black;" id="get_text_box">${textToUpdate}</textarea></div>`,
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.Save"),
                        callback: () => {
                            resolve(document.getElementById("get_text_box").value)
                        }
                    },
                },
                default:"ok",
            }).render(true);
        });
        }

    static sortByKey(json_object){
        let ordered_object = {}
        let unordered_object = json_object;
        Object.keys(unordered_object).sort().forEach(function(key) {ordered_object[key] = unordered_object[key];})
        return ordered_object;
    }

    static sortByRank(json_object){
        //Sort a JSON object by rank.
        let toSort = []
        for (let x in json_object){
            toSort.push(json_object[x])
        }
        this.sort_rank(toSort);
        return toSort;
    }
    //Sort an array of JSON objects by object.name
    static async sort_name(array){
        array.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);//This actually properly sorts by name; case sensitive.
    }
    //Sort an array of JSON objects by object.rank
    static async sort_rank(array){
        array.sort((a, b) => parseInt(b.rank) - parseInt(a.rank));
    }

    //Sort an array of JSON objects by a key
    static async sort_key(array, key){
        array.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);//This actually properly sorts by name; case sensitive.
    }

    static moveKey (object, key, numPlaces){
        //If numPlaces is positive, we move down, if negative, up. 

        let current_object = object;
        let end_object = {};
        let key_to_move = key;
        let keys = Object.keys(current_object);

        let currentIndex = keys.indexOf(key);
        let newIndex = currentIndex + numPlaces;
        if (newIndex <0){
            newIndex = 0;
        }
        if (newIndex > keys.length){
            newIndex = keys.length;
        }

        let tempKey = keys.splice(currentIndex,1);
        keys.splice(newIndex, 0, tempKey[0]);

        //Now we iterate through the array and copy the keys to the new object, before assigning the old object to the new object to finish the job.

        keys.forEach(key => {
            end_object[key] = current_object[key]
        })
        
        return end_object;
    }

    static exportSettings (){
        //This function returns a text string in JSON notation containing all of the game's settings for backup or import into another world.
        let output = {};
        output.stunts = game.settings.get("FateCoreOfficial","stunts");
        output.skills = game.settings.get("FateCoreOfficial","skills");
        output.skillTotal = game.settings.get("FateCoreOfficial", "skillTotal");
        output.tracks = game.settings.get("FateCoreOfficial","tracks");
        output.aspects = game.settings.get("FateCoreOfficial","aspects");
        output.freeStunts = game.settings.get("FateCoreOfficial","freeStunts");
        output.refreshTotal = game.settings.get("FateCoreOfficial","refreshTotal");
        output.track_categories = game.settings.get("FateCoreOfficial","track_categories");
        return JSON.stringify(output);
    }

    static async getSettings (){
        return new Promise(resolve => {
            new Dialog({
                title: game.i18n.localize("FateCoreOfficial.PasteDataToOverwrite"),
                content: `<div style="background-color:white; color:black;"><textarea rows="20" style="font-family:Montserrat; width:382px; background-color:white; border:1px solid lightsteelblue; color:black;" id="import_settings"></textarea></div>`,
                buttons: {
                    ok: {
                        label: game.i18n.localize("FateCoreOfficial.Save"),
                        callback: () => {
                            resolve (document.getElementById("import_settings").value);
                        }
                    }
                },
            }).render(true)
        });
    }

    static async importSettings (input){
        //This function parses a text string in JSON notation containing all of the game's settings and writes those settings to System.settings.
        input = JSON.parse(input);
        await game.settings.set("FateCoreOfficial","stunts",input.stunts);
        await game.settings.set("FateCoreOfficial","skills",input.skills);
        await game.settings.set("FateCoreOfficial","skillTotal",input.skillTotal);
        await game.settings.set("FateCoreOfficial","tracks",input.tracks);
        await game.settings.set("FateCoreOfficial","aspects",input.aspects);
        await game.settings.set("FateCoreOfficial","freeStunts",input.freeStunts);
        await game.settings.set("FateCoreOfficial","refreshTotal",input.refreshTotal);
        await game.settings.set("FateCoreOfficial","track_categories",input.track_categories);
    }

    static async getMFSettings(){
            let settings = game.user.getFlag("world", "oldSettings");
            if (settings){
                settings.forEach(async s =>{
                    await game.settings.set("FateCoreOfficial", s.key, s.data)
                })
                game.user.unsetFlag("world", "oldSettings");
            }            
    }
} 