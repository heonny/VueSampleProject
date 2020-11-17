<template>
    <div>
        <h1>header</h1>
        <b-form-input>{{headerData}}</b-form-input>
        <b-input-group-append>
            <b-button size="sm" text="Button" variant="success">Button</b-button>
        </b-input-group-append>
    </div>
</template>
<script>
export default {
    name: 'ExampleHeader',
    data() {
        console.log('data()')
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
                type: Number,
                required: false
            }
        }
    },
    mounted: () => {
        console.log('mounted')
    },
    created: () => {
        console.log('created')
    }
}
</script>
<style scoped>

</style>