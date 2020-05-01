export const JSX = {
  createElement: function (tag, attrs = {}, ...children) {
    var elem: HTMLElement;
    if (typeof(tag) === "string") {
      // if an HTML tag was passed, simply create a matching element
      elem = Object.assign(document.createElement(tag), attrs);
    } else {
      // if something else was passed, it was likely a function that will return an HTML element,
      // so try to evaluate it
      try {
        elem = tag(attrs);
        for (let [key, value] of Object.entries(attrs)) {
          // @ts-ignore
          elem[key] = value;
        }        
      } catch(err) {
        console.log(err);
        // if it cannot be evaluated, return something so as not to break the application
        return Object.assign(document.createElement("div"));
      }
    }
    for (const child of children) {
      if (Array.isArray(child))
        elem.append(...child);
      else
        elem.append(child);
    }
    return elem;
  }
};

export default { JSX };
