/**
 * Created by amir hosein on 28/04/2017.
 */

token2 = localStorage;
var token;
var n = '';
var current_offset = 0 ;
var tmp = 0;
var tmp2 = 0;
var id = -1;

function gotoblog() {
    window.location.href = "SignUp.html";
}


function backtoblog() {
    window.location.href = "blog.html";
}


function login() {
    var user = document.getElementById("user").value ;
    var pass = document.getElementById("pass").value ;
    var myreq = "student_number=" + user + "&password=" + pass;

    console.log(myreq);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            response = JSON.parse(this.responseText);

            token = response.token;
            localStorage.setItem('tt', token);
            console.log(token);
            if (response.status == 0) {
                //get_posts();
                window.location.href = "blog.html";
            }else{
                alert(response.message + ", please try again");
            }
        }
    };
    xhttp.open("POST", "http://127.0.0.1:8000/auth/login/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(myreq);

}


function create_post() {

    var ti = document.getElementById("Title").value ;
    var su = document.getElementById("Summary").value ;
    var te = document.getElementById("Text").value ;
    var myreq = "title=" + ti + "&summary=" + su + "&text=" + te ;

    su = su.replace(/(?:\r\n|\r|\n)/g, '<br />');
    te = te.replace(/(?:\r\n|\r|\n)/g, '<br />');

    console.log(myreq);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            response = JSON.parse(this.responseText);
            res = JSON.parse(this.responseText);
            if(res.status == 0){
                document.getElementById("Title").value="";
                document.getElementById("Summary").value="";
                document.getElementById("Text").value="";
                alert("your post created successfully");
            }else{
                alert(response.message + ", please try again");
            }

        }
    };
    xhttp.open("POST", "http://127.0.0.1:8000/blog/' + blog_id + '/post/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("X-Token", localStorage.getItem('tt'));
    xhttp.send(myreq);
}


// function create_comment() {
//     var te = document.getElementById("Text").value ;
//
//     var myreq = "post_id=" + /*????????*/ti + "&text=" + te;
//
//     console.log(myreq);
//
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.response);
//             response = JSON.parse(this.responseText);
//         }
//     };
//     xhttp.open("POST", "https://ce419.herokuapp.com/blog/comment", true);
//     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhttp.setRequestHeader("X-Token", localStorage.getItem('tt'));
//     xhttp.send(myreq);
// }


// function get_posts() {
//     console.log("asdasd       " + localStorage.getItem('tt'));
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.response);
//             response = JSON.parse(this.responseText);
//             console.log(response);
//             localStorage.setItem('posts' , response);
//             console.log("_______________" + localStorage.getItem('posts'));
//             // document.getElementById("demo").innerHTML = response.token;
//             // //console.log(response.status == 0);
//             // //console.log("asdasd");
//             // if(response.status == 0){
//             //     window.location.href = "blog.html";
//             // }
//         }
//     };
//     xhttp.open("GET", "https://ce419.herokuapp.com/blog/posts", true);
//     xhttp.setRequestHeader("X-Token", localStorage.getItem('tt'));
//     xhttp.send(null);
// }


function send_comment() {
    var ti = document.getElementById("comment").value ;
    ti = ti.replace(/(?:\r\n|\r|\n)/g, '<br />');

    var myreq = "post_id=" + localStorage.getItem('current_id') + "&text=" + ti;

    console.log(myreq);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tmp2=0;
            document.getElementById("show_comments").innerHTML = "";
            current_offset=0;
            console.log(this.response);
            response = JSON.parse(this.responseText);
            res = JSON.parse(this.responseText);
            if(res.status == 0){
                document.getElementById("comment").value ="";
                alert("your comment created successfully");
            }else{
                alert(response.message + ", please try again");
            }

            get_comments();
        }
    };
    xhttp.open("POST", "http://127.0.0.1:8000/blog/comment/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("X-Token", localStorage.getItem('tt'));
    xhttp.send(myreq);
}


