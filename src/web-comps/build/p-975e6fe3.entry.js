import{r as t,h as s}from"./p-33712fd5.js";const i=class{constructor(s){t(this,s),this.first=void 0,this.middle=void 0,this.last=void 0}getText(){return(this.first||"")+((t=this.middle)?` ${t}`:"")+((s=this.last)?` ${s}`:"");var t,s}render(){return s("div",null,"Hello, World! I'm ",this.getText())}};i.style=":host{display:block}";const o=class{constructor(s){t(this,s),this.title=void 0,this.open=void 0}render(){let t=null;return this.open&&(t=s("aside",null,s("header",null,s("h1",null,this.title)),s("main",null,s("slot",null)))),t}};o.style="aside{position:fixed;top:0;left:0;width:30rem;max-width:80%;height:100vh;background:#f3f3f3;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26)}";export{i as my_component,o as uc_side_drawer}