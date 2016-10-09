$(".button-collapse").sideNav();

var piemenu = new wheelnav('piemenu');
piemenu.spreaderInTitle = icon.plus;
piemenu.spreaderOutTitle = icon.cross;
piemenu.spreaderRadius = piemenu.wheelRadius * 0.34;
piemenu.wheelRadius = piemenu.wheelRadius * 0.83;
piemenu.createWheel();
piemenu.setTooltips(['WATCH','READ','NEWSLETTER','SHOP','FOLLOW HER']);
