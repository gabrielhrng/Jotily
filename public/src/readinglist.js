function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var website=document.getElementById("website_row"+no);
 var url=document.getElementById("url_row"+no);
 var date=document.getElementById("date_row"+no);
	
 var website_data=website.innerHTML;
 var url_data=url.innerHTML;
 var date_data=date.innerHTML;
	
 website.innerHTML="<input type='text' id='website_text"+no+"' value='"+website_data+"'>";
 url.innerHTML="<input type='text' id='url_text"+no+"' value='"+url_data+"'>";
 date.innerHTML="<input type='text' id='date_text"+no+"' value='"+date_data+"'>";
}

function save_row(no)
{
 var website_val=document.getElementById("website_text"+no).value;
 var url_val=document.getElementById("url_text"+no).value;
 var date_val=document.getElementById("date_text"+no).value;

 document.getElementById("website_row"+no).innerHTML=website_val;
 document.getElementById("url_row"+no).innerHTML=url_val;
 document.getElementById("date_row"+no).innerHTML=date_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 var new_website=document.getElementById("new_website").value;
 var new_url=document.getElementById("new_url").value;
 var new_date=document.getElementById("new_date").value;
	
 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='website_row"+table_len+"'>"+new_website+"</td><td id='url_row"+table_len+"'>"+new_url+"</td><td id='date_row"+table_len+"'>"+new_date+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_website").value="";
 document.getElementById("new_url").value="";
 document.getElementById("new_date").value="";
}