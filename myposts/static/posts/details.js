const backbtn = document.getElementById('back-btn')
const updatebtn = document.getElementById('update-btn')
const deletebtn = document.getElementById('delete-btn')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertbox = document.getElementById('alert-box')

const url = window.location.href + "data"

const deleteurl = window.location.href + "delete/"
const updateurl = window.location.href + "update/"

const updateform = document.getElementById('update-form')
const deleteform = document.getElementById('delete-form')

const spinnerBox = document.getElementById('spinner')
const postbox = document.getElementById('post-box')
const titleinput = document.getElementById('id_title')
const bodyinput = document.getElementById('id_body')

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
        }
        else {
            updatebtn.classList.remove('not-visible')
            deletebtn.classList.remove('not-visible')
        }
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-2')
        titleEl.setAttribute('id', 'title')

        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-2')
        bodyEl.setAttribute('id', 'body')

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
        titleinput.value = data.title
        bodyinput.value=data.body
    },
    error: function(error){
        console.log(error)
    }
})

updateform.addEventListener('submit', e=>{
    e.preventDefault()
    const title = document.getElementById('title')
    const body = document.getElementById('body')
    $.ajax({
        type: 'POST',
        url: updateurl,
        data : {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleinput.value,
            'body': bodyinput.value

        },
        success: function(response){
            title.textContent = response.title
            body.textContent = response.body
            handleAlerts('success', 'Post has been updated')
            $('#UpdateModal').modal('hide')
            updateform.reset()
        },
        error: function(error){
            $('#UpdateModal').modal('hide')
            updateform.reset()
        }
    })

})


deleteform.addEventListener('submit', e=>{
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: deleteurl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: function(response){
            window.location.href = window.location.origin + "/user/posts/"
            localStorage.setItem('title', titleinput.value)
        },
        error: function(error){
            $('#UpdateModal').modal('hide')
            updateform.reset()
        }
    })

})