const API = "http://localhost:3000";

const availableCourses = [
    "DSA",
    "CN",
    "DBMS",
    "AI",
    "OOPS",
    "PYTHON",
    "ML",
    "SYSTEM DESIGN"
];

// ---------------- REGISTER ----------------

async function register(){

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch(API + "/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data = await res.json();

    alert(data.message);

    if(data.success){
        location.href="login.html";
    }

}

// ---------------- LOGIN ----------------

async function login(){

    const email=document.getElementById("loginEmail").value;

    const password=document.getElementById("loginPassword").value;

    const res=await fetch(API+"/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email,

            password

        })

    });

    const data=await res.json();

    alert(data.message);

    if(data.success){

        localStorage.setItem("userId",data.userId);

        location.href="dashboard.html";

    }

}

// ---------------- DASHBOARD ----------------

if(location.pathname.includes("dashboard.html")){

    showCourses();

    loadMyCourses();

}

function showCourses(){

    const list=document.getElementById("courseList");

    availableCourses.forEach(course=>{

        list.innerHTML+=`

        <div class="course">

            <span>${course}</span>

            <button onclick="addCourse('${course}')">

                +

            </button>

        </div>

        `;

    });

}

// ---------------- ADD COURSE ----------------

async function addCourse(course){

    await fetch(API+"/courses",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            userId:localStorage.getItem("userId"),

            courseName:course

        })

    });

    loadMyCourses();

}

// ---------------- LOAD COURSES ----------------

async function loadMyCourses(){

    const res=await fetch(

        API+"/courses/"+localStorage.getItem("userId")

    );

    const data=await res.json();

    const div=document.getElementById("myCourses");

    div.innerHTML="";

    data.forEach(c=>{

        div.innerHTML+=`

        <div class="course">

            <span>${c.courseName}</span>

            <div class="actions">

                <button onclick="editCourse('${c._id}','${c.courseName}')">

                Edit

                </button>

                <button onclick="deleteCourse('${c._id}')">

                Delete

                </button>

            </div>

        </div>

        `;

    });

}

// ---------------- EDIT ----------------

async function editCourse(id,name){

    const newName=prompt("Edit Course",name);

    if(!newName) return;

    await fetch(API+"/courses/"+id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            courseName:newName

        })

    });

    loadMyCourses();

}

// ---------------- DELETE ----------------

async function deleteCourse(id){

    await fetch(API+"/courses/"+id,{

        method:"DELETE"

    });

    loadMyCourses();

}

// ---------------- LOGOUT ----------------

function logout(){

    localStorage.clear();

    location.href="login.html";

}