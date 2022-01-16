let nav =0;
let clicked = null;
let events = JSON.parse(localStorage.getItem('events'))||[];
const calendar = document.getElementById('calendar');
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');

function openModal(date){
    clicked = date;

    const eventForDay = events.find(e=> e.date === clicked);

    if(eventForDay){
      document.getElementById('eventText').innerText= eventForDay.title;
      deleteEventModal.style.display = 'block'; 
    }else{
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}


function load(){
    const dt = new Date();
    //console.log(dt);//當下的年月日時分秒
    //取得日月年
    if (nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();//JS從0開始
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday:'long',
        year:'numeric',
        month:'numeric',
        day:'numeric'
    });
    console.log(dateString)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us',{month:'long'})} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth;i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`

        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e =>e.date === dayString)
            
            //確定今天的日期 特別標示出來,只有這個月的今天 不是每個月的今天日期
            if(i - paddingDays === day && nav=== 0){
            daySquare.id = 'currentDay';
            }
            
            
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv)
            }

            daySquare.addEventListener('click', ()=> openModal(dayString));
        }else{
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}//end of load()

function closeModal(){
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        events.push({
            date:clicked,
            title:eventTitleInput.value,
        });

        localStorage.setItem('events',JSON.stringify(events))
        closeModal();
    }else{
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent(){
    events = events.filter(e=> e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events))
    closeModal();
}



function initButtons(){
    document.getElementById('nextButton').addEventListener('click',()=>{
        nav++;
        load()
    });

    document.getElementById('backButton').addEventListener('click',()=>{
        nav--;
        load()
    });

   document.getElementById('saveButton').addEventListener('click',saveEvent);
    document.getElementById('cancelButton').addEventListener('click',closeModal);
    document.getElementById('deleteButton').addEventListener('click',deleteEvent);
    document.getElementById('closeButton').addEventListener('click',closeModal);

}




initButtons();
load();

   



//2022.1.11 恭喜你完成啦!上傳github，接下來是研究各個function負責的運作,加油!!把這個日歷想辦法加入電商sideproject及結合地圖
//2022.1.10 請從56:12繼續觀看教學
//https://www.youtube.com/watch?v=m9OSBJaQTlM&list=LL&index=22&t=799s