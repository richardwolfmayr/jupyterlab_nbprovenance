"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function treeLayout(nodes, current, root) {
    const depthMap = {};
    const currentPath = getPathTo(nodes, root, current);
    DFS(nodes, root, depthMap, currentPath);
    return currentPath;
}
exports.treeLayout = treeLayout;
function DFS(nodes, node, depthMap, currentPath) {
    let explored = new Set();
    let toExplore = [];
    let currDepth = 0;
    toExplore.push(nodes[node]);
    while (toExplore.length > 0) {
        let temp = toExplore.pop();
        if (!explored.has(temp.id)) {
            temp.width = currDepth;
            depthMap[temp.id] = temp.width;
            explored.add(temp.id);
        }
        else {
            temp.width = depthMap[temp.id];
        }
        if (temp.children) {
            toExplore.push(...temp.children.sort((a, b) => {
                const aIncludes = currentPath.includes(a.id) ? 1 : 0;
                const bIncludes = currentPath.includes(b.id) ? 1 : 0;
                return aIncludes - bIncludes;
            }));
        }
        else {
            currDepth++;
        }
    }
}
function getPathTo(nodes, from, to) {
    const path = [];
    search(nodes, from, to, path);
    return [from, ...path.reverse()];
}
exports.getPathTo = getPathTo;
function search(nodes, node, final, path) {
    if (!nodes[node])
        return false;
    if (node === final) {
        path.push(node);
        return true;
    }
    const children = nodes[node].children || [];
    for (let child of children) {
        if (search(nodes, child.id, final, path)) {
            path.push(child.id);
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=TreeLayout.js.map