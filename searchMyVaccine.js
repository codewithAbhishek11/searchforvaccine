let cards = document.querySelector(".cards");
let btn = document.getElementById('btn');
let pincode = document.getElementById('pincode');
var pin;


btn.addEventListener('click',myfun);

function myfun(){
    let pincode = document.getElementById('pincode');
    cards.innerHTML = "";
    pin = pincode.value;
    if(pin === ""){
        alert("Pincode cannot be Empty")
    }
    cowinData(pin);
}

pincode.addEventListener('keypress',(event)=>{
    if(event.which === 13){
        myfun();
    }
})

let centers = [];

let today,d,m,y;
today = new Date();
d = today.getDate();
m = today.getMonth()+1;
y = today.getFullYear();

today = `${d}-${m}-${y}`;


function cowinData(pin){
    let url =  `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${today}`;
    const xhr = new XMLHttpRequest;
    if(pin !== ""){
    xhr.open("GET",url,true);
    xhr.onload = function(){
        if(this.status === 200){  /*This is very importnat you get sattus as 200in Network tab of Developers window*/
            let data = JSON.parse(this.responseText);
            console.log(data);
            if(data.sessions !== [""]){
                data.sessions.map((e,i)=>{
                    let centerinfo = [
                        e.name,
                        e.address,
                        e.vaccine,
                        e.date,
                        e.min_age_limit,
                        e.available_capacity,
                        e.block_name,
                        e.district_name,
                        e.slots
                    ]
                    centers.push(centerinfo);
                    let code = `
                        <div class="card">
                            <div class="title">
                            <p >Center Name</p>
                            <h3 >
                                  ${centers[i][0]}
                            </h3>
                            </div>
                            <br>
                            <hr>
                            <br>
                            <div class="innerCard">
                                <p>
                                    <span class="category"">Center Address -</span>
                                    ${centers[i][1]}
                                </p>
                                <p>
                                    <span class="category">Center Address -</span>
                                    ${centers[i][1]}
                                </p>
                                <p>
                                    <span class="category">Vaccine name -</span>
                                    ${centers[i][2]}
                                </p>
                                <p>
                                    <span class="category">Date of Vaccination -</span>
                                    ${centers[i][3]}
                                </p>
                                <p>
                                    <span class="category">Age Limit -</span>
                                    ${centers[i][4]}
                                </p>
                                <p>
                                    <span class="category">Available Capacity -</span>
                                    ${centers[i][5]}
                                </p>
                                <p>
                                    <span class="category">Block name -</span>
                                    ${centers[i][6]}
                                </p>
                                <p>
                                    <span class="category">District name -</span>
                                    ${centers[i][7]}
                                </p>
                                <p>
                                    <span class="category">Slot Timing -</span>
                                    ${centers[i][8].join(" | ")}
                                </p>
                            </div>
                        </div>   `
                    cards.innerHTML += code;
                })
            }else{
                alert("Data not found");
            }
        }else{
            alert("Some Error Occured");           
        }
    }
    xhr.send();
}
}




