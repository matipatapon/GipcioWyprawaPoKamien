//Podsłuch klawiatury
var A = false ;
var D = false ;
var S = false;
var Space= false;
var wygrana = false;
var tekst = [];
tekst[1] = "Wraz ze swoim Dodo Gipcio postanowił wyruszyć po kamień... </br> Space - Kontynuuj";
tekst[2] = "Gdy w końcu po długiej wędrówce znalazł pierwszą skałę okazało się ...</br> Space - Kontynuuj";
tekst[3] = "Że ktoś ich obserwuje ... w krzaku krył się jakiś noobek ...</br> Space - Kontynuuj";
tekst[4] = "Gipcio czym prędzej zawrócil i zaczoł uciekać na swoim dodo ale czy uda mu się uciec ?</br> Space - Uciekaj ! ";
tekst[5] = "Niestety ... Jesteś jeńcem noobka ... a twój dodo idzie na grill ... </br> Space - Spróbuj jescze raz ! ";
tekst[6] = "W tej OP bazie jesteś bezpieczny Gratulacje !!! </br> Space - jescze raz !";


addEventListener("keydown",Klawiatura);
function Klawiatura(e)
{


	if(e.keyCode == 65)
	{
	
		A = true;	
	}
		if(e.keyCode == 83)
	{
		S = true;	
	}
	if(e.keyCode == 32)
	{
		
		Space = true;	
	}
	if(e.keyCode == 68)
	{
		D = true;	
	}
}
addEventListener("keyup",Klawiaturaup);
function Klawiaturaup(e)
{
	if(e.keyCode == 65)
	{
		A = false;	
	}
	if(e.keyCode == 68)
	{
		D = false;	
	}	
	if(e.keyCode == 83)
	{
		S= false;	
	}
	if(e.keyCode == 32)
	{
		Space = false;	
	}	
}
//Globalne
	//Wszystkie tekstury w grze
	var Tex = [0];
	//Słuzy sprawdzeniu czy wszystkie tekstury są wczytane 
	var ilosctekstur = 0;
	var iloscwczytanychtekstur = 0;

function Obiekt( Nazwa , tekstura , pozx , pozy , szerokosc , wysokosc  )
{
	this.nazwa = Nazwa;
	this.img = tekstura;
	this.pozx = pozx;
	this.pozy = pozy;
	this.szerokosc = szerokosc;
	this.wysokosc = wysokosc;

	
}

//Tworzenie Tekstur
function TworzeniePomoc(sciezka)
{
	img = new Image();
	img.onload = function (){iloscwczytanychtekstur++;}
	ilosctekstur++;
	img.src = sciezka;
	return img;
}
//Sprawdzanie czy Wszystkie tekstury są wczytane 
function wczytywanie()
{
	
	if(Tex[0]==0){Tworzenie();}
	
	else
	{
		
		if(ilosctekstur==iloscwczytanychtekstur)
		{
			Start();	
		}
		else
		{
			
			setTimeout(wczytywanie,1000);
		
		}
	}

}
//Rysowanie obiektu na zyczenie 
function Rysuj(x)
{
	var canvas = document.getElementById("gra");
	var ctx = canvas.getContext("2d");	
	if(x==0)
	{
		ctx.clearRect(600,600,0,0);
	}
	else
	{
	
	ctx.drawImage(x.img,x.pozx,x.pozy,x.szerokosc,x.wysokosc);
	}	
}
//Wykrywanie Kolizji zwraca True lub Falsz\ 
	//Rysowanie Kresek kolzji
