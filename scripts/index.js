const loadData = async() => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const response = await fetch(url);
    const data = await response.json();
    displayCards(data.data);
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('Cards-container');
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div
              class="p-5 rounded-lg shadow border-t-2 border-green-500 space-y-3 bg-white aspect-square"
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
              <div class="">
                <button class="py-1.5 px-4 rounded-full bg-[#FEECEC] text-xs">
                  <i class="fa-solid fa-bug"></i> BUG
                </button>
                <button class="py-1.5 px-4 rounded-full bg-[#FEECEC] text-xs">
                  <i class="fa-solid fa-futbol"></i> HELP WANTED
                </button>
              </div>
              <div class="border my-6 border-gray-300"></div>
              <!-- author and data -->
              <div class="">
                <p class="text-xs text-[#64748B] mb-1">#1 by john_doe</p>
                <p class="text-xs text-[#64748B]">1/15/2024</p>
              </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
    })
}

loadData();