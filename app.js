const SCREENS = {
  START: "start",
  PLAYERS: "players",
  GAME: "game",
  PENALTY: "penalty",
  FINISHED: "finished",
  MENU: "menu"
};

const STORAGE_KEYS = {
  usedCards: "usedCards",
  usedChaosCards: "usedChaosCards",
  selectedPlayers: "selectedPlayers",
  gameStats: "gameStats"
};

const DEFAULT_STATS = {
  totalShown: 0,
  action: 0,
  truth: 0,
  never: 0,
  mini_game: 0,
  chaos: 0
};

const app = document.getElementById("app");

let state = {
  usedCards: [],
  usedChaosCards: [],
  selectedPlayers: [],
  gameStats: { ...DEFAULT_STATS }
};

let currentScreen = SCREENS.START;
let previousScreen = SCREENS.START;
let currentCard = null;
let currentPenaltyCard = null;
let menuConfirmReset = false;

let timerInterval = null;
let timerInitial = 0;
let timerRemaining = 0;
let timerDone = false;
let audioContext = null;

function initApp() {
  loadGameState();
  validateCards();
  renderStartScreen();
  registerServiceWorker();
}

function renderStartScreen() {
  closeMenu();
  pauseTimer();
  currentScreen = SCREENS.START;
  app.innerHTML = `
    <section class="screen centered">
      <div class="brand">
        <div class="brand-row">
          <img class="brand-logo" src="./icons/icon-192.png" alt="" width="76" height="76">
          <p class="subtitle">Закрытая игра для своих</p>
        </div>
        <h1>Русик, наливай!</h1>
      </div>
      <div class="button-row">
        <button class="primary" id="startButton" type="button">Начать</button>
      </div>
      <p class="fineprint">Работает офлайн после первого запуска</p>
    </section>
  `;

  document.getElementById("startButton").addEventListener("click", renderPlayersScreen);
}

function renderPlayersScreen() {
  closeMenu();
  pauseTimer();
  currentScreen = SCREENS.PLAYERS;

  const savedPlayers = new Set(getSelectedPlayers());
  const playerItems = DEFAULT_PLAYERS.map((player) => `
    <label class="player-option">
      <input type="checkbox" name="player" value="${escapeHtml(player)}" ${savedPlayers.has(player) ? "checked" : ""}>
      <span>${escapeHtml(player)}</span>
    </label>
  `).join("");

  app.innerHTML = `
    <section class="screen">
      <div class="topline">
        <span>Игроки</span>
        <span id="playerCount">0 выбрано</span>
      </div>
      <h1>Кто сегодня играет?</h1>
      <p class="subtitle">Нужно минимум двое. Остальное игра возьмёт на себя.</p>
      <div class="player-grid">${playerItems}</div>
      <p class="hint" id="playersHint">Выберите минимум двух игроков</p>
      <div class="button-row two">
        <button class="secondary" id="selectAllButton" type="button">Выбрать всех</button>
        <button class="ghost" id="clearAllButton" type="button">Снять всех</button>
      </div>
      <div class="button-row">
        <button class="primary" id="playButton" type="button">Играть</button>
      </div>
    </section>
  `;

  const checkboxes = [...document.querySelectorAll("input[name='player']")];
  const playButton = document.getElementById("playButton");
  const hint = document.getElementById("playersHint");
  const playerCount = document.getElementById("playerCount");

  function syncPlayers() {
    const selected = checkboxes.filter((box) => box.checked).map((box) => box.value);
    saveSelectedPlayers(selected);
    playerCount.textContent = `${selected.length} выбрано`;
    playButton.disabled = selected.length < 2;
    hint.textContent = selected.length < 2
      ? "Выберите минимум двух игроков"
      : "Готово. Можно начинать.";
  }

  checkboxes.forEach((box) => box.addEventListener("change", syncPlayers));
  document.getElementById("selectAllButton").addEventListener("click", () => {
    checkboxes.forEach((box) => {
      box.checked = true;
    });
    syncPlayers();
  });
  document.getElementById("clearAllButton").addEventListener("click", () => {
    checkboxes.forEach((box) => {
      box.checked = false;
    });
    syncPlayers();
  });
  playButton.addEventListener("click", () => {
    if (getSelectedPlayers().length < 2) {
      hint.textContent = "Выберите минимум двух игроков";
      return;
    }
    showNextCard();
  });

  syncPlayers();
}

