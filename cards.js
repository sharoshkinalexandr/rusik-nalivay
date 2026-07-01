const DEFAULT_PLAYERS = [
  {
    id: "rusik",
    gender: "male",
    nom: "Русик",
    gen: "Русика",
    dat: "Русику",
    acc: "Русика",
    inst: "Русиком",
    prep: "Русике"
  },
  {
    id: "inna",
    gender: "female",
    nom: "Инна",
    gen: "Инны",
    dat: "Инне",
    acc: "Инну",
    inst: "Инной",
    prep: "Инне"
  },
  {
    id: "lera",
    gender: "female",
    nom: "Лера",
    gen: "Леры",
    dat: "Лере",
    acc: "Леру",
    inst: "Лерой",
    prep: "Лере"
  },
  {
    id: "sasha",
    gender: "male",
    nom: "Саша",
    gen: "Саши",
    dat: "Саше",
    acc: "Сашу",
    inst: "Сашей",
    prep: "Саше"
  },
  {
    id: "vova",
    gender: "male",
    nom: "Вова",
    gen: "Вовы",
    dat: "Вове",
    acc: "Вову",
    inst: "Вовой",
    prep: "Вове"
  },
  {
    id: "yulya",
    gender: "female",
    nom: "Юля",
    gen: "Юли",
    dat: "Юле",
    acc: "Юлю",
    inst: "Юлей",
    prep: "Юле"
  },
  {
    id: "den",
    gender: "male",
    nom: "Дэн",
    gen: "Дэна",
    dat: "Дэну",
    acc: "Дэна",
    inst: "Дэном",
    prep: "Дэне"
  },
  {
    id: "olya",
    gender: "female",
    nom: "Оля",
    gen: "Оли",
    dat: "Оле",
    acc: "Олю",
    inst: "Олей",
    prep: "Оле"
  }
];

const PLAYER_FORMS = Object.fromEntries(
  DEFAULT_PLAYERS.map((player) => [player.nom, {
    nom: player.nom,
    gen: player.gen,
    dat: player.dat,
    acc: player.acc,
    inst: player.inst,
    prep: player.prep
  }])
);

let PLAYERS = [...DEFAULT_PLAYERS];

const CARD_WEIGHTS = {
  action: 60,
  truth: 15,
  never: 7,
  mini_game: 15,
  chaos: 3
};

const CARD_TYPE_LABELS = {
  action: "Действие",
  truth: "Правда",
  never: "Я никогда не",
  mini_game: "Мини-игра",
  chaos: "Штраф / хаос"
};

const GAME_CARDS = {
  action: [],
  truth: [],
  never: [],
  mini_game: [],
  chaos: []
};


const ACTION_CARDS_001_050 = [
  {
    id: "action_001",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в губы минимум 5 секунд. Быстрый чмок не считается. Отказ — штраф."
  },
  {
    id: "action_002",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь рядом и держи руку на бедре {randomPlayer.gen} поверх одежды 30 секунд. Если убрал руку раньше — штраф."
  },
  {
    id: "action_003",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь между ног {randomPlayer.gen}. Сидишь так до следующей карточки. Если отодвинулся раньше — штраф."
  },
  {
    id: "action_004",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, сними один заметный предмет одежды или аксессуар. Отдай {randomPlayer.dat}. {randomPlayer.nom} надевает это поверх своей одежды до следующего круга."
  },
  {
    id: "action_005",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Шепчи {randomPlayer.dat} на ухо 30 секунд. Тема: что ты сделал бы с ним в этой игре, если бы никто не смотрел. Слишком скучно — штраф."
  },
  {
    id: "action_006",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} кладёт руку тебе на талию. Ты кладёшь руку ему на шею. Сидите так до следующей карточки."
  },
  {
    id: "action_007",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд смотри {randomPlayer.dat} в глаза с расстояния не больше ладони. Нельзя смеяться и отворачиваться. Кто сорвался — штраф."
  },
  {
    id: "action_008",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в шею. Один нормальный поцелуй, не касание на полсекунды. Отказ — штраф."
  },
  {
    id: "action_009",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд танцуй с {randomPlayer.inst} вплотную. Между вами не должно быть расстояния. Если танец выглядит как шутка — штраф."
  },
  {
    id: "action_010",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Расстегни на себе одну пуговицу, молнию или ремень. Потом {randomPlayer.nom} делает то же самое на себе."
  },
  {
    id: "action_011",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд медленно проводи пальцами по ладони {randomPlayer.gen}. Нельзя смеяться и торопиться. Если сделал на отвали — штраф."
  },
  {
    id: "action_012",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} на колени боком. {randomPlayer.nom} держит тебя за талию до следующей карточки."
  },
  {
    id: "action_013",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Завяжи себе глаза. {randomPlayer.nom} касается твоей руки, лица или шеи. У тебя 30 секунд угадать, куда именно он прикоснулся."
  },
  {
    id: "action_014",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat} прямо: “Я бы тебя сейчас поцеловал”. После фразы либо целуешь, либо пьёшь штраф."
  },
  {
    id: "action_015",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи лицо рядом с шеей {randomPlayer.gen}. Можно дышать рядом или поцеловать. Нельзя отходить."
  },
  {
    id: "action_016",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Проведи рукой по спине {randomPlayer.gen} поверх одежды сверху вниз. Потом {randomPlayer.nom} делает то же самое с тобой."
  },
  {
    id: "action_017",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, компания выбирает один предмет на тебе: кофта, ремень, носок, браслет, резинка, рубашка или аксессуар. Сними его до следующего круга или получи штраф."
  },
  {
    id: "action_018",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд сидите лицом друг к другу. Руки держите на талии друг друга. Если кто-то убрал руки — штраф."
  },
  {
    id: "action_019",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй руку {randomPlayer.gen}: пальцы, ладонь или запястье. Делай медленно. Быстрое касание не считается."
  },
  {
    id: "action_020",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Ляг головой на колени {randomPlayer.gen}. {randomPlayer.nom} кладёт руку тебе на волосы или шею до следующей карточки."
  },
  {
    id: "action_021",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд говори {randomPlayer.dat} комплименты только про внешность и тело. Нельзя говорить про характер, доброту и ум."
  },
  {
    id: "action_022",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми руку {randomPlayer.gen} и положи себе на шею. Держите так до следующей карточки."
  },
  {
    id: "action_023",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд показывай без слов, как бы ты звал {randomPlayer.acc} к себе. Используй взгляд, руку и движение корпуса. Смеяться нельзя."
  },
  {
    id: "action_024",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает, куда тебе положить руку: его колено, бедро, талию, плечо или шею. Держи руку до следующей карточки."
  },
  {
    id: "action_025",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи, какой предмет одежды на {randomPlayer.prep} сейчас лишний. {randomPlayer.nom} либо снимает его, либо вы оба пьёте штраф."
  },
  {
    id: "action_026",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы сидите очень близко. Каждый 10 секунд меняйте место рук: плечо, талия, колено, бедро. Кто забыл сменить — штраф."
  },
  {
    id: "action_027",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя носок и надень его {randomPlayer.dat} на руку. Этой рукой {randomPlayer.nom} держит тебя за колено до следующей карточки."
  },
  {
    id: "action_028",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд массируй плечи {randomPlayer.gen}. Не как врач, а как человек, который специально делает это слишком приятно. Слабо — штраф."
  },
  {
    id: "action_029",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Встань за спиной {randomPlayer.gen} и обними за талию. Стоите так до следующей карточки. Руки убирать нельзя."
  },
  {
    id: "action_030",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Попроси {randomPlayer.acc} снять с тебя один аксессуар или предмет одежды. Потом ты снимаешь с {randomPlayer.gen} один аксессуар или предмет одежды."
  },
  {
    id: "action_031",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи {randomPlayer.acc} за подбородок и смотри в глаза. Нельзя отпускать и превращать в шутку."
  },
  {
    id: "action_032",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} туда, куда выберет компания: губы, шея, щека, рука или плечо. Отказ — штраф."
  },
  {
    id: "action_033",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд говори {randomPlayer.dat} на ухо только команды. Например: сядь ближе, не смейся, смотри на меня. {randomPlayer.nom} должен выполнять."
  },
  {
    id: "action_034",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядьте так, чтобы ваши ноги касались друг друга. Держите контакт ногами до следующей карточки. Кто отодвинулся — штраф."
  },
  {
    id: "action_035",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми любой холодный предмет и проведи им по запястью или шее {randomPlayer.gen}. Потом {randomPlayer.nom} делает то же самое с тобой."
  },
  {
    id: "action_036",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы не можете говорить. Можно только смотреть, касаться рук и приближаться. Если кто-то сказал слово — штраф."
  },
  {
    id: "action_037",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, какую часть его внешности ты замечаешь первой. После ответа поцелуй это место, если оно выше плеч. Если нет — целуй руку."
  },
  {
    id: "action_038",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает тебе позу: сидеть у него между ног, на коленях, рядом вплотную или спиной к нему. Поза держится до следующей карточки."
  },
  {
    id: "action_039",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд один из вас держит второго за талию, второй держит первого за шею. Каждые 15 секунд меняйтесь ролями."
  },
  {
    id: "action_040",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними один предмет одежды или аксессуар и завяжи им {randomPlayer.dat} глаза на одну карточку. Если предмет не подходит — компания выбирает другой."
  },
  {
    id: "action_041",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд держи руку на щеке {randomPlayer.gen}. {randomPlayer.nom} должен держать твою руку своей рукой. Кто отпустил — штраф."
  },
  {
    id: "action_042",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи вслух: “Я выбираю тебя для плохого решения”. После этого поцелуй {randomPlayer.acc} в щёку, губы или шею. Место выбирает компания."
  },
  {
    id: "action_043",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен повторять каждое движение {randomPlayer.gen}: взгляд, руки, наклон, поза. {randomPlayer.nom} специально делает движения провокационными."
  },
  {
    id: "action_044",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поменяйтесь одним заметным предметом одежды или аксессуаром до следующего круга. Мелочь вроде кольца не считается."
  },
  {
    id: "action_045",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд медленно проводи пальцем по линии от запястья {randomPlayer.gen} до локтя. Если быстро — повторяешь или пьёшь."
  },
  {
    id: "action_046",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} садится рядом. Ты кладёшь голову ему на плечо, он кладёт руку тебе на бедро или колено. До следующей карточки."
  },
  {
    id: "action_047",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд говори {randomPlayer.dat}, что именно в нём может свести с ума. Нельзя отвечать общими словами. Нужна конкретика."
  },
  {
    id: "action_048",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один вариант: поцелуй в губы, рука на бедре, сесть на колени или снять предмет одежды. Выполняешь выбранное или пьёшь двойной штраф."
  },
  {
    id: "action_049",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 60 секунд вы пара. Все обращения друг к другу только: “мой соблазн” и “моя ошибка”. Забыл обращение — штраф."
  },
  {
    id: "action_050",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поставь {randomPlayer.acc} перед собой, возьми за талию и скажи одну фразу, после которой стало бы понятно, что ты флиртуешь. Слабая фраза — штраф."
  }
];

