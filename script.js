const userIdList = document.getElementById('userIdList');
const url = 'https://jsonplaceholder.typicode.com/todos';

fetch(url) //fetch data and displays the list
  .then(response => response.json())
  .then(data => {
    const taskLists = [];
    const toDoContainer = document.getElementById('toDoContainer');


    for (const datum of data) {
      taskLists.push(
        `
        <div class="UserId-${datum.userId}">
          <input type="checkbox" id="${datum.id}">  
          <label for="${datum.id}" id="content${datum.id}">${datum.title}</label>
        </div>`
      )
    }
    toDoContainer.innerHTML = taskLists.join('');
  })
  .catch(error => console.error('ERROR:', error));

//creates Filter list
fetch(url)
  .then(response => response.json())
  .then(data => {
    const newOptionsSet = new Set();

    for (const datum of data) {
      newOptionsSet.add(
        `
          <option value="${datum.userId}">User ID ${datum.userId}</option> 
          `
      )
    }
    const newOptions = Array.from(newOptionsSet);
    userIdList.innerHTML = `<option selected="true" disabled="disabled">Choose User ID</option>` + newOptions.join('')
  })

//toggle the displays for the userId data
function filter() {
  const allUserDivs = document.querySelectorAll('[class^="UserId-"]'); //collects all class with UserId-i where i++ and puts them in an array

  for (const userDiv of allUserDivs) {
    userDiv.style.display = 'none';
  }

  for (i = 1; i <= 10; i++) {
    const userDivs = document.getElementsByClassName(`UserId-${i}`)
    if (userIdList.value === `${i}`) {

      for (const userDiv of userDivs) {
        userDiv.style.display = 'block'
      }
    }
  }
}

//adds the strikethrough logic
fetch(url)
  .then(response => response.json())
  .then(data => {
    const linethroughStyle = document.getElementById('linethroughStyle')
    const styleArray = [];

    for (i = 1; i <= data.length; i++) {
      styleArray.push(
        `input[type=checkbox]:checked+#content${i} {
          text-decoration: line-through;
        }`
      )
    }
    linethroughStyle.textContent = styleArray.join('')
  })

