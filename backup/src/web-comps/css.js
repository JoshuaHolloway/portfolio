const get = (variable) => window.getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`);

const set = (variable, value) => document.documentElement.style.setProperty(`--${variable}`, value);

const css = { get, set }

export default css;