if (typeof GAME_CARDS !== "undefined" && Array.isArray(GAME_CARDS.action)) {
  const existingIds = new Set(GAME_CARDS.action.map((card) => card.id));
  ACTION_CARDS_001_050.forEach((card) => {
    if (!existingIds.has(card.id)) {
      GAME_CARDS.action.push(card);
    }
  });
}


const ACTION_CARDS_051_100 = [
  {
    id: "action_051",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми {randomPlayer.acc} за руку и 30 секунд веди его пальцами по своей шее или ключице. Всё поверх одежды. Если делаешь быстро — штраф."
  },
  {
    id: "action_052",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен выбрать тебе место рядом с собой: вплотную справа, вплотную слева, на колени или между ног. Ты сидишь там до следующей карточки."
  },
  {
    id: "action_053",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи ладонь на груди {randomPlayer.gen} поверх одежды. Не двигай рукой. Если кто-то убрал контакт — штраф."
  },
  {
    id: "action_054",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет, который видно всем. {randomPlayer.nom} решает, где тебе его носить до следующего круга: на шее, руке, голове или талии."
  },
  {
    id: "action_055",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд задавай {randomPlayer.dat} короткие команды: “сядь ближе”, “смотри на меня”, “не улыбайся”, “держи руку здесь”. {randomPlayer.nom} выполняет без споров."
  },
  {
    id: "action_056",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в запястье, потом в плечо. Два отдельных поцелуя. Быстрое касание губами не считается."
  },
  {
    id: "action_057",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд сидите спина к груди: один сзади, второй впереди. Задний держит руки на талии переднего. Через 20 секунд поменяйтесь местами."
  },
  {
    id: "action_058",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Назови одну часть внешности {randomPlayer.gen}, которая тебя реально цепляет. Потом коснись этого места рукой, если оно выше пояса. Если ниже — коснись руки."
  },
  {
    id: "action_059",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} закрывает глаза. Ты 30 секунд говоришь ему на ухо три фразы, от которых должно стать неловко. Слишком мягко — штраф."
  },
  {
    id: "action_060",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми предмет одежды или аксессуар {randomPlayer.gen} и надень на себя поверх своей одежды. Носишь до следующего круга."
  },
  {
    id: "action_061",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд держи лицо в пяти сантиметрах от лица {randomPlayer.gen}. Нельзя целоваться, смеяться и отходить. Кто сорвался — штраф."
  },
  {
    id: "action_062",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает одно действие: поцелуй в руку, рука на талии, сесть вплотную или обменяться одеждой. Выполняешь сразу или пьёшь двойной штраф."
  },
  {
    id: "action_063",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд {randomPlayer.nom} держит твою руку у себя на талии. Ты не убираешь руку и не смеёшься. Убрал — штраф."
  },
  {
    id: "action_064",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Встань перед {randomPlayer.inst} на расстоянии шага. Медленно подойди вплотную и остановись. {randomPlayer.nom} решает: поцелуй в щёку или штраф."
  },
  {
    id: "action_065",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд вы играете “зеркало”: {randomPlayer.nom} делает движения руками, корпусом и взглядом, а ты повторяешь. Движения должны быть взрослые, не смешные."
  },
  {
    id: "action_066",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает один предмет на тебе, который нужно снять или расстегнуть. Если предмет слишком жёсткий — компания выбирает замену."
  },
  {
    id: "action_067",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи руку {randomPlayer.gen} двумя руками и смотри только на него. В конце скажи: “Я бы не отпустил”."
  },
  {
    id: "action_068",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в место, которое выберет сам {randomPlayer.nom}: рука, шея, щека, плечо или губы. Отказ — штраф."
  },
  {
    id: "action_069",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен сидеть на полу у ног {randomPlayer.gen}. {randomPlayer.nom} кладёт руку тебе на голову, плечо или шею."
  },
  {
    id: "action_070",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}: “Выбери, что мне снять”. {randomPlayer.nom} выбирает аксессуар или предмет одежды. Ты снимаешь его до следующего круга."
  },
  {
    id: "action_071",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд держи руку на пояснице {randomPlayer.gen}. {randomPlayer.nom} в это время держит руку на твоём плече или шее."
  },
  {
    id: "action_072",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Положи ладонь {randomPlayer.gen} себе на грудь поверх одежды и скажи: “Слушай, как спокойно я вру”. Держать 10 секунд."
  },
  {
    id: "action_073",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 60 секунд вы сидите как пара: руки держите друг на друге, разговариваете только тихо и обращаетесь друг к другу “мой риск” и “моя проблема”. Забыл обращение — штраф."
  },
  {
    id: "action_074",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один предмет одежды на {randomPlayer.prep}. Ты должен поправить его на {randomPlayer.prep}: воротник, рукав, ремень, цепочку, волосы или кофту. Делай медленно."
  },
  {
    id: "action_075",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд {randomPlayer.nom} держит тебя за подбородок, а ты смотришь ему в глаза. Нельзя отворачиваться. Кто засмеялся — штраф."
  },
  {
    id: "action_076",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет и положи на колени {randomPlayer.gen}. {randomPlayer.nom} держит его там до следующей карточки."
  },
  {
    id: "action_077",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд медленно веди пальцами по плечу {randomPlayer.gen} через одежду. Потом {randomPlayer.nom} повторяет то же самое с тобой."
  },
  {
    id: "action_078",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи честно, куда бы ты поцеловал {randomPlayer.acc}, если бы не было штрафа. Потом целуешь туда, если место выше пояса. Если нет — целуешь руку."
  },
  {
    id: "action_079",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы держитесь за руки, но сидите максимально близко. Каждый раз, когда кто-то улыбается, второй сжимает руку сильнее."
  },
  {
    id: "action_080",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен выбрать для тебя одно слово на следующий круг: “хочу”, “опасно”, “ещё” или “ближе”. Каждый твой ответ начинается с этого слова."
  },
  {
    id: "action_081",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы сидите рядом. Каждые 10 секунд компания называет место для руки: плечо, талия, колено, бедро. Вы оба выполняете."
  },
  {
    id: "action_082",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в щёку, но не сразу: сначала 5 секунд держи лицо рядом с его лицом. Быстрый вариант не считается."
  },
  {
    id: "action_083",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд {randomPlayer.nom} сидит с закрытыми глазами, а ты говоришь три вещи, которые в нём могут кого-то соблазнить."
  },
  {
    id: "action_084",
    type: "action",
    title: "Действие",
    timer: 40,
    text: "{player.nom}, выбери {randomPlayer.acc}. Выберите один предмет между вами: карта, стакан, салфетка или любой мелкий предмет. Передайте его друг другу губами без рук. Уронили — оба пьёте."
  },
  {
    id: "action_085",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи руку на колене {randomPlayer.gen}, а {randomPlayer.nom} держит руку на твоём колене. Убрал руку — штраф."
  },
  {
    id: "action_086",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: ты садишься ближе к {randomPlayer.dat}, или {randomPlayer.nom} садится ближе к тебе. Дистанция — не больше ладони до следующей карточки."
  },
  {
    id: "action_087",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен говорить {randomPlayer.dat} только вопросы, на которые ответ “да” звучит подозрительно. Например: “Ты хочешь ближе?”"
  },
  {
    id: "action_088",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает тебе место для поцелуя выше плеч. Ты выполняешь. Если выбирает губы — минимум 5 секунд."
  },
  {
    id: "action_089",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд один из вас сидит, второй стоит между его коленями. Через половину времени поменяйтесь. Руки держать на плечах или талии."
  },
  {
    id: "action_090",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, что на нём сейчас выглядит самым соблазнительным. Потом компания решает: ответ засчитан или штраф."
  },
  {
    id: "action_091",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы держите один общий предмет между лбами или носами. Руки использовать нельзя. Уронили — оба пьёте."
  },
  {
    id: "action_092",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Расстегни или ослабь на себе один элемент одежды. {randomPlayer.nom} решает, оставить так до следующего круга или вернуть обратно."
  },
  {
    id: "action_093",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд говори {randomPlayer.dat} на ухо только одну фразу, повторяя её медленно: “Не делай вид, что тебе всё равно”."
  },
  {
    id: "action_094",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает одну часть твоей одежды. {randomPlayer.nom} должен поправить её на тебе без спешки. Ты не помогаешь руками."
  },
  {
    id: "action_095",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд сидите с переплетёнными пальцами. В конце каждый говорит одну фразу: “Я бы рискнул” или “Я бы сбежал”."
  },
  {
    id: "action_096",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Дай {randomPlayer.dat} право выбрать: ты снимаешь один предмет, целуешь его руку или садишься к нему ближе. Выбор выполняется сразу."
  },
  {
    id: "action_097",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы сидите молча, но каждые 10 секунд один из вас должен сделать маленький шаг ближе. Если уже вплотную — руки на талию."
  },
  {
    id: "action_098",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи компании, что бы ты запретил {randomPlayer.dat} делать сегодня, чтобы не начались проблемы. Потом {randomPlayer.nom} выполняет этот запрет до следующего круга."
  },
  {
    id: "action_099",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты держишь одну руку на плече {randomPlayer.gen}, вторую — у себя на груди. {randomPlayer.nom} держит тебя за талию."
  },
  {
    id: "action_100",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает для вас один контакт до следующей карточки: плечо к плечу, рука в руке, нога к ноге или рука на талии. Контакт нельзя разрывать."
  }
];

