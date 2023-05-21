import * as d3 from "d3";
import * as PIXI from "pixi.js";
import { Viewport } from 'pixi-viewport';

export function runForceGraphPixi(
    container,
    linksData,
    nodesData,
) {
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const app = new PIXI.Application({
        width,
        height
    });
    
    if (app.renderer.type === PIXI.RENDERER_TYPE.WEBGL) {
        console.log('Используется рендерер WebGL');
    } else if (app.renderer.type === PIXI.RENDERER_TYPE.CANVAS) {
        console.log('Используется рендерер Canvas');
    }
    
    const viewport = new Viewport({
        screenWidth: width,
        screenHeight: height,
        passiveWheel: false,
        events: app.renderer.events 
    });

    viewport.drag().pinch().wheel().decelerate().clampZoom({ minWidth: width / 4, minHeight: height / 4 });

    nodes.forEach((node) => {
        const {x, y, width, height} = node;
        node.gfx = new PIXI.Graphics();
        node.gfx.beginFill(0xff0000);
        node.gfx.drawRect(x, y, width, height);
        
        viewport.addChild(node.gfx)
    });
    
    
    

    app.stage.addChild(viewport);

    container.appendChild(app.view);

    

    // const simulation = d3.forceSimulation(nodes)
        // .force("charge", d3.forceManyBody().strength(-100))
        // .force("center", d3.forceCenter());
    
    // simulation

    // console.log(simulation);
    
    const ticked = () => {
        nodes.forEach((node) => {
            let { x, y, gfx } = node;
            gfx.position = new PIXI.Point(x, y);
        });
    }

    // simulation.on("tick", ticked);

    const loadImages = async () => {
        for (let i = 0; i < nodes.length; i++) {
            const img = await PIXI.Assets.load(nodes[i].img);
            const sprite = PIXI.Sprite.from(img)
            sprite.x = nodes[i].x;
            sprite.y = nodes[i].y;
            sprite.scale.x = nodes[i].width / sprite.width;
            sprite.scale.y = nodes[i].height / sprite.height;
            nodes[i].gfx.addChild(sprite)
        }
    }
    loadImages();


    
}
