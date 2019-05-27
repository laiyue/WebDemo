function food(w, h, planel) {
    this.w = w;
    this.h = h;
    this.planel = planel;
    this.food = { x: 0, y: 0 };

}
food.prototype.createFood = function() {
    this.food.x = Math.round(Math.random() * 47);
    this.food.y = Math.round(Math.random() * 47);
    if (document.getElementById("food")) {
        this.planel.removeChild(document.getElementById("food"));
    }
    var div = document.createElement("div");
    div.id = "food";
    this.planel.appendChild(div);

    setTimeout(() => {
        div.style.width = this.w + "px";
        div.style.height = this.h + "px";
        div.style.backgroundColor = "red";
        div.style.borderRadius = "50%";
        div.style.position = "absolute";
        div.style.marginLeft = this.food.x * this.w + "px";
        div.style.marginTop = this.food.y * this.h + "px";
    }, 500);



}