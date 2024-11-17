import { defineComponent, ref, type App } from 'vue';
import NovaDialog from '@/components/nova-dialog/nova-dialog.vue';

const help_prop = [
    {
        property: 'modelValue',
        desc: 'determine if the dialog displays, also: v-model',
        type: 'boolean',
        initial: 'false'
    },
    {
        property: 'title',
        desc: 'content show in the title bar, can replace with slot of #title',
        type: 'string',
        initial: 'empty'
    },
    {
        property: 'icon',
        desc: 'if set, will shows before the title, see icons in icon.css',
        type: 'string',
        initial: 'empty'
    },
    {
        property: 'width',
        desc: 'initial width for the dialog wrapper',
        type: 'number',
        initial: '600'
    },
    {
        property: 'height',
        desc: 'initial height for the dialog wrapper, set 0 means auto-height',
        type: 'number',
        initial: '0'
    },
    {
        property: 'header',
        desc: 'determine if the dialog has a title bar',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'minimize',
        desc: 'whether the title bar contains a minimize button',
        type: 'boolean',
        initial: 'false'
    },
    {
        property: 'maximize',
        desc: 'whether the title bar contains a maximize button',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'closable',
        desc: 'whether the title bar contains a close button',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'movable',
        desc: 'when mouse down at the title bar, dialog moves',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'resizable',
        desc: 'drag and drop dialog edges to resize',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'shake',
        desc: 'when click outside the dialog, it shakes',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'mask',
        desc: 'show the dark mask layer under the dialog',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'stable',
        desc: 'click outside the dialog will not close the dialog',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'escape',
        desc: 'press the esc key will close the dialog',
        type: 'boolean',
        initial: 'true'
    },
    {
        property: 'timeout',
        desc: 'after some milliseconds the dialog close automatically',
        type: 'number',
        initial: '0'
    },
    {
        property: 'slim',
        desc: 'if set to true, the inside margin is very small',
        type: 'boolean',
        initial: 'false'
    },
    {
        property: 'customClass',
        desc: 'set a custom class name for the dialog wrapper',
        type: 'string',
        initial: 'empty'
    },
    {
        property: 'zone',
        desc: 'classification identification, which used to store status and user configuration',
        type: 'string',
        initial: 'empty'
    }
]
const help_slot = [
    {
        name: 'default',
        desc: 'content of the dialog',
        usage: '<div></div> or <template #default></template>'
    },
    {
        name: 'head',
        desc: 'replace the title content',
        usage: '<template #head></template>'
    },
    {
        name: 'tool',
        desc: 'inject some buttons in title bar',
        usage: '<template #tool></template>'
    },
    {
        name: 'foot',
        desc: 'content of the dialog footer',
        usage: '<template #foot></template>'
    }
]

export default defineComponent({
    data() {
        return {
            help: ref({
                prop: help_prop,
                slot: help_slot
            }),
            values: ref({
                modelValue: false,
                title: 'i am a dialog',
                icon: 'light',
                width: 700,
                height: 500,
                header: true,
                closable: true,
                minimize: false,
                maximize: true,
                movable: true,
                resizable: true,
                shake: true,
                mask: true,
                stable: true,
                escape: true,
                timeout: 0,
                slim: false,
                customClass: '',
                zone: ''
            })
        }
    },

    components: {
        NovaDialog
    }
})