function RysujKolizje(x,y)
{
	var canvas = document.getElementById("gra");
	var ctx = canvas.getContext("2d");	
	//1 obiekt
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "red";
	ctx.moveTo(x.pozx,x.pozy);
	ctx.lineTo(x.pozx+x.szerokosc,x.pozy);
	ctx.lineTo(x.pozx+x.szerokosc,x.pozy+x.wysokosc);
	ctx.lineTo(x.pozx,x.pozy+x.wysokosc);
	ctx.lineTo(x.pozx,x.pozy);
	ctx.stroke();
	//2
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "green";
	ctx.moveTo(y.pozx,y.pozy);
	ctx.lineTo(y.pozx+y.szerokosc,y.pozy);
	ctx.lineTo(y.pozx+y.szerokosc,y.pozy+y.wysokosc);
	ctx.lineTo(y.pozx,y.pozy+y.wysokosc);
	ctx.lineTo(y.pozx,y.pozy);
	ctx.stroke();
}
function Kolizja(Obiekt1,Obiekt2)
{
	RysujKolizje(Obiekt1,Obiekt2);
var W1x = [];
var W1y = [];
W1x[1] = Obiekt1.pozx;	
W1x[2] = Obiekt1.pozx+Obiekt1.szerokosc;
W1x[3] = Obiekt1.pozx+Obiekt1.szerokosc;
W1x[4] = Obiekt1.pozx;
W1y[1] = Obiekt1.pozy;	
W1y[2] = Obiekt1.pozy;
W1y[3] = Obiekt1.pozy+Obiekt1.wysokosc;
W1y[4] = Obiekt1.pozy+Obiekt1.wysokosc;
var W2x = [];
var W2y = [];
W2x[1] = Obiekt2.pozx;	
W2x[2] = Obiekt2.pozx+Obiekt2.szerokosc;
W2x[3] = Obiekt2.pozx+Obiekt2.szerokosc;
W2x[4] = Obiekt2.pozx;
W2y[1] = Obiekt2.pozy;	
W2y[2] = Obiekt2.pozy;
W2y[3] = Obiekt2.pozy+Obiekt2.wysokosc;
W2y[4] = Obiekt2.pozy+Obiekt2.wysokosc;

for(i=1;i<5;i++)
{
var x = W1x[i];
var y = W1y[i];	

if((x>=W2x[1])&&(x<=W2x[2])&&(y>=W2y[1])&&(y<=W2y[4]))
{
	return true;
}

}

for(i=1;i<5;i++)
{
var x = W2x[i];
var y = W2y[i];	
if((x>=W1x[1])&&(x<=W1x[2])&&(y>=W1y[1])&&(y<=W1y[4]))
{
	return true;
}
}
return false;
}
//Gra //
	var Przegrana = false;
//Plapki dzialanie i nie tylko
//fun 1 
	var czyaktywowana = false;
//fun 2 
	//Prawo lewo
	var predkosc = 0;
	var przyspieszenie = 0.2;
	var Opur = 0.2;
	var limit = 4.5;
	//Skok
	var grawitacja = 0.4;
	var skok = 0;
	var wyskok = 12;
	var czyskok = false;
	var wpowietrzu = false;
//fun 3
	var rodzaj = 0;
	var predkoscwluczni = 0;
	var wycofanie = false;
	
//fun 5
	var kpredkosc = 0;
	var kprzyspieszenie = 0.2;
