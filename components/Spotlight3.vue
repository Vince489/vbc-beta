<template>
  <div class="flex justify-center">

    <div class="flex flex-col-reverse max-w-6xl lg:flex-row p-4 pb-6 mx-auto">

      <div class="one lg:w-1/2 bg-gray-600 text-gray-300 rounded-b-xl lg:rounded-none lg:rounded-l-xl">

        <div class="p-10">        
          <h2 class="pb-5 text-2xl">Lamar Wilson</h2>
          <h3 class="pb-3">XBOX - Metabox Promotions</h3>
          <p class="pb-5">Middleweight prospect advances to (6-0-0) with his Unanimous Decision win over Gomez. </p>
          <button class="px-4 py-2 rounded-full bg-[#0b7696] text-gray-300">FULL FIGHT</button>
        </div>

      </div>
      
      <div class="two lg:w-1/2">
        <div>
          <img class="spotlight-image rounded-t-xl lg:rounded-none lg:rounded-r-xl" src="https://virtronesports.com/img/ko.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .spotlight-image-container {
    width: 100%;
    max-height: 330px; /* set the desired height */
    overflow: hidden; /* Hide any overflow to prevent the image from exceeding the container */
  }

  .spotlight-image {
    width: 100%;
    height: 100%; /* Ensure the image covers the entire container */
    object-fit: cover; /* Maintain aspect ratio and cover the container */
  }

  @media (max-width: 768px) {
    .spotlight-image-container {
      max-height: 200px; /* Adjust the max-height for mobile devices */
    }
  }
</style>

