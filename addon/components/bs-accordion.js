import { action } from '@ember/object';
import Component from '@glimmer/component';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';
import { localCopy } from 'tracked-toolbox';

/**
  Bootstrap-style [accordion group](http://getbootstrap.com/javascript/#collapse-example-accordion),
  with collapsible/expandable items.

  ### Usage

  Use as a block level component with any number of yielded [Components.AccordionItem](Components.AccordionItem.html)
  components as children:

  ```handlebars
  <BsAccordion as |acc|>
    <acc.item @value={{1}} @title="First item">
      <p>Lorem ipsum...</p>
      <button {{on "click" (fn acc.change 2)}}>
        Next
      </button>
    </acc.item>
    <acc.item @value={{2}} @title="Second item">
      <p>Lorem ipsum...</p>
    </acc.item>
    <acc.item @value={{3}} @title="Third item">
      <p>Lorem ipsum...</p>
    </acc.item>
  </BsAccordion>
  ```

  In the example above the first accordion item utilizes the yielded `change` action to add some custom behaviour.

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Accordion
  @namespace Components
  @extends Glimmer.Component
  @public
*/
@deprecateSubclassing
export default class Accordion extends Component {
  /**
   * The value of the currently selected accordion item. Set this to change selection programmatically.
   *
   * When the selection is changed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onChange` action
   *
   * @property selected
   * @public
   */

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */

  /**
   * The value of the currently selected accordion item
   *
   * @property isSelected
   * @private
   */
  @localCopy('args.selected')
  isSelected;

  /**
   * Action when the selected accordion item is about to be changed.
   *
   * You can return false to prevent changing the active item, and do that in your action by
   * setting the `selected` accordingly.
   *
   * @event onChange
   * @param newValue
   * @param oldValue
   * @public
   */

  @action
  doChange(newValue) {
    let oldValue = this.isSelected;
    if (oldValue === newValue) {
      newValue = null;
    }
    if (this.args.onChange?.(newValue, oldValue) !== false) {
      this.isSelected = newValue;
    }
  }
}
