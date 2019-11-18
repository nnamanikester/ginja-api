import events from "events";

class MyEmitter extends events.EventEmitter{}
// TODO: make singleton
export default new MyEmitter;