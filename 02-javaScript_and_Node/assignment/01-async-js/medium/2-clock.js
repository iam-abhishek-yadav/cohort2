let [hr, min, sec, time] = [11, 59, 50, ''];
setInterval(() => {
    sec++;
    if(sec === 60) {
        sec = 0;
        min++;
    }
    if(min === 60) {
        min = 0;
        hr++;
    }
    if(hr === 24) {
        hr = 0;
    }
    if(hr < 12) time = 'AM'
    if(hr >= 12) time = 'PM'

    console.log(`${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}::${sec.toString().padStart(2, '0')}`);
    console.log(`${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}::${sec.toString().padStart(2, '0')} ${time}`);
}, 1000)