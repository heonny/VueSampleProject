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