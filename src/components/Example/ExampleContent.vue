<template>
    <div>
        content
    </div>
</template>
<script>
export default {
    name: 'ExampleContent',
    data() {
        return {}
    },
    props: {
        contentData: {
            content01: {
                type: String,
                required: false
            },
            content02: {
                type: String,
                required: false
            }
        }
    }
}
</script>
<style scoped>

</style>