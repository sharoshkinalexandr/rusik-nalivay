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
    text: "{player.nom}, выбери {randomPlayer.acc}. Покажи с {randomPlayer.inst}, как нужно страстно целоваться 30 секунд. Не чмокнуться, не поржать, не сделать вид, что вы в детском саду. Нормальный взрослый поцелуй. Если кто-то ломает момент — штраф."
  },
  {
    id: "action_002",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга держи {randomPlayer.acc} за ляжку и не отпускай. Не за колено, не за край одежды, а нормально за ляжку. Убрал руку раньше — штраф."
  },
  {
    id: "action_003",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, сядь между ног {randomPlayer.gen} на стуле, диване или полу. Устройся удобно, как будто тебе там самое место. Сидишь так до следующей карточки. Начал оправдываться — штраф."
  },
  {
    id: "action_004",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, если на тебе есть лифчик — сними его через футболку и надень {randomPlayer.dat} на голову. Если лифчика нет — сними любой заметный предмет одежды и надень {randomPlayer.dat} на голову. Скучный вариант — штраф."
  },
  {
    id: "action_005",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми {randomPlayer.acc} за палец, сходи с ним в ванную, помой ему этот палец, вернись и при всех медленно поцелуй, оближи и пососи этот палец. Делать быстро и на отвали нельзя."
  },
  {
    id: "action_006",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, иди в туалет, сними трусы и вернись. {randomPlayer.nom} должен надеть их поверх своей одежды и проходить так до следующего круга. Отказ — штраф."
  },
  {
    id: "action_007",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд целуй шею, щёку или губы {randomPlayer.gen} — место выбирает компания. Делать вид, что это случайный чмок, нельзя."
  },
  {
    id: "action_008",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} на колени лицом к лицу и просиди так до следующей карточки. Если кто-то начинает кривляться или съезжать — штраф обоим."
  },
  {
    id: "action_009",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд обнимайтесь так, будто это не дружеские объятия, а начало очень плохой идеи. Руки должны быть на талии, спине или бёдрах. Слабое исполнение — штраф."
  },
  {
    id: "action_010",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, сними с себя один предмет одежды, который реально меняет твой вид, и отдай {randomPlayer.dat}. {randomPlayer.nom} надевает его поверх своей одежды до следующего круга."
  },
  {
    id: "action_011",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Положи руку {randomPlayer.gen} себе на внутреннюю сторону бедра поверх одежды и держи так до следующей карточки. Убрал руку — штраф."
  },
  {
    id: "action_012",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Ваша задача — 30 секунд целоваться так, будто вы давно хотели это сделать, но всё время делали вид, что нет. Если поцелуй выглядит жалко — оба пьёте."
  },
  {
    id: "action_013",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Расстегни или сними с {randomPlayer.gen} один элемент одежды: ремень, пуговицу, молнию, кофту, рубашку или аксессуар. Всё остаётся в рамках комнаты, но выглядеть должно неприлично."
  },
  {
    id: "action_014",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего хода твоя рука должна лежать на талии, бедре или шее {randomPlayer.gen}. Сам выбираешь место, но безопасная рука на плече считается слабостью."
  },
  {
    id: "action_015",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд целуй руку {randomPlayer.gen}: пальцы, ладонь, запястье. Не как рыцарь на балу, а так, чтобы всем стало понятно, что это уже слишком."
  },
  {
    id: "action_016",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующей карточки {randomPlayer.nom} сидит у тебя между ног или ты сидишь между ног {randomPlayer.gen}. Кто именно — решает компания."
  },
  {
    id: "action_017",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, сними с себя верхнюю одежду, кофту, рубашку или футболку, если это возможно без полного раздевания. {randomPlayer.nom} должен надеть это на себя поверх своей одежды до следующего круга."
  },
  {
    id: "action_018",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд танцуй с {randomPlayer.inst} максимально близко. Не смешно, не криво, не на расстоянии метра. Тела должны касаться. Иначе штраф."
  },
  {
    id: "action_019",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в губы или в шею. Если выбираешь губы — без чмока. Если шею — не касанием на полсекунды. Компания оценивает."
  },
  {
    id: "action_020",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Ляг или сядь так, чтобы твоя голова оказалась на коленях {randomPlayer.gen}. {randomPlayer.nom} должен держать руку у тебя на волосах, лице или шее до следующей карточки."
  },
  {
    id: "action_021",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat} прямо: “Я бы тебя сейчас поцеловал”. После фразы либо целуешь, либо пьёшь штраф. Уходить в шутку нельзя."
  },
  {
    id: "action_022",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Положи ладонь на грудь, талию или бедро {randomPlayer.gen} поверх одежды и скажи: “Вот тут у тебя опасно”. Если делаешь это как робот — штраф."
  },
  {
    id: "action_023",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы изображаете сцену перед сексом: близко, тихо, напряжённо, без дурацкого смеха. Цель — чтобы всем в комнате стало неловко смотреть."
  },
  {
    id: "action_024",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя носок, ремень, лифчик, майку, кофту или любой предмет, который компания посчитает достаточно смелым. {randomPlayer.nom} надевает это на себя до следующего круга."
  },
  {
    id: "action_025",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми руку {randomPlayer.gen} и проведи ею по своей талии, бедру или шее поверх одежды. Делать быстро нельзя. Компания должна увидеть, что ты не слил задание."
  },
  {
    id: "action_026",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд дыши рядом с шеей {randomPlayer.gen}, почти касаясь губами. Можно поцеловать. Нельзя смеяться, убегать и превращать это в цирк."
  },
  {
    id: "action_027",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга держи {randomPlayer.acc} за руку так, будто вы уже вместе, но ещё никому не сказали. Если отпустили — оба пьёте."
  },
  {
    id: "action_028",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает часть одежды на тебе, которую нужно снять или расстегнуть. Если компания выбирает слишком жёстко, можно заменить на штраф, но штраф будет двойной."
  },
  {
    id: "action_029",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд гладь {randomPlayer.acc} по руке, бедру, спине или шее поверх одежды. Место выбирает {randomPlayer.nom}. Если это выглядит как массаж бабушке — штраф."
  },
  {
    id: "action_030",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь так, чтобы ваши ноги переплелись или касались друг друга до следующей карточки. Если кто-то отодвигается — оба получают штраф."
  },
  {
    id: "action_031",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в то место выше плеч, которое выберет компания: губы, щёка, шея, ухо или запястье. Самый скучный вариант не принимается."
  },
  {
    id: "action_032",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд сидите так близко, чтобы ваши лица были на расстоянии пары сантиметров. Целоваться можно. Смеяться нельзя. Первый, кто ломает атмосферу, пьёт."
  },
  {
    id: "action_033",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, где именно на теле {randomPlayer.gen} ты бы хотел оставить поцелуй. После этого либо целуешь туда, либо получаешь штраф."
  },
  {
    id: "action_034",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга ты сидишь рядом с {randomPlayer.inst}, положив руку ему на внутреннюю сторону колена или бедра поверх одежды. Убрал руку — штраф."
  },
  {
    id: "action_035",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен расстегнуть на тебе одну пуговицу, молнию, ремень или снять один аксессуар. Потом ты делаешь то же самое с {randomPlayer.inst}."
  },
  {
    id: "action_036",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд целуйте друг друга в шею, щёку или губы — место выбирает компания. Если оба уходите в безопасный вариант, оба пьёте."
  },
  {
    id: "action_037",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} на колени боком и обними за шею. Сидите так до следующей карточки. Если выглядит как дружеское фото — штраф."
  },
  {
    id: "action_038",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Произнеси вслух: “Сейчас я бы сделал с тобой глупость”. Потом либо целуешь {randomPlayer.acc}, либо пьёшь штраф."
  },
  {
    id: "action_039",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующей карточки ваша одежда должна быть как-то связана: ремень, рукав, кофта, шарф, шнурок, что угодно. Главное — чтобы вы не могли разойтись без усилия."
  },
  {
    id: "action_040",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд показывай, как бы ты соблазнял {randomPlayer.acc}, если бы это была не игра. Без слов. Только взгляд, дистанция, руки и тело. Слабое исполнение — штраф."
  },
  {
    id: "action_041",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и отдай {randomPlayer.dat}. {randomPlayer.nom} должен надеть это так, как скажет компания: на голову, на шею, на плечи или поверх одежды. До следующего круга не снимать."
  },
  {
    id: "action_042",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Завяжи себе глаза любым предметом одежды. {randomPlayer.nom} должен прикоснуться к тебе рукой, губами или дыханием в любое место выше плеч. У тебя 30 секунд, чтобы угадать, что это было. Не угадал — штраф."
  },
  {
    id: "action_043",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми кубик льда или холодный предмет и проведи им по шее, руке или ключице {randomPlayer.gen}. Медленно. Если делаешь это как врач на осмотре — штраф."
  },
  {
    id: "action_044",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен снять с тебя один аксессуар или предмет одежды зубами. Руки использовать нельзя. Если вещь слишком сложная — компания выбирает другую."
  },
  {
    id: "action_045",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы должны сидеть так, будто вас застали в самый неподходящий момент. Никаких слов. Только поза, взгляды и руки. Компания решает, поверила или нет."
  },
  {
    id: "action_046",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поставь на теле {randomPlayer.gen} один “запретный знак”: поцелуй в шею, руку, плечо или щёку. Место выбирает компания. Слишком безопасный выбор — штраф."
  },
  {
    id: "action_047",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя носок и надень его {randomPlayer.dat} на руку как перчатку. До следующего круга {randomPlayer.nom} обязан этой рукой держать тебя за колено, бедро или плечо."
  },
  {
    id: "action_048",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд медленно проводи пальцами по ладони {randomPlayer.gen}, как будто это не ладонь, а начало очень неправильной переписки. Если компания не почувствовала напряжение — штраф."
  },
  {
    id: "action_049",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, какой предмет одежды на {randomPlayer.prep} сейчас явно лишний. После этого {randomPlayer.nom} либо снимает его, либо вы оба пьёте штраф."
  },
  {
    id: "action_050",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Встань за спиной {randomPlayer.gen}, положи руки на талию и 30 секунд стой так близко, будто вы уже перешли черту, но ещё никому не сказали."
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
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один предмет на тебе. Ты снимаешь его и отдаёшь {randomPlayer.dat}. {randomPlayer.nom} решает, куда на себе это надеть. Отказ — штраф."
  },
  {
    id: "action_052",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми руку {randomPlayer.gen} и приложи её к своей шее, талии или бедру поверх одежды. Держите так до следующей карточки."
  },
  {
    id: "action_053",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд играете сцену “мы случайно закрылись в одной комнате”. Говорить можно только шёпотом. Смеяться нельзя. Компания оценивает реалистичность."
  },
  {
    id: "action_054",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Если на тебе есть бельё, которое можно снять без полного раздевания — сними его и отдай {randomPlayer.dat}. Если нет — снимаешь самый смелый предмет одежды, который разрешит компания."
  },
  {
    id: "action_055",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга {randomPlayer.nom} должен держать тебя за пояс, талию или бедро каждый раз, когда ты говоришь. Забыл — пьёт."
  },
  {
    id: "action_056",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд целуй пальцы {randomPlayer.gen} по одному. Не торопись. Если выглядело как шутка — штраф."
  },
  {
    id: "action_057",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} боком на колени и положи руку ему на шею. {randomPlayer.nom} держит тебя за талию. Сидите так до следующей карточки."
  },
  {
    id: "action_058",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Расстегни на себе одну пуговицу, молнию, ремень или ослабь один элемент одежды. Потом {randomPlayer.nom} делает с тобой то же самое. Компания выбирает, достаточно ли смело."
  },
  {
    id: "action_059",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы должны целоваться так, будто после этого будет сложно делать вид, что всё нормально. Если поцелуй сухой и трусливый — оба пьёте."
  },
  {
    id: "action_060",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания называет часть тела выше пояса. Ты должен поцеловать {randomPlayer.acc} туда. Быстро чмокнуть и убежать нельзя."
  },
  {
    id: "action_061",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми любой предмет одежды {randomPlayer.gen} и надень его на себя поверх своей одежды. До следующего круга вы выглядите как люди, у которых вечер пошёл не по плану."
  },
  {
    id: "action_062",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи лицо рядом с шеей {randomPlayer.gen}. Можно целовать, можно дышать, можно шептать. Нельзя отходить и смеяться."
  },
  {
    id: "action_063",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: ты садишься между ног {randomPlayer.gen} или {randomPlayer.nom} садится между твоих ног. Сидеть так до следующей карточки."
  },
  {
    id: "action_064",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними один предмет одежды и положи его на колени {randomPlayer.gen}. {randomPlayer.nom} должен держать его там до следующего круга."
  },
  {
    id: "action_065",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд медленно танцуй у {randomPlayer.gen} между ног или перед {randomPlayer.inst}, не касаясь руками. Если выглядело как утренник — штраф."
  },
  {
    id: "action_066",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен провести рукой по твоей спине, талии или бедру поверх одежды. Медленно. Потом ты делаешь то же самое."
  },
  {
    id: "action_067",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в губы, а потом сразу скажи: “Вот теперь делай вид, что ничего не было”. Если не целуешь — штраф."
  },
  {
    id: "action_068",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего своего хода вы сидите в одной позе: один сзади обнимает второго за талию. Кто разрывает позу — пьёт."
  },
  {
    id: "action_069",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд показывай, как бы ты раздевал {randomPlayer.acc}, но не снимая одежду полностью: жесты, руки, взгляд, движение. Если стесняешься — штраф."
  },
  {
    id: "action_070",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми {randomPlayer.acc} за руку и проведи его пальцами по своим губам, шее или ключице. Медленно. Не сделал нормально — штраф."
  },
  {
    id: "action_071",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один участок одежды на тебе, который нужно снять, расстегнуть или задрать. Не хочешь — сразу двойной штраф."
  },
  {
    id: "action_072",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд вы должны быть в позе, в которой вас было бы очень неловко случайно сфотографировать. Компания выбирает, достаточно ли компрометирующе."
  },
  {
    id: "action_073",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи, какой предмет одежды ты бы снял с {randomPlayer.gen} первым. Потом {randomPlayer.nom} либо снимает этот предмет, либо вы оба пьёте."
  },
  {
    id: "action_074",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи руку у {randomPlayer.gen} на внутренней стороне бедра поверх одежды. Не двигать туда-сюда, просто держать. Убрал — штраф."
  },
  {
    id: "action_075",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга {randomPlayer.nom} должен сидеть на твоём месте, а ты — у него между ног или рядом настолько близко, насколько скажет компания."
  },
  {
    id: "action_076",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд шепчи {randomPlayer.dat} в ухо всё, что сделал бы с ним в этой игре, если бы компания не смотрела. Потом {randomPlayer.nom} оценивает: “слабо” или “грязно”."
  },
  {
    id: "action_077",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и дай {randomPlayer.dat} выбрать, куда его на тебе завязать: глаза, руки, шея, талия или бедро."
  },
  {
    id: "action_078",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} так, чтобы после этого компания решила: это было действие или вы просто давно ждали повод?"
  },
  {
    id: "action_079",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд один из вас сидит на коленях у другого. Кто сверху — решает компания. Руки должны быть не в воздухе, а на талии, спине или бёдрах."
  },
  {
    id: "action_080",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: поцелуй в губы, поцелуй в шею, рука на бедре или предмет одежды снять. Выполняешь выбранное или получаешь штраф."
  },
  {
    id: "action_081",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один предмет одежды на тебе. Ты снимаешь его и надеваешь на {randomPlayer.acc} так, чтобы выглядело максимально неприлично, но поверх одежды. До следующего круга не снимать."
  },
  {
    id: "action_082",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Завяжи себе глаза любым предметом одежды. {randomPlayer.nom} должен прикоснуться к тебе губами, пальцами или дыханием в место выше пояса. У тебя 30 секунд угадать, чем именно тебя коснулись. Не угадал — штраф."
  },
  {
    id: "action_083",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя ремень, кофту, футболку, лифчик, носок или другой заметный предмет. Компания решает, куда {randomPlayer.nom} должен это надеть: на голову, шею, руку, талию или поверх одежды."
  },
  {
    id: "action_084",
    type: "action",
    title: "Действие",
    timer: 40,
    text: "{player.nom} и {randomPlayer.nom}, у вас 40 секунд на сцену “мы остались одни, и всё пошло не по плану”. Без слов. Только взгляды, руки, дистанция и тело. Если компания не поверила — оба пьёте."
  },
  {
    id: "action_085",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми лёд или любой холодный предмет и проведи им по шее, ключице, руке или внутренней стороне запястья {randomPlayer.gen}. Медленно. Если делаешь как врач — штраф."
  },
  {
    id: "action_086",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен снять с тебя один аксессуар или предмет одежды зубами. Руки использовать нельзя. Если вещь слишком сложная — компания выбирает другую."
  },
  {
    id: "action_087",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} на колени лицом к лицу. 30 секунд ваши руки должны быть на талии, спине, шее или бёдрах друг друга. Если руки висят без дела — штраф."
  },
  {
    id: "action_088",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи, какой предмет одежды на {randomPlayer.prep} сейчас явно лишний. {randomPlayer.nom} либо снимает его, либо вы оба получаете штраф."
  },
  {
    id: "action_089",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд целуй пальцы {randomPlayer.gen} по одному. Не торопись и не превращай это в шутку. Если выглядело слабо — штраф."
  },
  {
    id: "action_090",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: рука на бедре, поцелуй в шею, поцелуй в губы или снять один предмет одежды. Выполняешь выбранное или получаешь двойной штраф."
  },
  {
    id: "action_091",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Иди с {randomPlayer.inst} в ванную, помой один палец на руке {randomPlayer.gen}, вернись и при всех медленно поцелуй и оближи этот палец. Делать быстро и на отвали нельзя."
  },
  {
    id: "action_092",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, если на тебе есть трусы, иди в туалет, сними их и вернись. {randomPlayer.nom} надевает их поверх своей одежды до следующего круга. Если не выполняешь — штраф выбирает компания."
  },
  {
    id: "action_093",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд показывай, как бы ты раздевал {randomPlayer.acc}, но не снимая одежду полностью: руки, взгляд, движения, дистанция. Если стесняешься — штраф."
  },
  {
    id: "action_094",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь у {randomPlayer.gen} между ног и положи руки {randomPlayer.gen} себе на плечи или шею. Сидеть так до следующей карточки."
  },
  {
    id: "action_095",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми руку {randomPlayer.gen} и проведи ею по своей талии, шее или бедру поверх одежды. Медленно. Если компания говорит, что ты слил — штраф."
  },
  {
    id: "action_096",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд вы должны быть в позе, в которой вас было бы стыдно случайно сфотографировать. Компания решает, достаточно ли компрометирующе."
  },
  {
    id: "action_097",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Расстегни на себе одну пуговицу, молнию, ремень или ослабь один элемент одежды. Потом {randomPlayer.nom} делает то же самое с собой. Если оба выбрали слишком безопасно — оба пьёте."
  },
  {
    id: "action_098",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи лицо рядом с шеей {randomPlayer.gen}. Можно целовать, можно дышать, можно шептать. Нельзя отходить и ржать."
  },
  {
    id: "action_099",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает часть тела выше пояса. Ты должен поцеловать {randomPlayer.acc} туда. Быстро чмокнуть и убежать нельзя."
  },
  {
    id: "action_100",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и положи его на колени {randomPlayer.gen}. {randomPlayer.nom} должен держать его там до следующего круга."
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
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд медленно танцуй перед {randomPlayer.inst} или у {randomPlayer.gen} между ног, не касаясь руками. Если выглядело как детская дискотека — штраф."
  },
  {
    id: "action_102",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен провести рукой по твоей спине, талии или бедру поверх одежды. Медленно. Потом ты делаешь то же самое."
  },
  {
    id: "action_103",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в губы, а потом сразу скажи: “Вот теперь делай вид, что ничего не было”. Если не целуешь — штраф."
  },
  {
    id: "action_104",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего своего хода вы сидите в одной позе: один сзади обнимает второго за талию. Кто разрывает позу — пьёт."
  },
  {
    id: "action_105",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми {randomPlayer.acc} за руку и проведи его пальцами по своим губам, шее или ключице. Медленно. Не сделал нормально — штраф."
  },
  {
    id: "action_106",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, компания выбирает один участок одежды на тебе, который нужно снять, расстегнуть или задрать. Не хочешь — сразу двойной штраф."
  },
  {
    id: "action_107",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи, какой предмет одежды ты бы снял с {randomPlayer.gen} первым. Потом {randomPlayer.nom} либо снимает этот предмет, либо вы оба пьёте."
  },
  {
    id: "action_108",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи руку на внутренней стороне бедра {randomPlayer.gen} поверх одежды. Не двигать туда-сюда, просто держать. Убрал — штраф."
  },
  {
    id: "action_109",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга {randomPlayer.nom} должен сидеть на твоём месте, а ты — у него между ног или рядом настолько близко, насколько скажет компания."
  },
  {
    id: "action_110",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд шепчи {randomPlayer.dat} в ухо всё, что сделал бы с ним в этой игре, если бы компания не смотрела. Потом {randomPlayer.nom} оценивает: “слабо” или “грязно”."
  },
  {
    id: "action_111",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и дай {randomPlayer.dat} выбрать, куда его на тебе завязать: глаза, руки, шея, талия или бедро."
  },
  {
    id: "action_112",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} так, чтобы после этого компания решила: это было действие или вы просто давно ждали повод."
  },
  {
    id: "action_113",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд один из вас сидит на коленях у другого. Кто сверху — решает компания. Руки должны быть не в воздухе, а на талии, спине или бёдрах."
  },
  {
    id: "action_114",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает одну вещь на {randomPlayer.prep}. Ты должен снять её зубами или губами, если это реально. Если нельзя — выбирается другая вещь."
  },
  {
    id: "action_115",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы сидите в тишине, касаясь лбами или носами. Целоваться можно. Смеяться нельзя. Кто первый ломается — штраф."
  },
  {
    id: "action_116",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Проведи пальцем по губам {randomPlayer.gen}, потом по своей шее. Медленно, при всех. Если выглядит как случайное движение — штраф."
  },
  {
    id: "action_117",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Попроси {randomPlayer.acc} снять с тебя один предмет одежды или аксессуар. После этого ты снимаешь с {randomPlayer.gen} один предмет. Всё остаётся в комнате до следующего круга."
  },
  {
    id: "action_118",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд играете сцену “последний шанс перед тем, как всё станет ошибкой”. Можно касаться лица, шеи, талии и рук. Компания решает, поверила или нет."
  },
  {
    id: "action_119",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующей карточки вы должны сидеть так, чтобы одна рука {randomPlayer.gen} была у тебя на бедре, а твоя — на талии или шее {randomPlayer.gen}."
  },
  {
    id: "action_120",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: снять предмет одежды, поцеловать, сесть на колени, рука на бедре или шёпот на ухо. Выполняешь без торговли или получаешь штраф."
  },
  {
    id: "action_121",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает один предмет одежды на тебе. Ты снимаешь его и надеваешь {randomPlayer.dat} на голову, шею или талию. До следующего круга не снимать."
  },
  {
    id: "action_122",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд вы целуетесь так, будто это не карточка, а повод, который вы оба давно ждали. Быстрый чмок не засчитывается. Если компания говорит “слабо” — оба пьёте."
  },
  {
    id: "action_123",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующей карточки твоя рука лежит на ляжке {randomPlayer.gen}. Не на колене, не рядом, не на воздухе. Убрал руку — штраф."
  },
  {
    id: "action_124",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, если на тебе есть лифчик — сними его через футболку и надень {randomPlayer.dat} на голову. Если лифчика нет — снимаешь самый смелый предмет одежды, который разрешит компания."
  },
  {
    id: "action_125",
    type: "action",
    title: "Действие",
    timer: 40,
    text: "{player.nom}, выбери {randomPlayer.acc}. 40 секунд вы сидите так, будто вас застали в середине очень неправильного момента. Руки должны быть на талии, бёдрах, шее или спине. Если выглядит безопасно — штраф."
  },
  {
    id: "action_126",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Иди с {randomPlayer.inst} в ванную, помой один палец на руке {randomPlayer.gen}, вернись и при всех медленно оближи этот палец. Быстро и смешно не считается."
  },
  {
    id: "action_127",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь у {randomPlayer.gen} между ног и положи руки {randomPlayer.gen} себе на плечи. Сидеть так до следующей карточки. Начал оправдываться — пьёшь."
  },
  {
    id: "action_128",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и отдай {randomPlayer.dat}. {randomPlayer.nom} должен надеть его поверх своей одежды так, как скажет компания."
  },
  {
    id: "action_129",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд целуй {randomPlayer.acc} в шею, губы или щёку. Место выбирает компания. Сухой чмок и побег не засчитываются."
  },
  {
    id: "action_130",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, иди в туалет и сними один предмет одежды, который компания не видит сейчас напрямую. Вернись и отдай его {randomPlayer.dat}. {randomPlayer.nom} носит это поверх одежды до следующего круга."
  },
  {
    id: "action_131",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Положи руку {randomPlayer.gen} себе на талию, шею или бедро. Рука остаётся там до следующей карточки. Если убрали раньше — оба пьёте."
  },
  {
    id: "action_132",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд медленно танцуй перед {randomPlayer.inst} так близко, чтобы компания перестала делать вид, что это просто танец. Если выглядело как шутка — штраф."
  },
  {
    id: "action_133",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает одну вещь на {randomPlayer.prep}. Ты должен снять её зубами или губами, если это реально. Если вещь неудобная — компания выбирает другую."
  },
  {
    id: "action_134",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сядь к {randomPlayer.dat} на колени боком и обними за шею. {randomPlayer.nom} держит тебя за талию или бедро до следующей карточки."
  },
  {
    id: "action_135",
    type: "action",
    title: "Действие",
    timer: 25,
    text: "{player.nom}, выбери {randomPlayer.acc}. 25 секунд целуй руку {randomPlayer.gen}: пальцы, ладонь, запястье. Не как рыцарь, а так, чтобы всем стало неловко смотреть."
  },
  {
    id: "action_136",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Скажи {randomPlayer.dat}, какой предмет одежды ты бы снял с {randomPlayer.gen} первым. Потом {randomPlayer.nom} либо снимает этот предмет, либо вы оба пьёте."
  },
  {
    id: "action_137",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, 30 секунд вы должны быть в позе, в которой вас было бы стыдно случайно увидеть родителям. Компания решает, достаточно ли компрометирующе."
  },
  {
    id: "action_138",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Проведи пальцами по губам {randomPlayer.gen}, потом по своей шее. Медленно, при всех. Если движение выглядит случайным — штраф."
  },
  {
    id: "action_139",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующего круга вы сидите так близко, чтобы ваши ноги касались друг друга. Если кто-то отодвинулся — пьёте оба."
  },
  {
    id: "action_140",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд шепчи {randomPlayer.dat} в ухо, что бы ты сделал с ним в этой игре, если бы компания не смотрела. Потом {randomPlayer.nom} оценивает: “слабо” или “грязно”."
  },
  {
    id: "action_141",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Компания выбирает: рука на ляжке, поцелуй в губы, поцелуй в шею, снять предмет одежды или сесть на колени. Выполняешь без торговли или получаешь двойной штраф."
  },
  {
    id: "action_142",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Сними с себя один предмет одежды и дай {randomPlayer.dat} выбрать, куда его на тебе завязать: глаза, шея, руки, талия или бедро."
  },
  {
    id: "action_143",
    type: "action",
    title: "Действие",
    timer: 20,
    text: "{player.nom}, выбери {randomPlayer.acc}. 20 секунд держи лицо рядом с шеей {randomPlayer.gen}. Можно целовать, можно шептать, можно дышать рядом. Нельзя ржать и отходить."
  },
  {
    id: "action_144",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. {randomPlayer.nom} должен расстегнуть на тебе одну пуговицу, молнию, ремень или снять один аксессуар. Потом ты делаешь то же самое с {randomPlayer.inst}."
  },
  {
    id: "action_145",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Поцелуй {randomPlayer.acc} в губы, а потом скажи: “Теперь делай вид, что ничего не было”. Если не целуешь — штраф."
  },
  {
    id: "action_146",
    type: "action",
    title: "Действие",
    timer: 45,
    text: "{player.nom}, выбери {randomPlayer.acc}. 45 секунд вы играете сцену “мы не должны были оставаться одни”. Можно касаться лица, шеи, рук, талии и бёдер. Если компания не поверила — оба пьёте."
  },
  {
    id: "action_147",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Возьми руку {randomPlayer.gen} и проведи его пальцами по своим губам, шее или ключице. Медленно. Если делаешь на отвали — штраф."
  },
  {
    id: "action_148",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. До следующей карточки одна рука {randomPlayer.gen} должна лежать у тебя на бедре, а твоя — на талии, шее или спине {randomPlayer.gen}."
  },
  {
    id: "action_149",
    type: "action",
    title: "Действие",
    timer: 30,
    text: "{player.nom}, выбери {randomPlayer.acc}. 30 секунд показывай, как бы ты соблазнял {randomPlayer.acc}, если бы это была не игра. Без слов. Только взгляд, руки, дистанция и тело. Слабое исполнение — штраф."
  },
  {
    id: "action_150",
    type: "action",
    title: "Действие",
    timer: null,
    text: "{player.nom}, выбери {randomPlayer.acc}. Финальная грязная карточка: компания выбирает одно действие — поцелуй, раздевание одного предмета, рука на ляжке, сесть на колени или шёпот на ухо. Выполняешь выбранное или получаешь самый жёсткий штраф вечера."
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
    text: "{player.nom}, был ли у тебя секс, поцелуй или переписка, после которых ты думал: “Вот это лучше никому не рассказывать”? Без имён, но расскажи, почему именно это лучше было бы скрыть."
  },
  {
    id: "truth_002",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел человека, с которым нельзя было ничего начинать? Ответь честно: да или нет. Что сильнее цепляло: запрет, тело, характер, секс или то, что человек был недоступен?"
  },
  {
    id: "truth_003",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, была ли у тебя переписка, которую ты бы очень не хотел показывать партнёру? Что там было: флирт, грязные намёки, фото, планы или просто слишком честные сообщения?"
  },
  {
    id: "truth_004",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой комнаты выглядит так, будто в постели он совсем не такой спокойный, каким кажется? Назови имя и объясни, почему ты так решил."
  },
  {
    id: "truth_005",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя человек, к которому ты возвращался не из-за чувств, а потому что физически тянуло? Ответь честно. Оно того стоило?"
  },
  {
    id: "truth_006",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь врал, что тебе всё равно, хотя внутри тебя разрывало от ревности? Расскажи, из-за кого или из-за какой ситуации."
  },
  {
    id: "truth_007",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя момент, когда ты специально провоцировал человека на ревность, внимание или желание? Что ты сделал и сработало ли?"
  },
  {
    id: "truth_008",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из компании, по твоему мнению, чаще всего делает вид, что он невинный, хотя по глазам видно: там целая коллекция грязных историй? Назови имя."
  },
  {
    id: "truth_009",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя был секс, поцелуй или переписка, о которой ты потом жалел не потому, что не понравилось, а потому что последствия могли быть слишком дорогими?"
  },
  {
    id: "truth_010",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь скрывал реальное количество партнёров, потому что правда звучала бы не так красиво, как хотелось? Ответ “нет” компания имеет право не принять."
  },
  {
    id: "truth_011",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли человек, которого ты хотел только физически, но сам себе пытался объяснить, что это “просто интересное общение”?"
  },
  {
    id: "truth_012",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кого из этой комнаты ты бы первым заподозрил в тайной грязной переписке? Назови имя и объясни, почему именно этот человек."
  },
  {
    id: "truth_013",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя была сексуальная фантазия, которую ты до сих пор не озвучивал партнёру, потому что звучит слишком смело, странно или грязно? Без подробностей можно, но категорию назови."
  },
  {
    id: "truth_014",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь продолжал флирт, хотя понимал, что уже переходишь границу? Почему не остановился: скука, азарт, желание, алкоголь или просто понравилось?"
  },
  {
    id: "truth_015",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы компания могла увидеть одну твою удалённую переписку, тебе было бы смешно, стыдно или страшно? Выбери одно и объясни почему."
  },
  {
    id: "truth_016",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс, после которого ты понял: человек тебе не подходит, но тело сказало “мне плевать”? Расскажи без имён."
  },
  {
    id: "truth_017",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь мастурбировал на человека, с которым лично знаком? Не надо деталей, просто ответь: да или нет. Если да — это был друг, знакомый, бывший или кто-то запретный?"
  },
  {
    id: "truth_018",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя момент, когда ты хотел изменить или уже был слишком близко к этому? Что остановило или почему не остановило?"
  },
  {
    id: "truth_019",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой компании, по твоему мнению, чаще всего думает о сексе, но делает вид, что он приличный человек? Назови имя."
  },
  {
    id: "truth_020",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя партнёр, с которым всё держалось почти только на сексе? Если да — долго это продержалось?"
  },
  {
    id: "truth_021",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь скрывал, что тебе кто-то нравится, потому что этот человек был слишком неудобным вариантом? Почему неудобным?"
  },
  {
    id: "truth_022",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какой самый грязный комплимент тебе реально хотелось бы услышать, но вслух ты бы сделал вид, что возмущён?"
  },
  {
    id: "truth_023",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс или поцелуй по пьяни, после которого утром хотелось либо повторить, либо умереть от стыда? Что было сильнее?"
  },
  {
    id: "truth_024",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел человека из компании друзей, но делал вид, что это просто шутки? Ответь честно: да или нет."
  },
  {
    id: "truth_025",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что тебе сложнее признать: что ты ревнивый, что ты пошлый, что ты быстро привязываешься или что тебе иногда нравится запретное?"
  },
  {
    id: "truth_026",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя человек, которому ты писал ночью совсем не потому, что хотел поговорить? Что ты на самом деле хотел?"
  },
  {
    id: "truth_027",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы тебе пришлось выбрать одного человека из комнаты для поцелуя прямо сейчас, кто бы это был? Имя назвать обязательно. Объяснять можно одной фразой."
  },
  {
    id: "truth_028",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс, который ты вспоминаешь не потому, что были чувства, а потому что было очень хорошо физически?"
  },
  {
    id: "truth_029",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что из этого ты делал чаще: флиртовал от скуки, провоцировал ревность, удалял переписки или делал вид, что ничего не понимаешь?"
  },
  {
    id: "truth_030",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из компании выглядит так, будто у него есть история, после которой все скажут: “Так вот ты какой человек”? Назови имя."
  },
  {
    id: "truth_031",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь занимался сексом с человеком, хотя понимал, что эмоционально потом будет только хуже? Почему всё равно пошёл на это?"
  },
  {
    id: "truth_032",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя человек, которого ты не любил, но хотел так сильно, что сам себе врал? Что в нём так цепляло?"
  },
  {
    id: "truth_033",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что самое неприличное ты хотел написать человеку, но в итоге стёр сообщение?"
  },
  {
    id: "truth_034",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя была ситуация, где ты сам понимал: ещё одно сообщение — и это уже измена, но всё равно хотел отправить?"
  },
  {
    id: "truth_035",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кого из этой комнаты ты бы назвал самым опасным после алкоголя именно в плане флирта, поцелуев и плохих решений?"
  },
  {
    id: "truth_036",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя был партнёр, с которым ты думал о другом человеке? Ответь честно: да или нет. Если да — это был бывший, знакомый или фантазия?"
  },
  {
    id: "truth_037",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь хотел, чтобы тебя кто-то из друзей поцеловал первым, чтобы тебе не пришлось брать ответственность?"
  },
  {
    id: "truth_038",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какая часть тела у людей чаще всего цепляет тебя первой? Не “глаза”, если это просто безопасный ответ. Говори честно."
  },
  {
    id: "truth_039",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс, после которого ты сразу понял: повторять не надо, но забыть тоже не получится?"
  },
  {
    id: "truth_040",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы одна твоя фантазия стала известна всей компании, тебе было бы больше стыдно или смешно?"
  },
  {
    id: "truth_041",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание переспать с человеком просто из принципа: потому что он слишком недоступный, самоуверенный или запретный?"
  },
  {
    id: "truth_042",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой компании, по твоему мнению, лучше всех умеет скрывать, что ему кто-то нравится?"
  },
  {
    id: "truth_043",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь соглашался на встречу, уже понимая, что разговором всё точно не закончится?"
  },
  {
    id: "truth_044",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя такое, что ты хотел не отношений, а только секса, но не говорил об этом прямо?"
  },
  {
    id: "truth_045",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, у тебя был человек, которого ты не хотел возвращать в жизнь, но хотел вернуть в постель?"
  },
  {
    id: "truth_046",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из этой комнаты, по твоему мнению, больше всех врёт фразой “я не ревнивый”?"
  },
  {
    id: "truth_047",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь проверял лайки, подписки, сторис или время онлайн человека, который тебе якобы был безразличен?"
  },
  {
    id: "truth_048",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, что для тебя опаснее: человек, который хорошо целуется, человек, который красиво врёт, или человек, который умеет молчать в нужный момент?"
  },
  {
    id: "truth_049",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, была ли у тебя ситуация, где ты понимал: “если мы сейчас останемся одни, всё случится”?"
  },
  {
    id: "truth_050",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из компании, по твоему мнению, после пары бокалов становится намного опаснее, чем кажется трезвым?"
  },
  {
    id: "truth_051",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, был ли у тебя секс или поцелуй с человеком, к которому ты потом относился иначе, хотя пытался делать вид, что ничего не изменилось?"
  },
  {
    id: "truth_052",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какая твоя самая стыдная привычка в отношениях: ревновать, проверять, молчать, провоцировать или делать вид, что тебе всё равно?"
  },
  {
    id: "truth_053",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь начинал переписку только ради того, чтобы почувствовать, что тебя хотят?"
  },
  {
    id: "truth_054",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя желание заняться сексом с человеком именно потому, что это было бы неправильно?"
  },
  {
    id: "truth_055",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, кто из компании, по твоему мнению, больше всех умеет включать невинное лицо после очень грязных мыслей?"
  },
  {
    id: "truth_056",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, ты когда-нибудь жалел не о том, что поцеловал человека, а о том, что не пошёл дальше?"
  },
  {
    id: "truth_057",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, было ли у тебя такое, что ты хотел человека, но отталкивал его, потому что сам испугался, насколько сильно хотел?"
  },
  {
    id: "truth_058",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, какой вопрос про твою личную жизнь ты меньше всего хотел бы сейчас услышать от компании?"
  },
  {
    id: "truth_059",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, если бы нужно было честно признаться: ты чаще соблазняешь, поддаёшься или делаешь вид, что случайно всё произошло?"
  },
  {
    id: "truth_060",
    type: "truth",
    title: "Правда",
    timer: null,
    text: "{player.nom}, назови одного человека из компании, который, по твоему мнению, умеет быть самым опасным в тихую. Объясни почему."
  }
];

