<script lang="ts" setup>
import {reactive, ref, watch} from 'vue';
import * as vNG from "v-network-graph";
import "v-network-graph/lib/style.css";
import {ForceLayout} from "v-network-graph/lib/force-layout";
import {VNetworkGraph} from "v-network-graph";
import {IonPage} from "@ionic/vue";

interface Node extends vNG.Node {
    selectable?: boolean
}

interface Edge extends vNG.Edge {
    dashed?: boolean
    color: string
    selectable?: boolean
}

const nodes: reactive<Record<string, Node>> = reactive({
    node1: {name: "N1", selectable: false},
    node2: {name: "N2", selectable: false},
    node3: {name: "N3", selectable: false},
    node4: {name: "N4", selectable: false},
    node5: {name: "N5", selectable: false},
    node6: {name: "N6", selectable: false},
    node7: {name: "N7", selectable: false},
    node8: {name: "N8", selectable: false},
    node9: {name: "N9", selectable: false},
    node10: {name: "N10", selectable: false},
    node11: {name: "N11", selectable: false},
})

const edges: reactive<Record<string, Edge>> = reactive({
    edge1: {source: "node1", target: "node2", dashed: true, color: "black", selectable: true},
    edge2: {source: "node1", target: "node3", dashed: true, color: "black", selectable: true},
    edge3: {source: "node1", target: "node4", dashed: true, color: "black", selectable: true},
    edge4: {source: "node1", target: "node5", dashed: true, color: "black", selectable: true},
    edge5: {source: "node1", target: "node6", dashed: true, color: "black", selectable: true},
    edge6: {source: "node1", target: "node7", dashed: true, color: "black", selectable: true},
    edge7: {source: "node1", target: "node8", dashed: true, color: "black", selectable: true},
    edge8: {source: "node1", target: "node9", dashed: true, color: "black", selectable: true},
    edge9: {source: "node1", target: "node10", dashed: true, color: "black", selectable: true},
    edge10: {source: "node1", target: "node11", dashed: true, color: "black", selectable: true},
})

const layouts = ref({
    nodes: {
        node1: {
            x: 0,
            y: 0,
            fixed: true,
        },
    },
})

const nextNodeIndex = ref(Object.keys(nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(edges).length + 1);

const selectedNodes = ref<string[]>([]);
const selectedEdges = ref<string[]>([]);

const selectEdge = () => {
    const selEdge = selectedEdges.value;
    let targetNode: Array<string> = [];
    let sourceNode = null;
    if (selEdge.length > 0) {
        for (const e in selEdge) {
            targetNode.push(edges[selEdge[e]].target);
            sourceNode = edges[selEdge[e]].source;
        }
    }

    for (const e in edges) {
        if ((targetNode.indexOf(edges[e].target) < 0) && edges[e].source == sourceNode) {
            //delete node and edge
            delete nodes[edges[e].target]
            delete edges[e]
        } else if (edges[e].source == sourceNode) {
            edges[e].dashed = false;
            edges[e].color = "blue";
            edges[e].selectable = false;
            nodes[edges[e].source].selectable = false;
            nodes[edges[e].target].selectable = true;
        }
    }

}

const addNodes = () => {
    const source = selectedNodes.value[0];
    for (let i = 0; i < 10; i++) {
        const newNode = "node" + nextNodeIndex.value;
        const newEdge = "edge" + nextEdgeIndex.value;
        nodes[newNode] = {name: "N" + nextNodeIndex.value, selectable: false};
        edges[newEdge] = {source: source, target: newNode, color: "black", dashed: true, selectable: true};
        nextNodeIndex.value++;
        nextEdgeIndex.value++;
    }
}

const canSelect = () => {
    if (selectedEdges.value.length == 0) {
        return true;
    }
    const sel = selectedEdges.value[0];
    for (const e in selectedEdges.value) {
        // check if the selected edges have the same source
        if (edges[sel].source != edges[selectedEdges.value[e]].source) {
            return true;
        }
    }
    return false;
}

const canAdd = () => {
    if (selectedNodes.value.length == 0) {
        return true;
    }
    const target = selectedNodes.value[0];

    for (const e in edges) {
        // check if there is already an edge from the selected node
        if (edges[e].target == target && edges[e].selectable) {
            return true;
        }
        // check if there is already an edge to the selected node
        if (edges[e].source == target) {
            return true;
        }
    }

    return false;
}

const graph = ref<vNG.Instance>();

async function downloadSvg() {
    if (!graph.value) return;
    const text = await graph.value.exportAsSvgText();
    const url = URL.createObjectURL(new Blob([text], {type: 'octet/stream'}));
    const a = document.createElement('a');
    a.href = url
    a.download = "mindmap.svg"
    a.click();
    window.URL.revokeObjectURL(url);
}

const configs = reactive(vNG.defineConfigs<Node, Edge>({
    node: {
        selectable: node => node.selectable,
        normal: {
            color: '#ff0',
        },
        hover: {
            color: '#ff0',
        }
    },
    edge: {
        selectable: edge => edge.selectable,
        normal: {
            color: edge => edge.color,
            dasharray: edge => edge.dashed ? "5 5" : "0",
        },
        selected: {
            color: '#000',
            dasharray: "0",
        },
        marker: {
            source: {}, target: {
                type: 'arrow',
                color: '#000',
            }
        }
    },
    path: {
        visible: true,
        path: {
            width: 10,
        }
    },
    view: {
        layoutHandler: new ForceLayout({
            positionFixedByDrag: false,
            positionFixedByClickWithAltKey: true,
        })
    }
}))
</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Mindmap</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-button :disabled="!graph" @click="downloadSvg()">Download</ion-button>
            <ion-button :disabled="selectedEdges.length == 0" @click="selectEdge()">Select</ion-button>
            <ion-button :disabled="selectedNodes.length == 0" @click="addNodes()">Add</ion-button>
            <v-network-graph ref="graph" v-model:selected-edges="selectedEdges" v-model:selected-nodes="selectedNodes"
                             :configs="configs"
                             :edges="edges"
                             :nodes="nodes"
                             class="graph"/>
        </ion-content>
    </ion-page>
</template>

<style>
.graph {
    width: 100%;
    height: 80%;
}
</style>