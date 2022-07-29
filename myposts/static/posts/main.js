console.log('hello world')

const helloworldbox = document.getElementById('hello-world')

$.ajax({
    type: 'GET',
    url: '/user/hello/',
    success: function(response){
        console.log('success', response.text)
        helloworldbox.textContent = response.text
    },
    error: function(error){
        console.log('error', error);
    }
})