const NEVER_CARDS_001_040 = [
  {
    id: "never_001",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не удалял переписку, потому что понимал: если её увидят, начнётся жопа. Кто делал — пьёт."
  },
  {
    id: "never_002",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не представлял кого-то другого, занимаясь сексом не с тем человеком. Кто делал — пьёт."
  },
  {
    id: "never_003",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не мастурбировал на человека, с которым лично знаком, но не состоял в отношениях. Кто делал — пьёт."
  },
  {
    id: "never_004",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не врал, что между нами ничего не было, хотя сам прекрасно понимал, что было. Кто делал — пьёт."
  },
  {
    id: "never_005",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не возвращался к человеку только потому, что в постели с ним было слишком хорошо. Кто делал — пьёт."
  },
  {
    id: "never_006",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не флиртовал с человеком, который был занят, и делал вид, что это просто дружеское общение. Кто делал — пьёт."
  },
  {
    id: "never_007",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел поцеловать человека, с которым потом пришлось бы делать вид, что ничего не произошло. Кто хотел — пьёт."
  },
  {
    id: "never_008",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не ревновал человека, с которым официально ничего не было. Кто ревновал — пьёт."
  },
  {
    id: "never_009",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не смотрел на друга или подругу и не думал: “Вот это могло бы быть ошибкой, но какой”. Кто думал — пьёт."
  },
  {
    id: "never_010",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не скрывал, с кем реально был вечером, потому что правда звучала бы слишком плохо. Кто скрывал — пьёт."
  },
  {
    id: "never_011",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не отправлял сообщение с намёком, а потом делал вид, что меня просто не так поняли. Кто отправлял — пьёт."
  },
  {
    id: "never_012",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел попробовать что-то в сексе, но стеснялся сказать об этом вслух. Кто хотел — пьёт."
  },
  {
    id: "never_013",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не был в ситуации, где поцелуй был явно лишним, но именно поэтому хотелось ещё сильнее. Кто был — пьёт."
  },
  {
    id: "never_014",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не сравнивал нынешнего или бывшего партнёра с другим человеком в голове. Кто сравнивал — пьёт."
  },
  {
    id: "never_015",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не говорил “я просто спать”, а сам продолжал грязную или подозрительную переписку. Кто делал — пьёт."
  },
  {
    id: "never_016",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел переспать с человеком только потому, что это было бы неправильно. Кто хотел — пьёт."
  },
  {
    id: "never_017",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не возвращался к бывшему или бывшей только ради секса. Кто возвращался — пьёт."
  },
  {
    id: "never_018",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел, чтобы меня поцеловали первым, потому что самому было страшно начать. Кто хотел — пьёт."
  },
  {
    id: "never_019",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не флиртовал с кем-то просто чтобы проверить, могу ли ещё заинтересовать человека. Кто делал — пьёт."
  },
  {
    id: "never_020",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не занимался сексом, а потом жалел не о сексе, а о том, с кем это было. Кто жалел — пьёт."
  },
  {
    id: "never_021",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не смотрел на человека в компании и не представлял, как он целуется. Кто представлял — пьёт."
  },
  {
    id: "never_022",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не проверял телефон, лайки, сторис или онлайн человека, который мне якобы был безразличен. Кто проверял — пьёт."
  },
  {
    id: "never_023",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не говорил “мы просто друзья”, хотя сам понимал, что там уже не совсем дружба. Кто говорил — пьёт."
  },
  {
    id: "never_024",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел секса с человеком, которого терпеть не мог. Кто хотел — пьёт."
  },
  {
    id: "never_025",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не скрывал фантазию, потому что она звучит слишком грязно для приличного разговора. Кто скрывал — пьёт."
  },
  {
    id: "never_026",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел поцеловать друга или подругу просто чтобы понять, что будет дальше. Кто хотел — пьёт."
  },
  {
    id: "never_027",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не был в переписке, где одно сообщение могло всё испортить, но именно поэтому хотелось отправить. Кто был — пьёт."
  },
  {
    id: "never_028",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не занимался сексом с человеком, к которому не было чувств, но было слишком сильное желание. Кто делал — пьёт."
  },
  {
    id: "never_029",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не думал о человеке из прошлого во время близости с другим. Кто думал — пьёт."
  },
  {
    id: "never_030",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел, чтобы меня застали в ситуации, где уже всё очевидно, но ещё можно было сделать вид, что ничего не было. Кто хотел — пьёт."
  },
  {
    id: "never_031",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не начинал разговор только ради того, чтобы он закончился флиртом. Кто начинал — пьёт."
  },
  {
    id: "never_032",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел раздеть человека глазами и понимал, что это слишком заметно. Кто хотел — пьёт."
  },
  {
    id: "never_033",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не ревновал человека к тому, с кем у меня вообще не было права ревновать. Кто ревновал — пьёт."
  },
  {
    id: "never_034",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не флиртовал с бывшим или бывшей, хотя понимал, что ничем хорошим это не закончится. Кто делал — пьёт."
  },
  {
    id: "never_035",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел повторить секс с человеком, с которым в обычной жизни лучше вообще не связываться. Кто хотел — пьёт."
  },
  {
    id: "never_036",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не врал, что заснул, хотя просто не хотел объяснять, где я и с кем. Кто врал — пьёт."
  },
  {
    id: "never_037",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел, чтобы человек сам понял мой намёк и сделал первый шаг. Кто хотел — пьёт."
  },
  {
    id: "never_038",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не делал вид, что случайно прикоснулся, хотя всё было специально. Кто делал — пьёт."
  },
  {
    id: "never_039",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не хотел попробовать что-то в постели только потому, что это звучит стыдно. Кто хотел — пьёт."
  },
  {
    id: "never_040",
    type: "never",
    title: "Я никогда не",
    timer: null,
    text: "Я никогда не жалел, что остановился слишком рано. Кто жалел — пьёт."
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
    text: "Все садятся по кругу, по возможности чередуясь. Первый игрок берёт карту губами и передаёт следующему без рук. На всё есть 30 секунд. Если карта падает — те двое, между кем она упала, целуются. Если круг успели пройти до конца — карта кладётся в центр, и все выпивают. Если время вышло до завершения круга — человек, на ком остановилась карта, целует всех людей противоположного пола в губы, а своего пола — в обе щеки."
  },
  {
    id: "mini_002",
    type: "mini_game",
    title: "Горячее кресло",
    timer: 60,
    text: "{player.nom} садится в центр внимания. У компании есть 60 секунд, чтобы задавать максимально личные и пошлые вопросы. Один вопрос можно пропустить. Второй пропуск — штраф. Если ответ слишком безопасный, компания имеет право сказать: “не засчитано”."
  },
  {
    id: "mini_003",
    type: "mini_game",
    title: "Опасная пара",
    timer: null,
    text: "Компания выбирает двух людей, между которыми сегодня самая подозрительная химия. Они садятся рядом до следующего круга. Один кладёт руку второму на бедро, второй — руку на талию или шею первому. Каждый раз, когда кто-то оправдывается, краснеет или говорит “да вы что” — оба пьют."
  },
  {
    id: "mini_004",
    type: "mini_game",
    title: "Бутылочка без бутылочки",
    timer: null,
    text: "{player.nom} закрывает глаза. Компания молча выбирает одного человека. {player.nom} открывает глаза и должен угадать, кого выбрали. Если угадал — целует выбранного человека в губы. Если не угадал — целует в щёку того, на кого указал, и получает штраф."
  },
  {
    id: "mini_005",
    type: "mini_game",
    title: "Слишком близко",
    timer: 45,
    text: "{player.nom} и {randomPlayer.nom} садятся лицом друг к другу на расстоянии ладони. 45 секунд нельзя смеяться, отворачиваться и комментировать. Можно касаться рук, лица, шеи и талии. Кто первый ломает атмосферу — получает штраф."
  },
  {
    id: "mini_006",
    type: "mini_game",
    title: "Раздень манекен",
    timer: 60,
    text: "Компания выбирает одного игрока-манекена и одного игрока-стилиста. За 60 секунд стилист должен снять с манекена или расстегнуть три элемента: аксессуар, ремень, пуговицу, кофту, носок, резинку, верхний слой одежды. Всё остаётся в рамках комнаты. Если получилось слишком скромно — оба пьют."
  },
  {
    id: "mini_007",
    type: "mini_game",
    title: "Дуэль: выдержи взгляд",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, дуэль. Сядьте напротив друг друга. 30 секунд смотрите в глаза, лица на расстоянии пары сантиметров. Целоваться можно. Смеяться нельзя. Первый, кто отвёл взгляд, засмеялся или начал говорить — проиграл и получает штраф."
  },
  {
    id: "mini_008",
    type: "mini_game",
    title: "Слепое касание",
    timer: 45,
    text: "{player.nom} закрывает глаза. Компания выбирает одного человека, который должен прикоснуться к {player.dat} губами, пальцами или дыханием в место выше пояса. У {player.gen} есть 45 секунд, чтобы угадать, кто это был и чем именно коснулся. Не угадал — штраф."
  },
  {
    id: "mini_009",
    type: "mini_game",
    title: "Компромат-поза",
    timer: 30,
    text: "Компания выбирает двух игроков. У них 30 секунд, чтобы принять позу, в которой их было бы стыдно случайно сфотографировать. Руки не должны висеть без дела. Компания голосует: “засчитано” или “слишком слабо”. Если слабо — оба пьют."
  },
  {
    id: "mini_010",
    type: "mini_game",
    title: "Кто кого хотел бы",
    timer: null,
    text: "Все одновременно показывают на человека, с которым, по мнению компании, {player.nom} мог бы наделать самых грязных ошибок. Человек, набравший больше всего голосов, садится рядом с {player.inst} до следующего круга. {player.nom} должен сказать, согласен он с выбором или нет."
  },
  {
    id: "mini_011",
    type: "mini_game",
    title: "Ледяная дорожка",
    timer: null,
    text: "{player.nom} выбирает {randomPlayer.acc}. Компания даёт лёд или холодный предмет. {player.nom} проводит им по шее, руке, ключице или запястью {randomPlayer.gen}. Потом {randomPlayer.nom} делает то же самое с {player.inst}. Кто делает слишком быстро и скучно — пьёт."
  },
  {
    id: "mini_012",
    type: "mini_game",
    title: "Грязный комплимент",
    timer: 60,
    text: "Каждый по очереди говорит {player.dat} комплимент, от которого должно стать неловко или жарко. Нельзя говорить про характер, доброту и “красивые глаза” без объяснения. У кого самый слабый комплимент — пьёт."
  },
  {
    id: "mini_013",
    type: "mini_game",
    title: "Круг плохих решений",
    timer: 90,
    text: "По кругу каждый игрок отвечает на вопрос: “С кем из этой комнаты у меня могла бы случиться самая неправильная история?” Имя назвать обязательно. Повторять уже названного человека нельзя. Кто отказывается — штраф."
  },
  {
    id: "mini_014",
    type: "mini_game",
    title: "Одежда пошла",
    timer: 60,
    text: "Компания выбирает направление круга. Каждый игрок за 60 секунд должен передать соседу один предмет одежды или аксессуар: ремень, кофту, браслет, носок, резинку, рубашку, шарф. Все надевают полученное поверх своей одежды. Кто выбирает слишком скучно — пьёт."
  },
  {
    id: "mini_015",
    type: "mini_game",
    title: "Суд компании",
    timer: null,
    text: "Компания выбирает самого подозрительного игрока вечера. Этот человек садится в центр и отвечает: “Что обо мне лучше не знать тем, с кем я встречаюсь?” Если ответ скучный или слишком приличный — компания назначает штраф."
  },
  {
    id: "mini_016",
    type: "mini_game",
    title: "Поцелуйная цепочка",
    timer: 60,
    text: "За 60 секунд по кругу каждый должен поцеловать следующего игрока туда, куда выберет компания: губы, щёка, шея, рука, запястье. Быстрый сухой чмок не засчитывается. Если круг не успел пройти — человек, на ком остановились, получает штраф."
  },
  {
    id: "mini_017",
    type: "mini_game",
    title: "Тайная метка",
    timer: null,
    text: "{player.nom} выбирает {randomPlayer.acc} и оставляет на {randomPlayer.prep} “метку”: поцелуй в шею, щёку, руку, запястье или плечо. Компания выбирает место. {randomPlayer.nom} не имеет права стирать или прятать это до следующего круга."
  },
  {
    id: "mini_018",
    type: "mini_game",
    title: "Дуэль: кто соблазнит взглядом",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom}, дуэль. 30 секунд вы молча соблазняете друг друга взглядом, позой и руками, не целуясь. Компания выбирает победителя. Проигравший садится к победителю ближе до следующей карточки."
  },
  {
    id: "mini_019",
    type: "mini_game",
    title: "Проверка химии",
    timer: 45,
    text: "{player.nom} и {randomPlayer.nom} садятся рядом. 45 секунд один держит руку на бедре второго, второй — руку на шее или талии первого. Нельзя смеяться и оправдываться. После таймера компания голосует: “есть химия” или “не верим”. Если “не верим” — оба пьют."
  },
  {
    id: "mini_020",
    type: "mini_game",
    title: "Шёпот грязных мыслей",
    timer: 60,
    text: "{player.nom} садится в центр. Каждый игрок по очереди шепчет {player.dat} на ухо одну пошлую фразу, комплимент или желание. {player.nom} выбирает самую сильную фразу. Автор самой слабой пьёт."
  },
  {
    id: "mini_021",
    type: "mini_game",
    title: "Кто спалился",
    timer: null,
    text: "Все одновременно показывают на человека, который, по мнению компании, чаще всего врёт фразой “мы просто общаемся”. Победитель должен рассказать одну историю, где всё выглядело подозрительно. Отказ — штраф."
  },
  {
    id: "mini_022",
    type: "mini_game",
    title: "Один предмет лишний",
    timer: null,
    text: "Компания выбирает двух игроков. Каждый должен назвать один предмет одежды на другом, который сейчас лишний. После этого оба либо снимают названный предмет, либо получают штраф. Если назвали слишком безопасно — компания выбирает сама."
  },
  {
    id: "mini_023",
    type: "mini_game",
    title: "Ванная сцена",
    timer: 90,
    text: "{player.nom} выбирает {randomPlayer.acc}. Они уходят в ванную на 90 секунд. Там {player.nom} моет {randomPlayer.dat} один палец на руке. После возвращения {player.nom} при всех целует или облизывает этот палец. Если возвращаются без выполнения — оба получают штраф."
  },
  {
    id: "mini_024",
    type: "mini_game",
    title: "Не трогай — проиграешь",
    timer: 30,
    text: "{player.nom} и {randomPlayer.nom} садятся очень близко. 30 секунд нельзя отодвигаться. Компания выбирает, где должны лежать руки: бедро, талия, шея, спина или колено. Кто убрал руку первым — проиграл."
  },
  {
    id: "mini_025",
    type: "mini_game",
    title: "Дуэль: грязная правда",
    timer: null,
    text: "{player.nom} и {randomPlayer.nom} по очереди отвечают на вопрос: “Что во мне может быть опасным для чужих нервов и чужих отношений?” Компания выбирает, чей ответ честнее. Проигравший пьёт."
  },
  {
    id: "mini_026",
    type: "mini_game",
    title: "Поцелуй на выбор компании",
    timer: null,
    text: "Компания выбирает двух игроков и место поцелуя: губы, шея, щёка, рука, запястье или плечо. Игроки выполняют. Если кто-то превращает это в шутку или делает слишком быстро — получает штраф."
  },
  {
    id: "mini_027",
    type: "mini_game",
    title: "Смена владельца",
    timer: null,
    text: "Каждый игрок выбирает один предмет на себе и отдаёт человеку справа. Получатель надевает это поверх одежды. Предмет должен быть заметным. Если кто-то отдаёт слишком мелкую ерунду, компания назначает ему штраф."
  },
  {
    id: "mini_028",
    type: "mini_game",
    title: "Тело говорит",
    timer: 45,
    text: "{player.nom} и {randomPlayer.nom} играют сцену без слов: “мы хотим, но не признаёмся”. Можно касаться рук, шеи, талии, лица, бедра поверх одежды. 45 секунд. Если компания не поверила — оба пьют."
  },
  {
    id: "mini_029",
    type: "mini_game",
    title: "Самый опасный после алкоголя",
    timer: null,
    text: "Все одновременно показывают на человека, который после алкоголя становится самым опасным в плане флирта, поцелуев и плохих решений. Победитель должен выбрать человека и сесть с ним в максимально близкую позу до следующего круга."
  },
  {
    id: "mini_030",
    type: "mini_game",
    title: "Три касания",
    timer: 30,
    text: "{player.nom} выбирает {randomPlayer.acc}. За 30 секунд {player.nom} должен сделать три касания: рука, талия или бедро; шея или плечо; лицо или волосы. Всё поверх одежды. Если одно касание выглядит трусливо — штраф."
  },
  {
    id: "mini_031",
    type: "mini_game",
    title: "Снимай или пей",
    timer: null,
    text: "Компания выбирает одного игрока. Ему называют один предмет одежды или аксессуар. Он либо снимает его до следующего круга, либо пьёт штраф. Если предмет слишком жёсткий, можно заменить, но тогда штраф двойной."
  },
  {
    id: "mini_032",
    type: "mini_game",
    title: "Кто бы с кем",
    timer: null,
    text: "Каждый игрок по очереди отвечает: “С кем из комнаты у меня был бы самый опасный поцелуй?” Имя обязательно. Кто отказывается назвать имя — пьёт. Кто назвал себя — пьёт дважды."
  },
  {
    id: "mini_033",
    type: "mini_game",
    title: "На колени",
    timer: 45,
    text: "Компания выбирает двух игроков. Один садится на колени ко второму. Кто сверху — решает компания. 45 секунд нужно сидеть так, не оправдываясь и не превращая в цирк. Кто ломает атмосферу — штраф."
  },
  {
    id: "mini_034",
    type: "mini_game",
    title: "Руки заняты",
    timer: 60,
    text: "{player.nom} и {randomPlayer.nom} до конца таймера должны держать руки друг на друге: талия, бедро, шея, спина или колено. Каждые 15 секунд компания говорит “смена”, и руки переходят на новое место. Кто тормозит — пьёт."
  },
  {
    id: "mini_035",
    type: "mini_game",
    title: "Финальный беспредел круга",
    timer: 90,
    text: "За 90 секунд каждый игрок должен выбрать одного человека и выполнить одно действие: поцелуй, рука на бедре, шёпот на ухо, обмен одеждой или сесть очень близко. Повторять одно и то же действие два раза подряд нельзя. Кто отказывается — получает штраф."
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
