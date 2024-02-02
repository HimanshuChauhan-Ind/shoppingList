const itemInput = document.querySelector('#item-input')
const addItemBtn = document.querySelector('.btn')
const itemList = document.querySelector('#item-list')
const clrBtn = document.querySelector('.btn-clear')
const filter = document.querySelector('.filter')
const form = document.querySelector('#item-form')
let editMode = false

//A function that inserts into the ul the op from the form
function addItem(e){
    console.log(e.target.textContent,editMode)
    let itemTxt = document.createTextNode(itemInput.value)


    e.preventDefault()
    
    // Edit mode
    if(editMode){
        const editItem = document.querySelector('.edit-mode')

        removeItemFromStorage(editItem.firstChild.textContent)
        editItem.classList.remove('edit-mode')
        editItem.remove()
        
    }
    

    if (itemTxt.textContent != ''){
        addItemLclStorage(itemTxt.textContent)
    }
    
    addItemDOM(itemTxt)

    itemInput.value = ''

    resetUI()
}

function addItemDOM(itemTxt){
    if(itemInput.value){
        itemCreator(itemTxt)

        // resetUI()
    }else{
        alert('Add some item first.')
    }
}

function itemCreator(item){
    let liItem = document.createElement('li')
    liItem.appendChild(item)
    let btn = document.createElement('button')
    btn.className = 'remove-item btn-link text-red'
    let icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'
    btn.appendChild(icon)
    liItem.appendChild(btn)
    itemList.appendChild(liItem)
}

function addItemLclStorage(item){
    let itemsLclStorage;
    if (localStorage.getItem('items') === null){
        itemsLclStorage = []
    }else{
        itemsLclStorage = JSON.parse(localStorage.getItem('items'))
    }

    itemsLclStorage.push(item)
   
    localStorage.setItem('items',JSON.stringify(itemsLclStorage))
}

function removeItem(e){
    const removeItem = e.target.parentElement.parentElement.firstChild.textContent
    removeItemFromStorage(removeItem)

    if(e.target.className == 'fa-solid fa-xmark'){
        e.target.parentElement.parentElement.remove()
    }

    resetUI()
    console.log(`In the removeItem: ${editMode}`)
}

function removeItemFromStorage(item){
    const lclItems = JSON.parse(localStorage.getItem('items'))
    
    //Removing the item from the Local storage
    const updatedItems = lclItems.filter(i => i !== item);
    
    localStorage.setItem('items', JSON.stringify(updatedItems));  

}

function removeAllItem(){
   while (itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
   }

    //Removing the items from the local storage
    localStorage.removeItem('items')

   resetUI()
}

//Local Storage Insert
function lclInsert(){
    const items = JSON.parse((localStorage.getItem('items')))
    if( items != null){
        items.forEach(item =>{
            itemCreator(document.createTextNode(item))
        })
    }
    
}

// Reset UI
function resetUI(){
    const items = JSON.parse((localStorage.getItem('items')))

    if( items == null || items.length == 0 ){
        filter.style.display = 'none'
        clrBtn.style.display = 'none'
    }else{
        // items.forEach(item =>{
        //     itemCreator(document.createTextNode(item))
        // })
        filter.style.display = 'block'
        clrBtn.style.display = 'block'
    }

    addItemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    addItemBtn.style.backgroundColor = '#333'

    editMode = false
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

// Edit functionality
function editItem(e){
    if(e.target.className != 'fa-solid fa-xmark'){
        editMode = true
    }
    

    if(editMode){
        if(e.target.className != 'fa-solid fa-xmark'){
            itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'))
        
        e.target.classList.add('edit-mode')
        addItemBtn.style.backgroundColor='Green'
        addItemBtn.querySelector('i').className = 'fa-solid fa-pen'
        
        let itemTxt = e.target.firstChild.textContent
        itemInput.value = itemTxt
        addItemBtn.lastChild.textContent = ' Edit Item'
        }
    }


}

function editList(e,itemTxt){
    console.log(e,itemTxt)
}

// Event Listeners
form.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)
clrBtn.addEventListener('click',removeAllItem)
filter.addEventListener('input',filterItems)
itemList.addEventListener('click',editItem)

lclInsert()
resetUI()
const intervalId = setInterval(function() {
    console.log(editMode);
}, 2000);