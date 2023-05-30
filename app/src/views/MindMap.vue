<script lang="ts" setup>
import {reactive, ref, watch, computed, onMounted, onUpdated} from 'vue';
import * as vNG from "v-network-graph";
import "v-network-graph/lib/style.css";
import {ForceLayout} from "v-network-graph/lib/force-layout";
import {VNetworkGraph} from "v-network-graph";
import {IonPage} from "@ionic/vue";
import {useRouter} from "vue-router";
import {nextTick} from "vue"; // labeling을 위한 라이브러리 임포트
import {IonModal, IonInput} from "@ionic/vue";  // label input을 위한 라이브러리 임포트
import axios from "axios"; 

// 1. Node 지워진거 다시 살리기 - difficult...
//      - Delete Mode?
//      - 
// 2. Node 내 글자 넣기 - 할까말까 -> 라벨을 글자로 대체
// 3. 유저가 임의로 Node 추가하기 - 왜 라벨이 안보이지,,,?
// 4. delete
// 5. Category check box - Marketer / Developer / Designer -> 완료 -> 하나만 선택하기도 완료
// 6. select하면 add까지 - 완료
// 7. Root 단어 강조 - 완료
/* 
[5.21]
1. Delete Button 추가 완료 -> 마지막 node에 대해서만 구현됐음 -> 중간 delete를 위해서는 DFS 필요할듯
    -> 컨셉 회의해보고 구현여부 결정
2. Default로 Dahsed Edge와 node 숨김
3. Recommend 버튼 누르면 10개의 node 생성(추천 단어들)
4. Recommend 버튼 중복 가능
5. Hide 버튼 추가
6. Hide 버튼 누르면 모든 Dashed edge 삭제
7. Hide 버튼 누르면 선택된 node에 대해서만 Dashed edge와 node 삭제하도록 변경
8. Labeling Bug fix : 임의의 노드 추가 시 Label이 안보이던 문제 해결
[5.23]
1. Hide 버튼 누르면 해당 node가 selectable이 false가 되던 문제 해결
[5.27]
1. delete DFS 구현 완료
[5.28]
1. main page 구현 완료
[5.29]
1. main page image css로 변환
2. Centerword update
[5.30]
1. 백단 잇는 작업
    - selected_word 삭제 : 백단에서 처리
2. Redirection 시 라벨 새로고침 bugfix
[5.31]
1. 백단 잇는 작업
    - choice_word 반영
    - recommend, add select 함수에 해당 사항 반영 완료
*/

// [TODO LIST]
// 1. Delete Node - 마지막 노드에 대해서만 삭제 가능, 
//                  좀 더 딥한 node는 DFS로 Recursive하게 구현해야되는데 이건 논의 해보고 구현 결정
// 2. Axios data 넘기기 - AddArbitraryNode 관련

const router = useRouter();
let Centerword = ref('');
let category = ref('');
let choice_word = ref('');
let recommended_item = ref('');


interface Node extends vNG.Node {
    selectable?: boolean
}

interface Edge extends vNG.Edge {
    dashed?: boolean
    color: string
    selectable?: boolean
}

const nodes: reactive<Record<string, Node>> = reactive({
    // node1: {id: "node1" ,name: Centerword, selectable: true},
    // node2: {id: "node2" ,name: "N2", selectable: false},
    // node3: {id: "node3" ,name: "N3", selectable: false},
    // node4: {id: "node4" ,name: "N4", selectable: false},
    // node5: {id: "node5" ,name: "N5", selectable: false},
    // node6: {id: "node6" ,name: "N6", selectable: false},
    // node7: {id: "node7" ,name: "N7", selectable: false},
    // node8: {id: "node8" ,name: "N8", selectable: false},
    // node9: {id: "node9" ,name: "N9", selectable: false},
    // node10: {id: "node10" ,name: "N10", selectable: false},
    // node11: {id: "node11" ,name: "N11", selectable: false},
})

