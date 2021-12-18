var fontBtn;
var font;
var login;
var diaryForm = document.querySelector("#postForm");
var mainForm1 = document.querySelector("#mainForm1");
var mainForm2 = document.querySelector("#mainForm2");
var saveButton = document.querySelector("#saveBtn");
var dateContent = document.querySelector("#date");
var postContent = document.querySelector("#post");
var postList = document.querySelector("#postList");

let diaryList = [];

// localstorage에 일기 내용 저장
function saveDiary() {
    localStorage.setItem("Diary", JSON.stringify(diaryList));
}

// localstorage에 저장된 일기 삭제 
function deleteDiary(event) {
    const deleteElement = event.target.parentElement;
    deleteElement.remove();
    diaryList = diaryList.filter((post) => post.id !== parseInt(deleteElement.id));
    saveDiary();
}

function newPost(newDiary) // 일기 추가
{
    // 일기 날짜와 내용 입력
    var newPost = document.createElement("div");
    newPost.id = newDiary.id;
    newPost.setAttribute("class", "newpost"); // div 태그에 class 속성값 newpost로 줌
    var content1 = document.createTextNode(newDiary.date);
    var content2 = document.createTextNode(newDiary.text);
    var line = document.createElement("br"); 
    var line2 = document.createElement("br");
    newPost.appendChild(content1);
    newPost.appendChild(line);
    newPost.appendChild(content2);
    newPost.appendChild(line2);

    // 일기 삭제 버튼 생성
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "postdelete");
    var deleteText = document.createTextNode("삭제");
    deleteButton.appendChild(deleteText);

    // 삭제 기능
    deleteButton.addEventListener("click", deleteDiary);
    newPost.appendChild(deleteButton);

    postList.appendChild(newPost);

    // 삭제버튼에 대한 폰트 변경
    if (localStorage.getItem("font") == 1)
    {
        var deleteBtnList = document.querySelectorAll("#postdelete");
        for (let i = 0; i < deleteBtnList.length; i++)
            deleteBtnList[i].style.fontFamily = "GowunDodum-Regular";
    }
    else if (localStorage.getItem("font") == 2)
    {
        var deleteBtnList = document.querySelectorAll("#postdelete");
        for (let i = 0; i < deleteBtnList.length; i++)
            deleteBtnList[i].style.fontFamily = "paybooc-Bold";
    }
    else if (localStorage.getItem("font") == 3)
    {
        var deleteBtnList = document.querySelectorAll("#postdelete");
        for (let i = 0; i < deleteBtnList.length; i++)
            deleteBtnList[i].style.fontFamily = "InfinitySans-RegularA1";
    }
    else if (localStorage.getItem("font") == 4)
    {
        var deleteBtnList = document.querySelectorAll("#postdelete");
        for (let i = 0; i < deleteBtnList.length; i++)
            deleteBtnList[i].style.fontFamily = "DungGeunMo";
    }
}

function handleToDiary(event) {
    event.preventDefault();
    const diaryContent = postContent.value;
    postContent.value = "";
    const newDiaryObj = {
        date: dateContent.value,
        text: diaryContent,
        id: Date.now(),
    };
    diaryList.push(newDiaryObj);
    newPost(newDiaryObj);
    saveDiary();
}

// 폰트 버튼을 눌렀을 때 일기장 페이지를 누른 폰트로 변경
function fontButton(btn) {
    fontBtn = btn.value;
    if (btn.value == 1)
    {
        font = 1;
        document.querySelector("*").style.fontFamily = "GowunDodum-Regular";
        document.querySelector("#post").style.fontFamily = "GowunDodum-Regular";
        document.querySelector("#saveBtn").style.fontFamily = "GowunDodum-Regular";
        document.querySelector("#start").style.fontFamily = "GowunDodum-Regular";
        document.querySelector("#logoutBtn").style.fontFamily = "GowunDodum-Regular";
        document.querySelector("input").style.fontFamily = "GowunDodum-Regular";
    }
    else if (btn.value == 2)
    {
        font = 2;
        document.querySelector("*").style.fontFamily = "paybooc-Bold";
        document.querySelector("#post").style.fontFamily = "paybooc-Bold";
        document.querySelector("#saveBtn").style.fontFamily = "paybooc-Bold";
        document.querySelector("#start").style.fontFamily = "paybooc-Bold";
        document.querySelector("#logoutBtn").style.fontFamily = "paybooc-Bold";
        document.querySelector("input").style.fontFamily = "paybooc-Bold";
    }
    else if (btn.value == 3)
    {
        font = 3;
        document.querySelector("*").style.fontFamily = "InfinitySans-RegularA1";
        document.querySelector("#post").style.fontFamily = "InfinitySans-RegularA1";
        document.querySelector("#saveBtn").style.fontFamily = "InfinitySans-RegularA1";
        document.querySelector("#start").style.fontFamily = "InfinitySans-RegularA1";
        document.querySelector("#logoutBtn").style.fontFamily = "InfinitySans-RegularA1";
        document.querySelector("input").style.fontFamily = "InfinitySans-RegularA1"
    }
    else if (btn.value == 4)
    {
        font = 4;
        document.querySelector("*").style.fontFamily = "DungGeunMo";
        document.querySelector("#post").style.fontFamily = "DungGeunMo";
        document.querySelector("#saveBtn").style.fontFamily = "DungGeunMo";
        document.querySelector("#start").style.fontFamily = "DungGeunMo";
        document.querySelector("#logoutBtn").style.fontFamily = "DungGeunMo";
        document.querySelector("input").style.fontFamily = "DungGeunMo";
    }
    localStorage.setItem("font", font);
}

