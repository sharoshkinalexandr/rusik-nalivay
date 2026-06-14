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
  customPlayers: "customPlayers",
  gameStats: "gameStats",
  storageVersion: "storageVersion"
};

const STORAGE_VERSION = "rusik-final-cards-v1";
const PLAYER_CASES = ["nom", "gen", "dat", "acc", "inst", "prep"];
const EXPECTED_CARD_COUNTS = {
  action: 150,
  truth: 60,
  never: 40,
  mini_game: 35,
  chaos: 15
};
const TIMER_SOUND_FILE = "./sounds/timer-end.mp3";
const TIMER_END_VIBRATION = [300, 150, 300, 150, 500];
const TIMER_FALLBACK_TONES = [
  { start: 0, duration: 0.24, frequency: 760 },
  { start: 0.7, duration: 0.24, frequency: 760 },
  { start: 1.4, duration: 0.24, frequency: 760 },
  { start: 2.15, duration: 1.25, frequency: 460 }
];

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
let timerEndAudio = null;
let timerEndAudioReady = false;
let timerEndAudioFailed = false;

function initApp() {
  loadGameState();
  refreshPlayers(false);
  validateCards();
  setupAudioUnlock();
  setupTimerAudioFile();
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

  refreshPlayers(false);
  const savedPlayers = new Set(getSelectedPlayers());
  const playerItems = getAllPlayers().map((player) => `
    <div class="player-option">
      <label class="player-check">
        <input type="checkbox" name="player" value="${escapeHtml(player.id)}" ${savedPlayers.has(player.id) ? "checked" : ""}>
        <span>${escapeHtml(player.nom)}</span>
      </label>
      ${player.isCustom ? `
        <button class="remove-player-button" type="button" data-player-id="${escapeHtml(player.id)}">Удалить</button>
      ` : ""}
    </div>
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
      <div class="custom-player-box">
        <h3>Добавить игрока</h3>
        <input id="custom-player-name" type="text" placeholder="Имя игрока" autocomplete="off">
        <select id="custom-player-gender" aria-label="Пол игрока">
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        <button id="add-custom-player-button" class="secondary" type="button">Добавить</button>
        <p id="custom-player-message" class="custom-player-message"></p>
        <button id="reset-custom-players-button" class="ghost" type="button">Сбросить добавленных игроков</button>
      </div>
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
  const customNameInput = document.getElementById("custom-player-name");

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
  document.getElementById("add-custom-player-button").addEventListener("click", addCustomPlayer);
  document.getElementById("reset-custom-players-button").addEventListener("click", resetCustomPlayers);
  document.querySelectorAll(".remove-player-button").forEach((button) => {
    button.addEventListener("click", () => removeCustomPlayer(button.dataset.playerId));
  });
  customNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomPlayer();
    }
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
  const selected = Array.isArray(state.selectedPlayers) ? state.selectedPlayers : [];
  const existingIds = new Set(getAllPlayers().map((player) => player.id));
  return selected.filter((playerId) => existingIds.has(playerId));
}

function saveSelectedPlayers(players) {
  state.selectedPlayers = normalizeSelectedPlayers(players);
  saveGameState();
}

function getCustomPlayers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.customPlayers);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((player) => player && player.isCustom && player.id && player.nom)
      : [];
  } catch (error) {
    console.warn("Failed to load custom players:", error);
    return [];
  }
}

function saveCustomPlayers(players) {
  try {
    localStorage.setItem(STORAGE_KEYS.customPlayers, JSON.stringify(players));
  } catch (error) {
    console.warn("Failed to save custom players:", error);
  }
}

function getAllPlayers() {
  return [...DEFAULT_PLAYERS, ...getCustomPlayers()];
}

function refreshPlayers(shouldRender = true) {
  PLAYERS = getAllPlayers();
  window.PLAYERS = PLAYERS;

  const existingIds = new Set(PLAYERS.map((player) => player.id));
  state.selectedPlayers = normalizeSelectedPlayers(state.selectedPlayers)
    .filter((playerId) => existingIds.has(playerId));
  saveGameState();

  if (shouldRender && currentScreen === SCREENS.PLAYERS) {
    renderPlayersScreen();
  }
}

function normalizeSelectedPlayers(players) {
  if (!Array.isArray(players)) {
    return [];
  }

  const allPlayers = getAllPlayers();
  const byId = new Map(allPlayers.map((player) => [player.id, player.id]));
  const byName = new Map(allPlayers.map((player) => [player.nom.toLowerCase(), player.id]));

  return players
    .map((value) => {
      const rawValue = String(value || "").trim();
      return byId.get(rawValue) || byName.get(rawValue.toLowerCase()) || null;
    })
    .filter(Boolean);
}

function getSelectedPlayerObjects() {
  const playerMap = new Map(getAllPlayers().map((player) => [player.id, player]));
  return getSelectedPlayers()
    .map((playerId) => playerMap.get(playerId))
    .filter(Boolean);
}

function getPlayerByReference(playerReference) {
  if (playerReference && typeof playerReference === "object") {
    return playerReference;
  }

  const value = String(playerReference || "").trim();
  if (!value) {
    return null;
  }

  return getAllPlayers().find((player) => (
    player.id === value || player.nom.toLowerCase() === value.toLowerCase()
  )) || null;
}

function getRandomPlayer() {
  const players = getSelectedPlayerObjects();
  return pickRandom(players) || DEFAULT_PLAYERS[0];
}

function getRandomOtherPlayer(currentPlayer) {
  const current = getPlayerByReference(currentPlayer);
  const players = getSelectedPlayerObjects().filter((player) => player.id !== (current && current.id));
  return pickRandom(players) || current || DEFAULT_PLAYERS[0];
}

function getRandomTwoPlayers(currentPlayer) {
  const current = getPlayerByReference(currentPlayer);
  const first = getRandomOtherPlayer(current);
  const secondPool = getSelectedPlayerObjects().filter((player) => (
    player.id !== (current && current.id) && player.id !== first.id
  ));
  const second = pickRandom(secondPool) || first;
  return [first, second];
}

function createPlayerFromName(name, gender) {
  const cleanName = String(name || "").trim();

  const player = {
    id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    gender,
    nom: cleanName,
    gen: cleanName,
    dat: cleanName,
    acc: cleanName,
    inst: cleanName,
    prep: cleanName,
    isCustom: true
  };

  const lower = cleanName.toLowerCase();
  const last = lower.slice(-1);
  const base = cleanName.slice(0, -1);
  const beforeLast = lower.slice(-2, -1);
  const softLetters = ["г", "к", "х", "ж", "ч", "ш", "щ"];

  if (last === "а") {
    const genEnding = softLetters.includes(beforeLast) ? "и" : "ы";

    player.gen = base + genEnding;
    player.dat = base + "е";
    player.acc = base + "у";
    player.inst = base + "ой";
    player.prep = base + "е";
  } else if (last === "я") {
    player.gen = base + "и";
    player.dat = base + "е";
    player.acc = base + "ю";
    player.inst = base + "ей";
    player.prep = base + "е";
  } else if (gender === "male" && last === "й") {
    player.gen = base + "я";
    player.dat = base + "ю";
    player.acc = base + "я";
    player.inst = base + "ем";
    player.prep = base + "е";
  } else if (gender === "male" && /[бвгджзклмнпрстфхцчшщ]$/.test(lower)) {
    player.gen = cleanName + "а";
    player.dat = cleanName + "у";
    player.acc = cleanName + "а";
    player.inst = cleanName + "ом";
    player.prep = cleanName + "е";
  }

  return player;
}

function addCustomPlayer() {
  const input = document.querySelector("#custom-player-name");
  const genderSelect = document.querySelector("#custom-player-gender");
  const message = document.querySelector("#custom-player-message");

  const name = input.value.trim();
  const gender = genderSelect.value;

  if (!name) {
    message.textContent = "Введите имя игрока";
    return;
  }

  const allPlayers = getAllPlayers();
  const exists = allPlayers.some((player) => player.nom.toLowerCase() === name.toLowerCase());

  if (exists) {
    message.textContent = "Такой игрок уже есть";
    return;
  }

  const customPlayers = getCustomPlayers();
  const newPlayer = createPlayerFromName(name, gender);

  customPlayers.push(newPlayer);
  saveCustomPlayers(customPlayers);
  refreshPlayers();

  const refreshedMessage = document.querySelector("#custom-player-message");
  if (refreshedMessage) {
    refreshedMessage.textContent = "Игрок добавлен";
  }
}

function removeCustomPlayer(playerId) {
  const customPlayers = getCustomPlayers().filter((player) => player.id !== playerId);
  saveCustomPlayers(customPlayers);

  state.selectedPlayers = getSelectedPlayers().filter((id) => id !== playerId);
  saveGameState();
  refreshPlayers();
}

function resetCustomPlayers() {
  saveCustomPlayers([]);

  const defaultIds = new Set(DEFAULT_PLAYERS.map((player) => player.id));
  state.selectedPlayers = getSelectedPlayers().filter((id) => defaultIds.has(id));
  saveGameState();
  refreshPlayers();
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

    if (!rawCard) {
      const fallbackPenalty = {
        id: "chaos_empty",
        type: "chaos",
        title: CARD_TYPE_LABELS.chaos,
        timer: null,
        text: "Штрафные карточки пока не добавлены. Продолжайте игру обычной следующей карточкой."
      };
      const emptyPenaltyCard = prepareCardForDisplay(
        fallbackPenalty,
        currentCard ? currentCard.activePlayerId || currentCard.activePlayer : null
      );
      renderPenaltyScreen(emptyPenaltyCard);
      return;
    }

    const penaltyCard = prepareCardForDisplay(rawCard, currentCard ? currentCard.activePlayerId || currentCard.activePlayer : null);
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
  if (timerEndAudio && timerEndAudioReady && !timerEndAudioFailed) {
    timerEndAudio.currentTime = 0;
    const playPromise = timerEndAudio.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => playTimerFallbackSound());
    }
    return;
  }

  playTimerFallbackSound();
}

function playTimerFallbackSound() {
  try {
    const context = getAudioContext();

    TIMER_FALLBACK_TONES.forEach((tone, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startsAt = context.currentTime + tone.start;
      const endsAt = startsAt + tone.duration;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(tone.frequency, startsAt);

      if (index === TIMER_FALLBACK_TONES.length - 1) {
        oscillator.frequency.exponentialRampToValueAtTime(230, endsAt);
      }

      gain.gain.setValueAtTime(0.001, startsAt);
      gain.gain.exponentialRampToValueAtTime(0.24, startsAt + 0.04);
      gain.gain.setValueAtTime(0.24, Math.max(startsAt + 0.05, endsAt - 0.08));
      gain.gain.exponentialRampToValueAtTime(0.001, endsAt);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startsAt);
      oscillator.stop(endsAt);
    });
  } catch (error) {
    console.warn("Timer fallback sound failed", error);
  }
}

function vibrateOnTimerEnd() {
  if ("vibrate" in navigator) {
    navigator.vibrate(TIMER_END_VIBRATION);
  }
}

function saveGameState() {
  writeStorage(STORAGE_KEYS.usedCards, state.usedCards);
  writeStorage(STORAGE_KEYS.usedChaosCards, state.usedChaosCards);
  writeStorage(STORAGE_KEYS.selectedPlayers, state.selectedPlayers);
  writeStorage(STORAGE_KEYS.gameStats, state.gameStats);
  writeStorage(STORAGE_KEYS.storageVersion, STORAGE_VERSION);
}

function loadGameState() {
  const selectedPlayers = normalizeSelectedPlayers(readStorage(STORAGE_KEYS.selectedPlayers, []));
  const storedVersion = readStorage(STORAGE_KEYS.storageVersion, null);

  if (storedVersion !== STORAGE_VERSION) {
    state = {
      usedCards: [],
      usedChaosCards: [],
      selectedPlayers,
      gameStats: { ...DEFAULT_STATS }
    };
    saveGameState();
    return;
  }

  state = {
    usedCards: readStorage(STORAGE_KEYS.usedCards, []),
    usedChaosCards: readStorage(STORAGE_KEYS.usedChaosCards, []),
    selectedPlayers,
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
  const textOwners = new Map();
  const warnings = [];
  const allowedTypes = Object.keys(EXPECTED_CARD_COUNTS);
  const totalCount = Object.values(GAME_CARDS).reduce((sum, cards) => (
    sum + (Array.isArray(cards) ? cards.length : 0)
  ), 0);
  const expectedTotal = Object.values(EXPECTED_CARD_COUNTS).reduce((sum, count) => sum + count, 0);

  if (totalCount !== expectedTotal) {
    warnings.push(`Total cards: expected ${expectedTotal}, got ${totalCount}`);
  }

  Object.entries(EXPECTED_CARD_COUNTS).forEach(([type, expectedCount]) => {
    const cards = GAME_CARDS[type];
    const actualCount = Array.isArray(cards) ? cards.length : 0;

    if (actualCount !== expectedCount) {
      warnings.push(`${type}: expected ${expectedCount}, got ${actualCount}`);
    }
  });

  Object.entries(GAME_CARDS).forEach(([type, cards]) => {
    if (!Array.isArray(cards)) {
      warnings.push(`Тип ${type} должен быть массивом`);
      return;
    }

    cards.forEach((card, index) => {
      const label = `${type}[${index}]`;
      const requiredFields = ["id", "type", "title", "timer", "text"];

      if (!card || typeof card !== "object") {
        warnings.push(`${label}: card must be an object`);
        return;
      }

      requiredFields.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(card, field)) {
          warnings.push(`${label}: missing ${field}`);
        }
      });

      if (!card.id) {
        warnings.push(`${label}: нет id`);
      } else if (typeof card.id !== "string") {
        warnings.push(`${label}: id must be a string`);
      } else if (ids.has(card.id)) {
        warnings.push(`${label}: id ${card.id} повторяется`);
      } else {
        ids.add(card.id);
      }

      if (!card.type) {
        warnings.push(`${label}: нет type`);
      }

      if (card.type && (typeof card.type !== "string" || !allowedTypes.includes(card.type))) {
        warnings.push(`${label}: invalid type ${card.type}`);
      }

      if (card.type !== type) {
        warnings.push(`${label}: type не совпадает с массивом`);
      }

      if (!card.title) {
        warnings.push(`${label}: нет title`);
      }

      if (card.title && typeof card.title !== "string") {
        warnings.push(`${label}: title must be a string`);
      }

      if (!card.text) {
        warnings.push(`${label}: нет text`);
      }

      if (card.text && typeof card.text !== "string") {
        warnings.push(`${label}: text must be a string`);
      } else if (typeof card.text === "string") {
        const normalizedText = card.text.trim();

        if (!normalizedText) {
          warnings.push(`${label}: text is empty`);
        } else if (textOwners.has(normalizedText)) {
          warnings.push(`${label}: duplicate text with ${textOwners.get(normalizedText)}`);
        } else {
          textOwners.set(normalizedText, card.id || label);
        }
      }

      if (card.timer !== null && (typeof card.timer !== "number" || !Number.isFinite(card.timer))) {
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
      navigator.serviceWorker
        .register("./service-worker.js")
        .catch((error) => {
          console.warn("Service worker registration failed:", error);
        });
    });
  } else {
    console.warn("Service worker is not supported in this browser.");
  }
}

function prepareCardForDisplay(card, preferredPlayer) {
  const activePlayer = getPlayerByReference(preferredPlayer) || getRandomPlayer();
  const [randomPlayer, randomPlayer2] = getRandomTwoPlayers(activePlayer);
  const resolvedText = resolveCardTemplate(card.text, {
    player: getPlayerForms(activePlayer),
    randomPlayer: getPlayerForms(randomPlayer),
    randomPlayer2: getPlayerForms(randomPlayer2)
  });

  return {
    ...card,
    activePlayer: activePlayer.nom,
    activePlayerId: activePlayer.id,
    resolvedText
  };
}

function pickPenaltyCard() {
  const chaosCards = GAME_CARDS.chaos || [];

  if (!chaosCards.length) {
    return null;
  }

  let available = chaosCards.filter((card) => !state.usedChaosCards.includes(card.id));

  if (!available.length) {
    state.usedChaosCards = [];
    available = [...chaosCards];
  }

  return pickRandom(available);
}

function resolveCardTemplate(text, players) {
  let resolved = String(text || "");

  Object.entries(players).forEach(([token, forms]) => {
    PLAYER_CASES.forEach((caseName) => {
      resolved = resolved.replaceAll(`{${token}.${caseName}}`, forms[caseName]);
    });
    resolved = resolved.replaceAll(`{${token}}`, forms.nom);
  });

  return resolved.replaceAll(
    "{allPlayers}",
    getSelectedPlayerObjects().map((player) => player.nom).join(", ")
  );
}

function getPlayerForms(playerReference) {
  const player = getPlayerByReference(playerReference);
  const name = player ? player.nom : String(playerReference || "");
  const fallback = {
    nom: name,
    gen: name,
    dat: name,
    acc: name,
    inst: name,
    prep: name
  };

  if (player) {
    return {
      ...fallback,
      ...Object.fromEntries(PLAYER_CASES.map((caseName) => [caseName, player[caseName] || name]))
    };
  }

  const formsMap = typeof PLAYER_FORMS === "object" ? PLAYER_FORMS : {};

  return {
    ...fallback,
    ...(formsMap[name] || {})
  };
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

function setupTimerAudioFile() {
  if (typeof Audio !== "function") {
    return;
  }

  timerEndAudio = new Audio(TIMER_SOUND_FILE);
  timerEndAudio.preload = "auto";
  timerEndAudio.addEventListener("canplaythrough", () => {
    timerEndAudioReady = true;
    timerEndAudioFailed = false;
  }, { once: true });
  timerEndAudio.addEventListener("error", () => {
    timerEndAudioReady = false;
    timerEndAudioFailed = true;
  }, { once: true });
  timerEndAudio.load();
}

function setupAudioUnlock() {
  if (typeof window.addEventListener !== "function") {
    return;
  }

  const unlock = () => unlockAudioContext();
  window.addEventListener("pointerdown", unlock, { once: true, passive: true });
  window.addEventListener("keydown", unlock, { once: true });
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error("Web Audio API is not supported");
    }
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
