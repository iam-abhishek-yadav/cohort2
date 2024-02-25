const counter = (num) =>{
    console.log(num);
    setTimeout(() => {
        counter(num+1);
    }, 1000);
}
counter(0);