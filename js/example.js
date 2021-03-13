/* global Deck */
var prefix = Deck.prefix

var transform = prefix('transform')

var translate = Deck.translate

var $container = document.getElementById('container')
var $topbar = document.getElementById('topbar')

var $sort = document.createElement('button')
var $shuffle = document.createElement('button')
var $bysuit = document.createElement('button')
var $fan = document.createElement('button')
var $poker = document.createElement('button')
var $flip = document.createElement('button')

$shuffle.textContent = 'Shuffle'
$sort.textContent = 'Sort'
$bysuit.textContent = 'By suit'
$fan.textContent = 'Fan'
$poker.textContent = 'Poker'
$flip.textContent = 'Flip'

$topbar.appendChild($flip)
$topbar.appendChild($shuffle)
$topbar.appendChild($bysuit)
$topbar.appendChild($fan)
$topbar.appendChild($poker)
$topbar.appendChild($sort)

var deck = Deck()

// easter eggs start

var acesClicked = []
var kingsClicked = []

deck.cards.forEach(function (card, i) {
	card.enableDragging()
	//card.enableFlipping()

	card.$el.addEventListener('mousedown', onTouch)
	card.$el.addEventListener('touchstart', onTouch)

	function onTouch() {
		var card

		if (i % 13 === 0) {
			acesClicked[i] = true
			if (acesClicked.filter(function (ace) {
					return ace
				}).length === 4) {
				document.body.removeChild($topbar)
				deck.$el.style.display = 'none'
				setTimeout(function () {
					startWinning()
				}, 250)
			}
		} else if (i % 13 === 12) {
			if (!kingsClicked) {
				return
			}
			kingsClicked[i] = true
			if (kingsClicked.filter(function (king) {
					return king
				}).length === 4) {
				for (var j = 0; j < 3; j++) {
					card = Deck.Card(52 + j)
					card.mount(deck.$el)
					card.$el.style[transform] = 'scale(0)'
					card.setSide('front')
					card.enableDragging()
					card.enableFlipping()
					deck.cards.push(card)
				}
				deck.sort(true)
				kingsClicked = false
			}
		} else {
			acesClicked = []
			if (kingsClicked) {
				kingsClicked = []
			}
		}
	}
})

function startWinning() {
	var $winningDeck = document.createElement('div')
	$winningDeck.classList.add('deck')

	$winningDeck.style[transform] = translate(Math.random() * window.innerWidth - window.innerWidth / 2 + 'px', Math.random() * window.innerHeight - window.innerHeight / 2 + 'px')

	$container.appendChild($winningDeck)

	var side = Math.floor(Math.random() * 2) ? 'front' : 'back'

	for (var i = 0; i < 55; i++) {
		addWinningCard($winningDeck, i, side)
	}

	setTimeout(startWinning, Math.round(Math.random() * 1000))
}

function addWinningCard($deck, i, side) {
	var card = Deck.Card(54 - i)
	var delay = (55 - i) * 20
	var animationFrames = Deck.animationFrames
	var ease = Deck.ease

	card.enableFlipping()

	if (side === 'front') {
		card.setSide('front')
	} else {
		card.setSide('back')
	}

	card.mount($deck)
	card.$el.style.display = 'none'

	var xStart = 0
	var yStart = 0
	var xDiff = -500
	var yDiff = 500

	animationFrames(delay, 1000)
		.start(function () {
			card.x = 0
			card.y = 0
			card.$el.style.display = ''
		})
		.progress(function (t) {
			var tx = t
			var ty = ease.cubicIn(t)
			card.x = xStart + xDiff * tx
			card.y = yStart + yDiff * ty
			card.$el.style[transform] = translate(card.x + 'px', card.y + 'px')
		})
		.end(function () {
			card.unmount()
		})
}

// easter eggs end

$shuffle.addEventListener('click', function () {
	deck.shuffle()
	deck.shuffle()
})
$sort.addEventListener('click', function () {
	deck.sort()
})
$bysuit.addEventListener('click', function () {
	deck.sort(true) // sort reversed
	deck.bysuit()
})
$fan.addEventListener('click', function () {
	deck.fan()
})
$flip.addEventListener('click', function () {
	deck.flip()
})

//!!!
$poker.addEventListener('click', function () {
	deck.queue(function (next) {
		deck.cards.forEach(function (card, i) {
			setTimeout(function () {
				card.setSide('back')
			}, i * 7.5)
		})
		next()
	})
	deck.shuffle()
	deck.shuffle()
	deck.poker()
})

//隨機Random 陣列
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

var sHTML = "";
var ranNumber = [];
var award = new Array();
var NoAward = ['幸運之神今天沒來', '謝謝參加', '明年再接再厲', '銘謝惠顧', '獎品不是你的唷', '啊！沒有！', '願您諸事大吉喔', '金豬獻瑞迎春來啦', '祝您豬年行大運唷'];
var totalCnt = 90;

