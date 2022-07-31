const loadmore = document.getElementById('load-btn')
const posts = document.getElementById('post-box')
const spinner = document.getElementById('spinner')
const endbox = document.getElementById('end-box')
const postform = document.getElementById('post-form')
const title = document.getElementById('id_title')
const body = document.getElementById('id_body')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const alertbox = document.getElementById('alert-box')
console.log('csrf', csrf[0].value)


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikeposts = () => {

    const likeunlikeform = [...document.getElementsByClassName('like-unlike-form')]
    likeunlikeform.forEach(form => form.addEventListener('submit', e => {
        e.preventDefault()
        const clickedid = e.target.getAttribute('data-form-id')
        const clickedbtn = document.getElementById(`like-unlike-${clickedid}`)

        $.ajax({
            type: 'POST',
            url: "/user/like/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedid
            },
            success: function (response) {
                clickedbtn.textContent = response.liked ? `Unliked (${response.count})` : `Liked (${response.count})`
            },
            error: function (error) {
                console.log(error)
            }

        });

    }));

}

let visible = 3

const getData = () => {
    $.ajax(
        {
            type: 'GET',
            url: `/user/data/${visible}`,
            success: function (response) {
                const data = response.posts
                setTimeout(() => {
                    spinner.classList.add('not-visible')
                    data.forEach(el => {
                        posts.innerHTML += `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${el.title}</h5>
                                <p class="card-text">${el.body}</p>
                                <p class="card-text"> By: ${el.author}</p>
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-2">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-2">
                                        <form class="like-unlike-form" data-form-id="${el.id}">
                                            <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unliked (${el.count})` : `Liked (${el.count})`}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    });
                    likeUnlikeposts()
                }, 100)
                if (response.size === 0) {
                    endbox.textContent = 'No posts have been added'
                }

                else if (response.size <= visible) {
                    loadmore.classList.add('not-visible')
                    endbox.textContent = 'No more posts to load'
                }
            },
            error: function (error) {
                console.log('error', error)
            }
        }
    )

}

loadmore.addEventListener('click', () => {
    spinner.classList.remove('not-visible')
    visible += 3
    getData()
})

postform.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': title.value,
            'body': body.value,
        },
        success: function (response) {
            console.log(response)
            posts.insertAdjacentHTML('afterbegin', `
            <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${response.title}</h5>
                <p class="card-text">${response.body}</p>
                <p class="card-text"> By: ${response.author}</p>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-2">
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                    <div class="col-2">
                        <form class="like-unlike-form" data-form-id="${response.id}">
                            <button href="#" class="btn btn-primary" id="like-unlike-${response.id}">Like</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

            `)
        likeUnlikeposts()
        $('#addPostModal').modal('hide')
        // $("#post-form").trigger("reset");
        handleAlerts('success', 'You have successfully added a post')
        postform.reset()
        },
        error: function (error) {
            console.log(error)
            $('#addPostModal').modal('hide')
            handleAlerts('danger', 'Something went wrong. Please try again')
        }
    })
})
getData()
