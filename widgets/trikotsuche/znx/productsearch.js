$(function(){
    productSearch(0);
    $('#zxsearch').submit(function(e){
          productSearch(0);
          e.preventDefault();
    });
});
/*
1739    Subsidesports DE,
6985    Fussball.de
6906    Adidas DE
9435    Puma DE
307     Karstadt DE

660     Default <- leads to a 404 error, don't use it!
*/
function productSearch(page) {
    var url = 'http://api.zanox.com/json/2011-03-01/products?connectId=A6715064998BE907ED32&adspace=994828&region=DE&programs=1739,6985,6906,9435,307&category=0&minPrice=0&maxPrice=1000&hasImages=true&items=3&callback=searchHandler';
    var s = $('#searchtext').val();
    url += '&q=' + s;
    url += '&page=' + page;
    url += '&t='+new Date().getMinutes();
    var csrc = $("#zxsrc");
    csrc.html('<script src="'+url+'"></script>');
    var tss = $('#tssearch');
    tss.attr('href', 'http://trikotsuche.de/s/' + encodeURIComponent(s));
    tss.html(s);
}

function searchHandler(data) {
    if (data) {
        var productItems = data.productItems.productItem;
        var container = document.getElementById('zxlist');
        container.innerHTML = '';
        for (var i = 0; i < productItems.length; i++) {
            renderItem(productItems[i], container);
        }
    }
}

function renderItem(item, container) {
    var link = item.trackingLinks.trackingLink[0].ppc;
    var name = item.name;
    var program = item.program.$;
    var price = item.price;
    var currency = item.currency;
    var imgsmall = item.image.small;

    if (name.length > 50) {
        name = name.substring(0,50);
        lastws = name.lastIndexOf(' ');
        name = name.substring(0,lastws);
    }

    var li = document.createElement('li');
    var content = '<img src="' + imgsmall + '">';
    content += '<a href="' + link + '">' + name + '</a>';
    content += '<br>Preis: ' + price + currency;
    content += '<br>bei: ' + program;
    li.innerHTML = content;
    container.appendChild(li);
}