function funkcja(x)
{
	//Sciezki dzialanie
	if(x==0)
	{
		return function()
		{
			this.pozx=this.pozx - Predkosc;
			if(this.pozx < -600)
			{
				this.pozx = 0;
			}
		
		}
		
	}
	//Plapki nr 1 dzaialnie ( na niedzwiedzia) 
	if(x==1)
	{
		return function()
		{		
			if(czyaktywowana == false)
			{
				this.pozx = Math.floor(Math.random()*500+600)
				czyaktywowana = true;
			}
			if(this.pozx + this.szerokosc < 0 )
			{
				czyaktywowana = false;
				Kolejna = true;
			}
			this.pozx = this.pozx - Predkosc;
			
			if(Kolizja(this,Gipcio)==true)
			{
				Przegrana = true;
				
			}

		}
		
	}
	//Dzialanie GipcioDodo
	if(x==2)
	{
	return function()
	{

		//Poruszanie sie w lewo i w prawo
		if(A==true)
		{
		 predkosc = predkosc - przyspieszenie - Opur;
		 if(predkosc<limit*-1){predkosc = limit*-1; }	
		}
		if(D==true)
		{
		 predkosc = predkosc + (przyspieszenie + Opur);
		 if(predkosc>limit){predkosc = limit; }	
		}
		if((A==false)&&(D==false))
		{
			if(predkosc > 0)
			{
				if(predkosc - Opur < 0)
				{
					predkosc = 0;
				}
				else
				{
				predkosc = predkosc - Opur;
				}
			}
			if(predkosc<0)
			{
				if(	predkosc + Opur > 0 )
				{
					predkosc = 0 ; 
				}
				else
				{
					predkosc = predkosc + Opur;
				}
			
			}
		}
		this.pozx = this.pozx + predkosc;
		//Skok
		
		if(Space == true)
		{
			if(skok==0)
			{
			skok = skok + wyskok;
			czyskok = true;
			}
		}
		
		
		
		if(czyskok==true)
		{
			
			skok = skok - grawitacja;
			this.pozy = this.pozy - skok;
			
		}
	
	//Zmiana Wyskokosci bohatera 
	Gipcio.wysokosc = Gipcio.wysokosc - 40;
		
		if(wpowietrzu==false)
		{
			
			if(Kolizja(Gipcio,Sciezka)==false)
			{
				wpowietrzu = true; 
			}
		}
		
		if(wpowietrzu==true)
		{
			if(Kolizja(Gipcio,Sciezka)==true)
			{
				wpowietrzu = false;
				czyskok = false;
				skok = 0;
				Gipcio.pozy = 300;
			}
		}
		Gipcio.wysokosc = Gipcio.wysokosc + 40;
			
	//Blokada wychodzenia z mapy 

		if(this.pozx + this.szerokosc > 600 )
		{
			
			this.pozx = 600-this.szerokosc;
			predkosc = 0 ;

		}
		if(this.pozx<0)
		{
			this.pozx = 0;
			predkosc = 0 ;
		}
		
	
	}	
	
	
	}
	if(x==3)
	{
		return function()
		{
		
			
			if(czyaktywowana==false)
			{	
				rodzaj = 0;
				czyaktywowana=true;
			
			if(rodzaj == 0 )
			{	
				this.pozy = 400;
				this.pozx = 0-this.szerokosc;
			}
			
			}
			//atak z lewej 
			if(rodzaj == 0)
			{
				if(wycofanie==false)
				{
				predkoscwluczni = predkoscwluczni + 0.05;
					if(this.pozx + this.szerokosc > this.szerokosc)
					{
						wycofanie = true;
						predkoscwluczni = 0;
					}
				}
				if(wycofanie == true)
				{
					predkoscwluczni = predkoscwluczni - 0.05;
					if(this.pozx + this.szerokosc < 0)
					{
						predkoscwluczni = 0; 
						wycofanie = false;
						czyaktywowana = false;
						Kolejna = true;
					}
				}

				
				this.pozx = this.pozx + predkoscwluczni;
				
							
			}
				if(Kolizja(this,Gipcio)==true)
			{
				Przegrana = true;
				
			} 

		}
	}
	
	if(x==4)
	{
		return function()
		{
			if(czyaktywowana==false)
			{	
				rodzaj = 0;
				czyaktywowana=true;
			
			if(rodzaj == 0 )
			{	
				this.pozy = 400;
				this.pozx = 600;
			}
			
			}
			//atak z lewej 
			if(rodzaj == 0)
			{
				if(wycofanie==false)
				{
				predkoscwluczni = predkoscwluczni - 0.05;
					if(this.pozx + this.szerokosc < 600)
					{
						wycofanie = true;
						predkoscwluczni = 0;
					}
				}
				if(wycofanie == true)
				{
					predkoscwluczni = predkoscwluczni + 0.05;
					if(this.pozx > 600)
					{
						predkoscwluczni = 0; 
						wycofanie = false;
						czyaktywowana = false;
						Kolejna = true;
					}
				}

				
				this.pozx = this.pozx + predkoscwluczni;
							
			}
			if(Kolizja(this,Gipcio)==true)
			{
				Przegrana = true;
				
			} 

		}
	}
	if(x==5)
	{
		return function()
		{
			if(czyaktywowana==false)
			{
			kpredkosc = 0;	
			Kolejna = false;	
			czyaktywowana = true;
			this.pozy = -50;
			this.pozx = Math.floor(Math.random()*550);
			}
			kpredkosc = kpredkosc + kprzyspieszenie;
			this.pozy = this.pozy + kpredkosc;
			if(this.pozy > 500)
			{
				czyaktywowana = false;
				Kolejna = true;
				
			}
			if(Kolizja(this,Gipcio)==true)
			{
				Przegrana = true;
			}
		
		}
		
		
	}
	if(x==6)
	{
		return function()
		{
			if(this.pozx == 0)
			{
				this.pozx = Tlo.szerokosc - this.szerokosc;

			}
			this.pozx = this.pozx - 0.05;
			if(Kolizja(this,Gipcio)==true)
			{
				wygrana=true;
			}
			if(this.pozx<600)
			{
				this.pozx = this.pozx - Predkosc + 0.05;
			}

		}
		
	}

}
var TexB = [];
	//Wczytywanie Tekstur 