function getReady() {
	xmlDoc = GetXMLData("faces/LIST.xml");

	root = xmlDoc.getElementsByTagName("Root");
	items = root[0].getElementsByTagName("SheetInfo");
	itemLength = items.length;
	var ArrayNumber = [];
	for (var i = 0; i < totalCnt; i++) {
		ArrayNumber[i] = i;
		award[i] = new Array();

		if (i < itemLength) {
			award[i][0] = items[i].getElementsByTagName("Title")[0].firstChild.nodeValue.replace("/n", "<br>");
			award[i][1] = items[i].getElementsByTagName("Grade")[0].firstChild.nodeValue;
			if (items[i].getElementsByTagName("Price")[0].firstChild.nodeValue == "0") {
				award[i][2] = " ";
			} else {
				award[i][2] = "價值金額：" + items[i].getElementsByTagName("Price")[0].firstChild.nodeValue;
			}
		} else {
			var x = i % 9;
			award[i][0] = NoAward[x];
			award[i][1] = "";
			award[i][2] = "";
		}
		award[i][3] = "F";
	}

	var sHTML2 = "";
	sHTML2 += "<img onClick=\"displayCanvas()\" id=\"picDisplay\" src=\"faces/PIG.svg\" />";
	for (i = 1;
		(i * 10 - totalCnt) < 10; i++) {
		sHTML2 += "<div class=\"btn\" id=\"btn" + i + "\" onClick=\"ShowPage(this," + i + ")\">" + i + "</div>";
	}
	$("#divBtn").append(sHTML2);

	ranNumber = shuffle(ArrayNumber);

	deck.mount($container);
	deck.cards.forEach(function (card, i) {
		card.setSide(Math.random() < 0.0 ? 'front' : 'back');
		var W = window.innerWidth * 0.5;
		var H = window.innerHeight * 0.5;
		// explode
		card.animateTo({
			//delay: 1000 + i * 2, // wait 1 second + i * 2 ms
			delay: i * 2, // wait 1 second + i * 2 ms
			duration: 800,
			ease: 'quartOut',

			x: Math.random() * W - W / 2 - 180,
			y: Math.random() * H - H / 2,
			rot: Math.random() * 360
		});
	});

	//divCards
	var iw = window.innerWidth;
	var ih = window.innerHeight;

	$("#divBtn").css("height", ih + "px");
	$(".divCards").css("width", iw + "px");
	$(".divCards").css("height", ih + "px");
}


var PrePage = 1;
var ML;
var MT;

function setContent(page) {
	$(".divCards").css("z-index", "100");
	var iPage = page - 1;
	var Startcnt = iPage * 10;
	var Endcnt = iPage * 10 + 9;

	sHTML = "";
	var Pw = $(".picCards").width() * 0.9;
	var Ph = $(".picCards").height() * 0.9;

	for (var i = Startcnt; i <= Endcnt; i++) {
		if (i >= totalCnt) {
			sHTML += "<div id=\"div" + sNo + "\" onClick=\"\" class=\"divCardNONE\"><img id=\"pic" + sNo + "\" class=\"picCards\" src=\"faces/back2.svg\" /><font id=\"font" + sNo + "\" class=\"fontAward\">" + Title + " <br></font></div>"
			//break;
		} else {
			var sNo = ranNumber[i];
			var Title = award[sNo][0];
			var Grade = award[sNo][1];
			var Price = award[sNo][2];

			if (Grade != "") {
				if (Title.indexOf("br") >= 0) {
					sHTML += "<div id=\"div" + sNo + "\" onClick=\"surprice(this," + sNo + ")\" class=\"divCard\"><img id=\"pic" + sNo + "\" class=\"picCards\" src=\"faces/back2.svg\" /><font id=\"font" + sNo + "\" class=\"fontAward\">" + Grade + "<br><br>" + Title + "<br><font class=\"fontPrice\">" + Price + "</font></font> <div class=\"dCanvas\"><canvas id=\"cSketchPad" + sNo + "\" class=\"cSketchPad\" width=\"" + Pw + "px\" height=\"" + Ph + "px\"></canvas></div> </div>"
				} else {
					sHTML += "<div id=\"div" + sNo + "\" onClick=\"surprice(this," + sNo + ")\" class=\"divCard\"><img id=\"pic" + sNo + "\" class=\"picCards\" src=\"faces/back2.svg\" /><font id=\"font" + sNo + "\" class=\"fontAward\"><font class=\"fontGrade\">" + Grade + "</font><br><br>" + Title + "<br><br><font class=\"fontPrice\">" + Price + "</font></font> <div class=\"dCanvas\"><canvas id=\"cSketchPad" + sNo + "\" class=\"cSketchPad\" width=\"" + Pw + "px\" height=\"" + Ph + "px\"></canvas></div> </div> "
				}
			} else {
				sHTML += "<div id=\"div" + sNo + "\" onClick=\"surprice(this," + sNo + ")\" class=\"divCard\"><img id=\"pic" + sNo + "\" class=\"picCards\" src=\"faces/back2.svg\" /><font id=\"font" + sNo + "\" class=\"fontAward\">" + Title + " <br></font> <div class=\"dCanvas\"><canvas id=\"cSketchPad" + sNo + "\" class=\"cSketchPad\" width=\"" + Pw + "px\" height=\"" + Ph + "px\"></canvas></div> </div>"; // <div class=\"dCanvas\" id=\"dCanvas"+i+"\"><canvas id=\"draw"+i+"\" class=\"draw\"></canvas></div>
			}
		}

	}
	/*$("#divCards"+page).append(sHTML);*/
	document.getElementById("divCards" + page).innerHTML = sHTML;
	var cardW = $("#divCards" + page).width();
	var cardH = $("#divCards" + page).height();
	ML = (window.innerWidth - cardW) * 0.5;
	MT = (window.innerHeight - cardH) * 0.5;

	$("#divCards" + page).css("z-index", "200");
	$("#divCards" + page).animate({
		opacity: "1"
	}, 500);
	$("#btn" + page).addClass("btnNow");

	$(".dCanvas").css("margin-top", Ph / (-0.9) + "px");
}

