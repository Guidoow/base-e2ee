const emojis = [
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥭",
  "🥥",
  "🥝",
  "🍅",
  "🍆",
  "🥑",
  "🥦",
  "🥒",
  "🥬",
  "🌶",
  "🌽",
  "🥕",
  "🥔",
  "🍠",
  "🥐",
  "🍞",
  "🥖",
  "🥨",
  "🧀",
  "🥚",
  "🍳",
  "🥞",
  "🧇",
  "🥓",
  "🥩",
  "🍗",
  "🍖",
  "🍤",
  "🍔",
  "🍟",
  "🍕",
  "🥪",
  "🥙",
  "🧆",
  "🌮",
  "🌯",
  "🥗",
  "🥘",
  "🥫",
  "🍝",
  "🍜",
  "🍲",
  "🍛",
  "🍣",
  "🍱",
  "🥟",
  "🦪",
  "🍤",
  "🍙",
  "🍚",
  "🍘",
  "🍥",
  "🥠",
  "🥮",
  "🍢",
  "🍡",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🧁",
  "🍰",
  "🎂",
  "🍮",
  "🍭",
  "🍬",
  "🍫",
  "🍿",
  "🍩",
  "🍪",
  "🌰",
  "🥜",
  "🍯",
  "🥛",
  "🍼",
  "☕",
  "🫖",
  "🍵",
  "🍶",
  "🍾",
  "🍷",
  "🍸",
  "🍹",
  "🍺",
  "🍻",
  "🥂",
  "🥃",
  "🥤",
  "🧋",
  "🧃",
  "🧉",
  "🧊",
  "🥢",
  "🍽",
  "🍴",
  "🥄",
  "🔪",
  "🏺",
];

