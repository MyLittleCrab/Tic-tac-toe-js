import IEventable from './IEventable';

export default class Eventable implements IEventable{

    private listeners: { [key: string]: Array<Function> };
    private disposableListeners: { [key: string]: Array<Function> };

    constructor(){
        this.listeners = {}; // event : [listener1(), listener2()]
        this.disposableListeners = {};
    }

    /**
     * Register listener on event
     *
     * @param {String} event
     * @param {function()} callback
     *
     * @memberOf Eventable
     */
    public on(event: string, callback: Function): void{
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    public onOnce(event: string, callback: Function): void{
        this.disposableListeners[event] = this.disposableListeners[event] || [];
        this.disposableListeners[event].push(callback);      
    }

    public onPromise(event: string): Promise<any>{
        return new Promise(resolve => {
            this.onOnce(event, resolve);
        })
    }
    /**
     * Remove listener on event
     *
     * @param {String} event
     * @param {function()} callback
     * @returns {Boolean}
     *
     * @memberOf Eventable
     */
    public off(event: string, callback: Function): boolean{
        const handlers = this.listeners[event];
        const disposableHandlers = this.disposableListeners[event];
        let isSuccess = false;

        if (handlers && handlers.length > 0){
            if (callback){
                this.listeners[event] = handlers.filter( handler => typeof handler === 'function' && handler !== callback );
                isSuccess = true;
            } else {
                this.listeners[event] = [];
                isSuccess = true;
            }            
        }

        if (disposableHandlers && disposableHandlers.length > 0){
            if (callback){
                this.disposableListeners[event] = disposableHandlers.filter( handler => typeof handler === 'function' && handler !== callback ); 
                isSuccess = true;
            } else {
                this.disposableListeners[event] = [];
                isSuccess = true;
            }
        }

        return isSuccess;
    }

    /**
     * Fire the event
     *
     * @param {String} event
     * @param {object[]} args
     *
     * @memberOf Eventable
     */
    protected trigger(event: string, ...args: Array<any>): void{
        const listeners = this.listeners[event] || [];
        listeners.forEach(listener => listener(...args));

        const disposableListeners = this.disposableListeners[event] || [];
        disposableListeners.forEach(listener => listener(...args));
        this.disposableListeners[event] = [];
    }
};