const loadData = async() => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const response = await fetch(url);
    const data = await response.json();
    displayCards(data.data);
}

const showSpinner = (status) => {

    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("Cards-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("Cards-container").classList.remove("hidden");
    }
}

const createBadges = badges => {
    const badgeDiv = badges.map(badge => `<span class="badge  ${badge == 'bug' ? 'bg-[#FEECEC] text-[#EF4444] font-medium border-2 border-[#FECACA]' : ''} ${badge == 'help wanted' ? 'bg-[#FFF8DB] text-[#D97706] font-medium border-2 border-[#FDE68A]' : ''} ${badge == 'enhancement' ? 'bg-[#DEFCE8] text-[#00A96E] font-medium border-2 border-[#BBF7D0]' : 'bg-[#91e2ec71] text-[#00A96E] font-medium border-2 border-[#BBF7D0]'} "> ${badge === 'bug' ? '<i class="fa-solid fa-bug"></i>' : ''} ${badge === 'help wanted' ? '<i class="fa-regular fa-futbol"></i>' : ''} ${badge === 'enhancement' ? '<i class="fa-brands fa-sith"></i>' : ''} ${badge == 'documentation' ? '<i class="fa-regular fa-file-lines"></i>' : ''} ${badge == 'good first issue' ? '<i class="fa-regular fa-lightbulb"></i>' : ''}  ${badge.toUpperCase()}</span>`);
    return badgeDiv.join(" ");
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('Cards-container');
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div
              class="p-5 rounded-lg shadow border-t-2 space-y-3 bg-white ${card.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}"
            >
              <!-- Priority -->
              <div class="flex justify-between items-center">
                ${card.status == 'open' ? '<img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                <button class="badge ${card.priority == 'high' ? 'bg-red-200 text-red-600' : ''} ${card.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : ''} ${card.priority == 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' : ''}" >
                  ${card.priority.toUpperCase()}
                </button>
              </div>
              <!-- Title -->
              <div class="">
                <h1 class="font-semibold mb-2">
                  ${card.title}
                </h1>
                <p class="text-xs text-[#64748B]">
                  ${card.description}
                  devices...
                </p>
              </div>
              <!-- problem badge -->
              <div class="flex items-center gap-1 flex-wrap">
                ${createBadges(card.labels)}
              </div>
              <div class="border my-6 border-gray-300"></div>
              <!-- author and data -->
              <div class="">
                <p class="text-xs text-[#64748B] mb-1">#1 by ${card.author}</p>
                <p class="text-xs text-[#64748B]">${card.updatedAt}</p>
              </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
    })
}

const removeBtn = () => {
    const allBtns = document.querySelectorAll('.all-btns');
    allBtns.forEach(btn => btn.classList.remove('btn-primary'));
}

const displayAllCard = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    showSpinner(true);

    const response = await fetch(url);
    const data = await response.json();
    const cardData = data.data;

    removeBtn();

    displayCards(cardData);
    showSpinner(false);

    document.getElementById("issue-counts").innerText = cardData.length;

    const btnClick = document.getElementById('allBtn');
    btnClick.classList.add("btn-primary");
}

const displayOpenCard = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    showSpinner(true);

    const response = await fetch(url);
    const data = await response.json();
    const cardData = data.data;

    removeBtn();

    const openCards = cardData.filter(card => card.status == 'open');
    displayCards(openCards);
    showSpinner(false);

    document.getElementById("issue-counts").innerText = openCards.length;

    const btnClick = document.getElementById('openBtn');
    btnClick.classList.add("btn-primary");

}

const displayCloseCard = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    showSpinner(true);

    const response = await fetch(url);
    const data = await response.json();
    const cardData = data.data;

    removeBtn();

    const closeCards = cardData.filter(card => card.status == 'closed');
    displayCards(closeCards);
    showSpinner(false);

    document.getElementById("issue-counts").innerText = closeCards.length;

    const btnClick = document.getElementById('closeBtn');
    btnClick.classList.add("btn-primary");
}

loadData();