const sentences = [
  "Everybody helpful section not offer responsibility yet before topic.",
  "Whether bloody reaction fiercely forbid key but for luxury.",
  "None frail month wisely ask hatred nor towards airport.",
  "Hers fancy picture vaguely destroy course yet toward security.",
  "I gorgeous disaster tremendously explain atmosphere nor across trend.",
  "Few repulsive problem carelessly dry liberty so beneath history.",
  "Ours vast note deliberately may diamond but past argument.",
  "Anybody energetic company carelessly arise expression nor before opportunity.",
  "Other concerned partnership supposedly cook compassion or opposite word.",
  "Us horrible concept never shoot medicine but beside reception.",
  "Whose jittery business quickly hate interest nor like screen.",
  "One embarrassed historian madly avoid botany yet up childhood.",
  "Wherein exuberant guide lovingly destroy science yet underneath son.",
  "Thy dull service courageously fly assistance and in shirt.",
  "Whose confused box fortunately achieve business or save pain.",
  "Them tired storage viciously cost quality and off money.",
  "Theirselves good thought supposedly lift weather or with space.",
  "Ours troubled event afterwards sweep inspection yet into meat.",
  "Naught ill preparation hungrily deal mode and opposite section.",
  "Who talented loss kindly sell operation or round intelligence.",
  "Each hungry signature hastily perform garden and via category.",
  "Wherein relieved equipment quicker consist list or anti instruction.",
  "Herself funny setting hopelessly beat psychology for from guide.",
  "Either glamorous advice quietly ought to blood and through sun.",
  "They disgusted profit openly invest shape and onto priority.",
  "These disgusted fun wisely protect stock yet per reality.",
  "Thine uptight battlefield rightfully compete anxiety yet before fortune.",
  "Wherein magnificent partnership jubilantly supply situation yet upon trade.",
  "Those powerful extent accidentally proceed birthday so until construction.",
  "Ought uninterested activity seemingly stink industry but excluding way.",
  "Them creepy coffee commonly roast ad but at awe.",
  "Each bored night hourly dry concept but considering sound.",
  "Whereinto gleaming entry jaggedly kneel maturity nor save timetable.",
  "Whosever friendly inside thoroughly delay size but anti model.",
  "Somewhat agreeable iron swiftly approach frame and beneath drawer.",
  "Each dead sense sweetly sow beer or upon heart.",
  "Whether kind tiredness majestically enjoy classmate and below matter.",
  "Her old fashioned inflation majestically learn hallway but inside chaos.",
  "Anything foolish sign calmly hide variation and besides mode.",
  "Such nasty group strictly consent youth yet regarding charity.",
  "Ourself inquisitive population seemingly bring magazine or following housing.",
  "Yonder fine sympathy vaguely beg mode but toward inflation.",
  "My curious knowledge vastly iron dirt for for category.",
  "Others homeless joy coaxingly hug blood nor since database.",
  "Their strange opinion loosely shoot type nor during chicken.",
  "One silly background zestily indicate notebook yet toward equipment.",
  "Somebody obedient iron viciously complete finding for without secretary.",
  "Whereby obedient ability wholly overtake demand and between word.",
  "We nice drawer closely apply hearing and between dancing.",
  "Your homeless delivery correctly consult material or amid funeral.",
  "Anybody average name madly experiment child for behind business.",
  "Us delightful sign bashfully introduce subject but besides childhood.",
  "Where zealous beginning exactly manage cheek and opposite concept.",
  "Whoso precious issue quietly sing policy or by bird.",
  "Thou impossible war quietly lend source and around clothing.",
  "Theirself naughty son briskly bounce wind so behind reality.",
  "Yourselves open science more prefer sign but among variety.",
  "One clumsy dinner meaningfully love section and beside gift.",
  "Whosever envious communication quirkily practice hate and round page.",
  "Them evil thing calmly talk role for until attitude.",
  "Hers mysterious thunderstorm perfectly compete oil or besides form.",
  "Thy inexpensive two broadly roast hat for past requirement.",
  "Whereto alert maintenance strictly slice coffee yet in box.",
  "Such famous question unnecessarily forget tree nor following topic.",
  "Aught adorable industry voluntarily enjoy event and aboard haircut.",
  "Anybody handsome entertainment loftily claim championship and about month.",
  "There lovely analyst irritably breed moonlight but against chocolate.",
  "Who witty figure more melt article nor around psychology.",
  "She panicky field loosely protect safety for beneath platform.",
  "Other cruel thunderstorm hourly suffer countdown nor around presentation.",
  "Those obedient queen beautifully consent message and past box.",
  "Wherever uptight library unnaturally blow development but after chemistry.",
  "Myself funny screen very apologize boat yet under bonus.",
  "Everything inexpensive medicine limply resist statement or of topic.",
  "Ourself elegant university sheepishly lose choice but of response.",
  "Someone bored soil madly look market and regarding nation.",
  "Which lazy flight quirkily extend type so minus table.",
  "Neither bloody value thoughtfully bathe ear but beyond access.",
  "Whose glamorous bit cleverly begin warning yet after money.",
  "Whomsoever clever government blissfully stink beer for like temperature.",
  "Everybody handsome glass thankfully begin session or beyond recommendation.",
  "Nothing shiny bit less shine gene so except painting.",
  "Neither annoying stranger well discover insect nor behind aunt.",
  "We blue fun scarily should jealousy but minus safety.",
  "Whichever ugly post tremendously dream security but without fun.",
  "Herself rich police diligently forgive hat but through sense.",
  "Ours drab duty smoothly sink jewelery and around attention.",
  "Themself clumsy shape evenly hug bathroom or via lady.",
  "I uninterested menu too assure frame and on presentation.",
  "Either famous screen unabashedly impress business but under link.",
  "Others lazy society usefully manage awe yet plus flight.",
  "This careful presence surprisingly start hatred nor after girlfriend.",
  "Thou smoggy chopstick triumphantly scrub briefcase or past pot.",
  "Any helpless issue shrilly invest penalty nor up honey.",
  "Its brave topic thankfully ask birthday and among heart.",
  "Whatever easy benefit hourly anticipate disk and outside temperature.",
  "Mine muddy home mysteriously kick statement or during distribution.",
  "Theirself selfish ability kindheartedly tiptoe math and to everything.",
  "Few distinct highway seemingly stack organization so around child.",
  "Whereon crowded sir dimly explain outside so in bread.",
  "Their crazy trend yieldingly shine expression yet about weather.",
  "My brave duty inquisitively owe secretary nor unlike boy.",
  "His awful ratio mockingly owe criticism but into number.",
  "Which curious studio evenly convince accident and save danger.",
  "Ourselves repulsive series arrogantly hold boyfriend so behind weakness.",
  "Who stupid opportunity sleepily investigate selection so beside insect.",
  "Thyself upset family noisily finish son and within page.",
  "Itself poor car generously catch question yet toward child.",
  "Somewhat healthy contentment blindly talk appointment or in luxury.",
  "Whoso zealous task thankfully start analysis for toward girl.",
  "Either colorful negotiation shyly tiptoe university and about inflation.",
  "Naught good economy willfully tend opinion and within appointment.",
  "Anything black career sedately jog design yet but variety.",
  "Her smiling cancer successfully continue trend so upon rattlesnake.",
  "Himself puzzled category knavishly stretch rock yet like condition.",
  "What creepy step warmly order kindness for onto procedure.",
  "Yonder selfish camera selfishly contain nature nor before skill.",
  "Each light college continually will reality so without scale.",
  "Mine combative dad knowingly owe cat for inside improvement.",
  "Her difficult warmth fairly stop sector yet up analyst.",
  "You blushing market jubilantly consist enthusiasm and excepting condition.",
  "It important back solemnly forgive hospital but down board.",
  "Wherewithal hurt awe rarely establish sample and except discipline.",
  "She encouraging problem frankly attract analyst for behind company.",
  "Their adorable iron anxiously react singer and among computer.",
  "Other relieved bedroom recklessly receive bonus yet until chopstick.",
  "Any vivacious face irritably shrink inside and upon maintenance.",
  "Myself alive customer powerfully vary passenger and following quantity.",
  "Herself wicked honey wrongly follow fat or before preparation.",
  "Whereto dizzy question hourly happen countdown so regarding university.",
  "This uninterested marketing seemingly believe preparation for excluding form.",
  "Yours tough message suddenly give examination for like water.",
  "Nought unsightly problem almost destroy discussion and to importance.",
  "Other adorable horsefly energetically cost boss but but coffee.",
  "Other unsightly fat solemnly negotiate mind but in rule.",
  "Wherein troubled space equally rise form so towards university.",
  "Both gorgeous area mechanically slide danger and of part.",
  "Somebody inquisitive jam exactly concern setting so as hand.",
  "Theirselves friendly action suddenly win personality and across kindness.",
  "Theirs determined bath uselessly claim law yet until success.",
  "Its dizzy book seemingly encourage tree or over footprint.",
  "Each frightened lake unbearably swear analyst and following recipe.",
  "Their concerned inside eventually finish entry or towards nothing.",
  "Whereinto crazy school fairly appear effect for onto market.",
  "There blushing safety jubilantly rely countdown but to foundation.",
  "Whom fair diamond lovingly own table and behind thanks.",
  "Thy glorious security judgmentally dislike thought yet beside inflation.",
  "Other annoyed assignment quietly shoot exchange and for morning.",
  "Few bored intelligence healthily do unit so of connection.",
  "Which tasty web knavishly repair insect yet at cause.",
  "All repulsive health innocently manage effect nor above outcome.",
  "Myself stormy home sympathetically throw card or through reputation.",
  "All clean queen rigidly prevent village but before mall.",
  "Yourself naughty satisfaction les change tongue or against victory.",
  "Himself spotless blood defiantly compete animal so excepting temperature.",
  "Whereof alive chemistry enormously cry football but inside shape.",
  "Ourselves busy college righteously squat warning and inside apple.",
  "I dangerous date almost stick beauty for onto menu.",
  "Whatnot happy rattlesnake never shoot charity nor beyond course.",
  "Those depressed butterfly vivaciously become obligation so but store.",
  "Whosoever bloody reflection zestfully bear contribution and save cupboard.",
  "Several tasty box briefly differ agency yet below teacup.",
  "Nothing crowded moonlight lazily stand chopstick and like revolution.",
  "Whatever stupid jealousy woefully consist injury and up condition.",
  "Anything cute value physically run coffee nor aboard name.",
  "Whereinto poor reality usually stand honey but below moment.",
  "Whose expensive library loosely realize guidance and unlike region.",
  "Our victorious entry punctually burn profit yet off grandmother.",
  "This crazy rate fondly listen everybody and inside childhood.",
  "Anyone cheerful reception innocently add poet and below houseboat.",
  "Whosoever plain operation more dislike protection yet at market.",
  "One worrisome business jealously measure trend for as stranger.",
  "Whatever condemned scene usually complain mall yet amid gift.",
  "Yonder troubled belief kindheartedly stick office or along delivery.",
  "Thy enchanting area boastfully believe trade or versus action.",
  "Thy stupid group suddenly hug driver for through house.",
  "Himself encouraging research healthily install sir and among hospital.",
  "You important responsibility soon bite republic nor besides quantity.",
  "Themself handsome everybody slowly fly equipment nor up screen.",
  "Theirselves lazy economics adventurously relate church or of imagination.",
  "Him zealous type boldly decide profit nor through gift.",
  "None shy database unbearably spit state but excluding mind.",
  "Another dead heart more describe school or down child.",
  "As calm awareness merrily avoid birth but among advice.",
  "Mine glorious homework rarely weigh jealousy and minus county.",
  "Whomever obedient salad truthfully think awareness or off hair.",
  "Him precious housing instantly achieve frame but through accident.",
  "Anything sore language victoriously shine student so by football.",
  "Whereto stupid partnership truthfully enhance background or through note.",
  "Someone witty linguistics honestly vacuum relation yet within gene.",
  "Where open battlefield anxiously compare description so from figure.",
  "Any expensive housing innocently laugh ad yet upon economics.",
  "Ourself bewildered notebook unnaturally iron frame and for maturity.",
  "She glamorous midnight longingly stop assignment yet plus hat.",
  "Yourself horrible tradition meaningfully should thing and following media.",
  "Whether nervous injury tenderly improve idea or considering web.",
  "Myself comfortable inspection miserably win thing and against cleverness.",
  "None agreeable assignment frightfully feel position or against preference.",
  "Such helpless independence quietly wish equipment for per animal.",
  "None terrible property wearily stick garden so from industry.",
];

export function getRandom(type: "emoji" | "sentence" | any[]) {
  const useArray =
    type === "emoji" ? emojis : type === "sentence" ? sentences : type;
  const randomIndex = Math.floor(Math.random() * useArray.length);
  return type === "emoji"
    ? Buffer.from(useArray[randomIndex]).toString("base64")
    : useArray[randomIndex];
}