function Tworzenie()
{
	//Wczytywanie Tekstur
	Tex[0] = TworzeniePomoc("LunaEater/img/character.png");	
	Tex[1] = TworzeniePomoc("LunaEater/img/Tlo.png");
	Tex[2] = TworzeniePomoc("LunaEater/img/Trasa.png");
	Tex[3] = TworzeniePomoc("LunaEater/img/Trap1.png");
	Tex[4] = TworzeniePomoc("LunaEater/img/Trap2.png");
	Tex[5] = TworzeniePomoc("LunaEater/img/Trap3.png");
	Tex[6] = TworzeniePomoc("LunaEater/img/Trap4.png");
	Tex[7] = TworzeniePomoc("LunaEater/img/S1.png");
	Tex[8] = TworzeniePomoc("LunaEater/img/S2.png");
	Tex[9] = TworzeniePomoc("LunaEater/img/S3.png");
	Tex[10] = TworzeniePomoc("LunaEater/img/S4.png");
	Tex[11] = TworzeniePomoc("LunaEater/img/S5.png");
	Tex[12] = TworzeniePomoc("LunaEater/img/S6.png");
	Tex[13] = TworzeniePomoc("LunaEater/img/Meta.png");
	TexB[1] = TworzeniePomoc("LunaEater/img/1.png");
	TexB[2] = TworzeniePomoc("LunaEater/img/2.png");
	TexB[3] = TworzeniePomoc("LunaEater/img/3.png");
	TexB[4] = TworzeniePomoc("LunaEater/img/4.png");
	TexB[5] = TworzeniePomoc("LunaEater/img/5.png");
	TexB[6] = TworzeniePomoc("LunaEater/img/6.png");
	TexB[7] = TworzeniePomoc("LunaEater/img/7.png");
	wczytywanie();	
}
//Rysowanie wszystkich obiektuw na mapie
function Rysowanie()
{
Rysuj(0);	
Rysuj(Tlo);
Rysuj(Gipcio);
Rysuj(Trap[plapka]);
Rysuj(Meta);
Rysuj(Sciezka);

}
var Slajd = new Obiekt(Slajd,Tex[7],0,0,600,600);
var Pios = false;
function zakonczenie()
{
	if(wygrana==true)
	{
		if(Pios == false)
		{
			document.getElementById("Piosenka").innerHTML = '<embed src="LunaEater/Wygrana.mp3" hidden="true" autostart="true" loop="true"/>';
			Pios=true;
		}
		Slajd.img = Tex[12];
		document.getElementById("tekst").innerHTML = tekst[6];
		Rysuj(Slajd);
		
		if(Space==true)
		{	
		wygrana=false;
			Gra();
			Pios=false;
		}
	
	}
	if(Przegrana==true)
	{
	
		if(Pios == false)
		{
			document.getElementById("Piosenka").innerHTML = '<embed src="LunaEater/Koniec.mp3"  hidden="true" autostart="true"  loop="true"/>';
			Pios=true;
		}
		document.getElementById("tekst").innerHTML = tekst[5];
		Slajd.img = Tex[11];
		Rysuj(Slajd);
			if(Space==true)
		{
		Pios=false;	
		Przegrana = false;
		Gra();
		}
	}
	if((Przegrana==true)||(wygrana==true))
	{
		setTimeout(zakonczenie,200);
	}
}
//Predkosc Swiata
var Meta;
var Predkosc = 10;
var Sciezka;
var Gipcio;
var Tlo;
var Trap = [];
var Kolejna = true;
var plapka = 0;
var NrKlatki = 0;
var NrAnim = 0;
function pentla()
{

//Losowanie następnej plapki 
if(Kolejna == true)
{

plapka = Math.floor(Math.random()*4);
//plapka = 3;
Kolejna = false;
}

//Bohater animacja


NrKlatki++;
if(NrKlatki==0){Gipcio.img = TexB[1];}
if(NrKlatki==5){Gipcio.img = TexB[2];}
if(NrKlatki==10){Gipcio.img = TexB[3];}
if(NrKlatki==15){Gipcio.img = TexB[4];}
if(NrKlatki==20){Gipcio.img = TexB[5];}
if(NrKlatki==25){Gipcio.img = TexB[6];}
if(NrKlatki==30){Gipcio.img = TexB[7];}
if(NrKlatki==35){Gipcio.img = TexB[6];}
if(NrKlatki==40){Gipcio.img = TexB[5];}
if(NrKlatki==45){Gipcio.img = TexB[4];}
if(NrKlatki==50){Gipcio.img = TexB[3];}
if(NrKlatki==55){Gipcio.img = TexB[2];}

if(NrKlatki==60){NrKlatki=-1;}
//

Gipcio.dzialanie();
Sciezka.dzialanie(Predkosc);
Meta.dzialanie();
Trap[plapka].dzialanie();
Tlo.pozx = Tlo.pozx-0.05;
Rysowanie();
if(wygrana==Przegrana)
{
setTimeout(pentla,17);	
}
else
{
	zakonczenie();
}


}
var nrSlajd = 1;
function Start()
{
if(nrSlajd==1)
{
	document.getElementById("tekst").innerHTML = tekst[1];
	Slajd.img = Tex[7];
}
if(nrSlajd==2)
{
	document.getElementById("tekst").innerHTML = tekst[2];
	Slajd.img = Tex[8];
}
if(nrSlajd==3)
{
	document.getElementById("tekst").innerHTML = tekst[3];
	Slajd.img = Tex[9];
}
if(nrSlajd==4)
{
	document.getElementById("tekst").innerHTML = tekst[4];
	Slajd.img = Tex[10];
}
if(nrSlajd==5)
{
	
	Gra();
	nrSlajd=0;
}
if(Space==true)
{
	nrSlajd++;
}
Rysuj(Slajd);	
if(nrSlajd!=0){setTimeout(Start,100);}	
}

