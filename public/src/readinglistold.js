// $("form").submit(function(e){
//     e.preventDefault();
//     var website = $("input[website='website']").val();
//     var url = $("input[website='url']").val();

//         $(".data-table tbody").append("<tr data-website='"+website+"' data-url='"+url + "'><td>"+website+"</td><td>" + "<a href="+url+" target = \"_blank\">"+ website +"</a>"+"</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>");

//     $("input[website='website']").val('');
//     $("input[website='url']").val('');
// });

let readingListForm = document.querySelector('#readingListForm');

readingListForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let website = document.querySelector("input[website='website']");
        let url = document.querySelector("input[website='url']");

        let delButton = document.createElement('button');
        delButton.classList.add('btn', 'btn-danger', 'btn-xs', 'btn-delete');
        delButton.textContent = "Delete";

        let editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-info', 'btn-xs', 'btn-delete');
        editButton.textContent = "Edit";

        let row = document.createElement('tr');
        row.setAttribute('data-website', website.value);
        row.setAttribute('data-url', url.value);

        let websiteLink = document.createElement('td');
        websiteLink.innerHTML = "<a href="+url.value+" target = \"_blank\">"+ website.value +"</a>";
        let websiteActions = document.createElement('td');

        websiteActions.appendChild(editButton);
        websiteActions.appendChild(delButton);

        row.appendChild(websiteLink);
        row.appendChild(websiteActions);


        document.querySelector(".data-table tbody").appendChild(row);
        
        website.value = '';
        url.value = '';

        console.log('test')

        delButton.addEventListener('click', (event) => {
            event.target.parentElement.parentElement.remove();
            
        })


})



//$("body").on("click", ".btn-delete", function(){
//    $(this).parents("tr").remove();
//});

$("body").on("click", ".btn-edit", function(){
    var website = $(this).parents("tr").attr('data-website');
    var url = $(this).parents("tr").attr('data-url');

    $(this).parents("tr").find("td:eq(0)").html('<input website="edit_name" value="'+website+'">');
    $(this).parents("tr").find("td:eq(1)").html('<input website="edit_email" value="'+url+'">');

    $(this).parents("tr").find("td:eq(2)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel", function(){
    var website = $(this).parents("tr").attr('data-website');
    var url = $(this).parents("tr").attr('data-url');

    $(this).parents("tr").find("td:eq(0)").text(website);
    $(this).parents("tr").find("td:eq(1)").html("<a href=\""+url+"\">"+ website +"</a>");

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-update").remove();
    $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function(){
    var website = $(this).parents("tr").find("input[website='edit_name']").val();
    var url = $(this).parents("tr").find("input[website='edit_email']").val();

    $(this).parents("tr").find("td:eq(0)").text(website);
    $(this).parents("tr").find("td:eq(1)").html("<a href=\""+url+"\">"+ website +"</a>");

    $(this).parents("tr").attr('data-website', website);
    $(this).parents("tr").attr('data-url', url);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();
});
