// event_name: string
const fireEvent = (event_name) => {
  const event = new Event(event_name);
  document.dispatchEvent(event);
};

const listenForEvent = (event_name, fn) => {
  document.addEventListener(event_name, e => fn(e), false);
};

export { fireEvent, listenForEvent };