// 일기 쓰러가기 버튼을 누르면 다이어리 입력창이 나타나게 함
function startDiary()
{
    location.reload();
    login = 1;
    localStorage.setItem("isLogin", login);
    diaryForm.classList.remove("hidden");
    mainForm1.classList.add("hidden");
    mainForm2.classList.add("hidden");
}

function logoutButton()
{
    login = 0;
    localStorage.setItem("isLogin", login);
    diaryForm.classList.add("hidden");
    mainForm1.classList.remove("hidden");
    mainForm2.classList.remove("hidden");
}

// 페이지 이동 후 새로고침해도 유지
if (localStorage.getItem("isLogin") == 0)
{
    diaryForm.classList.add("hidden");
    mainForm1.classList.remove("hidden");
    mainForm2.classList.remove("hidden");
}
else if (localStorage.getItem("isLogin") == 1)
{
    diaryForm.classList.remove("hidden");
    mainForm1.classList.add("hidden");
    mainForm2.classList.add("hidden");
}

// 페이지 새로고침해도 설정한 폰트 유지
if (localStorage.getItem("font") == 1)
{
    document.querySelector("*").style.fontFamily = "GowunDodum-Regular";
    document.querySelector("#post").style.fontFamily = "GowunDodum-Regular";
    document.querySelector("#saveBtn").style.fontFamily = "GowunDodum-Regular";
    document.querySelector("#start").style.fontFamily = "GowunDodum-Regular";
    document.querySelector("#logoutBtn").style.fontFamily = "GowunDodum-Regular";
    document.querySelector("input").style.fontFamily = "GowunDodum-Regular";;
}
else if (localStorage.getItem("font") == 2)
{
    document.querySelector("*").style.fontFamily = "paybooc-Bold";
    document.querySelector("#post").style.fontFamily = "paybooc-Bold";
    document.querySelector("#saveBtn").style.fontFamily = "paybooc-Bold";
    document.querySelector("#start").style.fontFamily = "paybooc-Bold";
    document.querySelector("#logoutBtn").style.fontFamily = "paybooc-Bold";
    document.querySelector("input").style.fontFamily = "paybooc-Bold";
}
else if (localStorage.getItem("font") == 3)
{
    document.querySelector("*").style.fontFamily = "InfinitySans-RegularA1";
    document.querySelector("#post").style.fontFamily = "InfinitySans-RegularA1";
    document.querySelector("#saveBtn").style.fontFamily = "InfinitySans-RegularA1";
    document.querySelector("#start").style.fontFamily = "InfinitySans-RegularA1";
    document.querySelector("#logoutBtn").style.fontFamily = "InfinitySans-RegularA1";
    document.querySelector("input").style.fontFamily = "InfinitySans-RegularA1"
}
else if (localStorage.getItem("font") == 4)
{
    document.querySelector("*").style.fontFamily = "DungGeunMo";
    document.querySelector("#post").style.fontFamily = "DungGeunMo";
    document.querySelector("#saveBtn").style.fontFamily = "DungGeunMo";
    document.querySelector("#start").style.fontFamily = "DungGeunMo";
    document.querySelector("#logoutBtn").style.fontFamily = "DungGeunMo";
    document.querySelector("input").style.fontFamily = "DungGeunMo";
}

saveButton.addEventListener("click", handleToDiary);

const savedDiary = localStorage.getItem("Diary");

if (savedDiary !== null)
{
    const parsedDiary = JSON.parse(savedDiary);
    diaryList = parsedDiary;
    parsedDiary.forEach(newPost);
}