function renderGameScreen(card) {
  closeMenu();
  currentScreen = SCREENS.GAME;
  currentCard = card;
  currentPenaltyCard = null;
  setupTimerForCard(card);

  const remaining = getRemainingMainCardsCount();
  const shown = state.usedCards.length;
  const total = getTotalMainCardsCount();

  app.innerHTML = `
    <section class="screen">
      <div class="topline">
        <span>Карточка: ${shown} / ${total}</span>
        <button class="ghost" id="menuButton" type="button">Меню</button>
      </div>
      <article class="card-shell" id="activeCard">
        <div class="stats-grid">
          <div class="stat">
            <span>Осталось</span>
            <strong>${remaining}</strong>
          </div>
          <div class="stat">
            <span>Активный игрок</span>
            <strong>${escapeHtml(card.activePlayer)}</strong>
          </div>
        </div>
        <div>
          <div class="card-type">${escapeHtml(CARD_TYPE_LABELS[card.type] || card.type)}</div>
          <h1 class="card-title">${escapeHtml(card.title)}</h1>
        </div>
        <p class="card-text">${escapeHtml(card.resolvedText)}</p>
        ${card.timer ? renderTimerMarkup(card.timer) : ""}
      </article>
      <div class="action-bar">
        <button class="primary" id="completeButton" type="button">Выполнено</button>
        <button class="danger" id="penaltyButton" type="button">Отказ / штраф</button>
        <button class="secondary" id="nextButton" type="button">Следующая</button>
      </div>
    </section>
  `;

  document.getElementById("completeButton").addEventListener("click", completeCard);
  document.getElementById("penaltyButton").addEventListener("click", showPenalty);
  document.getElementById("nextButton").addEventListener("click", showNextCard);
  document.getElementById("menuButton").addEventListener("click", () => {
    menuConfirmReset = false;
    renderMenu();
  });
  wireTimerControls(card);
}

function renderPenaltyScreen(card) {
  closeMenu();
  currentScreen = SCREENS.PENALTY;
  currentPenaltyCard = card;
  setupTimerForCard(card);

  app.innerHTML = `
    <section class="screen">
      <div class="topline">
        <span>Отказ засчитан</span>
        <span>${escapeHtml(card.activePlayer)}</span>
      </div>
      <article class="card-shell penalty" id="activeCard">
        <div>
          <div class="card-type">${escapeHtml(CARD_TYPE_LABELS[card.type] || card.type)}</div>
          <h1 class="card-title">${escapeHtml(card.title)}</h1>
        </div>
        <p class="card-text">${escapeHtml(card.resolvedText)}</p>
        ${card.timer ? renderTimerMarkup(card.timer) : ""}
      </article>
      <div class="button-row two">
        <button class="primary" id="completePenaltyButton" type="button">Штраф выполнен</button>
        <button class="secondary" id="nextPenaltyButton" type="button">Следующая карточка</button>
      </div>
    </section>
  `;

  document.getElementById("completePenaltyButton").addEventListener("click", completePenalty);
  document.getElementById("nextPenaltyButton").addEventListener("click", showNextCard);
  wireTimerControls(card);
}

function renderFinishedScreen() {
  closeMenu();
  pauseTimer();
  currentScreen = SCREENS.FINISHED;

  app.innerHTML = `
    <section class="screen">
      <div class="empty-state">
        <p class="card-type">Финиш базы</p>
        <h1>Карточки закончились</h1>
        <p class="subtitle">Вы прошли всю базу. Можно перемешать всё заново или сбросить историю.</p>
      </div>
      ${renderStatsList()}
      <div class="button-row">
        <button class="primary" id="reshuffleButton" type="button">Перемешать заново</button>
        <button class="secondary" id="resetHistoryButton" type="button">Сбросить историю</button>
        <button class="ghost" id="finishGameButton" type="button">Закончить игру</button>
      </div>
    </section>
  `;

  document.getElementById("reshuffleButton").addEventListener("click", () => {
    resetUsedCards();
    showNextCard();
  });
  document.getElementById("resetHistoryButton").addEventListener("click", () => {
    resetHistoryOnly();
    showNextCard();
  });
  document.getElementById("finishGameButton").addEventListener("click", renderStartScreen);
}

