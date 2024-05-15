var Action = pc.createScript('action');
var pages=["authentication","loadng_screen","tap_to_start","game_screen","game_over","leader_board","pause_modal"];
var lastPage=null;
var pageIndex=0;
Action.prototype.initialize = function() 
{
    var main_page=this.app.assets.find('main_page')
    var html_string=main_page._resources[0];
    html_string=html_string.replaceAll("external_images","https://raw.githubusercontent.com/BS-XR-23/KFC-Subway-Surfers/main/external_images");
    html_string=html_string.replaceAll("external_fonts","https://raw.githubusercontent.com/BS-XR-23/KFC-Subway-Surfers/main/external_fonts");

    div = document.createElement('div');
    div.setAttribute("class", "fullscreen");
    document.body.appendChild(div);
    div.innerHTML=html_string;

    //ShowPage(null,"authentication");
};

function ShowPage(e,pageName)
{
    if(e) e.stopPropagation();
    console.log(pageName);
    if(lastPage) $(`#${lastPage}`).css("display","none");
    lastPage=pageName;
    pageIndex=pages.indexOf(pageName);
    
    if(pageIndex>=0)
    {
        $(`#${pages[pageIndex]}`).css("display","flex");
        console.log("pageIndex:",$(`#${pages[pageIndex]}`));
    }
    if(pageIndex>2)
    {
        $(`#score_container`).css("display","flex");
    }
    else if(pageIndex>=0)
    {
        $(`#score_container`).css("display","none");
    }
}
 function SubmitInfo(e,pageName)
{
    var name=$("input[name='name']").val();
    var phone=$("input[name='phone']").val();
    if(name.length<=0)
    {
        $("#warning_message").text("PLEASE ENTER VALID NAME");
        $("#warning_modal").css("display","flex");
        return;
    }
    if(!IsValidContact(phone))
    {
        $("#warning_message").text("PLEASE ENTER VALID Contact Number");
        $("#warning_modal").css("display","flex");
        return;
    }
    ShowPage(e,pageName);
}
 function IsValidContact(contact)
{
    const phoneNumberRegex = /^(?:\+?880|880|01)(?:\s?\d){9,10}$/;
    return phoneNumberRegex.test(contact);
}
function HideSelf(e,pageName)
{
    if(e) e.stopPropagation();
    $(`#${pageName}`).css("display","none");
}