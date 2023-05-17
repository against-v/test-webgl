import {defineComponent, onMounted, ref, useCssModule} from "vue"
import {runForceGraph} from "./forcegraph.js"
import {runForceGraphPixi} from "./runForceGrpahPixi.js"
import {data} from "@/assets/mocks.js";
import NodeTooltip from "@/components/NodeTooltip/NodeTooltip";

export default defineComponent({
    name: "GraphCanvas",
    setup() {
        const style = useCssModule();
        
        const container = ref(null);
        const canvas = ref(null);
        
        const generateNodes = () => {
            const res = [];
            for (let i = 1; i <= 5000; i++) {
                res.push({
                    "id": i,
                    "name": `name ${i}`,
                    "gender": "male"
                },)
            }
            return res;
        }
        
        onMounted(() => {
            // const graph = runForceGraph();
            const {destroy} = runForceGraphPixi(container.value, [], generateNodes(), NodeTooltip, canvas.value)
        })
        
        return {
            style,
            container,
            canvas
        }
    }
})
