const loadmore = document.getElementById('load-btn')
const posts = document.getElementById('post-box')
const spinner = document.getElementById('spinner')
const endbox = document.getElementById('end-box')

// $.ajax({
//     type: 'GET',
//     url: '/user/hello/',
//     success: function (response) {
//         console.log('success', response.text)
//         helloworldbox.textContent = response.text
//     },
//     error: function (error) {
//         console.log('error', error);
//     }
// })

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
                                        <a href="#" class="btn btn-primary">${el.liked ? `Unliked (${el.count})`: `Liked (${el.count})`}</a>
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
