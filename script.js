const btn = document.querySelector('.generate');
const reset = document.querySelector('.reset');

const participantsValue = document.querySelector('.participants-value');
const priceValue = document.querySelector('.price-value');
const finalPrice = document.querySelector('.final-price');
const priceP = document.querySelector('.price-p');
const display = document.querySelector('.display-price');

const activityName = document.querySelector('.activity-name');
const activityInfo = document.querySelector('.activity-info');
const activityPrice = document.querySelector('.activity-price');

const participantsInput = document.querySelector('.participants');
const priceInput = document.querySelector('.price');

participantsInput.addEventListener('input', () => {
  var participants = document.querySelector('.participants').value;
  participantsValue.innerHTML = participants;
});
priceInput.addEventListener('input', () => {
  var price = document.querySelector('.price').value;
  priceValue.innerHTML = price;
});

btn.addEventListener('click', () => {
  var type = document.querySelector('.type').value;
  var participants = document.querySelector('.participants').value;
  var price = document.querySelector('.price').value;

  if (type == 'random') {
    fetch(`https://www.boredapi.com/api/activity?participants=${participants}&minprice=0.0&maxprice=${price}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          activityName.innerHTML = data.error;

          activityInfo.classList.add('hidden');
          display.classList.add('hidden');
          priceP.classList.add('hidden');
        } else {
          activityInfo.classList.remove('hidden');
          display.classList.remove('hidden');
          priceP.classList.remove('hidden');

          activityName.innerHTML = data.activity;
          activityInfo.innerHTML = `Type: ${data.type} | Participants: ${data.participants}`;
          activityPrice.value = data.price;
          finalPrice.innerHTML = data.price;
        }
      })
      .catch((err) => console.error(err));
  } else {
    fetch(`https://www.boredapi.com/api/activity?type=${type}&participants=${participants}&minprice=0.0&maxprice=${price}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          activityName.innerHTML = data.error;

          activityInfo.classList.add('hidden');
          display.classList.add('hidden');
          priceP.classList.add('hidden');
        } else {
          activityInfo.classList.remove('hidden');
          display.classList.remove('hidden');
          priceP.classList.remove('hidden');

          activityName.innerHTML = data.activity;
          activityInfo.innerHTML = `Type: ${data.type} | Participants: ${data.participants}`;
          activityPrice.value = data.price;
          finalPrice.innerHTML = data.price;
        }
      })
      .catch((err) => console.error(err));
  }
});
reset.addEventListener('click', () => {
  activityName.innerHTML = `Activity will be displayed there.`;
  activityInfo.innerHTML = ``;
  activityPrice.value = 0;
  finalPrice.innerHTML = 0;
  priceValue.innerHTML = 0;
  participantsValue.innerHTML = 0;

  activityInfo.classList.add('hidden');
  display.classList.add('hidden');
  priceP.classList.add('hidden');
});
