<template>
    <div id="editor"></div>
</template>

<script>
    import EditorBar from 'wangeditor'
    export default {
        name: "wangEditor.vue",
        data () {
            return{
                text: '',
                editor: ''
            }
        },
        props: {
            value: {
                type: String,
            }
        },
        watch: {
            value: {
                deep:true,
                handler (newVal, oldVal) {
                    this.editor.txt.html(newVal);
                }
            }
        },
        created() {
            this.$nextTick(()=> {
                this.editor = new EditorBar('#editor');  //这个地方传入div元素的id 需要加#号
                this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
                this.editor.change = () => {          // 这里是change 不是官方文档中的 onchange
                // 编辑区域内容变化时，实时打s印出当前内容
                    this.$emit('input',this.editor.txt.html());
                    // console.log(this.editor.txt.html())
                };
                this.editor.create()     // 生成编辑器
            })
        }
    }

</script>

<style scoped>

</style>