function ShowPage(Obj, page) {
	if (document.getElementById("divCards" + page).innerHTML == "") {
		setContent(page);
	}

	$("#btn" + PrePage).removeClass("btnNow");
	$(".divCards").css({
		opacity: "0"
	});
	$("#divCards" + PrePage).css("z-index", "100");
	$("#divCards" + page).css("z-index", "200");
	$("#divCards" + page).animate({
		opacity: "1"
	}, 100);
	$("#btn" + page).addClass("btnNow");
	PrePage = page;
}

function goFresh() {
	$("#picG").addClass("bounceOutDown");
}

function surprice(Obj, sNo) {
	var sID = Obj.id;

	$("#" + sID).addClass("flipInY");
	$("#" + sID).removeAttr("onClick");
	$("#pic" + sNo).attr("src", "faces/front2.svg");
	$("#font" + sNo).css("opacity", 1);
	award[sNo][3] = "T";

	var canvas = document.getElementById('cSketchPad' + sNo);
	var $canvas = $("#cSketchPad" + sNo);
	var ctx = $("#cSketchPad" + sNo).get(0).getContext("2d");

	ctx.lineCap = "round";
	/*ctx.fillStyle = "pink"; //整個canvas塗上白色背景避免PNG的透明底色效果
	ctx.fillRect(0, 0, $canvas.width(), $canvas.height());*/
	var drawMode = false;

	$canvas.mousedown(function (e) {
		ctx.beginPath();
		ctx.strokeStyle = "orange";
		ctx.lineWidth = "3";

		ctx.moveTo(e.pageX - $canvas.position().left, e.pageY - $canvas.position().top);
		drawMode = true;
	})

	$canvas.mousemove(function (e) {
		if (drawMode) {
			//var canvas = document.getElementById('cSketchPad');
			var X = e.pageX;
			var Y = e.pageY;

			ctx.lineTo(e.pageX - $canvas.position().left, e.pageY - $canvas.position().top);
			ctx.stroke();
		}
	})

	$canvas.mouseup(function (e) {
		drawMode = false;
	});

	canvas.addEventListener('touchstart', function beginDraw(e) {
		ctx.beginPath();
		ctx.strokeStyle = "orange";
		ctx.lineWidth = "3";
		var x = event.touches[0].pageX;
		var y = event.touches[0].pageY;
		ctx.moveTo(x - $canvas.position().left, y - $canvas.position().top);
		drawMode = true;
		//$canvas.mousedown();
	});

	canvas.addEventListener('touchmove', function () {
		//alert(drawMode);
		if (drawMode) {
			//alert("AC");
			//var canvas = document.getElementById('cSketchPad');
			var x = event.touches[0].pageX;
			var y = event.touches[0].pageY;

			ctx.lineTo(x - $canvas.position().left, y - $canvas.position().top);
			ctx.stroke();
			event.preventDefault(); //避免拉動捲軸!!
		}

		//$canvas.mousemove();
	});
	canvas.addEventListener('touchend', function () {
		canvas.removeEventListener('touchstart', beginDraw, false);
		$canvas.mouseup();
	});

	var iPage = PrePage - 1;
	var Startcnt = iPage * 10;
	var Endcnt = iPage * 10 + 9;
	var Over = true;

	for (var i = Startcnt; i <= Endcnt; i++) {
		var sNo = ranNumber[i];
		if (i >= totalCnt) {
			break;
		}

		if (award[sNo][3] != "T") {
			Over = false;
			break;
		}
	}

	if (Over) {
		$("#btn" + PrePage).addClass("btnOver");
	}
}

function displayCanvas() {
	$(".dCanvas").toggle();
}