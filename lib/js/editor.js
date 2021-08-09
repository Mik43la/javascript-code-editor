// retrieve elements 
const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn= document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// setup ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'console.log("Hello World!")';
let consoleMessages = [];
let editorLib = {
    clearConsoleScreen(){
        consoleMessages.length = 0;

        while(consoleLogList.firstChild){
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    }, 
    printToConsole(){
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class; 
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);
            consoleLogList.appendChild(newLogItem);
        })
    },

    init(){
        //configure ace 

        //theme
        codeEditor.setTheme("ace/theme/twilight");

        //set language
        codeEditor.session.setMode("ace/mode/javascript");
        
        // set options
        codeEditor.setOptions({
            fontFamily: 'Monospace',
            fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        //set default code
        codeEditor.setValue(defaultCode);
    }
}

//Events
executeCodeBtn.addEventListener('click', () =>{
    //get input from the code editor
    editorLib.clearConsoleScreen();
    const userCode = codeEditor.getValue();
    
    // run the user code

    try {
      new Function(userCode)();
    } catch (err) {
        console.error(err);
    }

    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () =>{
    // clear ace editor
    codeEditor.setValue(defaultCode);
    editorLib.clearConsoleScreen();
});
editorLib.init();