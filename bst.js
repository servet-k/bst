import { mergeSort } from "./mergeSort.js";
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

// 
class BST {
    constructor(array) {
        this.array = mergeSort([...new Set(array)]);
        this.root = this.buildTree(this.array, 0, this.array.length - 1)
        this.preorderArray = [];
        this.inorderArray = [];
        this.postorderArray = [];
        this.levelorderArray = [];
    }
    buildTree(arr, start, end) {

        if (start > end) { return null };

        let mid = Math.floor((start + end) / 2);
        // console.log(start,end,mid,arr[mid]);
        let root = new Node(arr[mid]);
        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);
        return root;

    }
    insert(root, key) {
        // console.log(root)
        if (root === null) { return root = new Node(key) }
        if (key < root.data) {
            root.left = this.insert(root.left, key)
        }
        else if (key > root.data) {
            root.right = this.insert(root.right, key)
        }
        return root;
    }
    delete(root = this.root, key) {

        if (root == null) { return root }
        if (key < root.data) {

            root.left = this.delete(root.left, key)
            return root;
        } else if (key > root.data) {

            root.right = this.delete(root.right, key)
            return root;
        } else {
            if (root.right === null && root.left === null) { return null; }
            else if (root.right === null) { return root.left }
            else if (root.left === null) { return root.right }
            else {
                let nextMax = this.minVal(root.right).data;
                root.data = nextMax;
                root.right = this.delete(root.right, nextMax);
                return root;
            }

        }



    }



    find(root = this.root, key) {
        if (!root) return false;
        let current = root;
        let found = false;
        while (current && !found) {
            if (key < current.data) {
                current = current.left;
            } else if (key > current.data) {
                current = current.right;
            } else {
                found = current;
            }

        }
        return found ? found : "not found"
    }
    minVal(root = this.root) {
        let current = root;
        let min;
        while (current) {
            min = current;
            current = current.left;
        }
        return min;
    }
    //preorder recursive, data->left->right
    preorder(root = this.root) {
        if (root === null) { return; }
        this.preorderArray.push(root.data)

        this.preorder(root.left);
        this.preorder(root.right);
        return this.preorderArray;
    }
    //preOrder iterative
    preOrder(root = this.root) {
        let result = [];
        if (root === null) return result;
        let stack = [root];

        while (stack.length) {
            let cur = stack.pop();
            result.push(cur.data);
            if (cur.right) {
                stack.push(cur.right)
            }
            if (cur.left) {
                stack.push(cur.left)
            }
        }
        return result;
    }
    //inorder recursive left->data->right
    inorder(root = this.root) {
        if (root === null) return;
        this.inorder(root.left);
        this.inorderArray.push(root.data);
        this.inorder(root.right);
        return this.inorderArray;

    }
    //postorder recursive left->right->data
    postorder(root = this.root) {
        if (root === null) return;
        this.postorder(root.left);
        this.postorder(root.right);
        this.postorderArray.push(root.data);
        return this.postorderArray;
    }
    // levelorder iterative
    levelorder(root = this.root) {
        let ans = [];
        if (root === null) return ans;

        let stack = [root];
        while(stack.length){
            let cur=stack.shift();
            ans.push(cur.data)
            if (cur.left) {
                stack.push(cur.left)
            }
            if (cur.right) {
                stack.push(cur.right)
            }
        }
        return ans;


    }

}
//const exBst= new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
//[   1,   3,    4,  5,   7,   8,    9, 23,   67, 324, 6345]



const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const exBst = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
const bst = new BST([1, 2, 3, 4, 5])
//console.log(exBst.root.data)

// console.log(exBst.insert(exBst.root,6))
//console.log(prettyPrint(exBst.root))
//console.log(exBst.find(exBst.root,67))
//console.log(bst.root)
//console.log(prettyPrint(bst.root))
//console.log(exBst.minVal())
//console.log(exBst.minVal(exBst.root.right))
console.log(prettyPrint(exBst.root))
//console.log(exBst.delete(exBst.root, 8))

//console.log(prettyPrint(exBst.root))
console.log(exBst.preorder());
console.log(exBst.inorder());
console.log(exBst.postorder());
console.log(exBst.levelorder());
