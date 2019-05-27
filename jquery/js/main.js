(function() {
    var datepicker = window.datepicker;
    var monthData;
    datepicker.buildUI = function(year, month) {
        monthData = datepicker.getMonthData(year, month);
        var html = `
        <div class="ui-datepicker-header">
            <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
            <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
            <span class="ui-datepicker-curr-month">${monthData.year+"-"+monthData.month}</span>
        </div>
        <div class="ui-datepicker-body">
            <table>
                <thead>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                    <th>日</th>
                </thead>
    `;
        html += ` <tbody>`;
        var array = monthData;
        for (let index = 0; index < array.days.length; index++) {
            var date = array.days[index];
            if (index % 7 === 0) {
                html += '<tr>';
            }
            html += '<td>' + date.showDate + '</td>'
            if (index % 7 === 6) {
                html += '</tr>';
            }
        }
        html += `</tbody>`
        html += ` </table>
        </div>`;
        return html;
    }
    var wapper;
    datepicker.render = function(direction) {
        var year;
        var month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (direction === "prev") {
            month--;
        }
        if (direction === "next") {
            month++;
        }
        var html = datepicker.buildUI(year, month);
        wapper = document.querySelector(".ui-datepicker-wrapper");
        if (!wapper) {
            wapper = document.createElement("div");
            wapper.className = "ui-datepicker-wrapper";
        }
        wapper.innerHTML = html;
        document.body.appendChild(wapper);
    }
    datepicker.init = function(input) {
        datepicker.render("");
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener("click", function() {
            if (isOpen) {
                wapper.classList.remove("ui-datepicker-wrapper-show");
                isOpen = false;
            } else {
                wapper.classList.add("ui-datepicker-wrapper-show");
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                wapper.style.top = top + height + 2 + "px";
                isOpen = true;
            }

        }, false);
        wapper.addEventListener("click", function(e) {
            var $target = e.target;
            console.log($target.classList);
            if (!$target.classList.contains("ui-datepicker-btn")) {
                return;
            }
            if ($target.classList.contains("ui-datepicker-prev-btn")) {
                datepicker.render("prev");

            } else if ($target.classList.contains("ui-datepicker-next-btn")) {
                datepicker.render("next");

            }

        }, false);

    }
})();