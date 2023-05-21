import {defineComponent, onMounted, ref, useCssModule} from "vue"
// import {runForceGraph} from "./forcegraph.js"
//@ts-ignore
import {runForceGraphPixi} from "./runForceGrpahPixi.js"
// import {data} from "@/assets/mocks.js";
import NodeTooltip from "@/components/NodeTooltip/NodeTooltip";

export default defineComponent({
    name: "GraphCanvas",
    setup() {
        const style = useCssModule();
        
        const container = ref(null);
        const canvas = ref(null);
        
        const generateNodes = () => {
            const nodeWidth = 100;
            const nodeHeight = 100;
            const spacing = 100;
            const numRows = 320;
            const numColumns = 320;
            
            const res = [];
            for (let i = 0; i < numColumns; i++) {
                for (let j =0; j < numRows; j++) {
                    const randomNumber = Math.floor(Math.random() * 60);
                    const node = {
                        id: `node_${i}_${j}`,
                        x: j * (nodeWidth + spacing),
                        y: i * (nodeWidth + spacing),
                        width: nodeWidth,
                        height: nodeHeight,
                        img: `/images/${randomNumber}.jpg`
                    }
                    res.push(node)
                }
            }
            return res;
        }
        
        onMounted(() => {
            // const graph = runForceGraph();
            const nodes = generateNodes();
            console.log("Количество объектов", nodes.length);
            runForceGraphPixi(container.value, [], nodes)
        })
        
        return {
            style,
            container,
            canvas
        }
    }
})
