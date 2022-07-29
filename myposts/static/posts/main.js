const loadmore = document.getElementById('load-btn')
const posts = document.getElementById('post-box')
const spinner = document.getElementById('spinner')
const endbox = document.getElementById('end-box')


const getCookie= (name) => {
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

const likeUnlikeposts = () =>{

    const likeunlikeform = [...document.getElementsByClassName('like-unlike-form')]
    likeunlikeform.forEach(form => form.addEventListener('submit', e=> {
        e.preventDefault()
        const clickedid = e.target.getAttribute('data-form-id')
        const clickedbtn = document.getElementById(`like-unlike-${clickedid}`)

        $.ajax({
            type: 'POST',
            url: "",
            data: {
                'csrfmiddlewaretoken' : csrftoken,
                'pk':clickedid
            },
            success: function(response){
                console.log(response)
            },
            error: function(error){
                console.log(error)
            }

        });
        
    }));

}

let visible=3

const getData= () => {
    $.ajax(
        {
            type: 'GET',
            url: `/user/data/${visible}`,
            success: function (response) {
                const data = response.posts
                setTimeout(()=>{
                    spinner.classList.add('not-visible')
                    data.forEach(el => {
                        posts.innerHTML += `
                        <div class="card mb-3" style="width: 50rem;">
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
                                            <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unliked (${el.count})`: `Liked (${el.count})`}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    });
                }, 100)
                if (response.size === 0) {
                    endbox.textContent = 'No posts have been added'
                }

                else if (response.size <= visible){
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

loadmore.addEventListener('click', () =>{
    spinner.classList.remove('not-visible')
    visible +=3
    getData()
})

getData()
