const itemInput = document.querySelector('#item-input')
const addItemBtn = document.querySelector('.btn')
const itemList = document.querySelector('#item-list')
const clrBtn = document.querySelector('.btn-clear')

//A function that inserts into the ul the op from the form
function addItem(){
    if(itemInput.value){
        let liItem = document.createElement('li')
        let itemTxt = document.createTextNode(itemInput.value)
        liItem.appendChild(itemTxt)
        let btn = document.createElement('button')
        btn.className = 'remove-item btn-link text-red'
        let icon = document.createElement('i')
        icon.className = 'fa-solid fa-xmark'
        btn.appendChild(icon)
        liItem.appendChild(btn)
        itemList.appendChild(liItem)
    }else{
        return
    }
    
}


function removeItem(e){
    // console.log(e.target.className)
    if(e.target.className == ''){
        return
    }

    if(e.target.className == 'fa-solid fa-xmark'){
        e.target.parentElement.parentElement.remove()
    }
}

function removeAllItem(){
   while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
   }
}

// Event listener to the form submit
addItemBtn.addEventListener('click',function(e){
    e.preventDefault()
    addItem()
    itemInput.value = ''
})

// Removing items
itemList.addEventListener('click',removeItem)
clrBtn.addEventListener('click',removeAllItem)