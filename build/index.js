
const handeLocalhostLocation = `http://localhost:3001/api/`


const handelClickDisplayResponsiveMenue = () =>{
  // nav-span-con res-nav-cov-con
  document.getElementById('nav-span-con').style.display = "none"
  document.getElementById('res-nav-cov-con').style.display = "block"
  document.getElementById('nav-span-con-close').style.display = "flex"


}
const handelClickHiddeResponsiveMenue = () =>{
  // nav-span-con res-nav-cov-con
  document.getElementById('nav-span-con').style.display = "flex"
  document.getElementById('res-nav-cov-con').style.display = "none"
  document.getElementById('nav-span-con-close').style.display = "none"


}

const handelMouseMoveDisplayText = (idName, type, number) =>{

  if (type === 'equpment') {
    document.getElementById(idName).style.display = "block"

  }else if (type === 'gallary') {
    // section-gallary-img-hover-text-name
    if (number >= 0) {
      // console.log(number);
      document.getElementById(`section-gallary-img-hover-text-name-${number}`).style.display = "flex"

    } else {
      document.getElementById("section-gallary-img-hover-text-name").style.display = "flex"

    }

    document.getElementById(idName).style.display = "flex"

  }

}

const handelMouseMovehiddeText = (idName, type, number) =>{

  if (type === 'equpment') {
    document.getElementById(idName).style.display = "none"
  }else if (type === 'gallary') {
    // section-gallary-img-hover-text-name
    if (number >= 0) {
      // console.log(number);

      document.getElementById(`section-gallary-img-hover-text-name-${number}`).style.display = "none"

    } else {
      document.getElementById("section-gallary-img-hover-text-name").style.display = "none"
    }
    //

    document.getElementById(idName).style.display = "none"

  }

}
const handleClickOpenBackgroung = (updateId) =>{


  document.getElementById('back-sec-scr').style.display = "flex"
  document.getElementById('back-ground-update-upload-con').style.display = "block"
  document.getElementById('back-update-con').style.display = "block"
  document.getElementById('back-upload-con').style.display = "none"
  document.getElementById("load-screen-err").style.display = "none"

  // designe the background to edit from here
  let getUserinfo = localStorage.getItem("adminDate")
  let jsonGetUserInfo = JSON.parse(getUserinfo)

  const getCurrentLoc = window.location.href.split('/')
  // const getPageNames = getCurrentLoc[getCurrentLoc?.length-1].split('?')[0]

  const getPageName = getCurrentLoc[getCurrentLoc.length-1].split('?')[0]
  const listPageName = ["equipment-rental.html", "concrete-products.html", "contact-us.html", "gallery.html",
      "sales-supply.html"
  ]
  const filterPage = listPageName.filter(v => v===getPageName)

  if(getPageName === filterPage[0]){

      if (getPageName === "equipment-rental.html") {
        let targetCurrentProduct = ``
        jsonGetUserInfo.equipmentRental?.map((val, idx)=>{
          if (val._id === updateId) {
            targetCurrentProduct = `


              <div
                class="update-container-img up-con-img-update"
                id="update-con-img"
              >

                <div class="update-contain-img-body">
                  <img id="up-con-img" src="${val.image_url}" alt="${val.image_name}" />
                  <div
                    class="update-contain-img-info"
                    id="update-con-img-info"
                  >
                    <h2>
                      ${val.image_name}
                    </h2>
                  </div>

                </div>
                <button
                  class="update-bttn"
                  type="button"
                  name="button"
                  onclick="handlehiddeImg('update')"
                >
                  Edit
                </button>

              </div>
              <form enctype="multipart/form-data"
                id="update-con-inp"
                class="update-container-input up-con-img-update"
              >

                  <div class="update-contain-img-body">
                    <input
                      type="file"
                      accept="image/*"
                      id="updateImg"
                      onchange="handelImageUpdateChange(event, 'update')"
                    />
                  </div>
                  <div class="update-contain-img-info">
                    <input
                      type="text"
                      id="imgInfo"
                      placeholder="Name Image"
                      oninput="handleChangeImageName(event, 'update')"
                     />
                  </div>

                  <button
                    class="update-bttn"
                    type="button"
                    name="button"
                    onclick="handelUpdateEvent('${val._id}')"
                  >
                    Update
                  </button>
                  <button
                    class="preview-bttn"
                    type="button"
                    name="button"
                    onclick="handelDisplayImg('update')"
                  >
                    Preview
                  </button>

              </form>



            `
          }

        })
        document.getElementById("update-con-img-inp").innerHTML = targetCurrentProduct
      }else if (getPageName === "concrete-products.html") {
        let targetCurrentProduct = ``
        jsonGetUserInfo.concreteProducts?.map((val, idx)=>{
          if (val._id === updateId) {
            targetCurrentProduct = `


              <div
                class="update-container-img up-con-img-update"
                id="update-con-img"
              >

                <div class="update-contain-img-body">
                  <img id="up-con-img" src="${val.image_url}" alt="${val.image_name}" />
                  <div
                    class="update-contain-img-info"
                    id="update-con-img-info"
                  >
                    <h2>
                      ${val.image_name}
                    </h2>
                  </div>

                </div>
                <button
                  class="update-bttn"
                  type="button"
                  name="button"
                  onclick="handlehiddeImg('update')"
                >
                  Edit
                </button>

              </div>
              <form enctype="multipart/form-data"
                id="update-con-inp"
                class="update-container-input up-con-img-update"
              >

                  <div class="update-contain-img-body">
                    <input
                      type="file"
                      accept="image/*"
                      id="updateImg"
                      onchange="handelImageUpdateChange(event, 'update')"
                    />
                  </div>
                  <div class="update-contain-img-info">
                    <input
                      type="text"
                      id="imgInfo"
                      placeholder="Name Image"
                      oninput="handleChangeImageName(event, 'update')"
                     />
                  </div>

                  <button
                    class="update-bttn"
                    type="button"
                    name="button"
                    onclick="handelUpdateEvent('${val._id}')"
                  >
                    Update
                  </button>
                  <button
                    class="preview-bttn"
                    type="button"
                    name="button"
                    onclick="handelDisplayImg('update')"
                  >
                    Preview
                  </button>

              </form>



            `
          }

        })
        document.getElementById("update-con-img-inp").innerHTML = targetCurrentProduct
      }else if (getPageName === "gallery.html") {
        let targetCurrentProduct = ``
        jsonGetUserInfo.gallary?.map((val, idx)=>{
          if (val._id === updateId) {
            targetCurrentProduct = `


              <div
                class="update-container-img up-con-img-update"
                id="update-con-img"
              >

                <div class="update-contain-img-body">
                  <img id="up-con-img" src="${val.image_url}" alt="${val.image_name}" />
                  <div
                    class="update-contain-img-info"
                    id="update-con-img-info"
                  >
                    <h2>
                      ${val.image_name}
                    </h2>
                  </div>

                </div>
                <button
                  class="update-bttn"
                  type="button"
                  name="button"
                  onclick="handlehiddeImg('update')"
                >
                  Edit
                </button>

              </div>
              <form enctype="multipart/form-data"
                id="update-con-inp"
                class="update-container-input up-con-img-update"
              >

                  <div class="update-contain-img-body">
                    <input
                      type="file"
                      accept="image/*"
                      id="updateImg"
                      onchange="handelImageUpdateChange(event, 'update')"
                    />
                  </div>
                  <div class="update-contain-img-info">
                    <input
                      type="text"
                      id="imgInfo"
                      placeholder="Name Image"
                      oninput="handleChangeImageName(event, 'update')"
                     />
                  </div>

                  <button
                    class="update-bttn"
                    type="button"
                    name="button"
                    onclick="handelUpdateEvent('${val._id}')"
                  >
                    Update
                  </button>
                  <button
                    class="preview-bttn"
                    type="button"
                    name="button"
                    onclick="handelDisplayImg('update')"
                  >
                    Preview
                  </button>

              </form>



            `
          }

        })
        document.getElementById("update-con-img-inp").innerHTML = targetCurrentProduct
      }else{
        let targetCurrentProduct = ``
        jsonGetUserInfo.salesSupply?.map((val, idx)=>{
          if (val._id === updateId) {
            targetCurrentProduct = `


              <div
                class="update-container-img up-con-img-update"
                id="update-con-img"
              >

                <div class="update-contain-img-body">
                  <img id="up-con-img" src="${val.image_url}" alt="${val.image_name}" />
                  <div
                    class="update-contain-img-info"
                    id="update-con-img-info"
                  >
                    <h2>
                      ${val.image_name}
                    </h2>
                  </div>

                </div>
                <button
                  class="update-bttn"
                  type="button"
                  name="button"
                  onclick="handlehiddeImg('update')"
                >
                  Edit
                </button>

              </div>
              <form enctype="multipart/form-data"
                id="update-con-inp"
                class="update-container-input up-con-img-update"
              >

                  <div class="update-contain-img-body">
                    <input
                      type="file"
                      accept="image/*"
                      id="updateImg"
                      onchange="handelImageUpdateChange(event, 'update')"
                    />
                  </div>
                  <div class="update-contain-img-info">
                    <input
                      type="text"
                      id="imgInfo"
                      placeholder="Name Image"
                      oninput="handleChangeImageName(event, 'update')"
                     />
                  </div>

                  <button
                    class="update-bttn"
                    type="button"
                    name="button"
                    onclick="handelUpdateEvent('${val._id}')"
                  >
                    Update
                  </button>
                  <button
                    class="preview-bttn"
                    type="button"
                    name="button"
                    onclick="handelDisplayImg('update')"
                  >
                    Preview
                  </button>

              </form>



            `
          }

        })
        document.getElementById("update-con-img-inp").innerHTML = targetCurrentProduct
      }


  }
}

