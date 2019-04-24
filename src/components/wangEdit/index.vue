<template>
    <div id="editor"></div>
</template>

<script>
    import EditorBar from 'wangeditor'
    export default {
        name: "wangEditor.vue",
        data () {
            return{
                text: ''
            }
        },
        created() {
            this.$nextTick(()=> {
                this.editor = new EditorBar('#editor');  //这个地方传入div元素的id 需要加#号
                this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
                this.editor.create()     // 生成编辑器
            })
        }
    }

</script>

<style scoped>

</style>