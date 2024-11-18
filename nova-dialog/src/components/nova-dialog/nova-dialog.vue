<template>
    <div v-show="modelValue" class="v-dialog-frame pos-fixed corner full scroll-n" :style="{ 'z-index': pos.zindex }">

        <!-- 控制区域 -->
        <div class="v-dialog-canvas pos-relative full scroll-n" :style="{ 'z-index': pos.zindex + 2 }"
             :class="{ 'max': pos.maximized }" @resize="resized">

            <!-- 暗色遮罩层 -->
            <div v-if="mask" class="v-dialog-mask pos-absolute corner full scroll-n" :style="{ 'z-index': pos.zindex + 1 }"
                 @click="onHitOut()">
            </div>

            <!-- 弹窗容器 -->
            <div v-if="modelValue" ref="wrapper" class="v-dialog-wrapper v-dialog-part part-wrapper pos-absolute scroll-n"
                 :class="[customClass, { 'anim': states.resizing, 'buzz': states.shaking }]"
                 :style="{
                    'left': `${pos.left}px`,
                    'top': `${pos.top}px`,
                    'width': `${size.width}px`,
                    'height': `${size.height}px`,
                    'z-index': pos.zindex + 3 
                 }"
                 @change="onResize">

                <!-- 弹窗顶部 -->
                <div class="v-dialog-part part-head v-dialog-head pos-relative" :class="{ 'height-hide': !header }">

                    <!-- 标题栏内容 -->
                    <div v-if="$slots.head" class="v-dialog-head-content custom" :class="{ 'move': states.moving }"
                         @mousedown.prevent="onDragStart(-1, $event)">
                        <slot name="head"></slot>
                    </div>
                    <div v-else class="v-dialog-head-content" :class="{ 'move': states.moving }"
                         @mousedown.prevent="onDragStart(-1, $event)">
                        <i v-if="icon" class="icon dialogfont" :class="`dialog-icon-${icon}`"></i>
                        <h1>{{ title }}</h1>
                    </div>

                    <!-- 标题栏按钮 -->
                    <div class="v-dialog-head-buttons pos-absolute">
                        <!-- 标题栏工具 -->
                        <div v-if="$slots.tool" class="toolkit">
                            <slot name="tool"></slot>
                        </div>
                        <!-- 弹窗控制按钮 -->
                        <button v-if="header" v-show="minimize" @click="hide()">
                            <i class="dialogfont dialog-icon-minimize"></i>
                        </button>
                        <button v-if="header" v-show="maximize" @click="shift()">
                            <i class="dialogfont" :class="`dialog-icon-${pos.maximized ? 'restore' : 'maximize'}`"></i>
                        </button>
                        <button v-if="closable" class="close" @click="close()">
                            <i class="dialogfont dialog-icon-close"></i>
                        </button>
                    </div>

                </div>

                <!-- 弹窗主体 -->
                <div class="v-dialog-part part-body v-dialog-content" :class="{ 'slim': slim }">
                    <slot></slot>
                </div>

                <!-- 弹窗底部 -->
                <div v-if="$slots.foot" class="v-dialog-part part-foot">
                    <slot name="foot"></slot>
                </div>

                <!-- 拖拽调整 -->
                <div v-if="!pos.maximized && resizable" class="resize-handle top"
                     @mousedown.prevent="onDragStart(1, $event)">
                </div>
                <div v-if="!pos.maximized && resizable" class="resize-handle right"
                     @mousedown.prevent="onDragStart(2, $event)">
                </div>
                <div v-if="!pos.maximized && resizable" class="resize-handle bottom"
                     @mousedown.prevent="onDragStart(4, $event)">
                </div>
                <div v-if="!pos.maximized && resizable" class="resize-handle left"
                     @mousedown.prevent="onDragStart(8, $event)">
                </div>
                <div v-if="!pos.maximized && resizable" class="resize-handle left bottom"
                     @mousedown.prevent="onDragStart(12, $event)">
                </div>
                <div v-if="!pos.maximized && resizable" class="resize-handle right bottom"
                     @mousedown.prevent="onDragStart(6, $event)">
                </div>

            </div>

        </div>

    </div>
</template>

<script src="./nova-dialog.ts"></script>
<style src="./nova-dialog.css" scoped></style>
<style src="./icon.css" scoped></style>