const handleClickOpenBackgroungUpload = () =>{


  document.getElementById('back-sec-scr').style.display = "flex"
  document.getElementById('back-ground-update-upload-con').style.display = "block"
  document.getElementById('back-update-con').style.display = "none"
  document.getElementById('back-upload-con').style.display = "block"
  document.getElementById("load-screen-err").style.display = "none"

}

const handleClickCloseBackgroung = () =>{
  document.getElementById('back-sec-scr').style.display = "none"

}

const handelDeleteImage = async(valueId) =>{
  console.log(valueId)
  const getUserinfo = localStorage.getItem("adminDate")
  const jsonGetUserInfo = JSON.parse(getUserinfo)

  const getCurrentLoc = window.location.href.split('/')
  // const getPageNames = getCurrentLoc[getCurrentLoc?.length-1].split('?')[0]

  const getPageName = getCurrentLoc[getCurrentLoc.length-1].split('?')[0]
  const listPageName = ["equipment-rental.html", "concrete-products.html", "contact-us.html", "gallery.html",
      "sales-supply.html"
  ]
  const filterPage = listPageName.filter(v => v===getPageName)

  // productId


  const deleted = alert("press Ok to delete this product! or Refresh page")
  if(!deleted){
    console.log("deleted")
    if(getPageName === filterPage[0]){
      if (getPageName === "equipment-rental.html") {
        console.log("equipment-rental.html")
        try {

          const urlUpate = `${handeLocalhostLocation}delete/${jsonGetUserInfo.email}/equpmentRental/${valueId}`
          // display loading
          displayLoadingScreen()
          const responseUpdate = await fetch(urlUpate)
          let dataUpdata = await responseUpdate.json();


          console.log(responseUpdate)

          if( responseUpdate.status === 200){ // responseUpdate.status === 200
              // VIEW LOADING
              // displayReversLoadingScreen()
              window.location.replace("./equipment-rental.html")
          }
          else{
              // error
              displayErrorScreen(dataUpdata.error)
          }



        } catch (e) {
          displayErrorScreen("NETWORK ERROR")
        }
      } else if (getPageName === "concrete-products.html") {
        try {

          const urlUpate = `${handeLocalhostLocation}delete/${jsonGetUserInfo.email}/concreteProduct/${valueId}`
          // display loading
          displayLoadingScreen()
          const responseUpdate = await fetch(urlUpate)
          let dataUpdata = await responseUpdate.json();


          console.log(responseUpdate)

          if( responseUpdate.status === 200){ // responseUpdate.status === 200
              // VIEW LOADING
              // displayReversLoadingScreen()
              window.location.replace("./concrete-products.html")

          }
          else{
              // error
              displayErrorScreen(dataUpdata.error)
          }



        } catch (e) {
          displayErrorScreen("NETWORK ERROR")
        }
      }else if (getPageName === "gallery.html") {
        try {

          const urlUpate = `${handeLocalhostLocation}delete/${jsonGetUserInfo.email}/gallary/${valueId}`
          // display loading
          displayLoadingScreen()
          const responseUpdate = await fetch(urlUpate)
          let dataUpdata = await responseUpdate.json();


          console.log(responseUpdate)

          if( responseUpdate.status === 200){ // responseUpdate.status === 200
              // VIEW LOADING
              // displayReversLoadingScreen()
              window.location.replace("./gallery.html")

          }
          else{
              // error
              displayErrorScreen(dataUpdata.error)
          }



        } catch (e) {
          displayErrorScreen("NETWORK ERROR")
        }
      }else{
        try {

          const urlUpate = `${handeLocalhostLocation}delete/${jsonGetUserInfo.email}/salesSupply/${valueId}`
          // display loading
          displayLoadingScreen()
          const responseUpdate = await fetch(urlUpate)
          let dataUpdata = await responseUpdate.json();


          console.log(responseUpdate)

          if( responseUpdate.status === 200){ // responseUpdate.status === 200
              // VIEW LOADING
              // displayReversLoadingScreen()
              window.location.replace("./sales-supply.html")
          }
          else{
              // error
              displayErrorScreen(dataUpdata.error)
          }


        } catch (e) {
          displayErrorScreen("NETWORK ERROR")
        }
      }
    }

  }
}

