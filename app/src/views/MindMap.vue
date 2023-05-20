<script lang="ts" setup>
import {reactive, ref, watch} from 'vue';
import * as vNG from "v-network-graph";
import "v-network-graph/lib/style.css";
import {ForceLayout} from "v-network-graph/lib/force-layout";
import {VNetworkGraph} from "v-network-graph";
import {IonPage} from "@ionic/vue";
import {useRouter} from "vue-router";
import {nextTick} from "vue"; // labeling을 위한 라이브러리 임포트

// 1. Node 지워진거 다시 살리기 - difficult...
//      - Delete Mode?
//      - 
// 2. Node 내 글자 넣기 - 할까말까 -> 라벨을 글자로 대체
// 3. 유저가 임의로 Node 추가하기 - 왜 라벨이 안보이지,,,?
// 4. delete
// 5. Category check box - Marketer / Developer / Designer -> 완료 -> 하나만 선택하기도 완료
// 6. select하면 add까지 - 완료
// 7. Root 단어 강조 - 완료

interface Node extends vNG.Node {
    selectable?: boolean
}

interface Edge extends vNG.Edge {
    dashed?: boolean
    color: string
    selectable?: boolean
}

const nodes: reactive<Record<string, Node>> = reactive({
    node1: {id: "node1" ,name: "N1", selectable: true},
    node2: {id: "node2" ,name: "N2", selectable: false},
    node3: {id: "node3" ,name: "N3", selectable: false},
    node4: {id: "node4" ,name: "N4", selectable: false},
    node5: {id: "node5" ,name: "N5", selectable: false},
    node6: {id: "node6" ,name: "N6", selectable: false},
    node7: {id: "node7" ,name: "N7", selectable: false},
    node8: {id: "node8" ,name: "N8", selectable: false},
    node9: {id: "node9" ,name: "N9", selectable: false},
    node10: {id: "node10" ,name: "N10", selectable: false},
    node11: {id: "node11" ,name: "N11", selectable: false},
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

// delete node button
// const deleteMode = ref(false);

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

    // for (const e in edges) {
    //     if ((targetNode.indexOf(edges[e].target) < 0) && edges[e].source == sourceNode) {
    //         // delete node and edge
    //         delete nodes[edges[e].target]
    //         delete edges[e]
    //     } else if (edges[e].source == sourceNode) {
    //         edges[e].dashed = false;
    //         edges[e].color = "blue";
    //         edges[e].selectable = false;
    //         nodes[edges[e].source].selectable = false;
    //         nodes[edges[e].target].selectable = true;
    //     }
    // }

    for (const e in edges) {
        if ((targetNode.indexOf(edges[e].target) < 0) && edges[e].source == sourceNode) {
            // delete node and edge
            // delete nodes[edges[e].target]
            // delete edges[e]
        } else if (edges[e].source == sourceNode) {
            edges[e].dashed = false;
            edges[e].color = "blue";
            edges[e].selectable = false;
            nodes[edges[e].source].selectable = true;
            nodes[edges[e].target].selectable = true;
        }
    }


        
    // 노드 edge 안지우고 남김 -> multipl choice 가능할듯
    // for (const e in edges) {
    //     if ((targetNode.indexOf(edges[e].target) >= 0) && edges[e].source == sourceNode) {
    //         // delete node and edge
    //         if (deleteMode.value) {
    //             delete nodes[edges[e].target]
    //             delete edges[e]
    //         }
    //         edges[e].dashed = false;
    //         edges[e].color = "blue";
    //         edges[e].selectable = false;
    //         nodes[edges[e].source].selectable = false;
    //         nodes[edges[e].target].selectable = true;
    //     }
    // }

    addNodes(targetNode[0]);
}


// const addNodes = () => {
//     const source = selectedNodes.value[0];
//     for (let i = 0; i < 10; i++) {
//         const newNode = "node" + nextNodeIndex.value;
//         const newEdge = "edge" + nextEdgeIndex.value;
//         nodes[newNode] = {name: "N" + nextNodeIndex.value, selectable: false};
//         edges[newEdge] = {source: source, target: newNode, color: "black", dashed: true, selectable: true};
//         nextNodeIndex.value++;
//         nextEdgeIndex.value++;
//     }
// }

// selectEdge랑 묶이는 addNode 함수
const addNodes = (target : string) => {
    // const source = selectedNodes.value[0];
    for (let i = 0; i < 10; i++) {
        const newNode = "node" + nextNodeIndex.value;
        const newEdge = "edge" + nextEdgeIndex.value;
        nodes[newNode] = {name: "N" + nextNodeIndex.value, selectable: true};
        edges[newEdge] = {source: target, target: newNode, color: "black", dashed: true, selectable: true};
        nextNodeIndex.value++;
        nextEdgeIndex.value++;
    }
}

// 임의로 생성된 노드에 채워넣을 라벨
const newNodeLabel = ref("");
const addarbitraryNodes = () => {
    if (selectedNodes.value.length > 0) {
        const source = selectedNodes.value[0];
        const newNode = "node" + nextNodeIndex.value;
        const newEdge = "edge" + nextEdgeIndex.value;
        nodes[newNode] = {name: "N" + nextNodeIndex.value, selectable: true};
        // nodes[newNode] = {name: newNodeLabel.value, selectable: true};
        edges[newEdge] = {source: source, target: newNode, color: "blue", dashed: false, selectable: true};
        nextNodeIndex.value++;
        nextEdgeIndex.value++;
        // nextTick(() => {
        //     newNodeLabel.value = ""; // reset the label input
        // });
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
        label : node => node.name,
        selectable: node => node.selectable,
        normal: {
            // 꾸미기
            // color: '#ff0',
            color: node => node.name === "N1" ? '#90EE90' : "#ff0" , // LightGreen
            radius: node => node.name === "N1" ? 30 : 15, // Increase size of node
            // stroke: {
            //     color: '#006400', // DarkGreen
            //     width: 3, // Border width
            // },
            label: {
                visible: true,
                fontSzie: 16,
                color: '#000', // Black
            },
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

const router = useRouter();

const toHome = () => {
    router.push({name: "Home"});
}
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
            <!-- <ion-button @click="deleteMode.value = !deleteMode.value">Delete</ion-button> -->
            <ion-input v-model="newNodeLabel" placeholder="Enter new node label"></ion-input>
            <ion-button :disabled="selectedNodes.length == 0 || newNodeLabel.value == ''" @click="addarbitraryNodes()">Add</ion-button>
            <!-- <ion-button :disabled="selectedNodes.length == 0" @click="addNodes()">Add</ion-button> -->
            <ion-button @click="toHome">Home</ion-button>
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