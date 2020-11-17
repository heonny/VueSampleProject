<template>
    <b-container>
        <eHeader v-bind="headerData"></eHeader>
        <eContent v-bind="contentData"></eContent>
        <eFooter v-bind="footerData"></eFooter>
    </b-container>
</template>
<script>
import eHeader from './ExampleHeader'
import eContent from './ExampleContent'
import eFooter from './ExampleFooter'

export default {
    name: 'ExampleController',
    data() {
        return {
            headerData: {
                header01: 'header01',
                header02: '0001'
            },
            contentData: {
                content01: '',
                content02: ''
            },
            footerData: {
                footer01: '',
                footer02: ''
            }
        }
    },
    methods: {
        
    },
    components: {
        eHeader,
        eContent,
        eFooter        
    }
}
</script>
<style scoped>

</style>