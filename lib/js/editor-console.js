let console = (function (oldConsole) {
    return {
        
        getType: function(arg){
                if (typeof arg ==  "string") return "string";
                if (typeof arg ==  "boolean") return "boolean";
                if (typeof arg ==  "function") return "function";
                if (typeof arg ==  "number") return "number";
                if (typeof arg ==  "undefined") return "undefined";
                if (typeof arg ==  "object" && !Array.isArray(arg)) return "object";
                if (typeof arg ==  "object" && Array.isArray(arg)) return "array";
                
        },
        logMultipleArguments: function(arguments){
            let currentLog = "";
            arguments.forEach( arg => {
               
               currentLog += arg;

            });

            oldConsole.log.apply(oldConsole, arguments);

            consoleMessages.push({
                message: currentLog,
                    class: `log log--default`
            });

            oldConsole.log(consoleMessages);
        },
        logSingleArgument: function (logItem) {
            oldConsole.log(logItem);
            consoleMessages.push({
                message: logItem,
             
                    class: `log log--${this.getType(logItem)}`
            });
            oldConsole.log(consoleMessages);

        },
        log : function (text) {
            oldConsole.log(text);
            let argsArray = Array.from(arguments);
            oldConsole.log(argsArray);
            return argsArray.length !== 1 ? this.logMultipleArguments(argsArray): 
                this.logSingleArgument(text);
        },
        info : function (text) {
            oldConsole.info(text);
        },
        warn : function (text) {
            oldConsole.warn(text);
        },
        error : function (text) {
            oldConsole.error(text);
            consoleMessages.push({
                message: `${err.name}: ${err.message}`,
                    class: "log log--error"
            });
        }
        
    }
})(window.console);