if (typeof GAME_CARDS !== "undefined" && Array.isArray(GAME_CARDS.action)) {
  const existingIds = new Set(GAME_CARDS.action.map((card) => card.id));
  ACTION_CARDS_051_100.forEach((card) => {
    if (!existingIds.has(card.id)) {
      GAME_CARDS.action.push(card);
    }
  });
}


const ACTION_CARDS_101_150 = [
  {
    id: "action_101",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. В течение 30 секунд {randomPlayer.nom} говорит тебе, куда положить руку: плечо, талия, колено, бедро или шея. Ты выполняешь каждую команду без споров. Отказ — штраф."
  },
  {
    id: "action_102",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Напиши пальцем на руке или шее {randomPlayer.gen} одно слово: “хочу”, “нельзя”, “ближе”, “риск” или “ошибка”. {randomPlayer.nom} должен угадать слово. Не угадал — пьёт."
  },
  {
    id: "action_103",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы играете в запрет: вам нельзя касаться губами, но нужно держаться лицами как можно ближе. Кто первый отодвинулся — штраф."
  },
  {
    id: "action_104",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}: “Сегодня ты мой выбор”. После этого компания выбирает: поцелуй в руку, поцелуй в щёку или рука на талии. Выполняешь сразу."
  },
  {
    id: "action_105",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд {randomPlayer.nom} сидит с закрытыми глазами, а ты медленно приближаешься и останавливаешься в пяти сантиметрах от лица. В конце {randomPlayer.nom} выбирает: поцелуй в щёку или штраф тебе."
  },
  {
    id: "action_106",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания называет один предмет одежды на тебе. {randomPlayer.nom} должен снять, расстегнуть или поправить этот предмет. Если предмет неудобный — компания выбирает замену."
  },
  {
    id: "action_107",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд говори {randomPlayer.dat} только фразы из двух слов: “сядь ближе”, “не отходи”, “смотри сюда”, “руку сюда”, “ещё ближе”. {randomPlayer.nom} выполняет."
  },
  {
    id: "action_108",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. Положи руку {randomPlayer.gen} себе на плечо, а свою руку положи {randomPlayer.dat} на талию. Так сидите до следующей карточки."
  },
  {
    id: "action_109",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен говорить {randomPlayer.dat}, что именно в его внешности может соблазнить человека. Нужно назвать минимум три конкретные детали."
  },
  {
    id: "action_110",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает тебе новое место до следующей карточки: у его ног, рядом вплотную, за его спиной или на его месте. Ты переходишь туда сразу."
  },
  {
    id: "action_111",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи руку на шее {randomPlayer.gen} сбоку или сзади. Не сжимать, просто держать. Если {randomPlayer.nom} убрал твою руку — он пьёт."
  },
  {
    id: "action_112",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя любой предмет и обменяй его на один предмет {randomPlayer.gen}. Оба носите полученное до следующего круга."
  },
  {
    id: "action_113",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд вы сидите так: один держит второго за запястья, второй не убирает руки. Через 20 секунд поменяйтесь ролями."
  },
  {
    id: "action_114",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в то место выше плеч, которое назовёт компания. Возможные варианты: губы, щека, шея, ухо, плечо, рука."
  },
  {
    id: "action_115",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы должны говорить друг другу только правду одним предложением. Темы: внешность, желание, ревность, интерес. Уклонение — штраф."
  },
  {
    id: "action_116",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает: ты целуешь его руку, он целует твою руку, или вы целуете друг друга в щёку. Выбор выполняется сразу."
  },
  {
    id: "action_117",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты сидишь спиной к {randomPlayer.dat}. {randomPlayer.nom} держит руки у тебя на плечах. Ты должен не оборачиваться и не смеяться."
  },
  {
    id: "action_118",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}: “Сейчас я решаю за тебя”. Потом выбери для него: сесть ближе, дать руку, закрыть глаза или поцеловать тебя в щёку."
  },
  {
    id: "action_119",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы передаёте друг другу один предмет только губами или подбородком, без рук. Уронили — оба пьёте штраф."
  },
  {
    id: "action_120",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один контакт до следующего круга: твоя рука на его талии, его рука на твоём бедре, ваши руки вместе или ваши плечи вплотную."
  },
  {
    id: "action_121",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд {randomPlayer.nom} задаёт тебе короткие команды, а ты выполняешь только взглядом и движением корпуса. Руками пользоваться нельзя."
  },
  {
    id: "action_122",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Попроси {randomPlayer.acc} выбрать тебе штраф без алкоголя: поцелуй в руку, сесть ближе, снять аксессуар или сказать грязный комплимент. Выполняешь выбранное."
  },
  {
    id: "action_123",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи {randomPlayer.acc} за талию двумя руками. {randomPlayer.nom} в это время держит руки у тебя на плечах."
  },
  {
    id: "action_124",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи компании, какая часть {randomPlayer.gen} выглядит самой опасной сегодня. Потом {randomPlayer.nom} решает: засчитать ответ или назначить тебе штраф."
  },
  {
    id: "action_125",
    type: "action",
    title: "Действие",
    timer: 40,
    text: "{player.nom}, выбери {randomPlayer.acc}. 60 секунд вы должны сидеть как тайная пара: не отходить друг от друга, говорить тихо и держать один физический контакт. Разорвали контакт — оба пьёте."
  },
  {
    id: "action_126",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} закрывает глаза. Ты выбираешь: поцелуй в руку, касание плеча или дыхание рядом с шеей. {randomPlayer.nom} должен угадать, что ты сделал."
  },
  {
    id: "action_127",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы должны держать один общий стакан или предмет двумя руками одновременно. Руки должны касаться. Отпустил — штраф."
  },
  {
    id: "action_128",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}: “Ты сейчас делаешь выбор”. {randomPlayer.nom} выбирает: поцеловать тебя в щёку, сесть к тебе ближе или взять твою руку."
  },
  {
    id: "action_129",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен стоять за спиной {randomPlayer.gen} и говорить ему на ухо короткие фразы. Минимум три фразы. Слишком мягко — штраф."
  },
  {
    id: "action_130",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один предмет на {randomPlayer.prep}. Ты должен снять, поправить или перенадеть его. Если предмет нельзя трогать — выбирается другой."
  },
  {
    id: "action_131",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд вы держитесь лбами или носами рядом, не целуясь. Нельзя смеяться, говорить и отворачиваться."
  },
  {
    id: "action_132",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Назови одну вещь, которую {randomPlayer.nom} должен сделать с тобой прямо сейчас: взять за руку, сесть ближе, поцеловать в щёку или положить руку на плечо."
  },
  {
    id: "action_133",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы по очереди говорите друг другу фразы, начинающиеся с “Я бы...”. Фразы должны быть взрослые, но без прямого секса. Скучная фраза — штраф."
  },
  {
    id: "action_134",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет и положи его на плечо, колено или руку {randomPlayer.gen}. {randomPlayer.nom} не имеет права убирать его до следующей карточки."
  },
  {
    id: "action_135",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен быть “запрещённым советчиком”: шепчи {randomPlayer.dat}, что ему нельзя делать сегодня, потому что это плохо закончится."
  },
  {
    id: "action_136",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} ставит твою руку туда, где ему разрешено: плечо, рука, талия, колено или бедро. Ты держишь руку 15 секунд."
  },
  {
    id: "action_137",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд {randomPlayer.nom} держит тебя за руку, а ты должен смотреть на его губы, не отводя взгляд. Засмеялся — штраф."
  },
  {
    id: "action_138",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи одну фразу, которую ты бы написал {randomPlayer.dat} ночью, если бы был смелее. Если компания говорит “слабо” — штраф."
  },
  {
    id: "action_139",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд вы сидите напротив. Один держит руки на коленях другого, второй держит руки на плечах первого. Через 20 секунд меняетесь."
  },
  {
    id: "action_140",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает тебе одну роль до следующей карточки: ревнивый, соблазняющий, подчиняющийся или опасно спокойный. Ты общаешься с {randomPlayer.inst} только в этой роли."
  },
  {
    id: "action_141",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы передаёте друг другу взглядом одну мысль: “подойди ближе”. Нельзя говорить. В конце {randomPlayer.nom} решает, получилось или нет."
  },
  {
    id: "action_142",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} выбирает одну твою фразу на следующий круг: “я виноват”, “я хочу”, “я боюсь” или “я не против”. Ты обязан сказать её перед каждым ответом."
  },
  {
    id: "action_143",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд ты должен держать руку на внутренней стороне локтя {randomPlayer.gen} и говорить только шёпотом. Если говоришь громко — штраф."
  },
  {
    id: "action_144",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поставь {randomPlayer.acc} перед собой, сделай один шаг ближе и скажи: “Сейчас ты слишком близко”. Потом не отходи 10 секунд."
  },
  {
    id: "action_145",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 60 секунд вы должны выполнять команды компании только вдвоём: ближе, руки, взгляд, поменяйтесь местами, тише, замрите. Отказ от команды — штраф."
  },
  {
    id: "action_146",
    type: "action",
    title: "Действие",
    timer: 45,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, что бы ты запретил ему делать, если бы ревновал. {randomPlayer.nom} должен выполнить этот запрет до следующей карточки."
  },
  {
    id: "action_147",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд ты держишь руку у {randomPlayer.gen} на плече, а {randomPlayer.nom} держит руку у тебя на пояснице. Нельзя двигаться."
  },
  {
    id: "action_148",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает одно: ты целуешь {randomPlayer.acc} в губы, {randomPlayer.nom} целует тебя в щёку, или вы сидите вплотную до следующей карточки."
  },
  {
    id: "action_149",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы должны говорить друг другу только честные ответы на вопрос: “Что во мне может быть опасным?” Минимум по два ответа."
  },
  {
    id: "action_150",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Финальное действие блока: {randomPlayer.nom} выбирает для тебя одно из четырёх — поцелуй, рука на бедре, снять предмет одежды или сесть ближе. Выполняешь без торговли."
  }
];

