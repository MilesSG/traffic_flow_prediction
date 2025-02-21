import { TreeNode } from 'rc-tree';
import TreePure from './Tree';
import DirectoryTree from './DirectoryTree';
var Tree = TreePure;
Tree.DirectoryTree = DirectoryTree;
Tree.TreeNode = TreeNode;
export default Tree;