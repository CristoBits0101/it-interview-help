import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeNavigationDrawer } from '../src/shared/scripts/navigation-drawer.ts';

function withDrawer(mobile, run) {
  const original = new Map(['document', 'window'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const element = () => {
    const classes = new Set();
    return {
      listeners: new Map(), attributes: new Map(), style: {}, inert: false, hidden: false,
      classList: { add: value => classes.add(value), remove: value => classes.delete(value), contains: value => classes.has(value) },
      addEventListener(name, listener) { this.listeners.set(name, listener); },
      setAttribute(name, value) { this.attributes.set(name, value); },
      removeAttribute(name) { this.attributes.delete(name); },
      focus() { document.activeElement = this; },
      checkVisibility() { return !this.hidden; },
    };
  };
  const elements = new Map(['#sidebar', '#mobile-backdrop', '#mobile-toggle', '#sidebar-close', '.workspace', '#main'].map(selector => [selector, element()]));
  const sidebar = elements.get('#sidebar');
  const search = element();
  const brand = element();
  const document = { ...element(), documentElement: element(), body: element(), querySelector: selector => elements.get(selector) ?? null };
  sidebar.querySelector = () => brand;
  sidebar.querySelectorAll = selector => selector.includes('input') ? [search, brand] : [brand];
  if (mobile) document.documentElement.classList.add('sidebar-drawer');
  const key = (name, extra = {}) => ({ key: name, ctrlKey: false, metaKey: false, shiftKey: false, preventDefault() { this.defaultPrevented = true; }, ...extra });
  try {
    Object.defineProperty(globalThis, 'document', { configurable: true, value: document });
    Object.defineProperty(globalThis, 'window', { configurable: true, value: element() });
    const drawer = initializeNavigationDrawer(search);
    run({ drawer, document, elements, search, sidebar, brand, key });
  } finally {
    for (const [name, descriptor] of original) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
}

test('search shortcuts reveal the mobile drawer before focusing its input and Escape restores the opener', () => {
  for (const modifier of ['ctrlKey', 'metaKey']) {
    withDrawer(true, ({ document, elements, search, sidebar, key }) => {
      assert.equal(sidebar.inert, true);
      const shortcut = key('k', { [modifier]: true });
      document.listeners.get('keydown')(shortcut);
      assert.equal(shortcut.defaultPrevented, true);
      assert.equal(sidebar.inert, false);
      assert.equal(sidebar.classList.contains('mobile-open'), true);
      assert.equal(elements.get('.workspace').inert, true);
      assert.equal(document.activeElement, search);
      document.listeners.get('keydown')(key('Escape'));
      assert.equal(sidebar.inert, true);
      assert.equal(elements.get('.workspace').inert, false);
      assert.equal(document.activeElement, elements.get('#mobile-toggle'));
    });
  }
});

test('Enter from mobile search exposes the results and the input participates in focus wrapping', () => {
  withDrawer(true, ({ drawer, document, elements, search, sidebar, brand, key }) => {
    drawer.focusSearch();
    brand.focus();
    document.listeners.get('keydown')(key('Tab'));
    assert.equal(document.activeElement, search);
    search.listeners.get('keydown')(key('Enter'));
    assert.equal(sidebar.classList.contains('mobile-open'), false);
    assert.equal(elements.get('.workspace').inert, false);
    assert.equal(document.activeElement, elements.get('#main'));
  });
});

test('desktop search stays in the sidebar without enabling the mobile modal', () => {
  withDrawer(false, ({ drawer, document, elements, search, sidebar }) => {
    drawer.focusSearch();
    assert.equal(document.activeElement, search);
    assert.equal(sidebar.classList.contains('mobile-open'), false);
    assert.equal(elements.get('.workspace').inert, false);
  });
});
