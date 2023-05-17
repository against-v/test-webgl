import {defineComponent, useCssModule} from "vue"

export default defineComponent({
    name: "NodeTooltip",
    setup() {
        const style = useCssModule();
        return {
            style
        }
    }
})
