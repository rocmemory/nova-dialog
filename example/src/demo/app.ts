import { defineComponent, ref, type App } from 'vue';
import NovaDialog from 'nova-dialog';

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
        property: 'nearby',
        desc: 'if set, the dialog box pops up near the specified element',
        type: 'ref<HtmlElement>',
        initial: 'null'
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
        desc: 'whether the title bar contains a minimize button, not supported before version 2.x',
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
        desc: 'show the dark mask layer behind the dialog',
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
        desc: 'set a custom class name for the dialog wrapper, also: custom-class',
        type: 'string',
        initial: 'empty'
    },
    {
        property: 'zone',
        desc: 'classification identification, which used to store status and user configuration, not supported before version 2.x',
        type: 'string',
        initial: 'empty'
    },
    {
        property: 'appendToBody',
        desc: 'append dialog wrapper to body element, nested dialog boxes must be true',
        type: 'boolean',
        initial: 'false'
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
    setup() {
        return {
            help: ref({
                prop: help_prop,
                slot: help_slot,
                play: true
            }),
            values: ref({
                use_nearby: false,
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
            }),
            target: ref<HTMLElement>()
        }
    },

    components: {
        NovaDialog
    },

    mounted() {

        if (/mode\=simple/g.test(location.search)) {
            this.help.play = false;
        }

        let table: string[] = [];
        for (let row of help_prop) {
            table.push(`| ${row.property} | ${row.desc} | ${row.type} | ${row.initial} |`);
        }
        let note = table.join('\n');
        console.log('properties', note);

    },

    methods: {

        playCenter() {
            this.values.use_nearby = false;
            this.values.modelValue = true;
        },

        playNearby() {
            this.values.use_nearby = true;
            this.values.modelValue = true;
        }

    }
})