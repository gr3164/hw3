const form = document.querySelector('#form');
const app = document.querySelector('#app');

let reviews = [
    {name: 'title1', reviews:[{id:1, text:'qwe'}]},
    {name: 'title2', reviews:[{id:2, text:'qwe123224'},
    {id:23, text:'qwe12322asassa4'}]},
    {name: 'title3', reviews:[{id:3, text:'qweqwqwqcq'}]},
    {name: 'title3', reviews:[]},
]


if(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const name = document.querySelector('#nameProduct').value;
        const feedback = document.querySelector('#feedback').value;
    
        const curent = reviews.find(el => el.name === name);
    
        if(curent){
            curent.reviews.push({id: new Date, text: feedback});
        }else{
            reviews.push({name:name, reviews:[{id: new Date, text: feedback}]});
        }
        
        localStorage.setItem('reviews', JSON.stringify(reviews));
        form.reset()
    })
}

reviews = JSON.parse(localStorage.getItem('reviews'));


// Функция для отображения списка всех продуктов с отзывами
function displayProducts() {
  const productList = document.getElementById('app');
  productList.innerHTML = '';

//   let reviews = JSON.parse(localStorage.getItem('reviews'))

  for (const product of reviews) {
    if (product.reviews.length > 0) {
      const productItem = document.createElement('div');
      const feedbacks = document.createElement('ul')
      productItem.textContent = product.name;
      productItem.addEventListener('click', () => displayReviews(product.reviews, feedbacks));
      productList.appendChild(productItem);
      productItem.appendChild(feedbacks);
    }
  }
}

// Функция для отображения списка отзывов по выбранному продукту
function displayReviews(productReviews, feedbacks) {
    feedbacks.innerHTML = '';

  for (const review of productReviews) {
    const reviewItem = document.createElement('li');
    reviewItem.textContent = review.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => deleteReview(review, feedbacks));
    reviewItem.appendChild(deleteButton);

    feedbacks.appendChild(reviewItem);
  }
}

//Функцуия для удаления отзывов по выбранному продукту
function deleteReview(review, feedbacks) {
    const productIndex = reviews.findIndex(product => product.reviews.includes(review));
    if (productIndex !== -1) {
        const reviewIndex = reviews[productIndex].reviews.findIndex(r => r.id === review.id);

        if (reviewIndex !== -1) {
            reviews[productIndex].reviews.splice(reviewIndex, 1);

            localStorage.setItem('reviews', JSON.stringify(reviews));
            displayReviews(reviews[productIndex].reviews, feedbacks);
            console.log('Отзыв удален:', review);
        }
    }
}

// Запуск отображения списка продуктов при загрузке страницы
window.addEventListener('load', displayProducts);