if (typeof GAME_CARDS !== "undefined" && Array.isArray(GAME_CARDS.action)) {
  const existingIds = new Set(GAME_CARDS.action.map((card) => card.id));
  ACTION_CARDS_101_150.forEach((card) => {
    if (!existingIds.has(card.id)) {
      GAME_CARDS.action.push(card);
    }
  });
}


const TRUTH_CARDS_001_060 = [
  {
    id: "truth_001",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, когда ты последний раз мастурбировал? Ответ только один: сегодня, на этой неделе, в этом месяце или давно."
  },
  {
    id: "truth_002",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы вся компания увидела твою историю поиска за последний месяц, что было бы самым стыдным: порно, бывшие, переписки, симптомы или чужие соцсети?"
  },
  {
    id: "truth_003",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какой тип порно ты бы включил, если бы никто никогда об этом не узнал? Назови жанр или признай, что стесняешься."
  },
  {
    id: "truth_004",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя человек, которого ты не хотел в отношениях, но очень хотел в постели? Ответь да или нет."
  },
  {
    id: "truth_005",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, представь, что нужно показать компании одну удалённую переписку. С кем она была бы опаснее всего: бывший, друг, коллега, случайный человек или кто-то запретный?"
  },
  {
    id: "truth_006",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь получал интимное фото и пересматривал его больше одного раза? Ответь честно."
  },
  {
    id: "truth_007",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя была фантазия про секс с человеком из реальной жизни, которому ты никогда об этом не скажешь?"
  },
  {
    id: "truth_008",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой комнаты, по твоему мнению, лучше всего скрывает свои грязные мысли? Назови имя."
  },
  {
    id: "truth_009",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь специально выкладывал фото или сторис, чтобы конкретный человек приревновал или захотел тебя?"
  },
  {
    id: "truth_010",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы тебе пришлось поцеловать одного человека из комнаты в губы прямо сейчас, кого бы ты выбрал? Имя обязательно."
  },
  {
    id: "truth_011",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что тебя быстрее заводит в человеке: голос, руки, губы, запах, взгляд, тело или уверенность? Выбери одно."
  },
  {
    id: "truth_012",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс, после которого ты думал: “лучше бы этого не было”, но тело всё равно помнило?"
  },
  {
    id: "truth_013",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел заняться сексом с человеком именно потому, что это было нельзя, опасно или неправильно?"
  },
  {
    id: "truth_014",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь ревновал человека, который тебе официально вообще не принадлежал?"
  },
  {
    id: "truth_015",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы нужно было выбрать человека из комнаты для ночи без обязательств, кого бы ты выбрал? Можно сказать “никого”, но тогда пьёшь штраф."
  },
  {
    id: "truth_016",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какая часть тела у людей чаще всего цепляет тебя первой? Не отвечай “глаза”, если это просто безопасный ответ."
  },
  {
    id: "truth_017",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь представлял другого человека во время секса с партнёром? Ответь да или нет."
  },
  {
    id: "truth_018",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс по пьяни, который утром казался совсем другой идеей, чем ночью?"
  },
  {
    id: "truth_019",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь сохранял фото человека не потому, что оно красивое, а потому что оно тебя заводило?"
  },
  {
    id: "truth_020",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какой самый неприличный комплимент тебе хотелось бы услышать от человека, который тебе нравится?"
  },
  {
    id: "truth_021",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь отвечал человеку холодно, хотя на самом деле очень хотел, чтобы он продолжил добиваться тебя?"
  },
  {
    id: "truth_022",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой комнаты, по твоему мнению, после алкоголя первым может сделать то, о чём завтра будет молчать?"
  },
  {
    id: "truth_023",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя была фантазия про секс в месте, где вас могли бы услышать или застать?"
  },
  {
    id: "truth_024",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел, чтобы человек сам сделал первый шаг, потому что тебе было страшно признаться в желании?"
  },
  {
    id: "truth_025",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы компания могла задать тебе только один вопрос про секс, какой вопрос ты больше всего боялся бы услышать?"
  },
  {
    id: "truth_026",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание попробовать в сексе что-то новое, но ты так и не решился предложить?"
  },
  {
    id: "truth_027",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь флиртовал просто чтобы проверить, всё ещё можешь нравиться людям?"
  },
  {
    id: "truth_028",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя человек, с которым разговор всегда незаметно скатывался в секс, флирт или намёки?"
  },
  {
    id: "truth_029",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь просыпался и проверял телефон с мыслью: “только бы я вчера не написал ничего лишнего”?"
  },
  {
    id: "truth_030",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кого из этой комнаты ты бы назвал самым опасным для чужих отношений? Назови имя и одну причину."
  },
  {
    id: "truth_031",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел бывшего человека обратно не в жизнь, а только в постель?"
  },
  {
    id: "truth_032",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что для тебя стыднее признать: что ты смотришь порно, что ревнуешь, что врёшь, или что тебе нравится запретное?"
  },
  {
    id: "truth_033",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, была ли у тебя переписка, где одно сообщение могло всё испортить, но тебе всё равно хотелось его отправить?"
  },
  {
    id: "truth_034",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь специально задерживал взгляд на теле человека, надеясь, что он это заметит?"
  },
  {
    id: "truth_035",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы твой телефон прямо сейчас разблокировали перед всеми, что было бы хуже: галерея, мессенджеры, браузер или заметки?"
  },
  {
    id: "truth_036",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание заняться сексом с человеком, которого ты терпеть не мог?"
  },
  {
    id: "truth_037",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь начинал разговор только ради того, чтобы он закончился флиртом?"
  },
  {
    id: "truth_038",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из комнаты, по твоему мнению, умеет выглядеть невинно, но в голове у него полный беспредел?"
  },
  {
    id: "truth_039",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя такое, что ты хотел не отношений, а только секса, но не сказал это честно?"
  },
  {
    id: "truth_040",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь проверял, с кем человек был онлайн, кому ставил лайки или чьи сторис смотрел?"
  },
  {
    id: "truth_041",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какое слово лучше описывает тебя в личной жизни: охотник, жертва, провокатор, ревнивец или трус?"
  },
  {
    id: "truth_042",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел поцеловать друга или подругу просто чтобы проверить, что будет дальше?"
  },
  {
    id: "truth_043",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс, который ты не хотел бы повторять, но и забыть не можешь?"
  },
  {
    id: "truth_044",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы нужно было удалить только одну вещь перед тем, как показать телефон партнёру, что бы это было?"
  },
  {
    id: "truth_045",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из комнаты, по твоему мнению, мог бы неожиданно хорошо целоваться? Назови имя."
  },
  {
    id: "truth_046",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь соглашался на встречу, уже понимая, что разговором она не закончится?"
  },
  {
    id: "truth_047",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание отправить интимное фото, но ты остановился в последний момент?"
  },
  {
    id: "truth_048",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что тебя больше заводит: когда тебя добиваются, когда тебе запрещают, когда тебя ревнуют или когда тебя игнорируют?"
  },
  {
    id: "truth_049",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя момент, когда ты понял: если мы сейчас останемся вдвоём, всё случится?"
  },
  {
    id: "truth_050",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кого из комнаты ты бы выбрал для самой неправильной, но интересной ошибки?"
  },
  {
    id: "truth_051",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь врал про количество партнёров: уменьшал, увеличивал или уходил от ответа?"
  },
  {
    id: "truth_052",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какая твоя самая неудобная правда: ты быстро привязываешься, быстро хочешь, быстро ревнуешь или быстро остываешь?"
  },
  {
    id: "truth_053",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь думал о человеке из прошлого во время близости с другим?"
  },
  {
    id: "truth_054",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание написать человеку: “я хочу тебя”, но ты заменил это на обычную нейтральную фразу?"
  },
  {
    id: "truth_055",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы твои фантазии получили название фильма, как бы он назывался? Ответ должен быть не детский."
  },
  {
    id: "truth_056",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь притворялся спокойным рядом с человеком, который тебя реально возбуждал?"
  },
  {
    id: "truth_057",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что ты чаще скрываешь от людей: кого хочешь, кому завидуешь, кого ревнуешь или с кем переписываешься?"
  },
  {
    id: "truth_058",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, была ли у тебя история, где ты сам понимал: “это грязно, но мне нравится”?"
  },
  {
    id: "truth_059",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кого из комнаты ты бы не хотел оставлять один на один с человеком, который тебе нравится?"
  },
  {
    id: "truth_060",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, скажи одну правду о своей личной жизни, которую компания точно ещё не знает."
  }
];

