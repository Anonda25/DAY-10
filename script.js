
const lodeAllApi = async (seacrhText) => {

    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${seacrhText ? `?category=${seacrhText}` : ''}`);

  document.getElementById('post-container').innerHTML= '';


    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${seacrhText ? `?category=${seacrhText}` : ''}`)
    const data = await res.json()
    displayAllPost(data.posts);
    
}


const displayAllPost = (post) => {
    // console.log(post);
    const postContainer = document.getElementById('post-container');

    post.forEach(items => {
        const div = document.createElement('div')
        div.innerHTML = `
       
<div class="w-full h-full mx-auto bg-white shadow-lg rounded-lg gap-5 overflow-hidden">
    <!-- Logo Section -->
    <div class="">
        <img class="w-12 h-12 mx-auto rounded-full" src="${items.image}" alt="Logo">
        <h2 class="ml-4 text-xl font-bold text-gray-800">${items.title}</h2>
    </div>

    <!-- Content Section -->
    <div class="px-4 pb-4">
        <p class="text-gray-600 mt-2">${items.description}</p>

        <!-- Views and Like Button -->
        <div class="flex items-center justify-between mt-4 ">
            <div class=""gap-5 flex">
            <span class="text-gray-600 text-sm ">${items.comment_count}</span>
            <span class="text-gray-600 text-sm ml-2">${items.posted_time}</span>
            <span class="text-gray-600 text-sm ml-2">${items.view_count}</span>
            <span class="text-gray-600 text-sm ml-2">${items.comment_count}</span></div>
            <button  onclick="markAsRead('${items.description}','${items.view_count}')" class="flex items-center  bg-blue-500 text-white px-3 py-1 rounded">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15a7 7 0 0114 0c0 7-7 9-7 9s-7-2-7-9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a3 3 0 110-6 3 3 0 010 6z"></path>
                </svg>
              
            </button>
        </div>
    </div>
</div>  
       `

        postContainer.appendChild(div)
    });
}

const markAsRead = (description, view_count) => {
    console.log(description, view_count);

    const markAsReadContainer = document.getElementById('markAsReadContainer')
    const div = document.createElement('div')
    div.innerHTML = `

    <div class="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Top Section: Title on the left and Icon on the right -->
    <div class="flex items-center justify-between p-4">
        <h2 class="text-xl font-bold text-gray-800">${description}</h2>
        <h2 class="text-xl font-bold text-gray-800">${view_count}</h2>
       
    </div>

</div>

    
    `
    markAsReadContainer.appendChild(div)
    hendlerBtn()

}

const hendlerBtn = () => {
    const priveCount = document.getElementById('markAsReadCounter').innerText
    const convertCounter = parseInt(priveCount)
    const sum = convertCounter + 1;

    document.getElementById('markAsReadCounter').innerText = sum
}

const letestPostContent = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const update = await res.json()
    letestPost(update);
}



const letestPost =(items)=>{
    console.log(items);
items.forEach(data=>{
    const latestPostContainer = document.getElementById('latest-post-container')

    const letest =document.createElement('div')
    letest.innerHTML=`
     <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
                    <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                        <img src=${data.cover_image} alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                        <p class="opacity-50 text-start">
                            <i class="fa-solid fa-calendar-days me-2"></i>${data.author?.posted_date || "No Publish Date"}
                        </p>
                        <h2 class="card-title text-start">${data.title}</h2>
                        <p class="text-start">
                            ${data.description}
                        </p>
                        <div class="card-actions flex gap-5 items-center">
                            <div class="avatar">
                                <div class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src=${data.profile_image} />
                                </div>
                            </div>
                            <div>
                                <h3 class="text-start font-extrabold">${data.author.name}</h3>
                                
                                <p class="text-start opacity-60">${data.author?.designation || "Unknown"}</p>
                            </div>
                        </div>
                
                
                        <span id="latestPostLoader" class="loading loading-infinity loading-lg lg:mt-24 text-primary ">
                        </span>
                        <!-- dynamic content -->
                    </div>
                </div>

    `
    latestPostContainer.appendChild(letest)
})
}



lodeAllApi()
//mustbe coll the function
letestPostContent()

const searchHandlerBtn = () => {
    const seacrhText = document.getElementById('searchPosts').value;

    lodeAllApi(seacrhText);
    // setTimeout(function(){
    //     lodeAllApi()
    // },3000)
}

