var current = null;
var id = 0;

class Node {
    constructor(qustion, left, right, parent) {
        this.qustion = qustion;
        this.left = left || null;
        this.right = right || null;
        this.parent = parent || null;
    }

    GetNext(answer) {
        if (answer) {
            return this.right;
        } else {
            return this.left;
        }
    }

    show() {

        var div_all = document.createElement("div");
        div_all.id = "q_" + id;

        var p = document.createElement("p");
        p.innerText = this.qustion;


        //var p2 = document.createElement("p2");
        //p2.innerText = this.qustion;



        p.className = "p_div";


        var div = document.createElement("div");
        div.className = "qustiondiv_iner";
        div.appendChild(p);

        if((this.right == null) && (this.left == null))
        {
            div.className = "qustiondiv_iner_answer"
        }

        var div_btn = document.createElement("div");
        div_btn.className = "qustiondiv_btn";


        div_all.appendChild(div);
        div_all.appendChild(div_btn);
        document.getElementById("qustiondiv").appendChild(div_all);

        var button_q = document.createElement("button");
        var button_q1 = document.createElement("button");

        let inerr_id = id;
        button_q.id = "YesAnswear" + id;
        button_q.className = "yesnobtn";
        button_q.type = "button";
        button_q.onclick = function () { answer(true, inerr_id); button_q.className = "yesnobtnclicked";/*button_q.onclick = function() {};button_q1.onclick = function() {};*/ };
        button_q.innerText = "כן"

        button_q1.id = "NoAnswear" + id;
        button_q1.className = "yesnobtn";
        button_q1.type = "button";
        button_q1.onclick = function () { answer(false, inerr_id); button_q1.className = "yesnobtnclicked";/*button_q1.onclick = function() {};button_q.onclick = function() {};*/ };
        button_q1.innerText = "לא"

        if (this.right != null) {
            div_btn.appendChild(button_q);
        }
        if (this.left != null) {
            div_btn.appendChild(button_q1);
        }

        id++;
    }

    clear(id_in, qustion_answer) {

        var current_qustion = document.getElementById("q_" + (id - 1));
        var desierd_qustion = document.getElementById("q_" + id_in);
        while ((id - 1) != id_in) {
            if (current.parent != null) {
                current = current.parent;
            }
            else {
                break;
            }
            console.log("id : " + "q_" + (id - 1));
            current_qustion.remove();
            id--;
            current_qustion = document.getElementById("q_" + (id - 1));
        }


        let bt1 = document.getElementById("YesAnswear" + id_in);
        let bt2 = document.getElementById("NoAnswear" + id_in);
        console.log(bt1.className);
        console.log(bt2.className);
        if (qustion_answer) {
            bt1.className = "yesnobtnclicked";
            bt2.className = "yesnobtn";
        } else {
            bt1.className = "yesnobtn";
            bt2.className = "yesnobtnclicked";
        }
        console.log(bt1.className);
        console.log(bt2.className);


        console.log(current.qustion);
    }

