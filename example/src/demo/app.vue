<template>
    <div class="demo">

        <label class="title-major para" v-show="help.play">Nova Dialog for vue <a>@mengyaming</a></label>

        <el-button class="para" type="primary" @click="playCenter()">create a dialog</el-button>
        <el-button ref="target" class="para" type="primary" @click="playNearby()">popup nearby</el-button>

        <label class="title-minor para" v-show="help.play">properties</label>
        <el-table :data="help.prop" class="para" border v-show="help.play">
            <el-table-column min-width="15%" prop="property" label="property">
            </el-table-column>
            <el-table-column min-width="30%" prop="desc" label="desc">
            </el-table-column>
            <el-table-column min-width="15%" prop="type" label="type">
            </el-table-column>
            <el-table-column min-width="20%" prop="initial" label="default">
            </el-table-column>
            <el-table-column min-width="20%" label="current">
                <template #default="{ row }">
                    <el-input v-if="row.type == 'string'" v-model="values[row.property]"></el-input>
                    <el-input v-if="row.type == 'number'" v-model="values[row.property]" type="number"></el-input>
                    <el-switch v-if="row.type == 'boolean'" v-model="values[row.property]"></el-switch>
                    <el-button v-if="row.type == 'ref<HtmlElement>'" @click="playNearby()"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <label class="title-minor para" v-show="help.play">slot</label>
        <el-table :data="help.slot" class="para last" border v-show="help.play">
            <el-table-column min-width="15%" prop="name" label="name">
            </el-table-column>
            <el-table-column min-width="40%" prop="desc" label="desc">
            </el-table-column>
            <el-table-column min-width="45%" prop="usage" label="usage">
            </el-table-column>
        </el-table>

        <nova-dialog v-model="values.modelValue"
                     :title="values.title"
                     :icon="values.icon"
                     :width="values.width"
                     :height="values.height"
                     :header="values.header"
                     :closable="values.closable"
                     :minimize="values.minimize"
                     :maximize="values.maximize"
                     :movable="values.movable"
                     :resizable="values.resizable"
                     :shake="values.shake"
                     :mask="values.mask"
                     :stable="values.stable"
                     :escape="values.escape"
                     :timeout="values.timeout"
                     :slim="values.slim"
                     :customClass="values.customClass"
                     :zone="values.zone"
                     :nearby="values.use_nearby ? target : null">
            <template #tool>
                <span>i am the tool box</span>
            </template>
            <template #foot>
                <el-button type="primary">submit</el-button>
                <el-button @click="values.modelValue = false">cancel</el-button>
            </template>
            <div>
                <span>contents inside the dialog</span>
            </div>
        </nova-dialog>

    </div>
</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>