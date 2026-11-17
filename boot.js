/* runs first: if the preloader already played this visit, hide it straight away (no flash) */
try{if(sessionStorage.getItem("senPre"))document.documentElement.classList.add("pre-skip")}catch(e){}
