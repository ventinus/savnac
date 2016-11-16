// Local dependency functions
// ________________________________________________________

const capitalizeFirstLetter = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

const toggleSingleClass = (el, className) => {
  el.classList.contains(className) ? el.classList.remove(className) : el.classList.add(className);
}



// Core Build of exports
// ________________________________________________________


/**
 * Adds an event listener to a selection of elements
 * @param  {DOM Elements} Collection of elements
 * @param  {String} Event type to bind to
 * @param  {Function} Callback to execute when event occurs
 * @param  {Object} Options to pass to addEventListener
 * @return {DOM Elements}
 */
const addEvent = (els, eventName, callback, options = {}) => {
  for (var i = els.length - 1; i >= 0; i--) {
    els[i].addEventListener(eventName, callback, options);
  }
  return els;
}

/**
 * Removes an event listener to a selection of elements
 * @param  {DOM Elements} Collection of elements
 * @param  {String} Event type to unbind to
 * @param  {Function} Callback to unbind
 * @param  {Object} Options to pass to removeEventListener
 * @return {DOM Elements}
 */
const removeEvent = (els, eventName, callback, options = {}) => {
  for (var i = els.length - 1; i >= 0; i--) {
    els[i].removeEventListener(eventName, callback, options);
  }
  return els;
}

/**
 * Adds a class to a set of elements
 * @param  {DOM Elements} Element collection to add a class to
 * @param  {String} Class desired to add
 * @return {DOM Elements}
 */
const addClass = (els, className) => {
  for (var i = els.length - 1; i >= 0; i--) {
    els[i].classList.add(className);
  }
  return els;
}

/**
 * Removes a class from a set of elements
 * @param  {DOM Elements} Element collection to remove class from
 * @param  {String} Class desired to remove
 * @return {DOM Elements}
 */
const removeClass = (els, className) => {
  for (var i = els.length - 1; i >= 0; i--) {
    els[i].classList.remove(className);
  }
  return els;
}

/**
 * Toggles the class of an element or a collection of DOM elements
 * @param  {DOM Element(s)} Element or collection of elements to toggleClass
 * @param  {String} Class to toggle on each element
 * @return {DOM Elements}
 */
const toggleClass = (els, className) => {
  if (!els.length) toggleSingleClass(els, className);

  for (var i = els.length - 1; i >= 0; i--) {
    toggleSingleClass(els[i], className);
  }
  return els;
}

// returns the index of the element in a set of elements
/**
 * Finds the index of an element in a collection of elements.
 * Returns -1 in the event the element is not found.
 * @param  {DOM Elements} Collection of elements to search through
 * @param  {DOM Element} Element to find the index of
 * @return {Integer}
 */
const elementIndex = (els, element) => {
  for (var i = els.length - 1; i >= 0; i--) {
    if (els[i] === element) return i;
  }
  return -1;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered.
 * Source: https://davidwalsh.name/javascript-debounce-function (also Underscore.js)
 * @param  {Function} func Function to execute once from a repeated event
 * @param  {Number} wait Triggers the function after N milliseconds
 * @param  {Boolean} immmediate If true, triggers the function on the leading edge instead of the trailing
 * @return {Function}
 */
const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    let context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

/**
 * Limits the rate of executions for a recurring event. Source: https://gist.github.com/epitron/5936762
 * Returns a new, throttled, function.
 * @param  {Number} delay A zero-or-greater delay in milliseconds. For event
 *                  callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean} no_trailing Optional, defaults to false. If no_trailing is
                    true, callback will only execute every `delay` milliseconds while the
                    throttled-function is being called. If no_trailing is false or
                    unspecified, callback will be executed one final time after the last
                    throttled-function call. (After the throttled-function has not been
                    called for `delay` milliseconds, the internal counter is reset)
 * @param  {Function} callback A function to be executed after delay milliseconds.
                      The `this` context and all arguments are passed through, as-is, to
                      `callback` when the throttled-function is executed.
 * @param {Something} debounce_mode [description]
 * @return {Function}
 */
const throttle = (delay, no_trailing, callback, debounce_mode) => {
  let timeout_id,
    last_exec = 0;

  if (typeof no_trailing !== 'boolean') {
    debounce_mode = callback;
    callback = no_trailing;
    no_trailing = undefined;
  }

  function wrapper() {
    let that = this,
      elapsed = +new Date() - last_exec,
      args = arguments;

    function exec() {
      last_exec = +new Date();
      callback.apply(that, args);
    }

    function clear() {
      timeout_id = undefined;
    }

    if (debounce_mode && !timeout_id) exec();

    timeout_id && clearTimeout( timeout_id );

    if (debounce_mode === undefined && elapsed > delay) {
      exec();
    } else if (no_trailing !== true) {
      timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
    }
  }

  if ($.guid)
    wrapper.guid = callback.guid = callback.guid || $.guid++;

  return wrapper;
};

/**
 * Determines the correct event that corresponds with CSS transitionend or animationend.
 * The argument can only be 'transition' or 'animation'. Returns false if none found.
 * @param  {String} property CSS property to get browser-specific event
 * @return {String}
 */
const getCssEndEvent = (property) => {
  if (property !== 'transition' && property !== 'animation')
    throw 'Property needs to be either transtion or animation';

  let o;
  let el = document.createElement('fakeelement');
  let options = {};
  let capitalizedProperty = capitalizeFirstLetter(property);
  options[`${property}`] = `${property}end`;
  options[`O${capitalizedProperty}`] = `o${capitalizedProperty}End`;
  options[`${capitalizedProperty}`] = `${property}end`;
  options[`${capitalizedProperty}`] = `webkit${capitalizedProperty}End`;

  for (o in options) {
    if (el.style[o] !== undefined) {
      return options[o];
    }
  }
  return false;
}

/**
 * Traverses up the DOM tree to find a parent element by checking the
 * classList of the parentElement against the targetClass. Returns -1
 * if none found.
 * @param  {DOM Element} startElement Starting element to start the search from
 * @param  {String} targetClass Class name to find the parentElement by
 * @return {DOM Element} Found parent element
 */
const findParentElement = (startElement, targetClass) => {
  let parentElement = startElement.parentElement;
  if (!parentElement) {
    return -1;
  } else if (parentElement.classList.contains(targetClass))  {
    return parentElement;
  }

  return findParentElement(parentElement, targetClass);
}


export {
  addEvent,
  removeEvent,
  addClass,
  removeClass,
  elementIndex,
  debounce,
  throttle,
  getCssEndEvent,
  findParentElement
};
