$("form").submit(function(e){
    e.preventDefault();
    var website = $("input[website='website']").val();
    var url = $("input[website='url']").val();

    $(".data-table tbody").append("<tr data-website='"+website+"' data-url='"+url + "'><td>"+website+"</td><td>" + "<a href="+url+">"+ website +"</a>"+"</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>");

    $("input[website='website']").val('');
    $("input[website='url']").val('');
});

$("body").on("click", ".btn-delete", function(){
    $(this).parents("tr").remove();
});

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