const NEVER_CARDS_001_040 = [
  {
    id: "never_001",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не мастурбировал в день встречи с человеком, который мне нравится. Кто делал — пьёт."
  },
  {
    id: "never_002",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не чистил историю браузера после порно. Кто чистил — пьёт."
  },
  {
    id: "never_003",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не отправлял интимное фото и потом не переживал, что оно где-то останется. Кто делал — пьёт."
  },
  {
    id: "never_004",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не получал фото, которое нельзя было бы спокойно показать друзьям. Кто получал — пьёт."
  },
  {
    id: "never_005",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не удалял чат целиком, потому что отдельные сообщения были слишком палевные. Кто удалял — пьёт."
  },
  {
    id: "never_006",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не писал бывшему или бывшей ночью. Кто писал — пьёт."
  },
  {
    id: "never_007",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не флиртовал с человеком, который был в отношениях. Кто флиртовал — пьёт."
  },
  {
    id: "never_008",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел заняться сексом с человеком, который мне вообще не подходит. Кто хотел — пьёт."
  },
  {
    id: "never_009",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не проверял лайки и сторис человека, который мне якобы безразличен. Кто проверял — пьёт."
  },
  {
    id: "never_010",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не делал вид, что случайно прикоснулся, хотя сделал это специально. Кто делал — пьёт."
  },
  {
    id: "never_011",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел поцеловать друга или подругу. Кто хотел — пьёт."
  },
  {
    id: "never_012",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не просыпался с мыслью: “Что я вчера натворил?” Кто просыпался — пьёт."
  },
  {
    id: "never_013",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не занимался сексом по пьяни и потом не помнил всё нормально. Кто делал — пьёт."
  },
  {
    id: "never_014",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел вернуть человека только ради секса. Кто хотел — пьёт."
  },
  {
    id: "never_015",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не представлял другого человека во время секса. Кто представлял — пьёт."
  },
  {
    id: "never_016",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не фантазировал о сексе в месте, где нас могли застать. Кто фантазировал — пьёт."
  },
  {
    id: "never_017",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не изменял. Кто изменял — пьёт."
  },
  {
    id: "never_018",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не был на грани измены и не остановился в последний момент. Кто был — пьёт."
  },
  {
    id: "never_019",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не ревновал человека, с которым у меня не было отношений. Кто ревновал — пьёт."
  },
  {
    id: "never_020",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не вызывал ревность специально. Кто вызывал — пьёт."
  },
  {
    id: "never_021",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не соглашался на встречу, уже понимая, что хочу не просто поговорить. Кто соглашался — пьёт."
  },
  {
    id: "never_022",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не надевал что-то специально, чтобы конкретный человек захотел меня. Кто надевал — пьёт."
  },
  {
    id: "never_023",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел секса с человеком, которого терпеть не могу. Кто хотел — пьёт."
  },
  {
    id: "never_024",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не скрывал встречу от партнёра. Кто скрывал — пьёт."
  },
  {
    id: "never_025",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не говорил “ничего не было”, хотя был поцелуй. Кто говорил — пьёт."
  },
  {
    id: "never_026",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не сохранял фото человека, потому что оно меня заводило. Кто сохранял — пьёт."
  },
  {
    id: "never_027",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел секса втроём. Кто хотел — пьёт."
  },
  {
    id: "never_028",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не стеснялся своего порно-запроса. Если стеснялся хоть раз — пьёшь."
  },
  {
    id: "never_029",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не писал человеку фразу с намёком, а потом делал вид, что он всё неправильно понял. Кто писал — пьёт."
  },
  {
    id: "never_030",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел, чтобы меня поцеловали первым. Кто хотел — пьёт."
  },
  {
    id: "never_031",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не занимался сексом без чувств. Кто занимался — пьёт."
  },
  {
    id: "never_032",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не жалел не о сексе, а о человеке, с которым он был. Кто жалел — пьёт."
  },
  {
    id: "never_033",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел написать “я хочу тебя”, но заменял это обычной фразой. Кто делал — пьёт."
  },
  {
    id: "never_034",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не смотрел на человека в компании и не представлял, как он целуется. Кто представлял — пьёт."
  },
  {
    id: "never_035",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел попробовать что-то в сексе, но боялся предложить. Кто хотел — пьёт."
  },
  {
    id: "never_036",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не врал про количество партнёров. Кто врал — пьёт."
  },
  {
    id: "never_037",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не флиртовал ради выгоды, помощи или скидки. Кто флиртовал — пьёт."
  },
  {
    id: "never_038",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не целовался с человеком и сразу понимал, что теперь всё изменится. Кто целовался — пьёт."
  },
  {
    id: "never_039",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел человека, который был для меня слишком запретным. Кто хотел — пьёт."
  },
  {
    id: "never_040",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не боялся, что мои фантазии однажды кто-то узнает. Если боялся — пьёшь."
  }
];

