import { r as registerInstance, h } from './index-de3229d4.js';

const sideDrawerCss = "aside{position:fixed;top:0;left:0;width:30rem;max-width:80%;height:100vh;background:#f3f3f3;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26)}";

const SideDrawer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.title = undefined;
  }
  // methods:
  render() {
    return (h("aside", null, h("header", null, h("h1", null, this.title)), h("main", null, h("slot", null))));
  }
};
SideDrawer.style = sideDrawerCss;

export { SideDrawer as uc_side_drawer };
