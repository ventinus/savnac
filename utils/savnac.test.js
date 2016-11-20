import * as savnac from './savnac.js';

document.body.innerHTML =
  '<div>' +
  '  <div id="list">' +
  '    <div></div>' +
  '    <div></div>' +
  '    <div></div>' +
  '  </div>'+
  '  <div class="tree">'+
  '    <div>'+
  '      <div>'+
  '        <div>'+
  '          <div>'+
  '            <div>'+
  '              <div>'+
  '                <div>'+
  '                  <div class="tree-child"></div>'+
  '                </div>'+
  '              </div>'+
  '            </div>'+
  '          </div>'+
  '        </div>'+
  '      </div>'+
  '    </div>'+
  '  </div>'+
  '</div>';

let list = document.getElementById('list');
let listChildren = list.children;
let tree = document.querySelector('.tree');
let treeChild = tree.querySelector('.tree-child');


const constants = {
  ADDED_CLASS: 'addedClass',
  SINGLE_TOGGLE_CLASS: 'singleToggle',
  TOGGLED_CLASS: 'toggledClass',
  FUN_CLASS: 'funClass'
};

// savnac.addClass
test('adds class to list children', () => {
  savnac.addClass(listChildren, constants.ADDED_CLASS);

  for (let child of listChildren) {
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(true);
  }
})

// savnac.removeClass
test('removes class to list children', () => {
  savnac.removeClass(listChildren, constants.ADDED_CLASS);

  for (let child of listChildren) {
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(false);
  }
})

// savnac.toggleSingleClass
test('toggles class of list element', () => {
  savnac.toggleSingleClass(list, constants.SINGLE_TOGGLE_CLASS);
  expect(list.classList.contains(constants.SINGLE_TOGGLE_CLASS)).toEqual(true);

  savnac.toggleSingleClass(list, constants.SINGLE_TOGGLE_CLASS);
  expect(list.classList.contains(constants.SINGLE_TOGGLE_CLASS)).toEqual(false);
})

// savnac.toggleClass
test('toggles class of list children', () => {
  savnac.toggleClass(listChildren, constants.TOGGLED_CLASS);

  for (let child of listChildren) {
    expect(child.classList.contains(constants.TOGGLED_CLASS)).toEqual(true)
  }

  savnac.toggleClass(listChildren, constants.TOGGLED_CLASS);

  for (let child of listChildren) {
    expect(child.classList.contains(constants.TOGGLED_CLASS)).toEqual(false)
  }
})

// savnac.checkForClass
test(`checks list children to have ${constants.FUN_CLASS} class`, () => {
  expect(savnac.checkForClass(listChildren, constants.FUN_CLASS)).toBe(false);

  listChildren[1].classList.add(constants.FUN_CLASS);

  expect(savnac.checkForClass(listChildren, constants.FUN_CLASS)).toBe(true);
})

// savnac.findParentElement
test('finds a parent element', () => {
  expect(savnac.findParentElement(treeChild, 'tree')).toEqual(tree);
  expect(savnac.findParentElement(treeChild, 'nothing')).toEqual(-1);
})

// savnac.capitalizeFirstLetter
test('capitalizes first letter', () => {
  expect(savnac.capitalizeFirstLetter('string')).toBe('String');
  expect(savnac.capitalizeFirstLetter('myString')).toBe('MyString');
})

// savnac.elementIndex
test('returns index of an element in a group', () => {
  expect(savnac.elementIndex(listChildren, listChildren[2])).toBe(2);
})

// savnac.addEvent
// savnac.removeEvent

// savnac.debounce
// savnac.throttle
// savnac.getCssEndEvent
// savnac.controller
// savnac.isIE11
// savnac.isAndroid