if (typeof GAME_CARDS !== "undefined") {
  GAME_CARDS.truth = TRUTH_CARDS_001_060;
  GAME_CARDS.never = NEVER_CARDS_001_040;
}

const MINI_GAME_CARDS_001_035 = [
  {
    id: "mini_001",
    type: "mini_game",
    title: "Карта пошла",
    timer: 30,
    text: "Все садятся по кругу. Первый игрок берёт карту губами и передаёт следующему без рук. На круг есть 60 секунд. Если карта падает — двое, между кем она упала, целуются в щёку или губы, как решит компания. Потом оба пьют штраф."
  },
  {
    id: "mini_002",
    type: "mini_game",
    title: "Горячее кресло",
    timer: 60,
    text: "{player.nom} садится в центр. Компания за 60 секунд задаёт ему 5 личных вопросов. Темы: секс, порно, ревность, переписки, бывшие, фантазии. Один вопрос можно пропустить. Второй пропуск — штраф."
  },
  {
    id: "mini_003",
    type: "mini_game",
    title: "Опасная пара",
    timer: null,
    text: "Компания выбирает двух игроков, между которыми сейчас больше всего напряжения. Они садятся рядом вплотную на 45 секунд. Один держит руку на талии второго, второй держит руку на колене первого. Кто убрал руку — пьёт."
  },
  {
    id: "mini_004",
    type: "mini_game",
    title: "Бутылочка без бутылочки",
    timer: null,
    text: "{player.nom} закрывает глаза. Компания выбирает одного игрока. Он касается {player.gen} рукой, дыханием или губами в место выше плеч. {player.nom} должен угадать, кто это был. Не угадал — пьёт штраф."
  },
  {
    id: "mini_005",
    type: "mini_game",
    title: "Слишком близко",
    timer: 45,
    text: "{player.nom} выбирает {randomPlayer.acc}. Они садятся лицом друг к другу. Каждые 15 секунд двигаются ближе. Говорить и смеяться нельзя. В конце лица должны быть максимально близко. Кто сорвался — пьёт."
  },
  {
    id: "mini_006",
    type: "mini_game",
    title: "Раздень манекен",
    timer: 60,
    text: "Компания выбирает двух игроков. Каждый называет один заметный предмет одежды или аксессуар на другом, который должен исчезнуть до следующего круга. Игрок либо снимает выбранное, либо пьёт штраф."
  },
  {
    id: "mini_007",
    type: "mini_game",
    title: "Дуэль: выдержи взгляд",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom} садятся напротив. 30 секунд смотрят друг другу в глаза. Нельзя говорить, смеяться и отворачиваться. Первый, кто сорвался, пьёт. Если выдержали оба — компания выбирает, кто был убедительнее."
  },
  {
    id: "mini_008",
    type: "mini_game",
    title: "Слепое касание",
    timer: 45,
    text: "{player.nom} должен за 60 секунд сказать три короткие правды: кого из комнаты он бы поцеловал, кто выглядит самым опасным после алкоголя, и какой вопрос про себя он боится услышать. Не ответил на любой пункт — штраф."
  },
  {
    id: "mini_009",
    type: "mini_game",
    title: "Компромат-поза",
    timer: 30,
    text: "Компания выбирает двух игроков. За 30 секунд они должны принять позу, в которой их было бы неловко увидеть со стороны. Одежду не снимать. Руки должны быть заняты: талия, плечи, колени или руки. Если поза скучная — оба пьют."
  },
  {
    id: "mini_010",
    type: "mini_game",
    title: "Кто кого хотел бы",
    timer: null,
    text: "Все одновременно показывают на человека, который, по их мнению, чаще всего думает о сексе. Игрок с большинством голосов выбирает любого человека и говорит ему один прямой комплимент про внешность. Слабый комплимент — штраф."
  },
  {
    id: "mini_011",
    type: "mini_game",
    title: "Ледяная дорожка",
    timer: null,
    text: "{player.nom} выбирает {randomPlayer.acc}. Нужно провести холодным предметом по руке, запястью, шее или плечу {randomPlayer.gen}. Потом {randomPlayer.nom} делает то же самое с {player.inst}. Кто делает быстро и скучно — пьёт."
  },
  {
    id: "mini_012",
    type: "mini_game",
    title: "Грязный комплимент",
    timer: 60,
    text: "Каждый игрок по очереди говорит {player.dat} один взрослый комплимент. Нельзя говорить про доброту, характер и ум. Только внешность, голос, руки, губы, тело, взгляд или энергия. Самый слабый комплимент выбирает компания. Автор пьёт."
  },
  {
    id: "mini_013",
    type: "mini_game",
    title: "Круг плохих решений",
    timer: 90,
    text: "Все закрывают глаза. Каждый показывает пальцем на человека, с которым у {player.gen}, по мнению компании, могла бы случиться самая неправильная история. Потом все открывают глаза. Игрок с большинством голосов садится рядом с {player.inst} до следующей карточки."
  },
  {
    id: "mini_014",
    type: "mini_game",
    title: "Одежда пошла",
    timer: 60,
    text: "Каждый игрок за 60 секунд отдаёт человеку справа один заметный предмет одежды или аксессуар. Получатель надевает это поверх своей одежды. Слишком мелкая вещь не считается. Кто ничего не отдал — пьёт."
  },
  {
    id: "mini_015",
    type: "mini_game",
    title: "Суд компании",
    timer: null,
    text: "Компания выбирает самого подозрительного игрока вечера. Он отвечает на вопрос: “Что обо мне лучше не знать человеку, который со мной встречается?” Ответ должен быть конкретный. Слишком безопасный ответ — штраф."
  },
  {
    id: "mini_016",
    type: "mini_game",
    title: "Поцелуйная цепочка",
    timer: 60,
    text: "По кругу каждый целует следующего игрока в место, которое выберет компания: рука, щека, плечо, шея или губы. На весь круг 60 секунд. Кто отказывается — пьёт. Кто делает слишком быстро — повторяет."
  },
  {
    id: "mini_017",
    type: "mini_game",
    title: "Тайная метка",
    timer: null,
    text: "{player.nom} выбирает {randomPlayer.acc}. Компания выбирает место выше плеч: рука, щека, шея, плечо или запястье. {player.nom} оставляет там поцелуй. {randomPlayer.nom} не прячет это до следующего круга."
  },
  {
    id: "mini_018",
    type: "mini_game",
    title: "Дуэль: кто соблазнит взглядом",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom} встают друг напротив друга. 30 секунд каждый должен соблазнять другого без слов: взгляд, поза, движение, расстояние. Касаться нельзя. Компания выбирает победителя. Проигравший пьёт."
  },
  {
    id: "mini_019",
    type: "mini_game",
    title: "Проверка химии",
    timer: 45,
    text: "{player.nom} и {randomPlayer.nom} садятся рядом. Один держит руку на бедре второго, второй — руку на талии первого. 45 секунд нельзя смеяться и оправдываться. После таймера компания голосует: верим или не верим. Если не верим — оба пьют."
  },
  {
    id: "mini_020",
    type: "mini_game",
    title: "Шёпот грязных мыслей",
    timer: 60,
    text: "{player.nom} сидит в центре. Каждый игрок по очереди шепчет {player.dat} на ухо одну взрослую фразу: комплимент, желание, подозрение или вопрос. {player.nom} выбирает самую слабую фразу. Её автор пьёт."
  },
  {
    id: "mini_021",
    type: "mini_game",
    title: "Кто спалился",
    timer: null,
    text: "Все одновременно показывают на человека, который чаще всего делает вид, что он просто общается, хотя там явно флирт. Игрок с большинством голосов должен рассказать одну похожую ситуацию из жизни. Отказ — штраф."
  },
  {
    id: "mini_022",
    type: "mini_game",
    title: "Один предмет лишний",
    timer: null,
    text: "{player.nom} выбирает {randomPlayer.acc}. Компания даёт им две команды: одна про позу, одна про руки. Например: “сесть ближе” и “руки на талии”. Они держат это 40 секунд. Кто нарушил — пьёт."
  },
  {
    id: "mini_023",
    type: "mini_game",
    title: "Ванная сцена",
    timer: 90,
    text: "{player.nom} выбирает {randomPlayer.acc}. Они уходят в ванную на 90 секунд. Там {player.nom} моет {randomPlayer.dat} один палец на руке. После возвращения {player.nom} при всех целует этот палец. Не сделали — оба пьют."
  },
  {
    id: "mini_024",
    type: "mini_game",
    title: "Не трогай — проиграешь",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom} садятся рядом. Компания выбирает место для руки каждого: плечо, колено, талия, бедро или рука. 30 секунд нельзя убирать контакт. Кто убрал первым — пьёт."
  },
  {
    id: "mini_025",
    type: "mini_game",
    title: "Дуэль: грязная правда",
    timer: null,
    text: "{player.nom} и {randomPlayer.nom} по очереди отвечают на вопрос: “Что во мне может быть опасным для чужих нервов или отношений?” Компания выбирает, чей ответ честнее. Проигравший пьёт."
  },
  {
    id: "mini_026",
    type: "mini_game",
    title: "Поцелуй на выбор компании",
    timer: null,
    text: "Компания выбирает двух игроков и место поцелуя: рука, щека, шея, плечо или губы. Игроки выполняют. Если место выбрано губы — минимум 5 секунд. Отказ любого игрока — штраф этому игроку."
  },
  {
    id: "mini_027",
    type: "mini_game",
    title: "Смена владельца",
    timer: null,
    text: "Каждый игрок выбирает один предмет на себе и отдаёт человеку слева. Получатель надевает это поверх одежды до следующего круга. Предмет должен быть заметным. Кто отдаёт незаметную мелочь — пьёт."
  },
  {
    id: "mini_028",
    type: "mini_game",
    title: "Тело говорит",
    timer: 45,
    text: "{player.nom} и {randomPlayer.nom} играют сцену без слов: один зовёт ближе, второй сопротивляется, но всё равно приближается. Можно использовать взгляд, руки, корпус и расстояние. 45 секунд. Если компания не поняла сцену — оба пьют."
  },
  {
    id: "mini_029",
    type: "mini_game",
    title: "Самый опасный после алкоголя",
    timer: null,
    text: "Все показывают на человека, который после алкоголя становится самым опасным в плане флирта. Игрок с большинством голосов выбирает любого человека и садится с ним вплотную до следующей карточки."
  },
  {
    id: "mini_030",
    type: "mini_game",
    title: "Три касания",
    timer: 30,
    text: "{player.nom} выбирает {randomPlayer.acc}. За 30 секунд нужно сделать три касания поверх одежды: рука или запястье, плечо или шея, талия или колено. Если любое касание сделано быстро и трусливо — штраф."
  },
  {
    id: "mini_031",
    type: "mini_game",
    title: "Снимай или пей",
    timer: null,
    text: "Компания выбирает одного игрока. Ему называют один заметный предмет одежды или аксессуар. Он либо снимает его до следующего круга, либо отвечает на один личный вопрос компании. Отказ от обоих вариантов — двойной штраф."
  },
  {
    id: "mini_032",
    type: "mini_game",
    title: "Кто бы с кем",
    timer: null,
    text: "Каждый игрок по очереди отвечает: “С кем из комнаты у меня был бы самый опасный поцелуй?” Имя обязательно. Нельзя называть себя. Кто отказывается — пьёт."
  },
  {
    id: "mini_033",
    type: "mini_game",
    title: "На колени",
    timer: 45,
    text: "Компания выбирает двух игроков. Один садится на колени ко второму. Кто сверху — решает компания. 45 секунд нужно сидеть без шуток и оправданий. Руки держать на талии, плечах или коленях. Кто ломает позу — пьёт."
  },
  {
    id: "mini_034",
    type: "mini_game",
    title: "Руки заняты",
    timer: 60,
    text: "{player.nom} и {randomPlayer.nom} должны 60 секунд держать руки друг на друге. Каждые 15 секунд компания говорит новое место: плечо, рука, талия, колено, бедро. Кто не успел сменить место — пьёт."
  },
  {
    id: "mini_035",
    type: "mini_game",
    title: "Финальный беспредел круга",
    timer: 90,
    text: "За 90 секунд каждый игрок выбирает одного человека и делает одно действие: поцелуй в щёку, рука на талии, шёпот на ухо, обмен вещью или сесть вплотную. Одно и то же действие нельзя повторять два раза подряд. Отказ — штраф."
  }
];

