const barsNum = document.querySelector(".bars-num")
const num = document.querySelector(".num")
const barsCont = document.querySelector(".bars-cont")
const randomBtn = document.querySelector(".random")
const startBtn = document.querySelector(".start")
const select = document.querySelector(".select")
const speed = document.querySelector(".speed")
const speedNum = document.querySelector(".speed-num")
let root = document.documentElement
let bars = []
let barsArr;
let delay = 40;
const BarStartingHeight = 400;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let can = true
let canStart = true;
let maxBarsNum = 0;

function createBars(num) {
    let width = barsCont.clientWidth / num;
    root.style.setProperty("--bar-width", `${width}px`)
    for (let i = 0; i < num; ++i) {
        let bar = document.createElement("div")
        bar.classList.add("bar")
        let height = Math.floor(Math.random() * BarStartingHeight) + 300
        bar.style.height = `${height}px`
        bars.push(height)
        barsCont.append(bar)
    }
    barsArr = barsCont.children
}

function update() {
    if(!can) return;
    canStart = true;
    let val = barsNum.value
    num.innerText = val
    while (barsCont.children.length > 0) barsCont.removeChild(barsCont.firstChild)
    bars = []
    createBars(parseInt(val))
}

//! Sorting algorithms logic.

async function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            barsArr[j].classList.add("selected")
            barsArr[j + 1].classList.add("selected")
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                barsArr[j].style.height = `${arr[j + 1]}px`
                
                arr[j + 1] = temp
                barsArr[j + 1].style.height = `${temp}px`
                
                prevJ = j
            }
            await sleep(delay);
            barsArr[j].classList.remove("selected")
            barsArr[j+1].classList.remove("selected")
        }
    }
}

async function swap(arr,xp,yp){ 
    [arr[xp],arr[yp]] = [ arr[yp],arr[xp]] 
} 
  
async function selectionSort(arr){ 
    let n = arr.length; 
    let min;  
    let i , j; 
    for(i = 0; i < n-1;++i){ 
        min = i; 
        for(j = i+1; j < n; j++){ 
            barsArr[j].classList.add("selected")
            barsArr[min].classList.add("selected")
            let temp = min
            if(arr[j]<arr[min]) {
                temp = min
                min = j
            }; 
            await sleep(delay);
            barsArr[j].classList.remove("selected")
            barsArr[temp].classList.remove("selected")
            barsArr[min].classList.remove("selected")
        }           
        if(min!=i) {
            barsArr[i].classList.add("selected")
            barsArr[min].classList.add("selected")
            barsArr[i].style.height = `${arr[min]}px`
            barsArr[min].style.height = `${arr[i]}px`
            await swap(arr,min,i); 
            await sleep(delay + 10)
            barsArr[i].classList.remove("selected")
            barsArr[min].classList.remove("selected")
        }
    } 
} 

async function merge(arr, left, middle, right) { 
    let l1 = middle - left + 1; 
    let l2 = right - middle; 
    let arr1 = new Array(l1); 
    let arr2 = new Array(l2); 
    for (let i = 0; i < l1; ++i) { 
        await sleep(delay);
        arr1[i] = arr[left + i]; 
    } 
    for (let i = 0; i < l2; ++i) { 
        await sleep(delay);
        arr2[i] = arr[middle + 1 + i]; 
    } 
    let i = 0, 
        j = 0, 
        k = left; 
    while (i < l1 && j < l2) { 
        if (arr1[i] < arr2[j]) { 
            barsArr[k].classList.add("selected")
            barsArr[i + left].classList.add("selected")
            await sleep(delay);
            arr[k] = arr1[i]; 
            barsArr[k].style.height = `${arr1[i]}px`
            ++i; 
            await sleep(delay);
            barsArr[i - 1 + left].classList.remove("selected")
        } else { 
            barsArr[k].classList.add("selected")
            barsArr[middle + 1 + j].classList.add("selected")
            await sleep(delay);
            arr[k] = arr2[j]; 
            barsArr[k].style.height = `${arr2[j]}px`
            j++; 
            await sleep(delay);
            barsArr[middle + j].classList.remove("selected")
        } 
        barsArr[k].classList.remove("selected")
        k++;
    } 
    while (i < l1) { 
        arr[k] = arr1[i]; 
        // barsArr[k].classList.add("selected")
        barsArr[k].style.height = `${arr1[i]}px`
        await sleep(delay);
        // barsArr[k].classList.remove("selected")
        i++; 
        k++; 
    } 
    while (j < l2) { 
        arr[k] = arr2[j]; 
        // barsArr[k].classList.add("selected")
        barsArr[k].style.height = `${arr2[j]}px`
        await sleep(delay);
        // barsArr[k].classList.remove("selected")
        j++; 
        k++; 
    } 
} 
  