function get_comments() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.readyState + "   " + this.status + "    " + localStorage.getItem('current_id'));
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            response = JSON.parse(this.responseText);
            res = JSON.parse(this.responseText);
            console.log("asdasdasd" + res);
            console.log(response);
            localStorage.setItem('posts' , response);

            for (var i = 0 ; i < res.comments.length ; i++){

                tmp = 0;
                var my_div = document.getElementById("show_comments");
                if(tmp2 == 1 && i == 0){
                    var sepp2 =  document.createElement('div')
                    sepp2.className = "sepp";
                    var sepline2 =  document.createElement('div')
                    sepline2.className = "sepline22";

                    sepp2.appendChild(sepline2);
                    my_div.appendChild(sepp2);
                }
                var text = document.createElement('h5');
                text.innerHTML = res.comments[i].text;

                var jumptomorrow = 0 ;
                var date = document.createElement('h5');
                //date.innerHTML = res.comments[i].datetime;
                var year = parseInt(res.comments[i].datetime[20]+res.comments[i].datetime[21]+res.comments[i].datetime[22]+res.comments[i].datetime[23]);
                var month = res.comments[i].datetime[4]+res.comments[i].datetime[5]+res.comments[i].datetime[6];
                var day = parseInt(res.comments[i].datetime[9]);
                var dayname = res.comments[i].datetime[0]+res.comments[i].datetime[1]+res.comments[i].datetime[2];
                var hour = parseInt(res.comments[i].datetime[11]+res.comments[i].datetime[12]);
                var minute = parseInt(res.comments[i].datetime[14]+res.comments[i].datetime[15]);

                if (minute >= 30){
                    hour = hour + 5;
                    minute = minute - 30;
                }else{
                    hour = hour + 4;
                    minute = minute + 30;
                }
                if (hour>=24){
                    jumptomorrow = 1;
                    hour = hour - 24;
                    day = day + 1;

                }
                var time = hour+res.comments[i].datetime[13]+minute+res.comments[i].datetime[16]+res.comments[i].datetime[17]+res.comments[i].datetime[18];
                console.log(miladi_to_shamsi(year,month,day,dayname));
                date.innerHTML = miladi_to_shamsi(year,month,day,dayname,jumptomorrow)[0] + " " + miladi_to_shamsi(year,month,day,dayname,jumptomorrow)[1]+" " + miladi_to_shamsi(year,month,day,dayname,jumptomorrow)[2]+" " + miladi_to_shamsi(year,month,day,dayname,jumptomorrow)[3] + " _ ساعت : " + time;


                var sepp =  document.createElement('div')
                sepp.className = "sepp";
                var sepline =  document.createElement('div')
                sepline.className = "sepline22";

                sepp.appendChild(sepline);

                my_div.appendChild(text);
                my_div.appendChild(date);
                if (i != res.comments.length - 1)
                    my_div.appendChild(sepp);
            }
        }
    };
    xhttp.open("GET", "http://127.0.0.1:8000/blog/comments?post_id="+localStorage.getItem('current_id')+"&count=6&offset="+current_offset, true);
    xhttp.setRequestHeader("X-Token", localStorage.getItem('tt'));
    xhttp.send(null);
    current_offset = current_offset + 6 ;
    detect_bottom();
}


function beforeall() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:8000/auth/blog_id/', true);
    req.setRequestHeader('X-Token', localStorage.getItem('token'));
    req.send(null);
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            var ans = JSON.parse(this.response.toString());
            id = ans.blog_id;
            n = ans.name;
            create_post();
        }
    };
}

function detect_bottom() {
    document.addEventListener('scroll', function () {
        //console.log("___" + document.body.scrollHeight + "    " + document.body.scrollTop  + "   " +window.innerHeight );
        if (document.body.scrollHeight <
            document.body.scrollTop +
            window.innerHeight + window.scrollMaxY && tmp == 0 ) {
            tmp = 1;
            tmp2 =1;
            console.log(tmp);
            get_comments();
        }
    });
}


function signup(){
    var oReq = new XMLHttpRequest();
    var user = document.getElementById("user").value ;
    var pass = document.getElementById("pass").value ;
    var fn = document.getElementById("fn").value ;
    var ln = document.getElementById("ln").value ;
    var email = document.getElementById("email").value ;

    var myreq = "student_number=" + user + "&password=" + pass + "&first_name=" + fn + "&last_name=" + ln + "&email=" + email;

    oReq.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            response = JSON.parse(this.responseText);
            res = JSON.parse(this.responseText);
            if(res.status == 0){
                alert("your account created successfully");
            }else{
                alert(response.message + ", please try again");
            }
            console.log(this.response);
        }
    }

    oReq.open('POST', 'http://127.0.0.1:8000/auth/register/',true);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // var s = 'student_number=uname&password=psw&first_name=FirstName&last_name=LastName&email=Email';
    console.log(myreq);
    oReq.send(myreq);
}