const handelDisplayImg = (typeEvent) =>{
  if (typeEvent === "update") {
    document.getElementById("update-con-img").style.display = "block"
    document.getElementById("update-con-inp").style.display = "none"

  } else {
    document.getElementById("upload-con-img").style.display = "block"
    document.getElementById("upload-con-inp").style.display = "none"
  }

}

const handlehiddeImg = (typeEvent) =>{

  if (typeEvent === "update") {
    document.getElementById("update-con-img").style.display = "none"
    document.getElementById("update-con-inp").style.display = "block"
  } else {
    document.getElementById("upload-con-img").style.display = "none"
    document.getElementById("upload-con-inp").style.display = "block"
  }

}

const handelImageUpdateChange = (event, typeEvent) =>{

  if (typeEvent === "update") {
    // console.log("changed value")
    const getImageLoc = document.getElementById("updateImg").files[0]
    // console.log(getImageLoc)
    const imageUrl = URL.createObjectURL(getImageLoc)
    console.log(imageUrl)
    const setUpdateImgAtt = document.getElementById("up-con-img")
    setUpdateImgAtt.setAttribute('src', imageUrl)

    // display image
    handelDisplayImg('update')
  } else {
    // console.log("changed value")
    const getImageLoc = document.getElementById("uploadImg").files[0]
    // console.log(getImageLoc)
    const imageUrl = URL.createObjectURL(getImageLoc)
    console.log(imageUrl)
    const setUpdateImgAtt = document.getElementById("uplo-con-img")
    setUpdateImgAtt.setAttribute('src', imageUrl)

    // display image
    handelDisplayImg('upload')
  }

}

