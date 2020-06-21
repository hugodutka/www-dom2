export const JSX = {
  createElement: (tag, attrs = {}, ...children) => {
    attrs = attrs || {};
    var elem: HTMLElement;
    if (typeof tag === "string") {
      // if an HTML tag was passed, simply create a matching element
      elem = Object.assign(document.createElement(tag), attrs);
    } else {
      // if something else was passed, it was likely a function that will return an HTML element,
      // so try to evaluate it
      try {
        const htmlAttrs = attrs.hasOwnProperty("html") ? attrs["html"] : {};
        elem = Object.assign(tag(attrs), htmlAttrs);
      } catch (err) {
        console.log(err);
        // if it cannot be evaluated, return something so as not to break the application
        return document.createElement("div");
      }
    }
    for (const child of children) {
      if (Array.isArray(child)) elem.append(...child);
      else elem.append(child);
    }
    return elem;
  },
};
