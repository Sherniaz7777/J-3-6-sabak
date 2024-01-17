const list=document.getElementById('list')
const add=document.getElementById('add')
const engInput=document.getElementById('eng')
const kgzInput=document.getElementById('kgz')
const list2=document.getElementById('list2')

let data=[
    {eng:'map', kgz:'озгортуу', id:1, learn: false},
    {eng:'for', kgz:'учун', id:2, learn: false},
    {eng:'while', kgz:'азырынча', id:3, learn: false},
]




function renderData(arr) {
    list.innerHTML = '';
    arr.forEach(el => {
        list.innerHTML += `
            <li class="list-group-item d-flex align-items-center">
                <span class="flex-grow-1" id="spanTag_${el.id}" onclick='renderData2(${el.id})' onclick='Iletbelgisi(${el.id})' >
                    <span class="flex-grow-1">${el.eng}</span>
                    <span>${el.kgz}</span>
                </span>
                <button class="btn btn-outline-danger" onclick='delWord(${el.id})'><i class="bi bi-trash"></i></button>
                <button class="btn btn-outline-warning" onclick='impBtn(${el.id})'><i class="bi bi-exclamation"></i></button>
            </li>
        `;
    });
}

let isDone=false

function Iletbelgisi(id) {
    
    let spanTag = document.getElementById(`spanTag_${id}`);
    isDone=!isDone

    if (isDone) {
        spanTag.style.textDecoration='line-through'
    } else {
        spanTag.style.textDecoration='none'
    }

    setToLS(data)
}


let ImpDone=false

function impBtn(id) {
    let spanTag = document.getElementById(`spanTag_${id}`);
    ImpDone=!ImpDone

    if (ImpDone) {
        spanTag.style.color = 'red';
        spanTag.style.fontWeight = 'bold'; 
        
    } else {
        spanTag.style.color = 'black';
        spanTag.style.fontWeight = 'normal';
        
    }
    setToLS(data)
}



function renderData2(id) {
    list2.innerHTML = '';

    // Use forEach to iterate over the data array
    data.forEach(item => {
        // Check if the current item's id matches the specified id
        item.id !== id
            list2.innerHTML += `
                <li class="list-group-item d-flex align-items-center">
                    <span class="flex-grow-1">
                        <span class="flex-grow-1">${item.eng}</span>
                        <span>${item.kgz}</span>
                    </span>
                </li>
            `;
        
    });
}




renderData(data)

add.onclick=()=>{

  
  if (engInput.value.trim() && kgzInput.value.trim()) {
    
  
         let ids=data.map(el=>el.id)
         let newWord={
           eng: engInput.value,
           kgz: kgzInput.value,
           id: ids.at(-1)+1 || 1,
           learn: false
         }
         data.push(newWord)
         console.log(newWord);
         setToLS(data)
         getFromLS()
        //  renderData2(data)
         renderData(data)
    }else{
    engInput.style.borderColor='red'
    kgzInput.style.borderColor='red'
}
}


function delWord(id) {
    const newData= data.filter(el=>el.id!==id)
    
    // renderData(newData)
    setToLS(newData)
    getFromLS()
}



function setToLS(arr) {
    const dataLS=localStorage.setItem('sozduk', JSON.stringify(arr))
}
function getFromLS() {
    const dataLS=localStorage.getItem('sozduk')
    const updData=JSON.parse(dataLS)
    data=updData
    renderData(data)


}

getFromLS()