const handleChangeImageName = (event, typeEvent) =>{

  if (typeEvent === "update") {
    const getUpdateInfo = document.getElementById("imgInfo").value
    // console.log(getUpdateInfo)
    document.getElementById("update-con-img-info").innerHTML = `<h2>${getUpdateInfo}</h2>`
  } else {
    const getUpdateInfo = document.getElementById("imgInfoUpload").value
    // console.log(getUpdateInfo)
    document.getElementById("upload-con-img-info").innerHTML = `<h2>${getUpdateInfo}</h2>`
  }

}

const displayLoadingScreen = () =>{
  console.log("loading...")
  document.getElementById("back-sec-scr").style.display = "flex"
  document.getElementById("load-screen-err").style.display = "block"
  document.getElementById("load-screen").style.display = "block"
  document.getElementById("err-screen").style.display = "none"
  document.getElementById('back-ground-update-upload-con').style.display = "none"
  document.getElementById('back-remove').style.display = "none"

  // back-remove

}
const displayReversLoadingScreen = () =>{

  document.getElementById("back-sec-scr").style.display = "none"
  document.getElementById("load-screen-err").style.display = "none"
  document.getElementById("load-screen").style.display = "none"
  document.getElementById("err-screen").style.display = "block"
  document.getElementById('back-ground-update-upload-con').style.display = "none"
  document.getElementById('back-remove').style.display = "block"

}