const edges: reactive<Record<string, Edge>> = reactive({
    // edge1: {source: "node1", target: "node2", dashed: true, color: "black", selectable: true},
    // edge2: {source: "node1", target: "node3", dashed: true, color: "black", selectable: true},
    // edge3: {source: "node1", target: "node4", dashed: true, color: "black", selectable: true},
    // edge4: {source: "node1", target: "node5", dashed: true, color: "black", selectable: true},
    // edge5: {source: "node1", target: "node6", dashed: true, color: "black", selectable: true},
    // edge6: {source: "node1", target: "node7", dashed: true, color: "black", selectable: true},
    // edge7: {source: "node1", target: "node8", dashed: true, color: "black", selectable: true},
    // edge8: {source: "node1", target: "node9", dashed: true, color: "black", selectable: true},
    // edge9: {source: "node1", target: "node10", dashed: true, color: "black", selectable: true},
    // edge10: {source: "node1", target: "node11", dashed: true, color: "black", selectable: true},
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

// const nextNodeIndex = ref(Object.keys(nodes).length + 1);
// const nextEdgeIndex = ref(Object.keys(edges).length + 1);
const nextNodeIndex = ref(2);
const nextEdgeIndex = ref(1);

const selectedNodes = ref<string[]>([]);
const selectedEdges = ref<string[]>([]);

// store all the nodes and edges
const allNodes = ref({...nodes});
const allEdges = ref({...edges});


// delete node button
// const deleteMode = ref(false);

// page 진입 시 Centerword send 및 추천 단어 받아오기
onUpdated(() => {
    const query = router.currentRoute.value.query;
    if (query && query.Centerword) {
    Centerword.value = query.Centerword;
    }
    category.value = query.category;
    axios.get('https://gsdsproject-github-io-iaqun7cvsa-du.a.run.app/word/center/' + category.value + '/' + Centerword.value, {withCredentials: true})
    .then((response) => {
        recommended_item = response.data;
        nextNodeIndex.value = 2; // Reset the node index
        nextEdgeIndex.value = 1; // Reset the edge index
        nodes.node1 = { id: 'node1', name: Centerword.value, selectable: true };
        for (const i in recommended_item) {
            nodes['node' + nextNodeIndex.value] = {
                id: 'node' + nextNodeIndex.value,
                name: recommended_item[i],
                selectable: false
            };
            edges['edge' + nextEdgeIndex.value] = {
                source: 'node1',
                target: 'node' + nextNodeIndex.value,
                dashed: true,
                color: "black",
                selectable: true
            };
            nextNodeIndex.value++;
            nextEdgeIndex.value++;
        }
    })
    .catch((error) => {
        console.error(error);
        // Handle error scenario
    });
    
});


// // Item Select시 추천 단어 받아오기
// const selectItem = () => {
//     // console.log(choice_word)
//     axios.post('https://gsdsproject-github-io-iaqun7cvsa-du.a.run.app/word/human/' + choice_word,{selected_words : [], center_word : Centerword._value, user_type: category.value}, {withCredentials: true})
//     .then((response) => {
//         recommended_item = response.data;
//         for (const i in recommended_item) {
//             nodes['node' + nextNodeIndex.value] = {
//                 id: 'node' + nextNodeIndex.value,
//                 name: recommended_item[i],
//                 selectable: false
//             };
//             edges['edge' + nextEdgeIndex.value] = {
//                 source: 'node1',
//                 target: 'node' + nextNodeIndex.value,
//                 dashed: true,
//                 color: "black",
//                 selectable: true
//             };
//             nextNodeIndex.value++;
//             nextEdgeIndex.value++;
//         }
//     })
// }

const selectItem = (node) => {
  axios.post('https://gsdsproject-github-io-iaqun7cvsa-du.a.run.app/word/human/' + choice_word, {center_word: Centerword.value, user_type: category.value }, { withCredentials: true })
    .then((response) => {
      recommended_item = response.data;
      for (const i in recommended_item) {
        const newNodeId = `node${nextNodeIndex.value}`;
        const newEdgeId = `edge${nextEdgeIndex.value}`;
        nodes[newNodeId] = { id: newNodeId, name: recommended_item[i], selectable: false };
        edges[newEdgeId] = { source: node.id, target: newNodeId, dashed: true, color: "black", selectable: true };
        nextNodeIndex.value++;
        nextEdgeIndex.value++;
      }
    });
};

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

    // addNodes(targetNode[0]);
    if (targetNode.length > 0) {
        addNodes(targetNode[0]);
    }
}


// selectEdge랑 묶이는 addNode 함수
const addNodes = (target : string) => {
    // const source = selectedNodes.value[0];
    const node = nodes[target];
    if (node) {
        choice_word = node.name;
    selectItem(node);
  }
}


// 임의로 생성된 노드에 채워넣을 라벨
const newNodeLabel = ref("");
// const addarbitraryNodes = () => {
//     if (selectedNodes.value.length > 0) {
//         const source = selectedNodes.value[0];
//         const newNode = "node" + nextNodeIndex.value;
//         const newEdge = "edge" + nextEdgeIndex.value;
//         // nodes[newNode] = {name: "N" + nextNodeIndex.value, selectable: true};
//         nodes[newNode] = {name: newNodeLabel.value , selectable: true};
//         edges[newEdge] = {source: source, target: newNode, color: "blue", dashed: false, selectable: true};
//         nextNodeIndex.value++;
//         nextEdgeIndex.value++;
//         choice_word = newNodeLabel.value;
//         selectItem();
//         console.log(choice_word)
//         nextTick(() => {
//             newNodeLabel.value = ""; // reset the label input
//         });
//     }
// }
const addarbitraryNodes = (target) => {
  if (target) {
    const source = selectedNodes.value[0];
    const newNodeId = `node${nextNodeIndex.value}`;
    const newEdgeId = `edge${nextEdgeIndex.value}`;
    nodes[newNodeId] = { id: newNodeId, name: target, selectable: true };
    edges[newEdgeId] = { source: source, target: newNodeId, color: "blue", dashed: false, selectable: true };
    nextNodeIndex.value++;
    nextEdgeIndex.value++;
    choice_word = target;
    selectItem(nodes[newNodeId]);
    nextTick(() => {
      newNodeLabel.value = ""; // reset the label input
    });
  }
};


// // function for delete node
// const deleteNode = () => {
//     if (selectedNodes.value.length > 0) {
//         const nodeToDelete = selectedNodes.value[0];


//         // Remove the target node associated with the edges
//         for (const edge in edges) {
//             if (edges[edge].source === nodeToDelete || edges[edge].target === nodeToDelete) {
//                 delete nodes[edges[edge].target];
//             }
//         }
//         // Remove the associated edges
//         for (const edge in edges) {
//             if (edges[edge].source === nodeToDelete || edges[edge].target === nodeToDelete) {
//                 delete edges[edge];
//             }
//         }

//         // Remove the node
//         delete nodes[nodeToDelete];

//         // Reset the selectedNodes array
//         selectedNodes.value = [];
//     }
// }

// function for delete node
const deleteNode = () => {
    if (selectedNodes.value.length > 0) {
        const nodeToDelete = selectedNodes.value[0];

        const deleteNodeAndEdges = (nodeId) => {
            // Remove the target node associated with the edges
            for (const edge in edges) {
                if (edges[edge].source === nodeId) {
                    const targetNode = edges[edge].target;
                    delete nodes[targetNode];
                    deleteNodeAndEdges(targetNode); // Recursively delete children nodes
                }
            }
            // Remove the associated edges
            for (const edge in edges) {
                if (edges[edge].source === nodeId || edges[edge].target === nodeId) {
                    delete edges[edge];
                }
            }
            // Remove the node
            delete nodes[nodeId];
        };

        deleteNodeAndEdges(nodeToDelete);

        // Reset the selectedNodes array
        selectedNodes.value = [];
    }
}

// Recommend function
const recommend = () => {
  const source = selectedNodes.value[0];
  if (source) {
    // for (let i = 0; i < 10; i++) {
    //   const newNode = "node" + nextNodeIndex.value;
    //   const newEdge = "edge" + nextEdgeIndex.value;
    //   nodes[newNode] = { id: newNode, name: "N" + nextNodeIndex.value, selectable: true };
    //   edges[newEdge] = { source: source, target: newNode, color: "black", dashed: true, selectable: true };
    //   nextNodeIndex.value++;
    //   nextEdgeIndex.value++;
    // }
    choice_word = nodes[source].name;
    selectItem(nodes[source]);
    console.log(choice_word)
  }
};

// Hide unselected nodes
const hideUnselected = (selectedNode: string) => {
  // Iterate over all edges
  for (const e in edges) {
    // If this edge starts from the selected node and is dashed
    if (edges[e].source == selectedNode && edges[e].dashed) {
      // Delete this edge and the target node
      delete nodes[edges[e].target];
      delete edges[e];
    } else if (edges[e].source == selectedNode) {
      // Set the properties of remaining edges starting from the selected node
      edges[e].dashed = false;
      edges[e].color = "blue";
      edges[e].selectable = false;
      nodes[edges[e].source].selectable = true;
      nodes[edges[e].target].selectable = true;
    }
  }
};



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
            color: node => node.id === "node1" ? '#90EE90' : "#ff0" , // LightGreen
            radius: node => node.id === "node1" ? 30 : 15, // Increase size of node
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

const toHome = () => {
    // Centerword.value = '';
    // category.value = '';
    // choice_word.value = '';
    // recommended_item.value = '';
    router.push({name: "Home",
    query: {
            Centerword: Centerword.value,
            category: category.value
        }
});
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
            <ion-button :disabled="selectedNodes.length == 0" @click="recommend()">Recommend</ion-button>
            <ion-button :disabled="selectedNodes.length == 0" @click="hideUnselected(selectedNodes[0])">Hide</ion-button>
            <ion-input v-model="newNodeLabel" placeholder="Enter new node label"></ion-input>
            <ion-button :disabled="selectedNodes.length == 0 || newNodeLabel.value == ''" @click="addarbitraryNodes(newNodeLabel)">Add</ion-button>
            <ion-button :disabled="selectedNodes.length == 0" @click="deleteNode()">Delete</ion-button>
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
