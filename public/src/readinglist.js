
let readingListForm = document.querySelector('#readingListForm');

readingListForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let website = document.querySelector("input[website='website']");
        let url = document.querySelector("input[website='url']");

        let delButton = document.createElement('button');
        delButton.classList.add('btn', 'btn-danger', 'btn-xs', 'btn-delete');
        delButton.textContent = "Delete";

        let row = document.createElement('tr');
        row.setAttribute('data-website', website.value);
        row.setAttribute('data-url', url.value);

        let websiteLink = document.createElement('td');
        websiteLink.innerHTML = "<a href="+url.value+" target = \"_blank\">"+ website.value +"</a>";
        let websiteActions = document.createElement('td');

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