const displayErrorScreen = (errorInfo) =>{
  console.log("error...")
  document.getElementById("err-load-info").innerHTML = `<h4> ${errorInfo} </h4>`

  document.getElementById("back-sec-scr").style.display = "flex"
  document.getElementById("load-screen-err").style.display = "block"
  document.getElementById("load-screen").style.display = "none"
  document.getElementById("err-screen").style.display = "block"
  document.getElementById('back-ground-update-upload-con').style.display = "none"
  document.getElementById('back-remove').style.display = "none"

  setTimeout(()=>{
    console.log("errorRev...")
    document.getElementById("back-sec-scr").style.display = "none"
    document.getElementById("load-screen-err").style.display = "none"
    document.getElementById("load-screen").style.display = "none"
    document.getElementById("err-screen").style.display = "block"

    document.getElementById('back-ground-update-upload-con').style.display = "none"
    document.getElementById('back-remove').style.display = "block"
  }, 4000)
}

const handelUpdateEvent = async(productId) =>{

    const getUserinfo = localStorage.getItem("adminDate")
    const jsonGetUserInfo = JSON.parse(getUserinfo)

    const getCurrentLoc = window.location.href.split('/')
    // const getPageNames = getCurrentLoc[getCurrentLoc?.length-1].split('?')[0]

    const getPageName = getCurrentLoc[getCurrentLoc.length-1].split('?')[0]
    const listPageName = ["equipment-rental.html", "concrete-products.html", "contact-us.html", "gallery.html",
        "sales-supply.html"
    ]
    const filterPage = listPageName.filter(v => v===getPageName)

    // productId

    if(getPageName === filterPage[0]){


        if (getPageName === "equipment-rental.html") {

          try {

            const formDataID = new FormData()

            const updateImg = document.getElementById("updateImg").files[0]
            const updateImgvalue = document.getElementById("updateImg").value
            const updateImgName = document.getElementById("imgInfo").value


            formDataID.append("updateImg", updateImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("updateImgName", updateImgName)
            formDataID.append("pageType", "equpmentRental")
            formDataID.append("productId", productId)
            // productId

            console.log(formDataID, updateImg, jsonGetUserInfo.email, "equpmentRental")

            if (updateImgvalue && updateImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}update`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./equipment-rental.html")
              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            console.log(e)
            displayErrorScreen("NETWORK ERROR")
          }
        } else if (getPageName === "concrete-products.html") {
          try {

            const formDataID = new FormData()

            const updateConcreateImg = document.getElementById("updateImg").files[0]
            const updateConcreateImgvalue = document.getElementById("updateImg").value
            const updateConcreateImgName = document.getElementById("imgInfo").value


            formDataID.append("updateImg", updateConcreateImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("updateImgName", updateConcreateImgName)
            formDataID.append("pageType", "concreteProduct")
            formDataID.append("productId", productId)

            console.log(formDataID, updateConcreateImg, jsonGetUserInfo.email, "concreteProduct")

            if (updateConcreateImgvalue && updateConcreateImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}update`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  window.location.replace("./concrete-products.html")
                  // displayReversLoadingScreen()

              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            displayErrorScreen("NETWORK ERROR")
          }
        }else if (getPageName === "gallery.html") {
          try {

            const formDataID = new FormData()

            const updateGallaryImg = document.getElementById("updateImg").files[0]
            const updateGallaryImgvalue = document.getElementById("updateImg").value
            const updateGallaryImgName = document.getElementById("imgInfo").value


            formDataID.append("updateImg", updateGallaryImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("updateImgName", updateGallaryImgName)
            formDataID.append("pageType", "gallary")
            formDataID.append("productId", productId)

            console.log(formDataID, updateGallaryImg, jsonGetUserInfo.email, "gallary")

            if (updateGallaryImgvalue && updateGallaryImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}update`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  window.location.replace("./gallery.html")
                  // "sales-supply.html"
                  // displayReversLoadingScreen()

              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            displayErrorScreen("NETWORK ERROR")
          }
        }else {
          try {

            const formDataID = new FormData()

            const updateSalesSupplyImg = document.getElementById("updateImg").files[0]
            const updateSalesSupplyImgvalue = document.getElementById("updateImg").value
            const updateSalesSupplyImgName = document.getElementById("imgInfo").value


            formDataID.append("updateImg", updateSalesSupplyImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("updateImgName", updateSalesSupplyImgName)
            formDataID.append("pageType", "salesSupply")
            formDataID.append("productId", productId)

            console.log(formDataID, updateSalesSupplyImg, jsonGetUserInfo.email, "salesSupply")

            if (updateSalesSupplyImgvalue && updateSalesSupplyImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}update`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./sales-supply.html")
                  // "sales-supply.html"

              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            displayErrorScreen("NETWORK ERROR")
          }
        }


    }
}

const handelUploadEvent = async() =>{

    const getUserinfo = localStorage.getItem("adminDate")
    const jsonGetUserInfo = JSON.parse(getUserinfo)

    const getCurrentLoc = window.location.href.split('/')
    // const getPageNames = getCurrentLoc[getCurrentLoc?.length-1].split('?')[0]

    const getPageName = getCurrentLoc[getCurrentLoc.length-1].split('?')[0]
    const listPageName = ["equipment-rental.html", "concrete-products.html", "contact-us.html", "gallery.html",
        "sales-supply.html"
    ]
    const filterPage = listPageName.filter(v => v===getPageName)

    if(getPageName === filterPage[0]){


        if (getPageName === "equipment-rental.html") {
          console.log("equipment-rental.html")
          try {

            const formDataID = new FormData()

            const uploadImg = document.getElementById("uploadImg").files[0]
            const uploadImgvalue = document.getElementById("uploadImg").value
            const uploadImgName = document.getElementById("imgInfoUpload").value


            formDataID.append("uploadImg", uploadImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("uploadImgName", uploadImgName)
            formDataID.append("pageType", "equpmentRental")


            console.log(formDataID, uploadImg, jsonGetUserInfo.email, "equpmentRental")

            if (uploadImgvalue && uploadImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}upload`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./equipment-rental.html")


              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            displayErrorScreen("NETWORK ERROR")
          }
        } else if (getPageName === "concrete-products.html") {
          try {

            const formDataID = new FormData()

            const uploadConcreateImg = document.getElementById("uploadImg").files[0]
            const uploadConcreateImgvalue = document.getElementById("uploadImg").value
            const uploadConcreateImgName = document.getElementById("imgInfoUpload").value


            formDataID.append("uploadImg", uploadConcreateImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("uploadImgName", uploadConcreateImgName)
            formDataID.append("pageType", "concreteProduct")

            console.log(formDataID, uploadConcreateImg, jsonGetUserInfo.email, "concreteProduct")

            if (uploadConcreateImgvalue && uploadConcreateImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}upload`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./concrete-products.html")
              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            console.log(e)
            displayErrorScreen("NETWORK ERROR")
          }
        }else if (getPageName === "gallery.html") {
          try {

            const formDataID = new FormData()

            const uploadGallaryImg = document.getElementById("uploadImg").files[0]
            const uploadGallaryImgvalue = document.getElementById("uploadImg").value
            const uploadGallaryImgName = document.getElementById("imgInfoUpload").value


            formDataID.append("uploadImg", uploadGallaryImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("uploadImgName", uploadGallaryImgName)
            formDataID.append("pageType", "gallary")

            console.log(formDataID, uploadGallaryImg, jsonGetUserInfo.email, "gallary")

            if (uploadGallaryImgvalue && uploadGallaryImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}upload`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./gallery.html")
                  // "sales-supply.html"

              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            console.log(e)
            displayErrorScreen("NETWORK ERROR")
          }
        }else{
          try {

            const formDataID = new FormData()

            const uploadSalesSupplyImg = document.getElementById("uploadImg").files[0]
            const uploadSalesSupplyImgvalue = document.getElementById("uploadImg").value
            const uploadSalesSupplyImgName = document.getElementById("imgInfoUpload").value


            formDataID.append("uploadImg", uploadSalesSupplyImg)
            formDataID.append("email", jsonGetUserInfo.email)
            formDataID.append("uploadImgName", uploadSalesSupplyImgName)
            formDataID.append("pageType", "salesSupply")

            console.log(formDataID, uploadSalesSupplyImg, jsonGetUserInfo.email, "salesSupply")

            if (uploadSalesSupplyImgvalue && uploadSalesSupplyImgName) {
              const configUpdate = {
                      'method': "POST",
                      // 'headers': {
                      //     'Accept': 'application/json',
                      //     'Content-Type': 'application/json',
                      // },
                      "body": formDataID
              }

              const urlUpate = `${handeLocalhostLocation}upload`
              // display loading
              displayLoadingScreen()
              const responseUpdate = await fetch(urlUpate, configUpdate)
              let dataUpdata = await responseUpdate.json();


              console.log(responseUpdate)

              if( responseUpdate.status === 200){ // responseUpdate.status === 200
                  // VIEW LOADING
                  // displayReversLoadingScreen()
                  window.location.replace("./sales-supply.html")
                  // "sales-supply.html"

              }
              else{
                  // error
                  displayErrorScreen(dataUpdata.error)
              }
            } else {
              displayErrorScreen("INVALIDE IMAGE FILE")
            }



          } catch (e) {
            console.log(e)
            displayErrorScreen("NETWORK ERROR")
          }
        }


    }
}

const getAccountInfo = async ()=>{
  try {

    let getUserinfo = localStorage.getItem("adminDate")
    let jsonGetUserInfo = JSON.parse(getUserinfo)

    // display loading
    displayLoadingScreen()

    // console.log(jsonGetUserInfo?.email)

    const response = await fetch(`${handeLocalhostLocation}account/${jsonGetUserInfo?.email}`)
    // const response = await fetch(`${handeLocalhostLocation}account/${"olatunjiJm@modanmic.com"}`)
    // olatunjiJm@modanmic.com
    // const response = // await fetch("http://localhost:3001/api/users/modanmic")
    let responseData = await response.json();
    // console.log(data.usernameInfo)
    // console.log(response)

    if (response.status === 200) {
      // display reversloading
      displayReversLoadingScreen()
      localStorage.setItem("adminDate", JSON.stringify(responseData?.account))
      return responseData?.account
    } else {

      displayErrorScreen(responseData.error)

    }

  } catch (e) {
    console.log(e)
    displayErrorScreen("NETWORK ERROR")
  }

}

const displayEquipments = async() =>{


  // let getUserinfo = localStorage.getItem("adminDate")
  // let jsonGetUserInfo = JSON.parse(getUserinfo)
  let jsonGetUserInfo = await getAccountInfo()

  // console.log(jsonGetUserInfo)
  console.log(jsonGetUserInfo)

  let stroreNewCard = ``
  jsonGetUserInfo.equipmentRental?.map((val, idx)=>{
    stroreNewCard += `
    <div class="container-card-image-info">
      <img src=${val.image_url} alt=${val.image_name} class="container-card-image" />
      <div class="container-card-info">

        <h4>
          ${val.image_name}
        </h4>

        <div class="container-card-info-btn">
          <button
            onclick="handleClickOpenBackgroung('${val._id}')"
            type="button"
          >
            Edit
          </button>
          <button
            onclick="handelDeleteImage('${val._id}')"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
    `
  })
  document.getElementById("sec-equp-rent-bod").innerHTML = stroreNewCard
  // sec-equp-rent-bod
  // file:///C:/Users/Spacedar/Desktop/projects/olatunjiJmBackendProject/build/equipment-rental.html

}

const displayConcreate = async() =>{
  // let getUserinfo = localStorage.getItem("adminDate")
  // let jsonGetUserInfo = JSON.parse(getUserinfo)
  let jsonGetUserInfo = await getAccountInfo()

  let stroreNewCard = ``
  jsonGetUserInfo.concreteProducts?.map((val, idx)=>{
    stroreNewCard += `
    <div class="container-card-image-info">
      <img src=${val.image_url} alt=${val.image_name} class="container-card-image" />
      <div class="container-card-info">

        <h4>
          ${val.image_name}
        </h4>

        <div class="container-card-info-btn">
          <button
            onclick="handleClickOpenBackgroung('${val._id}')"
            type="button"
          >
            Edit
          </button>
          <button
            onclick="handelDeleteImage('${val._id}')"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
    `
  })
  document.getElementById("sec-equp-rent-bod").innerHTML = stroreNewCard

}

const displaySalessupply = async() =>{
  // let getUserinfo = localStorage.getItem("adminDate")
  // let jsonGetUserInfo = JSON.parse(getUserinfo)
  let jsonGetUserInfo = await getAccountInfo()

  let stroreNewCard = ``
  jsonGetUserInfo.salesSupply?.map((val, idx)=>{
    stroreNewCard += `
    <div class="container-card-image-info">
      <img src=${val.image_url} alt=${val.image_name} class="container-card-image" />
      <div class="container-card-info">

        <h4>
          ${val.image_name}
        </h4>

        <div class="container-card-info-btn">
          <button
            onclick="handleClickOpenBackgroung('${val._id}')"
            type="button"
          >
            Edit
          </button>
          <button
            onclick="handelDeleteImage('${val._id}')"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
    `
  })
  document.getElementById("sec-equp-rent-bod").innerHTML = stroreNewCard

}

const displayGallary = async()=>{
  // let getUserinfo = localStorage.getItem("adminDate")
  // let jsonGetUserInfo = JSON.parse(getUserinfo)
  let jsonGetUserInfo = await getAccountInfo()

  let stroreNewCard = ``
  jsonGetUserInfo.gallary?.map((val, idx)=>{
    stroreNewCard += `
    <div class="container-card-image-info">
      <img src=${val.image_url} alt=${val.image_name} class="container-card-image" />
      <div class="container-card-info">

        <h4>
          ${val.image_name}
        </h4>

        <div class="container-card-info-btn">
          <button
            onclick="handleClickOpenBackgroung('${val._id}')"
            type="button"
          >
            Edit
          </button>
          <button
            onclick="handelDeleteImage('${val._id}')"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
    `
  })
  document.getElementById("sec-equp-rent-bod").innerHTML = stroreNewCard
}

const onHandelSubmiteLogin = async (event) =>{
  event.preventDefault()
  console.log("info login")
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    if (email && password) {
      // display loading
      displayLoadingScreen()

      // console.log(jsonGetUserInfo?.email)

      const response = await fetch(`${handeLocalhostLocation}Login/${email}/${password}`)
      // const response = await fetch(`${handeLocalhostLocation}account/${"olatunjiJm@modanmic.com"}`)
      // olatunjiJm@modanmic.com
      // const response = // await fetch("http://localhost:3001/api/users/modanmic")
      let responseData = await response.json();
      // console.log(data.usernameInfo)
      // console.log(response)

      if (response.status === 200) {
        // display reversloading
        displayReversLoadingScreen()
        localStorage.setItem("adminDate", JSON.stringify(responseData?.account))
        window.location.replace("./equipment-rental.html")

      } else {

        displayErrorScreen(responseData.error)

      }

    } else {
      displayErrorScreen("INVALIDE EMAIL OR PASSWORD")
    }

  } catch (e) {
    console.log(e)
    displayErrorScreen("NETWORK ERROR")
  }
}

const onHandleClickLogout = () =>{
  localStorage.clear()
  window.location.replace("./index.html")
}
