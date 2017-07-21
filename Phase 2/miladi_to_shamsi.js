function miladi_to_shamsi(year,month,day,dayname,jumptomorrow){
    var tatal_day = year*365;

    //kabise in miladi
    var kabise = 0;
    for(var i = 0 ; i < year ; i++){
        if(i%4 == 0 && i%100!=0){
            kabise++;
        }else if (i%4==0 && i%100 == 0 && i%400==0){
            kabise++;
        }
    }

    tatal_day = tatal_day - kabise - 226984;

    if(month == "January"){
        total_day = tatal_day + day;
    }else if ( month == "February"){
        total_day = tatal_day + day + 31 ;
    }else if (month == "March") {
        total_day = tatal_day + day + 31 + 28;
    }else if (month == "April") {
        total_day = tatal_day + day + 31 + 28 + 31;
    }else if (month == "May") {
        total_day = tatal_day + day + 31 + 28 + 31 + 30;
    }else if (month == "June") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 ;
    }else if (month == "July") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30;
    }else if (month == "August") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30 + 31;
    }else if (month == "September") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30 + 31 +31;
    }else if (month == "October") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30 + 31 +31 + 30 ;
    }else if (month == "November") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30 + 31 +31 + 30 +31;
    }else if (month == "December") {
        total_day = tatal_day + day + 31+ 28 + 31 + 30 + 31 + 30 + 31 +31 + 30 +31 +30;
    }

    console.log(shamsi_kabise);
    var tmp;
    var days = total_day %365;
    var new_day;
    var new_month;

    if (days <=31){
        new_month = "فروردین";
        new_day = days;
        tmp = 621;
    }else if (days <= 62){
        new_month = "اردیبهشت";
        new_day = days - 31;
        tmp = 621;
    }else if (days <= 93){
        new_month = "خرداد";
        new_day = days - 62;
        tmp = 621;
    }else if (days <= 124){
        new_month = "تیر";
        new_day = days - 93;
        tmp = 621;
    }
    else if (days <= 155){
        new_month = "مرداد";
        new_day = days - 124;
        tmp = 621;
    }
    else if (days <= 186){
        new_month = "شهریور";
        new_day = days - 155;
        tmp = 621;
    }
    else if (days <= 216){
        new_month = "مهر";
        new_day = days - 186;
        tmp = 621;
    }else if (days <= 246){
        new_month = "آبان";
        new_day = days - 216;
        tmp = 621;
    }else if (days <= 276){
        new_month = "آذر";
        tmp = 621;
        new_day = days - 246;
    }
    else if (days <= 306){
        new_month = "دی";
        new_day = days - 276;
        if (new_day <= 10){
            tmp = 621;
        }else{
            tmp = 622;
        }
    }
    else if (days <= 336){
        new_month = "بهمن";
        new_day = days - 306;
        tmp = 622;
    }
    else if (days <= 365){
        new_month = "اسفند";
        new_day = days - 336;
        tmp = 622;
    }

    //kabise in shamsi
    var new_year = year - tmp;
    if(new_year >= 1399){
        days ++;
        if(new_year >= 1403){
            days ++;
            if (new_year >= 1408){
                days ++;
                if (new_year > 1408){
                    if (new_year % 4 == 0){
                        var t = new_year - 1408;
                        t = t /4;
                        days = days + t;
                    }
                }
            }
        }
    }

    if (days <=31){
        new_month = "فروردین";
        new_day = days;
        tmp = 621;
    }else if (days <= 62){
        new_month = "اردیبهشت";
        new_day = days - 31;
        tmp = 621;
    }else if (days <= 93){
        new_month = "خرداد";
        new_day = days - 62;
        tmp = 621;
    }else if (days <= 124){
        new_month = "تیر";
        new_day = days - 93;
        tmp = 621;
    }
    else if (days <= 155){
        new_month = "مرداد";
        new_day = days - 124;
        tmp = 621;
    }
    else if (days <= 186){
        new_month = "شهریور";
        new_day = days - 155;
        tmp = 621;
    }
    else if (days <= 216){
        new_month = "مهر";
        new_day = days - 186;
        tmp = 621;
    }else if (days <= 246){
        new_month = "آبان";
        new_day = days - 216;
        tmp = 621;
    }else if (days <= 276){
        new_month = "آذر";
        tmp = 621;
        new_day = days - 246;
    }
    else if (days <= 306){
        new_month = "دی";
        new_day = days - 276;
        if (new_day <= 10){
            tmp = 621;
        }else{
            tmp = 622;
        }
    }
    else if (days <= 336){
        new_month = "بهمن";
        new_day = days - 306;
        tmp = 622;
    }
    else if (days <= 365){
        new_month = "اسفند";
        new_day = days - 336;
        tmp = 622;
    }


    var shamsi_kabise = (new_year/33 )*8;

    var new_day_name;

    if(dayname=="Mon" && jumptomorrow ==0){
        new_day_name = "دوشنبه";
    }else if(dayname=="Tue"&& jumptomorrow ==0){
        new_day_name = "سه شنبه";
    }else if(dayname=="Wed"&& jumptomorrow ==0){
        new_day_name = "چهار شنبه";
    }else if(dayname=="Thu"&& jumptomorrow ==0){
        new_day_name = "پنج شنبه";
    }else if(dayname=="Fri"&& jumptomorrow ==0){
        new_day_name = "جمعه";
    }else if(dayname=="Sat"&& jumptomorrow ==0){
        new_day_name = "شنبه";
    }else if(dayname=="Sun"&& jumptomorrow ==0){
        new_day_name = "یکشنبه";
    }

    if(dayname=="Mon" && jumptomorrow ==1){
        new_day_name = "سه شنبه";
    }else if(dayname=="Tue"&& jumptomorrow ==1){
        new_day_name = "چهار شنبه";
    }else if(dayname=="Wed"&& jumptomorrow ==1){
        new_day_name = "پنج شنبه";
    }else if(dayname=="Thu"&& jumptomorrow ==1){
        new_day_name = "جمعه";
    }else if(dayname=="Fri"&& jumptomorrow ==1){
        new_day_name = "شنبه";
    }else if(dayname=="Sat"&& jumptomorrow ==1){
        new_day_name = "یکشنبه";
    }else if(dayname=="Sun"&& jumptomorrow ==1){
        new_day_name = "دوشنبه";
    }


    var res = [new_day_name,new_day,new_month ,new_year];
    console.log(new_year +"   " +  new_month +"   " + new_day + "    " + new_day_name);
    //noinspection JSAnnotator,JSAnnotator
    return res ;
}