const CHAOS_CARDS_001_015 = [
  {
    id: "chaos_001",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, отказ засчитан. До следующего своего хода ты обязан отвечать на любое обращение фразой: “Да, я струсил, но выгляжу хорошо”. Забыл — дополнительный штраф."
  },
  {
    id: "chaos_002",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, выпей штрафной глоток и скажи компании, какое задание ты испугался выполнить и почему. Без красивых отмазок."
  },
  {
    id: "chaos_003",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, до следующей карточки ты не имеешь права говорить слова “я”, “мне” и “моё”. Сказал — пьёшь снова."
  },
  {
    id: "chaos_004",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, компания выбирает тебе человека. Ты должен сесть рядом с ним настолько близко, насколько скажут остальные, и сидеть так до следующей карточки. Отодвинулся — пьёшь."
  },
  {
    id: "chaos_005",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, компания задаёт тебе один личный вопрос. Ответ должен быть честным. Если снова отказываешься — двойной штраф."
  },
  {
    id: "chaos_006",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, сними один аксессуар или предмет одежды, который компания признает достаточно заметным. Носить обратно можно только после следующего круга."
  },
  {
    id: "chaos_007",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, выбери человека и скажи ему честный пошлый комплимент без шутки, без сарказма и без безопасной ерунды. Если компания не поверила — ещё штраф."
  },
  {
    id: "chaos_008",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, до следующей карточки ты не можешь смеяться. Даже улыбка считается поражением. Сорвался — пьёшь."
  },
  {
    id: "chaos_009",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, компания выбирает тебе новое имя до конца круга. Каждый раз, когда ты не откликаешься на него — пьёшь."
  },
  {
    id: "chaos_010",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, до следующего своего хода ты обязан соглашаться с любым обвинением в свой адрес словами: “Да, и мне не стыдно”. Забыл — штраф."
  },
  {
    id: "chaos_011",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, компания выбирает одного человека. Ты должен поцеловать его в щёку, руку или шею. Место выбирает компания. Если отказываешься — пьёшь двойной штраф."
  },
  {
    id: "chaos_012",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, до следующего круга ты обязан держать руку на колене или бедре человека справа. Если убрал руку — пьёшь."
  },
  {
    id: "chaos_013",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, скажи вслух, какую карточку ты больше всего боялся бы получить сегодня. Компания имеет право добавить такую карточку в будущую базу."
  },
  {
    id: "chaos_014",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, выбери одного человека. До следующей карточки ты должен обращаться к нему “моя ошибка”. Забыл — пьёшь."
  },
  {
    id: "chaos_015",
    type: "chaos",
    title: "Штраф / хаос",
    timer: null,
    text: "{player.nom}, отказ был слабым. Компания выбирает: ты снимаешь один предмет одежды, целуешь выбранного человека или отвечаешь на самый личный вопрос вечера. Торговаться нельзя."
  }
];

if (typeof GAME_CARDS !== "undefined") {
  GAME_CARDS.mini_game = MINI_GAME_CARDS_001_035;
  GAME_CARDS.chaos = CHAOS_CARDS_001_015;
}

window.DEFAULT_PLAYERS = DEFAULT_PLAYERS;
window.PLAYER_FORMS = PLAYER_FORMS;
window.PLAYERS = PLAYERS;
window.CARD_WEIGHTS = CARD_WEIGHTS;
window.CARD_TYPE_LABELS = CARD_TYPE_LABELS;
window.GAME_CARDS = GAME_CARDS;
