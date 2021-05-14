import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { testBS3, testNotBS3 } from '../../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/menu/link-to', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.owner.setupRouter();
  });

  testBS3('it has correct markup', async function (assert) {
    await render(hbs`
      <BsDropdown as |dd|>
        <dd.button>Dropdown</dd.button>
        <dd.menu as |menu|>
          <menu.item><menu.link-to @route="index">template block text</menu.link-to></menu.item>
        </dd.menu>
      </BsDropdown>`);
    await click('button');

    assert.dom('a').hasText('template block text');
    assert.dom('a.dropdown-item').doesNotExist('renders as plain element with no dropdown item class');
  });

  testNotBS3('it has correct markup', async function (assert) {
    await render(hbs`
      <BsDropdown as |dd|>
        <dd.button>Dropdown</dd.button>
        <dd.menu as |menu|>
          <menu.item><menu.link-to @route="index">template block text</menu.link-to></menu.item>
        </dd.menu>
      </BsDropdown>`);
    await click('button');

    assert.dom('a').hasText('template block text');
    assert.dom('a.dropdown-item').exists({ count: 1 }, 'renders as plain element with dropdown item class');
  });

  module('positional params', function (hooks) {
    hooks.afterEach(function (assert) {
      assert.deprecationsInclude(`Positional arguments for ember-bootstrap's link-to components are deprecated.`);
      assert.deprecationsInclude(`The \`query-params\` helper is deprecated.`);
    });
    test('simple route link', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item>{{#menu.link-to "index"}}Link{{/menu.link-to}}</menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasText('Link');
      assert.dom('a').hasAttribute('href', '/');
    });

    test('link with model', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item>{{#menu.link-to "acceptance.link" "1" (query-params foo="bar")}}Link{{/menu.link-to}}</menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    test('disabled link', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item>{{#menu.link-to "index" disabled=true}}Link{{/menu.link-to}}</menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').hasClass('disabled');
    });
  });

  module('<LinkTo> properties', function () {
    test('simple route link', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item><menu.link-to @route="index">Link</menu.link-to></menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasText('Link');
      assert.dom('a').hasAttribute('href', '/');
    });

    test('link with model', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item><menu.link-to @route="acceptance.link" @model="1" @query={{hash foo="bar"}}>Link</menu.link-to></menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    test('disabled link', async function (assert) {
      await render(hbs`
        <BsDropdown as |dd|>
          <dd.button>Dropdown</dd.button>
          <dd.menu as |menu|>
            <menu.item><menu.link-to @route="index" @disabled={{true}}>Link</menu.link-to></menu.item>
          </dd.menu>
        </BsDropdown>`);
      await click('button');

      assert.dom('a').hasClass('disabled');
    });
  });
});