function Gra()
{
document.getElementById("Piosenka").innerHTML = '<embed src="LunaEater/Pioska.mp3" hidden="true" autostart="true" loop="100">';	
document.getElementById("tekst").innerHTML = "A - Lewo </br> D - Prawo </br> Space - Skok";
Sciezka = new Obiekt(Sciezka,Tex[2],0,500,1200,100);
Sciezka.dzialanie = funkcja(0);
Gipcio = new Obiekt(Gipcio,Tex[0],200,300,180,240);
Gipcio.dzialanie = funkcja(2);
Tlo = new Obiekt(Tlo,Tex[1],0,0,980,570);
Trap[0] = new Obiekt(Trap,Tex[3],700,480,100,50);
Trap[0].dzialanie = funkcja(1);
Trap[1] = new Obiekt(Trap,Tex[4],0,0,200,25);
Trap[1].dzialanie = funkcja(3);
Trap[2] = new Obiekt(Trap,Tex[5],0,0,200,25);
Trap[2].dzialanie = funkcja(4);
Trap[3] = new Obiekt(Trap,Tex[6],0,0,50,50);
Trap[3].dzialanie = funkcja(5);
Meta = new Obiekt(Meta,Tex[13],0,335,200,200)
Meta.dzialanie = funkcja(6);
//Domysle ustawienia
Kolejna = true;
//Gra //
	Przegrana = false;
//Plapki dzialanie i nie tylko
//fun 1 
	czyaktywowana = false;
//fun 2 
	//Prawo lewo
predkosc = 0;
przyspieszenie = 0.2;
Opur = 0.2;	
limit = 4.5;
	//Skok
grawitacja = 0.4;
skok = 0;
wyskok = 12;
czyskok = false;
wpowietrzu = false;
//fun 3
rodzaj = 0;
predkoscwluczni = 0;
wycofanie = false;
	
//fun 5
kpredkosc = 0;
kprzyspieszenie = 0.2;
A = false ;
D = false ;
S = false;
Space= false;

Rysuj(Tlo);
Rysuj(Gipcio);
Rysuj(Sciezka);
setTimeout(pentla,17);
}

