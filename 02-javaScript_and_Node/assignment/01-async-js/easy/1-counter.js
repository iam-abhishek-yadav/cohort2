const counter = () => {
    let counter = 0;
    setInterval(() => {
        console.log(counter++);
    },1000)
}
counter()