    clearall() {
        var current_qustion;
        for (var i = 0; i < id; i++) {
            current_qustion = document.getElementById("q_" + (i));
            current_qustion.remove();
        }
        id = 0;
    }

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//לחץ יניקה גבוה
function create_tree_1() {

    let q1 = new Node("האם לחץ דחיסה (HP) נמוך יחסית?  \n מתורגם לטמפרטורת רווית הקרר בערכים נמוכים שבין  30ᵒC-40ᵒC", null, null, null);
    //אם שאלה 1 כן - תשובה סופית
    let q2 = new Node("תקלה מכנית במדחס/מערכת פריקת עומסים/משאבת חום", null, null, null);

    //  אם לא צריך לעבור לעץ לחץ לחץ יניקה גבוה
    let q3 = create_tree_2();

    q1.left = q3;
    q1.right = q2;
    //q2.left = q4;
    //q2.right = q4;
    //q4.left = q6;
    //q4.right = q5;

    q3.parent = q1;
    q2.parent = q1;

    return q1;
}

//לחץ יניקה נמוך
function create_tree_2() {
    //שאלת פתיחה
    let q1 = new Node("בדיקת שיחון יתר תקין \n בצע בדיקת שיחון יתר (Super Heat) בין T6 ל-T8 \n בעזרת מד טמפרטורה ביציאת המאייד ושעון לחץ  LP המתורגם לטמפרטורה של הקרר \n האם טמפרטורת הגז ביציאה של המאייד גבוהה מטמפרטורת רוויה שבשעון לחץ LP?  \n ערכים תקינים בין 5ᵒC ל-8ᵒC \n (כן - אם גבוה מ- 8ᵒC | לא - אם נמוך מ-5ᵒC)", null, null);
    //
    //אם שאלה 1 היא לא
    //let q2 = new Node(" ΔT אוויר תקין chiller ΔT (6ᵒC-10ᵒC) D.X מים תקין   (4ᵒC-6ᵒC)  ", null, null);
    let q2 = new Node("בצע בדיקה בין T1 ל-T2 האם החלפת חום על המאייד תקין? \n מאייד מקורר אוויר (DX): 6-10K ΔT\n מאייד מקורר מים (Chiller): 4-6K ΔT", null, null);
    //אם שאלה 2 היא לא
    let q3 = new Node("חוסר בזרימת אוויר על סוללת המאייד D.X \n או חוסר זרימת מים (Chiller)", null, null);
    //אם שאלה 2 היא כן 
    let q4 = new Node("מאייד מלוכלך או שהחלפת החום ירודה", null, null);
    //אם שאלה 1 היא כן
    let q5 = new Node(" בצע בדיקת קירור יתר (Subcooling) בין T7 ל-T5\n האם טמפרטורת הנוזל נמוכה מטמפרטורת הרוויה שבשעון לחץ HP? \n בצע בדיקה שטמפרטורה ביציאת המעבה נמוכה ב-4ᵒC -7ᵒC מטמפרטורה בשעון HP \n(כן - אם גבוה מ-4ᵒC | לא - אם נמוך מ-3ᵒC) ", null, null);
    //אם שאלה 5 היא כן
    let q6 = new Node("האם Δθ בקו הנוזל תקין? \n בצע בדיקה בין T5 ל-T9 ש-ΔT  בין היציאה מהמעבה לטמפרטורה בכניסה לשסתום ההתפשטות \n אינו גדול מ-2º", null, null);
    //אם שאלה 5 היא לא 
    let q7 = new Node("חוסר בקרר", null, null);
    //אם שאלה 6 היא כן 
    let q8 = new Node("התפשטות מוקדמת בקו נוזל, החלף מסנן ", null, null);
    //אם שאלה 6 היא לא 
    let q9 = new Node("תקלה בשסתום ההתפשטות", null, null);


    q1.left = q2;
    q1.right = q5;
    q2.left = q3;
    q2.right = q4;
    q5.left = q7;
    q5.right = q6;
    q6.left = q9;
    q6.right = q8;




    q2.parent = q1;
    q5.parent = q1;
    q3.parent = q2;
    q4.parent = q2;
    q7.parent = q5;
    q6.parent = q5;
    q9.parent = q6;
    q8.parent = q6;



    return q1;
}


//לחץ ראש גבוה
function create_tree_3() {
    let q1 = new Node("האם קירור יתר (Subcooling) תקין? \n בצע בדיקה שטמפרטורה ביציאה מהמעבה נמוכה ב-4º-7º מטמפרטורה בשעון HP \n * קירור יתר גבוה יכול להצביע על עודף קרר", null, null);
    //אם שאלה 1 כן
    //
    let q2 = new Node(" האם קיימים גזים בלתי מעובים (אוויר, חנקן)?\n בצע בדיקה כאשר מדחס מופסק, בדוק האם קיים הפרש בין טמפרטורת הסביבה לטמפרטורת הקרר שתורגם מהלחץ שבשעון ", null, null);
    //אם שאלה 2 היא כן
    let q3 = new Node("קיימים בלתי מעובים", null, null);
    //אם שאלה 2 היא לא 
    let q4 = new Node("עודף בקרר ", null, null);
    //אם שאלה 1 היא לא
    //let q5 = new Node("בצע בדיקה בין T4 ל-T3 האם Δθ על האוויר קטן? \n ירידת תפוקה של מעבה", null, null);
    let q5 = new Node("בצע בדיקה בין T1 ל-T2 האם החלפת חום על המעבה תקין? \n מעבה מקורר אוויר (DX): 5-10K ΔT\n מעבה מקורר מים (Chiller): 4-6K ΔT", null, null);
    //בהכרח בא אחרי אין כן או לא
    //let q6 = new Node("האם Δθ על האוויר קטן?", null, null);
    //אם שאלה 6 היא כן
    let q7 = new Node("מעבה מלוכלך או שהחלפת החום של המעבה ירודה", null, null);
    //אם שאלה 6 היא לא
    let q8 = new Node("חוסר זרימת אוויר על סוללת המעבה \nΔT אוויר תקין בין ΔT 5ºC-10º מים תקין בין 4.5ºC-5.5ºC      ", null, null);


    q1.left = q5;
    q1.right = q2;
    q2.left = q4;
    q2.right = q3;
    //q5.left = q6;
    // q5.right = q6;
    q5.left = q8;
    q5.right = q7;

    q5.parent = q1;
    q2.parent = q1;
    q4.parent = q2;
    q3.parent = q2;
    //q6.parent = q5;
    q7.parent = q5;
    q8.parent = q5;



    return q1;
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function addpopup(model_name, file_name) {
    //var popUp_button_html = `<button id="popUp_button" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">לצפייה בתרשים</button>
    //<div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //    <div class="modal-dialog modal-dialog-centered">
    //        <div class="modal-content" style="width: 500px;">
    //            <div class="modal-header">
    //                <h5 class="modal-title" id="staticBackdropLabel">${model_name}</h5>
    //                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //            </div>
    //            <div class="modal-body" style="display: flex; justify-content: center;">
    //                <img src="images/${file_name}" />
    //            </div>
    //        </div>
    //    </div>
    //</div>`

//    var popUp_button_html = `<button id="popUp_button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//  לצפייה בתרשים
//</button>

//        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//            <div class="modal-dialog">
//                <div class="modal-content">
//                    <div class="modal-header">
//                        <h5 class="modal-title" id="exampleModalLabel">כותרת הפופאפ</h5>
//                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                    </div>
//                    <div class="modal-body">
//                        <p>תוכן הפופאפ כאן</p>
//                    </div>
//                    <div class="modal-footer">
//                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">סגור</button>
//                        <button type="button" class="btn btn-primary">שמור</button>
//                    </div>
//                </div>
//            </div>
//        </div>`

    var popUp_button_html = `<button id="popUp_button" type="button" class="btn btn-primary" onclick="openPopup()">לצפייה בתרשים</button>
<div id="popup" class="popup">
  <div class="popup-content">
    <span class="close" onclick="closePopup()">&times;</span>
    <p>
<img src="images/${file_name}" />
</p>
  </div>
</div>`


    var currentCategory = document.getElementById("currentCategory");
    currentCategory.innerHTML += popUp_button_html;
}

function clearpopup()
{
    var popup = document.getElementById("popUp_button");
    popup.remove();
}


function onloadpage(id_in) {

    if (current != null) {

        current.clearall();
        clearpopup();

    }

    if (id_in == "Tree1") {
        current = create_tree_1();
        title = document.getElementById("swiping_title");
        title.innerText = "לחץ יניקה (LP) גבוה";
        p = document.getElementById("swiping_p");
        p.innerText = "לחץ יניקה LP מתורגם לטמפרטורת רוויה של הקרר גבוה מ - 10°";
        //p2.innerText = "ענו על השאלות בהתאם לבדיקות ואתרו את התקלה"
        file_name = "air-air.jpg"
        model_name = "AIR-AIR"
    }
    else if (id_in == "Tree2") {
        current = create_tree_2();
        title = document.getElementById("swiping_title");
        title.innerText = "לחץ יניקה (LP) נמוך";
        p = document.getElementById("swiping_p");
        p.innerText = "טמפרטורת איוד תקין 4ᵒC + (-/+2)";
        //p2.innerText = "ענו על השאלות בהתאם לבדיקות ואתרו את התקלה"
        file_name = "air-air.jpg"
        model_name = "AIR-AIR"


    } else if (id_in == "Tree3") {
        current = create_tree_3();
        title = document.getElementById("swiping_title");
        title.innerText = "לחץ ראש/דחיסה גבוה (HP)";
        p = document.getElementById("swiping_p");
        p.innerText = "ערכים תקינים לחץ ראש גבוה HP המתורגם לטמפרטורת הקרר. 45ᵒC-55ᵒC (עיבוי אוויר) 35ᵒC-45ᵒC (עיבוי מים)";
        //p2.innerText = "ענו על השאלות בהתאם לבדיקות ואתרו את התקלה";
        file_name = "air-air.jpg"
        model_name = "AIR-AIR"
    }
    console.log(id);
    current.show();
    console.log(current.qustion);
    // document.getElementById("1").style.display = "none";
    // document.getElementById("2").style.display = "none";
    // document.getElementById("3").style.display = "none";
    document.getElementById("qustiondiv").style.display = "block";
    // document.getElementById("back").style.display = "initial";



    addpopup(model_name, file_name)
    scrollToCurrentCategory();

}

function scrollToCurrentCategory() {
    var currentCategory = document.getElementById("currentCategory");
    currentCategory.scrollIntoView({ behavior: 'smooth' });
}


function answer(qustion_answer, id_in) {
    console.log("id_in: " + id_in);
    console.log("remove id: " + (id - 1));
    if (id_in < id - 1)// the qustion is alrady answerd 
    {
        console.log("inside");
        current.clear(id_in, qustion_answer);
    }
    let temp = current.GetNext(qustion_answer);
    if (temp != null) {
        current = temp;
        current.show();
    }

}




