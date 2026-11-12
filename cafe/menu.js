/* ================= menu data ================= */
const A={밀:'Wheat',우유:'Milk',달걀:'Egg',견과류:'Nuts'};
const TAB=[
  {k:'sig',en:'Signature',ko:'시그니처'},
  {k:'coffee',en:'Coffee',ko:'커피'},
  {k:'non',en:'Non-Coffee',ko:'논커피'},
  {k:'tea',en:'Tea & Ade',ko:'티·에이드'},
  {k:'dessert',en:'Dessert',ko:'디저트'}
];
const M=[];
function m(cat,sub,ko,en,price,temp,bean,acid,al,desc,sig){M.push({id:M.length,cat,sub,ko,en,price,temp,bean,acid,al:al?al.split(','):[],desc,sig:!!sig})}
// signature
m('sig','','달빛 라떼','Moonlight Latte',6000,'HI','문 블렌드',0,'우유','은은한 바닐라와 꿀, 달처럼 둥근 우유 거품',1);
m('sig','','문라이트 크림 커피','Moonlight Cream Coffee',6500,'I','문 블렌드',0,'우유','진한 커피 위에 바닐라 크림을 올린 커피',1);
m('sig','','선라이즈 토닉','Sunrise Tonic',6000,'I','선라이즈 싱글',3,'','산뜻한 토닉에 에티오피아 원두의 과일향',1);
// coffee
m('coffee','','에스프레소','Espresso',3500,'H','문 블렌드',1,'','진하고 묵직한 한 잔');
m('coffee','','아메리카노','Americano',4000,'HI','문 블렌드',1,'','고소하고 깔끔한 기본 커피');
m('coffee','','선라이즈 아메리카노','Sunrise Americano',4500,'HI','선라이즈 싱글',3,'','에티오피아 원두의 과일향과 산뜻한 산미');
m('coffee','','카페라떼','Café Latte',4800,'HI','문 블렌드',0,'우유','부드러운 우유와 고소한 에스프레소');
m('coffee','','바닐라 라떼','Vanilla Latte',5300,'HI','문 블렌드',0,'우유','달콤한 바닐라 시럽을 더한 라떼');
m('coffee','','카푸치노','Cappuccino',4800,'H','문 블렌드',0,'우유','풍성한 우유 거품과 진한 에스프레소');
m('coffee','','플랫화이트','Flat White',5000,'H','문 블렌드',0,'우유','진한 에스프레소에 얇게 올린 우유 거품');
m('coffee','','카페모카','Café Mocha',5300,'HI','문 블렌드',0,'우유','초콜릿과 에스프레소, 우유의 조합');
m('coffee','','콜드브루','Cold Brew',5000,'I','문 블렌드',1,'','12시간 차갑게 우려낸 부드러운 커피');
// non-coffee
m('non','','초코 라떼','Chocolate Latte',5300,'HI','',0,'우유','진한 초콜릿과 부드러운 우유');
m('non','','말차 라떼','Matcha Latte',5500,'HI','',0,'우유','쌉쌀한 말차와 부드러운 우유');
m('non','','고구마 라떼','Sweet Potato Latte',5500,'HI','',0,'우유','달콤하고 고소한 고구마');
m('non','','밀크티','Milk Tea',5300,'HI','',0,'우유','진하게 우린 홍차에 우유를 더한 밀크티');
m('non','','보름달 우유','Full Moon Milk',5000,'HI','',0,'우유','고소한 우유에 은은한 바닐라');
// tea & ade
m('tea',['티','Tea'],'캐모마일','Chamomile',4500,'H','',0,'','카페인 없이 편안한 허브차');
m('tea',['티','Tea'],'얼그레이','Earl Grey',4500,'H','',0,'','베르가못 향이 은은한 홍차');
m('tea',['티','Tea'],'페퍼민트','Peppermint',4500,'H','',0,'','청량하고 개운한 허브차');
m('tea',['에이드·스무디','Ade & Smoothie'],'레몬 에이드','Lemon Ade',5500,'I','',0,'','상큼한 레몬과 탄산');
m('tea',['에이드·스무디','Ade & Smoothie'],'자몽 에이드','Grapefruit Ade',5500,'I','',0,'','쌉싸름하고 상큼한 자몽과 탄산');
m('tea',['에이드·스무디','Ade & Smoothie'],'유자 에이드','Yuja (Citron) Ade',5500,'I','',0,'','달콤새콤한 유자청과 탄산');
m('tea',['에이드·스무디','Ade & Smoothie'],'딸기 스무디','Strawberry Smoothie',6000,'I','',0,'우유','딸기를 갈아 만든 시원한 스무디');
// dessert
m('dessert',['케이크','Cakes'],'바스크 치즈케이크','Basque Cheesecake',6500,'','',0,'우유,밀,달걀','겉은 진하게 구운 색, 속은 부드러운 크림치즈');
m('dessert',['케이크','Cakes'],'초코 케이크','Chocolate Cake',6500,'','',0,'우유,밀,달걀','진한 초콜릿 시트와 크림');
m('dessert',['케이크','Cakes'],'당근 케이크','Carrot Cake',6500,'','',0,'우유,밀,달걀,견과류','당근과 호두가 들어간 촉촉한 케이크');
m('dessert',['케이크','Cakes'],'티라미수','Tiramisu',6500,'','',0,'우유,밀,달걀','에스프레소를 머금은 시트와 마스카르포네 크림');
m('dessert',['구움과자','Baked Sweets'],'마들렌','Madeleine',3000,'','',0,'우유,밀,달걀','버터향이 진한 부드러운 마들렌');
m('dessert',['구움과자','Baked Sweets'],'휘낭시에','Financier',3000,'','',0,'우유,밀,달걀,견과류','아몬드 향이 은은한 겉바속촉 구움과자');
m('dessert',['구움과자','Baked Sweets'],'달 모양 쿠키','Crescent Moon Cookie',3500,'','',0,'우유,밀,달걀','버터향 가득한 초승달 모양 쿠키');
m('dessert',['구움과자','Baked Sweets'],'스콘','Scone',3500,'','',0,'우유,밀,달걀','플레인 스콘, 크림과 잼 곁들임');
m('dessert',['구움과자','Baked Sweets'],'브라우니','Brownie',4000,'','',0,'우유,밀,달걀,견과류','꾸덕한 초콜릿 브라우니');
m('dessert',['베이커리','Bakery'],'크루아상','Croissant',4000,'','',0,'우유,밀,달걀','겹겹이 바삭한 버터 크루아상');
m('dessert',['베이커리','Bakery'],'크림치즈 베이글','Cream Cheese Bagel',5000,'','',0,'우유,밀','쫄깃한 베이글에 크림치즈');
m('dessert',['아이스크림','Ice Cream'],'아포가토','Affogato',6000,'','',0,'우유','바닐라 아이스크림에 에스프레소를 부어 먹는 디저트');

