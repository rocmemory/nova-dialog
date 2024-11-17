import { defineComponent, ref, type PropType } from 'vue';
import { lazy } from '@/utils/lazy';

const __window_ins_dialog = window as any;
if (!__window_ins_dialog.zindex) __window_ins_dialog.zindex = 100;
const _vdialog_default_width = 600;

export default defineComponent({
    setup() {
        return {
            wrapper: ref<HTMLElement | null>(null),
            size: ref({
                width: _vdialog_default_width,
                height: 500
            }),
            pos: ref({
                left: 0,
                top: 0,
                center: true,
                maximized: false,
                zindex: ref(++__window_ins_dialog.zindex)
            }),
            drag: {
                side: 0,
                point: { x: 0, y: 0 },
                record: { left: 0, top: 0, width: 0, height: 0 }
            },
            states: ref({
                resizing: false,
                moving: false,
                shaking: false,
                ready: false
            })
        }
    },

    props: {
        /** 控制和响应弹出的变量 */
        modelValue: {
            type: Boolean,
            default: false
        },
        /** 弹窗标题,也可以通过#head重写 */
        title: {
            type: String,
            default: ''
        },
        /** 弹窗左上角显示的图标(见dialog-icon库) */
        icon: {
            type: String,
            default: ''
        },
        /** 初始宽度(默认为600) */
        width: {
            type: Number,
            default: _vdialog_default_width
        },
        /** 初始高度(初始为0,不限制) */
        height: {
            type: Number,
            default: 0
        },
        /** 是否呈现标题栏 */
        header: {
            type: Boolean,
            default: true
        },
        /** 是否启用关闭按钮 */
        closable: {
            type: Boolean,
            default: true
        },
        /** 标题栏是否包含最小化按钮 */
        minimize: {
            type: Boolean,
            default: false
        },
        /** 标题栏是否包含最大化按钮 */
        maximize: {
            type: Boolean,
            default: true
        },
        /** 是否支持拖拽标题栏移动弹窗 */
        movable: {
            type: Boolean,
            default: true
        },
        /** 是否支持拖拽边缘调整弹窗大小 */
        resizable: {
            type: Boolean,
            default: true
        },
        /** 点击弹窗外部时抖动 */
        shake: {
            type: Boolean,
            default: true
        },
        /** 显示暗色遮罩层 */
        mask: {
            type: Boolean,
            default: true
        },
        /** 是否为稳定弹出层(点击窗外不会关闭) */
        stable: {
            type: Boolean,
            default: true
        },
        /** 按下ESC键时关闭弹窗 */
        escape: {
            type: Boolean,
            default: true
        },
        /** 在指定毫秒数后自动关闭 */
        timeout: {
            type: Number,
            default: 0
        },
        /** 无内边距风格 */
        slim: {
            type: Boolean,
            default: false
        },
        /** 弹窗自定义类名 */
        customClass: {
            type: String,
            default: ''
        },
        /** 弹窗容器的分类标识,用于存储状态和用户配置 */
        zone: {
            type: String,
            default: ''
        }
    },

    created() {
        this.onLoad();
    },

    mounted() {
        this.size.width = this.width || _vdialog_default_width;
        this.size.height = this.height || 0;
        if (this.modelValue) this.onShown();
        window.addEventListener('resize', this.onCanvasResize);
    },

    unmounted() {
        window.removeEventListener("resize", this.onCanvasResize);
    },

    watch: {
        modelValue(val: boolean) {
            if (val) this.onShown();
        }
    },

    methods: {

        //#region LifeCycle

        onLoad() {

        },

        onShown() {
            this.pos.zindex++;
            if (this.timeout > 0) {
                setTimeout(() => {
                    this.close();
                }, this.timeout);
            }
            setTimeout(() => {
                this.onResize();
                this.states.ready = true;
            }, 1000);
        },

        onClosed() {
            this.$emit('closed');
        },

        //#endregion

        //#region Response

        onResize() {
            this.states.resizing = true;
            let width = this.wrapper!.offsetWidth,
                height = this.wrapper!.offsetHeight;
            this.pos.left = (window.innerWidth - width) / 2;
            this.pos.top = (window.innerHeight - height) / 2;
            setTimeout(() => {
                this.states.resizing = false;
            }, 800);
        },

        onCanvasResize() {
            lazy('dialog-canvas-resize').then(() => this.$emit('change'));
        },

        onHitOut() {
            if (this.stable) {
                if (this.shake) this.states.shaking = true;
                setTimeout(() => this.states.shaking = false, 1000);
            }
            else {
                this.close();
            }
        },

        //#endregion

        //#region Drag-Resize

        onDragStart(side: number, event: MouseEvent) {
            if (!this.states.ready) return;
            if (!this.movable) return;

            this.drag.side = side;
            this.states.moving = side < 0;

            //记录初始鼠标位置
            this.drag.point.x = event.clientX;
            this.drag.point.y = event.clientY;

            //获取目标元素的初始宽度和高度
            this.drag.record.left = this.pos.left;
            this.drag.record.top = this.pos.top;
            this.drag.record.width = this.size.width;
            this.drag.record.height = this.size.height;

            //添加事件监听器，用于响应鼠标移动和鼠标释放事件
            document.addEventListener("mousemove", this.onDragging);
            document.addEventListener("mouseup", this.onDragEnd);

        },

        onDragging(e: MouseEvent) {
            if (!this.drag.side) return;

            //计算鼠标移动的距离
            let dx = e.clientX - this.drag.point.x;
            let dy = e.clientY - this.drag.point.y;

            if (this.drag.side > 0) {
                //向上拖动时，减少高度并调整元素的上边界位置
                if ((this.drag.side & 1) > 0) {
                    this.size.height = this.drag.record.height - dy;
                    this.pos.top = this.drag.record.top + dy;
                }
                //向右拖动时，增加宽度
                if ((this.drag.side & 2) > 0) {
                    this.size.width = this.drag.record.width + dx;
                }
                //向下拖动时，增加高度
                if ((this.drag.side & 4) > 0) {
                    this.size.height = this.drag.record.height + dy;
                }
                //向左拖动时，减少宽度并调整元素的左边界位置
                if ((this.drag.side & 8) > 0) {
                    this.size.width = this.drag.record.width - dx;
                    this.pos.left = this.drag.record.left + dx;
                }
            }
            else {
                this.pos.left = this.drag.record.left + dx;
                this.pos.top = this.drag.record.top + dy;
            }

        },

        onDragEnd() {
            if (this.drag.side > 0) 
                this.onResize();
            else
                this.states.moving = false;
            this.drag.side = 0;
            document.removeEventListener("mousemove", this.onDragging);
            document.removeEventListener("mouseup", this.onDragEnd);
        },

        //#endregion

        //#region Exposes

        /** 最小化 */
        hide() {

        },

        /** 切换最大化和正常状态 */
        shift() {
            this.pos.maximized = !this.pos.maximized;
        },

        /** 关闭弹窗 */
        close() {
            this.$emit('update:modelValue', false);
            this.onClosed();
        }

        //#endregion

    }
})