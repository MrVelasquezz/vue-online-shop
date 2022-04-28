<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body,
  #app {
    background: #fafafa;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
  }

  .main {
    width: 1440px;
    height: 100vh;
  }

  .p-0 {
    padding: 0 !important;
  }

  .m-0 {
    margin: 0 !important;
  }

  img.img-fluid,
  .img-fluid {
    width: 100%;
    height: auto;
  }

  .container-fluid {
    width: 100%;
  }

  a:hover,
  a:active {
    transition: 1s color;
    color: #F54748;
    background: none;
    outline: none;
  }

  h1 {
    font-weight: 700 !important;
    font-size: 56px !important;
    text-align: center !important;
  }

  h2 {
    text-align: center !important;
    font-size: 36px !important;
    font-weight: 800 !important;
  }

  h5 {
    font-size: 24px !important;
    font-weight: 700 !important;
    margin: 1.2rem 0;
  }

  h6 {
    font-size: 20px !important;
    font-weight: 700 !important;
  }

  p,
  li {
    font-size: 18px !important;
    font-weight: 500 !important;
    line-height: 20px;
  }

  a,
  button {
    cursor: pointer !important;
  }

  ul {
    padding: 0;
  }

  ul li {
    list-style-type: none;
  }

  @media screen and (max-width: 1440px) {
    .main {
      width: 100vw !important;
    }
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-weight: 700 !important;
      font-size: 24px !important;
      text-align: center !important;
    }

    h2 {
      text-align: center !important;
      font-size: 24px !important;
      font-weight: 800 !important;
    }

    h5 {
      font-size: 24px !important;
      font-weight: 700 !important;
    }

    h6 {
      font-size: 20px !important;
      font-weight: 700 !important;
    }

    p,
    li {
      font-size: 16px !important;
    }
  }
</style>