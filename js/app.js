const bidHistoryEl = document.getElementById('bid-history');
const highestBidderEl = document.getElementById('highest-bidder');
const bidder1Input = document.getElementById('bidder-1-input');
const bidder2Input = document.getElementById('bidder-2-input');
const bidder1Button = document.getElementById('bidder-1-button');
const bidder2Button = document.getElementById('bidder-2-button');
const clearBidsButton = document.getElementById('clear-bids-button');
const STORAGE_KEY = 'bids';

function loadBids() {
    const bidsFromStorage = localStorage.getItem(STORAGE_KEY);
    if (!bidsFromStorage) {
      return [];
    }

    try {
      return JSON.parse(bidsFromStorage);
    } catch {
      return [];
    }
}

function saveBids() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bids));
}

function placeBid(bidderId, inputEl) {
  const inputValue = Number(inputEl.value);
  if (!Number.isFinite(inputValue) || inputValue <= 0) {
    return;
  }

  bids.push({ bidder: bidderId, amount: inputValue });
  saveBids();
  renderBids();
  inputEl.value = '';
}

function renderBids() {
  if (bids.length === 0) {
    bidHistoryEl.innerHTML = '<li>No Bids yet</li>';
    highestBidderEl.textContent = 'No bids yet';
    return;
  }

  bidHistoryEl.innerHTML = bids
    .map((bid) => {
      return `<li>
        <span>
            ${bid.bidder}
        </span>
        <span>
            $${bid.amount}
        </span>
        </li>`;
    })
    .join('');

  const highestBid = bids.reduce((topBid, currentBid) => {
    return Number(currentBid.amount) > Number(topBid.amount) ? currentBid : topBid;
  }, bids[0]);

  highestBidderEl.textContent = `${highestBid.bidder} — $${highestBid.amount}`;
}

bidder1Button.addEventListener('click', () => placeBid('bidder1', bidder1Input));
bidder2Button.addEventListener('click', () => placeBid('bidder2', bidder2Input));

clearBidsButton.addEventListener('click', () => {
  bids.length = 0;
  localStorage.removeItem(STORAGE_KEY);
  bidder1Input.value = '';
  bidder2Input.value = '';
  renderBids();
});

const bids = loadBids();
renderBids();
