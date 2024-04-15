function delayedCall(fn: () => void): void {
	setTimeout(fn, 1000);
}

delayedCall(function () {
	console.log("hi there");
});
