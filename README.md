# nova-dialog ![npm tag](https://img.shields.io/npm/v/nova-dialog.svg)
> Full-featured dialog box for [Vue.js](http://vuejs.org).

<p align="center">
  <img src="https://raw.githubusercontent.com/rocmemory/vue-nova-dialog/refs/heads/main/example/public/preview-new.gif" />
  <br/>
  <b>Check out the <a href="https://github.com/rocmemory/vue-nova-dialog/tree/main/example" target="_blank">live demo</a>.</b>
</p>

## Features

* Drag the title bar to move.
* Drag edges to change the size.
* Customize the header/toolbar/footer content.
* Automatic center alignment with animation.
* Click outside triggers the shaking animation.
* Append to body, or popup near an element.
* Minimize, Maximize and Restore buttons.

## Installation
```bash
$ npm install nova-dialog
```

## Using nova-dialog

First, import `vue-multipane` into your Vue component.
```js
import NovaDialog from 'nova-dialog';

export default {
  // ...
  components: {
    NovaDialog
  }
}
```

Then, construct your dialog using the component.
```html
<nova-dialog v-model="dialog.play" :title="dialog.title" icon="plane"
            :width="700" :maximize="true"
            :movable="true" :resizable="true" :shake="true" :stable="true"
            :custom-class="dialog-green" :zone="editor">
  <div>
      <span>contents inside the dialog</span>
  </div>
</nova-dialog>
```

## Customizing
You can customize content of slots.

* Use slot #head will replace the title content.
* Use slot #tool will generate a toolbox in the title bar.
* Content of slot #foot has a right alignment.
* Directly put content in the compoment or use slot #default.

This example below shows all of the slot-usage:
```html
<nova-dialog v-model="dialog.play" :width="700">
  <template #tool>
      <span>i am the tool box</span>
  </template>
  <template #foot>
      <el-button type="primary">submit</el-button>
      <el-button @click="dialog.play = false">cancel</el-button>
  </template>
  <div>
      <span>contents inside the dialog</span>
  </div>
</nova-dialog>

```

## Properties

|    Property    |    Description   |   Type     |  Default     |
| -------------- | ---------------- | :--------: | :----------: |
| modelValue | determine if the dialog displays, also: v-model | boolean | false |
| title | content show in the title bar, can replace with slot of #title | string | empty |
| icon | if set, will shows before the title, see icons in icon.css | string | empty |
| width | initial width for the dialog wrapper | number | 600 |
| height | initial height for the dialog wrapper, set 0 means auto-height | number | 0 |
| header | determine if the dialog has a title bar | boolean | true |
| minimize | whether the title bar contains a minimize button, not supported before version 2.x | boolean | false |
| maximize | whether the title bar contains a maximize button | boolean | true |
| closable | whether the title bar contains a close button | boolean | true |
| movable | when mouse down at the title bar, dialog moves | boolean | true |
| resizable | drag and drop dialog edges to resize | boolean | true |
| shake | when click outside the dialog, it shakes | boolean | true |
| mask | show the dark mask layer behind the dialog | boolean | true |
| stable | click outside the dialog will not close the dialog | boolean | true |
| escape | press the esc key will close the dialog | boolean | true |
| timeout | after some milliseconds the dialog close automatically | number | 0 |
| slim | if set to true, the inside margin is very small | boolean | false |
| custom-class | set a custom class name for the dialog wrapper, also: custom-class | string | empty |
| append-to-body | append dialog wrapper to body element, nested dialog boxes must be true | boolean | false |
| nearby | if set, the dialog box pops up near the specified element | ref<HtmlElement> | null |
| offset | when under nearby mode, offset({ left, top }) of the position | { left, top } | null |
| zone | classification identification, which used to store status and user configuration, not supported before version 2.x | string | empty |

## Events

|    Event           |    Description   |   Returns  |
| ------------------ | ---------------- | :--------: |
| closed    | When the dialog has been destoyed. | void |
| change         | When user drags the dialog. | posision, size |

## Exposes

|    Method           |    Description   |   Params  |
| ------------------ | ---------------- | :--------: |
| hide    | Make the dialog invisible. | none |
| shift         | When user drags the dialog. | none |
| close         | Toggle between maximum and normal state. | none |

## License
**[nova-dialog](https://github.com/rocmemory/vue-nova-dialog)** by [mengyaming](https://twitter.com/mengyaming) licensed under [MIT](LICENSE).

> PS: I would love to know if you're using nova-dialog. Send mail to [mengyaming@live.com](mengyaming@live.com).