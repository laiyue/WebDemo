function snake(w, h, planel, foods) {
    this.w = w;
    this.h = h;
    this.currentWidth = 3;
    this.planel = planel;
    this.stop = false;
    //当前方向
    this.currentDirection = "right";
    this.snakeBody = [{
        x: 23,
        y: 23,
    }, {
        x: 24,
        y: 23,
    }, {
        x: 25,
        y: 23,
    }];
}
snake.prototype.createBodey = function() {
    var array = this.snakeBody;
    var div = null;
    for (let index = 0; index < array.length; index++) {
        div = document.createElement("div");
        div.className = "snake";
        div.style.width = this.w + "px";
        div.style.height = this.h + "px";
        div.style.backgroundColor = "green";
        div.style.borderRadius = "30%";
        div.style.position = "absolute";
        div.style.marginLeft = array[index].x * this.w + "px";
        div.style.marginTop = array[index].y * this.h + "px";
        this.planel.appendChild(div);
    }
}

snake.prototype.move = function() {
    var array = this.snakeBody;
    var len = this.snakeBody.length;
    var newitem = { x: 0, y: 0 };
    switch (this.currentDirection) {
        case "right":
            array[0].x = array[array.length - 1].x + 1;
            array[0].y = array[array.length - 1].y;
            break;
        case "left":
            array[0].x = array[array.length - 1].x - 1;
            array[0].y = array[array.length - 1].y;
            break;
        case "up":
            array[0].y = array[array.length - 1].y - 1;
            array[0].x = array[array.length - 1].x;
            break;
        case "down":
            array[0].y = array[array.length - 1].y + 1;
            array[0].x = array[array.length - 1].x;
            break;
            //array[0].x = array[array.length - 1].x + 1;
    }
    this.snakeBody.push(array[0]);
    this.snakeBody.splice(0, 1);
    array = this.snakeBody;
    for (let index = 0; index < array.length - 1; index++) {
        if (array[array.length - 1].x == array[index].x && array[array.length - 1].y == array[index].y) {
            clearInterval(timer);
            this.stop = true;
            break;
        }

    }

    if (!this.stop) {
        for (let index = 0; index < this.planel.querySelectorAll(".snake").length; index++) {
            if (this.currentDirection == "right") {
                if (array[array.length - 1].x * 10 < this.planel.clientWidth) {
                    for (let j = 0; j < array.length; j++) {
                        if (index == j) {
                            this.planel.querySelectorAll(".snake")[index].style.marginLeft = array[j].x * 10 + "px";
                            this.planel.querySelectorAll(".snake")[index].style.marginTop = array[j].y * 10 + "px";
                        }
                    }
                } else {
                    clearInterval(timer);
                    this.stop = true;
                    break;
                }
            } else if (this.currentDirection == "left") {
                //碰壁
                if (array[array.length - 1].x * 10 >= 0) {
                    for (let j = 0; j < array.length; j++) {
                        if (index == j) {
                            this.planel.querySelectorAll(".snake")[index].style.marginLeft = array[j].x * 10 + "px";
                            this.planel.querySelectorAll(".snake")[index].style.marginTop = array[j].y * 10 + "px";
                        }
                    }
                } else {
                    clearInterval(timer);
                    this.stop = true;
                    break;
                }
            } else if (this.currentDirection == "up") {
                if (array[array.length - 1].y * 10 >= 0) {
                    for (let j = 0; j < array.length; j++) {
                        if (index == j) {
                            this.planel.querySelectorAll(".snake")[index].style.marginLeft = array[j].x * 10 + "px";
                            this.planel.querySelectorAll(".snake")[index].style.marginTop = array[j].y * 10 + "px";
                        }
                    }
                } else {
                    clearInterval(timer);
                    this.stop = true;
                    break;
                }
            } else if (this.currentDirection == "down") {
                if (array[array.length - 1].y * 10 < this.planel.clientHeight) {
                    for (let j = 0; j < array.length; j++) {
                        if (index == j) {
                            this.planel.querySelectorAll(".snake")[index].style.marginLeft = array[j].x * 10 + "px";
                            this.planel.querySelectorAll(".snake")[index].style.marginTop = array[j].y * 10 + "px";
                        }
                    }
                } else {
                    clearInterval(timer);
                    this.stop = true;
                    break;
                }
            }
        }

    }

    // /吃到食物计分
    if (array[array.length - 1].x == foods.food.x && array[array.length - 1].y == foods.food.y) {
        foods = null;
        this.planel.removeChild(document.getElementById("food")); //删除食物
        var div = document.createElement("div");
        this.planel.appendChild(div); //蛇身加长
        div.className = "snake";

        setTimeout(() => {
            div.style.width = this.w + "px";
            div.style.height = this.h + "px";
            div.style.backgroundColor = "green";
            div.style.borderRadius = "30%";
            div.style.position = "absolute";
            div.style.marginLeft = newitem.x * this.w + "px";
            div.style.marginTop = newitem.y * this.h + "px;";

        }, 500);

        switch (this.currentDirection) {
            case "right":
                newitem.x = array[0].x - 1;
                newitem.y = array[0].y;
                break;
            case "left":
                newitem.x = array[0].x + 1;
                newitem.y = array[0].y;
                break;
            case "up":
                newitem.y = array[0].y + 1;
                newitem.x = array[0].x;
                break;
            case "down":
                newitem.y = array[0].y - 1;
                newitem.x = array[0].x;
                break;
                //array[0].x = array[array.length - 1].x + 1;
        }
        this.snakeBody.unshift(newitem);

        console.log(this.snakeBody);
        foods = new food(10, 10, this.planel);
        foods.createFood();

    }

    if (this.stop) {
        alert("Game Over!");
    }
}