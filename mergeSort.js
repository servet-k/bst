const merge = (left, right) => {
    let arr = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }

    }
    return [...arr, ...left, ...right]
}

const mergeSort = (arr) => {
    if (arr.length === 1) return arr;
    const half = Math.floor(arr.length / 2);
    const arr_left = arr.slice(0, half);
    const arr_right = arr.slice(half);

    const sortedArray = merge(mergeSort(arr_left), mergeSort(arr_right))

    return sortedArray;



}
export {mergeSort};