function renderMenu() {
  if (currentScreen !== SCREENS.MENU) {
    previousScreen = currentScreen;
  }

  pauseTimer();
  currentScreen = SCREENS.MENU;
  removeMenuOverlay();

  const overlay = document.createElement("div");
  overlay.className = "modal-backdrop";
  overlay.id = "menuOverlay";
  overlay.innerHTML = `
    <section class="menu-sheet" role="dialog" aria-modal="true" aria-labelledby="menuTitle">
      <h2 id="menuTitle">Меню</h2>
      ${renderStatsList()}
      ${menuConfirmReset ? `
        <div class="confirm-box">
          <p>Точно сбросить историю? Уже выпавшие карточки снова смогут появляться.</p>
          <div class="button-row two">
            <button class="danger" id="confirmResetButton" type="button">Да, сбросить</button>
            <button class="ghost" id="cancelResetButton" type="button">Отмена</button>
          </div>
        </div>
      ` : ""}
      <div class="menu-actions">
        <button class="primary" id="continueButton" type="button">Продолжить игру</button>
        <button class="secondary" id="menuResetButton" type="button">Сбросить историю карточек</button>
        <button class="secondary" id="choosePlayersButton" type="button">Выбрать игроков заново</button>
        <button class="ghost" id="homeButton" type="button">На главный экран</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);

  document.getElementById("continueButton").addEventListener("click", closeMenu);
  document.getElementById("menuResetButton").addEventListener("click", () => {
    menuConfirmReset = true;
    renderMenu();
  });
  document.getElementById("choosePlayersButton").addEventListener("click", renderPlayersScreen);
  document.getElementById("homeButton").addEventListener("click", renderStartScreen);

  const confirmButton = document.getElementById("confirmResetButton");
  const cancelButton = document.getElementById("cancelResetButton");

  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      resetHistoryOnly();
      menuConfirmReset = false;
      closeMenu();
      showNextCard();
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      menuConfirmReset = false;
      renderMenu();
    });
  }
}

function getSelectedPlayers() {
  return Array.isArray(state.selectedPlayers) ? state.selectedPlayers : [];
}

function saveSelectedPlayers(players) {
  state.selectedPlayers = [...players];
  saveGameState();
}

function getRandomPlayer() {
  const players = getSelectedPlayers();
  return pickRandom(players) || DEFAULT_PLAYERS[0];
}

function getRandomOtherPlayer(currentPlayer) {
  const players = getSelectedPlayers().filter((player) => player !== currentPlayer);
  return pickRandom(players) || currentPlayer;
}

function getRandomTwoPlayers(currentPlayer) {
  const first = getRandomOtherPlayer(currentPlayer);
  const secondPool = getSelectedPlayers().filter((player) => (
    player !== currentPlayer && player !== first
  ));
  const second = pickRandom(secondPool) || first;
  return [first, second];
}

function pickWeightedCardType() {
  const availableTypes = Object.keys(CARD_WEIGHTS).filter((type) => getAvailableCards(type).length > 0);

  if (!availableTypes.length) {
    return null;
  }

  const totalWeight = availableTypes.reduce((sum, type) => sum + CARD_WEIGHTS[type], 0);
  let roll = Math.random() * totalWeight;

  for (const type of availableTypes) {
    roll -= CARD_WEIGHTS[type];
    if (roll <= 0) {
      return type;
    }
  }

  return availableTypes[availableTypes.length - 1];
}

function getAvailableCards(type) {
  const used = getUsedCards();
  return (GAME_CARDS[type] || []).filter((card) => !used.includes(card.id));
}

function pickNextCard() {
  const weightedType = pickWeightedCardType();

  if (!weightedType) {
    return null;
  }

  let available = getAvailableCards(weightedType);

  if (!available.length) {
    const fallbackType = Object.keys(GAME_CARDS).find((type) => getAvailableCards(type).length > 0);
    available = fallbackType ? getAvailableCards(fallbackType) : [];
  }

  return pickRandom(available) || null;
}

function markCardAsUsed(card) {
  if (!state.usedCards.includes(card.id)) {
    state.usedCards.push(card.id);
  }

  incrementStats(card.type);
  saveGameState();
}

function getUsedCards() {
  return Array.isArray(state.usedCards) ? state.usedCards : [];
}

function resetUsedCards() {
  state.usedCards = [];
  saveGameState();
}

function showNextCard() {
  closeMenu();
  pauseTimer();

  if (getSelectedPlayers().length < 2) {
    renderPlayersScreen();
    return;
  }

  const rawCard = pickNextCard();

  if (!rawCard) {
    renderFinishedScreen();
    return;
  }

  const card = prepareCardForDisplay(rawCard);
  markCardAsUsed(card);
  renderGameScreen(card);
}

function completeCard() {
  showNextCard();
}

function showPenalty() {
  const activeCard = document.getElementById("activeCard");

  if (activeCard) {
    activeCard.classList.add("shake");
  }

  window.setTimeout(() => {
    const rawCard = pickPenaltyCard();
    const penaltyCard = prepareCardForDisplay(rawCard, currentCard ? currentCard.activePlayer : null);
    markPenaltyAsUsed(penaltyCard);
    renderPenaltyScreen(penaltyCard);
  }, activeCard ? 220 : 0);
}

function completePenalty() {
  showNextCard();
}

function startTimer(seconds) {
  if (!seconds) {
    return;
  }

  unlockAudioContext();

  if (timerRemaining <= 0) {
    timerInitial = seconds;
    timerRemaining = seconds;
    timerDone = false;
  }

  if (timerInterval) {
    return;
  }

  timerInterval = window.setInterval(() => {
    timerRemaining = Math.max(0, timerRemaining - 1);
    updateTimerView();

    if (timerRemaining <= 0) {
      finishTimer();
    }
  }, 1000);

  updateTimerView();
}

function pauseTimer() {
  if (timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }

  updateTimerView();
}

function resetTimer() {
  pauseTimer();
  timerRemaining = timerInitial;
  timerDone = false;
  updateTimerView();
}

function finishTimer() {
  pauseTimer();
  timerRemaining = 0;
  timerDone = true;
  updateTimerView();
  playTimerSound();
  vibrateOnTimerEnd();

  const activeCard = document.getElementById("activeCard");
  if (activeCard) {
    activeCard.classList.remove("timer-flash");
    void activeCard.offsetWidth;
    activeCard.classList.add("timer-flash");
  }
}

function playTimerSound() {
  try {
    const context = getAudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(330, context.currentTime + 0.18);
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.24, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.28);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
  } catch (error) {
    console.warn("Не удалось проиграть звуковой сигнал таймера", error);
  }
}

function vibrateOnTimerEnd() {
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
}

function saveGameState() {
  writeStorage(STORAGE_KEYS.usedCards, state.usedCards);
  writeStorage(STORAGE_KEYS.usedChaosCards, state.usedChaosCards);
  writeStorage(STORAGE_KEYS.selectedPlayers, state.selectedPlayers);
  writeStorage(STORAGE_KEYS.gameStats, state.gameStats);
}

function loadGameState() {
  state = {
    usedCards: readStorage(STORAGE_KEYS.usedCards, []),
    usedChaosCards: readStorage(STORAGE_KEYS.usedChaosCards, []),
    selectedPlayers: readStorage(STORAGE_KEYS.selectedPlayers, []),
    gameStats: {
      ...DEFAULT_STATS,
      ...readStorage(STORAGE_KEYS.gameStats, {})
    }
  };
}

function resetGameState() {
  state.usedCards = [];
  state.usedChaosCards = [];
  state.selectedPlayers = [];
  state.gameStats = { ...DEFAULT_STATS };
  saveGameState();
}

function validateCards() {
  const ids = new Set();
  const warnings = [];

  Object.entries(GAME_CARDS).forEach(([type, cards]) => {
    if (!Array.isArray(cards)) {
      warnings.push(`Тип ${type} должен быть массивом`);
      return;
    }

    cards.forEach((card, index) => {
      const label = `${type}[${index}]`;

      if (!card.id) {
        warnings.push(`${label}: нет id`);
      } else if (ids.has(card.id)) {
        warnings.push(`${label}: id ${card.id} повторяется`);
      } else {
        ids.add(card.id);
      }

      if (!card.type) {
        warnings.push(`${label}: нет type`);
      }

      if (card.type !== type) {
        warnings.push(`${label}: type не совпадает с массивом`);
      }

      if (!card.title) {
        warnings.push(`${label}: нет title`);
      }

      if (!card.text) {
        warnings.push(`${label}: нет text`);
      }

      if (card.timer !== null && typeof card.timer !== "number") {
        warnings.push(`${label}: timer должен быть null или числом`);
      }
    });
  });

  if (warnings.length) {
    console.warn("Проблемы в базе карточек:", warnings);
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .catch((error) => console.warn("Service worker не зарегистрирован", error));
    });
  }
}

function prepareCardForDisplay(card, preferredPlayer) {
  const activePlayer = preferredPlayer || getRandomPlayer();
  const [randomPlayer, randomPlayer2] = getRandomTwoPlayers(activePlayer);
  const resolvedText = card.text
    .replaceAll("{player}", activePlayer)
    .replaceAll("{randomPlayer}", randomPlayer)
    .replaceAll("{randomPlayer2}", randomPlayer2)
    .replaceAll("{allPlayers}", getSelectedPlayers().join(", "));

  return {
    ...card,
    activePlayer,
    resolvedText
  };
}

function pickPenaltyCard() {
  let available = GAME_CARDS.chaos.filter((card) => !state.usedChaosCards.includes(card.id));

  if (!available.length) {
    state.usedChaosCards = [];
    available = [...GAME_CARDS.chaos];
  }

  return pickRandom(available);
}

function markPenaltyAsUsed(card) {
  if (!state.usedChaosCards.includes(card.id)) {
    state.usedChaosCards.push(card.id);
  }

  incrementStats(card.type);
  saveGameState();
}

function incrementStats(type) {
  state.gameStats = {
    ...DEFAULT_STATS,
    ...state.gameStats
  };
  state.gameStats.totalShown += 1;

  if (Object.prototype.hasOwnProperty.call(state.gameStats, type)) {
    state.gameStats[type] += 1;
  }
}

function resetHistoryOnly() {
  state.usedCards = [];
  state.usedChaosCards = [];
  state.gameStats = { ...DEFAULT_STATS };
  saveGameState();
}

function getTotalMainCardsCount() {
  return Object.values(GAME_CARDS).reduce((sum, cards) => sum + cards.length, 0);
}

function getRemainingMainCardsCount() {
  return Math.max(0, getTotalMainCardsCount() - state.usedCards.length);
}

function setupTimerForCard(card) {
  pauseTimer();
  timerInitial = card.timer || 0;
  timerRemaining = timerInitial;
  timerDone = false;
}

function renderTimerMarkup(seconds) {
  return `
    <section class="timer-panel" aria-label="Таймер">
      <div class="timer-display">
        <span class="meta">Таймер</span>
        <strong id="timerValue">${seconds}</strong>
      </div>
      <div class="timer-message" id="timerMessage">Готов к старту</div>
      <div class="timer-actions">
        <button class="primary" id="timerStartButton" type="button">Старт</button>
        <button class="secondary" id="timerPauseButton" type="button">Пауза</button>
        <button class="ghost" id="timerResetButton" type="button">Сброс</button>
      </div>
    </section>
  `;
}

function wireTimerControls(card) {
  if (!card.timer) {
    return;
  }

  document.getElementById("timerStartButton").addEventListener("click", () => startTimer(card.timer));
  document.getElementById("timerPauseButton").addEventListener("click", pauseTimer);
  document.getElementById("timerResetButton").addEventListener("click", resetTimer);
  updateTimerView();
}

function updateTimerView() {
  const timerValue = document.getElementById("timerValue");
  const timerMessage = document.getElementById("timerMessage");

  if (!timerValue || !timerMessage) {
    return;
  }

  timerValue.textContent = String(timerRemaining);

  if (timerDone) {
    timerMessage.textContent = "Время вышло";
  } else if (timerInterval) {
    timerMessage.textContent = "Идёт отсчёт";
  } else if (timerRemaining !== timerInitial) {
    timerMessage.textContent = "Пауза";
  } else {
    timerMessage.textContent = "Готов к старту";
  }
}

function renderStatsList() {
  const stats = {
    ...DEFAULT_STATS,
    ...state.gameStats
  };

  return `
    <ul class="stats-list">
      <li><span>Показано всего</span><strong>${stats.totalShown}</strong></li>
      <li><span>Действие</span><strong>${stats.action}</strong></li>
      <li><span>Правда</span><strong>${stats.truth}</strong></li>
      <li><span>Я никогда не</span><strong>${stats.never}</strong></li>
      <li><span>Мини-игры</span><strong>${stats.mini_game}</strong></li>
      <li><span>Штрафы</span><strong>${stats.chaos}</strong></li>
    </ul>
  `;
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Не удалось прочитать ${key} из localStorage`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Не удалось сохранить ${key} в localStorage`, error);
  }
}

function pickRandom(items) {
  if (!items.length) {
    return null;
  }

  return items[Math.floor(Math.random() * items.length)];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

function unlockAudioContext() {
  try {
    const context = getAudioContext();

    if (context.state === "suspended") {
      context.resume();
    }
  } catch (error) {
    console.warn("Не удалось подготовить звук таймера", error);
  }
}

function closeMenu() {
  removeMenuOverlay();

  if (currentScreen === SCREENS.MENU) {
    currentScreen = previousScreen;
  }
}

function removeMenuOverlay() {
  const overlay = document.getElementById("menuOverlay");

  if (overlay) {
    overlay.remove();
  }
}

document.addEventListener("DOMContentLoaded", initApp);
