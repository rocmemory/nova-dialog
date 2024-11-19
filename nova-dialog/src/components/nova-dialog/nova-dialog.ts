import { defineComponent, ref, type PropType } from 'vue';
import { lazy } from '../../utils/lazy';

const __window_ins_dialog = window as any;
if (!__window_ins_dialog.zindex) __window_ins_dialog.zindex = 100;
const _vdialog_default_width = 600;

interface OffsetRect {
    left: number,
    top: number,
    right: number,
    bottom: number
}

export default defineComponent({

    name: 'nova-dialog',
    emits: ['opened', 'change', 'closed', 'update:modelValue'],

    setup() {
        return {
            nova_wrapper: ref<HTMLElement | null>(null),
            nova_player: ref<HTMLElement | null>(null),
            size: ref({
                width: _vdialog_default_width,
                height: 500,
                height_initial: 0
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
                flied: false,       //是否执行过绝对定位
                resizing: false,
                moving: false,
                moved: false,
                shaking: false,
                ready: true
            }),
            observer: <ResizeObserver><unknown>null
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
        /** 内边距风格或数值(slim|trim|large) */
        padding: {
            type: String as PropType<number | 'slim' | 'trim' | 'large'>,
            default: ''
        },
        /** 弹窗自定义类名 */
        customClass: {
            type: String,
            default: ''
        },
        nearby: {
            type: Object as PropType<HTMLElement>,
            default: null
        },
        offset: {
            type: Object as PropType<OffsetRect>,
            default: null
        },
        /** 弹窗容器的分类标识,用于存储状态和用户配置 */
        zone: {
            type: String,
            default: ''
        },
        /** 是否将弹窗插入至body元素上 */
        appendToBody: {
            type: Boolean,
            default: false
        },
        /** 视图堆叠顺序校正值 */
        zIndex: {
            type: Number,
            default: 0
        }
    },

    created() {
        this.onLoad();
    },

    mounted() {
        this.size.width = this.width || _vdialog_default_width;
        this.size.height = this.height || 0;
        this.size.height_initial = this.size.height;
        if (this.modelValue) this.onShown();
        window.addEventListener('resize', this.onResize);
    },

    unmounted() {
        window.removeEventListener("resize", this.onResize);
        this.onHide();
    },

    watch: {
        modelValue(val: boolean) {
            this.$nextTick().then(() => {
                if (val) {
                    this.onShown();
                }
                else {
                    this.onHide();
                }
            })
        },
        width(val: number) {
            if (val && this.drag.side <= 0) {
                this.size.width = val;
            }
        }
    },

    methods: {

        //#region LifeCycle

        //开始加载
        onLoad() {

        },

        //开始呈现
        onShown() {

            //更新堆叠层次
            this.pos.zindex++;

            //自动关闭
            if (this.timeout > 0) {
                setTimeout(() => {
                    this.close();
                }, this.timeout);
            }

            //记录初始高度
            if (this.size.height_initial) {
                this.size.height = this.size.height_initial;
            }

            //初始化状态值
            this.drag.side = 0;
            this.states.flied = false;
            this.states.resizing = false;
            this.states.moving = false;
            this.states.moved = false;
            this.states.shaking = false;

            //监视大小变化
            this.observer = new ResizeObserver(entries => this.onResize());
            this.observer.observe(this.nova_wrapper!);

            //尝试绝对定位
            this.flyto(this.nearby);

            //触发事件
            this.$emit('opened');

        },

        //结束呈现
        onHide() {
            this.observer?.disconnect();
        },

        //对话关闭
        onClosed() {
            this.$emit('closed');
        },

        //#endregion

        //#region Response

        //更新布局
        onResize($event?: UIEvent) {
            if (!this.modelValue) return;

            if ($event) {
                this.flyto(this.nearby);
                this.states.resizing = true;
            }

            if (!this.drag.side && !this.states.moved) {
                let width = this.nova_wrapper!.offsetWidth,
                    height = this.nova_wrapper!.offsetHeight;
                if (!this.size.height_initial && height > 6) {
                    this.size.height_initial = height - 6;
                }
                this.pos.left = (window.innerWidth - width) / 2;
                this.pos.top = (window.innerHeight - height) / 2;
            }

            lazy('nova-dialog-resize').then(() => {
                this.$emit('change', {
                    left: this.pos.left, top: this.pos.top,
                    width: this.size.width, height: this.size.height,
                    maximized: this.pos.maximized
                });
                this.states.resizing = false;
            })

        },

        //点击对话外
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

        //拖拽开始
        onDragStart(side: number, event: MouseEvent) {
            if (!this.movable) return;

            //变更拖拽状态标识
            this.drag.side = side;
            this.states.moving = side < 0; //拖拽标题栏移动

            //记录初始鼠标位置
            this.drag.point.x = event.clientX;
            this.drag.point.y = event.clientY;

            //获取目标元素的初始宽度和高度
            this.drag.record.left = this.pos.left;
            this.drag.record.top = this.pos.top;
            this.drag.record.width = this.size.width;
            this.drag.record.height = this.size.height || this.nova_player!.offsetHeight;

            //添加事件监听器，用于响应鼠标移动和鼠标释放事件
            document.addEventListener("mousemove", this.onDragging);
            document.addEventListener("mouseup", this.onDragEnd);

        },

        //拖拽移动
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

        //拖拽结束
        onDragEnd($event: MouseEvent) {

            let resizing = this.drag.side > 0;
            this.drag.side = 0;

            if (resizing) {
                this.onResize($event);
            }
            else {
                this.states.moving = false;
                this.states.moved = true;
            }

            document.removeEventListener("mousemove", this.onDragging);
            document.removeEventListener("mouseup", this.onDragEnd);

        },

        //#endregion

        //#region Exposes

        flyto(nearby: any) {

            let $target = typeof nearby == 'string' ? document.querySelector(nearby) : nearby;
            if ($target?.$el) $target = $target.$el;
            if (!$target) return;

            let rect = ($target as HTMLElement).getBoundingClientRect();
            let x = rect.x || rect.left,
                y = (rect.y || rect.top) + rect.height,
                w = this.nova_player!.offsetWidth || this.size.width,
                h = this.nova_player!.offsetHeight || this.size.height;
            if (x + w > window.innerWidth) x -= w;
            if (x < 0) x = 0;
            if (y + h > window.innerHeight) y = (rect.y || rect.top) - (h + rect.height);
            if (y < 0) y = 0;
            if (this.offset?.left) x += this.offset.left;
            if (this.offset?.top) y += this.offset.top;

            this.states.moved = true;
            this.pos.left = x;
            this.pos.top = y;

        },

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