async function mergeSort(arr, left, right) { 
    if (left >= right) { 
        return; 
    }
    let middle = left + Math.floor((right - left) / 2); 
    await mergeSort(arr, left, middle);
    await mergeSort(arr, middle + 1, right); 
    await merge(arr, left, middle, right); 
} 

async function insertionSort(arr) { 
    let n = arr.length; 
    let key; 
    let i, j; 
    for (i = 0; i < n ; ++i) { 
        key = arr[i]; 
        j = i - 1; 
        for (j; j >= 0, arr[j]>key; --j){ 
            barsArr[j].classList.add("selected")
            barsArr[j + 1].classList.add("selected")
            barsArr[j + 1].style.height = `${arr[j]}px`
            arr[j+1]=arr[j]; 
            await sleep(delay);
            barsArr[j].classList.remove("selected")
            barsArr[j + 1].classList.remove("selected")
        } 
        barsArr[i].classList.add("selected")
        barsArr[j + 1].classList.add("selected")
        arr[j+1]=key; 
        barsArr[j + 1].style.height = `${key}px`
        await sleep(delay);
        barsArr[i].classList.remove("selected")
        barsArr[j + 1].classList.remove("selected")
    } 
} 

async function partition(arr, low, high) { 
    let pivot = arr[high]; 
    let i = low - 1; 
    for (let j = low; j <= high - 1; j++) { 
        barsArr[j].classList.add("selected")
        barsArr[high].classList.add("selected")
        await sleep(delay);
        if (arr[j] < pivot) { 
            i++; 
            barsArr[i].classList.add("selected")
            await sleep(delay);
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
            barsArr[j].style.height = `${arr[j]}px`;
            barsArr[i].style.height = `${arr[i]}px`;
            barsArr[i].classList.remove("selected")
            await sleep(delay)
        } 
        barsArr[j].classList.remove("selected")
        barsArr[high].classList.remove("selected")
        
    } 
    barsArr[i + 1].classList.add("selected");
    barsArr[high].classList.add("selected");
    await sleep(delay);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  
    barsArr[high].style.height = `${arr[high]}px`
    barsArr[i + 1].style.height = `${arr[i + 1]}px` 
    await sleep(delay);
    barsArr[i + 1].classList.remove("selected")
    barsArr[high].classList.remove("selected")
    return i + 1;
} 
  
async function quickSort(arr, low, high) { 
    if (low >= high) return; 
    let pi = await partition(arr, low, high); 
    await quickSort(arr, low, pi - 1); 
    await quickSort(arr, pi + 1, high); 
} 

//! End of Sorting algorithms logic.

async function start() {
    if(!can || !canStart) return;
    can = false;
    canStart = false;
    barsNum.disabled = true;
    speed.disabled = true;
    select.disabled = true;
    let algo = select.value
    if (algo == "bubble") { await bubbleSort(bars) }
    else if (algo == "quick") await quickSort(bars, 0, bars.length - 1)
    else if(algo == "merge") await mergeSort(bars, 0, bars.length - 1)
    else if(algo == "selection") await selectionSort(bars)
    else if(algo == "insertion") await insertionSort(bars)

    for(let i=0; i<barsArr.length; ++i) {
        await sleep(1000/parseInt(barsNum.value))
        barsArr[i].style.height = `${bars[i]}px`
        barsArr[i].classList.add("sorted")
    }
    can = true;
    barsNum.disabled = false;
    speed.disabled = false;
    select.disabled = false;
}

function changeSpeed() {
    delay = Math.floor(1000 / parseInt(speed.value))
    speedNum.innerText = speed.value
}

randomBtn.addEventListener("click", update)
barsNum.addEventListener("input", update)
speed.addEventListener("input", changeSpeed)
startBtn.addEventListener("click", start)

document.addEventListener("DOMContentLoaded", () => {
    maxBarsNum = Math.floor(barsCont.clientWidth / 3);
    barsNum.setAttribute("max", maxBarsNum)
    barsNum.value = 20;
    speed.value = 40;
    changeSpeed()
    update()
})

window.addEventListener("resize", () => {
    maxBarsNum = Math.floor(barsCont.clientWidth / 3);
    barsNum.setAttribute("max", maxBarsNum)
})
