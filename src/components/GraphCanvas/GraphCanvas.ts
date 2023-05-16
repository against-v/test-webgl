import {defineComponent, useCssModule} from "vue"

export default defineComponent({
    name: "GraphCanvas",
    setup() {
        const style = useCssModule();
        return {
            style
        }
    }
})
