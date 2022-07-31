const backbtn = document.getElementById('back-btn')
const updatebtn = document.getElementById('update-btn')
const deletebtn = document.getElementById('delete-btn')
const url = window.location.href + "data"
const spinnerBox = document.getElementById('spinner')
const postbox = document.getElementById('post-box')

backbtn.addEventListener('click',()=> {
    history.back()
})

$.ajax({
    type: 'GET',
    url:url,
    success: function(response){
        console.log(response)
        spinnerBox.classList.add('not-visible')
        const data = response.data
        if (data.logged_in !== data.author){
            console.log('different')
        }
        else {
            console.log('same')
            updatebtn.classList.remove('not-visible')
            deletebtn.classList.remove('not-visible')
        }
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-2')
        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-2')
        const authorEl = document.createElement('p')
        authorEl.setAttribute('class', 'mt-2')
        const createdEl = document.createElement('p')
        createdEl.setAttribute('class', 'mt-2')
        titleEl.textContent = data.title
        bodyEl.textContent = data.body
        authorEl.textContent = data.author
        createdEl.textContent = data.created
        postbox.appendChild(titleEl)
        postbox.appendChild(bodyEl)
        postbox.appendChild(authorEl)
        postbox.appendChild(createdEl)
    },
    error: function(error){
        console.log(error)
    }
})