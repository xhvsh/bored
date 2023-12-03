const btn = document.querySelector('.generate');
const reset = document.querySelector('.reset');

const participantsValue = document.querySelector('.participants-value');
const priceValue = document.querySelector('.price-value');
const priceP = document.querySelector('.price-p');
const display = document.querySelector('.display-price');

const activityName = document.querySelector('.activity-name');
const activityInfo = document.querySelector('.activity-info');

const participantsInput = document.querySelector('.participants');
const priceInput = document.querySelector('.price');

participantsInput.addEventListener('input', () => {
  var participants = document.querySelector('.participants').value;
  participantsValue.innerHTML = participants;
});
priceInput.addEventListener('input', () => {
  var price = document.querySelector('.price').value;

  if (price < 0.05) {
    priceValue.innerHTML = `Free`;
  } else if (price >= 0.05 && price <= 0.2) {
    priceValue.innerHTML = `Very Cheap`;
  } else if (price >= 0.25 && price <= 0.4) {
    priceValue.innerHTML = `Cheap`;
  } else if (price >= 0.45 && price <= 0.6) {
    priceValue.innerHTML = `Medium`;
  } else if (price >= 0.65 && price <= 0.8) {
    priceValue.innerHTML = `Expensive`;
  } else if (price >= 0.85 && price <= 0.95) {
    priceValue.innerHTML = `Very Expensive`;
  } else if (price >= 0.95) {
    priceValue.innerHTML = `No limit`;
  }
});

btn.addEventListener('click', () => {
  const type = document.querySelector('.type').value;
  const participants = document.querySelector('.participants').value;
  const price = document.querySelector('.price').value;
  const url = type === 'random' ? `https://www.boredapi.com/api/activity?participants=${participants}&minprice=0.0&maxprice=${price}` : `https://www.boredapi.com/api/activity?type=${type}&participants=${participants}&minprice=0.0&maxprice=${price}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        activityName.innerHTML = data.error;
        [activityInfo, priceP].forEach((elem) => elem.classList.add('hidden'));
      } else {
        activityInfo.classList.remove('hidden');
        priceP.classList.remove('hidden');

        activityName.innerHTML = `<b>${data.activity}</b>`;
        activityInfo.innerHTML = `Type: ${data.type} | Participants: ${data.participants}`;
        if (data.price < 0.05) {
          priceP.innerHTML = `Price: <span style="color:#00ffb7;">Free</span>`;
        } else if (data.price >= 0.05 && data.price <= 0.2) {
          priceP.innerHTML = `Price: <span style="color:#00ff00;">Very Cheap</span>`;
        } else if (data.price >= 0.25 && data.price <= 0.4) {
          priceP.innerHTML = `Price: <span style="color:#aeff00;">Cheap</span>`;
        } else if (data.price >= 0.45 && data.price <= 0.6) {
          priceP.innerHTML = `Price: <span style="color:#d4ff00;">Medium</span>`;
        } else if (data.price >= 0.65 && data.price <= 0.8) {
          priceP.innerHTML = `Price: <span style="color:#ff9500;">Expensive</span>`;
        } else if (data.price >= 0.85 && data.price <= 1) {
          priceP.innerHTML = `Price: <span style="color:#ff4800;">Very Expensive</span>`;
        }
      }
    })
    .catch((err) => console.error(err));
});

reset.addEventListener('click', () => {
  activityName.innerHTML = `Activity will be displayed there.`;
  activityInfo.innerHTML = ``;
  priceValue.innerHTML = `Free`;
  priceP.innerHTML = ``;
  participantsValue.innerHTML = 1;

  activityInfo.classList.add('hidden');
  priceP.classList.add('hidden');
});
