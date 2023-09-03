//create js element node thing with an html string

function create(htmlStr) {
    var frag = document.createDocumentFragment();
    var temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

//creates a new calculator window
var addCalculator = () => {
    let container = document.getElementById('main-container');
    let calculator = create(
        `<div class="part-container calculator" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Calculator</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Calculator/index.html"></iframe></div>`
    );
    container.appendChild(calculator);
};
window.addCalculator = addCalculator;

//creates a new snake windows
var addSnake = () => {
    let container = document.getElementById('main-container');
    let snake = create(
        `<div class="part-container snake" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Snake</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Snake/index.html"></iframe></div>`
    );
    container.appendChild(snake);
};
window.addSnake = addSnake;

var addDictionary = () => {
    let container = document.getElementById('main-container');
    let dictionary = create(
        `<div class="part-container dictionary" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Dictionary</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Dictionary/index.html"></iframe></div>`
    );
    container.appendChild(dictionary);
};
window.addDictionary = addDictionary;

var addNote = () => {
    let container = document.getElementById('main-container');
    let note = create(
        `<div class="part-container note" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Notes</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Notes/index.html"></iframe></div>`
    );
    container.appendChild(note);
};
window.addNote = addNote;

var addTimer = () => {
    let container = document.getElementById('main-container');
    let timer = create(
        `<div class="part-container timer" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Timer/Clock</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/ClockTimer/index.html"></iframe></div>`
    );
    container.appendChild(timer);
};
window.addTimer = addTimer;

//deletes window
var closeWindow = (element) => {
    element.parentNode.remove();
};
window.closeWindow = closeWindow;

//makes window go to top when clicked
var goTop = (element) => {
    //gets all of the elements
    let elements = document.getElementsByClassName('part-container');
    let zI = 0;
    //loop throught and find the highest z_index, and subtract one from other z_indexes
    //so the number will not increase
    for (let i = 0; i < elements.length; i++) {
        let index = parseInt(elements[i].style.zIndex);
        if (!index) {
            index = 0;
        }
        if (index > parseInt(element.style.zIndex) && element != elements[i]) {
            elements[i].style.zIndex = parseInt(elements[i].style.zIndex) - 1;
        }
        if (index > zI) {
            zI = index;
        }
    }
    //set the z_index of the element to be the hightest
    element.style.zIndex = zI;
    zI = 0;
};
window.goTop = goTop;

// returns the highest z-index so that all of the windows have differnt z-indexes
// used when new windows are added and makes it so that the windows all have different z_indexes
var returnTop = () => {
    let elements = document.getElementsByClassName('part-container');
    let zIndex = 0;
    for (let i = 0; i < elements.length; i++) {
        let index = parseInt(elements[i].style.zIndex);
        if (!index || index < 1) {
            index = 0;
            elements[i].style.zIndex = 0;
        }
        if (index > zIndex) {
            zIndex = index;
        }
    }

    return zIndex + 1;
};

//saving notes in localStorage so they don't disappear when reloaded
function saveWindow(posX, posY, zI, width, height, type) {
    this.posX = posX;
    this.posY = posY;
    this.zI = zI;
    this.width = width;
    this.height = height;
    this.type = type;
}

//makes json file and saves the windows in localStorages
function saveWindows() {
    let savedata = [];
    let savedWindows = document.getElementsByClassName('part-container');
    for (let i = 0; i < savedWindows.length; i++) {
        let win = savedWindows[i];
        savedata[i] = new saveWindow(
            win.style.left,
            win.style.top,
            win.style.zIndex,
            win.style.width,
            win.style.height,
            win.classList[1]
        );
    }
    localStorage.setItem('savedWindows', JSON.stringify(savedata));
}

//saves dark/light mode in localStorage
function saveTheme() {
    switch (appearance) {
        case 'auto':
            localStorage.setItem('theme', 'auto');
            break;
        default:
        case 'dark':
            localStorage.setItem('theme', 'dark');
            break;
        case 'light':
            localStorage.setItem('theme', 'light');
            break;
    }
}
//runs the saveWindows and saveTheme functions when page is reloaded
window.addEventListener('beforeUnload', () => {
    saveWindows();
    saveTheme();
});
window.addEventListener('unload', () => {
    saveWindows();
    saveTheme();
});

//loads in the saved windows
function loadWindows() {
    let savedata = JSON.parse(localStorage.getItem('savedWindows'));
    let container = document.getElementById('main-container');
    for (let i = 0; i < savedata.length; i++) {
        switch (savedata[i].type) {
            case 'calculator':
                let calculator = create(
                    `<div class="part-container calculator" onmousedown = "goTop(this)" style="z-index:${savedata[i]
                        .zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i]
                            .width};height:${savedata[i]
                                .height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Calculator</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Calculator/index.html"></iframe></div>`
                );
                container.appendChild(calculator);
                break;
            case 'dictionary':
                let dictionary = create(
                    `<div class="part-container dictionary" onmousedown = "goTop(this)" style="z-index:${savedata[i]
                        .zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i]
                            .width};height:${savedata[i]
                                .height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Dictionary</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Dictionary/index.html"></iframe></div>`
                );
                container.appendChild(dictionary);
                break;
            case 'snake':
                let snake = create(
                    `<div class="part-container snake" onmousedown = "goTop(this)" style="z-index:${savedata[i]
                        .zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i]
                            .width};height:${savedata[i]
                                .height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Snake</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Snake/index.html"></iframe></div>`
                );
                container.appendChild(snake);
                break;
            case 'note':
                let note = create(
                    `<div class="part-container note" onmousedown = "goTop(this)" style="z-index:${savedata[i]
                        .zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i]
                            .width};height:${savedata[i]
                                .height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Notes</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/Notes/index.html"></iframe></div>`
                );
                container.appendChild(note);
                break;
            case 'timer':
                let timer = create(
                    `<div class="part-container timer" onmousedown = "goTop(this)" style="z-index:${savedata[i]
                        .zI};left:${savedata[i].posX};top:${savedata[i].posY};width:${savedata[i]
                            .width};height:${savedata[i]
                                .height}"><div class="drag-bar" onmousedown="dragStart(this)"><p>Timer/Clock</p></div><button onclick="closeWindow(this)">×</button><iframe src="./src/Parts/ClockTimer/index.html"></iframe></div>`
                );
                container.appendChild(timer);
        }
    }
}

//loads the theme
function loadTheme() {
    let savedAppearance = localStorage.getItem('theme');
    switch (savedAppearance) {
        case 'auto':
            auto();
            break;
        case 'light':
            lightmode();
            break;
        case 'dark':
            darkmode();
    }
}

//loads windows when the website loads
window.addEventListener('load', () => {
    loadWindows();
    loadTheme();
});



function clearAllWindows() {
    document.getElementById("main-container").innerHTML = "";
}
window.clearAllWindows = clearAllWindows;


// key bindings

var updatePageRotation = true;

function changeUpdatePageRotation(condition) {
    updatePageRotation = condition;
}

window.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.keyCode == 78) {
        // new note 
        // shift + n
        addNote();
    }

    if (event.shiftKey && event.keyCode == 68) {
        // new dict
        // shift + d
        addDictionary();
    }

    if (event.shiftKey && event.keyCode == 67) {
        addCalculator();
    }

    if (event.shiftKey && event.keyCode == 84) {
        addTimer();
    }

    if (event.shiftKey && event.keyCode == 83) {
        addSnake();
    }

    // if(event.ctrlKey && event.keyCode == 82){
    //     event.preventDefault()
    //     if(updatePageRotation){
    //         changeUpdatePageRotation(false)
    //         document.body.classList.add("transform")
    //     }
    // }
});

// notifications

function checkNotificationPromise() {
    try {
        Notification.requestPermission().then();
    } catch (e) {
        return false;
    }

    return true;
}

function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
        // set the button to shown or hidden, depending on what the user answers
        if (Notification.permission === 'denied' || Notification.permission === 'default') {
        } else {
        }
    }

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
        console.log("This browser does not support notifications.");
    } else {
        if (checkNotificationPromise()) {
            Notification.requestPermission()
                .then((permission) => {
                    handlePermission(permission);
                });
        } else {
            Notification.requestPermission(function (permission) {
                handlePermission(permission);
            });
        }
    }
}


askNotificationPermission();