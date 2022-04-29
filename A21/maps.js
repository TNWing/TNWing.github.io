//each map is 16 by 16
//examples
//first var in misc_Array is always whether or not its linked to a secret
//if its not a 0, then it triggers a secret associated w/ that num
//4th value is default misc_array (maybe, if we add 4th value)
const sTile=[0,0,[0]];//standard tile
const wTile_S=[1,1,[0,0]];//static wall
const wTile_M=[1,1,[0,1]];//block tile (can be moved
//type 0: default
//type 1:wall
//type: 2: sensor path (changes color when walked over
//type 3: receptor: when it receives something (ex: data), then it reacts depending on which puzzle its associated with
//type 4: reactor: when player runs over it to collide with it, does smth. misc_array stores a num that associates an acgtion with it
//think of it like a much more advanced moving wall
//misc_array may store which puzzle the thing is associated with.
//the misc_array stores the color

const mapstart=[
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],  [2,1,[0,0],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,1]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,2]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,3]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,4]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,5]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,6]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,7]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,1],[1]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,8]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,9]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,10]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,11]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [3,1,[1,1],[1]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,12]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,13]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[1,[0,14]],[0]],
    [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],  [2,1,[0,0],[0]],
]
//drawing an x with the puzzle gives egg
const mapPirate=[
    [2,1,[0,0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,1]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,2]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,3]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,4]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,5]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,6]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,7]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [4,2,[2,4],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [-1,-1,[2,[0,7]],[0]],
    [-1,-1,[0,[15,8]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,9]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,10]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,11]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,12]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,13]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [-1,-1,[0,[15,14]],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]], [0,0,[0],[0]],
    [2,1,[0,0],[0]], [-1,-1,[3,[1,0]],[0]], [-1,-1,[3,[2,0]],[0]], [-1,-1,[3,[3,0]],[0]], [-1,-1,[3,[4,0]],[0]], [-1,-1,[3,[5,0]],[0]], [-1,-1,[3,[6,0]],[0]], [-1,-1,[3,[7,0]],[0]],  [-1,-1,[3,[8,0]],[0]],  [-1,-1,[3,[9,0]],[0]],  [-1,-1,[3,[10,0]],[0]],[-1,-1,[3,[11,0]],[0]], [-1,-1,[3,[12,0]],[0]],  [-1,-1,[3,[13,0]],[0]], [-1,-1,[3,[14,0]],[0]], [2,1,[0,0],[0]] ,
]

const mapMaze1=[
    [2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[6,-2,[3],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [-1,-1,[1,[15,7]],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[-1,-1,[4,[0,7]],[0]],
    [2,1,[0,0],[0]],[7,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,4,[3,1,[11,2],[11,3],[11,4],[12,2],[12,4],[13,2],[13,3],[13,4]],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
]

const mapChoose1=[
    [2,1,[0,0],[0]],[-1,-1,[1,[1,15]],[0]],  [-1,-1,[1,[2,15]],[0]],  [-1,-1,[1,[3,15]],[0]],  [-1,-1,[1,[4,15]],[0]],  [-1,-1,[1,[5,15]],[0]],  [-1,-1,[1,[6,15]],[0]], [-1,-1,[1,[7,15]],[0]],  [-1,-1,[1,[8,15]],[0]],  [-1,-1,[1,[9,15]],[0]],  [-1,-1,[1,[10,15]],[0]],[-1,-1,[1,[11,15]],[0]], [-1,-1,[1,[12,15]],[0]],  [-1,-1,[1,[13,15]],[0]], [-1,-1,[1,[14,15]],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[9,4,[4,2,1],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[8,4,[4,2,21],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
]

const mapChain1=[
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [-1,-1,[2,[15,7]],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[3,4,[5,3,1,[[9,3]],1,1],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
    [0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[0,0,[0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],[2,1,[0,0],[0]],
]
