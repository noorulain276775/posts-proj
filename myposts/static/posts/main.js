console.log('hello world')

const helloworldbox = document.getElementById('hello-world')
const posts = document.getElementById('post-box')
const spinner = document.getElementById('spinner')

$.ajax({
    type: 'GET',
    url: '/user/hello/',
    success: function (response) {
        console.log('success', response.text)
        helloworldbox.textContent = response.text
    },
    error: function (error) {
        console.log('error', error);
    }
})

$.ajax(
    {
        type: 'GET',
        url: '/user/data',
        success: function (response) {
            const data = response.posts
            setTimeout(()=>{
                spinner.classList.add('not-visible')
                data.forEach(el => {
                    posts.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">${el.title}</h5>
                        <p class="card-text">${el.body}</p>
                        <a href="#" class="btn btn-primary">Details</a>
                        </div>
                    </div><br>`
                });
            }, 100)
        },
        error: function (error) {
            console.log('error', error)
        }
    }
)