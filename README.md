# README

## About

Repository for sticky notes project

A screen where you can add different types of notes for various functions

[x]Notes
[x]Dictionary
[x]Calculator
[x]Timer
[x]Snake
[]Integral/Derivative calculator
[]Math Symbolizer
_more to be added later_

## Building

To build a redistributable, production mode package, use `wails build`.

## Development

Functions called within top index.html must be posted into global window for html to be able to access.
Standalone web pages put in _PARTS_ folder of _SRC_ to be displayed through iframes of main program.
To add new note type must create add function for note in window.js using template for creating the iframe.
```
var add[FunctionName] = () => {
    let container = document.getElementById('main-container');
    let [newNoteType] = create(
        `<div class="part-container [newNoteType]" onmousedown = "goTop(this)" style="z-index:${returnTop()}"><div class="drag-bar" onmousedown="dragStart(this)"><p>[Note Title]</p></div><button onclick="closeWindow(this)">×</button><iframe src="[link to source code in Parts folder]"></iframe></div>`
    );
    container.appendChild([newNoteType]);
};
window.add[FunctionName] = add[FunctionName];
```