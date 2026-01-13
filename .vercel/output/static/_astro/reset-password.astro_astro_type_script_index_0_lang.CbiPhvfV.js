import{resetPassword as d}from"./auth.CDJVxmqK.js";const o=document.getElementById("reset-form"),a=document.getElementById("email"),e=document.getElementById("submit-btn"),t=document.getElementById("error-message"),n=document.getElementById("error-text"),i=document.getElementById("reset-form-container"),m=document.getElementById("success-message");o.addEventListener("submit",async r=>{r.preventDefault(),e.disabled=!0,e.innerHTML=`
        <svg class="w-5 h-5 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Sending...
      `,t.classList.add("hidden");try{const{error:s}=await d(a.value);if(s){n.textContent=s.message||"Failed to send reset email",t.classList.remove("hidden"),t.classList.add("flex"),e.disabled=!1,e.innerHTML="Send Reset Link";return}i.classList.add("hidden"),m.classList.remove("hidden")}catch{n.textContent="Something went wrong. Please try again.",t.classList.remove("hidden"),t.classList.add("flex"),e.disabled=!1,e.innerHTML="Send Reset Link"}});
