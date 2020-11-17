<template>
    <div>
        <h1>header</h1>
        <b-input-group
            v-for="size in headerData"
            :key="size"
            :size="size"
            class="mb-3"
            prepend="Header"
        >
            <b-form-input>{{headerData.header01}}</b-form-input>
            <b-input-group-append>
                <b-button size="sm" text="Button" variant="success">Button</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>
<script>
export default {
    name: 'ExampleHeader',
    data() {
        return {

        }
    },
    props: {
        headerData: {
            header01: {
                type: String,
                required: false
            },
            header02: {
                type: String,
                required: false
            }
        }
    }
}
</script>
<style scoped>

</style>