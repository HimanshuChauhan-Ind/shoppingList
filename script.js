const itemInput = document.querySelector('#item-input')
const addItemBtn = document.querySelector('.btn')
const itemList = document.querySelector('#item-list')
const clrBtn = document.querySelector('.btn-clear')
const filter = document.querySelector('.filter')

//A function that inserts into the ul the op from the form
function addItem(e){
    
    e.preventDefault()
    
    let itemTxt = document.createTextNode(itemInput.value)
    addItemDOM(itemTxt)

    addItemLclStorage(itemTxt.textContent)

    itemInput.value = ''

    resetUI()
}

function addItemDOM(itemTxt){
    if(itemInput.value){
        let liItem = document.createElement('li')
        liItem.appendChild(itemTxt)
        let btn = document.createElement('button')
        btn.className = 'remove-item btn-link text-red'
        let icon = document.createElement('i')
        icon.className = 'fa-solid fa-xmark'
        btn.appendChild(icon)
        liItem.appendChild(btn)
        itemList.appendChild(liItem)
        
    }else{
        alert('Add some item first.')
    }
}

function addItemLclStorage(item){
    let itemsLclStorage;
    if (localStorage.getItem('items') === null){
        itemsLclStorage = []
    }else{
        itemsLclStorage = JSON.parse(localStorage.getItem('items'))
    }

    itemsLclStorage.push(item)
    console.log(itemsLclStorage)
    localStorage.setItem('items',JSON.stringify(itemsLclStorage))
}

function removeItem(e){
    // console.log(e.target.className)
    if(e.target.className == ''){
        return
    }

    if(e.target.className == 'fa-solid fa-xmark'){
        e.target.parentElement.parentElement.remove()
    }

    resetUI()
}

function removeAllItem(){
   while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
   }

   resetUI()
}



// Reset UI
function resetUI(){
    const items = document.querySelectorAll('li')
    if(items.length == 0){
        filter.style.display = 'none'
        clrBtn.style.display = 'none'
    }else{
        filter.style.display = 'block'
        clrBtn.style.display = 'block'
    }

}

// Filter Items
function filterItems(e){
    // console.log(e.target.value)
    const txt = e.target.value.toLowerCase()
    const items = document.querySelectorAll('li')

    items.forEach(item => {
        const itemName = item.textContent.toLowerCase()

        if (itemName.indexOf(txt) != -1){
            item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
    })
}

// Event Listeners
addItemBtn.addEventListener('click',addItem)
itemList.addEventListener('click',removeItem)
clrBtn.addEventListener('click',removeAllItem)
filter.addEventListener('input',filterItems)

resetUI()