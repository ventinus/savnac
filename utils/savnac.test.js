import * as savnac from './savnac.js';

document.body.innerHTML =
  '<div id="main">' +
  '  <div id="list">' +
  '    <button type="button"></button>' +
  '    <button type="button"></button>' +
  '    <button type="button"></button>' +
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

let main = document.getElementById('main');
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
  for (let child of listChildren)
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(false);

  savnac.addClass(listChildren, constants.ADDED_CLASS);

  for (let child of listChildren)
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(true);
})

// savnac.removeClass
test('removes class to list children', () => {
  for (let child of listChildren)
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(true);

  savnac.removeClass(listChildren, constants.ADDED_CLASS);

  for (let child of listChildren)
    expect(child.classList.contains(constants.ADDED_CLASS)).toEqual(false);
})

// savnac.toggleSingleClass
test('toggles class of list element', () => {
  expect(list.classList.contains(constants.SINGLE_TOGGLE_CLASS)).toEqual(false);

  savnac.toggleSingleClass(list, constants.SINGLE_TOGGLE_CLASS);
  expect(list.classList.contains(constants.SINGLE_TOGGLE_CLASS)).toEqual(true);

  savnac.toggleSingleClass(list, constants.SINGLE_TOGGLE_CLASS);
  expect(list.classList.contains(constants.SINGLE_TOGGLE_CLASS)).toEqual(false);
})

// savnac.toggleClass
test('toggles class of list children', () => {
  for (let child of listChildren)
    expect(child.classList.contains(constants.TOGGLED_CLASS)).toEqual(false)

  savnac.toggleClass(listChildren, constants.TOGGLED_CLASS);

  for (let child of listChildren)
    expect(child.classList.contains(constants.TOGGLED_CLASS)).toEqual(true)

  savnac.toggleClass(listChildren, constants.TOGGLED_CLASS);

  for (let child of listChildren)
    expect(child.classList.contains(constants.TOGGLED_CLASS)).toEqual(false)
})

// savnac.checkForClass
test(`checks list children to have ${constants.FUN_CLASS} class`, () => {
  expect(savnac.checkForClass(listChildren, constants.FUN_CLASS)).toBe(false);

  listChildren[1].classList.add(constants.FUN_CLASS);

  expect(savnac.checkForClass(listChildren, constants.FUN_CLASS)).toBe(true);
})

// savnac.findParentElement
describe('finds a parent element', () => {
  it('finds parent by class', () => {
    expect(savnac.findParentElement(treeChild, '.tree')).toEqual(tree);
  })

  it('does not find a parent by class', () => {
    expect(savnac.findParentElement(treeChild, '.nothing')).toEqual(-1);
  })

  it('finds a parent by id', () => {
    expect(savnac.findParentElement(treeChild, '#main')).toEqual(main);
  })

  it('throws an invalid selection error', () => {
    expect(() => {
      savnac.findParentElement(treeChild, 'main');
    }).toThrowError('targetSelector needs to start with a "#" or "."');
  })
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

describe('it adds/removes event listeners to a group of elements', () => {
  const onClick = (e) => {
    if (e.currentTarget.innerHTML === '') {
      e.currentTarget.innerHTML = 0;
    } else {
      +e.currentTarget.innerHTML++;
    }
  }

  const onClickWithIndex = (index, e) => { e.currentTarget.innerHTML = index; }

  // savnac.addEvent
  it('adds a click handler to the buttons', () => {
    savnac.addEvent(listChildren, 'click', onClick);
    for (let button of listChildren) {
      expect(button.innerHTML).toEqual('');
      button.click();
      expect(+button.innerHTML).toEqual(0);
      button.click();
      expect(+button.innerHTML).toEqual(1);
      button.innerHTML = '';
    }
  })

  it('adds a click handler to the buttons binding the index', () => {
    savnac.addEvent(listChildren, 'click', onClickWithIndex, true);
    for (let i = listChildren.length - 1; i >= 0; i--) {
      expect(listChildren[i].innerHTML).toEqual('');
      listChildren[i].click();
      expect(+listChildren[i].innerHTML).toEqual(i);
      listChildren[i].innerHTML = '';
    }
  })

  // savnac.removeEvent, the onClickWithIndex is persistent,
  // but lets test that part and make sure
  it('removes event handler from buttons', () => {
    for (let i = listChildren.length - 1; i >= 0; i--) {
      expect(listChildren[i].innerHTML).toEqual('');
      listChildren[i].click();
      expect(+listChildren[i].innerHTML).toEqual(i);
    }

    savnac.removeEvent(listChildren, 'click', onClickWithIndex, true);

    for (let i = listChildren.length - 1; i >= 0; i--) {
      expect(+listChildren[i].innerHTML).toEqual(i);
      listChildren[i].click();
      expect(+listChildren[i].innerHTML).toEqual(i);
      listChildren[i].innerHTML = '';
    }
  })
})


// savnac.debounce
// savnac.throttle
// savnac.getCssEndEvent
// savnac.controller
// savnac.isIE11
// savnac.isAndroid
